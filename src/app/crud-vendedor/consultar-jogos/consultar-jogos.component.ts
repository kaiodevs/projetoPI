import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JogosService } from '../../core/services/jogos.service';
import { Jogo } from '../../core/services/types';

@Component({
  selector: 'app-consultar-jogos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consultar-jogos.component.html',
  styleUrl: './consultar-jogos.component.css'
})
export class ConsultarJogosComponent {
  idbusca: string = '';
  jogoEncontrado: Jogo | null = null;
  erroBusca: string = '';

  constructor(private clientesService: JogosService) { }

  buscaJogo(): void {
    this.erroBusca = '';
    this.jogoEncontrado = null;

    const id = this.idbusca.trim();
    if (id) {
      this.clientesService.buscarPorId(id).subscribe({
        next: (jogo) => {
          if (jogo) {
            this.jogoEncontrado = jogo;
          } else {
            this.erroBusca = 'Jogo não encontrado!';
          }
        },
        error: () => {
          this.erroBusca = 'Erro ao buscar jogo!';
        }
      });
    }
  }
}
