import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../../_services/animal.service';
import { Animal } from '../../_models/animal';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home-search',
  templateUrl: './home-search.component.html',
  styleUrls: ['./home-search.component.css']
})
export class HomeSearchComponent implements OnInit {
  search = '';
  page = 1;
  animals: Animal[] = [];

  notEmptyPost = true;
  notscrolly = true;

  constructor(
    private animalService: AnimalService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getAnimal(this.page);
  }
  onScroll(){
    if (this.notscrolly && this.notEmptyPost) {
      this.spinner.show();
      this.notscrolly = false;
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
          this.page =  curPage+1;
          this.spinner.hide();
          if (res.data.length === 0 ) {
            this.notEmptyPost =  false;
          }
          this.notscrolly = true;
        }
      );
  }

}
