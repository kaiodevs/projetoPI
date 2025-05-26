import { Injectable } from '@angular/core';
import { Jogo } from './types';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JogosService {

  private readonly API = 'http://localhost:3000/jogos';

  constructor(private http: HttpClient) { }

  listar(): Observable<Jogo[]> {
    return this.http.get<Jogo[]>(this.API).pipe(
      catchError(err => {
        console.error('Erro ao listar jogos', err);
        return throwError(() => err);
      })
    );
  }

  incluir(jogo: Omit<Jogo, 'id'>): Observable<Jogo> {
    return this.http.post<Jogo>(this.API, jogo).pipe(
      catchError(err => {
        console.error('Erro ao incluir jogo', err);
        return throwError(() => err);
      })
    );
  }

  buscarPorId(id: string | number): Observable<Jogo> {
    return this.http.get<Jogo>(`${this.API}/${id}`).pipe(
      catchError(err => {
        console.error(`Erro ao buscar jogo id=${id}`, err);
        return throwError(() => err);
      })
    );
  }

  editar(jogo: Jogo): Observable<Jogo> {
    if (!jogo.id) {
      return throwError(() => new Error('ID do jogo é obrigatório para edição'));
    }
    return this.http.put<Jogo>(`${this.API}/${jogo.id}`, jogo).pipe(
      catchError(err => {
        console.error(`Erro ao editar jogo id=${jogo.id}`, err);
        return throwError(() => err);
      })
    );
  }

  excluir(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`).pipe(
      catchError(err => {
        console.error(`Erro ao excluir jogo id=${id}`, err);
        return throwError(() => err);
      })
    );
  }
}
