import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Todo } from '../../shared/models/todo.model';
import { TodoService } from '../../shared/services/todo.service';
import { ProfanityFilterService } from '../../shared/services/profanity-filter.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnChanges {
  newTaskTitle: string = '';
  editingTodo: Todo | null = null;

  constructor(
    private todoService: TodoService,
    private profanityFilter: ProfanityFilterService
  ) {}

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

  private validateTaskTitle(title: string): boolean {
    if (!title || !title.replace(/\s+/g, '')) {
      alert('Por favor, digite um título válido para a tarefa.');
      return false;
    }

    if (this.profanityFilter.containsProfanity(title)) {
      alert('Não é permitido cadastrar tarefas com palavras obscenas.');
      return false;
    }

    return true;
  }

  addTask() {
    if (this.editingTodo) {
      // Modo de edição - comportamento normal
      const trimmedTitle = this.newTaskTitle.trim();
      if (!this.validateTaskTitle(trimmedTitle)) {
        this.newTaskTitle = '';
        return;
      }
      this.editingTodo.title = trimmedTitle;
      this.todoService.updateTodo(this.editingTodo);
      this.editingTodo = null;
    } else {
      // Modo de adição - processa múltiplas tarefas
      const tasks = this.newTaskTitle.split('|').map(task => task.trim());
      const validTasks = tasks.filter(task => this.validateTaskTitle(task));

      if (validTasks.length === 0) {
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
