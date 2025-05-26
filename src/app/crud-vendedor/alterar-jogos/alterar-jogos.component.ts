import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Jogo } from '../../core/services/types';
import { JogosService } from '../../core/services/jogos.service';

@Component({
  selector: 'app-alterar-jogos',
  standalone: true,
  templateUrl: './alterar-jogos.component.html',
  styleUrls: ['./alterar-jogos.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class AlterarJogosComponent implements OnInit {
  form!: FormGroup;
  idJogo!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private jogosService: JogosService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      alert('ID do jogo não encontrado!');
      this.router.navigate(['/vendedor/listagem-jogos']);
      return;
    }

    this.idJogo = idParam;

    this.form = this.fb.group({
      titulo: [''],
      genero: [''],
      preco: [''],
      imagemUrl: ['']
    });

    this.jogosService.buscarPorId(this.idJogo).subscribe(jogo => {
      if (jogo) {
        this.form.patchValue({
          titulo: jogo.titulo,
          genero: jogo.genero,
          preco: jogo.preco,
          imagemUrl: jogo.imagemUrl
        });
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const jogoAtualizado: Jogo = {
        id: this.idJogo,
        ...this.form.value
      };

      this.jogosService.editar(jogoAtualizado).subscribe({
        next: () => {
          alert('Jogo alterado com sucesso!');
          this.router.navigate(['/vendedor/listagem-jogos']);
        },
        error: (err) => {
          console.error('Erro ao atualizar jogo:', err);
          alert('Erro ao tentar salvar as alterações.');
        }
      });
    }
  }
}
