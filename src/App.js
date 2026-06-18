import React from 'react';
import { QuizProvider } from './context/QuizContext';
import Quiz from './components/Quiz';
import './App.css';

function App() {
  return (
    <QuizProvider>
      <div className="app-wrapper">
        <Quiz />
      </div>
    </QuizProvider>
  );
}

export default App;
