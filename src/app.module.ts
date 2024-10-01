import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users/users.controller';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';
import { CategoriesModule } from './categories/categories.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://vcopperi:copep100@cluster0.njvzanq.mongodb.net/todolist-nest'),
    
    ConfigModule.forRoot(),
    
    UsersModule,
    AuthModule,
    TasksModule,
    CategoriesModule,
    
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
