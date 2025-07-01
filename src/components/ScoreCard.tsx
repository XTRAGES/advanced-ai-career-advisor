import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Target, Shield, Hash, Users, TrendingUp, Award } from 'lucide-react';
import { CareerAnalysisResult } from '../types/analysis';

interface ScoreCardProps {
  result: CareerAnalysisResult;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ result }) => {
  const { t } = useTranslation();
  
  const scores = [
    {
      label: t('scores.overallMatch'),
      value: result.overallScore,
      icon: Target,
      color: 'emerald',
      description: t('scores.comprehensiveCompatibility')
    },
    {
      label: t('scores.atsCompatibility'),
      value: result.atsCompatibilityScore,
      icon: Shield,
      color: 'blue',
      description: t('scores.atsOptimization')
    },
    {
      label: t('scores.keywordDensity'),
      value: result.keywordDensityScore,
      icon: Hash,
      color: 'purple',
      description: t('scores.keywordAlignment')
    },
    {
      label: t('scores.experienceMatch'),
      value: result.experienceAlignmentScore,
      icon: Award,
      color: 'orange',
      description: t('scores.experienceAlignment')
    },
    {
      label: t('scores.skillsAlignment'),
      value: result.skillsMatchScore,
      icon: TrendingUp,
      color: 'pink',
      description: t('scores.skillsMatch')
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'from-emerald-500 to-green-500';
    if (score >= 60) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">{t('results.performanceAnalytics')}</h3>
            <p className="text-gray-300">{t('results.comprehensiveScoring')}</p>
          </div>
        </div>
      </div>
      
      <div className="p-8">
        <div className="grid md:grid-cols-5 gap-6">
          {scores.map((score, index) => (
            <motion.div
              key={score.label}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 bg-${score.color}-100 rounded-xl flex items-center justify-center`}>
                    <score.icon className={`w-5 h-5 text-${score.color}-600`} />
                  </div>
                  <div className={`text-2xl font-bold ${getScoreColor(score.value)}`}>
                    {score.value}%
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-900">{score.label}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full bg-gradient-to-r ${getScoreBackground(score.value)}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${score.value}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </div>
                
                <p className="text-xs text-gray-600 leading-tight">{score.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Overall Assessment */}
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
          <div className="flex items-center space-x-3 mb-3">
            <Users className="w-6 h-6 text-blue-600" />
            <h4 className="text-lg font-bold text-gray-900">{t('results.professionalAssessment')}</h4>
          </div>
          <p className="text-gray-700 leading-relaxed">
            {result.overallScore >= 80 
              ? t('results.excellentMatch')
              : result.overallScore >= 60
              ? t('results.goodMatch')
              : t('results.moderateMatch')
            }
          </p>
        </div>
      </div>
    </div>
  );
};