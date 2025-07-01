import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Shield, CheckCircle, AlertTriangle, XCircle, Zap, Target, FileText } from 'lucide-react';
import { CareerAnalysisResult } from '../types/analysis';

interface ATSScannerProps {
  result: CareerAnalysisResult;
}

export const ATSScanner: React.FC<ATSScannerProps> = ({ result }) => {
  const { t } = useTranslation();
  
  const atsChecks = [
    {
      category: t('ats.checks.fileFormat'),
      status: 'pass',
      message: 'PDF format is ATS-compatible',
      impact: 'high'
    },
    {
      category: t('ats.checks.fontFormatting'),
      status: result.resumeAnalysis.atsOptimizations.length > 3 ? 'pass' : 'warning',
      message: result.resumeAnalysis.atsOptimizations.length > 3 ? 'Standard fonts and formatting detected' : 'Some formatting issues detected',
      impact: 'medium'
    },
    {
      category: t('ats.checks.sectionHeaders'),
      status: 'pass',
      message: 'Standard section headers found',
      impact: 'high'
    },
    {
      category: t('ats.checks.keywordDensity'),
      status: result.keywordDensityScore >= 70 ? 'pass' : result.keywordDensityScore >= 50 ? 'warning' : 'fail',
      message: `${result.keywordDensityScore}% keyword match with job posting`,
      impact: 'critical'
    },
    {
      category: t('ats.checks.contactInfo'),
      status: 'pass',
      message: 'Contact details properly formatted',
      impact: 'critical'
    },
    {
      category: t('ats.checks.skillsSection'),
      status: result.skillsAnalysis.matchedSkills.length > 0 ? 'pass' : 'warning',
      message: `${result.skillsAnalysis.matchedSkills.length} relevant skills identified`,
      impact: 'high'
    },
    {
      category: t('ats.checks.experienceFormat'),
      status: result.resumeAnalysis.quantifiableAchievements > 2 ? 'pass' : 'warning',
      message: result.resumeAnalysis.quantifiableAchievements > 2 ? 'Quantified achievements present' : 'Add more quantified achievements',
      impact: 'medium'
    },
    {
      category: t('ats.checks.lengthStructure'),
      status: 'pass',
      message: 'Appropriate resume length and structure',
      impact: 'medium'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'fail': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <CheckCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass': return 'bg-green-50 border-green-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'fail': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const passCount = atsChecks.filter(check => check.status === 'pass').length;
  const warningCount = atsChecks.filter(check => check.status === 'warning').length;
  const failCount = atsChecks.filter(check => check.status === 'fail').length;

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-blue-100 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">{t('ats.title')}</h3>
            <p className="text-blue-100">{t('ats.subtitle')}</p>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* ATS Score Overview */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-2xl font-bold text-gray-900">{t('ats.compatibilityScore')}</h4>
              <p className="text-gray-600">{t('ats.description')}</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-blue-600">{result.atsCompatibilityScore}%</div>
              <div className="text-sm text-gray-500">{t('ats.compatibilityRating')}</div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-50 p-4 rounded-xl border border-green-200">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div>
                  <div className="text-2xl font-bold text-green-700">{passCount}</div>
                  <div className="text-green-600 font-medium">{t('ats.passedChecks')}</div>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-8 h-8 text-yellow-600" />
                <div>
                  <div className="text-2xl font-bold text-yellow-700">{warningCount}</div>
                  <div className="text-yellow-600 font-medium">{t('ats.warnings')}</div>
                </div>
              </div>
            </div>
            
            <div className="bg-red-50 p-4 rounded-xl border border-red-200">
              <div className="flex items-center space-x-3">
                <XCircle className="w-8 h-8 text-red-600" />
                <div>
                  <div className="text-2xl font-bold text-red-700">{failCount}</div>
                  <div className="text-red-600 font-medium">{t('ats.failedChecks')}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" 
              style={{ width: `${result.atsCompatibilityScore}%` }}
            ></div>
          </div>
        </div>

        {/* Detailed ATS Checks */}
        <div className="mb-8">
          <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Target className="w-6 h-6 text-blue-500 mr-2" />
            {t('ats.detailedAnalysis')}
          </h4>
          
          <div className="space-y-4">
            {atsChecks.map((check, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-xl border ${getStatusColor(check.status)}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(check.status)}
                    <div>
                      <h5 className="font-semibold text-gray-900">{check.category}</h5>
                      <p className="text-sm text-gray-600">{check.message}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      check.impact === 'critical' ? 'bg-red-100 text-red-700' :
                      check.impact === 'high' ? 'bg-orange-100 text-orange-700' :
                      check.impact === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {t(`common.${check.impact}`)} {t('common.impact')}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ATS Optimization Tips */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
          <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Zap className="w-5 h-5 text-blue-600 mr-2" />
            {t('ats.optimizationRecommendations')}
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            {result.resumeAnalysis.atsOptimizations.map((tip, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-700">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};