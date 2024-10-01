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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskSchema = exports.Task = exports.taskStatus = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
var taskStatus;
(function (taskStatus) {
    taskStatus["PENDING"] = "pending";
    taskStatus["IN_PROGRESS"] = "in_progress";
    taskStatus["DONE"] = "done";
    taskStatus["CANCELLED"] = "cancelled";
})(taskStatus || (exports.taskStatus = taskStatus = {}));
let Task = class Task {
};
exports.Task = Task;
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    }),
    __metadata("design:type", String)
], Task.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        maxlength: 500,
        default: ""
    }),
    __metadata("design:type", String)
], Task.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: taskStatus,
        default: taskStatus.PENDING
    }),
    __metadata("design:type", String)
], Task.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
        default: false
    }),
    __metadata("design:type", Boolean)
], Task.prototype, "isDone", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            _id: { type: mongoose_2.Types.ObjectId, ref: 'User' },
            username: { type: String },
            email: { type: String }
        },
    }),
    __metadata("design:type", Object)
], Task.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            _id: { type: mongoose_2.Types.ObjectId, ref: 'Category' },
            name: { type: String }
        }
    }),
    __metadata("design:type", Object)
], Task.prototype, "categories", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [{
                _id: { type: mongoose_2.Types.ObjectId, ref: 'User' },
                username: { type: String },
                createdAt: { type: Date, default: Date.now }
            }],
        default: []
    }),
    __metadata("design:type", Array)
], Task.prototype, "likes", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [{
                _id: { type: mongoose_2.Types.ObjectId, ref: 'User' },
                username: { type: String },
                content: { type: String, required: true, maxlength: 500 },
                createdAt: { type: Date, default: Date.now }
            }],
        default: []
    }),
    __metadata("design:type", Array)
], Task.prototype, "comments", void 0);
exports.Task = Task = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Task);
exports.TaskSchema = mongoose_1.SchemaFactory.createForClass(Task);
//# sourceMappingURL=tasks.schema.js.map