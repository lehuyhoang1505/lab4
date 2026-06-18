import React, { useState } from 'react';
import { useQuiz } from '../context/QuizContext';

export default function QuizList({ quizData, userAnswers, onSelectAnswer, currentIndex }) {
  const { setSelectedAnswer } = useQuiz();
  const [feedback, setFeedback] = useState({});

  const question = quizData[currentIndex];
  const selected = userAnswers[currentIndex];

  const handleSelect = answer => {
    setSelectedAnswer(currentIndex, answer);
    setFeedback(prev => ({
      ...prev,
      [currentIndex]: answer === question.correctAnswer ? 'correct' : 'wrong'
    }));
  };

  return (
    <section className="quiz-list" aria-label={`Question ${currentIndex + 1}`}>
      <h2 className="quiz-list__question">{question.question}</h2>
      <ul className="quiz-list__answers">
        {question.answers.map(answer => {
          const isSelected = selected === answer;
          const fb = feedback[currentIndex];
          let optionClass = 'quiz-option';
          if (isSelected) {
            optionClass +=
              fb === 'correct' ? ' quiz-option--correct' : ' quiz-option--wrong';
          }
          return (
            <li key={answer}>
              <button
                type="button"
                className={optionClass}
                onClick={() => handleSelect(answer)}
              >
                {answer}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}