/* node_modules */
import { ApiModelProperty } from "@nestjs/swagger";
import { IsString, IsBoolean, IsNotEmpty } from 'class-validator';

/* models */
import { BaseModel } from '../models/base';
import { ObjectID } from "mongodb";

export interface ITodo {
  _id?: string;
  task: string;
  completed: boolean;
}

export class Todo {
  @ApiModelProperty({ type: 'string', required: false })
  public _id: string;

  @ApiModelProperty({ type: 'string', required: true })
  public task: boolean;

  @ApiModelProperty({ type: 'boolean', required: true, default: false })
  public completed: boolean;  

  constructor(todo: ITodo) {
    Object.assign(this, {
      _id: todo._id,
      task: todo.task,
      completed: todo.completed,
    });
  }
}

export class Todos {
  @ApiModelProperty({ type: [Todo], required: true })
  public todos: Todo[] = [];


  constructor(todos: ITodo[]) {
    todos.map((todo: ITodo) => this.todos.push(new Todo(todo)));
  }
}

export class CreateTodo extends BaseModel {
  @ApiModelProperty({ type: 'string', required: true })
  @IsNotEmpty()
  @IsString()
  public task: string;

  @ApiModelProperty({ type: 'boolean', required: true, default: false })
  @IsNotEmpty()
  @IsBoolean()
  public completed: boolean;  

  constructor(createTodo: ITodo) {
    super();
    Object.assign(this, {
      task: createTodo.task,
      completed: createTodo.completed,
    });
  }
}

export class ReplaceTodo extends BaseModel {
  @ApiModelProperty({ type: 'string', required: true })
  @IsNotEmpty()
  @IsString()
  public task: string;

  @ApiModelProperty({ type: 'boolean', required: true })
  @IsNotEmpty()
  @IsBoolean()
  public completed: boolean;  

  constructor(replaceTodo: ITodo) {
    super();
    Object.assign(this, {
      task: replaceTodo.task,
      completed: replaceTodo.completed,
    });
  }
}

export class UpdateTodo extends BaseModel {
  @ApiModelProperty({ type: 'string', required: false })
  @IsString()
  public task: string;

  @ApiModelProperty({ type: 'boolean', required: false })
  @IsBoolean()
  public completed: boolean;  

  constructor(updateTodo: ITodo) {
    super();
    Object.assign(this, {
      task: updateTodo.task,
      completed: updateTodo.completed,
    });
    Object.keys(this).map((key: string) => {
      if (this[key] === undefined) delete this[key];
    });
  }

  public async validate() {
    try {
      await super.validate({ skipMissingProperties: true });
      return;
    } catch (err) {
      throw err;
    }
  }
}