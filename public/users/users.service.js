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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const users_schemas_1 = require("./schemas/users.schemas");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async getAllUsers() {
        return this.userModel.find().lean();
    }
    async getUserById(id) {
        const user = await this.userModel.findById(id).lean();
        if (!user) {
            throw new common_1.NotFoundException("User does not exist");
        }
        return user;
    }
    async createUser(createUserDto) {
        const userExists = await this.userModel.findOne({
            $or: [
                { username: createUserDto.username },
                { email: createUserDto.email },
            ]
        }).exec();
        if (userExists) {
            throw new common_1.ConflictException("User with this email or username already exists");
        }
        ;
        const hashPassword = await bcrypt.hash(createUserDto.password, 10);
        const newUser = new this.userModel({
            ...createUserDto,
            password: hashPassword
        });
        await newUser.save();
        const userWithoutPassword = newUser.toObject();
        delete userWithoutPassword.password;
        return userWithoutPassword;
    }
    async udpateUserData(id, newUsername) {
        const user = await this.userModel.findById(id).lean();
        if (user) {
            throw new common_1.ConflictException(`User with ${newUsername} username already exists`);
        }
        const result = await this.userModel.updateOne({ _id: id }, { $set: { username: newUsername } }).exec();
        if (result.matchedCount === 0) {
            throw new common_1.NotFoundException(`User with id ${id} not found`);
        }
        if (result.modifiedCount === 0) {
            throw new common_1.ConflictException(`The username for user with id ${id} was not updated`);
        }
        return result;
    }
    async updateBio(id, bio) {
        const user = await this.userModel.findById(id).lean();
        if (!user) {
            throw new common_1.ConflictException(`User with ${user.username} username not exists`);
        }
        const updatedUser = await this.userModel.findByIdAndUpdate({ _id: id }, { $set: { description: bio } }, { new: true }).exec();
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(users_schemas_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map