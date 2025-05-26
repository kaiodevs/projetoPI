import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../core/services/types';
import { ClientesService } from '../../core/services/clientes.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // boa prática em Standalone para *ngIf, *ngFor etc.

@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [CommonModule, RouterModule], // adiciona CommonModule para segurança
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {
  listaClientes: Cliente[] = [];

  constructor(
    private service: ClientesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes(): void {
    this.service.listar().subscribe((clientes) => {
      this.listaClientes = clientes;
    });
  }
}
