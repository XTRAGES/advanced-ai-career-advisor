interface AnalysisResult {
  coverLetter: string;
  resumeSuggestions: string[];
  interviewQuestions: Array<{
    question: string;
    answer: string;
    type: 'behavioral' | 'technical';
  }>;
  keywordMatches: string[];
  skillGaps: string[];
  strengthsIdentified: string[];
}

export function analyzeCareerMatch(resumeText: string, jobPostingText: string): AnalysisResult {
  // Extract keywords from job posting
  const jobKeywords = extractJobKeywords(jobPostingText);
  const resumeKeywords = extractResumeKeywords(resumeText);
  
  // Find matches and gaps
  const keywordMatches = findKeywordMatches(resumeKeywords, jobKeywords);
  const skillGaps = findSkillGaps(resumeKeywords, jobKeywords);
  
  // Identify strengths from resume
  const strengthsIdentified = identifyStrengths(resumeText);
  
  // Generate personalized content
  const coverLetter = generateCoverLetter(resumeText, jobPostingText, keywordMatches);
  const resumeSuggestions = generateResumeSuggestions(resumeText, jobPostingText, skillGaps);
  const interviewQuestions = generateInterviewQuestions(resumeText, jobPostingText);
  
  return {
    coverLetter,
    resumeSuggestions,
    interviewQuestions,
    keywordMatches,
    skillGaps,
    strengthsIdentified
  };
}

function extractJobKeywords(jobText: string): string[] {
  const commonSkills = [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java', 'C++', 'SQL',
    'AWS', 'Azure', 'Docker', 'Kubernetes', 'Git', 'Agile', 'Scrum', 'REST API',
    'GraphQL', 'MongoDB', 'PostgreSQL', 'Redis', 'Microservices', 'CI/CD',
    'Machine Learning', 'Data Analysis', 'Project Management', 'Leadership',
    'Communication', 'Problem Solving', 'Team Collaboration', 'Full Stack',
    'Frontend', 'Backend', 'DevOps', 'Cloud', 'Security', 'Testing', 'Debugging'
  ];
  
  const jobLower = jobText.toLowerCase();
  return commonSkills.filter(skill => 
    jobLower.includes(skill.toLowerCase()) || 
    jobLower.includes(skill.toLowerCase().replace(/\s+/g, ''))
  );
}

function extractResumeKeywords(resumeText: string): string[] {
  const commonSkills = [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java', 'C++', 'SQL',
    'AWS', 'Azure', 'Docker', 'Kubernetes', 'Git', 'Agile', 'Scrum', 'REST API',
    'GraphQL', 'MongoDB', 'PostgreSQL', 'Redis', 'Microservices', 'CI/CD',
    'Machine Learning', 'Data Analysis', 'Project Management', 'Leadership',
    'Communication', 'Problem Solving', 'Team Collaboration', 'Full Stack',
    'Frontend', 'Backend', 'DevOps', 'Cloud', 'Security', 'Testing', 'Debugging'
  ];
  
  const resumeLower = resumeText.toLowerCase();
  return commonSkills.filter(skill => 
    resumeLower.includes(skill.toLowerCase()) || 
    resumeLower.includes(skill.toLowerCase().replace(/\s+/g, ''))
  );
}

function findKeywordMatches(resumeKeywords: string[], jobKeywords: string[]): string[] {
  return jobKeywords.filter(keyword => 
    resumeKeywords.some(resumeKeyword => 
      resumeKeyword.toLowerCase() === keyword.toLowerCase()
    )
  );
}

function findSkillGaps(resumeKeywords: string[], jobKeywords: string[]): string[] {
  return jobKeywords.filter(keyword => 
    !resumeKeywords.some(resumeKeyword => 
      resumeKeyword.toLowerCase() === keyword.toLowerCase()
    )
  ).slice(0, 8); // Limit to top 8 gaps
}

function identifyStrengths(resumeText: string): string[] {
  const strengths: string[] = [];
  const resumeLower = resumeText.toLowerCase();
  
  // Check for leadership experience
  if (resumeLower.includes('lead') || resumeLower.includes('manage') || resumeLower.includes('mentor')) {
    strengths.push('Proven leadership and team management experience');
  }
  
  // Check for quantifiable achievements
  if (/\d+%|\d+\+|increased|improved|reduced|optimized/i.test(resumeText)) {
    strengths.push('Track record of measurable achievements and performance improvements');
  }
  
  // Check for technical depth
  const techCount = (resumeText.match(/javascript|python|react|node|sql|aws|docker/gi) || []).length;
  if (techCount >= 3) {
    strengths.push('Strong technical foundation across multiple technologies');
  }
  
  // Check for education
  if (resumeLower.includes('degree') || resumeLower.includes('university') || resumeLower.includes('college')) {
    strengths.push('Solid educational background');
  }
  
  // Check for project experience
  if (resumeLower.includes('project') && resumeLower.includes('develop')) {
    strengths.push('Hands-on project development experience');
  }
  
  // Check for collaboration
  if (resumeLower.includes('team') || resumeLower.includes('collaborate') || resumeLower.includes('cross-functional')) {
    strengths.push('Strong collaborative and teamwork skills');
  }
  
  return strengths.slice(0, 6); // Limit to top 6 strengths
}

function generateCoverLetter(resumeText: string, jobText: string, matches: string[]): string {
  // Extract company name from job posting
  const companyMatch = jobText.match(/(?:at|join|company|organization)\s+([A-Z][a-zA-Z\s&]+?)(?:\s|,|\.|!)/i);
  const companyName = companyMatch ? companyMatch[1].trim() : 'your company';
  
  // Extract job title
  const titleMatch = jobText.match(/(?:position|role|job|title):\s*([^\n\r]+)/i) || 
                    jobText.match(/^([^\n\r]+?)(?:\s*-|\s*at|\s*position)/i);
  const jobTitle = titleMatch ? titleMatch[1].trim() : 'this position';
  
  // Extract years of experience from resume
  const experienceMatch = resumeText.match(/(\d+)\+?\s*years?\s*(?:of\s*)?experience/i);
  const yearsExp = experienceMatch ? experienceMatch[1] : '3';
  
  // Build cover letter based on actual content
  let coverLetter = `Dear Hiring Manager,

I am writing to express my strong interest in the ${jobTitle} position at ${companyName}. `;

  if (matches.length > 0) {
    coverLetter += `With ${yearsExp} years of experience and expertise in ${matches.slice(0, 3).join(', ')}, I am excited about the opportunity to contribute to your team's success.

`;
  }

  // Add specific achievements if found in resume
  const achievementMatch = resumeText.match(/(?:increased|improved|reduced|optimized|built|developed|led|managed)[^.!?]*[.!?]/gi);
  if (achievementMatch && achievementMatch.length > 0) {
    const topAchievement = achievementMatch[0];
    coverLetter += `In my previous roles, I have ${topAchievement.toLowerCase()} This experience directly aligns with your requirements and demonstrates my ability to deliver measurable results.

`;
  }

  coverLetter += `What particularly excites me about this opportunity is the chance to work with ${matches.length > 0 ? matches.slice(0, 2).join(' and ') : 'cutting-edge technologies'} in a collaborative environment. I am eager to bring my technical skills and passion for innovation to help ${companyName} achieve its goals.

Thank you for considering my application. I look forward to discussing how my background and enthusiasm can contribute to your team's continued success.

Sincerely,
[Your Name]`;

  return coverLetter;
}

function generateResumeSuggestions(resumeText: string, jobText: string, skillGaps: string[]): string[] {
  const suggestions: string[] = [];
  
  // Check for missing keywords
  if (skillGaps.length > 0) {
    suggestions.push(`Add these key technologies mentioned in the job posting: ${skillGaps.slice(0, 4).join(', ')}`);
  }
  
  // Check for quantifiable metrics
  if (!/\d+%|\d+\+|increased|improved|reduced/i.test(resumeText)) {
    suggestions.push("Include specific metrics and quantifiable achievements (e.g., 'Increased performance by 40%', 'Led team of 5 developers')");
  }
  
  // Check for action verbs
  if (!/^(developed|built|created|implemented|designed|led|managed)/im.test(resumeText)) {
    suggestions.push("Start bullet points with strong action verbs like 'Developed', 'Implemented', 'Led', 'Optimized'");
  }
  
  // Check for relevant sections
  if (!resumeText.toLowerCase().includes('project')) {
    suggestions.push("Add a 'Key Projects' section highlighting relevant technical projects");
  }
  
  // Check for skills section
  if (!resumeText.toLowerCase().includes('skill')) {
    suggestions.push("Include a dedicated 'Technical Skills' section with relevant technologies");
  }
  
  // Industry-specific suggestions based on job posting
  if (jobText.toLowerCase().includes('agile') && !resumeText.toLowerCase().includes('agile')) {
    suggestions.push("Mention experience with Agile/Scrum methodologies if applicable");
  }
  
  if (jobText.toLowerCase().includes('cloud') && !resumeText.toLowerCase().includes('cloud')) {
    suggestions.push("Highlight any cloud platform experience (AWS, Azure, GCP)");
  }
  
  return suggestions.slice(0, 6);
}

function generateInterviewQuestions(resumeText: string, jobText: string): Array<{question: string, answer: string, type: 'behavioral' | 'technical'}> {
  const questions = [];
  
  // Behavioral questions
  questions.push({
    question: "Tell me about a challenging project you worked on. How did you overcome the obstacles?",
    answer: generateBehavioralAnswer(resumeText, "project challenge"),
    type: 'behavioral' as const
  });
  
  questions.push({
    question: "Describe a time when you had to work with a difficult team member. How did you handle it?",
    answer: generateBehavioralAnswer(resumeText, "team collaboration"),
    type: 'behavioral' as const
  });
  
  // Technical questions based on job requirements
  const jobLower = jobText.toLowerCase();
  
  if (jobLower.includes('javascript') || jobLower.includes('react')) {
    questions.push({
      question: "How do you ensure code quality and maintainability in your JavaScript/React projects?",
      answer: generateTechnicalAnswer(resumeText, "code quality"),
      type: 'technical' as const
    });
  }
  
  if (jobLower.includes('database') || jobLower.includes('sql')) {
    questions.push({
      question: "How do you approach database design and optimization?",
      answer: generateTechnicalAnswer(resumeText, "database"),
      type: 'technical' as const
    });
  }
  
  // General technical question
  questions.push({
    question: "Walk me through your approach to debugging a complex technical issue.",
    answer: generateTechnicalAnswer(resumeText, "debugging"),
    type: 'technical' as const
  });
  
  // Leadership question if applicable
  if (resumeText.toLowerCase().includes('lead') || resumeText.toLowerCase().includes('manage')) {
    questions.push({
      question: "How do you motivate and guide team members with different skill levels?",
      answer: generateBehavioralAnswer(resumeText, "leadership"),
      type: 'behavioral' as const
    });
  }
  
  return questions.slice(0, 6);
}

function generateBehavioralAnswer(resumeText: string, topic: string): string {
  const hasLeadership = resumeText.toLowerCase().includes('lead') || resumeText.toLowerCase().includes('manage');
  const hasTeamwork = resumeText.toLowerCase().includes('team') || resumeText.toLowerCase().includes('collaborate');
  
  switch (topic) {
    case "project challenge":
      return `In my previous role, I encountered a challenging project where we needed to deliver a complex feature under tight deadlines. I approached this by first breaking down the requirements into manageable tasks, identifying potential risks early, and establishing clear communication channels with stakeholders. ${hasTeamwork ? 'I coordinated closely with team members to ensure everyone understood their responsibilities.' : 'I maintained regular progress updates and adjusted the timeline as needed.'} Through systematic problem-solving and proactive communication, we successfully delivered the project on time while maintaining high quality standards.`;
    
    case "team collaboration":
      return `I once worked with a team member who had different working styles and communication preferences. Instead of letting this create friction, I took the initiative to understand their perspective through one-on-one conversations. I discovered they preferred written communication over verbal discussions and worked better with detailed specifications. ${hasLeadership ? 'As someone who has led teams before, I adapted my communication style and created structured documentation that helped them excel.' : 'I adjusted my approach to accommodate their preferences while ensuring project goals were met.'} This experience taught me the importance of flexibility and empathy in team dynamics.`;
    
    case "leadership":
      return `${hasLeadership ? 'In my leadership roles, I focus on understanding each team member\'s strengths, career goals, and preferred learning styles.' : 'When mentoring colleagues, I focus on understanding their individual strengths and development areas.'} I provide regular feedback, create opportunities for skill development, and ensure everyone feels valued and heard. For junior team members, I pair them with experienced developers and provide hands-on guidance. For senior members, I focus on strategic discussions and removing blockers so they can focus on high-impact work. I believe in leading by example and maintaining open communication channels.`;
    
    default:
      return "I approach challenges systematically by first gathering all relevant information, analyzing the situation from multiple perspectives, and developing a clear action plan. I believe in transparent communication, collaborative problem-solving, and learning from every experience to continuously improve my approach.";
  }
}

function generateTechnicalAnswer(resumeText: string, topic: string): string {
  const hasExperience = resumeText.toLowerCase().includes('develop') || resumeText.toLowerCase().includes('build');
  const hasTesting = resumeText.toLowerCase().includes('test') || resumeText.toLowerCase().includes('quality');
  
  switch (topic) {
    case "code quality":
      return `I ensure code quality through multiple approaches: implementing comprehensive unit and integration tests ${hasTesting ? 'as I\'ve done in my previous projects' : 'with good coverage metrics'}, conducting thorough code reviews with constructive feedback, following established coding standards and linting rules, and using automated CI/CD pipelines for consistent deployment. ${hasExperience ? 'In my experience building applications, I\'ve found that' : 'I believe that'} writing clean, self-documenting code with meaningful variable names and comprehensive comments is crucial. I also prioritize regular refactoring to manage technical debt and maintain code readability.`;
    
    case "database":
      return `My approach to database design starts with understanding the business requirements and data relationships. I focus on proper normalization to reduce redundancy while considering denormalization for performance where appropriate. For optimization, I analyze query patterns, implement appropriate indexing strategies, and monitor performance metrics. ${hasExperience ? 'In my projects, I\'ve worked with' : 'I have experience with'} both SQL and NoSQL databases, choosing the right tool based on data structure and scalability requirements. I also implement proper backup strategies and consider data security throughout the design process.`;
    
    case "debugging":
      return `My debugging approach follows a systematic methodology: First, I reproduce the issue consistently and gather all relevant information including error logs, user steps, and environment details. Then I isolate the problem by examining recent changes, analyzing stack traces, and using debugging tools like browser DevTools or server logs. ${hasExperience ? 'From my development experience, I\'ve learned to' : 'I believe in'} implementing targeted fixes with proper testing, and documenting the solution and root cause to prevent similar issues. I also value collaborative debugging when needed, as fresh perspectives often lead to faster resolution.`;
    
    default:
      return "I approach technical challenges with a methodical mindset, leveraging both theoretical knowledge and practical experience to find effective solutions. I believe in continuous learning and staying updated with industry best practices.";
  }
}