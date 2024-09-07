import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LogoutService } from '../logout.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-todo-start',
  templateUrl: './todo-start.component.html',
  styleUrls: ['./todo-start.component.css']
})
export class TodoStartComponent implements OnInit {

  private subscription: Subscription = new Subscription();

  constructor(private router: Router, private authService: AuthService, private logoutService: LogoutService) { }

  ngOnInit(): void {
    this.subscription = this.logoutService.logOutCompleted$.subscribe(() => {
//      setTimeout(function(){
  //      alert('You are logged out');
    //}, 1000);

      alert("You are logged out!");
    });
  }

  public navigateCreate() {
    this.router.navigate(['createTodo'])
  }

  public navigateList() {
    if (this.authService.user.value === null) {
      alert('A lista megtekintéséhez először be kell jelentkezned');
    }
    this.router.navigate(['todoList']);
  }

 

 

}
