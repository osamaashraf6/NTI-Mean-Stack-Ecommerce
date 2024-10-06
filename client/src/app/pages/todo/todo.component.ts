import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, CurrencyPipe],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {
  todos: any = [];
  name: string = '';
  constructor(private _TodoService: TodoService) {
    this.readTodo();
    console.log(this.todos);
  }

  createTodo(formData: any) {
    this._TodoService.createTodo(formData);
  }
  readTodo() {
    this.todos = this._TodoService.readTodo();
  }
  updateTodo() {}
  deleteTodo(id: any) {
    this._TodoService.deleteTodo(id);
     this.readTodo();
  }
}
