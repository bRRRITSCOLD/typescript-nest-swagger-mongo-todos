import { Module, } from '@nestjs/common';

/* modules */
import { TodosModule } from './controllers/todos/todos.module';

@Module({
  imports: [TodosModule]
})
export class AppModule {}
