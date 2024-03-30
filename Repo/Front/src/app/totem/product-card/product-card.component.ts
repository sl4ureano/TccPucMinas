import { Component, Input } from '@angular/core';
import { CarrinhoService } from '../../carrinho.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() produtos?:any[];

  constructor(private carrinhoService: CarrinhoService) { }

  adicionarAoCarrinho(produto: any) {
    produto.isLoading = true; // Define isLoading para true apenas para o produto clicado
    // Simula uma operação de adicionar ao carrinho que leva alguns segundos
    setTimeout(() => {
      produto.isLoading = false; // Define isLoading de volta para false após alguns segundos
    }, 300); // Tempo em milissegundos (aqui definido para 2 segundos)

    this.carrinhoService.adicionarItem(produto);

  }
}
