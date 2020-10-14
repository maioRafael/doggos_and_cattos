import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NgxSpinnerService } from 'ngx-spinner';
import { Animal } from '../../_models/animal';
import { AnimalService } from '../../_services/animal.service';
import { first } from 'rxjs/operators';

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

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private animalService: AnimalService
  ) {
    this.route.pathFromRoot[1].url.subscribe
    (val => this.id = val.length === 2 ? val[1].path : null );
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
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  get a() { return this.animalForm.controls; }

  onSubmit(): void{
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

    if (this.croppedImage === ''){
      alert('sem imagem');
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
          alert(data);
          this.spinner.hide();
          this.error = '';
        },
        error => {
          this.error = error;
          this.spinner.hide();
    });
  }
  loadAnimalData(): void{

  }

}
