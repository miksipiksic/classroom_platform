import { Component, ElementRef, ViewChild } from '@angular/core';


import { UserService } from '../services/user.service';
import User from '../models/user';

import { RegistrationRequestService } from '../services/registration-request.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



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
export class RegisterNastavnikComponent {

  
  @ViewChild('pol') pol!: ElementRef;
  
  constructor(private userService:UserService, private requestService: RegistrationRequestService, private http:HttpClient
    , private formBuilder: FormBuilder) {
      this.loginForm = this.formBuilder.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]],
        email: ['', [Validators.required]]
      })
    }
    loginForm: FormGroup | undefined;
  ngOnInit() : void {
    if (this.user.tipSkole == "") this.odabranTipSkole = false;
    this.user.razred = 0;
    this.loadImage('../assets/img/trainers/default.png');
  }

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

  async registerUcenik() {

   // alert(this.user.lozinka)
      this.serviceUcenikRegister();
    
   // this.user.lozinka = await hashPassword(this.user.lozinka); 
  }

  serviceUcenikRegister() {
    this.user.tip = 1;
      this.userService.registerUcenik(this.user).subscribe(
        rsp=>{
          if(rsp.message=="ok") alert("Dodato")
        }
      )
  }

  async registerNastavnik() {

    if (!passwordRegex.test(this.user.lozinka)) {
      
      this.errorDetected = true;
      this.message = "Погрешан формат лозинке."
      return;
    }

  //  this.user.lozinka = await hashPassword(this.user.lozinka);
  if (this.errorDetected) return;
    
    if (this.imageUpload == "") {
      this.user.profilnaSlika = this.defaultProfilnaSkola;
    }
    

    this.userService.postojeciKorisnikIme(this.user.korisnickoIme).subscribe(
      data => {
        if (data.korisnickoIme == this.user.korisnickoIme)  {
          this.errorDetected = true;
          this.message = "Постоји корисник са датим корисничким именом."
          return;
        } 
      
      }
    )
    if (this.errorDetected) return;
    this.userService.postojeciKorisnikImejl(this.user.imejl).subscribe(
      data => {
        alert(data.imejl);
        alert(this.user.imejl);
        if (data.imejl == this.user.imejl)  {
          this.errorDetected = true;
          this.message = "Постоји корисник са датим имејлом."
          return;
        } 
      
      }
    )
    if (!this.errorDetected) {
      alert("Greska!!!")
      this.serviceNastavnikRegister();
    }
        
    

    
    
  }

  serviceNastavnikRegister() {
    this.user.tip = 2;

      this.requestService.registerNastavnik(this.user).subscribe(
        rsp => {
          if(rsp.message=="ok") {
            this.message = "Послат захтев за регистрацијом."
          }
        }
      )
  }

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
        } 
      
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
          
        } 
      }
    )
  }



  onCheckboxChange(predmet: string, event: any) {
    if(event.target.checked) {
      this.user.predmet.push(predmet);
    } else {
      this.user.predmet = this.user.predmet.filter(selected => selected !== predmet);
    }

  }

  onCheckboxPredmetChange(uzrast: string, event: any) {
    if (event.target.checked) {
      this.user.uzrast.push(uzrast);
    } else {
      this.user.uzrast = this.user.uzrast.filter(selected => selected !== uzrast);
    }
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
        this.messageImage = this.messageImage + "Висина слике мора бити 100-300px.\n";
      }
      if (img.naturalWidth > 300 || img.naturalWidth < 100) {
        this.invalidImage = true;
        this.messageImage = this.messageImage + "Ширина слике мора бити 100-300px.\n";
        return;
      }
      this.imageUpload = await convertBase64(this.selectedFile) as string;
      this.user.profilnaSlika = this.imageUpload;
    } else {
      this.imageUpload = "";
      return; 
    }
    
  }

  async onPdfFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile instanceof File && isPdfFile(this.selectedFile)) {
      let fileName = this.selectedFile.name;
      let fileExtension = fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2);

      if (fileExtension.toLowerCase() !== 'pdf') {
        alert("Pogresan format");
        return; // pogresan format
      }
      if (this.selectedFile.size > 3 * 1024 * 1024) {
        alert("Prevelik fajl.")
        return; // max size 3MB
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


  

}
