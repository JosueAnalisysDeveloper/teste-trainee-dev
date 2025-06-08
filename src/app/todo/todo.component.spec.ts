import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoService } from '../shared/services/todo.service';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoComponent, NewTaskComponent],
      imports: [FormsModule, TodoItemComponent, CommonModule],
      providers: [TodoService]
    });
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
