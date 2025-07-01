export interface CareerAnalysisResult {
  overallScore: number;
  atsCompatibilityScore: number;
  keywordDensityScore: number;
  experienceAlignmentScore: number;
  skillsMatchScore: number;
  
  coverLetter: {
    content: string;
    tone: 'professional' | 'enthusiastic' | 'technical';
    wordCount: number;
    keywordDensity: number;
  };
  
  resumeAnalysis: {
    strengths: ResumeStrength[];
    weaknesses: ResumeWeakness[];
    suggestions: ResumeSuggestion[];
    missingKeywords: string[];
    atsOptimizations: string[];
    quantifiableAchievements: number;
    actionVerbUsage: number;
  };
  
  interviewPreparation: {
    questions: InterviewQuestion[];
    companyResearch: CompanyInsight[];
    salaryInsights: SalaryData;
    negotiationTips: string[];
  };
  
  skillsAnalysis: {
    matchedSkills: SkillMatch[];
    skillGaps: SkillGap[];
    recommendedCertifications: Certification[];
    learningPath: LearningRecommendation[];
  };
  
  marketAnalysis: {
    industryTrends: string[];
    competitivePositioning: string;
    careerProgression: string[];
    riskFactors: string[];
  };
  
  actionPlan: {
    immediate: ActionItem[];
    shortTerm: ActionItem[];
    longTerm: ActionItem[];
  };
}

export interface ResumeStrength {
  category: 'experience' | 'skills' | 'achievements' | 'education' | 'leadership';
  description: string;
  impact: 'high' | 'medium' | 'low';
  relevanceScore: number;
}

export interface ResumeWeakness {
  category: 'formatting' | 'content' | 'keywords' | 'achievements' | 'skills';
  issue: string;
  severity: 'critical' | 'moderate' | 'minor';
  recommendation: string;
}

export interface ResumeSuggestion {
  type: 'add' | 'modify' | 'remove' | 'restructure';
  section: string;
  current?: string;
  suggested: string;
  reasoning: string;
  priority: 'high' | 'medium' | 'low';
}

export interface InterviewQuestion {
  question: string;
  type: 'behavioral' | 'technical' | 'situational' | 'cultural-fit';
  difficulty: 'entry' | 'mid' | 'senior' | 'executive';
  suggestedAnswer: string;
  keyPoints: string[];
  followUpQuestions: string[];
}

export interface SkillMatch {
  skill: string;
  jobRequirement: 'required' | 'preferred' | 'nice-to-have';
  candidateLevel: 'expert' | 'proficient' | 'familiar' | 'beginner';
  matchStrength: number;
  evidenceFromResume: string[];
}

export interface SkillGap {
  skill: string;
  importance: 'critical' | 'important' | 'beneficial';
  timeToAcquire: string;
  learningResources: string[];
  alternativeSkills: string[];
}

export interface Certification {
  name: string;
  provider: string;
  relevanceScore: number;
  timeToComplete: string;
  cost: string;
  industryRecognition: 'high' | 'medium' | 'low';
}

export interface CompanyInsight {
  category: 'culture' | 'values' | 'recent-news' | 'growth' | 'challenges';
  insight: string;
  source: string;
  relevanceToRole: number;
}

export interface SalaryData {
  range: {
    min: number;
    max: number;
    median: number;
  };
  factors: string[];
  negotiationPoints: string[];
  marketComparison: string;
}

export interface ActionItem {
  task: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  timeframe: string;
  resources: string[];
  successMetrics: string[];
}

export interface LearningRecommendation {
  skill: string;
  currentLevel: string;
  targetLevel: string;
  resources: {
    type: 'course' | 'book' | 'project' | 'certification';
    name: string;
    provider: string;
    duration: string;
    cost: string;
  }[];
  timeline: string;
}
</parameter>