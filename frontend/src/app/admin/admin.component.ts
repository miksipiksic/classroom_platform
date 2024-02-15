import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { RegistrationRequestService } from '../services/registration-request.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  constructor(private router: Router, private userService: UserService, private requestService: RegistrationRequestService) { }
  loggedIn: string = "";
  message: string = "";

  username: string = "";

  ngOnInit(): void {

  //  this.loggedIn = sessionStorage.getItem("loggedIn");

    if(this.loggedIn != "admin") {
      this.router.navigate(['']);
      return;
    }

   // this.userService.updateNavbar("admin");
 //   this.username = sessionStorage.getItem("username");
  }


}
