/* node_modules */
import { Injectable, UsePipes } from '@nestjs/common';
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
  public async getAll(req: any, res: any): Promise<Todos> {
    try {
      logger.debug(`{}TodosService::#getAll::initiating execution`);

      const todosDatabase = await mongo.getDatabase(process.env.TODOS_DATABASE);

      const todos = await todosDatabase.collection('todos').find({}).toArray();

      if (!todos.length) {
        const e: any = new Error('no todos found');
        e.statusCode = 404;
        throw e;
      }

      const response: Todos = new Todos(todos);
  
      logger.info(`{}TodosService::#getAll::successfully executed`);

      res.setHeader('Content-Type', 'application/json');
      return res.status(200).end(utils.common.stringify(response));
    } catch (err) {
      const error: APIError = new APIError(err);
      logger.error(`{}TodosService::#getAll::error executing::error=${utils.common.stringify(error)}`);
      res.setHeader('Content-Type', 'application/json');    
      return res.status(error.statusCode).end(utils.common.stringify(error));
    }
  }

  public async getOne(req: any, res: any): Promise<Todos> {
    try {
      logger.debug(`{}TodosService::#getOne::initiating execution`);

      const todosDatabase = await mongo.getDatabase(process.env.TODOS_DATABASE);

      const _id = new Str(req.params._id);

      await _id.validate();

      const todos = await todosDatabase.collection('todos').find({ _id: new ObjectID(_id.value) }).toArray();

      if (!todos.length) {
        const e: any = new Error('no todo found');
        e.statusCode = 404;
        throw e;
      }

      const response: Todos = new Todos(todos);
  
      logger.info(`{}TodosService::#getOne::successfully executed`);

      res.setHeader('Content-Type', 'application/json');
      return res.status(200).end(utils.common.stringify(response));
    } catch (err) {
      const error: APIError = new APIError(err);
      logger.error(`{}TodosService::#getOne::error executing::error=${utils.common.stringify(error)}`);
      throw error;
    }
  }

  @UsePipes(new CreateTodoPipe())
  public async createOne(req: any, res: any): Promise<Todos> {
    try {
      logger.debug(`{}TodosService::#createOne::initiating execution`);

      const todosDatabase = await mongo.getDatabase(process.env.TODOS_DATABASE);

      const todos = await todosDatabase.collection('todos').insertMany([createTodo]);

      const response: Todos = new Todos(todos.ops);
  
      logger.info(`{}TodosService::#createOne::successfully executed`);

      res.setHeader('Content-Type', 'application/json');
      return res.status(200).end(utils.common.stringify(response));
    } catch (err) {
      const error: APIError = new APIError(err);
      logger.error(`{}TodosService::#getAll::error executing::error=${utils.common.stringify(error)}`);
      res.setHeader('Content-Type', 'application/json');    
      return res.status(error.statusCode).end(utils.common.stringify(error));
    }
  }

  public async deleteOne(req: any, res: any): Promise<Todos> {
    try {
      logger.debug(`{}TodosService::#deleteOne::initiating execution`);

      const todosDatabase = await mongo.getDatabase(process.env.TODOS_DATABASE);

      const _id = new Str(req.params._id);

      await _id.validate();

      const todos = await todosDatabase.collection('todos').findOneAndDelete({ _id: new ObjectID(_id.value) });

      const response: Todos = new Todos([todos.value]);
  
      logger.info(`{}TodosService::#deleteOne::successfully executed`);

      res.setHeader('Content-Type', 'application/json');
      return res.status(200).end(utils.common.stringify(response));
    } catch (err) {
      const error: APIError = new APIError(err);
      logger.error(`{}TodosService::#getAll::error executing::error=${utils.common.stringify(error)}`);
      res.setHeader('Content-Type', 'application/json');    
      return res.status(error.statusCode).end(utils.common.stringify(error));
    }
  }

  public async replaceOne(req: any, res: any): Promise<Todos> {
    try {
      logger.debug(`{}TodosService::#replaceOne::initiating execution`);

      const todosDatabase = await mongo.getDatabase(process.env.TODOS_DATABASE);

      const _id = new Str(req.params._id);
      await _id.validate();

      const replaceTodo = new ReplaceTodo(req.body);
      await replaceTodo.validate();

      const todos = await todosDatabase.collection('todos').findOneAndReplace({ _id: new ObjectID(_id.value) }, replaceTodo);

      if (todos.value === null) {
        const e: any = new Error('no todo updated');
        e.statusCode = 404;
        throw e;
      }

      const response: Todos = new Todos([Object.assign({}, todos.value, replaceTodo)]);
  
      logger.info(`{}TodosService::#replaceOne::successfully executed`);

      res.setHeader('Content-Type', 'application/json');
      return res.status(200).end(utils.common.stringify(response));
    } catch (err) {
      const error: APIError = new APIError(err);
      logger.error(`{}TodosService::#replaceOne::error executing::error=${utils.common.stringify(error)}`);
      res.setHeader('Content-Type', 'application/json');    
      return res.status(error.statusCode).end(utils.common.stringify(error));
    }
  }

  @UsePipes(new UpdateTodoPipe())
  public async updateOne(req: any, res: any): Promise<Todos> {
    try {
      logger.debug(`{}TodosService::#updateOne::initiating execution`);

      const todosDatabase = await mongo.getDatabase(process.env.TODOS_DATABASE);

      const todos = await todosDatabase.collection('todos').findOneAndUpdate({ _id: new ObjectID(_id.value) }, { $set: updateTodo });

      if (todos.value === null) {
        const e: any = new Error('no todo updated');
        e.statusCode = 404;
        throw e;
      }

      const response: Todos = new Todos([Object.assign({}, todos.value, updateTodo)]);
  
      logger.info(`{}TodosService::#updateOne::successfully executed`);

      res.setHeader('Content-Type', 'application/json');
      return res.status(200).end(utils.common.stringify(response));
    } catch (err) {
      const error: APIError = new APIError(err);
      logger.error(`{}TodosService::#updateOne::error executing::error=${utils.common.stringify(error)}`);
      res.setHeader('Content-Type', 'application/json');    
      return res.status(error.statusCode).end(utils.common.stringify(error));
    }
  }
}
