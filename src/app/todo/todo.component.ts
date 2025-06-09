import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/models/todo.model';
import { TodoService } from '../shared/services/todo.service';
import jsPDF from 'jspdf';

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

  exportToPDF() {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let y = 20;

    // Título
    doc.setFontSize(20);
    doc.text('Lista de Tarefas', pageWidth / 2, y, { align: 'center' });
    y += 20;

    // Data e hora
    doc.setFontSize(12);
    const now = new Date();
    const dateStr = now.toLocaleDateString('pt-BR');
    const timeStr = now.toLocaleTimeString('pt-BR');
    doc.text(`Gerado em: ${dateStr} às ${timeStr}`, pageWidth / 2, y, { align: 'center' });
    y += 20;

    // Tarefas não concluídas
    doc.setFontSize(16);
    doc.text('Tarefas Pendentes:', margin, y);
    y += 10;

    doc.setFontSize(12);
    const pendingTasks = this.todos.filter(todo => !todo.completed);
    if (pendingTasks.length === 0) {
      doc.text('Nenhuma tarefa pendente', margin, y);
      y += 10;
    } else {
      pendingTasks.forEach(todo => {
        if (y > doc.internal.pageSize.getHeight() - margin) {
          doc.addPage();
          y = margin;
        }
        doc.text(`• ${todo.title}`, margin, y);
        y += 10;
      });
    }

    y += 10;

    // Tarefas concluídas
    doc.setFontSize(16);
    doc.text('Tarefas Concluídas:', margin, y);
    y += 10;

    doc.setFontSize(12);
    const completedTasks = this.todos.filter(todo => todo.completed);
    if (completedTasks.length === 0) {
      doc.text('Nenhuma tarefa concluída', margin, y);
    } else {
      completedTasks.forEach(todo => {
        if (y > doc.internal.pageSize.getHeight() - margin) {
          doc.addPage();
          y = margin;
        }
        doc.text(`• ${todo.title}`, margin, y);
        y += 10;
      });
    }

    // Salvar o PDF
    doc.save('lista-de-tarefas.pdf');
  }
}
