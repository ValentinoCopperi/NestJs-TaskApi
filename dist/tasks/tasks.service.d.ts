import { Task } from './schemas/tasks.schema';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/task.dto';
import { JwtUserDto } from 'src/auth/dto/UserAuthDto';
import { TaskGateway } from './gateways/task.gateway';
interface Comment {
    _id?: any;
    username: string;
    content: string;
    createdAt?: any;
}
export declare class TasksService {
    private readonly taskModel;
    private readonly taskGateway;
    constructor(taskModel: Model<Task>, taskGateway: TaskGateway);
    getAllTasks(): Promise<Task[]>;
    getByUserId(id: string): Promise<Task[]>;
    getById(id: string): Promise<Task>;
    updateStatus(id: string, newStatus: string): Promise<Task>;
    getByCategory(id: string): Promise<Task[]>;
    getProfileTasks(id: string): Promise<Task[]>;
    createNewTask(createTask: CreateTaskDto, user: JwtUserDto): Promise<Task>;
    deleteTaskById(id: string): Promise<void>;
    deleteAll(): Promise<void>;
    likeTask(id: string, user: any): Promise<Task>;
    deleteLike(id: string, user: any): Promise<Task>;
    addComment(content: Comment, taskId: string): Promise<Task>;
    getCommentById(id: string): Promise<Comment>;
    deleteComment(taskId: string, commentId: string, user: any): Promise<Task>;
}
export {};
