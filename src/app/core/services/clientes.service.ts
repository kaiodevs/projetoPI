import { Injectable } from '@angular/core';
import { Cliente } from './types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private readonly API = 'http://localhost:3000/clientes';
  constructor(private http: HttpClient) { }

  listar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.API);
  }

  incluir(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.API, cliente);
  }

  buscarPorId(id: string): Observable<Cliente | undefined> {
    return this.http.get<Cliente>(this.API + `/${id}`);
  }
}