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
    return;
  });

  it('/todos (GET)', async () => {
    const response: any = await request(
      app,
      'get',
      '/todos',
      { task: 'test task', completed: false }
    );

    expect(response.status).toEqual(200);
    return;
  });

  afterAll(async () => {
    const todosDatabase = await mongo.getDatabase(process.env.TODOS_DATABASE);

    await todosDatabase.collection('todos').remove({});

    await mongo.shutdown();

    return;
  });
});
