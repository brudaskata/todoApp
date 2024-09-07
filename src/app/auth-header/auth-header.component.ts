import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { filter, first } from 'rxjs';
import { LogoutService } from '../logout.service';

@Component({
  selector: 'app-auth-header',
  templateUrl: './auth-header.component.html',
  styleUrls: ['./auth-header.component.css']
})
export class AuthHeaderComponent {

  constructor(private authService: AuthService, private router: Router, private logoutService: LogoutService) { }

  public darkMode!: boolean;

  get isLoggedIn(): boolean {
    const loggedIn = this.authService.isLoggedIn();
    return loggedIn;
  }

  public navigateLogin() {
    this.router.navigate(['login'])
  }

  public navigateSignUp() {
    this.router.navigate(['signup'])
  }

  onChoseMode() {
    this.darkMode = !this.darkMode;
    if(this.darkMode){
      document.body.classList.add("dark-mode");
    } else{
      document.body.classList.remove("dark-mode");
    }
  }

  onLogOut() {
    this.authService.logOut();
    this.authService.user.pipe(
      filter(user => user === null),
      first()
    ).subscribe(() => {
      this.router.navigate(['start']).then(() => {
        this.logoutService.logOutEvent();
      });
    });
  }

}
