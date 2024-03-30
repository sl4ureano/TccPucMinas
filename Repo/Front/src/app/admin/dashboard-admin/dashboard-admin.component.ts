import { Component, OnInit } from '@angular/core';
import { Chart, registerables} from 'chart.js';
import { Observable, map } from 'rxjs';
import { HttpService } from '../../shared/services/http.service';
import Swal from 'sweetalert2'


Chart.register(...registerables);
@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.scss'
})
export class DashboardAdminComponent implements OnInit {
  faturamentoPorDiaChart: any;
  analitics:any
  user: any;
  constructor(private http: HttpService) { }

  async ngOnInit() {
    this.analitics = await this.getAnalytics().toPromise()
  }

  getAnalytics(): Observable<any> {
    return this.http.get<any>(`api/v1/transaction/count`).pipe(
      map((data: any) => {
        return data;
      })
    );
  }


  loginAdmin(email:string, password:string): Observable<any> {
    return this.http.post<any[]>(`api/v1/auth/email/login`,{
      "email": email,
      "password": password
    }).pipe(
      map((data: any) => {
        return data;
      })
    );
  }



  email: string = '';
  password: string = '';

  showModal: boolean = true;
  openModal(): void {
    this.showModal = true;
  }
  closeModal(): void {
    this.showModal = false;
  }

  async login() {
    var _error;
    var _data:any;
    await this.loginAdmin(this.email,this.password).toPromise().then( data => {
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
    localStorage.setItem("USER",JSON.stringify(_data))
      let user = {
        userName: `${_data?.user?.firstName} ${_data?.user?.lastName}`,
          id: _data?.user?.id,
          role: _data?.user?.role?.name,
          email: _data?.user?.email
      }
      this.user = user
      console.log(user)
      this.closeModal()
      setTimeout(() => {
        this.plotGrafico();
      }, 0);
    }

    }


    plotGrafico(){
      this.faturamentoPorDiaChart = new Chart('faturamentoPorDia', {
        type: 'line',
        data: {
          labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'], // dias do mês
          datasets: [{
            label: 'Faturamento',
            data: [100, 500, 300, 150, 50, 600, 300, 400, 200, 250, 300, 350, 400, 450, 500, 550, 600, 50, 700, 750, 800, 350, 900, 950, 50, 500, 600, 50, 600, 1250, 50], // valores de faturamento para cada dia do mês
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function(value, index, values) {
                  return 'R$' + value; // Adicionando 'R$' à legenda do eixo y
                }
              }
            },
            x: {
              title: {
                display: true,
                text: 'Dia' // Adicionando legenda 'Dia' ao eixo x
              }
            }
          }
        }
      });
    }

    onSair(event:any){
      if(event){
        this.email = '';
        this.password = '';
        this.openModal()
      }
      console.log(event)
    }

  }


