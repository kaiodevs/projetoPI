import { Injectable } from '@angular/core';
import { Jogo } from './types';
@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private carrinho: Jogo[] = []; 


 
  adicionar(jogo: Jogo): void {
    this.carrinho.push(jogo);
  }

  
  remover(jogo: Jogo): void {
    this.carrinho = this.carrinho.filter(item => item.id !== jogo.id);
  }

  obterJogos(): Jogo[] {
    return this.carrinho;
  }
 
  calcularTotal(): number {
    return this.carrinho.reduce((total, jogo) => total + jogo.preco, 0);
  }


  limparCarrinho(): void {
    this.carrinho = [];
  }

}
