import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tipoUsuario: 'cliente' | 'vendedor' | null = null;
  private usuarioLogado: { id: string, tipo: 'cliente' | 'vendedor' } | null = null;

  setTipoUsuario(tipo: 'cliente' | 'vendedor') {
    this.tipoUsuario = tipo;
  }

  getTipoUsuario(): 'cliente' | 'vendedor' | null {
    return this.tipoUsuario;
  }

  setUsuarioLogado(usuario: { id: string, tipo: 'cliente' | 'vendedor' }) {
    this.usuarioLogado = usuario;
    this.tipoUsuario = usuario.tipo;
  }

  obterUsuarioLogado() {
    return this.usuarioLogado;
  }

  estaLogado(): boolean {
    return this.tipoUsuario !== null;
  }

  logout() {
    this.tipoUsuario = null;
    this.usuarioLogado = null;
  }
}
