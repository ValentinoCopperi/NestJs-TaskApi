import mongoose, { Types } from "mongoose";
export declare enum taskStatus {
    PENDING = "pending",
    IN_PROGRESS = "in_progress",
    DONE = "done",
    CANCELLED = "cancelled"
}
export declare class Task {
    title: string;
    description: string;
    status: taskStatus;
    isDone: boolean;
    user: {
        _id: Types.ObjectId;
        username: string;
        email: string;
    };
    categories: {
        _id: Types.ObjectId;
        username: string;
    };
    likes: Array<{
        _id: Types.ObjectId;
        username: string;
    }>;
    comments: Array<{
        _id: Types.ObjectId;
        username: string;
        content: string;
        createdAt: Date;
    }>;
}
export declare const TaskSchema: mongoose.Schema<Task, mongoose.Model<Task, any, any, any, mongoose.Document<unknown, any, Task> & Task & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Task, mongoose.Document<unknown, {}, mongoose.FlatRecord<Task>> & mongoose.FlatRecord<Task> & {
    _id: Types.ObjectId;
}>;
