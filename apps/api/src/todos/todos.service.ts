import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

export interface Todo {
  id: number;
  name: string;
  date_start: string;
  finished: boolean;
}

@Injectable()
export class TodosService {
  private todos: Todo[] = [];
  private idCounter = 1;

  create(dto: CreateTodoDto): Todo {
    const todo: Todo = {
      id: this.idCounter++,
      name: dto.name,
      date_start: dto.date_start,
      finished: false,
    };
    this.todos.push(todo);
    return todo;
  }

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find(t => t.id === id);
    if (!todo) throw new NotFoundException('Todo not found');
    return todo;
  }

  update(id: number, dto: UpdateTodoDto): Todo {
    const todo = this.findOne(id);
    Object.assign(todo, dto);
    return todo;
  }

  remove(id: number): void {
    const index = this.todos.findIndex(t => t.id === id);
    if (index === -1) throw new NotFoundException('Todo not found');
    this.todos.splice(index, 1);
  }
}
