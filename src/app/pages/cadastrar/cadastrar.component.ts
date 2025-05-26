import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Cliente } from '../../core/services/types';
import { ClientesService } from '../../core/services/clientes.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-cadastrar',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.css'
})
export class CadastrarComponent {
  cliente: Omit<Cliente, 'id'> = {
    nome: '',
    email: '',
    telefone: '',
    senha: ''
  };

  constructor(
    private service: ClientesService,
    private router: Router
  ) {}

  submeter() {
    this.service.incluir(this.cliente).subscribe(() => {
      alert('Cadastro realizado com sucesso!');
      this.router.navigate(['/']);
    });
  }
}
