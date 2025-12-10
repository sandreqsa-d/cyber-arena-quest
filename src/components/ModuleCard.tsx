import React from 'react';
import { Module } from '@/data/quizData';
import { useProgress } from '@/contexts/ProgressContext';
import { CheckCircle, Clock, Lock, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface ModuleCardProps {
  module: Module;
  index: number;
}

const difficultyColors = {
  beginner: 'text-primary border-primary',
  intermediate: 'text-accent border-accent',
  advanced: 'text-destructive border-destructive'
};

const difficultyGlow = {
  beginner: 'box-glow-green',
  intermediate: 'box-glow-cyan',
  advanced: 'box-glow-purple'
};

const ModuleCard: React.FC<ModuleCardProps> = ({ module, index }) => {
  const { progress, isModuleCompleted } = useProgress();
  const navigate = useNavigate();
  const isCompleted = isModuleCompleted(module.id);
  const moduleProgress = progress[module.id];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      onClick={() => navigate(`/module/${module.id}`)}
      className={`
        relative cursor-pointer rounded-xl border bg-card p-6 transition-all duration-300
        ${isCompleted ? 'border-primary/50 ' + difficultyGlow[module.difficulty] : 'border-border hover:border-primary/30'}
      `}
    >
      {/* Completion Badge */}
      {isCompleted && (
        <div className="absolute -top-2 -right-2">
          <div className="bg-primary text-primary-foreground rounded-full p-1 animate-glow-pulse">
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>
      )}

      {/* Icon */}
      <div className="text-4xl mb-4">{module.icon}</div>

      {/* Title */}
      <h3 className="font-display font-bold text-xl mb-2 text-foreground">
        {module.title}
      </h3>

      {/* Description */}
      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
        {module.description}
      </p>

      {/* Meta Info */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`px-2 py-1 rounded-full border text-xs font-mono uppercase ${difficultyColors[module.difficulty]}`}>
          {module.difficulty}
        </span>
        <span className="px-2 py-1 rounded-full border border-muted-foreground/30 text-xs text-muted-foreground flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {module.estimatedTime}
        </span>
      </div>

      {/* Topics */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {module.topics.slice(0, 3).map((topic, i) => (
          <span 
            key={i}
            className="px-2 py-0.5 bg-muted rounded text-xs text-muted-foreground"
          >
            {topic}
          </span>
        ))}
        {module.topics.length > 3 && (
          <span className="px-2 py-0.5 text-xs text-muted-foreground">
            +{module.topics.length - 3} more
          </span>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mt-auto">
        {moduleProgress && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-primary">
                {moduleProgress.quizScore > 0 
                  ? `${Math.round((moduleProgress.quizScore / module.questions.length) * 100)}%` 
                  : '0%'}
              </span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-primary to-secondary"
                initial={{ width: 0 }}
                animate={{ 
                  width: `${(moduleProgress.quizScore / module.questions.length) * 100}%` 
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Terminal Badge */}
      {module.terminalChallenge && (
        <div className="absolute bottom-4 right-4">
          <Zap className={`w-5 h-5 ${moduleProgress?.terminalCompleted ? 'text-primary' : 'text-muted-foreground'}`} />
        </div>
      )}
    </motion.div>
  );
};

export default ModuleCard;
