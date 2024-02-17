import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';


import { UserService } from '../services/user.service';
import User from '../models/user';

import { RegistrationRequestService } from '../services/registration-request.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SchoolSubject } from '../models/schoolsubject';
import { SchoolsubjectService } from '../services/schoolsubject.service';
import { SubjectRequestService } from '../services/subject-request.service';



const isImageFile = (file: File) => {
  return file.type.startsWith('image/');
}

const isPdfFile = (file: File) => {
  return file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
}

const convertPdfToBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      // Check if the file is a PDF
      if (file.type === 'application/pdf') {
        resolve(fileReader.result);
      } else {
        reject(new Error('Selected file is not a PDF.'));
      }
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

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


const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]{3,})(?=.*\d)(?=.*[@$!%*?&])[A-Za-z][A-Za-z\d@$!%*?&]{5,9}$/;

const emailRegex = /^[a-zA-Z][a-zA-Z\d]{19}@[a-zA-Z]{15}\.com$/;


@Component({
  selector: 'app-register',
  templateUrl: './register-nastavnik.component.html',
  styleUrls: ['./register-nastavnik.component.css']
})
export class RegisterNastavnikComponent implements OnInit{

  
  @ViewChild('pol') pol!: ElementRef;
  
  constructor(private userService:UserService, private requestService: RegistrationRequestService,
     private http:HttpClient, private schoolSubjectService: SchoolsubjectService, private subjectRequestService: SubjectRequestService
   ) {
      
    }
  ngOnInit() : void {
    if (this.user.tipSkole == "") this.odabranTipSkole = false;
    this.user.razred = 0;
    this.loadImage('../assets/img/trainers/default.png');
    this.schoolSubjectService.dohvatiPredmete().subscribe(
      data => {
        this.listaPredmeta = data;
      }
    )
  }

  listaPredmeta: SchoolSubject[] = [];
  loadImage(imagePath: string) {
    // Send an HTTP GET request to fetch the image
    this.http.get(imagePath, { responseType: 'blob' }).subscribe({
      next: (data: Blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          // Set the base64 image source
          this.defaultProfilnaSkola = reader.result as string;
        };
        reader.readAsDataURL(data);
      },
      error: (error) => {
        console.error('Error loading image:', error);
      }
    });
  }

 
  
  odabranTipSkole: boolean = false;
  user: User = new User()

  userUcenik: boolean = false;
  userNastavnik: boolean = false;

  dodatakPredmet: string = "";

  defaultProfilnaSkola: string = "";

  errorDetected: boolean = false;
  usernameError: boolean = false;
  message: string = "";

  odabranRazred: boolean = false;
  odabirRazred() {
    this.odabranRazred = true;
  }

  tipSkole() {
    this.odabranTipSkole = true;
  }

  tipUcenik() {
    this.userUcenik = true;
    this.userNastavnik = false;
  }

  tipNastavnik() {
    this.userNastavnik = true;
    this.userUcenik = false;
  }

  
  registerNastavnik() {
    this.user.tip = 2;

    
    this.subjectRequestService.dodajZahtev(this.dodatakPredmet, this.user.korisnickoIme).subscribe(
      ok => {
        if (ok.message == "ok") {
          alert("Dodat zahtev za predmetom")
        }
      }
    )

    

    this.requestService.registerNastavnik(this.user).subscribe(
      rsp => {
        if(rsp.message=="ok") {
          this.message = "Послат захтев за регистрацијом."
        }
      }
    )
    
  }

  initialFile: boolean = false;

  

  outlineColor:string = 'initial';
  usernameMessage: string = "";
  usernameInput: string = "";
  async onUsernameChange(event: any) {
    this.usernameError = false;
    this.usernameInput = <string> event.target.value;
    this.userService.postojeciKorisnikIme(this.usernameInput).subscribe(
      data => {
        if (data.korisnickoIme == this.usernameInput)  {
          this.usernameError = true;
          this.usernameMessage = "Постоји корисник са датим корисничким именом."
          if (data.prihvacen == 0)
            this.usernameMessage = "Корисник се већ регистровао. Захтев за регистрацијом још увек није прихваћен."
          if (data.prihvacen == 2)
            this.usernameMessage = "Захтев за регистрацијом је одбијен.";
          if (data.prihvacen == 1)
            this.usernameMessage = "Постоји корисник са датом и-мејл адресом"
          
        } 
      
      }
    )

    this.requestService.postojeciKorisnikIme(this.usernameInput).subscribe(
      data => {
        if (data.korisnickoIme == this.usernameInput)  {
          this.usernameError = true;
          
          this.usernameMessage = "Постоји корисник са датим корисничким именом."
          if (data.prihvacen == 0)
            this.usernameMessage = "Корисник се већ регистровао. Захтев за регистрацијом још увек није прихваћен."
          if (data.prihvacen == 2)
            this.usernameMessage = "Захтев за регистрацијом је одбијен.";
          if (data.prihvacen == 1)
            this.usernameMessage = "Постоји корисник са датом и-мејл адресом"} 
      
      }
    )
  }

  emailMessage: string = "";
  emailError: boolean = false;
  emailInput: string = "";

  async onEmailChange(event: any)  {

    this.emailInput = event.target.value;
    this.emailMessage = "";
    this.emailError = false;
    

    this.userService.postojeciKorisnikImejl(this.emailInput).subscribe(
      data => {
        if (data.imejl == this.emailInput)  {
          this.emailError = true;
          this.emailMessage = "Постоји корисник са датом и-мејл адресом"
          if (data.prihvacen == 0)
            this.emailMessage = "Корисник се већ регистровао. Захтев за регистрацијом још увек није прихваћен."
          if (data.prihvacen == 2)
            this.emailMessage = "Захтев за регистрацијом је одбијен.";
          if (data.prihvacen == 1)
            this.emailMessage = "Постоји корисник са датом и-мејл адресом"
          
        } 
      }
    )
    this.requestService.postojeciKorisnikImejl(this.emailInput).subscribe(
      data => {
        if (data.imejl == this.emailInput)  {
          this.emailError = true;
          if (data.prihvacen == 0)
            this.emailMessage = "Корисник се већ регистровао. Захтев за регистрацијом још увек није прихваћен."
          if (data.prihvacen == 2)
            this.emailMessage = "Захтев за регистрацијом је одбијен.";
          if (data.prihvacen == 1)
            this.emailMessage = "Постоји корисник са датом и-мејл адресом"

        } 
      }
    )
  }

  predmetiRecnik: { [key: string]: boolean } = {
    "Математика": false,
    "Физика": false,
    "Хемија": false,
    "Информатика": false,
    "Програмирање": false,
    "Српски језик и књижевност": false,
    "Енглески језик": false,
    "Немачки језик": false,
    "Италијански језик": false,
    "Француски језик": false,
    "Шпански језик": false,
    "Латински језик": false,
    "Биологија": false,
    "Историја": false,
    "Географија": false,
    "Свет око нас": false,
    "dodatak": false
  };

  uzrastRecnik: {[key:string]: boolean} = {
    "Основна школа 1-4. разред": false,
    "Основна школа 5-8. разред": false,
    "Средња школа": false
  }

  initialPredmet: boolean = false;

  onCheckboxChange(pr: SchoolSubject, event: any) {
    let predmet = pr.imePredmeta;
    this.initialPredmet = true;
    if(event.target.checked) {
      this.user.predmet.push(predmet);
      this.predmetiRecnik[predmet] = true;
      console.log(predmet);
      this.invalidPredmeti = false;
    } else {
      this.user.predmet = this.user.predmet.filter(selected => selected !== predmet);
      this.predmetiRecnik[predmet] = false;
      this.invalidPredmeti = true;
      for (let p in this.predmetiRecnik) {
        console.log(p);
        if (this.predmetiRecnik[p]) {
          
          this.invalidPredmeti = false;
        }
      }
    }

  }
  initialUzrast: boolean = false;
  invalidUzrast: boolean = true;

  onCheckboxUzrastChange(uzrast: string, event: any) {
    this.initialUzrast = true;
    this.initialUzrast = true;
    if (event.target.checked) {
      this.user.uzrast.push(uzrast);
      this.invalidUzrast = false;
      this.uzrastRecnik[uzrast] = true;
    } else {
      this.user.uzrast = this.user.uzrast.filter(selected => selected !== uzrast);
      this.uzrastRecnik[uzrast] = false;
      this.invalidUzrast = true;
      for (let p in this.uzrastRecnik) {
        if (this.uzrastRecnik[p]) {
          this.invalidUzrast = false;
        }
      }
    }
  }

  imageUpload: string = "";
  pdfUpload: string = "";
  
  selectedFile: File | undefined ;

  invalidImage: boolean = false;
  messageImage: string = "";
  async onImageFileSelected(event: any){
    this.messageImage = "";
    this.invalidImage = false;
    this.selectedFile = <File>event.target.files[0];
    if (this.selectedFile instanceof File) {
      
      let fileName = this.selectedFile.name;
      let fileExtension = fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2);
      if (fileExtension.toLowerCase() !== 'jpg' && fileExtension.toLowerCase() !== 'png' && fileExtension.toLowerCase() !== 'jpeg') {
      this.invalidImage = true;
      this.messageImage = this.messageImage + "Погрешан формат слике.\n";
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
        return;
      }
      await img.decode();
      if (img.naturalHeight > 300 || img.naturalHeight < 100) {
        this.invalidImage = true;
        this.messageImage = this.messageImage + "Висина слике мора бити 100-300px.";
      }
      if (img.naturalWidth > 300 || img.naturalWidth < 100) {
        this.invalidImage = true;
        this.messageImage = this.messageImage + "Ширина слике мора бити 100-300px.";
        return;
      }
      this.imageUpload = await convertBase64(this.selectedFile) as string;
      this.user.profilnaSlika = this.imageUpload;
    } else {
      this.imageUpload = "";
      return; 
    }
    
  }

  velicina: number = 0;

  invalidFile: boolean = false;
  fileMessage: string = "";

  async onPdfFileSelected(event: any) {
    this.initialFile = true;
    this.invalidFile = false;
    this.fileMessage = "";
    this.selectedFile = <File>event.target.files[0];
    if (this.selectedFile instanceof File) {
      if (!isPdfFile(this.selectedFile)) {
        this.invalidFile = true;
        this.fileMessage = "Биографија мора бити PDF фајл."
        return;
      }
    }
    if (this.selectedFile instanceof File && isPdfFile(this.selectedFile)) {
      let fileName = this.selectedFile.name;
      let fileExtension = fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2);

      if (fileExtension.toLowerCase() !== 'pdf') {
        
        this.invalidFile = true;
        this.fileMessage = "Биографија мора бити PDF фајл."
        return;
      }
      this.velicina = this.selectedFile.size;
      if (this.selectedFile.size > 3145728) { // 3 * 1024 * 1023 = 3MB
        this.invalidFile = true;
        this.fileMessage = "Максимална величина фајла је 3MB.";
        return;
      }
      this.pdfUpload = await convertPdfToBase64(this.selectedFile) as string;
      this.user.biografija = this.pdfUpload;
    } else {
      return; // greska
    }
  } 

  izabranPol = false;
  validacijaPola() {
    const radioButtons = this.pol.nativeElement.querySelectorAll('input[type="radio"]');
    this.izabranPol = Array.from(radioButtons).some((radio: any) => (radio as HTMLInputElement).checked);
  
  }
  dodajPredmet: boolean = false;
  dodajPredmetFun() {
    this.dodajPredmet = !this.dodajPredmet;
    this.predmetiRecnik["dodatak"] = !this.predmetiRecnik["dodatak"];
    this.invalidPredmeti = true;
      for (let p in this.predmetiRecnik) {
        if (this.predmetiRecnik[p] == true) {
          this.invalidPredmeti = false;
        }
      }
    
  }

  invalidPredmeti: boolean = true;

  

}
