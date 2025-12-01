import Quiz from './Model.js';
import User from '../users/modal.js';
export const createQuiz = async (req, res) => {
  try {
    const { title, questions } = req.body;

    console.log("req.body", req.body);


    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    if (!questions || questions.length === 0) {
      return res.status(400).json({ message: "At least 1 question required" });
    }

    const quiz = new Quiz({
      title,
      questions
    });

    await quiz.save();

    res.status(201).json({
      success: true,
      message: "Quiz created successfully",
      quiz,
    });

  } catch (error) {
    console.error("Error creating quiz:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
      .populate("attempts.userId", "name email"); // 👈 populate user data

    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    res.status(200).json(quiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    res.status(200).json(quiz);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


export const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.status(200).json({ message: 'Quiz deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const submitQuizAttempt = async (req, res) => {
  try {
    const { name, email, score } = req.body;
    const { quizId } = req.params;

    if (!name || !email || score === undefined) {
      return res.status(400).json({ message: "Name, email and score are required" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ name, email });
      await user.save();
    }

    const updatedQuiz = await Quiz.findByIdAndUpdate(
      quizId,
      {
        $push: {
          attempts: {
            userId: user._id,
            score,
            submittedAt: new Date()
          }
        }
      },
      { new: true }
    );

    if (!updatedQuiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.status(200).json({
      success: true,
      message: "Quiz attempt submitted successfully",
      user,
      quiz: updatedQuiz
    });

  } catch (error) {
    console.error("Submit quiz attempt error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
