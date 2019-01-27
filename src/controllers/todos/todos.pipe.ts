/* node_modules */
import { ArgumentMetadata, Injectable, PipeTransform, Response } from '@nestjs/common';

/* models */
import { Str } from '../../models/base';
import { UpdateTodo, CreateTodo, ReplaceTodo } from '../../models/todos';

@Injectable()
export class UpdateTodoPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const updateTodo = new UpdateTodo(value);
    await updateTodo.validate();

    return updateTodo;
  }
}

@Injectable()
export class CreateTodoPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    try {
      const createTodo = new CreateTodo(value);
      await createTodo.validate();
  
      return createTodo;
    } catch (err) {
      throw err;
    }
  }
}

@Injectable()
export class ReplaceTodoPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    try {
      const replaceTodo = new ReplaceTodo(value);
      await replaceTodo.validate();
  
      return replaceTodo;
    } catch (err) {
      throw err;
    }
  }
}
