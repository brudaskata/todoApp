import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/todo-model';
import { TodoService } from '../todo.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
    public todos: Todo[] = [];
    public todosReceived: Todo[] = [];
    public filteredTodos: Todo[] = [];
    public searchedTodos: Todo[] = [];

    // remove all todos array except todos array

    public searchTerm: string = '';
    public error = null;
    public noMatch!: boolean;
    public inSearchMode!: boolean;
    public inFilterMode!: boolean;
    public checkboxStates = {
        notYet: false,
        progress: false,
        done: false,
    };

    // make todoservice private
    constructor(public todoservice: TodoService, private router: Router) {}

    //todListObs$: Observable<Todo[]> = this.todoservice.getTodos();
    //use todListObs$ with async pipe form the template

    ngOnInit(): void {
        this.todoservice.getTodos().subscribe(
            (response) => {
                const currentDate = new Date();
                currentDate.setHours(0, 0, 0, 0);

                this.todos = response
                    .map((todo) => {
                        const dueDate = new Date(todo.dueDate);
                        dueDate.setHours(0, 0, 0, 0);
                        todo.isOverDue = new Date(todo.dueDate) < currentDate;
                        return todo;
                    })
                    .sort((a, b) => {
                        return (
                            new Date(a.dueDate).getTime() -
                            new Date(b.dueDate).getTime()
                        );
                    });
                this.todosReceived = [...this.todos]; // keresés, szűrés után a listához való visszatérés miatt kell, hogy ne kelljen újra http kérést indítani.
            },
            (error) => {
                this.error = error.message;
            }
        );
    }

    public navigateCreate() {
        this.router.navigate(['createTodo']);
    }

    public deleteAllTodos(): void {
        this.todoservice.deleteAllTodos().subscribe(() => {
            this.todos = [];
        });
    }

    public onCheckboxChange(
        event: Event,
        checkboxId: 'notYet' | 'progress' | 'done'
    ): void {
        const target = event.target as HTMLInputElement;
        this.checkboxStates[checkboxId] = target.checked;
        this.filterTodos();
    }

    public filterTodos(): void {
        // all of this action needs to be done on the backend side
        // this.todoservice.filter("done", 2)
        // I need to search how is it possible to send query parameters to the backend with firebase

        const anyActiveCheckbox =
            this.checkboxStates.notYet ||
            this.checkboxStates.progress ||
            this.checkboxStates.done;
        if (!this.inSearchMode) {
            if (!anyActiveCheckbox) {
                this.inFilterMode = false;
                this.todos = this.todosReceived; // itt állítom be, hogy kikattintás után visszatérjen a lista.
            } else {
                this.inFilterMode = true;
                this.filteredTodos = this.todosReceived.filter((todo) => {
                    return (
                        (this.checkboxStates.notYet &&
                            todo.status === 'not started yet') ||
                        (this.checkboxStates.progress &&
                            todo.status === 'in progress') ||
                        (this.checkboxStates.done && todo.status === 'done')
                    );
                });
                this.todos = this.filteredTodos;
            }
        } else {
            if (!anyActiveCheckbox) {
                this.inFilterMode = false;
                this.todos = this.searchedTodos; // itt állítom be, hogy kikattintás után visszatérjen a lista.
            } else {
                this.inFilterMode = true;
                this.filteredTodos = this.searchedTodos.filter((todo) => {
                    return (
                        (this.checkboxStates.notYet &&
                            todo.status === 'not started yet') ||
                        (this.checkboxStates.progress &&
                            todo.status === 'in progress') ||
                        (this.checkboxStates.done && todo.status === 'done')
                    );
                });
                this.todos = this.filteredTodos;
            }
        }

        this.noMatch = this.todos.length === 0;
    }

    public searchTodo(): void {
        // all of this action needs to be done on the backend side

        this.inSearchMode = true;
        if (!this.inFilterMode) {
            //keresés kereső módban
            this.searchedTodos = this.todosReceived.filter(
                (todo) =>
                    todo.title.toLocaleLowerCase().includes(this.searchTerm) ||
                    todo.description.toLocaleLowerCase().includes(this.searchTerm)
            );
            this.todos = this.searchedTodos;
        } else {
            //keresés szűrt módban a szűrt listán
            this.todos = this.filteredTodos.filter(
                (todo) =>
                    todo.title.toLocaleLowerCase().includes(this.searchTerm) ||
                    todo.description.toLocaleLowerCase().includes(this.searchTerm)
            );
        }
        this.noMatch = this.todos.length === 0; //noMatch értékét itt true-ra állítom
        this.searchTerm = '';
    }

    public clearSearch(): void {
        if (this.inFilterMode) {
            this.todos = this.filteredTodos;
        } else {
            this.todos = this.todosReceived;
        }

        this.noMatch = false;
        this.inSearchMode = false;

        
    }

    public navigateToEdit(firebaseId: any): void {
        this.router.navigate(['edit', firebaseId]);
    }

    public deleteTodo(firebaseId: any) {
        this.todoservice.deleteTodo(firebaseId).subscribe(() => {
            this.todos = this.todos.filter((todo) => todo.firebaseId !== firebaseId);
        });
    }

    scrollToTop(): void {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
