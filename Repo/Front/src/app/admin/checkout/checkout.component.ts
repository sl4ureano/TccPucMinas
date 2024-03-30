import { Component, EventEmitter, Output, Input } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  paymentHandler: any = null;
  keyStripe : string = "pk_test_51Lf33zDpCjHUfGtEOrBU5TCJpRbjp3agjzUHguYI4CAl8Rt03UHxEjmrn4HX0bN2VrJisLZxVhyLfqQaEI0rC7zF00bNP8T8Z8"
  valorCustomizado:any
  @Output() fecharModalCheckout = new EventEmitter<boolean>();
  @Input() aluno?: any;

  constructor(private http: HttpService) {}
  ngOnInit() {
    this.invokeStripe();
  }
  async makePayment(amount: any) {
    console.log("alunoSelecionado",this.aluno)
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: this.keyStripe,
      locale: 'pt-BR',
      token: async (stripeToken: any) => {
        await this.rechargeChild(stripeToken?.id, amount, this.aluno.email).toPromise()
        this.fecharModalCheckout.emit(true)
      },
    });

    paymentHandler.open({
      name: 'Recarga Saborito',
      amount: amount * 100,
      email: this.aluno.email,
      panelLabel: "Pagar",
      allowRememberMe: false,
      currency: 'brl'
    });
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: this.keyStripe,
          locale: 'pt-BR',
          token: function (stripeToken: any) {
            console.log(stripeToken);
            // alert('Payment has been successfull!');
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }

  rechargeChild(token:string, amount:number, email:string): Observable<any> {
    return this.http.post<any[]>(`api/v1/transaction/recharge`,{
      "token":token,
      "amount":amount,
      "email":email
    }).pipe(
      map((data: any) => {
        return data;
      })
    );
  }



}






