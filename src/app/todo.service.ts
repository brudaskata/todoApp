import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Todo } from './todo-model';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private httpClient: HttpClient) { }

  getTodoById(firebaseId: any): Observable<Todo | null> {
    return this.httpClient.get<Todo>(`https://katatodoapp-default-rtdb.firebaseio.com/todo/${firebaseId}.json`).pipe(map
      (response => {
        if (response) {
          return { ...response, firebaseId };
        }
        return null;
      }));
  }

  getTodos(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>("https://katatodoapp-default-rtdb.firebaseio.com/todo.json").pipe(map(response => {
      const todosArray: Todo[] = [];
      for (const key in response) {
        if (response.hasOwnProperty(key)) {
          todosArray.push({ ...response[key], firebaseId: key });
        }
      }
      return todosArray;
    }));
  }

  createTodo(todo: Todo): Observable<Todo> {
    return this.httpClient.post<Todo>("https://katatodoapp-default-rtdb.firebaseio.com/todo.json", todo);
  }

  updateTodo(updatedTodo: Todo): Observable<Todo> {
    return this.httpClient.put<Todo>(`https://katatodoapp-default-rtdb.firebaseio.com/todo/${updatedTodo.firebaseId}.json`, updatedTodo);
  }


  deleteTodo(firebaseId: any): Observable<any> {
    return this.httpClient.delete(`https://katatodoapp-default-rtdb.firebaseio.com/todo/${firebaseId}.json`);
  }


  deleteAllTodos(): Observable<Todo> {
    return this.httpClient.delete<Todo>("https://katatodoapp-default-rtdb.firebaseio.com/todo.json");
  }

 
}








