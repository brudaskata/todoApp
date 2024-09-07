import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { CreateTodoComponent } from './create-todo/create-todo.component';
import { TodoStartComponent } from './todo-start/todo-start.component';
import { EditTodoComponent } from './edit-todo/edit-todo.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './guards/auth.guard';



const routes: Routes = [
  { path: "start", component: TodoStartComponent },
  { path: "todoList", component: TodoListComponent},
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "createTodo", component: CreateTodoComponent },
  { path: "edit/:firebaseId", component: EditTodoComponent },
  { path: "", redirectTo: "start", pathMatch: 'full' },
  { path: "**", component: TodoStartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
