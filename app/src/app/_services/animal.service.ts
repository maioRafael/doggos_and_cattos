import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError  } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Animal } from '../_models/animal';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {


  constructor(private http: HttpClient,
              private router: Router) {
  }
  delete(id){
    return this.http.delete(`${environment.apiUrl}/api/animal/${id}`,
      {observe: 'response'})
      .pipe(
        catchError(this.erroHandler),
        map( (response: any) => {
          return response.body;
        })
      );
  }
  paginateAnimal(page: number = 1){
    return this.http.get(`${environment.apiUrl}/api/animal/list/${page}`,
    {observe: 'response'})
    .pipe(
      catchError(this.erroHandler),
      map( (response: any) => {
        return response.body;
      })
    );
  }
  createAnimal(animal: Animal){
    return this.http.post(`${environment.apiUrl}/api/animal`,
      animal,
      {observe: 'response'})
      .pipe(
        catchError(this.erroHandler),
        map( (response: any) => {
          return response.body;
        })
      );
  }
  updateAnimal(id, animal: Animal){
    return this.http.patch(`${environment.apiUrl}/api/animal/${id}`,
      animal,
      {observe: 'response'})
      .pipe(
        catchError(this.erroHandler),
        map( (response: any) => {
          return response.body;
        })
      );
  }
  getAnimal(id){
    return this.http.get(`${environment.apiUrl}/api/animal/${id}`,
      {observe: 'response'})
      .pipe(
        catchError(this.erroHandler),
        map( (response: any) => {
          return response.body;
        })
      );
  }
  erroHandler(error: HttpErrorResponse) {
    let msg = '';
    switch (error.status){
      case 401:
        msg += 'Não autorizado';
        break;
      case 500:
        msg += 'Falha no servidor';
        break;
      case 406:
        msg += 'Dados inválidos';
        break;
      default:
        msg += 'Problema desconhecido';
        break;
    }
    return throwError(msg);
  }
}
