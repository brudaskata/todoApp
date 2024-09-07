import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  error: any = null;
  message: string = "";


  constructor(private authService: AuthService, private httpClient: HttpClient, private router: Router) { }

  onSubmit(form: NgForm) {

    const email = form.value.email;
    const password = form.value.password;


    this.authService.logIn(email, password).subscribe(
      response => {
        console.log(response);
        if (response.idToken) {
          console.log('You are logged in');
        }
       this.router.navigate(['todoList']);
      },


      error => {
        console.log(error);
        this.error = "An error occured!";
      },
    );
    form.reset();
  }

}
