import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class TodoService { 
  constructor(private http: HttpClient) { 
  }

  add(todo) {
    return this.http.post<any[]>('...', todo);
  }

  getTodos() { 
    return this.http.get<any[]>('...');
  }

  getTodosPromise() {
    return this.http.get<any[]>('...').toPromise();
  }

  delete(id) {
    return this.http.delete<any[]>('...');
  }
}