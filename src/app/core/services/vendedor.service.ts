import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VendedorService {
  private readonly API = 'http://localhost:3000/vendedores';

  constructor(private http: HttpClient) {}

  login(email: string, senha: string): Observable<boolean> {
    return this.http.get<any[]>(`${this.API}?email=${email}&senha=${senha}`).pipe(
      map(vendedores => {
        if (vendedores.length > 0) {
          localStorage.setItem('vendedor_logado', 'true');
          return true;
        }
        return false;
      })
    );
  }

  estaLogado(): boolean {
    return localStorage.getItem('vendedor_logado') === 'true';
  }

  logout(): void {
    localStorage.removeItem('vendedor_logado');
  }
}
