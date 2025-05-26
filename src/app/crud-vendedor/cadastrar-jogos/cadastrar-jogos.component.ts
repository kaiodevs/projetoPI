import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { JogosService } from '../../core/services/jogos.service';
import { Jogo } from '../../core/services/types';

@Component({
  selector: 'app-cadastrar-jogos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastrar-jogos.component.html',
  styleUrl: './cadastrar-jogos.component.css'
})
export class CadastrarJogosComponent {
  jogo: Omit<Jogo, 'id'> = {
    titulo: '',
    genero: '',
    preco: 0,
    imagemUrl: ''
  };

  constructor(
    private jogosService: JogosService,
    private router: Router
  ) {}

  submeter(): void {
    this.jogosService.incluir(this.jogo).subscribe({
      next: () => {
        alert('Jogo cadastrado com sucesso!');
        this.router.navigate(['/vendedor/listagem-jogos']);
      },
      error: () => {
        alert('Erro ao cadastrar o jogo!');
      }
    });
  }
}
