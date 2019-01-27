/* node_modules */
import { Controller, Get, Post, Request, Response, Delete, Put, Patch, Body, Header, UseFilters, Param } from '@nestjs/common';
import { ApiResponse, ApiUseTags, ApiProduces, ApiOperation, ApiImplicitBody, ApiImplicitParam } from '@nestjs/swagger';

/* libraries */
import logger from '../../lib/logger';
import utils from '../../lib/utils';

/* models */
import { APIError } from '../../models/errors';
import { Todos, CreateTodo, ReplaceTodo, UpdateTodo } from '../../models/todos';

/* services */
import { TodosService } from './todos.service';

/* pipes */
import { CreateTodoPipe, UpdateTodoPipe, ReplaceTodoPipe } from './todos.pipe';
import { StringPipe } from '../../shared/pipes/base.pipe';

/* filters */
import { HttpExceptionsFilter } from '../../shared/filters/httpexceptions.filter';

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
  @UseFilters(HttpExceptionsFilter)
  async getAll(@Request() req: any, @Response() res: any): Promise<Todos> {
    try {
      const todos: any = await this.todosService.getAll();
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).end(utils.common.stringify(todos));
    } catch (err) {
      const error: APIError = new APIError(err);
      logger.error(`{}TodosController::#getAll::error executing::error=${utils.common.stringify(error)}`);
      throw error;
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
  @UseFilters(HttpExceptionsFilter)
  async getOne(@Param('_id', new StringPipe()) _id: string, @Request() req: any, @Response() res: any): Promise<Todos> {
    try {
      const todos: any = await this.todosService.getOne(_id);
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).end(utils.common.stringify(todos));
    } catch (err) {
      const error: APIError = new APIError(err);
      logger.error(`{}TodosController::#getOne::error executing::error=${utils.common.stringify(error)}`);
      throw error;
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
  @UseFilters(HttpExceptionsFilter)
  async createOne(@Body(new CreateTodoPipe()) body, @Request() req: any, @Response() res: any): Promise<Todos> {
    try {
      const todos = await this.todosService.createOne(body);
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).end(utils.common.stringify(todos));
    } catch (err) {
      const error: APIError = new APIError(err);
      logger.error(`{}TodosController::#createOne::error executing::error=${utils.common.stringify(error)}`);
      throw error;
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
  @UseFilters(HttpExceptionsFilter)
  async deleteOne(@Param('_id', new StringPipe()) _id: string, @Request() req: any, @Response() res: any): Promise<Todos> {
    try {
      const todos: any = await this.todosService.deleteOne(_id);
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).end(utils.common.stringify(todos));
    } catch (err) {
      const error: APIError = new APIError(err);
      logger.error(`{}TodosController::#deleteOne::error executing::error=${utils.common.stringify(error)}`);
      throw error;
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
  @UseFilters(HttpExceptionsFilter)
  async replaceOne(@Param('_id', new StringPipe()) _id: string, @Body(new ReplaceTodoPipe()) body, @Request() req: any, @Response() res: any): Promise<Todos> {
    try {
      const todos: any = await this.todosService.replaceOne(_id, body);
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).end(utils.common.stringify(todos));
    } catch (err) {
      const error: APIError = new APIError(err);
      logger.error(`{}TodosController::#replaceOne::error executing::error=${utils.common.stringify(error)}`);
      throw error;
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
  @UseFilters(HttpExceptionsFilter)
  async updateOne(@Param('_id', new StringPipe()) _id: string, @Body(new UpdateTodoPipe()) body, @Response() req, @Response() res: any): Promise<Todos> {
    try {
      const todos: any = await this.todosService.updateOne(_id, body);
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).end(utils.common.stringify(todos));
    } catch (err) {
      const error: APIError = new APIError(err);
      logger.error(`{}TodosController::#updateOne::error executing::error=${utils.common.stringify(error)}`);
      throw error;
    }
  }
}
