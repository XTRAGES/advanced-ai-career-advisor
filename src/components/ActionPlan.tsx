import React from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, Clock, AlertCircle, Target, Calendar, ArrowRight } from 'lucide-react';
import { CareerAnalysisResult } from '../types/analysis';

interface ActionPlanProps {
  result: CareerAnalysisResult;
}

export const ActionPlan: React.FC<ActionPlanProps> = ({ result }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'critical': return AlertCircle;
      case 'high': return Target;
      case 'medium': return Clock;
      case 'low': return CheckSquare;
      default: return CheckSquare;
    }
  };

  const ActionSection = ({ title, items, icon: Icon, color, delay }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
    >
      <div className={`bg-gradient-to-r ${color} p-4`}>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-white">{title}</h4>
            <p className="text-white/80 text-sm">{items.length} action items</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {items.map((item: any, index: number) => {
            const PriorityIcon = getPriorityIcon(item.priority);
            return (
              <div key={index} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <PriorityIcon className="w-4 h-4 text-gray-600" />
                      <span className={`text-xs px-2 py-1 rounded-full font-medium border ${getPriorityColor(item.priority)}`}>
                        {item.priority} priority
                      </span>
                      <span className="text-xs text-gray-500 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {item.timeframe}
                      </span>
                    </div>
                    <h5 className="font-semibold text-gray-900 mb-2">{item.task}</h5>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="text-sm font-medium text-gray-700 mb-2">Required Resources</h6>
                    <div className="space-y-1">
                      {item.resources.map((resource: string, resourceIndex: number) => (
                        <div key={resourceIndex} className="text-xs text-gray-600 flex items-center">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mr-2"></div>
                          {resource}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h6 className="text-sm font-medium text-gray-700 mb-2">Success Metrics</h6>
                    <div className="space-y-1">
                      {item.successMetrics.map((metric: string, metricIndex: number) => (
                        <div key={metricIndex} className="text-xs text-gray-600 flex items-center">
                          <CheckSquare className="w-3 h-3 mr-2 text-green-500" />
                          {metric}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-indigo-100 overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Strategic Career Action Plan</h3>
            <p className="text-indigo-100">Prioritized roadmap for career advancement success</p>
          </div>
        </div>
      </div>
      
      <div className="p-8">
        {/* Action Plan Overview */}
        <div className="mb-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200">
          <div className="flex items-center space-x-3 mb-4">
            <Target className="w-6 h-6 text-indigo-600" />
            <h4 className="text-lg font-bold text-gray-900">Executive Summary</h4>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            Your personalized action plan is designed to maximize your competitive advantage and accelerate your career progression. 
            Each phase builds upon the previous one, creating a comprehensive strategy for professional success.
          </p>
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-700">{result.actionPlan.immediate.length} Immediate Actions</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-gray-700">{result.actionPlan.shortTerm.length} Short-term Goals</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-gray-700">{result.actionPlan.longTerm.length} Long-term Objectives</span>
            </div>
          </div>
        </div>

        {/* Action Plan Phases */}
        <div className="space-y-8">
          <ActionSection
            title="Immediate Actions (Next 1-2 Weeks)"
            items={result.actionPlan.immediate}
            icon={AlertCircle}
            color="from-red-500 to-pink-500"
            delay={0}
          />
          
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2 text-gray-500">
              <ArrowRight className="w-5 h-5" />
              <span className="text-sm font-medium">Then proceed to</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
          
          <ActionSection
            title="Short-term Goals (Next 1-3 Months)"
            items={result.actionPlan.shortTerm}
            icon={Clock}
            color="from-orange-500 to-yellow-500"
            delay={0.2}
          />
          
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2 text-gray-500">
              <ArrowRight className="w-5 h-5" />
              <span className="text-sm font-medium">Finally achieve</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
          
          <ActionSection
            title="Long-term Objectives (Next 3-12 Months)"
            items={result.actionPlan.longTerm}
            icon={Target}
            color="from-blue-500 to-indigo-500"
            delay={0.4}
          />
        </div>

        {/* Success Timeline */}
        <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl border border-emerald-200">
          <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Calendar className="w-5 h-5 text-emerald-600 mr-2" />
            Success Timeline & Milestones
          </h4>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-xl border border-emerald-200">
              <div className="text-2xl font-bold text-emerald-600 mb-1">Week 1-2</div>
              <div className="text-sm text-gray-600">Application Optimization</div>
              <div className="text-xs text-gray-500 mt-1">Resume & Cover Letter Ready</div>
            </div>
            <div className="text-center p-4 bg-white rounded-xl border border-blue-200">
              <div className="text-2xl font-bold text-blue-600 mb-1">Month 1-3</div>
              <div className="text-sm text-gray-600">Interview Mastery</div>
              <div className="text-xs text-gray-500 mt-1">Confident & Well-Prepared</div>
            </div>
            <div className="text-center p-4 bg-white rounded-xl border border-purple-200">
              <div className="text-2xl font-bold text-purple-600 mb-1">Month 3-12</div>
              <div className="text-sm text-gray-600">Career Advancement</div>
              <div className="text-xs text-gray-500 mt-1">Skills & Position Enhanced</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};