import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { RegisterComponent } from './register/register.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RegisterNastavnikComponent } from './register-nastavnik/register-nastavnik.component';
import { UcenikProfilComponent } from './ucenik-profil/ucenik-profil.component';
import { LoginComponent } from './login/login.component';
import { UcenikNastavniciComponent } from './ucenik-nastavnici/ucenik-nastavnici.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'promeni', component: ChangePasswordComponent},
  { path: 'register', component: RegisterComponent},
  {path: 'registerNastavnik', component: RegisterNastavnikComponent},
  {path: 'ucenik-profil', component: UcenikProfilComponent},
  {path: 'ucenik-nastavnici', component: UcenikNastavniciComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
