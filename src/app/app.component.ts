import { Component } from '@angular/core';
import { CounterComponent } from './counter/counter.component';
import { TodoListComponent } from './todo-list/todo-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CounterComponent, TodoListComponent],
  template: `
    <h1>NgRx with Angular</h1>
    <app-counter></app-counter>
    <app-todo-list></app-todo-list>
  `,
})
export class AppComponent {}