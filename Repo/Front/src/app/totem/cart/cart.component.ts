import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CarrinhoService } from '../../carrinho.service';
import Swal from 'sweetalert2'


export interface EventData {
  total: number;
  Itens: any;
  subtotal: number,
  taxaservico: number
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  @Input() carrinhoItens?: any[];
  @Output() attCredit = new EventEmitter<EventData>();

  constructor(private carrinhoService: CarrinhoService) { }

  ngOnInit(): void {
    this.carrinhoService.carrinhoItens$.subscribe(itens => {
      this.carrinhoItens = itens;
    });
  }

  adicionaItem(item: any): void {
    this.carrinhoService.adicionarItem(item);
  }

  removerItem(index: number): void {
    this.carrinhoService.removerItem(index);
  }

  IniciaCompra(): void {
    if(this.getSubTotal() > 0){
      this.openModal()
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Carrinho vazio!',
        text: 'Não é possível finalizar essa compra.',
      });
    }
  }

  finalizarCompra(): void {
    this.closeModal()
    const data: EventData = {
      total: this.getTotal(),
      subtotal: this.getSubTotal(),
      taxaservico: this.getTaxaServico(),
      Itens: this.carrinhoItens
    };
    this.attCredit.emit(data);
  }

  getSubTotal(){
    return this.carrinhoService.calcularTotal();
  }

  getTaxaServico(){
    const subtotal = this.getSubTotal()
    const taxaServico = subtotal * 0.05; // 2% de taxa de serviço
    return taxaServico;
  }

  getTotal(){
    return Number((this.getSubTotal() + this.getTaxaServico()).toFixed(2));
  }

  showModal: boolean = false;
  openModal(): void {
    this.showModal = true;
  }
  closeModal(): void {
    this.showModal = false;
  }

}
