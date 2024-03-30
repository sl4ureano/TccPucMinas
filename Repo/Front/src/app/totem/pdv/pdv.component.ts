import { environment } from './../../../environments/environment';
import { Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2'
import { ConvertedProduct, Product, ProductEntity } from '../product-card/product.interface';
import { CarrinhoService } from '../../carrinho.service';
import { HttpService } from '../../shared/services/http.service';
import { Observable, map } from 'rxjs';
import { Login } from '../../shared/interfaces/login.interface';
import { EventData } from '../cart/cart.component';

@Component({
  selector: 'app-pdv',
  templateUrl: './pdv.component.html',
  styleUrl: './pdv.component.scss'
})
export class PdvComponent implements OnInit {
  receivedData: any;

  categorias: any;
  user: any;
  produtos:Product[] = [];
  filteredProdutos:any;
  selectedCategory = 'Todos';

  constructor(private carrinhoService: CarrinhoService, private http: HttpService) {}
  async ngOnInit() {

  }

  convertProducts(products: ProductEntity[]): ConvertedProduct[] {
    return products.map(product => {
      return {
        id: product.id,
        nome: product.nome,
        preco: parseFloat(product.preco),
        imagem: product.imagem.path,
        categoria: product.categoria.nome,
        categoriaimg: product.categoria.img.path,
        isLoading: false
      };
    });
  }


  onFilterProducts(category: string) {
    this.selectedCategory = category;
    if (category === 'Todos') {
      this.filteredProdutos = [...this.produtos]; // Mostra todos os produtos
    } else {
      this.filteredProdutos = this.produtos.filter(produto => produto.categoria === category);
    }
  }

  onExit(event:any){
   if(event == 'true'){
      this.studentId = '';
      this.password = '';
      this.studentPhoto = '';
      this.openModal()
    }
  }

  showModal: boolean = true;
  openModal(): void {
    this.showModal = true;
  }
  closeModal(): void {
    this.showModal = false;
  }


  studentId: string = '';
  password: string = '';
  studentPhoto: string = '';
  escondeinputID: boolean = false;

async addDigitAluno(digit: any) {
  // console.log("aluno")

  if (this.studentId.length < 8 && digit != "Del") {
    this.studentId += digit.toString();
  }
  else if (digit == "Del"){
    this.studentId = this.studentId.slice(0, -1);
    this.studentPhoto = ""
  }
  if (this.studentId.length === 8) {

    // todo faz request da foto
    let foto = await this.getPhotoChild(this.studentId).toPromise()
    Swal.fire({
      title: "Validando!",
      html: "Procurando informações do aluno",
      timer: 1000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        if(foto){
          if(foto.photopath){
            this.studentPhoto = environment.api + foto.photopath
          }
          else{
            this.studentPhoto = "nada"
          }
        }else{
          Swal.fire({
            title: 'Usuário não encontrado!',
            text: 'Ocorreu um problema com a sua solicitação',
            icon: 'error',
            confirmButtonText: 'Tentar Novamente'
          })
          this.studentId = ""
        }
      }
    });
  }
}


getProdutos(): Observable<any> {
  return this.http.get<any[]>(`api/v1/product`).pipe(
    map((data: any) => {
      return data;
    })
  );
}

getCategories(): Observable<any> {
  return this.http.get<any[]>(`api/v1/category`).pipe(
    map((data: any) => {
      return data;
    })
  );
}

getPhotoChild(childID: string): Observable<any> {
  return this.http.get<any[]>(`api/v1/users/photo/${childID}`).pipe(
    map((data: any) => {
      return data;
    })
  );
}

loginChild(socialId:string, password:string): Observable<any> {
  return this.http.post<any[]>(`api/v1/auth/child/login`,{
    "socialId": socialId,
    "password": password
  }).pipe(
    map((data: any) => {
      return data;
    })
  );
}


transactionChild(data:any): Observable<any> {
  return this.http.post<any[]>(`api/v1/transaction`,data).pipe(
    map((data: any) => {
      return data;
    })
  );
}

transformJson(originalJson: any): any {
  console.log(originalJson.total)
  const transformedJson: any = {
      user: { id: this.user.id },
      products: originalJson.Itens.map((item:any) => ({ id: item.id })),
      total: originalJson.total,
      type: "compra"
  };

  return transformedJson;
}

addDigitPassword(digit: any) {
  if (this.password.length < 8 && digit != "Del") {
    this.password += digit.toString();
    if(this.password.length === 8){
      this.login()
    }
  }
  else if (digit == "Del"){
    this.password = this.password.slice(0, -1);
    if(this.password.length == 0){
      this.studentPhoto = ""
    }
  }
}

  async login() {
    var _error;
    var _data:any;
    await this.loginChild(this.studentId,this.password).toPromise().then( data => {
      _data = data
    }).catch( err => {
      _error = err
    })
    // console.log(_data)
    // console.log(_error)

    if(_error){
      Swal.fire({
        title: 'Senha Inválida!',
        text: 'Ocorreu um problema com a sua solicitação',
        icon: 'error',
        confirmButtonText: 'Tentar Novamente'
      })
      this.password = ""
    }else{
      // todo melhorar essa gambi
      let userPhotopath = _data?.user?.photo?.path ? _data?.user?.photo?.path : ""
      let user = {
        userName: `${_data?.user?.firstName} ${_data?.user?.lastName}`,
         saldo: _data?.user?.saldo,
          id: _data?.user?.id,
          socialId: _data?.user?.socialId,
           photo: userPhotopath.replace("\\","/")
      }
      this.user = user
      this.carrinhoService.finalizarCompra()
      this.categorias = await this.getCategories().toPromise()

      let produtos = await this.getProdutos().toPromise()
      this.produtos = this.convertProducts(produtos);
      this.filteredProdutos = [...this.produtos]; // Inicialmente, exibe todos os produtos

      this.closeModal()

    }
  }



  async onAttCredit(event: EventData) {
    // Exibir loading
    Swal.fire({
      title: 'Carregando...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    const novoSaldo = this.user.saldo - event.total;
    // aqui ficará a chamada de saldo
    setTimeout(async () => {
      // Fechar loading
      Swal.close();

      if (novoSaldo >= 0) {
        // Exibir mensagem de sucesso
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: 'Compra finalizada com sucesso!',
        });

        this.user.saldo = novoSaldo;
        await this.transactionChild(this.transformJson(event)).toPromise()
        this.carrinhoService.finalizarCompra();
      } else {
        // Exibir mensagem de erro
        Swal.fire({
          icon: 'error',
          title: 'Saldo insuficiente!',
          text: 'Não é possível finalizar essa compra.',
        });
      }
    }, 1000); // Simula um tempo de espera de 1 segundo antes de exibir o resultado
  }



}
