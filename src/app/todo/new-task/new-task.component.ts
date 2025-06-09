import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Todo } from '../../shared/models/todo.model';
import { TodoService } from '../../shared/services/todo.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnChanges {
  newTaskTitle: string = '';
  editingTodo: Todo | null = null;

  constructor(private todoService: TodoService) {}

  @Input() set todoToEdit(todo: Todo | null) {
    if (todo) {
      this.editingTodo = todo;
      this.newTaskTitle = todo.title;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['todoToEdit']) {
      const todo = changes['todoToEdit'].currentValue;
      if (todo) {
        this.editingTodo = todo;
        this.newTaskTitle = todo.title;
      }
    }
  }

  addTask() {
    if (!this.newTaskTitle.trim()) return;

    if (this.editingTodo) {
      // Atualizar tarefa existente
      this.editingTodo.title = this.newTaskTitle;
      this.todoService.updateTodo(this.editingTodo);
      this.editingTodo = null;
    } else {
      // Criar nova tarefa
      const newTodo: Todo = {
        id: this.todoService.getTodoNewId(),
        title: this.newTaskTitle,
        completed: false
      };
      this.todoService.addTodo(newTodo);
    }

    this.newTaskTitle = '';
  }
}
