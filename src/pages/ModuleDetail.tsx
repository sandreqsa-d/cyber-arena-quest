import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { modules } from '@/data/quizData';
import { useProgress } from '@/contexts/ProgressContext';
import Header from '@/components/Header';
import Terminal from '@/components/Terminal';
import QuizComponent from '@/components/QuizComponent';
import MatrixRain from '@/components/MatrixRain';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  CheckCircle, 
  Clock, 
  BookOpen, 
  Terminal as TerminalIcon,
  Trophy,
  Flag,
  ChevronRight
} from 'lucide-react';
import { toast } from 'sonner';

const ModuleDetail: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const { progress, updateProgress } = useProgress();
  
  const module = modules.find(m => m.id === moduleId);
  const moduleProgress = progress[moduleId || ''];
  
  const [activeTab, setActiveTab] = useState('overview');
  const [quizCompleted, setQuizCompleted] = useState(moduleProgress?.quizScore > 0);

  if (!module) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold mb-4">Module Not Found</h1>
          <Link to="/modules">
            <Button>Back to Modules</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleQuizComplete = (score: number, total: number) => {
    const passed = (score / total) >= 0.7;
    setQuizCompleted(true);
    
    if (passed) {
      const hasTerminal = !!module.terminalChallenge;
      const isComplete = !hasTerminal || moduleProgress?.terminalCompleted;
      
      updateProgress(module.id, {
        quizScore: score,
        completed: isComplete
      });
      
      toast.success(`Quiz completed! Score: ${score}/${total}`);
      
      if (hasTerminal && !moduleProgress?.terminalCompleted) {
        toast.info('Complete the terminal challenge to finish this module!');
      }
    } else {
      toast.error(`Score: ${score}/${total}. You need 70% to pass.`);
    }
  };

  const handleFlagFound = () => {
    updateProgress(module.id, {
      terminalCompleted: true,
      flagFound: true,
      completed: quizCompleted || moduleProgress?.quizScore > 0
    });
    
    toast.success('🚩 Flag captured! Terminal challenge completed!');
  };

  const getNextModule = () => {
    const currentIndex = modules.findIndex(m => m.id === moduleId);
    if (currentIndex < modules.length - 1) {
      return modules[currentIndex + 1];
    }
    return null;
  };

  const nextModule = getNextModule();

  return (
    <div className="min-h-screen bg-background relative">
      <MatrixRain />
      <Header />
      
      <main className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link 
              to="/modules" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Modules
            </Link>
          </motion.div>

          {/* Module Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="text-5xl">{module.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="font-display text-3xl font-bold">{module.title}</h1>
                  {moduleProgress?.completed && (
                    <CheckCircle className="w-6 h-6 text-primary" />
                  )}
                </div>
                <p className="text-muted-foreground">{module.description}</p>
              </div>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full border text-sm font-mono uppercase ${
                module.difficulty === 'beginner' ? 'border-primary text-primary' :
                module.difficulty === 'intermediate' ? 'border-accent text-accent' :
                'border-destructive text-destructive'
              }`}>
                {module.difficulty}
              </span>
              <span className="px-3 py-1 rounded-full border border-muted-foreground/30 text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {module.estimatedTime}
              </span>
              <span className="px-3 py-1 rounded-full border border-muted-foreground/30 text-sm text-muted-foreground">
                {module.questions.length} Questions
              </span>
              {module.terminalChallenge && (
                <span className="px-3 py-1 rounded-full border border-primary/30 text-sm text-primary flex items-center gap-1">
                  <TerminalIcon className="w-3 h-3" />
                  Terminal Challenge
                </span>
              )}
            </div>

            {/* Topics */}
            <div className="flex flex-wrap gap-2">
              {module.topics.map((topic, i) => (
                <span 
                  key={i}
                  className="px-3 py-1 bg-muted rounded-lg text-sm text-muted-foreground"
                >
                  {topic}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Progress Status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            <div className={`p-4 rounded-lg border ${moduleProgress?.quizScore > 0 ? 'border-primary bg-primary/5' : 'border-border bg-card'}`}>
              <BookOpen className={`w-5 h-5 mb-2 ${moduleProgress?.quizScore > 0 ? 'text-primary' : 'text-muted-foreground'}`} />
              <div className="text-sm text-muted-foreground">Quiz Score</div>
              <div className="text-xl font-display font-bold">
                {moduleProgress?.quizScore > 0 
                  ? `${moduleProgress.quizScore}/${module.questions.length}` 
                  : '-'
                }
              </div>
            </div>
            
            {module.terminalChallenge && (
              <div className={`p-4 rounded-lg border ${moduleProgress?.terminalCompleted ? 'border-primary bg-primary/5' : 'border-border bg-card'}`}>
                <TerminalIcon className={`w-5 h-5 mb-2 ${moduleProgress?.terminalCompleted ? 'text-primary' : 'text-muted-foreground'}`} />
                <div className="text-sm text-muted-foreground">Terminal</div>
                <div className="text-xl font-display font-bold">
                  {moduleProgress?.terminalCompleted ? 'Complete' : 'Pending'}
                </div>
              </div>
            )}
            
            <div className={`p-4 rounded-lg border ${moduleProgress?.flagFound ? 'border-primary bg-primary/5' : 'border-border bg-card'}`}>
              <Flag className={`w-5 h-5 mb-2 ${moduleProgress?.flagFound ? 'text-primary' : 'text-muted-foreground'}`} />
              <div className="text-sm text-muted-foreground">Flag</div>
              <div className="text-xl font-display font-bold">
                {moduleProgress?.flagFound ? 'Captured' : 'Hidden'}
              </div>
            </div>
            
            <div className={`p-4 rounded-lg border ${moduleProgress?.completed ? 'border-primary bg-primary/5 box-glow-green' : 'border-border bg-card'}`}>
              <Trophy className={`w-5 h-5 mb-2 ${moduleProgress?.completed ? 'text-primary' : 'text-muted-foreground'}`} />
              <div className="text-sm text-muted-foreground">Status</div>
              <div className="text-xl font-display font-bold">
                {moduleProgress?.completed ? 'Complete!' : 'In Progress'}
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start mb-6 bg-muted/50 border border-border">
                <TabsTrigger value="overview" className="gap-2">
                  <BookOpen className="w-4 h-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="quiz" className="gap-2">
                  <Trophy className="w-4 h-4" />
                  Quiz
                  {moduleProgress?.quizScore > 0 && <CheckCircle className="w-3 h-3 text-primary" />}
                </TabsTrigger>
                {module.terminalChallenge && (
                  <TabsTrigger value="terminal" className="gap-2">
                    <TerminalIcon className="w-4 h-4" />
                    Terminal
                    {moduleProgress?.terminalCompleted && <CheckCircle className="w-3 h-3 text-primary" />}
                  </TabsTrigger>
                )}
              </TabsList>

              <TabsContent value="overview" className="bg-card border border-border rounded-xl p-6">
                <h2 className="font-display text-xl font-bold mb-4">About This Module</h2>
                <p className="text-muted-foreground mb-6">{module.description}</p>
                
                <h3 className="font-display font-bold mb-3">What You'll Learn</h3>
                <ul className="space-y-2 mb-6">
                  {module.topics.map((topic, i) => (
                    <li key={i} className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      {topic}
                    </li>
                  ))}
                </ul>

                <h3 className="font-display font-bold mb-3">To Complete This Module</h3>
                <ol className="space-y-2 text-muted-foreground list-decimal list-inside">
                  <li>Complete the quiz with at least 70% correct answers</li>
                  {module.terminalChallenge && <li>Find the flag in the terminal challenge</li>}
                </ol>

                <div className="mt-6 flex gap-4">
                  <Button onClick={() => setActiveTab('quiz')} className="gap-2">
                    Start Quiz
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="quiz" className="bg-card border border-border rounded-xl p-6">
                <QuizComponent 
                  questions={module.questions} 
                  onComplete={handleQuizComplete}
                  title={`${module.title} Quiz`}
                />
              </TabsContent>

              {module.terminalChallenge && (
                <TabsContent value="terminal">
                  <Terminal 
                    challenge={module.terminalChallenge}
                    onFlagFound={handleFlagFound}
                  />
                </TabsContent>
              )}
            </Tabs>
          </motion.div>

          {/* Next Module */}
          {moduleProgress?.completed && nextModule && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 p-6 bg-card border border-primary/30 rounded-xl box-glow-green"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-lg mb-1">Module Complete! 🎉</h3>
                  <p className="text-muted-foreground">
                    Ready for the next challenge? Continue to {nextModule.title}
                  </p>
                </div>
                <Link to={`/module/${nextModule.id}`}>
                  <Button className="gap-2">
                    Next Module
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ModuleDetail;
