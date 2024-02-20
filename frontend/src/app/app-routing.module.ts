import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { RegisterComponent } from './register/register.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RegisterNastavnikComponent } from './register-nastavnik/register-nastavnik.component';
import { UcenikProfilComponent } from './ucenik-profil/ucenik-profil.component';
import { LoginComponent } from './login/login.component';
import { UcenikNastavniciComponent } from './ucenik-nastavnici/ucenik-nastavnici.component';
import { DetaljiNastavnikComponent } from './detalji-nastavnik/detalji-nastavnik.component';
import { NastavnikProfilComponent } from './nastavnik-profil/nastavnik-profil.component';
import { NastavnikCasoviComponent } from './nastavnik-casovi/nastavnik-casovi.component';
import { DiagramBarComponent } from './diagram-bar/diagram-bar.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { UcenikCasoviComponent } from './ucenik-casovi/ucenik-casovi.component';
import { NastavnikUceniciComponent } from './nastavnik-ucenici/nastavnik-ucenici.component';
import { DiagramPieComponent } from './diagram-pie/diagram-pie.component';
import { DiagramHistogramComponent } from './diagram-histogram/diagram-histogram.component';
import { LineController } from 'chart.js';
import { DiagramLinesComponent } from './diagram-lines/diagram-lines.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  {path: 'loginAdmin', component: LoginAdminComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'promeni', component: ChangePasswordComponent},
  { path: 'register', component: RegisterComponent},
  {path: 'registerNastavnik', component: RegisterNastavnikComponent},
  {path: 'ucenik-profil', component: UcenikProfilComponent},
  {path: 'ucenik-nastavnici', component: UcenikNastavniciComponent},
  {path: 'login', component: LoginComponent},
  {path: 'detalji-nastavnik', component: DetaljiNastavnikComponent},
  {path: 'nastavnik-profil', component: NastavnikProfilComponent},
  {path: 'nastavnik-casovi', component: NastavnikCasoviComponent},
  {path: 'ucenik-casovi', component: UcenikCasoviComponent},
  {path: 'nastavnik-ucenici', component: NastavnikUceniciComponent},
  {path: 'cpie', component: DiagramPieComponent },
  {path: 'dbar', component: DiagramBarComponent},
  {path: 'histo', component: DiagramHistogramComponent},
  {path: 'line', component: DiagramLinesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
