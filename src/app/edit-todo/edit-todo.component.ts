import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../todo-model';
import { TodoService } from '../todo.service';

@Component({
    selector: 'app-edit-todo',
    templateUrl: './edit-todo.component.html',
    styleUrls: ['./edit-todo.component.css'],
})
export class EditTodoComponent implements OnInit {
    todo?: Todo;
    todoEditFormGroup: FormGroup = this.formBuilder.group({
        firebaseId: [''],
        title: [''],
        description: [''],
        dueDate: [Date],
        priority: this.formBuilder.control(''),
        status: this.formBuilder.control(``),
        notes: this.formBuilder.control(``)
    });

    constructor(
        private activatedRoute: ActivatedRoute,
        private todoService: TodoService,
        private formBuilder: FormBuilder,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
            this.todoService.getTodoById(params['firebaseId']).subscribe((response: Todo | null) => {
                if (response) {
                    const firebaseId = params['firebaseId'];
                    this.todo = response;
                    this.todoEditFormGroup.patchValue({
                        firebaseId: this.todo.firebaseId,
                        title: this.todo.title,
                        description: this.todo.description,
                        dueDate: this.todo.dueDate,
                        priority: this.todo.priority,
                        status: this.todo.status,
                        notes: this.todo.notes,
                    });
                } else {
                    console.error('Nincs todo a megadott firebaseId-vel:', params['firebaseId']);
                }
            });
        });
    }


    public updateTodo() {
        const updatedTodo: Todo = this.todoEditFormGroup.getRawValue();
        this.todoService.updateTodo(updatedTodo).subscribe(() => {
            this.router.navigate(['/todoList']);
        });
    }


    public backToList() {
        this.router.navigate(['/todoList']);
    }
}
