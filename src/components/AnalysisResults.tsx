import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  Target, 
  Brain,
  Award,
  BookOpen,
  DollarSign,
  Users,
  Lightbulb,
  Clock,
  Star,
  ArrowRight,
  BarChart3,
  Shield,
  Zap
} from 'lucide-react';
import { CareerAnalysisResult } from '../types/analysis';
import { ScoreCard } from './ScoreCard';
import { SkillsMatrix } from './SkillsMatrix';
import { InterviewPrep } from './InterviewPrep';
import { ActionPlan } from './ActionPlan';

interface AnalysisResultsProps {
  result: CareerAnalysisResult;
  onExport: () => void;
  onReset: () => void;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ result, onExport, onReset }) => {
  const { t } = useTranslation();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Success Header */}
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-emerald-50 via-blue-50 to-purple-50 rounded-3xl p-8 border border-emerald-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">{t('results.analysisComplete')}</h2>
              <p className="text-gray-600 text-xl">{t('results.reportGenerated')}</p>
              <div className="flex items-center space-x-4 mt-3">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">{t('analysis.overallScore', { score: result.overallScore })}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">{t('analysis.atsCompatible', { score: result.atsCompatibilityScore })}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onExport}
              className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl flex items-center space-x-2 transition-all transform hover:scale-105"
            >
              <Award className="w-5 h-5" />
              <span>{t('results.exportReport')}</span>
            </button>
            <button
              onClick={onReset}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl transition-colors"
            >
              {t('results.newAnalysis')}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Score Dashboard */}
      <motion.div variants={itemVariants}>
        <ScoreCard result={result} />
      </motion.div>

      {/* Cover Letter */}
      <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-xl border border-blue-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{t('coverLetter.title')}</h3>
              <p className="text-blue-100">{t('coverLetter.subtitle')}</p>
            </div>
          </div>
        </div>
        <div className="p-8">
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-blue-600">{result.coverLetter.wordCount}</div>
              <div className="text-sm text-gray-600">{t('coverLetter.words')}</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-purple-600">{result.coverLetter.tone}</div>
              <div className="text-sm text-gray-600">{t('coverLetter.tone')}</div>
            </div>
            <div className="bg-emerald-50 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-emerald-600">{result.coverLetter.keywordDensity}%</div>
              <div className="text-sm text-gray-600">{t('coverLetter.keywordMatch')}</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-orange-600">{t('coverLetter.quality')}</div>
              <div className="text-sm text-gray-600">{t('coverLetter.quality')}</div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border-l-4 border-blue-500">
            <pre className="whitespace-pre-wrap text-gray-800 leading-relaxed font-sans text-sm">
              {result.coverLetter.content}
            </pre>
          </div>
        </div>
      </motion.div>

      {/* Resume Analysis */}
      <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-xl border border-orange-100 overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{t('resume.title')}</h3>
              <p className="text-orange-100">{t('resume.subtitle')}</p>
            </div>
          </div>
        </div>
        <div className="p-8">
          {/* Strengths */}
          <div className="mb-8">
            <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Star className="w-6 h-6 text-emerald-500 mr-2" />
              {t('resume.strengths')}
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              {result.resumeAnalysis.strengths.map((strength, index) => (
                <div key={index} className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-sm font-semibold text-emerald-700 uppercase tracking-wide">
                      {strength.category}
                    </span>
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                      {strength.impact} {t('common.impact')}
                    </span>
                  </div>
                  <p className="text-gray-800 text-sm">{strength.description}</p>
                  <div className="mt-2 flex items-center">
                    <div className="flex-1 bg-emerald-200 rounded-full h-2">
                      <div 
                        className="bg-emerald-500 h-2 rounded-full" 
                        style={{ width: `${strength.relevanceScore}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-xs text-emerald-600 font-medium">
                      {strength.relevanceScore}% {t('common.relevance')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Improvement Suggestions */}
          <div className="mb-8">
            <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="w-6 h-6 text-orange-500 mr-2" />
              {t('resume.improvements')}
            </h4>
            <div className="space-y-4">
              {result.resumeAnalysis.suggestions.map((suggestion, index) => (
                <div key={index} className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-semibold text-orange-700 uppercase tracking-wide">
                          {suggestion.type} • {suggestion.section}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          suggestion.priority === 'high' ? 'bg-red-100 text-red-700' :
                          suggestion.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {t(`common.${suggestion.priority}`)} {t('common.priority')}
                        </span>
                      </div>
                      <p className="text-gray-800 font-medium mb-1">{suggestion.suggested}</p>
                      <p className="text-gray-600 text-sm">{suggestion.reasoning}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ATS Optimization */}
          <div>
            <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Shield className="w-6 h-6 text-blue-500 mr-2" />
              {t('resume.atsOptimization')}
            </h4>
            <div className="grid md:grid-cols-2 gap-3">
              {result.resumeAnalysis.atsOptimizations.map((optimization, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <span className="text-gray-800 text-sm">{optimization}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Skills Analysis */}
      <motion.div variants={itemVariants}>
        <SkillsMatrix result={result} />
      </motion.div>

      {/* Interview Preparation */}
      <motion.div variants={itemVariants}>
        <InterviewPrep result={result} />
      </motion.div>

      {/* Market Analysis */}
      <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-xl border border-purple-100 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{t('market.title')}</h3>
              <p className="text-purple-100">{t('market.subtitle')}</p>
            </div>
          </div>
        </div>
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 text-purple-600 mr-2" />
                {t('market.trends')}
              </h4>
              <div className="space-y-3">
                {result.marketAnalysis.industryTrends.map((trend, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-800 text-sm">{trend}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Target className="w-5 h-5 text-pink-600 mr-2" />
                {t('market.progression')}
              </h4>
              <div className="space-y-3">
                {result.marketAnalysis.careerProgression.map((step, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-pink-50 rounded-lg">
                    <div className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <span className="text-gray-800 text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
            <h4 className="text-lg font-bold text-gray-900 mb-3">{t('market.positioning')}</h4>
            <p className="text-gray-700">{result.marketAnalysis.competitivePositioning}</p>
          </div>
        </div>
      </motion.div>

      {/* Action Plan */}
      <motion.div variants={itemVariants}>
        <ActionPlan result={result} />
      </motion.div>
    </motion.div>
  );
};