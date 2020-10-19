import {Component, Input, OnInit} from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { Animal } from '../../_models/animal';
import { AnimalService } from '../../_services/animal.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../_components/confirmation-dialog/confirmation-dialog.component';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-animal-card',
  templateUrl: './animal-card.component.html',
  styleUrls: ['./animal-card.component.css']
})
export class AnimalCardComponent implements OnInit {
  @Input() animal: Animal;
  @Input() canManipulate = false;
  env = environment;
  constructor(
    public dialog: MatDialog,
    public animalService: AnimalService,
  ) {

  }
  confirmarExclusao(id) {
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.animalService
          .delete(id).subscribe(res => {
            this.animal.deleted = true;
        });
      }
    });
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
