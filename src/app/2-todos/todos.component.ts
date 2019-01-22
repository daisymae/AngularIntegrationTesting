import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service'
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: any[] = [];
  message;

  constructor(private service: TodoService) { }

  ngOnInit() {
    // this.service.getTodos().pipe(map(t => this.todos = t)).subscribe();

    // modify to use getTodosPromise to show how to test async code
    this.service.getTodosPromise().then(t => {
      console.log('THEN WAS CALLED');
      this.todos = t;
    })
  }

  add() {
    var newTodo = { title: '... ' };
    this.service.add(newTodo).subscribe(
      t => this.todos.push(t),
      err => this.message = err);
  }

  delete(id) {
    if (confirm('Are you sure?'))
      this.service.delete(id).subscribe();
  }
}
