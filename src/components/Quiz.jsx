import React, { useState } from 'react';
import { useQuiz } from '../context/QuizContext';

export default function Quiz() {
  const { quizData, userAnswers, setSelectedAnswer } = useQuiz();
  const [currentIndex, setCurrentIndex] = useState(0);

  const current = quizData[currentIndex];
  const selected = userAnswers[currentIndex];

  // Calculate score: number of correct answers
  const score = quizData.reduce(
    (acc, q, i) => (userAnswers[i] === q.correctAnswer ? acc + 1 : acc),
    0
  );

  // All questions answered?
  const allAnswered = quizData.every((_, i) => userAnswers[i] !== undefined);

  const goNext = () => {
    if (currentIndex < quizData.length - 1) {
      setCurrentIndex(i => i + 1);
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 900 }}>
      <div className="row quiz-card">
        {/* ===== LEFT: Question panel ===== */}
        <div className="col-md-7 py-4 px-4">
          {current ? (
            <>
              <h6 className="fw-bold text-danger mb-1">
                Question {currentIndex + 1}
              </h6>
              <p className="mb-3" style={{ color: '#555', fontSize: '0.9rem' }}>
                {current.question}
              </p>

              <div className="d-flex flex-column gap-1 mb-4">
                {current.answers.map((answer) => (
                  <label key={answer} className="answer-option">
                    <input
                      type="radio"
                      name={`question-${currentIndex}`}
                      value={answer}
                      checked={selected === answer}
                      onChange={() => setSelectedAnswer(currentIndex, answer)}
                    />
                    {answer}
                  </label>
                ))}
              </div>

              <button
                className="btn btn-danger btn-sm"
                onClick={goNext}
                disabled={currentIndex >= quizData.length - 1}
              >
                Next
              </button>
              <button
                className="btn btn-danger btn-sm ms-2"
                onClick={goBack}
                disabled={currentIndex <= 0}
              >
                Back
              </button>
            </>
          ) : (
            <p className="text-muted">No questions available.</p>
          )}
        </div>

        {/* ===== DIVIDER ===== */}
        <div className="col-divider d-none d-md-block" style={{ width: 1, padding: 0 }} />

        {/* ===== RIGHT: Score panel ===== */}
        <div className="col-md-4 score-panel d-flex flex-column justify-content-center py-4">
          <div className="score-title">Quiz Completed!</div>
          <div className="score-value">
            Your score: <strong>{score}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}