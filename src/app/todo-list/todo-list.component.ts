import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Todo } from '../todo.model';
import { addTodo, removeTodo, toggleTodo } from '../todo.actions';
import { TodoState, selectAll } from '../todo.reducer'; // ✅ Import qilingan

export interface AppState {
  todos: TodoState;
}

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <input #todoInput type="text" placeholder="Add a todo"
      (keyup.enter)="addTodo(todoInput.value); todoInput.value = ''" />
    <ul>
      <li *ngFor="let todo of todos$ | async">
        <input type="checkbox" [checked]="todo.completed" (change)="toggleTodo(todo.id)" />
        {{ todo.description }}
        <button (click)="removeTodo(todo.id)">Remove</button>
      </li>
    </ul>
  `
})
export class TodoListComponent {
  todos$: Observable<Todo[]>;

  constructor(private store: Store<AppState>) {
    this.todos$ = this.store.select((state) => selectAll(state.todos));
  }

  addTodo(description: string) {
    if (!description.trim()) return;
    const todo: Todo = { id: Date.now().toString(), description, completed: false };
    this.store.dispatch(addTodo({ todo }));
  }

  removeTodo(id: string) {
    this.store.dispatch(removeTodo({ id }));
  }

  toggleTodo(id: string) {
    this.store.dispatch(toggleTodo({ id }));
  }
}