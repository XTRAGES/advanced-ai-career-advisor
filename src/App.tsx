import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  FileText, 
  Briefcase, 
  CheckCircle, 
  Download, 
  Sparkles, 
  Target, 
  MessageSquare, 
  TrendingUp,
  User,
  Building,
  Clock,
  Star,
  Brain,
  Shield,
  BarChart3,
  Zap,
  Award,
  Upload,
  Hash,
  Edit3
} from 'lucide-react';
import { RealDataAnalyzer } from './utils/realDataAnalyzer';
import { PDFExporter } from './utils/pdfExporter';
import { CareerAnalysisResult } from './types/analysis';
import { AnalysisResults } from './components/AnalysisResults';
import { FileUpload } from './components/FileUpload';
import { ATSScanner } from './components/ATSScanner';
import { KeywordOptimizer } from './components/KeywordOptimizer';
import { ResumeBuilder } from './components/ResumeBuilder';
import { LanguageSelector } from './components/LanguageSelector';
import { Footer } from './components/Footer';
import './i18n';

function App() {
  const { t, i18n } = useTranslation();
  const [currentStep, setCurrentStep] = useState<'input' | 'processing' | 'results'>('input');
  const [resumeText, setResumeText] = useState('');
  const [jobPostingText, setJobPostingText] = useState('');
  const [analysisResult, setAnalysisResult] = useState<CareerAnalysisResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [uploadedFiles, setUploadedFiles] = useState<{resume?: string, job?: string}>({});
  const resultsRef = useRef<HTMLDivElement>(null);

  const processingStages = [
    { text: t('analysis.stages.parsing', 'Parsing resume content and extracting key information...'), icon: FileText },
    { text: t('analysis.stages.analyzing', 'Analyzing job posting requirements and keywords...'), icon: Briefcase },
    { text: t('analysis.stages.matching', 'Performing advanced skills matching and gap analysis...'), icon: Target },
    { text: t('analysis.stages.generating', 'Generating personalized cover letter with optimization...'), icon: Brain },
    { text: t('analysis.stages.creating', 'Creating strategic interview questions and responses...'), icon: MessageSquare },
    { text: t('analysis.stages.calculating', 'Calculating ATS compatibility and keyword density scores...'), icon: Shield },
    { text: t('analysis.stages.developing', 'Developing comprehensive career action plan...'), icon: BarChart3 },
    { text: t('analysis.stages.finalizing', 'Finalizing professional analysis report...'), icon: Award }
  ];

  const resultTabs = [
    { id: 'overview', label: t('tabs.overview'), icon: TrendingUp },
    { id: 'ats', label: t('tabs.ats'), icon: Shield },
    { id: 'keywords', label: t('tabs.keywords'), icon: Hash },
    { id: 'builder', label: t('tabs.builder'), icon: Edit3 }
  ];

  const handleFileUpload = (content: string, fileName: string, fileType: string, uploadType: 'resume' | 'job') => {
    if (uploadType === 'resume') {
      setResumeText(content);
      setUploadedFiles(prev => ({ ...prev, resume: fileName }));
    } else {
      setJobPostingText(content);
      setUploadedFiles(prev => ({ ...prev, job: fileName }));
    }
  };

  const handleAnalyze = async () => {
    if (!resumeText.trim() || !jobPostingText.trim()) {
      return;
    }

    setIsProcessing(true);
    setCurrentStep('processing');
    setProcessingStage(0);

    // Simulate advanced processing with realistic timing
    for (let i = 0; i < processingStages.length; i++) {
      setProcessingStage(i);
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
    }

    // Perform actual advanced analysis with real data
    const result = RealDataAnalyzer.analyzeWithRealData(resumeText, jobPostingText);
    
    setAnalysisResult(result);
    setIsProcessing(false);
    setCurrentStep('results');
    
    // Scroll to results
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleReset = () => {
    setCurrentStep('input');
    setResumeText('');
    setJobPostingText('');
    setAnalysisResult(null);
    setIsProcessing(false);
    setProcessingStage(0);
    setUploadedFiles({});
    setActiveTab('overview');
  };

  const exportToPDF = async () => {
    if (!analysisResult) return;
    
    try {
      await PDFExporter.exportToPDF(analysisResult, i18n.language);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      // Fallback to text export
      exportToText();
    }
  };

  const exportToText = () => {
    if (!analysisResult) return;
    
    const content = `
${t('header.title').toUpperCase()} - ${t('analysis.completeSubtitle').toUpperCase()}
${'='.repeat(80)}

${t('analysis.executiveSummary', 'EXECUTIVE SUMMARY')}
${'-'.repeat(20)}
${t('scores.overallMatch')}: ${analysisResult.overallScore}%
${t('scores.atsCompatibility')}: ${analysisResult.atsCompatibilityScore}%
${t('scores.keywordDensity')}: ${analysisResult.keywordDensityScore}%
${t('scores.experienceMatch')}: ${analysisResult.experienceAlignmentScore}%
${t('scores.skillsAlignment')}: ${analysisResult.skillsMatchScore}%

${t('coverLetter.title').toUpperCase()}
${'-'.repeat(30)}
${analysisResult.coverLetter.content}

${t('resume.title').toUpperCase()}
${'-'.repeat(40)}
${analysisResult.resumeAnalysis.suggestions.map((suggestion, index) => 
  `${index + 1}. [${suggestion.priority.toUpperCase()}] ${suggestion.suggested}\n   ${t('common.reasoning', 'Reasoning')}: ${suggestion.reasoning}`
).join('\n')}

${t('interview.title').toUpperCase()}
${'-'.repeat(50)}
${analysisResult.interviewPreparation.questions.map((qa, index) => `
${t('common.question', 'Question')} ${index + 1} (${qa.type.toUpperCase()} - ${qa.difficulty.toUpperCase()} ${t('common.level', 'LEVEL')}):
${qa.question}

${t('common.strategicResponse', 'Strategic Response')}:
${qa.suggestedAnswer}

${t('common.keyPoints', 'Key Points')}: ${qa.keyPoints.join(', ')}
`).join('\n')}

${t('skills.title').toUpperCase()}
${'-'.repeat(30)}
${t('skills.matched')}: ${analysisResult.skillsAnalysis.matchedSkills.map(s => s.skill).join(', ')}
${t('skills.gaps')}: ${analysisResult.skillsAnalysis.skillGaps.map(s => s.skill).join(', ')}

${t('actionPlan.title').toUpperCase()}
${'-'.repeat(35)}
${t('actionPlan.immediate').toUpperCase()}:
${analysisResult.actionPlan.immediate.map((action, index) => 
  `${index + 1}. ${action.task} (${action.timeframe})`
).join('\n')}

${t('actionPlan.shortTerm').toUpperCase()}:
${analysisResult.actionPlan.shortTerm.map((action, index) => 
  `${index + 1}. ${action.task} (${action.timeframe})`
).join('\n')}

${t('actionPlan.longTerm').toUpperCase()}:
${analysisResult.actionPlan.longTerm.map((action, index) => 
  `${index + 1}. ${action.task} (${action.timeframe})`
).join('\n')}

${t('market.title').toUpperCase()}
${'-'.repeat(25)}
${t('market.trends')}: ${analysisResult.marketAnalysis.industryTrends.join(', ')}
${t('market.positioning')}: ${analysisResult.marketAnalysis.competitivePositioning}
${t('market.progression')}: ${analysisResult.marketAnalysis.careerProgression.join(' → ')}

---
${t('common.generatedBy', 'Generated by')} ${t('header.title')}
${t('header.subtitle')}
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `career-analysis-report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (currentStep === 'processing') {
    const currentStage = processingStages[processingStage];
    const StageIcon = currentStage.icon;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center p-12 bg-white rounded-3xl shadow-2xl border border-indigo-100 max-w-2xl mx-4"
        >
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Brain className="w-12 h-12 text-white" />
              </motion.div>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('analysis.processingTitle')}</h2>
          <p className="text-gray-600 mb-8 text-lg">{t('analysis.processingSubtitle')}</p>
          
          <div className="space-y-4 text-left max-w-lg mx-auto">
            {processingStages.map((stage, index) => {
              const StageIconComponent = stage.icon;
              const isCompleted = index < processingStage;
              const isCurrent = index === processingStage;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                    isCompleted ? 'bg-emerald-50 border border-emerald-200' :
                    isCurrent ? 'bg-indigo-50 border border-indigo-200' :
                    'bg-gray-50 border border-gray-200'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  ) : isCurrent ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <StageIconComponent className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                    </motion.div>
                  ) : (
                    <StageIconComponent className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                  <span className={`text-sm ${
                    isCompleted ? 'text-emerald-700' :
                    isCurrent ? 'text-indigo-700' :
                    'text-gray-500'
                  }`}>
                    {stage.text}
                  </span>
                </motion.div>
              );
            })}
          </div>
          
          <div className="mt-8">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${((processingStage + 1) / processingStages.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {Math.round(((processingStage + 1) / processingStages.length) * 100)}% {t('common.complete', 'Complete')}
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Advanced Header */}
      <header className="bg-white/90 backdrop-blur-lg border-b border-indigo-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {t('header.title')}
                </h1>
                <p className="text-gray-600 text-sm font-medium">{t('header.subtitle')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              {currentStep === 'results' && (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={exportToPDF}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-3 rounded-xl flex items-center space-x-2 transition-all transform hover:scale-105 shadow-lg"
                  >
                    <Download className="w-5 h-5" />
                    <span>{t('header.exportReport')}</span>
                  </button>
                  <button
                    onClick={handleReset}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl transition-colors shadow-lg"
                  >
                    {t('header.newAnalysis')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {currentStep === 'input' && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* Hero Section */}
              <div className="text-center mb-16">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl font-bold text-gray-900 mb-6"
                >
                  {t('hero.title')}
                  <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent block mt-2 leading-tight py-2">
                    {t('hero.subtitle')}
                  </span>
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
                >
                  {t('hero.description')}
                </motion.p>
                
                {/* Feature Highlights */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-wrap justify-center gap-6 mt-8"
                >
                  {[
                    { icon: Brain, text: t('hero.features.aiAnalysis') },
                    { icon: Shield, text: t('hero.features.atsOptimization') },
                    { icon: Target, text: t('hero.features.strategicPlanning') },
                    { icon: BarChart3, text: t('hero.features.marketIntelligence') }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md border border-gray-200">
                      <feature.icon className="w-5 h-5 text-indigo-600" />
                      <span className="text-sm font-medium text-gray-700">{feature.text}</span>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* File Upload Section */}
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Resume Upload */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <FileUpload
                    onFileUpload={(content, fileName, fileType) => handleFileUpload(content, fileName, fileType, 'resume')}
                    acceptedTypes={['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']}
                    maxSize={10 * 1024 * 1024} // 10MB
                    title={t('upload.resumeTitle')}
                    description={t('upload.resumeDescription')}
                    icon={User}
                    color="from-indigo-500 to-blue-500"
                  />
                </motion.div>

                {/* Job Posting Upload */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <FileUpload
                    onFileUpload={(content, fileName, fileType) => handleFileUpload(content, fileName, fileType, 'job')}
                    acceptedTypes={['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']}
                    maxSize={10 * 1024 * 1024} // 10MB
                    title={t('upload.jobTitle')}
                    description={t('upload.jobDescription')}
                    icon={Building}
                    color="from-purple-500 to-pink-500"
                  />
                </motion.div>
              </div>

              {/* Text Input Fallback */}
              <div className="text-center">
                <p className="text-gray-600 mb-4">{t('upload.orPasteDirectly', 'Or paste your content directly:')}</p>
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('upload.resumeText', 'Resume Text')}</h3>
                    <textarea
                      value={resumeText}
                      onChange={(e) => setResumeText(e.target.value)}
                      placeholder={t('upload.resumePlaceholder', 'Paste your resume content here...')}
                      className="w-full h-48 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-sm"
                    />
                  </div>
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('upload.jobText', 'Job Posting Text')}</h3>
                    <textarea
                      value={jobPostingText}
                      onChange={(e) => setJobPostingText(e.target.value)}
                      placeholder={t('upload.jobPlaceholder', 'Paste the job posting here...')}
                      className="w-full h-48 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="text-center"
              >
                <button
                  onClick={handleAnalyze}
                  disabled={!resumeText.trim() || !jobPostingText.trim()}
                  className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-12 py-5 rounded-2xl text-xl font-bold flex items-center space-x-4 mx-auto transition-all transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-2xl"
                >
                  <Brain className="w-7 h-7" />
                  <span>{t('analysis.launchButton')}</span>
                  <Sparkles className="w-7 h-7" />
                </button>
                {(!resumeText.trim() || !jobPostingText.trim()) && (
                  <p className="text-gray-500 mt-4 text-lg">{t('analysis.provideFiles')}</p>
                )}
              </motion.div>
            </motion.div>
          )}

          {currentStep === 'results' && analysisResult && (
            <motion.div
              key="results"
              ref={resultsRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Results Header */}
              <div className="bg-gradient-to-r from-emerald-50 via-blue-50 to-purple-50 rounded-3xl p-8 border border-emerald-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center">
                      <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h2 className="text-4xl font-bold text-gray-900 mb-2">{t('analysis.complete')}</h2>
                      <p className="text-gray-600 text-xl">{t('analysis.completeSubtitle')}</p>
                      <div className="flex items-center space-x-4 mt-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                          <span className="text-sm font-medium text-gray-700">
                            {t('analysis.overallScore', { score: analysisResult.overallScore })}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span className="text-sm font-medium text-gray-700">
                            {t('analysis.atsCompatible', { score: analysisResult.atsCompatibilityScore })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Navigation */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-2">
                <div className="flex space-x-2 overflow-x-auto">
                  {resultTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'bg-indigo-600 text-white shadow-lg'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Results Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === 'overview' && (
                    <AnalysisResults 
                      result={analysisResult} 
                      onExport={exportToPDF}
                      onReset={handleReset}
                    />
                  )}
                  {activeTab === 'ats' && <ATSScanner result={analysisResult} />}
                  {activeTab === 'keywords' && <KeywordOptimizer result={analysisResult} />}
                  {activeTab === 'builder' && <ResumeBuilder result={analysisResult} />}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;