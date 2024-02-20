import { Component, ViewChild } from '@angular/core';
import { SchoolSubject } from '../models/schoolsubject';
import { UserService } from '../services/user.service';
import User from '../models/user';
import { SchoolsubjectService } from '../services/schoolsubject.service';
import { Router } from '@angular/router';

const convertBase64 = (file: File) => {
  return new Promise((reslove, reject) => {{
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      reslove(fileReader.result);
    }

    fileReader.onerror = (error) => {
      reject(error);
    }
  }})
}

const isImageFile = (file: File) => {
  return file.type.startsWith('image/');
}

@Component({
  selector: 'app-nastavnik-profil',
  templateUrl: './nastavnik-profil.component.html',
  styleUrls: ['./nastavnik-profil.component.css']
})
export class NastavnikProfilComponent {

  @ViewChild('myModal') myModal: any;
  constructor(private userService: UserService,
    private schoolSubjectService: SchoolsubjectService,
    private router: Router) {}

  ngOnInit() {

    let loggedIn = localStorage.getItem("loggedIn");
    //this.userService.updateNavbar(this.loggedIn);
    console.log(loggedIn)
    if(loggedIn){
      this.userService.dohvatiKorisnika(loggedIn).subscribe(user=>{
        this.user= user;
      })
    }
    this.schoolSubjectService.dohvatiPredmete().subscribe(
      data => {

        this.listaPredmeta = data;
        for (let p of data) {
          this.predmeti.push(p.imePredmeta);
          this.predmetiBoolean.push(false);
        }
        this.predmetiRecnik = this.kreirajRecnik(this.predmeti, this.predmetiBoolean);
      }
    )

  }

  listaPredmeta: SchoolSubject[] = [];
  user: User = new User();

  kreirajRecnik(keys: string[], values: boolean[]): Record<string, boolean> {
    const recnik: Record<string, boolean> = {};

    keys.forEach((key, index) => {
        recnik[key] = values[index];
    });

    return recnik;
}


  openModal() {
    // Show the modal
    this.myModal.nativeElement.style.display = 'block';
  }

  closeModal() {
    // Hide the modal
    this.myModal.nativeElement.style.display = 'none';
  }

  promenaIme: string = "";
  promenaPrezime: string = "";
  promenaAdresa: string = "";
  promenaImejl: string = "";
  promenaKontaktTelefon: string = "";

  predmetiBoolean: boolean[] = [];
  predmeti: string[] = [];

  predmetiRecnik: { [key: string]: boolean } = {
  };



  promenjeniPredmeti: boolean = false;
  promenjenUzrast: boolean = false;


  onCheckboxChange(pr: SchoolSubject, event: any) {
    let predmet = pr.imePredmeta;
    if(event.target.checked) {
      this.noviPredmeti.push(predmet);

      this.predmetiRecnik[predmet] = true;
      this.promenjeniPredmeti = true;


    } else {
      this.noviPredmeti = this.noviPredmeti.filter(selected => selected !== predmet);
      this.predmetiRecnik[predmet] = false;
      this.promenjeniPredmeti = false;
      for (let p in this.predmetiRecnik) {
        console.log(p);
        if (this.predmetiRecnik[p]) {

          this.promenjeniPredmeti = true;
        }
      }
    }

  }

  noviUzrast: string[] = [];
  noviPredmeti: string[] = [];

  uzrastRecnik: {[key:string]: boolean} = {
    "Основна школа 1-4. разред": false,
    "Основна школа 5-8. разред": false,
    "Средња школа": false
  }

  onCheckboxUzrastChange(uzrast: string, event: any) {
    if (event.target.checked) {
      this.noviUzrast.push(uzrast);
      this.uzrastRecnik[uzrast] = true;
      this.promenjenUzrast = true;
    } else {
      this.noviUzrast = this.noviUzrast.filter(selected => selected !== uzrast);
      this.uzrastRecnik[uzrast] = false;
      this.promenjenUzrast = false;
      for (let p in this.uzrastRecnik) {
        if (this.uzrastRecnik[p]) {
          this.promenjenUzrast = true;
        }
      }
    }
  }


  emailMessage: string = "";
  emailError: boolean = false;

  async onEmailChange(event: any)  {

    this.promenaImejl = event.target.value;
    this.emailMessage = "";
    this.emailError = false;


    this.userService.postojeciKorisnikImejl(this.promenaImejl).subscribe(
      data => {
        if (data.imejl == this.promenaImejl)  {
          this.emailError = true;
          this.emailMessage = "Постоји корисник са датом и-мејл адресом"
          this.promenaImejl = "";
        }
      }
    )
  }


  imageUpload: string = "";
  pdfUpload: string = "";

  selectedFile: File | undefined ;

  invalidImage: boolean = false;
  messageImage: string = "";
  async onImageFileSelected(event: any){
    this.messageImage = "";
    this.selectedFile = <File>event.target.files[0];
    if (this.selectedFile instanceof File) {

      let fileName = this.selectedFile.name;
      let fileExtension = fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2);
      if (fileExtension.toLowerCase() !== 'jpg' && fileExtension.toLowerCase() !== 'png' && fileExtension.toLowerCase() !== 'jpeg') {
      this.invalidImage = true;
      this.messageImage = this.messageImage + "Погрешан формат слике.\n";
      this.imageUpload = "";
      return;
    }
    }
    if (this.selectedFile instanceof File && isImageFile(this.selectedFile)) {
      let img = new Image();
      img.src = URL.createObjectURL(this.selectedFile);
      let fileName = this.selectedFile.name;
      let fileExtension = fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2);

      if (fileExtension.toLowerCase() !== 'jpg' && fileExtension.toLowerCase() !== 'png' && fileExtension.toLowerCase() !== 'jpeg') {
        this.invalidImage = true;
        this.messageImage = this.messageImage + "Погрешан формат слике.\n";
        this.imageUpload = "";
        return;
      }
      await img.decode();
      if (img.naturalHeight > 300 || img.naturalHeight < 100) {
        this.invalidImage = true;
        this.messageImage = this.messageImage + "Висина слике мора бити 100-300px.\n";
        this.imageUpload = "";
        return;
      }
      if (img.naturalWidth > 300 || img.naturalWidth < 100) {
        this.invalidImage = true;
        this.messageImage = this.messageImage + "Ширина слике мора бити 100-300px.\n";
        this.imageUpload = "";
        return;
      }
      this.imageUpload = await convertBase64(this.selectedFile) as string;
    //  this.user.profilnaSlika = this.imageUpload;
    } else {
      this.imageUpload = "";
      return;
    }



  }
  izmeni() {

    if (  this.emailError || this.invalidImage) {
      return;
    }

    if(this.promenaIme !== "") {
      this.userService.promeniIme(this.user.korisnickoIme,this.promenaIme).subscribe(
        ok => {
          alert("promenjeno Ime");
        }
      )
    }
    if(this.promenaPrezime !== "") {
      this.userService.promeniPrezime(this.user.korisnickoIme,this.promenaPrezime).subscribe(
        ok => {
          alert("promenjeno prezime");
        }
      )
    }
    if(this.promenaAdresa !== "") {
      this.userService.promeniAdresu(this.user.korisnickoIme,this.promenaAdresa).subscribe(
        ok => {
          alert("promenjeno adresa");
        }
      )
    }
    if (this.promenaImejl !== "") {
      this.userService.promeniImejl(this.user.korisnickoIme, this.promenaImejl).subscribe(
        ok => {
          alert("promenjen imejl")
        }
      )
    }

    if(this.promenaKontaktTelefon !== "") {
      this.userService.promeniKontaktTelefon(this.user.korisnickoIme, this.promenaKontaktTelefon).subscribe(
        ok => {
          alert("promenjen telefon")
        }
      )
    }
    if(this.promenjenUzrast) {
      // promeni uzrast
      this.userService.promeniUzrast(this.user.korisnickoIme, this.noviUzrast).subscribe(
        ok => {

        }
      )

    }

    if(this.promenjeniPredmeti) {
      // promeni predmete
      this.userService.promeniPredmete(this.user.korisnickoIme, this.noviPredmeti).subscribe(
        ok => {

        }
      )
    }
    if (this.imageUpload !== "") {
      this.userService.promeniProfilnuSliku(this.user.korisnickoIme, this.imageUpload).subscribe(
        ok => {
          alert("promenjena profilna slika");
        }
      )
    }


  }

  odjaviSe() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  nastavnikUcenici() {
    this.router.navigate(['nastavnici-ucenici'])
  }

  nastavnikCasovi() {
    this.router.navigate(['nastavnik-casovi'])
  }

  promeniLozinku() {
    this.router.navigate(['promeni']);
  }


}
