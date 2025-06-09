import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/models/todo.model';
import { TodoService } from '../shared/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  showCompletedTasks: boolean = true;
  todoToEdit: Todo | null = null;
  isAlphabeticallySorted: boolean = false;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
      if (this.isAlphabeticallySorted) {
        this.sortAlphabetically();
      }
    });
  }

  addTodo(newTodoTitle: string) {
    const newTodo: Todo = {
      id: this.todos.length + 1,
      title: newTodoTitle,
      completed: false
    };

    this.todoService.addTodo(newTodo);
  }

  updateTodo(updatedTodo: Todo) {
    this.todoService.updateTodo(updatedTodo);
  }

  deleteTodo(todoId: number) {
    this.todoService.deleteTodo(todoId);
  }

  clearAll() {
    if (this.todos.length > 0 && confirm('Are you sure you want to clear all tasks?')) {
      this.todoService.clearAll();
      this.loadTodos();
    }
  }

  clearCompletedTasks() {
    if (this.todos.length > 0 && confirm('Você Deseja apagar as tarefas concluidas?')) {
      this.todoService.clearCompletedTasks();
      this.loadTodos();
    }
  }
   
  toggleCompletedTasks() {
    this.showCompletedTasks = !this.showCompletedTasks;
    this.loadTodos();
    this.todos = this.filteredTodos();
  }

  filteredTodos() {
    return this.showCompletedTasks ? this.todos : this.todos.filter(todo => !todo.completed);
  }

  onEditTodo(todo: Todo) {
    this.todoToEdit = todo;
  }

  get labelClearAll() {
    return 'Limpar Todos'
  }

  sortAlphabetically() {
    this.isAlphabeticallySorted = !this.isAlphabeticallySorted;
    
    if (this.isAlphabeticallySorted) {
      // Ordenação alfabética
      this.todos.sort((a, b) => {
        // Primeiro ordena por status de conclusão
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1;
        }
        // Depois ordena alfabeticamente
        return a.title.localeCompare(b.title, 'pt-BR', { sensitivity: 'base' });
      });
    } else {
      // Volta para a ordenação original (por ID)
      this.todos.sort((a, b) => {
        // Primeiro ordena por status de conclusão
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1;
        }
        // Depois ordena por ID (ordem de criação)
        return a.id - b.id;
      });
    }
  }
}
