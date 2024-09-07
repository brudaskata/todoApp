import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from 'src/app/todo.service';
import { Todo } from '../todo-model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css']
})
export class CreateTodoComponent implements OnInit {
  constructor(private router: Router, private todoService: TodoService) { }

  formTodo!: FormGroup;
  public firebaseId: any = ""
  public title: string = ""
  public description: string = ""
  public dueDate!: Date
  public priority: string = ""
  public status: string = ""
  public notes: string = ""

  
  ngOnInit(): void {
    this.formTodo = new FormGroup({
      "title": new FormControl(),
      'description': new FormControl(),
      'dueDate': new FormControl(),
      'priority': new FormControl(),
      'status': new FormControl(),
      'notes': new FormControl()
    })
  }
  public createTodo(): void {
    const formData = this.formTodo.value;
    const todo: Todo = {
      title: formData.title,
      description: formData.description,
      dueDate: formData.dueDate,
      priority: formData.priority,
      status: formData.status,
      notes: formData.notes,
    };

    this.todoService.createTodo(todo).subscribe(() => {
      this.router.navigate(['todoList']);
    });
  }


  public navigateMain() {
    this.router.navigate(["main"]);
  }
}
