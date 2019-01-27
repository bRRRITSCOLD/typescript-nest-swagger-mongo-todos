/* node_modules */
import { Injectable, UsePipes, Body } from '@nestjs/common';
import { ObjectID } from 'bson';

/* libraries */
import mongo from '../../lib/mongo';
import logger from '../../lib/logger';
import utils from '../../lib/utils';

/* models */
import { APIError } from '../../models/errors';
import { Todos, CreateTodo, ReplaceTodo, UpdateTodo } from '../../models/todos';
import { Str } from '../../models/base';

/* pipes */
import { UpdateTodoPipe, CreateTodoPipe } from './todos.pipe';

@Injectable()
export class TodosService {
  public async getAll(): Promise<Todos> {
    try {
      logger.debug(`{}TodosService::#getAll::initiating execution`);

      const todosDatabase = await mongo.getDatabase(process.env.TODOS_DATABASE);

      const findResults = await todosDatabase.collection('todos').find({}).toArray();

      if (!findResults.length) {
        const e: any = new Error('no todos found');
        e.statusCode = 404;
        throw e;
      }

      const todos: Todos = new Todos(findResults);
  
      logger.info(`{}TodosService::#getAll::successfully executed`);

      return todos;
    } catch (err) {
      const error: APIError = new APIError(err);
      logger.error(`{}TodosService::#getAll::error executing::error=${utils.common.stringify(error)}`);
      throw error;
    }
  }

  public async getOne(_id: string): Promise<Todos> {
    try {
      logger.debug(`{}TodosService::#getOne::initiating execution`);

      const todosDatabase = await mongo.getDatabase(process.env.TODOS_DATABASE);

      const findResults = await todosDatabase.collection('todos').find({ _id: new ObjectID(_id) }).toArray();

      if (!findResults.length) {
        const e: any = new Error('no todo found');
        e.statusCode = 404;
        throw e;
      }

      const todos: Todos = new Todos(findResults);
  
      logger.info(`{}TodosService::#getOne::successfully executed`);

      return todos;
    } catch (err) {
      const error: APIError = new APIError(err);
      logger.error(`{}TodosService::#getOne::error executing::error=${utils.common.stringify(error)}`);
      throw error;
    }
  }

  public async createOne(createTodo: CreateTodo): Promise<Todos> {
    try {
      logger.debug(`{}TodosService::#createOne::initiating execution`);

      const todosDatabase = await mongo.getDatabase(process.env.TODOS_DATABASE);

      const insertManyResults = await todosDatabase.collection('todos').insertMany([createTodo]);

      const todos: Todos = new Todos(insertManyResults.ops);
  
      logger.info(`{}TodosService::#createOne::successfully executed`);

      return todos
    } catch (err) {
      const error: APIError = new APIError(err);
      logger.error(`{}TodosService::#createOne::error executing::error=${utils.common.stringify(error)}`);
      throw error;
    }
  }

  public async deleteOne(_id: string): Promise<Todos> {
    try {
      logger.debug(`{}TodosService::#deleteOne::initiating execution`);

      const todosDatabase = await mongo.getDatabase(process.env.TODOS_DATABASE);

      const findOneAndDeleteResults = await todosDatabase.collection('todos').findOneAndDelete({ _id: new ObjectID(_id) });

      const todos: Todos = new Todos([findOneAndDeleteResults.value]);
  
      logger.info(`{}TodosService::#deleteOne::successfully executed`);

      return todos    
    } catch (err) {
      const error: APIError = new APIError(err);
      logger.error(`{}TodosService::#getAll::error executing::error=${utils.common.stringify(error)}`);
      throw error;
    }
  }

  public async replaceOne(_id: string, replaceTodo: ReplaceTodo): Promise<Todos> {
    try {
      logger.debug(`{}TodosService::#replaceOne::initiating execution`);

      const todosDatabase = await mongo.getDatabase(process.env.TODOS_DATABASE);

      const findOneAndReplaceResults = await todosDatabase.collection('todos').findOneAndReplace({ _id: new ObjectID(_id) }, replaceTodo);

      if (findOneAndReplaceResults.value === null) {
        const e: any = new Error('no todo updated');
        e.statusCode = 404;
        throw e;
      }

      const todos: Todos = new Todos([Object.assign({}, findOneAndReplaceResults.value, replaceTodo)]);
  
      logger.info(`{}TodosService::#replaceOne::successfully executed`);

      return todos;
    } catch (err) {
      const error: APIError = new APIError(err);
      logger.error(`{}TodosService::#replaceOne::error executing::error=${utils.common.stringify(error)}`);
      throw error;
    }
  }

  public async updateOne(_id: string, updateTodo: UpdateTodo): Promise<Todos> {
    try {
      logger.debug(`{}TodosService::#updateOne::initiating execution`);

      const todosDatabase = await mongo.getDatabase(process.env.TODOS_DATABASE);

      const findOneAndUpdateResults = await todosDatabase.collection('todos').findOneAndUpdate({ _id: new ObjectID(_id) }, { $set: updateTodo });

      if (findOneAndUpdateResults.value === null) {
        const e: any = new Error('no todo updated');
        e.statusCode = 404;
        throw e;
      }

      const todos: Todos = new Todos([Object.assign({}, findOneAndUpdateResults.value, updateTodo)]);
  
      logger.info(`{}TodosService::#updateOne::successfully executed`);

      return todos;
    } catch (err) {
      const error: APIError = new APIError(err);
      logger.error(`{}TodosService::#updateOne::error executing::error=${utils.common.stringify(error)}`);
      throw error;
    }
  }
}
