import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import User from '../models/user';

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
  selector: 'app-ucenik-profil',
  templateUrl: './ucenik-profil.component.html',
  styleUrls: ['./ucenik-profil.component.css']
})
export class UcenikProfilComponent implements OnInit{


  @ViewChild('myModal') myModal: any;
  constructor(private userService: UserService) {}

  ngOnInit() {
    
    let loggedIn = localStorage.getItem("loggedIn");
    //this.userService.updateNavbar(this.loggedIn);
    console.log(loggedIn)
    if(loggedIn){
      this.userService.dohvatiKorisnika(loggedIn).subscribe(user=>{
        this.user= user;
      })
    }

  }
  user: User = new User();

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
  promenaTipSkole: string = "";
  promenaRazred: number | undefined;

  
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

  invalidTipSkole: boolean = false;
  tipSkoleError: string = "";
  promenjenTipSkole: boolean = false;

  tipSkole(event: any) {
    if (event.target.value === "") {
      this.tipSkoleError = "";
      this.invalidTipSkole = false;
      
    if (<number>this.promenaRazred < this.user.razred) {
      this.razredError = "Не можете прећи у разред мањи од тренутног";
      this.invalidRazred = true;
      this.promenjenTipSkole = false;
      return;
    }
      this.promenjenTipSkole = false;
      return;
    }
    this.promenaTipSkole = event.target.value;
    this.tipSkoleError = "";
    this.invalidTipSkole = false;
    if (this.user.tipSkole.includes("средња")) {
      if (this.promenaTipSkole === "основна") {
        this.invalidTipSkole = true;
        this.tipSkoleError = "Не можете прећи у основну школу, ако сте већ у средњој."
        this.promenjenTipSkole = false;
        return;
      }
    }
    if (!this.promenaTipSkole.includes("средња")) {
      if (<number>this.promenaRazred < this.user.razred) {
        this.razredError = "Не можете прећи у разред мањи од тренутног";
        this.invalidRazred = true;
        this.promenjenTipSkole = false;
        return;
      }
  } else {
    if (<number>this.promenaRazred > 4) {
      this.invalidRazred = true;
      this.razredError = "Средња школа има 4 разреда.";
      this.promenjenTipSkole = false;
      return;
    }
  }
  this.promenjenTipSkole = true;
  }

  invalidRazred: boolean = false;
  razredError: string = "";
  promenjenRazred: boolean = false;

  razred(event: any) {
    if (event.target.value === "") {
      
    this.invalidRazred = false;
    this.razredError = "";
    this.promenjenRazred = false;
    return;
    }
    this.promenaRazred = event.target.value;
    this.invalidRazred = false;
    this.razredError = "";
    if (this.user.tipSkole == "основна") {

      if (!this.promenaTipSkole.includes("средња")) {
          if (<number>this.promenaRazred < this.user.razred) {
            this.razredError = "Не можете прећи у разред мањи од тренутног";
            this.invalidRazred = true;
            this.promenjenRazred = false;
            return;
          }
      } else {
        if (<number>this.promenaRazred > 4) {
          this.invalidRazred = true;
          this.razredError = "Средња школа има 4 разреда.";
          this.promenjenRazred = false;
          return;
        }
      }
    } else {
      if (<number>this.promenaRazred < this.user.razred) {
        this.razredError = "Не можете прећи у разред мањи од тренутног";
        this.invalidRazred = true;
        this.promenjenRazred = false;
        return;
      }
    }
    this.promenjenRazred = true;
  }

  izmeni() {

    if (this.invalidRazred || this.invalidTipSkole || this.emailError || this.invalidImage) {
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

    if(this.promenjenTipSkole) {
      this.userService.promeniTipSkole(this.user.korisnickoIme, this.promenaTipSkole).subscribe(
        ok => {
          alert("promenjen tip skole")
        }
      )
    }
    if (this.promenjenRazred) {
      this.userService.promeniRazred(this.user.korisnickoIme, <number>this.promenaRazred).subscribe(
        ok => {
          alert("promenjen razred");
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

}

