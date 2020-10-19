import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimalService } from '../../_services/animal.service';
import { Animal } from '../../_models/animal';
import { Location } from '@angular/common';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-animal-details',
  templateUrl: './animal-details.component.html',
  styleUrls: ['./animal-details.component.css']
})
export class AnimalDetailsComponent implements OnInit {
  env = environment;
  id;
  animal: Animal;
  panelOpenState = [true, false];

  constructor(
    private route: ActivatedRoute,
    private animalService: AnimalService,
    private location: Location
  ) {
    this.route.paramMap.subscribe( paramMap => {
      this.id = paramMap.get('id');
      this.loadAnimalData();
    });
  }

  back(){
    this.location.back();
  }
  loadAnimalData(){
    this.animalService
      .getAnimal(this.id)
      .subscribe(
        res => {
          this.animal = res;
        },
        error => {
          alert('Falha ao carregar dados');
        }
      );
  }
  ngOnInit(): void {
  }

}
