import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private _carrinhoItens: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  carrinhoItens$ = this._carrinhoItens.asObservable();

  constructor() { }

  adicionarItem(item: any): void {
    const carrinhoAtual = this._carrinhoItens.getValue();
    const itemIndex = carrinhoAtual.findIndex(i => i.nome === item.nome);
    if (itemIndex !== -1) {
      // Se o item já estiver no carrinho, incrementa a quantidade
      carrinhoAtual[itemIndex].quantidade++;
    } else {
      // Se não, adiciona um novo item ao carrinho
      carrinhoAtual.push({ ...item, quantidade: 1 });
    }
    this._carrinhoItens.next(carrinhoAtual);
  }

  removerItem(index: number): void {
    const carrinhoAtual = this._carrinhoItens.getValue();
    const item = carrinhoAtual[index];
    if (item.quantidade > 1) {
      // Se houver mais de um item, apenas decrementa a quantidade
      carrinhoAtual[index].quantidade--;
    } else {
      // Se houver apenas um item, remove-o do carrinho
      carrinhoAtual.splice(index, 1);
    }
    this._carrinhoItens.next(carrinhoAtual);
  }

  finalizarCompra(): void{
    this._carrinhoItens.next([]);
  }

  calcularTotal(): number {
    const carrinhoAtual = this._carrinhoItens.getValue();
    return carrinhoAtual.reduce((total, item) => total + item.preco * item.quantidade, 0);
  }

  getCarrinhoItens(): any[] {
    return this._carrinhoItens.getValue();
  }
}
