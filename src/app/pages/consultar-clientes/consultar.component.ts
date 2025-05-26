import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientesService } from '../../core/services/clientes.service';
import { PedidosService } from '../../core/services/pedidos.service';
import { Cliente, Pedido } from '../../core/services/types';

@Component({
  selector: 'app-consultar',
  standalone: true,
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css'],
  imports: [CommonModule, FormsModule],
})
export class ConsultarComponent {
  idBusca: string = '';  // Agora idBusca é string
  clienteEncontrado: Cliente | null = null;
  pedidosCliente: Pedido[] = [];
  erroBusca: string = '';

  constructor(
    private clientesService: ClientesService,
    private pedidosService: PedidosService
  ) {}

  buscarCliente(): void {
    this.resetarEstado();

    const id = this.idBusca.trim();
    if (!id) {
      this.erroBusca = 'Informe um ID válido.';
      return;
    }

    this.clientesService.buscarPorId(id).subscribe({
      next: (cliente) => {
        if (cliente) {
          this.clienteEncontrado = cliente;
          this.buscarPedidosDoCliente(String(cliente.id));
        } else {
          this.erroBusca = 'Cliente não encontrado.';
        }
      },
      error: () => {
        this.erroBusca = 'Erro ao buscar cliente.';
      },
    });
  }

  private buscarPedidosDoCliente(clienteId: string): void {
    this.pedidosService.listarPorCliente(clienteId).subscribe({
      next: (pedidos) => {
        this.pedidosCliente = pedidos;
      },
      error: () => {
        this.erroBusca = 'Erro ao buscar pedidos.';
      },
    });
  }

  private resetarEstado(): void {
    this.clienteEncontrado = null;
    this.pedidosCliente = [];
    this.erroBusca = '';
  }
}
