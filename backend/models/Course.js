import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  duration: {
    type: String, // e.g. "5:34" or "00:08:20"
    required: false,
  },
  description: {
    type: String,
    default: "",
  },
  freePreview: {
    type: Boolean,
    default: false,
  },
  resources: {
    type: [String], // URLs to PDFs, images, or notes
    default: [],
  },
});

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
  // Removed price field
    thumbnail: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "",
    },
    lessons: [lessonSchema], // upgraded from just String[]
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    studentEnrolled: {
      type: Number,
      default: 0,
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    language: {
      type: String,
      default: "English",
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
