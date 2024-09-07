import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  message: string = "";
  error: string = "";


  constructor(private authService: AuthService) { }

  onSubmit(form: NgForm) {

    const email = form.value.email;
    const password = form.value.password;

    this.authService.signUp(email, password).subscribe(
      response => {
        console.log(response);
        this.message = "Registration was successful!"
      },

      error => {
        console.log(error);
        this.error = "An error occured!";
      },
    );

    form.reset();

  }
}
