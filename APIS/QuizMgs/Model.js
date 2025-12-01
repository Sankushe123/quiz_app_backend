import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    questionType: {
        type: String,
        enum: ["mcq", "true_false", "short_answer"],
        required: true
    },
    questionLabel: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        default: []
    },
    correctAnswer: {
        type: String,
        required: true
    },
    marks: {
        type: Number,
        default: 1
    }
});

// ➤ Store user attempts inside each quiz
const attemptSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",      // Reference to User model
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
});

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    questions: [questionSchema],

    // ➤ Users who attempted + their scores
    attempts: [attemptSchema]
});

export default mongoose.models.Quiz || mongoose.model("Quiz", quizSchema);
