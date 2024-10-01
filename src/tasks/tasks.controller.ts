import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Req, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/task.dto';
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }


  @Get()
  getAllTasks() {
    return this.tasksService.getAllTasks()
  }

  @Get('user/:id')
  getTasksByUserId(
    @Param("id") id: string
  ) {
    return this.tasksService.getByUserId(id);
  }

  @Get('categories/:id')
  getTasksByCategory(
    @Param("id") id: string
  ) {
    return this.tasksService.getByCategory(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('status/:id')
  updateTodoStatus(
    @Param("id") id : string,
    @Body() status : any
  ){
    console.log(status.status)
    
    return this.tasksService.updateStatus(id,status.status)
  }



  @UseGuards(JwtAuthGuard)
  @Get('myTasks')
  getProfileTasks(
    @Req() req: any
  ) {
    const tasks = this.tasksService.getProfileTasks(req.user._id);

    if (!tasks) {
      throw new NotFoundException(`Not tasks found on ${req.user.username}`)
    }

    return tasks;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createNewTask(
    @Body() createTask: CreateTaskDto,
    @Request() req
  ) {
    const user = req.user;
    return this.tasksService.createNewTask(createTask, user);
  }

  @Delete()
  deleteAllTasks() {
    this.tasksService.deleteAll();
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async deleteTaskById(
    @Param("id") id: string,
    @Req() req: any,
    @Body() body
  ) {

    if (body.userId !== req.user._id) {
      throw new NotFoundException(`You are not allowed to delete this task`);
    }

    await this.tasksService.deleteTaskById(id);

    return { message: 'Task deleted', status: 201 };

  }

  @UseGuards(JwtAuthGuard)
  @Post(":id/like")
  async likeTask(
    @Param('id') taskId: string,
    @Req() req: any
  ) {
    const user = req.user;
    const updatedTask = this.tasksService.likeTask(taskId, user);

    if (!updatedTask) {
      console.log(32321)
      throw new NotFoundException("Task not found");
    }

    return updatedTask;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id/like")
  async unlikeTask(
    @Param('id') taskId: string,
    @Req() req: any
  ) {
    const user = req.user;
    const updatedTask = this.tasksService.deleteLike(taskId, user);

    if (!updatedTask) {
      throw new NotFoundException("Task not found");
    }

    return updatedTask;
  }

  @UseGuards(JwtAuthGuard)
  @Post("comment/:id")
  async addNewComment(
    @Param('id') taskId: string,
    @Body('comment') comment: string,
    @Req() req: any
  ) {
    console.log(taskId , comment , req.user._id)
    const commentData = {
      username : req.user.username,
      content : comment
    }
    const updatedTask = this.tasksService.addComment(commentData , taskId);

    if (!updatedTask) {
      throw new NotFoundException("Task not found");
    }

    return updatedTask;

  }

  
  @UseGuards(JwtAuthGuard)
  @Delete("comment/:id/:commentId")
  async deleteComment(
    @Param('id') taskId: string,
    @Param('commentId') commentId: string,
    @Req() req: any
  ) {

    console.log(taskId , commentId)
    
    const commentUser = await this.tasksService.getCommentById(commentId);
    
    if(!commentUser){
      throw new NotFoundException("Comment not Found");
    }
    
    if((await commentUser).username != req.user.username){
      throw new UnauthorizedException("You are not allowed to delete this comment");
    }
    
   
    const updatedTask = this.tasksService.deleteComment(taskId , commentId , req.user);

    if (!updatedTask) {
      throw new NotFoundException("Task not found");
    }

    return updatedTask;

  }

}
