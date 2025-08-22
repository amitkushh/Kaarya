import mongoose from "mongoose";
import { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  priority: string;
  dueDate: Date;
  owner: mongoose.Schema.Types.ObjectId;
  completed: boolean;
  createdAt: Date;
}

const taskSchema: Schema<ITask> = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },
    dueDate: {
      type: Date,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    completed: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      tyoe: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model<ITask>("Task", taskSchema);
export default Task;
