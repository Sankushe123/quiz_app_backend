import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import quizRoutes from "./APIS/QuizMgs/routes.js";
import userRoutes from "./APIS/users/routes.js";
dotenv.config();

const app = express();

// ---------- CORS FIX ----------
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://quizmgmapp.netlify.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

// ---------- MONGODB CONNECTION ----------
const connectDB = async () => { try { await mongoose.connect(process.env.MONGO_URI); console.log('MongoDB connected successfully'); } catch (err) { console.error('MongoDB connection error:', err); process.exit(1); } }; connectDB();
// ---------- ROUTES ----------
app.use("/api/quiz", quizRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Quiz Server Running...");
});

// ---------- SERVER ----------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
