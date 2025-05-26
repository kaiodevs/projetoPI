import { Component, OnInit } from '@angular/core';
import { JogosService } from '../../core/services/jogos.service';
import { CarrinhoService } from '../../core/services/carrinho.service';
import { Jogo } from '../../core/services/types';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-loja',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loja.component.html',
  styleUrl: './loja.component.css'
})
export class LojaComponent implements OnInit {
  jogos: any[] = [];

  constructor(private jogosService: JogosService, private carrinhoService: CarrinhoService) {}

  ngOnInit(): void {
    // Chama o serviço para listar os jogos ao iniciar o componente
        this.jogosService.listar().subscribe(jogos => {
      this.jogos = jogos;
    });
  }

  // essa função é para adicionar ao carrinho
  adicionarAoCarrinho(jogo: Jogo): void {
    this.carrinhoService.adicionar(jogo);
    alert(`${jogo.titulo} foi adicionado ao seu carrinho!`);
  }
}
