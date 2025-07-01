import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Eye, Edit3, Save, Plus, Trash2, Copy } from 'lucide-react';
import { CareerAnalysisResult } from '../types/analysis';

interface ResumeBuilderProps {
  result: CareerAnalysisResult;
}

export const ResumeBuilder: React.FC<ResumeBuilderProps> = ({ result }) => {
  const [activeSection, setActiveSection] = useState('summary');
  const [isEditing, setIsEditing] = useState(false);

  const resumeSections = [
    { id: 'summary', label: 'Professional Summary', icon: FileText },
    { id: 'experience', label: 'Work Experience', icon: Edit3 },
    { id: 'skills', label: 'Technical Skills', icon: Plus },
    { id: 'education', label: 'Education', icon: FileText },
    { id: 'projects', label: 'Key Projects', icon: Edit3 },
    { id: 'certifications', label: 'Certifications', icon: FileText }
  ];

  const templates = [
    { id: 'modern', name: 'Modern Professional', preview: '/api/placeholder/200/250' },
    { id: 'classic', name: 'Classic Executive', preview: '/api/placeholder/200/250' },
    { id: 'creative', name: 'Creative Designer', preview: '/api/placeholder/200/250' },
    { id: 'technical', name: 'Technical Expert', preview: '/api/placeholder/200/250' }
  ];

  const [resumeData, setResumeData] = useState({
    summary: "Experienced software engineer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of delivering scalable solutions and leading cross-functional teams.",
    experience: [
      {
        title: "Senior Software Engineer",
        company: "Tech Corp",
        duration: "2021 - Present",
        achievements: [
          "Led development of microservices architecture serving 1M+ users",
          "Improved application performance by 40% through optimization",
          "Mentored 3 junior developers and established code review processes"
        ]
      }
    ],
    skills: {
      technical: ["JavaScript", "React", "Node.js", "Python", "AWS", "Docker"],
      soft: ["Leadership", "Problem Solving", "Communication", "Project Management"]
    },
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        school: "University of Technology",
        year: "2018"
      }
    ]
  });

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'summary':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-900">Professional Summary</h4>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center space-x-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
              >
                <Edit3 className="w-4 h-4" />
                <span>{isEditing ? 'Save' : 'Edit'}</span>
              </button>
            </div>
            {isEditing ? (
              <textarea
                value={resumeData.summary}
                onChange={(e) => setResumeData({...resumeData, summary: e.target.value})}
                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
            )}
            
            {/* AI Suggestions */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h5 className="font-semibold text-blue-900 mb-2">AI Optimization Suggestions:</h5>
              <ul className="space-y-1">
                <li className="text-sm text-blue-800 flex items-center">
                  <Plus className="w-3 h-3 mr-2" />
                  Add specific technologies mentioned in job posting: TypeScript, GraphQL
                </li>
                <li className="text-sm text-blue-800 flex items-center">
                  <Plus className="w-3 h-3 mr-2" />
                  Include quantifiable achievement: "Increased team productivity by X%"
                </li>
              </ul>
            </div>
          </div>
        );
      
      case 'experience':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-900">Work Experience</h4>
              <button className="flex items-center space-x-2 px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                <Plus className="w-4 h-4" />
                <span>Add Position</span>
              </button>
            </div>
            
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h5 className="font-semibold text-gray-900">{exp.title}</h5>
                    <p className="text-gray-600">{exp.company} • {exp.duration}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-gray-400 hover:text-blue-500">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <ul className="space-y-1">
                  {exp.achievements.map((achievement, achIndex) => (
                    <li key={achIndex} className="text-sm text-gray-700 flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
      
      case 'skills':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-900">Technical Skills</h4>
              <button className="flex items-center space-x-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors">
                <Plus className="w-4 h-4" />
                <span>Add Skill</span>
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold text-gray-800 mb-3">Technical Skills</h5>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.technical.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h5 className="font-semibold text-gray-800 mb-3">Soft Skills</h5>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.soft.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Missing Skills Suggestions */}
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h5 className="font-semibold text-orange-900 mb-2">Recommended Skills to Add:</h5>
              <div className="flex flex-wrap gap-2">
                {result.skillsAnalysis.skillGaps.slice(0, 6).map((gap, index) => (
                  <button
                    key={index}
                    className="px-3 py-1 bg-white border border-orange-300 text-orange-800 rounded-full text-sm hover:bg-orange-100 transition-colors"
                  >
                    <Plus className="w-3 h-3 inline mr-1" />
                    {gap.skill}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      
      default:
        return <div className="text-gray-500">Select a section to edit</div>;
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-green-100 overflow-hidden">
      <div className="bg-gradient-to-r from-green-600 to-teal-600 p-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">AI Resume Builder</h3>
            <p className="text-green-100">Professional resume optimization and creation</p>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Template Selection */}
        <div className="mb-8">
          <h4 className="text-xl font-bold text-gray-900 mb-4">Choose Template</h4>
          <div className="grid md:grid-cols-4 gap-4">
            {templates.map((template) => (
              <div key={template.id} className="group cursor-pointer">
                <div className="bg-gray-100 rounded-lg p-4 border-2 border-transparent group-hover:border-green-500 transition-colors">
                  <div className="w-full h-32 bg-gray-200 rounded mb-3 flex items-center justify-center">
                    <FileText className="w-8 h-8 text-gray-400" />
                  </div>
                  <h5 className="font-semibold text-gray-900 text-center">{template.name}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Section Navigation */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Resume Sections</h4>
            <div className="space-y-2">
              {resumeSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                    activeSection === section.id
                      ? 'bg-green-100 text-green-800 border border-green-200'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <section.icon className="w-5 h-5" />
                  <span className="font-medium">{section.label}</span>
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 space-y-3">
              <button className="w-full flex items-center justify-center space-x-2 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <Eye className="w-4 h-4" />
                <span>Preview Resume</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 p-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                <Copy className="w-4 h-4" />
                <span>Copy to Clipboard</span>
              </button>
            </div>
          </div>

          {/* Content Editor */}
          <div className="lg:col-span-2">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-50 rounded-2xl p-6 border border-gray-200 min-h-96"
            >
              {renderSectionContent()}
            </motion.div>
          </div>
        </div>

        {/* AI Optimization Panel */}
        <div className="mt-8 bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-6 border border-green-200">
          <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <FileText className="w-5 h-5 text-green-600 mr-2" />
            AI Optimization Insights
          </h4>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h5 className="font-semibold text-gray-800 mb-2">ATS Score</h5>
              <div className="text-2xl font-bold text-green-600">{result.atsCompatibilityScore}%</div>
              <p className="text-sm text-gray-600">Applicant Tracking System compatibility</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-blue-200">
              <h5 className="font-semibold text-gray-800 mb-2">Keyword Match</h5>
              <div className="text-2xl font-bold text-blue-600">{result.keywordDensityScore}%</div>
              <p className="text-sm text-gray-600">Job posting keyword alignment</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-purple-200">
              <h5 className="font-semibold text-gray-800 mb-2">Overall Score</h5>
              <div className="text-2xl font-bold text-purple-600">{result.overallScore}%</div>
              <p className="text-sm text-gray-600">Comprehensive resume quality</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};