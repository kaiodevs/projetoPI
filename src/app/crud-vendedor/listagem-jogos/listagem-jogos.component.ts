import { Component, OnInit } from '@angular/core';
import { JogosService } from '../../core/services/jogos.service';
import { Jogo } from '../../core/services/types';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-listagem-jogos',
  templateUrl: './listagem-jogos.component.html',
  styleUrls: ['./listagem-jogos.component.css']
})
export class ListagemJogosComponent implements OnInit {
  listaJogos: Jogo[] = [];

  constructor(private jogosService: JogosService, private router: Router) {}

  ngOnInit(): void {
    this.carregarJogos();
  }

  carregarJogos(): void {
    this.jogosService.listar().subscribe({
      next: (jogos) => this.listaJogos = jogos,
      error: (erro) => console.error('Erro ao carregar jogos', erro)
    });
  }

  excluir(id: number): void {
    if (confirm('Tem certeza que deseja excluir este jogo?')) {
      this.jogosService.excluir(id).subscribe({
        next: () => {
          this.listaJogos = this.listaJogos.filter(j => j.id !== id);
        },
        error: (erro) => console.error('Erro ao excluir jogo', erro)
      });
    }
  }

  editar(id: number): void {
    this.router.navigate(['/vendedor/alterar-jogos', id]);
  }
}
