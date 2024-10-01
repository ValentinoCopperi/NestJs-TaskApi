import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { Category } from "src/categories/schemas/categories.schema";
import { User } from "src/users/schemas/users.schemas";


export enum taskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
  CANCELLED = 'cancelled'
}

@Schema({ timestamps: true })
export class Task {

  @Prop({
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  })
  title: string;


  @Prop({
    type: String,
    maxlength: 500,
    default : ""
  })
  description: string;


  @Prop({
    type: String,
    enum: taskStatus,
    default: taskStatus.PENDING
  })
  status: taskStatus;

  @Prop({
    type: Boolean,
    default: false
  })
  isDone: boolean;

  @Prop({
    type: {
      _id: { type: Types.ObjectId, ref: 'User' },
      username: { type: String },
      email: { type: String }
    },
  })
  user: {
    _id: Types.ObjectId;
    username: string;
    email: string;
  };

  @Prop({
    type: {
      _id: { type: Types.ObjectId, ref: 'Category' },
      name: { type: String }
    }
  })
  categories: {
    _id: Types.ObjectId,
    username: string;
  };

  @Prop({
    type: [{
      _id: { type: Types.ObjectId, ref: 'User' },
      username: { type: String },
      createdAt: { type: Date, default: Date.now }
    }],
    default: []
  })
  likes: Array<{
    _id: Types.ObjectId,
    username: string;
  }>
  @Prop({
    type: [{
      _id: { type: Types.ObjectId, ref: 'User' },
      username: { type: String },
      content: { type: String, required: true, maxlength: 500 },
      createdAt: { type: Date, default: Date.now }
    }],
    default: []
  })
  comments: Array<{
    _id: Types.ObjectId,
    username: string,
    content: string;
    createdAt: Date;
  }>

}

export const TaskSchema = SchemaFactory.createForClass(Task);