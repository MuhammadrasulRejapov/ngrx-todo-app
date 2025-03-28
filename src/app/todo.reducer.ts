import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on, createSelector } from '@ngrx/store';
import { addTodo, removeTodo, toggleTodo } from './todo.actions';
import { Todo } from './todo.model';

// Adapter yaratish
export const todoAdapter = createEntityAdapter<Todo>();
export interface TodoState extends EntityState<Todo> {}

// Dastlabki holat
export const initialState: TodoState = todoAdapter.getInitialState();

// Reducer funksiyasi
export const todoReducer = createReducer(
  initialState,
  on(addTodo, (state, { todo }) => todoAdapter.addOne(todo, state)),
  on(removeTodo, (state, { id }) => todoAdapter.removeOne(id, state)),
  on(toggleTodo, (state, { id }) => {
    const todo = state.entities[id];
    if (todo) {
      return todoAdapter.updateOne(
        { id, changes: { completed: !todo.completed } },
        state
      );
    }
    return state;
  })
);

// Selectors
export const { selectAll } = todoAdapter.getSelectors();