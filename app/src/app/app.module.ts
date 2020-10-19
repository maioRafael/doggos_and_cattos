import { BrowserModule } from '@angular/platform-browser';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeSearchComponent } from './_components/home-search/home-search.component';
import { LoginComponent } from './_components/login/login.component';
import { DashboardComponent } from './_components/dashboard/dashboard.component';

import { ErrorInterceptor } from './_helpers/error.interceptor';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { UserProfileComponent } from './_components/user-profile/user-profile.component';
import { AnimalCardComponent } from './_components/animal-card/animal-card.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DashHumanoComponent } from './_components/dash-humano/dash-humano.component';
import { DashAnimalComponent } from './_components/dash-animal/dash-animal.component';
import { AnimalFormComponent } from './_components/animal-form/animal-form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { ImageCropperModule } from 'ngx-image-cropper';
import { AnimalFormConfirmDialogComponent } from './_components/animal-form-confirm-dialog/animal-form-confirm-dialog.component';
import { AnimalDetailsComponent } from './_components/animal-details/animal-details.component';
import { ConfirmationDialogComponent } from './_components/confirmation-dialog/confirmation-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeSearchComponent,
    LoginComponent,
    DashboardComponent,
    UserProfileComponent,
    AnimalCardComponent,
    DashHumanoComponent,
    DashAnimalComponent,
    AnimalFormComponent,
    AnimalFormConfirmDialogComponent,
    AnimalDetailsComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ImageCropperModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    MatDatepickerModule,
    MatNativeDateModule

  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
