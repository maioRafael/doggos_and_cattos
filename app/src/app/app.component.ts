import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './_services/authentication.service';
import { User } from './_models/user';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Los Lobos & Los Gatos';
  user: User;
  constructor(
    private auth: AuthenticationService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.auth.currentUser.subscribe( value => this.user = value);
    this.matIconRegistry.addSvgIcon(
      "dog",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/dog.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "cat",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/cat.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "male",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/male.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "female",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/svg/female.svg")
    );
  }
  logout(){
    this.auth.logout();
  }



}
