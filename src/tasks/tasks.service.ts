import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, taskStatus } from './schemas/tasks.schema';
import mongoose, { Date, Model, ObjectId } from 'mongoose';
import { CreateTaskDto } from './dto/task.dto';
import { JwtUserDto } from 'src/auth/dto/UserAuthDto';
import { TaskGateway } from './gateways/task.gateway';

interface Comment {
    _id?: any;
    username: string;
    content: string;
    createdAt? : any
}

interface Status {
    newStatus : string
}

@Injectable()
export class TasksService {


    constructor(
        @InjectModel(Task.name) private readonly taskModel: Model<Task>,
        private readonly taskGateway: TaskGateway
    ) { }

     

    public async getAllTasks(): Promise<Task[]> {

        return this.taskModel.find().populate('user').sort({ createdAt: -1 }).populate('categories').exec();

    }
    public async getByUserId(id: string): Promise<Task[]> {

        return this.taskModel.find({ 'user._id': id }).exec();

    }
    public async getById(id: string): Promise<Task> {

        const task = this.taskModel.findOne({ _id: id }).exec();

        if(!task){
            return null
        }

        return task;
    }

    public async updateStatus(id: string,   newStatus  : string): Promise<Task> {
        console.log(newStatus)
        const task = await this.getById(id)
        if (!task) {
            return null
        }
    
        return this.taskModel.findByIdAndUpdate(
            id,
            {
                $set: { status: newStatus}
            },
            { new: true }
        );
    }


    public async getByCategory(id: string): Promise<Task[]> {

        return this.taskModel.find({ 'categories._id': id }).exec();

    }

    public async getProfileTasks(id: string): Promise<Task[]> {
        const tasks = this.taskModel.find({ 'user._id': id }).sort({ createAt: -1 }).exec();

        if (!tasks) return null;

        return tasks;
    }

    public async createNewTask(createTask: CreateTaskDto, user: JwtUserDto): Promise<Task> {


        const newTask = new this.taskModel({
            ...createTask,
            user: {
                _id: user._id,
                username: user.username
            }
        });

        await newTask.save();

        this.taskGateway.notifyNewTask();

        return newTask;

    }

    public async deleteTaskById(id: string): Promise<void> {
        this.taskGateway.notifyNewTask();
        await this.taskModel.deleteOne({ _id: id });

    }

    public async deleteAll(): Promise<void> {

        this.taskGateway.notifyNewTask();

        await this.taskModel.deleteMany({});

    }

    public async likeTask(id: string, user: any): Promise<Task> {


        const task = await this.taskModel.findOne({ _id: id });

        if (!task) return null;


        this.taskGateway.notifyNewTask();
        return this.taskModel.findByIdAndUpdate(
            id,
            {
                $addToSet: { likes: { _id: user._id, username: user.username } }
            },
            { new: true }
        );


    }
    public async deleteLike(id: string, user: any): Promise<Task> {


        const task = await this.taskModel.findOne({ _id: id });

        if (!task) return null;
        this.taskGateway.notifyNewTask();
        return this.taskModel.findByIdAndUpdate(
            id,
            {
                $pull: { likes: { _id: user._id } }
            },
            { new: true }
        );


    }


    public async addComment(content: Comment, taskId: string): Promise<Task> {

        const task = await this.taskModel.findById(taskId).exec();

        if (!task) return null;
    
        // Generar un nuevo ID para el comentario
        const newComment = {
          _id: new mongoose.Types.ObjectId(),
          username: content.username,
          content: content.content,
        };
    
        // Actualizar la tarea añadiendo el nuevo comentario
       return await this.taskModel.findByIdAndUpdate(
          taskId,
          { $addToSet: { comments: newComment } },
          { new: true }
        )
    
        

    }

    public async getCommentById(id: string): Promise<Comment> {
        // Busca la tarea que contiene el comentario
        const task: Task = await this.taskModel.findOne({ 'comments._id': id }).exec();

        if (!task) {
            return null;
        }



        const comment = task.comments.find(comment => comment._id.toString() === id);

        if (!comment) {
            return null; // Retorna null si no se encuentra el comentario
        }

        return comment; // 

    }

    public async deleteComment(taskId: string, commentId: string, user: any): Promise<Task> {



        const task: Task = await this.taskModel.findOne({ 'comments._id': commentId }).exec();

        if (!task) return null;

        this.taskGateway.notifyNewTask();
        return this.taskModel.findByIdAndUpdate(
            taskId,
            {
                $pull: { comments: { _id:commentId } }
            },
            { new: true }
        );


    }

}
