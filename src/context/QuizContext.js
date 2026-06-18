import React, { createContext, useContext, useMemo, useState } from 'react';
import { quizData as initialQuizData } from '../data/quizData';

const QuizContext = createContext(null);

export function QuizProvider({ children }) {
  const [quizData, setQuizData] = useState(initialQuizData);
  const [userAnswers, setUserAnswers] = useState({});
  const [draft, setDraft] = useState({
    question: '',
    answers: ['', '', ''],
    correctAnswer: ''
  });

  const setSelectedAnswer = (questionIndex, answer) => {
    setUserAnswers(prev => ({ ...prev, [questionIndex]: answer }));
  };

  const updateDraftField = (field, value) => {
    setDraft(prev => ({ ...prev, [field]: value }));
  };

  const updateDraftAnswer = (slot, value) => {
    setDraft(prev => ({
      ...prev,
      answers: prev.answers.map((a, i) => (i === slot ? value : a))
    }));
  };

  const addQuestion = () => {
    const trimmedAnswers = draft.answers.map(a => a.trim()).filter(Boolean);
    if (!draft.question.trim() || trimmedAnswers.length < 2 || !draft.correctAnswer.trim()) {
      return false;
    }
    if (!trimmedAnswers.includes(draft.correctAnswer.trim())) {
      return false;
    }
    setQuizData(prev => [
      ...prev,
      {
        question: draft.question.trim(),
        answers: trimmedAnswers,
        correctAnswer: draft.correctAnswer.trim()
      }
    ]);
    setDraft({ question: '', answers: ['', '', ''], correctAnswer: '' });
    return true;
  };

  const value = useMemo(
    () => ({
      quizData,
      userAnswers,
      draft,
      setSelectedAnswer,
      updateDraftField,
      updateDraftAnswer,
      addQuestion
    }),
    [quizData, userAnswers, draft]
  );

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) {
    throw new Error('useQuiz must be used inside a <QuizProvider>');
  }
  return ctx;
}
