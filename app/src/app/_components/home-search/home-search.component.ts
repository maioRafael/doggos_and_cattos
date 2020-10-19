import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../../_services/animal.service';
import { AuthenticationService } from '../../_services/authentication.service';
import { Animal } from '../../_models/animal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../_models/user';

@Component({
  selector: 'app-home-search',
  templateUrl: './home-search.component.html',
  styleUrls: ['./home-search.component.css']
})
export class HomeSearchComponent implements OnInit {
  search = '';
  page = 1;
  animals: Animal[] = [];
  user: User;
  notEmptyPost = true;
  notscrolly = true;
  canManipulate = false;
  constructor(
    private animalService: AnimalService,
    private spinner: NgxSpinnerService,
    private auth: AuthenticationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getAnimal(this.page);
    this.auth.currentUser.subscribe(user => {
      this.user = user;
      this.route.pathFromRoot[1].url.subscribe(val => {
        this.canManipulate = val.length === 1 && val[0].path === 'dash-animal' && this.user && this.user.isAdmin === 1;
      });
    });
  }
  onScroll(){
    if (this.notscrolly && this.notEmptyPost) {
      this.spinner.show();
      this.notscrolly = false;
      if (this.page !== 1)
        this.getAnimal(this.page);
    }
  }



  getAnimal($page){
    this.animalService.paginateAnimal($page)
      .subscribe( res => {
          let curPage = parseInt(res.page);
          if (this.page === 1){
            this.animals = res.data;
          } else {
            this.animals = this.animals.concat(res.data);
          }
          this.spinner.hide();
          if (res.data.length === 0 ) {
            this.notEmptyPost =  false;
          }
          this.notscrolly = true;
          this.page =  curPage+1;
        }
      );
  }

}
