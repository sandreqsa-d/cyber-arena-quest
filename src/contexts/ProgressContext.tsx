import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { modules } from '@/data/quizData';

interface ModuleProgress {
  completed: boolean;
  quizScore: number;
  terminalCompleted: boolean;
  flagFound: boolean;
}

interface ProgressContextType {
  progress: Record<string, ModuleProgress>;
  updateProgress: (moduleId: string, updates: Partial<ModuleProgress>) => void;
  isModuleCompleted: (moduleId: string) => boolean;
  canAccessFinalQuiz: () => boolean;
  getCompletedModulesCount: () => number;
  getTotalScore: () => number;
  finalQuizScore: number;
  setFinalQuizScore: (score: number) => void;
  finalQuizCompleted: boolean;
  setFinalQuizCompleted: (completed: boolean) => void;
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const STORAGE_KEY = 'cyber-quest-progress';

export const ProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<Record<string, ModuleProgress>>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
    const initial: Record<string, ModuleProgress> = {};
    modules.forEach(module => {
      initial[module.id] = {
        completed: false,
        quizScore: 0,
        terminalCompleted: false,
        flagFound: false
      };
    });
    return initial;
  });

  const [finalQuizScore, setFinalQuizScore] = useState<number>(() => {
    const saved = localStorage.getItem('final-quiz-score');
    return saved ? parseInt(saved) : 0;
  });

  const [finalQuizCompleted, setFinalQuizCompleted] = useState<boolean>(() => {
    const saved = localStorage.getItem('final-quiz-completed');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem('final-quiz-score', finalQuizScore.toString());
  }, [finalQuizScore]);

  useEffect(() => {
    localStorage.setItem('final-quiz-completed', finalQuizCompleted.toString());
  }, [finalQuizCompleted]);

  const updateProgress = (moduleId: string, updates: Partial<ModuleProgress>) => {
    setProgress(prev => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        ...updates
      }
    }));
  };

  const isModuleCompleted = (moduleId: string): boolean => {
    return progress[moduleId]?.completed || false;
  };

  const canAccessFinalQuiz = (): boolean => {
    return modules.every(module => progress[module.id]?.completed);
  };

  const getCompletedModulesCount = (): number => {
    return Object.values(progress).filter(p => p.completed).length;
  };

  const getTotalScore = (): number => {
    return Object.values(progress).reduce((total, p) => total + p.quizScore, 0);
  };

  const resetProgress = () => {
    const initial: Record<string, ModuleProgress> = {};
    modules.forEach(module => {
      initial[module.id] = {
        completed: false,
        quizScore: 0,
        terminalCompleted: false,
        flagFound: false
      };
    });
    setProgress(initial);
    setFinalQuizScore(0);
    setFinalQuizCompleted(false);
  };

  return (
    <ProgressContext.Provider value={{
      progress,
      updateProgress,
      isModuleCompleted,
      canAccessFinalQuiz,
      getCompletedModulesCount,
      getTotalScore,
      finalQuizScore,
      setFinalQuizScore,
      finalQuizCompleted,
      setFinalQuizCompleted,
      resetProgress
    }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
