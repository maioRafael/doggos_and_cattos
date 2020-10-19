import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NgxSpinnerService } from 'ngx-spinner';
import { Animal } from '../../_models/animal';
import { AnimalService } from '../../_services/animal.service';
import { first } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AnimalFormConfirmDialogComponent } from '../animal-form-confirm-dialog/animal-form-confirm-dialog.component';
import { Location } from '@angular/common';

import { environment } from '@environments/environment';
@Component({
  selector: 'app-animal-form',
  templateUrl: './animal-form.component.html',
  styleUrls: ['./animal-form.component.css']
})
export class AnimalFormComponent implements OnInit {
  id = null;
  animalForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  url: any;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  dateError = '';
  noImage = true;
  env = environment;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private animalService: AnimalService,
    public dialog: MatDialog,
    private location: Location
  ) {
    this.route.pathFromRoot[1].url.subscribe
    (val => this.id = val.length === 2 ? val[1].path : null );
  }
  back(){
    this.location.back();
  }
  openDialog(id, operation) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      operation: operation
    };
    const dialogRef = this.dialog.open(AnimalFormConfirmDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['/animal-details', id]);
      }
    });
  }

  translateImgSrc(id): string{
    return id + '.png';
  }
  ngOnInit(): void {
    this.animalForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      is_birth_aprox: ['', Validators.required],
      birth_date: ['', Validators.required],
      species: ['', Validators.required],
      gender: ['', Validators.required]
    });
    if (this.id) {
      this.loadAnimalData();
    }
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.noImage = false;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
    this.croppedImage = '';
  }

  get a() { return this.animalForm.controls; }

  onSubmit(): void{
    if (this.id){
      this.update();
    } else {
      this.create();
    }
  }

  update(): void{
    this.submitted = true;
    if (this.animalForm.invalid) {
      return;
    }
    const today = new Date();
    const auxDate = this.animalForm.controls.birth_date.value;
    let birth_date: number;
    if (today.getTime() - auxDate < 0 ) {
      this.dateError = 'Data inválida';
      return;
    } else {
      birth_date = (auxDate.getTime() - auxDate.getMilliseconds())/1000;
      this.dateError = '';
    }
    let formData: Animal = {
      birth_date,
      name: this.animalForm.controls.name.value,
      description: this.animalForm.controls.description.value,
      is_birth_aprox: this.animalForm.controls.is_birth_aprox.value,
      species: this.animalForm.controls.species.value,
      gender: this.animalForm.controls.gender.value
    };

    if (this.croppedImage !== ''){
      formData.base64img = this.croppedImage;
    }
    this.spinner.show();

    this.animalService.updateAnimal(this.id, formData)
      .pipe(first())
      .subscribe(
        data => {
          this.spinner.hide();
          this.error = '';
          this.openDialog(data.id,0);
        },
        error => {
          this.error = error;
          this.spinner.hide();
        });
  }

  create(): void{
    this.submitted = true;
    if (this.animalForm.invalid) {
      return;
    }
    const today = new Date();
    const auxDate = this.animalForm.controls.birth_date.value;
    let birth_date: number;
    if (today.getTime() - auxDate < 0 ) {
      this.dateError = 'Data inválida';
      return;
    } else {
      birth_date = (auxDate.getTime() - auxDate.getMilliseconds())/1000;
      this.dateError = '';
    }

    const formData: Animal = {
      birth_date,
      name: this.animalForm.controls.name.value,
      description: this.animalForm.controls.description.value,
      is_birth_aprox: this.animalForm.controls.is_birth_aprox.value,
      species: this.animalForm.controls.species.value,
      gender: this.animalForm.controls.gender.value,
      base64img: this.croppedImage
    };

    this.spinner.show();

    this.animalService.createAnimal(formData)
      .pipe(first())
      .subscribe(
        data => {
          this.spinner.hide();
          this.error = '';
          this.animalForm.reset();
          this.croppedImage = '';
          this.imageChangedEvent = '';
          this.submitted = false;
          this.openDialog(data.id,1);
        },
        error => {
          this.error = error;
          this.spinner.hide();
    });
  }
  loadAnimalData(): void{
    this.animalService.getAnimal(this.id)
      .subscribe( res => {
        this.animalForm.controls.name.setValue(res.name);
        this.animalForm.controls.description.setValue(res.description);
        this.animalForm.controls.is_birth_aprox.setValue(res.is_birth_aprox);
        this.animalForm.controls.species.setValue(res.species);
        this.animalForm.controls.gender.setValue(res.gender);
        let b = new Date(res.birth_date);
        b = new Date(b.getTime() + b.getTimezoneOffset() * 60000);
        this.animalForm.controls.birth_date.setValue(b);
      });

  }
}
