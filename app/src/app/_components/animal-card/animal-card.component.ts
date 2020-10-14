import {Component, Input, OnInit} from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { Animal } from '../../_models/animal';

@Component({
  selector: 'app-animal-card',
  templateUrl: './animal-card.component.html',
  styleUrls: ['./animal-card.component.css']
})
export class AnimalCardComponent implements OnInit {
  @Input() animal: Animal;
  imgSrc = 'http://127.0.0.1:8000/assets/img/animals/';
  constructor(
  ) {

  }
  translateImgSrc(id): string{
    return id + '.png';
  }
  ngOnInit(): void {

  }
  random(){
    return Math.random()>0.5;
  }

}
