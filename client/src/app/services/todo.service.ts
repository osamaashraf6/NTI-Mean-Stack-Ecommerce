import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos: any = [
   
  ];
  constructor() {}

  createTodo(formData: any) {
    const data = {
      id: this.todos.length + 1,
      name: formData,
    };
    if (this.todos > 0) {
      this.todos = [...this.todos, data];
    } else {
      this.todos.push(data);
    }
  }
  readTodo() {
    return this.todos;
  }
  updateTodo() {}
  deleteTodo(id: any) {
    this.todos = this.todos.filter((item: any) => item.id !== id);
    //  = upadted;
  }
}
