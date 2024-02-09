import { Component } from '@angular/core';


import { UserService } from '../services/user.service';
import User from '../models/user';

import { RegistrationRequestService } from '../services/registration-request.service';
import { HttpClient } from '@angular/common/http';



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



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private userService:UserService, private requestService: RegistrationRequestService, private http:HttpClient) {}

  ngOnInit() : void {
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
  

  user: User = new User()

  userUcenik: boolean = false;
  userNastavnik: boolean = false;

  dodatakPredmet: string = "";

  defaultProfilnaSkola: string = "";

  errorDetected: boolean = false;
  message: string = "";

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
    if (!passwordRegex.test(this.user.lozinka)) {
       this.errorDetected = true;
       this.message = "Погрешан формат лозинке.";
       return;
    }


    if (this.imageUpload == "") {
      this.user.profilnaSlika = this.defaultProfilnaSkola;
    }

    this.userService.postojeciKorisnikIme(this.user.korisnickoIme).subscribe(
      data => {
        alert(data.korisnickoIme);
        alert(this.user.korisnickoIme)
        if (data.korisnickoIme == this.user.korisnickoIme)  {
          this.errorDetected = true;
          this.message = "Постоји корисник са датим корисничким именом."
        } else {
          this.userService.postojeciKorisnikImejl(this.user.imejl).subscribe(
            data => {
              
              if (data.imejl == this.user.imejl)  {
                this.errorDetected = true;
                this.message = "Постоји корисник са датим имејлом.";
              } else {
                if (!this.errorDetected) {
                  alert("Dodaje se")
                  this.serviceUcenikRegister();
            
                }
              }
            
            }
          )
        }
      
      }
    )
    
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

  async onImageFileSelected(event: any){
    this.selectedFile = event.target.files[0];
    if (this.selectedFile instanceof File && isImageFile(this.selectedFile)) {
      let img = new Image();
      img.src = URL.createObjectURL(this.selectedFile);
      let fileName = this.selectedFile.name;
      let fileExtension = fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2);

      if (fileExtension.toLowerCase() !== 'jpg' && fileExtension.toLowerCase() !== 'png') {
        alert("Pogresan format.")
        return; // pogresan format
      }
      if (img.height > 300 || img.height < 100) {
        alert('Pogresna velicina slike.')
        return;
      }
      if (img.width > 300 || img.width < 100) {
        alert('Pogresna velicina slike.')
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

}
