import React, { useState } from 'react';
import { Question } from '@/data/quizData';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, ChevronRight, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuizComponentProps {
  questions: Question[];
  onComplete: (score: number, total: number) => void;
  title?: string;
}

const QuizComponent: React.FC<QuizComponentProps> = ({ questions, onComplete, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = questions[currentIndex];
  const isAnswered = selectedAnswer !== null;
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  const handleSelectAnswer = (index: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(index);
    setShowExplanation(true);
    
    const newAnswers = [...answers];
    newAnswers[currentIndex] = index;
    setAnswers(newAnswers);

    if (index === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setIsComplete(true);
      onComplete(score + (isCorrect ? 0 : 0), questions.length);
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setAnswers(new Array(questions.length).fill(null));
    setIsComplete(false);
  };

  if (isComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    const passed = percentage >= 70;

    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <div className={`text-6xl mb-4 ${passed ? 'text-primary' : 'text-destructive'}`}>
          {passed ? '🎉' : '😔'}
        </div>
        <h2 className={`text-3xl font-display font-bold mb-2 ${passed ? 'text-primary text-glow-green' : 'text-destructive'}`}>
          {passed ? 'Mission Complete!' : 'Mission Failed'}
        </h2>
        <p className="text-xl text-muted-foreground mb-4">
          Score: {score}/{questions.length} ({percentage}%)
        </p>
        
        <div className="w-full bg-muted rounded-full h-4 mb-6 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full ${passed ? 'bg-primary' : 'bg-destructive'}`}
          />
        </div>

        {!passed && (
          <p className="text-muted-foreground mb-6">
            You need 70% to pass. Keep learning and try again!
          </p>
        )}

        <div className="flex gap-4 justify-center">
          {!passed && (
            <Button onClick={handleRetry} variant="outline" className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Retry Quiz
            </Button>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <span className="text-sm text-muted-foreground font-mono">
          {currentIndex + 1}/{questions.length}
        </span>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-xl font-display font-semibold mb-6 text-foreground">
            {currentQuestion.question}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectOption = index === currentQuestion.correctAnswer;
              
              let optionClass = 'border-border hover:border-primary/50 hover:bg-muted/50';
              if (isAnswered) {
                if (isCorrectOption) {
                  optionClass = 'border-primary bg-primary/10 box-glow-green';
                } else if (isSelected && !isCorrectOption) {
                  optionClass = 'border-destructive bg-destructive/10';
                } else {
                  optionClass = 'border-border opacity-50';
                }
              }

              return (
                <motion.button
                  key={index}
                  onClick={() => handleSelectAnswer(index)}
                  disabled={isAnswered}
                  whileHover={!isAnswered ? { scale: 1.01 } : {}}
                  whileTap={!isAnswered ? { scale: 0.99 } : {}}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 flex items-center gap-3 ${optionClass}`}
                >
                  <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-mono text-sm ${
                    isAnswered && isCorrectOption ? 'border-primary bg-primary text-primary-foreground' : 
                    isAnswered && isSelected ? 'border-destructive bg-destructive text-destructive-foreground' : 
                    'border-muted-foreground'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1">{option}</span>
                  {isAnswered && isCorrectOption && (
                    <CheckCircle className="w-5 h-5 text-primary" />
                  )}
                  {isAnswered && isSelected && !isCorrectOption && (
                    <XCircle className="w-5 h-5 text-destructive" />
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Explanation */}
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`p-4 rounded-lg border ${isCorrect ? 'border-primary/30 bg-primary/5' : 'border-destructive/30 bg-destructive/5'}`}
          >
            <p className="text-sm">
              <span className={`font-semibold ${isCorrect ? 'text-primary' : 'text-destructive'}`}>
                {isCorrect ? '✓ Correct!' : '✗ Incorrect.'}
              </span>
              {' '}
              <span className="text-muted-foreground">{currentQuestion.explanation}</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      {isAnswered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-end"
        >
          <Button onClick={handleNext} className="gap-2">
            {currentIndex < questions.length - 1 ? 'Next Question' : 'Complete Quiz'}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default QuizComponent;
