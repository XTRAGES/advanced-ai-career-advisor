import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, ChevronDown, ChevronUp, DollarSign, Building, Lightbulb } from 'lucide-react';
import { CareerAnalysisResult } from '../types/analysis';

interface InterviewPrepProps {
  result: CareerAnalysisResult;
}

export const InterviewPrep: React.FC<InterviewPrepProps> = ({ result }) => {
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setExpandedQuestion(expandedQuestion === index ? null : index);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'entry': return 'bg-green-100 text-green-700';
      case 'mid': return 'bg-yellow-100 text-yellow-700';
      case 'senior': return 'bg-orange-100 text-orange-700';
      case 'executive': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'behavioral': return 'bg-blue-100 text-blue-700';
      case 'technical': return 'bg-purple-100 text-purple-700';
      case 'situational': return 'bg-emerald-100 text-emerald-700';
      case 'cultural-fit': return 'bg-pink-100 text-pink-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-purple-100 overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Executive Interview Preparation Suite</h3>
            <p className="text-purple-100">Comprehensive interview strategy and preparation materials</p>
          </div>
        </div>
      </div>
      
      <div className="p-8">
        {/* Interview Questions */}
        <div className="mb-8">
          <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <MessageSquare className="w-6 h-6 text-purple-500 mr-2" />
            Strategic Interview Questions & Expert Responses
          </h4>
          <div className="space-y-4">
            {result.interviewPreparation.questions.map((qa, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-purple-200 rounded-xl overflow-hidden bg-gradient-to-r from-white to-purple-50"
              >
                <div 
                  className="p-4 cursor-pointer hover:bg-purple-50 transition-colors"
                  onClick={() => toggleQuestion(index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-sm font-bold text-purple-600">Q{index + 1}</span>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getTypeColor(qa.type)}`}>
                          {qa.type.replace('-', ' ')}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(qa.difficulty)}`}>
                          {qa.difficulty} level
                        </span>
                      </div>
                      <h5 className="font-semibold text-gray-900 text-sm leading-relaxed">{qa.question}</h5>
                    </div>
                    <div className="ml-4">
                      {expandedQuestion === index ? (
                        <ChevronUp className="w-5 h-5 text-purple-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-purple-500" />
                      )}
                    </div>
                  </div>
                </div>
                
                <AnimatePresence>
                  {expandedQuestion === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-purple-200 bg-white"
                    >
                      <div className="p-4">
                        <div className="mb-4">
                          <h6 className="text-sm font-semibold text-gray-700 mb-2">Recommended Response Strategy</h6>
                          <p className="text-gray-700 leading-relaxed text-sm">{qa.suggestedAnswer}</p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h6 className="text-sm font-semibold text-gray-700 mb-2">Key Points to Emphasize</h6>
                            <div className="space-y-1">
                              {qa.keyPoints.map((point, pointIndex) => (
                                <div key={pointIndex} className="text-xs text-gray-600 flex items-center">
                                  <div className="w-1 h-1 bg-purple-500 rounded-full mr-2"></div>
                                  {point}
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h6 className="text-sm font-semibold text-gray-700 mb-2">Potential Follow-ups</h6>
                            <div className="space-y-1">
                              {qa.followUpQuestions.map((followUp, followUpIndex) => (
                                <div key={followUpIndex} className="text-xs text-gray-600 flex items-start">
                                  <div className="w-1 h-1 bg-indigo-500 rounded-full mr-2 mt-1.5"></div>
                                  {followUp}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Company Research */}
        <div className="mb-8">
          <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Building className="w-6 h-6 text-indigo-500 mr-2" />
            Strategic Company Intelligence
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            {result.interviewPreparation.companyResearch.map((insight, index) => (
              <div key={index} className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-indigo-700 uppercase tracking-wide">
                    {insight.category.replace('-', ' ')}
                  </span>
                  <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full">
                    {insight.relevanceToRole}% relevant
                  </span>
                </div>
                <p className="text-gray-800 text-sm mb-2">{insight.insight}</p>
                <p className="text-xs text-gray-600">Source: {insight.source}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Salary Insights */}
        <div className="mb-8">
          <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <DollarSign className="w-6 h-6 text-emerald-500 mr-2" />
            Compensation Intelligence & Negotiation Strategy
          </h4>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">
                  ${result.interviewPreparation.salaryInsights.range.min.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Minimum Range</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">
                  ${result.interviewPreparation.salaryInsights.range.median.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Market Median</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">
                  ${result.interviewPreparation.salaryInsights.range.max.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Maximum Range</div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Salary Factors</h5>
                <div className="space-y-2">
                  {result.interviewPreparation.salaryInsights.factors.map((factor, index) => (
                    <div key={index} className="text-sm text-gray-700 flex items-center">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                      {factor}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Negotiation Points</h5>
                <div className="space-y-2">
                  {result.interviewPreparation.salaryInsights.negotiationPoints.map((point, index) => (
                    <div key={index} className="text-sm text-gray-700 flex items-center">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-white rounded-lg border border-emerald-200">
              <p className="text-sm text-gray-700">
                <strong>Market Analysis:</strong> {result.interviewPreparation.salaryInsights.marketComparison}
              </p>
            </div>
          </div>
        </div>

        {/* Negotiation Tips */}
        <div>
          <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Lightbulb className="w-6 h-6 text-yellow-500 mr-2" />
            Professional Negotiation Strategies
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            {result.interviewPreparation.negotiationTips.map((tip, index) => (
              <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-gray-800 text-sm">{tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};