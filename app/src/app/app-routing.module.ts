import { NgModule } from '@angular/core';
import { Routes, RouterModule, UrlMatchResult, UrlSegment } from '@angular/router';
import { HomeSearchComponent } from './_components/home-search/home-search.component';
import { DashboardComponent } from './_components/dashboard/dashboard.component';
import { DashHumanoComponent } from './_components/dash-humano/dash-humano.component';
import { DashAnimalComponent } from './_components/dash-animal/dash-animal.component';
import { LoginComponent } from './_components/login/login.component';
import { UserProfileComponent } from './_components/user-profile/user-profile.component';
import { AuthGuard } from './_helpers/auth.guard';
import { AnimalFormComponent } from './_components/animal-form/animal-form.component';

export function animalPageMatcher(segments: UrlSegment[]): UrlMatchResult {
  if (segments.length > 0 && segments[0].path === 'animal-form') {
    if (segments.length === 1) {
      return {
        consumed: segments,
        posParams: {},
      };
    }
    if (segments.length === 2) {
      return {
        consumed: segments,
        posParams: { id: segments[1] },
      };
    }
    return <UrlMatchResult>(null as any);
  }
  return <UrlMatchResult>(null as any);
}
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: HomeSearchComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dash-humano',
    component: DashHumanoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dash-animal',
    component: DashAnimalComponent,
    canActivate: [AuthGuard]
  },
  {
    matcher: animalPageMatcher,
    component: AnimalFormComponent,
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
