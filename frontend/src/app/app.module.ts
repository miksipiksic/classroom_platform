import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RegisterComponent } from './register/register.component';
import { SearchTeachersComponent } from './search-teachers/search-teachers.component';
import { RegisterNastavnikComponent } from './register-nastavnik/register-nastavnik.component';
import { UcenikProfilComponent } from './ucenik-profil/ucenik-profil.component';
import { UcenikNastavniciComponent } from './ucenik-nastavnici/ucenik-nastavnici.component';
import { UcenikCasoviComponent } from './ucenik-casovi/ucenik-casovi.component';
import { UcenikObavestenjaComponent } from './ucenik-obavestenja/ucenik-obavestenja.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    HomeComponent,
    ChangePasswordComponent,
    RegisterComponent,
    SearchTeachersComponent,
    RegisterNastavnikComponent,
    UcenikProfilComponent,
    UcenikNastavniciComponent,
    UcenikCasoviComponent,
    UcenikObavestenjaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
