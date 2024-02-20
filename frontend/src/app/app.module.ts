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
import { DetaljiNastavnikComponent } from './detalji-nastavnik/detalji-nastavnik.component';
import { NastavnikProfilComponent } from './nastavnik-profil/nastavnik-profil.component';
import { NastavnikCasoviComponent } from './nastavnik-casovi/nastavnik-casovi.component';
import { NastavnikUceniciComponent } from './nastavnik-ucenici/nastavnik-ucenici.component';
import { DiagramBarComponent } from './diagram-bar/diagram-bar.component';
import { DiagramPieComponent } from './diagram-pie/diagram-pie.component';
import { DiagramHistogramComponent } from './diagram-histogram/diagram-histogram.component';
import { DiagramLinesComponent } from './diagram-lines/diagram-lines.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { NgChartsModule} from 'ng2-charts';
import { CreateJSONComponent } from './create-json/create-json.component'

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
    UcenikObavestenjaComponent,
    DetaljiNastavnikComponent,
    NastavnikProfilComponent,
    NastavnikCasoviComponent,
    NastavnikUceniciComponent,
    DiagramBarComponent,
    DiagramPieComponent,
    DiagramHistogramComponent,
    DiagramLinesComponent,
    LoginAdminComponent,
    CreateJSONComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
