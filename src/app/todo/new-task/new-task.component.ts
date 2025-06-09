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
    if (this.editingTodo) {
      // Modo de edição - comportamento normal
      const trimmedTitle = this.newTaskTitle.trim();
      if (!trimmedTitle || !trimmedTitle.replace(/\s+/g, '')) {
        alert('Por favor, digite um título válido para a tarefa.');
        this.newTaskTitle = '';
        return;
      }
      this.editingTodo.title = trimmedTitle;
      this.todoService.updateTodo(this.editingTodo);
      this.editingTodo = null;
    } else {
      // Modo de adição - processa múltiplas tarefas
      const tasks = this.newTaskTitle.split('|').map(task => task.trim());
      const validTasks = tasks.filter(task => task && task.replace(/\s+/g, ''));

      if (validTasks.length === 0) {
        alert('Por favor, digite pelo menos uma tarefa válida.');
        this.newTaskTitle = '';
        return;
      }

      validTasks.forEach(taskTitle => {
        const newTodo: Todo = {
          id: this.todoService.getTodoNewId(),
          title: taskTitle,
          completed: false
        };
        this.todoService.addTodo(newTodo);
      });
    }

    this.newTaskTitle = '';
  }
}
