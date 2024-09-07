import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LogoutService } from '../logout.service';
import { Subscription, switchMap } from 'rxjs';
import { filter } from 'rxjs';
import { NavigationEnd } from '@angular/router';



@Component({
  selector: 'app-todo-start',
  templateUrl: './todo-start.component.html',
  styleUrls: ['./todo-start.component.css']
})
export class TodoStartComponent implements OnInit {

  private subscription: Subscription = new Subscription();

  constructor(private router: Router, private authService: AuthService, private logoutService: LogoutService) { }

  ngOnInit(): void {
    const navigationObs$ = this.router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd));
    const logoutCompleteObs$ = this.logoutService.logOutCompleted$;
   navigationObs$.pipe(switchMap(e =>{
    return logoutCompleteObs$;
   })).subscribe(()=> {
    alert("You are logged out");
   })
    
    
    //      setTimeout(function(){
    //      alert('You are logged out');
    //}, 1000);

   

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
