export interface Cliente {
    id?: string;
    nome: string;
    email: string;
    telefone: string;
    senha: string;
}

export interface Jogo {
  id?: number;
  titulo: string;
  preco: number;
  genero: string;
  imagemUrl: string;
} 
export interface Pedido {
  id?: string;
  clienteId: string;
  valor: number;
  jogoNome: string[]; 
}