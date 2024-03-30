import { Component,  EventEmitter,  Input, OnInit, Output} from '@angular/core';
import { HttpService } from '../../shared/services/http.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrl: './sidebar-admin.component.scss'
})
export class SidebarAdminComponent implements OnInit {
  @Input() user?: any;
  @Output() sair = new EventEmitter<boolean>();

  products?:any[]
  categorias?:any[]
  alunos?:any[]
  pedidos?:any[]
  pedidosERecarga?:any[]
  filhos?:any[]
  constructor(private http: HttpService) {

  }
  async ngOnInit() {
    this.products = await this.getProdutos().toPromise()
    this.categorias = await this.getCategorias().toPromise()
  }


  OnSair(){
      this.sair.emit(true)
  }


showModalProdutos: boolean = false;
openModalProdutos(): void {
  this.showModalProdutos = true;
}
closeModalProdutos(): void {
  this.showModalProdutos = false;
}


showModalCategorias: boolean = false;
openModalCategorias(): void {
  this.showModalCategorias = true;
}
closeModalCategorias(): void {
  this.showModalCategorias = false;
}

showModalAlunos: boolean = false;
async openModalAlunos(){
  let alunos = await this.getAlunos().toPromise()
  this.alunos = alunos?.data

  this.alunos = this.getUsersWithSocialId(alunos?.data)

  console.log(this.alunos)
  this.showModalAlunos = true;
}
closeModalAlunos(): void {
  this.showModalAlunos = false;
}



getUsersWithSocialId(users: any[]): any[] {
  return users.filter((user: any) => user.socialId !== null);
}


getResponsaveisUsers(users: any[]): any[] {
  return users.filter(user => user.role.name === "User");
}


showModalResponsaveis: boolean = false;
async openModalResponsaveis(){
  let alunos = await this.getAlunos().toPromise()
  this.alunos = alunos?.data
  this.alunos = this.getResponsaveisUsers(alunos?.data)
  console.log(this.alunos)
  this.showModalResponsaveis = true;
}
closeModalResponsaveis(): void {
  this.showModalResponsaveis = false;
}


showModalPedidos: boolean = false;
async openModalPedidos(){

  this.pedidos = (await this.getPedidos().toPromise()).sort((a:any, b:any) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB.getTime() - dateA.getTime(); // Invertendo a ordem da comparação
  });
  this.showModalPedidos = true;
}
closeModalPedidos(): void {
  this.showModalPedidos = false;
}



showModalFilhos: boolean = false;
async openModalFilhos(){
  let filhos = await this.getAlunos().toPromise()
 let user = localStorage.getItem('USER') as any
const filteredUsers = this.filterUsersByProperty(filhos?.data, 'emailParent', JSON.parse(user)?.user?.email);
  this.filhos = filteredUsers
  console.log(this.filhos)
  this.showModalFilhos = true;
}
closeModalFilhos(): void {
  this.showModalFilhos = false;
}





  showModalRecarga = false;
  alunoSelecionado: any;

  exibirModalRecarga(aluno: any) {
    this.alunoSelecionado = aluno;
    this.showModalRecarga = true;
  }
  fecharModalRecarga() {
    this.showModalRecarga = false;
  }

  fecharModalCheckout(e:any){
    this.showModalRecarga = false;
    this.openModalFilhos()
  }

  excluirAluno(aluno: any) {
    // Lógica para excluir aluno
  }

  editarAluno(aluno: any) {
    // Lógica para editar aluno
  }







showModalPedidosERecarga: boolean = false;
async openModalPedidosERecarga(){
  this.pedidosERecarga = (await this.getPedidosRecarga().toPromise()).sort((a:any, b:any) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB.getTime() - dateA.getTime(); // Invertendo a ordem da comparação
  });
  this.showModalPedidosERecarga = true;
}
closeModalPedidosERecarga(): void {
  this.showModalPedidosERecarga = false;
}



filterUsersByProperty(users: any[], property: string, value: any): any[] {
  return users.filter(user => user[property] === value);
}


getProdutos(): Observable<any> {
  return this.http.get<any[]>(`api/v1/product`).pipe(
    map((data: any) => {
      return data;
    })
  );
}

getCategorias(): Observable<any> {
  return this.http.get<any[]>(`api/v1/category`).pipe(
    map((data: any) => {
      return data;
    })
  );
}

getAlunos(): Observable<any> {
  return this.http.get<any[]>(`api/v1/users`).pipe(
    map((data: any) => {
      return data;
    })
  );
}

getPedidos(): Observable<any> {
  return this.http.get<any[]>(`api/v1/transaction`).pipe(
    map((data: any) => {
      return data;
    })
  );
}


getPedidosRecarga(): Observable<any> {
  return this.http.get<any[]>(`api/v1/transaction/tudo`).pipe(
    map((data: any) => {
      return data;
    })
  );
}


excluirProduto(item:any){

}

editarProduto(item:any){

}

excluirCategorias(item:any){

}

editarCategorias(item:any){

}


excluirAlunos(item:any){

}

editarAlunos(item:any){

}





}
