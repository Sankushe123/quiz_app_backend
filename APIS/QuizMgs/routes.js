import express from 'express';
import { createQuiz, getQuizzes, getQuizById, updateQuiz, deleteQuiz, submitQuizAttempt } from './controller.js';

const router = express.Router();

router.post('/post', createQuiz);
router.get('/get', getQuizzes);
router.get('/get/:id', getQuizById);
router.put('/update/:id', updateQuiz);
router.delete('/delete/:id', deleteQuiz);

router.post("/quiz/:quizId/submit", submitQuizAttempt);

export default router;
