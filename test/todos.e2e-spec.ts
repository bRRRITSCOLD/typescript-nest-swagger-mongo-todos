/* node_modules */
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

/* app */
import { AppModule } from '../src/app';
import mongo from '../src/lib/mongo';

/* utils */
import { request } from './utils';

jest.setTimeout(30000)

describe('TodosController (e2e)', () => {
  let app: INestApplication;

  let createdTodo;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await Promise.all([app.init(), mongo.init(process.env.NODE_ENV === 'LOCAL' ? 'src/configs/datasources' : 'configs/datasources')]);
  });

  it('/todos (POST)', async () => {
    const response: any = await request(
      app,
      'post',
      '/todos',
      { task: 'test task', completed: false }
    );

    expect(response.status).toEqual(200);
    expect(response.body.todos).toBeDefined();
    expect(response.body.todos.length).toEqual(1);    

    createdTodo = response.body.todos[0];

    return;
  });

  it('/todos (GET)', async () => {
    const response: any = await request(
      app,
      'get',
      '/todos'
    );

    expect(response.status).toEqual(200);
    expect(response.body.todos.length).toEqual(1);    

    return;
  });

  it('/todos/:_id (GET)', async () => {
    const response: any = await request(
      app,
      'get',
      `/todos/${createdTodo._id}`
    );

    expect(response.status).toEqual(200);
    expect(response.body.todos.length).toEqual(1);    
    expect(response.body.todos[0]._id).toEqual(createdTodo._id);    

    createdTodo = response.body.todos[0];

    return;
  });

  it('/todos/:_id (PUT)', async () => {
    const response: any = await request(
      app,
      'put',
      `/todos/${createdTodo._id}`,
      { task: 'replaced todo task', completed: false }
    );

    expect(response.status).toEqual(200);
    expect(response.body.todos.length).toEqual(1);    
    expect(response.body.todos[0]._id).toEqual(createdTodo._id);    

    createdTodo = response.body.todos[0];

    return;
  });

  it('/todos/:_id (PATCH)', async () => {
    const response: any = await request(
      app,
      'patch',
      `/todos/${createdTodo._id}`,
      { task: 'update todo task' }
    );

    expect(response.status).toEqual(200);
    expect(response.body.todos.length).toEqual(1);    
    expect(response.body.todos[0]._id).toEqual(createdTodo._id);    

    createdTodo = response.body.todos[0];

    return;
  });

  it('/todos/:_id (PATCH)', async () => {
    const response: any = await request(
      app,
      'patch',
      `/todos/${createdTodo._id}`,
      { completed: true }
    );

    createdTodo = response.body.todos[0];

    expect(response.status).toEqual(200);
    expect(response.body.todos.length).toEqual(1);    
    expect(response.body.todos[0]._id).toEqual(createdTodo._id);    

    return;
  });

  it('/todos/:_id (DELETE)', async () => {
    const response: any = await request(
      app,
      'delete',
      `/todos/${createdTodo._id}`
    );

    expect(response.status).toEqual(200);
    expect(response.body.todos.length).toEqual(1);    
    expect(response.body.todos[0]._id).toEqual(createdTodo._id);    

    createdTodo = response.body.todos[0];

    return;
  });

  afterAll(async () => {
    const todosDatabase = await mongo.getDatabase(process.env.TODOS_DATABASE);

    await todosDatabase.collection('todos').remove({});

    await mongo.shutdown();

    return;
  });
});
