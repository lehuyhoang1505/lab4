import React from 'react';
import { useQuiz } from '../context/QuizContext';

export default function ScoreBoard() {
  const { quizData, userAnswers } = useQuiz();

  const total = quizData.length;
  const answered = quizData.reduce(
    (acc, _, i) => (userAnswers[i] !== undefined ? acc + 1 : acc),
    0
  );
  const correct = quizData.reduce(
    (acc, q, i) => (userAnswers[i] === q.correctAnswer ? acc + 1 : acc),
    0
  );

  return (
    <div className="scoreboard" aria-label="Quiz score">
      <span className="scoreboard__chip">Answered: {answered}/{total}</span>
      <span className="scoreboard__chip scoreboard__chip--correct">Correct: {correct}</span>
      <span className="scoreboard__chip scoreboard__chip--wrong">
        Wrong: {answered - correct}
      </span>
    </div>
  );
}
