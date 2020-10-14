import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../_services/authentication.service';
import { User } from '../../_models/user';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: User;
  constructor(private http: HttpClient, private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.auth.currentUser.subscribe( value => this.user = value);
  }
  // test(){
  //   return this.http.get<any>(`${environment.apiUrl}/api/users`)
  //   .subscribe(val => console.log(val));
  // }
}
