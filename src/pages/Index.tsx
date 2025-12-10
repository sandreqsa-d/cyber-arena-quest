import React from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '@/contexts/ProgressContext';
import { modules } from '@/data/quizData';
import Header from '@/components/Header';
import MatrixRain from '@/components/MatrixRain';
import { Button } from '@/components/ui/button';
import { Shield, Terminal, Trophy, Zap, ChevronRight, Lock, Unlock } from 'lucide-react';
import { motion } from 'framer-motion';

const Index: React.FC = () => {
  const { getCompletedModulesCount, canAccessFinalQuiz, getTotalScore, finalQuizCompleted, finalQuizScore } = useProgress();
  
  const completedCount = getCompletedModulesCount();
  const totalModules = modules.length;
  const allCompleted = canAccessFinalQuiz();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <MatrixRain />
      <Header />
      
      {/* Hero Section */}
      <main className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto mb-16"
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
              <Shield className="w-12 h-12 text-primary" />
            </motion.div>

            <h1 className="font-display text-5xl md:text-7xl font-black mb-4 text-glow-green">
              <span className="text-primary">CYBER</span>{' '}
              <span className="text-foreground">QUEST</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-2 font-light">
              Become a Cybersecurity Expert
            </p>
            
            <p className="text-muted-foreground/70 mb-8 max-w-2xl mx-auto">
              Master networking, Linux, web security, cryptography, and more through 
              interactive quizzes and hands-on terminal challenges.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/modules">
                <Button size="lg" className="gap-2 font-display text-lg px-8">
                  <Terminal className="w-5 h-5" />
                  Start Learning
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
              
              <Link to={allCompleted ? '/final-quiz' : '#'}>
                <Button 
                  size="lg" 
                  variant={allCompleted ? 'secondary' : 'outline'} 
                  disabled={!allCompleted}
                  className="gap-2 font-display text-lg px-8"
                >
                  {allCompleted ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                  Final Challenge
                  {!allCompleted && <span className="text-xs ml-1">({completedCount}/{totalModules})</span>}
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16"
          >
            {[
              { icon: Terminal, label: 'Modules', value: totalModules, suffix: '' },
              { icon: Zap, label: 'Completed', value: completedCount, suffix: '' },
              { icon: Trophy, label: 'Total Score', value: getTotalScore(), suffix: 'pts' },
              { icon: Shield, label: 'Final Quiz', value: finalQuizCompleted ? finalQuizScore : '?', suffix: finalQuizCompleted ? '%' : '' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/30 transition-colors"
              >
                <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-3xl font-display font-bold text-foreground">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Module Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="font-display text-2xl font-bold text-center mb-8">
              <span className="text-primary">Available</span> Training Modules
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {modules.map((module, index) => (
                <Link 
                  key={module.id}
                  to={`/module/${module.id}`}
                  className="group"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-card border border-border rounded-xl p-4 text-center transition-all hover:border-primary/50 hover:box-glow-green"
                  >
                    <div className="text-3xl mb-2">{module.icon}</div>
                    <div className="font-mono text-xs text-muted-foreground group-hover:text-primary transition-colors">
                      {module.title.split(' ')[0]}
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-20 text-center"
          >
            <h2 className="font-display text-2xl font-bold mb-8">
              <span className="text-secondary">Interactive</span> Learning Experience
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                {
                  icon: '📝',
                  title: 'Quizzes',
                  description: 'Test your knowledge with challenging questions and instant feedback'
                },
                {
                  icon: '💻',
                  title: 'VM Terminal',
                  description: 'Practice commands in a simulated Linux environment'
                },
                {
                  icon: '🏆',
                  title: 'Final Challenge',
                  description: 'Prove your skills in the ultimate comprehensive quiz'
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="bg-card/50 border border-border rounded-xl p-6 hover:border-primary/30 transition-colors"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="font-display font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Index;
