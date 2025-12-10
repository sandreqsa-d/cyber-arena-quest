import React from 'react';
import { modules } from '@/data/quizData';
import { useProgress } from '@/contexts/ProgressContext';
import Header from '@/components/Header';
import ModuleCard from '@/components/ModuleCard';
import MatrixRain from '@/components/MatrixRain';
import { motion } from 'framer-motion';
import { BookOpen, Trophy, Lock, Unlock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Modules: React.FC = () => {
  const { canAccessFinalQuiz, getCompletedModulesCount } = useProgress();
  const allCompleted = canAccessFinalQuiz();
  const completedCount = getCompletedModulesCount();

  return (
    <div className="min-h-screen bg-background relative">
      <MatrixRain />
      <Header />
      
      <main className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center gap-3 mb-4">
              <BookOpen className="w-8 h-8 text-primary" />
              <h1 className="font-display text-4xl font-bold">
                Training <span className="text-primary">Modules</span>
              </h1>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Complete all modules to unlock the Final Quiz. Each module includes 
              theoretical quizzes and hands-on terminal challenges.
            </p>
          </motion.div>

          {/* Progress Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className={`
              mb-8 p-6 rounded-xl border 
              ${allCompleted 
                ? 'border-primary bg-primary/5 box-glow-green' 
                : 'border-border bg-card'
              }
            `}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${allCompleted ? 'bg-primary/20' : 'bg-muted'}`}>
                  {allCompleted ? (
                    <Trophy className="w-8 h-8 text-primary" />
                  ) : (
                    <Lock className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold">
                    {allCompleted ? 'All Modules Completed!' : 'Complete All Modules'}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {allCompleted 
                      ? 'The Final Quiz is now unlocked. Test everything you\'ve learned!'
                      : `${completedCount}/${modules.length} modules completed. Keep going!`
                    }
                  </p>
                </div>
              </div>
              
              <Link to={allCompleted ? '/final-quiz' : '#'}>
                <Button 
                  disabled={!allCompleted}
                  className="gap-2"
                >
                  {allCompleted ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                  Final Quiz
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-secondary"
                  initial={{ width: 0 }}
                  animate={{ width: `${(completedCount / modules.length) * 100}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.div>

          {/* Modules Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => (
              <ModuleCard key={module.id} module={module} index={index} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Modules;
