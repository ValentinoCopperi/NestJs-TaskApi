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
exports.TasksController = void 0;
const common_1 = require("@nestjs/common");
const tasks_service_1 = require("./tasks.service");
const task_dto_1 = require("./dto/task.dto");
const jwt_auth_guard_1 = require("../guards/jwt.auth.guard");
let TasksController = class TasksController {
    constructor(tasksService) {
        this.tasksService = tasksService;
    }
    getAllTasks() {
        return this.tasksService.getAllTasks();
    }
    getTasksByUserId(id) {
        return this.tasksService.getByUserId(id);
    }
    getTasksByCategory(id) {
        return this.tasksService.getByCategory(id);
    }
    updateTodoStatus(id, status) {
        console.log(status.status);
        return this.tasksService.updateStatus(id, status.status);
    }
    getProfileTasks(req) {
        const tasks = this.tasksService.getProfileTasks(req.user._id);
        if (!tasks) {
            throw new common_1.NotFoundException(`Not tasks found on ${req.user.username}`);
        }
        return tasks;
    }
    createNewTask(createTask, req) {
        const user = req.user;
        return this.tasksService.createNewTask(createTask, user);
    }
    deleteAllTasks() {
        this.tasksService.deleteAll();
    }
    async deleteTaskById(id, req, body) {
        if (body.userId !== req.user._id) {
            throw new common_1.NotFoundException(`You are not allowed to delete this task`);
        }
        await this.tasksService.deleteTaskById(id);
        return { message: 'Task deleted', status: 201 };
    }
    async likeTask(taskId, req) {
        const user = req.user;
        const updatedTask = this.tasksService.likeTask(taskId, user);
        if (!updatedTask) {
            console.log(32321);
            throw new common_1.NotFoundException("Task not found");
        }
        return updatedTask;
    }
    async unlikeTask(taskId, req) {
        const user = req.user;
        const updatedTask = this.tasksService.deleteLike(taskId, user);
        if (!updatedTask) {
            throw new common_1.NotFoundException("Task not found");
        }
        return updatedTask;
    }
    async addNewComment(taskId, comment, req) {
        console.log(taskId, comment, req.user._id);
        const commentData = {
            username: req.user.username,
            content: comment
        };
        const updatedTask = this.tasksService.addComment(commentData, taskId);
        if (!updatedTask) {
            throw new common_1.NotFoundException("Task not found");
        }
        return updatedTask;
    }
    async deleteComment(taskId, commentId, req) {
        console.log(taskId, commentId);
        const commentUser = await this.tasksService.getCommentById(commentId);
        if (!commentUser) {
            throw new common_1.NotFoundException("Comment not Found");
        }
        if ((await commentUser).username != req.user.username) {
            throw new common_1.UnauthorizedException("You are not allowed to delete this comment");
        }
        const updatedTask = this.tasksService.deleteComment(taskId, commentId, req.user);
        if (!updatedTask) {
            throw new common_1.NotFoundException("Task not found");
        }
        return updatedTask;
    }
};
exports.TasksController = TasksController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "getAllTasks", null);
__decorate([
    (0, common_1.Get)('user/:id'),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "getTasksByUserId", null);
__decorate([
    (0, common_1.Get)('categories/:id'),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "getTasksByCategory", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('status/:id'),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "updateTodoStatus", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('myTasks'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "getProfileTasks", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [task_dto_1.CreateTaskDto, Object]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "createNewTask", null);
__decorate([
    (0, common_1.Delete)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "deleteAllTasks", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "deleteTaskById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(":id/like"),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "likeTask", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(":id/like"),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "unlikeTask", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)("comment/:id"),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('comment')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "addNewComment", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)("comment/:id/:commentId"),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('commentId')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "deleteComment", null);
exports.TasksController = TasksController = __decorate([
    (0, common_1.Controller)('tasks'),
    __metadata("design:paramtypes", [tasks_service_1.TasksService])
], TasksController);
//# sourceMappingURL=tasks.controller.js.map