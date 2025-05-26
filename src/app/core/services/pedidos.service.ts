import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pedido } from './types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private readonly API = 'http://localhost:3000/pedidos';

  constructor(private http: HttpClient) {}

  listarPorCliente(clienteId: string): Observable<Pedido[]> {
  return this.http.get<Pedido[]>(`${this.API}?clienteId=${clienteId}`);
}

criar(pedido: Pedido): Observable<Pedido> {
  return this.http.post<Pedido>(this.API, pedido);
}

}
