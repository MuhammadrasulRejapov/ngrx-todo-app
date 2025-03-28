import { bootstrapApplication } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { AppComponent } from './app/app.component';
import { counterReducer } from './app/counter.reducer';
import { todoReducer } from './app/todo.reducer';

bootstrapApplication(AppComponent, {
  providers: [
    provideStore({ counter: counterReducer, todos: todoReducer })
  ]
});