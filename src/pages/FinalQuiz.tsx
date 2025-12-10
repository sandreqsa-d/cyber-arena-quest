import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { finalQuizQuestions } from '@/data/quizData';
import { useProgress } from '@/contexts/ProgressContext';
import Header from '@/components/Header';
import QuizComponent from '@/components/QuizComponent';
import MatrixRain from '@/components/MatrixRain';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Shield, 
  Lock, 
  ArrowLeft, 
  Star,
  Medal,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';

const FinalQuiz: React.FC = () => {
  const navigate = useNavigate();
  const { 
    canAccessFinalQuiz, 
    finalQuizCompleted, 
    setFinalQuizCompleted, 
    finalQuizScore, 
    setFinalQuizScore,
    resetProgress
  } = useProgress();
  
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizResult, setQuizResult] = useState<{ score: number; total: number } | null>(
    finalQuizCompleted ? { score: Math.round(finalQuizScore * finalQuizQuestions.length / 100), total: finalQuizQuestions.length } : null
  );

  const canAccess = canAccessFinalQuiz();

  const handleQuizComplete = (score: number, total: number) => {
    const percentage = Math.round((score / total) * 100);
    setQuizResult({ score, total });
    setFinalQuizScore(percentage);
    setFinalQuizCompleted(true);

    if (percentage >= 70) {
      // Trigger confetti!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00ff88', '#8b5cf6', '#00d4ff']
      });

      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 250);
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      resetProgress();
      navigate('/');
    }
  };

  if (!canAccess) {
    return (
      <div className="min-h-screen bg-background relative">
        <MatrixRain />
        <Header />
        
        <main className="relative z-10 pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full border-2 border-muted-foreground/30 mb-8">
                <Lock className="w-12 h-12 text-muted-foreground" />
              </div>
              
              <h1 className="font-display text-4xl font-bold mb-4">
                Final Quiz <span className="text-muted-foreground">Locked</span>
              </h1>
              
              <p className="text-muted-foreground mb-8">
                Complete all training modules to unlock the Final Quiz. 
                This is the ultimate test of everything you've learned.
              </p>
              
              <Link to="/modules">
                <Button size="lg" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Modules
                </Button>
              </Link>
            </motion.div>
          </div>
        </main>
      </div>
    );
  }

  if (quizResult && !showQuiz) {
    const percentage = Math.round((quizResult.score / quizResult.total) * 100);
    const passed = percentage >= 70;
    
    const getRank = () => {
      if (percentage >= 95) return { title: 'Elite Hacker', icon: '👑', color: 'text-accent' };
      if (percentage >= 85) return { title: 'Security Expert', icon: '🎖️', color: 'text-primary' };
      if (percentage >= 70) return { title: 'Cyber Warrior', icon: '🛡️', color: 'text-secondary' };
      return { title: 'Apprentice', icon: '📚', color: 'text-muted-foreground' };
    };
    
    const rank = getRank();

    return (
      <div className="min-h-screen bg-background relative">
        <MatrixRain />
        <Header />
        
        <main className="relative z-10 pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              {passed ? (
                <>
                  <motion.div
                    animate={{ 
                      rotate: [0, 10, -10, 10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-8xl mb-6"
                  >
                    {rank.icon}
                  </motion.div>
                  
                  <h1 className="font-display text-5xl font-black mb-2 text-primary text-glow-green">
                    CONGRATULATIONS!
                  </h1>
                  
                  <p className="text-2xl font-display mb-4">
                    You are now a <span className={rank.color}>{rank.title}</span>
                  </p>
                  
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-primary/30 rounded-xl mb-8 box-glow-green">
                    <Trophy className="w-6 h-6 text-primary" />
                    <span className="text-3xl font-display font-bold">{percentage}%</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-8xl mb-6">😔</div>
                  
                  <h1 className="font-display text-4xl font-bold mb-4 text-destructive">
                    Not Quite There
                  </h1>
                  
                  <p className="text-muted-foreground mb-4">
                    You scored {quizResult.score}/{quizResult.total} ({percentage}%)
                  </p>
                  
                  <p className="text-muted-foreground mb-8">
                    You need at least 70% to pass. Review the modules and try again!
                  </p>
                </>
              )}

              {/* Score Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card border border-border rounded-xl p-6 mb-8"
              >
                <h3 className="font-display font-bold mb-4">Your Performance</h3>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{quizResult.score}</div>
                    <div className="text-xs text-muted-foreground">Correct</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-destructive">{quizResult.total - quizResult.score}</div>
                    <div className="text-xs text-muted-foreground">Wrong</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{quizResult.total}</div>
                    <div className="text-xs text-muted-foreground">Total</div>
                  </div>
                </div>

                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={`h-full ${passed ? 'bg-gradient-to-r from-primary to-secondary' : 'bg-destructive'}`}
                  />
                </div>
              </motion.div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => setShowQuiz(true)} 
                  variant="outline" 
                  className="gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Retake Quiz
                </Button>
                
                <Link to="/modules">
                  <Button variant="outline" className="gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Review Modules
                  </Button>
                </Link>

                {passed && (
                  <Button onClick={handleReset} variant="destructive" className="gap-2">
                    <RotateCcw className="w-4 h-4" />
                    Reset & Start Over
                  </Button>
                )}
              </div>

              {/* Certificate */}
              {passed && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-12 p-8 bg-card border-2 border-primary/30 rounded-xl box-glow-green relative overflow-hidden"
                >
                  <div className="absolute inset-0 gradient-cyber opacity-50" />
                  
                  <div className="relative">
                    <div className="flex justify-center mb-4">
                      <Shield className="w-16 h-16 text-primary" />
                    </div>
                    
                    <h2 className="font-display text-2xl font-bold mb-2">Certificate of Completion</h2>
                    <p className="text-muted-foreground mb-4">This certifies that</p>
                    
                    <p className="font-display text-3xl font-bold text-primary mb-4">Cyber Quest Graduate</p>
                    
                    <p className="text-muted-foreground mb-6">
                      has successfully completed all modules and passed the final examination
                      with a score of <span className="text-primary font-bold">{percentage}%</span>
                    </p>
                    
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                      <Star className="w-4 h-4 text-accent" />
                      <span>Cyber Quest Academy</span>
                      <Star className="w-4 h-4 text-accent" />
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </main>
      </div>
    );
  }

  if (!showQuiz) {
    return (
      <div className="min-h-screen bg-background relative">
        <MatrixRain />
        <Header />
        
        <main className="relative z-10 pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <motion.div
                animate={{ 
                  boxShadow: [
                    '0 0 20px hsl(160 100% 50% / 0.3)',
                    '0 0 40px hsl(160 100% 50% / 0.5)',
                    '0 0 20px hsl(160 100% 50% / 0.3)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center justify-center w-24 h-24 rounded-full border-2 border-primary mb-8"
              >
                <Trophy className="w-12 h-12 text-primary" />
              </motion.div>
              
              <h1 className="font-display text-4xl font-bold mb-4">
                The <span className="text-primary text-glow-green">Final Quiz</span>
              </h1>
              
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                You've completed all modules! This is the ultimate test combining everything 
                you've learned about cybersecurity. Are you ready?
              </p>

              {/* Quiz Info */}
              <div className="bg-card border border-border rounded-xl p-6 mb-8 text-left">
                <h3 className="font-display font-bold mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Quiz Details
                </h3>
                
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Medal className="w-4 h-4 text-accent" />
                    {finalQuizQuestions.length} comprehensive questions
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    Covers all modules: Networking, Linux, Web Security, Cryptography & more
                  </li>
                  <li className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-secondary" />
                    Pass with 70% or higher to earn your certificate
                  </li>
                </ul>
              </div>

              <Button 
                size="lg" 
                onClick={() => setShowQuiz(true)}
                className="gap-2 font-display text-lg px-8"
              >
                <Trophy className="w-5 h-5" />
                Start Final Quiz
              </Button>
            </motion.div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <MatrixRain />
      <Header />
      
      <main className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Link 
              to="#"
              onClick={(e) => { e.preventDefault(); setShowQuiz(false); }}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <Trophy className="w-6 h-6 text-primary" />
                <h1 className="font-display text-2xl font-bold">Final Quiz</h1>
              </div>
              
              <QuizComponent 
                questions={finalQuizQuestions}
                onComplete={handleQuizComplete}
              />
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default FinalQuiz;
