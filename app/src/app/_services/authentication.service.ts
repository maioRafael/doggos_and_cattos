import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError  } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient,
              private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string){
    return this.http.post(`${environment.apiUrl}/api/auth/login`,
      { email, password },
      {observe: 'response'})
      .pipe(
        catchError(this.erroHandler),
        map(response => {
          localStorage.setItem('currentUser', JSON.stringify(response.body));
          this.currentUserSubject.next(response.body);
          return response;
        })
      );
  }

  erroHandler(error: HttpErrorResponse) {
    let msg = 'Erro';
    switch (error.status){
      case 401:
        msg += ' - não autorizado';
        break;
      case 500:
        msg += ' - falha no servidor';
        break;
      default:
        msg += ' desconhecido';
        break;
    }
    return throwError(msg);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }
}
