import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, BookOpen, Award, Clock, Zap } from 'lucide-react';
import { CareerAnalysisResult } from '../types/analysis';

interface SkillsMatrixProps {
  result: CareerAnalysisResult;
}

export const SkillsMatrix: React.FC<SkillsMatrixProps> = ({ result }) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl border border-emerald-100 overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Advanced Skills Analysis Matrix</h3>
            <p className="text-emerald-100">Comprehensive skill mapping and development roadmap</p>
          </div>
        </div>
      </div>
      
      <div className="p-8">
        {/* Skills Match Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-200">
            <div className="flex items-center space-x-3 mb-3">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
              <div>
                <div className="text-2xl font-bold text-emerald-700">{result.skillsAnalysis.matchedSkills.length}</div>
                <div className="text-emerald-600 font-medium">Skills Matched</div>
              </div>
            </div>
            <p className="text-emerald-700 text-sm">Strong alignment with job requirements</p>
          </div>
          
          <div className="bg-orange-50 p-6 rounded-2xl border border-orange-200">
            <div className="flex items-center space-x-3 mb-3">
              <AlertCircle className="w-8 h-8 text-orange-600" />
              <div>
                <div className="text-2xl font-bold text-orange-700">{result.skillsAnalysis.skillGaps.length}</div>
                <div className="text-orange-600 font-medium">Skill Gaps</div>
              </div>
            </div>
            <p className="text-orange-700 text-sm">Areas for strategic development</p>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
            <div className="flex items-center space-x-3 mb-3">
              <Award className="w-8 h-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-700">{result.skillsAnalysis.recommendedCertifications.length}</div>
                <div className="text-blue-600 font-medium">Certifications</div>
              </div>
            </div>
            <p className="text-blue-700 text-sm">Recommended professional credentials</p>
          </div>
        </div>

        {/* Matched Skills */}
        <div className="mb-8">
          <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <CheckCircle className="w-6 h-6 text-emerald-500 mr-2" />
            Skills Portfolio Analysis
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            {result.skillsAnalysis.matchedSkills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-emerald-50 border border-emerald-200 rounded-xl p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h5 className="font-bold text-gray-900">{skill.skill}</h5>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        skill.jobRequirement === 'required' ? 'bg-red-100 text-red-700' :
                        skill.jobRequirement === 'preferred' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {skill.jobRequirement}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        skill.candidateLevel === 'expert' ? 'bg-purple-100 text-purple-700' :
                        skill.candidateLevel === 'proficient' ? 'bg-blue-100 text-blue-700' :
                        skill.candidateLevel === 'familiar' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {skill.candidateLevel}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-emerald-600">{skill.matchStrength}%</div>
                    <div className="text-xs text-gray-500">match</div>
                  </div>
                </div>
                <div className="space-y-1">
                  {skill.evidenceFromResume.map((evidence, evidenceIndex) => (
                    <div key={evidenceIndex} className="text-xs text-gray-600 flex items-center">
                      <div className="w-1 h-1 bg-emerald-500 rounded-full mr-2"></div>
                      {evidence}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skill Gaps */}
        <div className="mb-8">
          <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <AlertCircle className="w-6 h-6 text-orange-500 mr-2" />
            Strategic Skill Development Plan
          </h4>
          <div className="space-y-4">
            {result.skillsAnalysis.skillGaps.map((gap, index) => (
              <motion.div
                key={index}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-orange-50 border border-orange-200 rounded-xl p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h5 className="font-bold text-gray-900">{gap.skill}</h5>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        gap.importance === 'critical' ? 'bg-red-100 text-red-700' :
                        gap.importance === 'important' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {gap.importance}
                      </span>
                      <span className="text-xs text-gray-600 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {gap.timeToAcquire}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mt-3">
                  <div>
                    <h6 className="text-sm font-semibold text-gray-700 mb-2">Learning Resources</h6>
                    <div className="space-y-1">
                      {gap.learningResources.map((resource, resourceIndex) => (
                        <div key={resourceIndex} className="text-xs text-gray-600 flex items-center">
                          <BookOpen className="w-3 h-3 mr-2 text-orange-500" />
                          {resource}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h6 className="text-sm font-semibold text-gray-700 mb-2">Alternative Skills</h6>
                    <div className="flex flex-wrap gap-1">
                      {gap.alternativeSkills.map((alt, altIndex) => (
                        <span key={altIndex} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {alt}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Learning Path */}
        <div>
          <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <BookOpen className="w-6 h-6 text-blue-500 mr-2" />
            Personalized Learning Roadmap
          </h4>
          <div className="space-y-4">
            {result.skillsAnalysis.learningPath.map((path, index) => (
              <div key={index} className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-bold text-gray-900">{path.skill}</h5>
                  <span className="text-sm text-blue-600 font-medium">{path.timeline}</span>
                </div>
                <div className="flex items-center space-x-4 mb-3">
                  <div className="text-sm">
                    <span className="text-gray-600">Current: </span>
                    <span className="font-medium text-gray-800">{path.currentLevel}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Target: </span>
                    <span className="font-medium text-gray-800">{path.targetLevel}</span>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  {path.resources.map((resource, resourceIndex) => (
                    <div key={resourceIndex} className="bg-white p-3 rounded-lg border border-blue-100">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">{resource.name}</span>
                        <span className="text-xs text-blue-600">{resource.type}</span>
                      </div>
                      <div className="text-xs text-gray-600">
                        {resource.provider} • {resource.duration} • {resource.cost}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};