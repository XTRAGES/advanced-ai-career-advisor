import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Hash, TrendingUp, Target, CheckCircle, Plus, Minus, Search, Filter } from 'lucide-react';
import { CareerAnalysisResult } from '../types/analysis';

interface KeywordOptimizerProps {
  result: CareerAnalysisResult;
}

export const KeywordOptimizer: React.FC<KeywordOptimizerProps> = ({ result }) => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock keyword data - in real implementation, this would come from analysis
  const keywordData = [
    { keyword: 'JavaScript', frequency: 8, importance: 'critical', category: 'technical', inResume: true, density: 2.1 },
    { keyword: 'React', frequency: 6, importance: 'critical', category: 'technical', inResume: true, density: 1.8 },
    { keyword: 'Node.js', frequency: 4, importance: 'high', category: 'technical', inResume: false, density: 0 },
    { keyword: 'TypeScript', frequency: 3, importance: 'high', category: 'technical', inResume: false, density: 0 },
    { keyword: 'Leadership', frequency: 5, importance: 'high', category: 'soft-skills', inResume: true, density: 1.2 },
    { keyword: 'Project Management', frequency: 4, importance: 'medium', category: 'soft-skills', inResume: true, density: 0.9 },
    { keyword: 'Agile', frequency: 7, importance: 'high', category: 'methodology', inResume: false, density: 0 },
    { keyword: 'Scrum', frequency: 3, importance: 'medium', category: 'methodology', inResume: false, density: 0 },
    { keyword: 'AWS', frequency: 5, importance: 'high', category: 'technical', inResume: false, density: 0 },
    { keyword: 'Docker', frequency: 2, importance: 'medium', category: 'technical', inResume: false, density: 0 }
  ];

  const categories = [
    { id: 'all', label: t('keywords.allKeywords'), count: keywordData.length },
    { id: 'technical', label: t('keywords.technicalSkills'), count: keywordData.filter(k => k.category === 'technical').length },
    { id: 'soft-skills', label: t('keywords.softSkills'), count: keywordData.filter(k => k.category === 'soft-skills').length },
    { id: 'methodology', label: t('keywords.methodologies'), count: keywordData.filter(k => k.category === 'methodology').length }
  ];

  const filteredKeywords = keywordData.filter(keyword => {
    const matchesCategory = selectedCategory === 'all' || keyword.category === selectedCategory;
    const matchesSearch = keyword.keyword.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technical': return 'bg-blue-100 text-blue-700';
      case 'soft-skills': return 'bg-purple-100 text-purple-700';
      case 'methodology': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const totalKeywords = keywordData.length;
  const matchedKeywords = keywordData.filter(k => k.inResume).length;
  const missingKeywords = keywordData.filter(k => !k.inResume).length;
  const averageDensity = keywordData.reduce((sum, k) => sum + k.density, 0) / totalKeywords;

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-purple-100 overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Hash className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">{t('keywords.title')}</h3>
            <p className="text-purple-100">{t('keywords.subtitle')}</p>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Keyword Overview */}
        <div className="mb-8">
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <div className="flex items-center space-x-3">
                <Target className="w-8 h-8 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold text-blue-700">{totalKeywords}</div>
                  <div className="text-blue-600 font-medium">{t('keywords.totalKeywords')}</div>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-xl border border-green-200">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div>
                  <div className="text-2xl font-bold text-green-700">{matchedKeywords}</div>
                  <div className="text-green-600 font-medium">{t('keywords.matched')}</div>
                </div>
              </div>
            </div>
            
            <div className="bg-red-50 p-4 rounded-xl border border-red-200">
              <div className="flex items-center space-x-3">
                <Minus className="w-8 h-8 text-red-600" />
                <div>
                  <div className="text-2xl font-bold text-red-700">{missingKeywords}</div>
                  <div className="text-red-600 font-medium">{t('keywords.missing')}</div>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-8 h-8 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold text-purple-700">{averageDensity.toFixed(1)}%</div>
                  <div className="text-purple-600 font-medium">{t('keywords.avgDensity')}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" 
              style={{ width: `${(matchedKeywords / totalKeywords) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 text-center">
            {Math.round((matchedKeywords / totalKeywords) * 100)}% {t('keywords.keywordCoverage')}
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.label} ({category.count})
                </button>
              ))}
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={t('keywords.searchKeywords')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Keywords List */}
        <div className="space-y-3">
          {filteredKeywords.map((keyword, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-4 rounded-xl border transition-all hover:shadow-md ${
                keyword.inResume ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {keyword.inResume ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <Plus className="w-5 h-5 text-red-500" />
                    )}
                    <h5 className="font-semibold text-gray-900">{keyword.keyword}</h5>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium border ${getImportanceColor(keyword.importance)}`}>
                      {t(`common.${keyword.importance}`)}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getCategoryColor(keyword.category)}`}>
                      {keyword.category.replace('-', ' ')}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">{keyword.frequency}</div>
                    <div className="text-gray-500">Job Freq.</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">{keyword.density}%</div>
                    <div className="text-gray-500">Resume Density</div>
                  </div>
                </div>
              </div>
              
              {!keyword.inResume && (
                <div className="mt-3 p-3 bg-white rounded-lg border border-red-100">
                  <p className="text-sm text-red-700 font-medium mb-1">{t('keywords.recommendation')}</p>
                  <p className="text-sm text-gray-600">
                    {t('keywords.addKeyword', { 
                      keyword: keyword.keyword, 
                      frequency: keyword.frequency, 
                      importance: t(`common.${keyword.importance}`)
                    })}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Optimization Tips */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
          <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Filter className="w-5 h-5 text-purple-600 mr-2" />
            {t('keywords.optimizationTips')}
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h5 className="font-semibold text-gray-800">{t('keywords.highPriorityActions')}</h5>
              <ul className="space-y-1">
                <li className="text-sm text-gray-600 flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  Add missing critical keywords: Node.js, TypeScript
                </li>
                <li className="text-sm text-gray-600 flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                  Include Agile methodology experience
                </li>
                <li className="text-sm text-gray-600 flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                  Mention AWS cloud experience if applicable
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h5 className="font-semibold text-gray-800">{t('keywords.optimizationStrategies')}</h5>
              <ul className="space-y-1">
                <li className="text-sm text-gray-600 flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  {t('keywords.useExactPhrases')}
                </li>
                <li className="text-sm text-gray-600 flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  {t('keywords.includeMultipleSections')}
                </li>
                <li className="text-sm text-gray-600 flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  {t('keywords.maintainNaturalFlow')}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};