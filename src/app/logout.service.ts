import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor() { }

private logOutCompleted = new Subject<string>();
logOutCompleted$ = this.logOutCompleted.asObservable();

logOutEvent(){
  this.logOutCompleted.next("logOutEvent");
}


}
