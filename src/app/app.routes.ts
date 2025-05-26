import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ClienteLayoutComponent } from './pages/cliente-layout/cliente-layout.component';
import { VendedorLayoutComponent } from './pages/vendedor-layout/vendedor-layout.component';

import { LojaComponent } from './pages/loja/loja.component';
import { CarrinhoComponent } from './pages/carrinho/carrinho.component';
import { CadastrarComponent } from './pages/cadastrar/cadastrar.component';
import { ConsultarComponent } from './pages/consultar-clientes/consultar.component';
import { ListagemComponent } from './pages/listagem/listagem.component';

import { ListagemJogosComponent } from './crud-vendedor/listagem-jogos/listagem-jogos.component';
import { CadastrarJogosComponent } from './crud-vendedor/cadastrar-jogos/cadastrar-jogos.component';
import { ConsultarJogosComponent } from './crud-vendedor/consultar-jogos/consultar-jogos.component';
import { AlterarJogosComponent } from './crud-vendedor/alterar-jogos/alterar-jogos.component';
export const routes: Routes = [
  { path: '', component: LoginComponent },

  {
    path: 'cliente',
    component: ClienteLayoutComponent,
    children: [
      { path: 'loja', component: LojaComponent },
      { path: 'carrinho', component: CarrinhoComponent }
    ]
  },

  {
    path: 'vendedor',
    component: VendedorLayoutComponent,
    children: [
      { path: 'cadastrar', component: CadastrarComponent },
      { path: 'consultar-clientes', component: ConsultarComponent },
      { path: 'listagem', component: ListagemComponent },
      { path: 'listagem-jogos', component: ListagemJogosComponent },
      { path: 'alterar-jogos/:id', component: AlterarJogosComponent },
      { path: 'cadastrar-jogos', component: CadastrarJogosComponent },
      { path: 'consultar-jogos', component: ConsultarJogosComponent }

    ]
  },

  { path: 'cadastro', component: CadastrarComponent },

  { path: '**', redirectTo: '' }
];
