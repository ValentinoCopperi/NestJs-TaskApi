import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/task.dto';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    getAllTasks(): Promise<import("./schemas/tasks.schema").Task[]>;
    getTasksByUserId(id: string): Promise<import("./schemas/tasks.schema").Task[]>;
    getTasksByCategory(id: string): Promise<import("./schemas/tasks.schema").Task[]>;
    updateTodoStatus(id: string, status: any): Promise<import("./schemas/tasks.schema").Task>;
    getProfileTasks(req: any): Promise<import("./schemas/tasks.schema").Task[]>;
    createNewTask(createTask: CreateTaskDto, req: any): Promise<import("./schemas/tasks.schema").Task>;
    deleteAllTasks(): void;
    deleteTaskById(id: string, req: any, body: any): Promise<{
        message: string;
        status: number;
    }>;
    likeTask(taskId: string, req: any): Promise<import("./schemas/tasks.schema").Task>;
    unlikeTask(taskId: string, req: any): Promise<import("./schemas/tasks.schema").Task>;
    addNewComment(taskId: string, comment: string, req: any): Promise<import("./schemas/tasks.schema").Task>;
    deleteComment(taskId: string, commentId: string, req: any): Promise<import("./schemas/tasks.schema").Task>;
}
