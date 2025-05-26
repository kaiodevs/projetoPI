import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Cliente } from '../../core/services/types';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientesService } from '../../core/services/clientes.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  tipoUsuario: 'cliente' | 'vendedor' | null = 'cliente';

  formCliente: FormGroup;
  formLoginFeitoCliente: FormGroup;
  formLoginVendedor: FormGroup;

  exibirFormulario: 'login' | 'cadastro' = 'login';

  erroLogin = '';
  cadastroSucesso = '';
  cadastroErro = '';

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private clientesService: ClientesService,
    private http: HttpClient,
    private router: Router
  ) {
    this.tipoUsuario = this.authService.getTipoUsuario() || 'cliente';

    this.formCliente = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      senha: ['', Validators.required]
    });

    this.formLoginFeitoCliente = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });

    this.formLoginVendedor = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  selecionarClienteOuVendedor(tipo: 'cliente' | 'vendedor') {
    this.tipoUsuario = tipo;
    this.authService.setTipoUsuario(tipo);
  }

  cadastrarCliente() {
    if (this.formCliente.valid) {
      const novoCliente: Cliente = this.formCliente.value;
      this.clientesService.incluir(novoCliente).subscribe({
        next: () => {
          this.cadastroSucesso = 'Cadastro realizado com sucesso!';
          this.formCliente.reset();
          this.exibirFormulario = 'login';
        },
        error: () => {
          this.cadastroErro = 'Erro ao realizar cadastro. Tente novamente.';
        }
      });
    }
  }

  loginCliente() {
  if (this.formLoginFeitoCliente.valid) {
    const { email, senha } = this.formLoginFeitoCliente.value;
    this.clientesService.listar().subscribe({
      next: clientes => {
        const clienteEncontrado = clientes.find(c => c.email === email && c.senha === senha);
        if (clienteEncontrado && clienteEncontrado.id) {
          this.authService.setUsuarioLogado({ id: clienteEncontrado.id, tipo: 'cliente' });
          localStorage.setItem('cliente_logado', 'true');
          this.router.navigate(['/cliente/loja']);
        } else {
          this.erroLogin = 'Cliente não encontrado. Verifique o e-mail e senha!';
        }
      },
      error: () => {
        this.erroLogin = 'Erro ao tentar fazer login. Tente novamente!';
      }
    });
  }
}


  loginVendedor() {
    if (this.formLoginVendedor.valid) {
      const { email, senha } = this.formLoginVendedor.value;
      this.http.get<any[]>(`http://localhost:3000/vendedores?email=${email}&senha=${senha}`).subscribe({
        next: vendedores => {
          if (vendedores.length > 0) {
            const vendedor = vendedores[0];
            // Ajuste aqui para setar o usuário logado com id e tipo
            this.authService.setUsuarioLogado({ id: vendedor.id, tipo: 'vendedor' });
            localStorage.setItem('vendedor_logado', 'true');
            this.router.navigate(['/vendedor/listagem-jogos']);
          } else {
            this.erroLogin = 'Vendedor não encontrado. Verifique o e-mail e senha!';
          }
        },
        error: () => {
          this.erroLogin = 'Erro ao tentar fazer login de vendedor.';
        }
      });
    }
  }

  logout() {
    this.authService.logout();
    window.location.href = '/';
  }
}
