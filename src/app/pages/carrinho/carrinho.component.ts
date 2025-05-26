import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarrinhoService } from '../../core/services/carrinho.service';
import { PedidosService } from '../../core/services/pedidos.service';
import { AuthService } from '../../core/services/auth.service';
import { Jogo, Pedido } from '../../core/services/types';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent implements OnInit {
  jogosNoCarrinho: Jogo[] = [];
  totalCompra: number = 0;

  constructor(
    private carrinhoService: CarrinhoService,
    private pedidosService: PedidosService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.jogosNoCarrinho = this.carrinhoService.obterJogos();
    this.totalCompra = this.carrinhoService.calcularTotal();
  }

  removerDoCarrinho(jogo: Jogo): void {
    this.carrinhoService.remover(jogo);
    this.atualizarCarrinho();
  }

  private atualizarCarrinho(): void {
    this.jogosNoCarrinho = this.carrinhoService.obterJogos();
    this.totalCompra = this.carrinhoService.calcularTotal();
  }

  finalizarCompra(): void {
    const cliente = this.authService.obterUsuarioLogado();

    if (!cliente) {
      alert('Erro: Nenhum cliente logado.');
      return;
    }

    const jogosComprados = this.carrinhoService.obterJogos();

    const novoPedido: Pedido = {
      clienteId: cliente.id,
      valor: this.totalCompra,
        jogoNome: jogosComprados.map(jogo => jogo.titulo)
    };

    this.pedidosService.criar(novoPedido).subscribe({
      next: () => {
        this.carrinhoService.limparCarrinho();
        this.atualizarCarrinho();
        alert('Compra finalizada com sucesso!');
      },
      error: () => {
        alert('Erro ao salvar o pedido.');
      }
    });
  }
}
