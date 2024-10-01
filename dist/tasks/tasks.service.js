"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const tasks_schema_1 = require("./schemas/tasks.schema");
const mongoose_2 = require("mongoose");
const task_gateway_1 = require("./gateways/task.gateway");
let TasksService = class TasksService {
    constructor(taskModel, taskGateway) {
        this.taskModel = taskModel;
        this.taskGateway = taskGateway;
    }
    async getAllTasks() {
        return this.taskModel.find().populate('user').sort({ createdAt: -1 }).populate('categories').exec();
    }
    async getByUserId(id) {
        return this.taskModel.find({ 'user._id': id }).exec();
    }
    async getById(id) {
        const task = this.taskModel.findOne({ _id: id }).exec();
        if (!task) {
            return null;
        }
        return task;
    }
    async updateStatus(id, newStatus) {
        console.log(newStatus);
        const task = await this.getById(id);
        if (!task) {
            return null;
        }
        return this.taskModel.findByIdAndUpdate(id, {
            $set: { status: newStatus }
        }, { new: true });
    }
    async getByCategory(id) {
        return this.taskModel.find({ 'categories._id': id }).exec();
    }
    async getProfileTasks(id) {
        const tasks = this.taskModel.find({ 'user._id': id }).sort({ createAt: -1 }).exec();
        if (!tasks)
            return null;
        return tasks;
    }
    async createNewTask(createTask, user) {
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
    async deleteTaskById(id) {
        this.taskGateway.notifyNewTask();
        await this.taskModel.deleteOne({ _id: id });
    }
    async deleteAll() {
        this.taskGateway.notifyNewTask();
        await this.taskModel.deleteMany({});
    }
    async likeTask(id, user) {
        const task = await this.taskModel.findOne({ _id: id });
        if (!task)
            return null;
        this.taskGateway.notifyNewTask();
        return this.taskModel.findByIdAndUpdate(id, {
            $addToSet: { likes: { _id: user._id, username: user.username } }
        }, { new: true });
    }
    async deleteLike(id, user) {
        const task = await this.taskModel.findOne({ _id: id });
        if (!task)
            return null;
        this.taskGateway.notifyNewTask();
        return this.taskModel.findByIdAndUpdate(id, {
            $pull: { likes: { _id: user._id } }
        }, { new: true });
    }
    async addComment(content, taskId) {
        const task = await this.taskModel.findById(taskId).exec();
        if (!task)
            return null;
        const newComment = {
            _id: new mongoose_2.default.Types.ObjectId(),
            username: content.username,
            content: content.content,
        };
        return await this.taskModel.findByIdAndUpdate(taskId, { $addToSet: { comments: newComment } }, { new: true });
    }
    async getCommentById(id) {
        const task = await this.taskModel.findOne({ 'comments._id': id }).exec();
        if (!task) {
            return null;
        }
        const comment = task.comments.find(comment => comment._id.toString() === id);
        if (!comment) {
            return null;
        }
        return comment;
    }
    async deleteComment(taskId, commentId, user) {
        const task = await this.taskModel.findOne({ 'comments._id': commentId }).exec();
        if (!task)
            return null;
        this.taskGateway.notifyNewTask();
        return this.taskModel.findByIdAndUpdate(taskId, {
            $pull: { comments: { _id: commentId } }
        }, { new: true });
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(tasks_schema_1.Task.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        task_gateway_1.TaskGateway])
], TasksService);
//# sourceMappingURL=tasks.service.js.map