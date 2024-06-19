import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      maxlength: 128,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      default: "pendente",
    },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    completedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    completedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Task", taskSchema);
