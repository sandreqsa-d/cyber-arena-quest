import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useProgress } from '@/contexts/ProgressContext';
import { modules } from '@/data/quizData';
import { Shield, Home, BookOpen, Trophy, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const location = useLocation();
  const { getCompletedModulesCount, canAccessFinalQuiz } = useProgress();
  
  const completedCount = getCompletedModulesCount();
  const totalModules = modules.length;
  const progressPercentage = (completedCount / totalModules) * 100;

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/modules', icon: BookOpen, label: 'Modules' },
    { path: '/final-quiz', icon: Trophy, label: 'Final Quiz', locked: !canAccessFinalQuiz() }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="text-primary"
            >
              <Shield className="w-8 h-8" />
            </motion.div>
            <div>
              <h1 className="font-display font-bold text-lg text-foreground text-glow-green">
                CYBER QUEST
              </h1>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                Security Academy
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(({ path, icon: Icon, label, locked }) => {
              const isActive = location.pathname === path;
              
              return (
                <Link
                  key={path}
                  to={locked ? '#' : path}
                  onClick={(e) => locked && e.preventDefault()}
                  className={`
                    relative px-4 py-2 rounded-lg font-mono text-sm transition-all duration-200
                    flex items-center gap-2
                    ${isActive 
                      ? 'text-primary bg-primary/10' 
                      : locked 
                        ? 'text-muted-foreground/50 cursor-not-allowed' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                  {locked && <span className="text-[10px]">🔒</span>}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-primary/10 rounded-lg border border-primary/30"
                      style={{ zIndex: -1 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Progress Indicator */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <Terminal className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">
                <span className="text-primary font-bold">{completedCount}</span>/{totalModules}
              </span>
            </div>
            <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary via-secondary to-primary"
                style={{ backgroundSize: '200% 100%' }}
                initial={{ width: 0 }}
                animate={{ 
                  width: `${progressPercentage}%`,
                  backgroundPosition: ['0% 0%', '100% 0%']
                }}
                transition={{ 
                  width: { duration: 0.5 },
                  backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear" }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
