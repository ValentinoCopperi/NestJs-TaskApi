import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './schemas/tasks.schema';
import { TaskGateway } from './gateways/task.gateway';

@Module({
  imports : [
    MongooseModule.forFeature([{name : Task.name , schema : TaskSchema}]),
  ],
  controllers: [TasksController],
  providers: [TasksService,TaskGateway],
})
export class TasksModule {}
