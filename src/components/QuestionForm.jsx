import React, { useState } from 'react';
import { useQuiz } from '../context/QuizContext';

export default function QuestionForm() {
  const { draft, updateDraftField, updateDraftAnswer, addQuestion } = useQuiz();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    const trimmedAnswers = draft.answers.map(a => a.trim());
    if (!draft.question.trim()) {
      setError('Please enter a question.');
      return;
    }
    if (trimmedAnswers.filter(Boolean).length < 2) {
      setError('Please provide at least two answer options.');
      return;
    }
    if (!draft.correctAnswer.trim()) {
      setError('Please specify the correct answer.');
      return;
    }
    if (!trimmedAnswers.includes(draft.correctAnswer.trim())) {
      setError('The correct answer must match one of the answer options exactly.');
      return;
    }
    const ok = addQuestion();
    if (ok) {
      setError('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } else {
      setError('Could not add the question. Check your inputs.');
    }
  };

  return (
    <form className="question-form" onSubmit={handleSubmit} aria-label="Add a new question">
      <h3>Add a new question</h3>

      <label className="question-form__label" htmlFor="qf-question">
        Question
      </label>
      <input
        id="qf-question"
        type="text"
        value={draft.question}
        onChange={e => updateDraftField('question', e.target.value)}
        placeholder="e.g. What is a React Hook?"
      />

      <label className="question-form__label">Answer options</label>
      {draft.answers.map((answer, i) => (
        <input
          key={i}
          type="text"
          value={answer}
          onChange={e => updateDraftAnswer(i, e.target.value)}
          placeholder={`Option ${i + 1}`}
          className="question-form__option"
        />
      ))}

      <label className="question-form__label" htmlFor="qf-correct">
        Correct answer
      </label>
      <input
        id="qf-correct"
        type="text"
        value={draft.correctAnswer}
        onChange={e => updateDraftField('correctAnswer', e.target.value)}
        placeholder="Must match one of the options above"
      />

      <button type="submit" className="question-form__submit">
        Add question
      </button>

      {error && <p className="question-form__error">{error}</p>}
      {success && <p className="question-form__success">Question added.</p>}
    </form>
  );
}
