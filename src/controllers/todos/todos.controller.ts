/* node_modules */
import { Controller, Get, Post, Request, Response, Delete, Put, Patch } from '@nestjs/common';
import { ApiResponse, ApiUseTags, ApiProduces, ApiOperation, ApiImplicitBody, ApiImplicitParam } from '@nestjs/swagger';

/* libraries */
import logger from '../../lib/logger';
import utils from '../../lib/utils';

/* models */
import { APIError } from '../../models/errors';
import { Todos, CreateTodo, ReplaceTodo, UpdateTodo } from '../../models/todos';

/* services */
import { TodosService } from './todos.service';

@Controller('todos')
@ApiUseTags('Todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  @ApiProduces('application/json')
  @ApiOperation({ title: 'get all todos', operationId: 'getAll', deprecated: false, description: 'simple functionality to get all todos that exist' })
  @ApiResponse({ status: 200, description: 'a list of todos', type: Todos })
  @ApiResponse({ status: 500, description: 'internal server error', type: APIError })
  @ApiResponse({ status: 502, description: 'bad gateway', type: APIError })
  @ApiResponse({ status: 503, description: 'service unavailable', type: APIError })
  @ApiResponse({ status: 504, description: 'gateway timeout', type: APIError })
  @ApiResponse({ status: 400, description: 'bad request', type: APIError })
  @ApiResponse({ status: 401, description: 'unauthorized', type: APIError })
  @ApiResponse({ status: 403, description: 'forbidden', type: APIError })
  @ApiResponse({ status: 404, description: 'invalid input, not found, etc', type: APIError })
  async getAll(@Request() req: any, @Response() res: any): Promise<Todos> {
    try {
      return await this.todosService.getAll(req, res);
    } catch (err) {
      const error: APIError = new APIError(err);
      logger.error(`{}TodosController::#getAll::error executing::error=${utils.common.stringify(error)}`);
      res.setHeader('Content-Type', 'application/json');    
      return res.status(error.statusCode).end(utils.common.stringify(error));
    }
  }

  @Get('/:_id')
  @ApiProduces('application/json')
  @ApiOperation({ title: 'get one todo', operationId: 'getOne', deprecated: false, description: 'simple functionality to get a todo that exists' })
  @ApiImplicitParam({ name: '_id', description: '_id of todo (mongo _id)', required: true, type: 'string' })
  @ApiResponse({ status: 200, description: 'a list of todos that contains the ONE todo you requested', type: Todos })
  @ApiResponse({ status: 500, description: 'internal server error', type: APIError })
  @ApiResponse({ status: 502, description: 'bad gateway', type: APIError })
  @ApiResponse({ status: 503, description: 'service unavailable', type: APIError })
  @ApiResponse({ status: 504, description: 'gateway timeout', type: APIError })
  @ApiResponse({ status: 400, description: 'bad request', type: APIError })
  @ApiResponse({ status: 401, description: 'unauthorized', type: APIError })
  @ApiResponse({ status: 403, description: 'forbidden', type: APIError })
  @ApiResponse({ status: 404, description: 'invalid input, not found, etc', type: APIError })
  async getOne(@Request() req: any, @Response() res: any): Promise<Todos> {
    try {
      return await this.todosService.getOne(req, res);
    } catch (err) {
      const error: APIError = new APIError(err);
      logger.error(`{}TodosController::#getOne::error executing::error=${utils.common.stringify(error)}`);
      res.setHeader('Content-Type', 'application/json');    
      return res.status(error.statusCode).end(utils.common.stringify(error));
    }
  }

  @Post()
  @ApiProduces('application/json')
  @ApiOperation({ title: 'create one todo', operationId: 'createOne', deprecated: false, description: 'simple functionality to create a todo' })
  @ApiImplicitBody({ name: 'body', type: CreateTodo, description: 'the todo to be created', required: true})
  @ApiResponse({ status: 200, description: 'a list of todos containing the ONE todo just created', type: Todos })
  @ApiResponse({ status: 500, description: 'internal server error', type: APIError })
  @ApiResponse({ status: 502, description: 'bad gateway', type: APIError })
  @ApiResponse({ status: 503, description: 'service unavailable', type: APIError })
  @ApiResponse({ status: 504, description: 'gateway timeout', type: APIError })
  @ApiResponse({ status: 400, description: 'bad request', type: APIError })
  @ApiResponse({ status: 401, description: 'unauthorized', type: APIError })
  @ApiResponse({ status: 403, description: 'forbidden', type: APIError })
  @ApiResponse({ status: 404, description: 'invalid input, not found, etc', type: APIError })
  async createOne(@Request() req: any, @Response() res: any): Promise<Todos> {
    try {
      return await this.todosService.createOne(req, res);
    } catch (err) {
      const error: APIError = new APIError(err);
      logger.error(`{}TodosController::#createOne::error executing::error=${utils.common.stringify(error)}`);
      res.setHeader('Content-Type', 'application/json');    
      return res.status(error.statusCode).end(utils.common.stringify(error));
    }
  }

  @Delete('/:_id')
  @ApiProduces('application/json')
  @ApiOperation({ title: 'delete one todo', operationId: 'deleteOne', deprecated: false, description: 'simple functionality to delete a todo that exists' })
  @ApiImplicitParam({ name: '_id', description: '_id of todo (mongo _id)', required: true, type: 'string' })
  @ApiResponse({ status: 200, description: 'a list of todos of the ONE todo just delete', type: Todos })
  @ApiResponse({ status: 500, description: 'internal server error', type: APIError })
  @ApiResponse({ status: 502, description: 'bad gateway', type: APIError })
  @ApiResponse({ status: 503, description: 'service unavailable', type: APIError })
  @ApiResponse({ status: 504, description: 'gateway timeout', type: APIError })
  @ApiResponse({ status: 400, description: 'bad request', type: APIError })
  @ApiResponse({ status: 401, description: 'unauthorized', type: APIError })
  @ApiResponse({ status: 403, description: 'forbidden', type: APIError })
  @ApiResponse({ status: 404, description: 'invalid input, not found, etc', type: APIError })
  async deleteOne(@Request() req: any, @Response() res: any): Promise<Todos> {
    try {
      return await this.todosService.deleteOne(req, res);
    } catch (err) {
      const error: APIError = new APIError(err);
      logger.error(`{}TodosController::#deleteOne::error executing::error=${utils.common.stringify(error)}`);
      res.setHeader('Content-Type', 'application/json');    
      return res.status(error.statusCode).end(utils.common.stringify(error));
    }
  }

  @Put('/:_id')
  @ApiProduces('application/json')
  @ApiOperation({ title: 'replace/update one todo', operationId: 'replaceOne', deprecated: false, description: 'simple functionality to replace/update a todo that exists' })
  @ApiImplicitParam({ name: '_id', description: '_id of todo (mongo _id)', required: true, type: 'string' })
  @ApiImplicitBody({ name: 'body', type: ReplaceTodo, description: 'the todo to be created', required: true})
  @ApiResponse({ status: 200, description: 'a list of todos with the ONE todo just updated/replaced', type: Todos })
  @ApiResponse({ status: 500, description: 'internal server error', type: APIError })
  @ApiResponse({ status: 502, description: 'bad gateway', type: APIError })
  @ApiResponse({ status: 503, description: 'service unavailable', type: APIError })
  @ApiResponse({ status: 504, description: 'gateway timeout', type: APIError })
  @ApiResponse({ status: 400, description: 'bad request', type: APIError })
  @ApiResponse({ status: 401, description: 'unauthorized', type: APIError })
  @ApiResponse({ status: 403, description: 'forbidden', type: APIError })
  @ApiResponse({ status: 404, description: 'invalid input, not found, etc', type: APIError })
  async replaceOne(@Request() req: any, @Response() res: any): Promise<Todos> {
    try {
      return await this.todosService.replaceOne(req, res);
    } catch (err) {
      const error: APIError = new APIError(err);
      logger.error(`{}TodosController::#replaceOne::error executing::error=${utils.common.stringify(error)}`);
      res.setHeader('Content-Type', 'application/json');    
      return res.status(error.statusCode).end(utils.common.stringify(error));
    }
  }

  @Patch('/:_id')
  @ApiProduces('application/json')
  @ApiOperation({ title: 'replace/update one todo', operationId: 'replaceOne', deprecated: false, description: 'simple functionality to replace/update a todo that exists' })
  @ApiImplicitParam({ name: '_id', description: '_id of todo (mongo _id)', required: true, type: 'string' })
  @ApiImplicitBody({ name: 'body', type: UpdateTodo, description: 'the todo to be created', required: true})
  @ApiResponse({ status: 200, description: 'a list of todos with the ONE todo just updated/replaced', type: Todos })
  @ApiResponse({ status: 500, description: 'internal server error', type: APIError })
  @ApiResponse({ status: 502, description: 'bad gateway', type: APIError })
  @ApiResponse({ status: 503, description: 'service unavailable', type: APIError })
  @ApiResponse({ status: 504, description: 'gateway timeout', type: APIError })
  @ApiResponse({ status: 400, description: 'bad request', type: APIError })
  @ApiResponse({ status: 401, description: 'unauthorized', type: APIError })
  @ApiResponse({ status: 403, description: 'forbidden', type: APIError })
  @ApiResponse({ status: 404, description: 'invalid input, not found, etc', type: APIError })
  async updateOne(@Request() req: any, @Response() res: any): Promise<Todos> {
    try {
      return await this.todosService.updateOne(req, res);
    } catch (err) {
      const error: APIError = new APIError(err);
      logger.error(`{}TodosController::#updateOne::error executing::error=${utils.common.stringify(error)}`);
      res.setHeader('Content-Type', 'application/json');    
      return res.status(error.statusCode).end(utils.common.stringify(error));
    }
  }
}
