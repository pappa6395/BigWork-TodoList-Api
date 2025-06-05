import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { successResponse } from '../common/response.util';

@Controller('todos')
export class TodosController {
  constructor(private readonly todoService: TodosService) {}

  @Post()
  create(@Body() dto: CreateTodoDto) {
    const todo = this.todoService.create(dto);
    return successResponse(todo, 'Todo created');
  }

  @Get()
  findAll() {
    return successResponse(this.todoService.findAll(), 'All todos');
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    const todo = this.todoService.findOne(id);
    return successResponse(todo, 'Todo found');
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTodoDto) {
    const updated = this.todoService.update(id, dto);
    return successResponse(updated, 'Todo updated');
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    this.todoService.remove(id);
    return successResponse(null, 'Todo deleted');
  }
}
