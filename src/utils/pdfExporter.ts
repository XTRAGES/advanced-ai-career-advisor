import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CareerAnalysisResult } from '../types/analysis';

export class PDFExporter {
  private static readonly COLORS = {
    primary: '#4F46E5',
    secondary: '#7C3AED',
    success: '#059669',
    warning: '#D97706',
    error: '#DC2626',
    gray: '#6B7280',
    lightGray: '#F3F4F6'
  };

  public static async exportToPDF(result: CareerAnalysisResult, language: string = 'en'): Promise<void> {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    
    let yPosition = margin;

    // Add header
    yPosition = this.addHeader(pdf, yPosition, margin, contentWidth, language);
    
    // Add executive summary
    yPosition = this.addExecutiveSummary(pdf, result, yPosition, margin, contentWidth, language);
    
    // Add scores section
    yPosition = this.addScoresSection(pdf, result, yPosition, margin, contentWidth, language);
    
    // Add new page for cover letter
    pdf.addPage();
    yPosition = margin;
    yPosition = this.addCoverLetter(pdf, result, yPosition, margin, contentWidth, language);
    
    // Add new page for resume analysis
    pdf.addPage();
    yPosition = margin;
    yPosition = this.addResumeAnalysis(pdf, result, yPosition, margin, contentWidth, language);
    
    // Add new page for skills analysis
    pdf.addPage();
    yPosition = margin;
    yPosition = this.addSkillsAnalysis(pdf, result, yPosition, margin, contentWidth, language);
    
    // Add new page for interview preparation
    pdf.addPage();
    yPosition = margin;
    yPosition = this.addInterviewPreparation(pdf, result, yPosition, margin, contentWidth, language);
    
    // Add new page for action plan
    pdf.addPage();
    yPosition = margin;
    yPosition = this.addActionPlan(pdf, result, yPosition, margin, contentWidth, language);
    
    // Add footer to all pages
    this.addFooter(pdf, language);
    
    // Save the PDF
    const fileName = `career-analysis-report-${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName);
  }

  private static addHeader(pdf: jsPDF, yPosition: number, margin: number, contentWidth: number, language: string): number {
    // Company logo area (placeholder)
    pdf.setFillColor(79, 70, 229); // Primary color
    pdf.rect(margin, yPosition, 40, 15, 'F');
    
    // Company name
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('AI Career Advisor', margin + 2, yPosition + 10);
    
    // Report title
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    const title = this.getTranslation(language, 'PROFESSIONAL CAREER ANALYSIS REPORT');
    pdf.text(title, margin, yPosition + 35);
    
    // Date and time
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(107, 114, 128);
    const date = new Date().toLocaleDateString(language === 'de' ? 'de-DE' : language === 'sq' ? 'sq-AL' : 'en-US');
    pdf.text(`Generated on: ${date}`, margin, yPosition + 45);
    
    return yPosition + 60;
  }

  private static addExecutiveSummary(pdf: jsPDF, result: CareerAnalysisResult, yPosition: number, margin: number, contentWidth: number, language: string): number {
    // Section title
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 0, 0);
    const title = this.getTranslation(language, 'EXECUTIVE SUMMARY');
    pdf.text(title, margin, yPosition);
    
    yPosition += 15;
    
    // Summary content
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(55, 65, 81);
    
    const summaryText = this.getTranslation(language, 
      `This comprehensive analysis evaluates your professional profile against the target position, providing strategic insights and actionable recommendations for career advancement. Our AI-powered assessment examines multiple dimensions including ATS compatibility, keyword optimization, skills alignment, and market positioning.`
    );
    
    const splitText = pdf.splitTextToSize(summaryText, contentWidth);
    pdf.text(splitText, margin, yPosition);
    
    return yPosition + (splitText.length * 5) + 10;
  }

  private static addScoresSection(pdf: jsPDF, result: CareerAnalysisResult, yPosition: number, margin: number, contentWidth: number, language: string): number {
    // Section title
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 0, 0);
    const title = this.getTranslation(language, 'PERFORMANCE METRICS');
    pdf.text(title, margin, yPosition);
    
    yPosition += 20;
    
    const scores = [
      { label: this.getTranslation(language, 'Overall Match'), value: result.overallScore, color: this.COLORS.primary },
      { label: this.getTranslation(language, 'ATS Compatibility'), value: result.atsCompatibilityScore, color: this.COLORS.success },
      { label: this.getTranslation(language, 'Keyword Density'), value: result.keywordDensityScore, color: this.COLORS.secondary },
      { label: this.getTranslation(language, 'Experience Alignment'), value: result.experienceAlignmentScore, color: this.COLORS.warning },
      { label: this.getTranslation(language, 'Skills Match'), value: result.skillsMatchScore, color: this.COLORS.error }
    ];
    
    const boxWidth = (contentWidth - 20) / 5;
    
    scores.forEach((score, index) => {
      const xPosition = margin + (index * (boxWidth + 4));
      
      // Score box
      pdf.setFillColor(243, 244, 246);
      pdf.rect(xPosition, yPosition, boxWidth, 30, 'F');
      
      // Score value
      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 0, 0);
      pdf.text(`${score.value}%`, xPosition + boxWidth/2, yPosition + 15, { align: 'center' });
      
      // Score label
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(107, 114, 128);
      const labelLines = pdf.splitTextToSize(score.label, boxWidth - 4);
      pdf.text(labelLines, xPosition + boxWidth/2, yPosition + 22, { align: 'center' });
    });
    
    return yPosition + 45;
  }

  private static addCoverLetter(pdf: jsPDF, result: CareerAnalysisResult, yPosition: number, margin: number, contentWidth: number, language: string): number {
    // Section title
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 0, 0);
    const title = this.getTranslation(language, 'AI-OPTIMIZED COVER LETTER');
    pdf.text(title, margin, yPosition);
    
    yPosition += 20;
    
    // Cover letter content
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(55, 65, 81);
    
    const coverLetterLines = pdf.splitTextToSize(result.coverLetter.content, contentWidth);
    
    // Add background for cover letter
    pdf.setFillColor(249, 250, 251);
    pdf.rect(margin, yPosition - 5, contentWidth, coverLetterLines.length * 4 + 10, 'F');
    
    pdf.text(coverLetterLines, margin + 5, yPosition);
    
    return yPosition + (coverLetterLines.length * 4) + 20;
  }

  private static addResumeAnalysis(pdf: jsPDF, result: CareerAnalysisResult, yPosition: number, margin: number, contentWidth: number, language: string): number {
    // Section title
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 0, 0);
    const title = this.getTranslation(language, 'RESUME ANALYSIS & RECOMMENDATIONS');
    pdf.text(title, margin, yPosition);
    
    yPosition += 20;
    
    // Strengths
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(5, 150, 105);
    pdf.text(this.getTranslation(language, 'Key Strengths:'), margin, yPosition);
    
    yPosition += 10;
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(55, 65, 81);
    
    result.resumeAnalysis.strengths.slice(0, 5).forEach((strength, index) => {
      pdf.text(`• ${strength.description}`, margin + 5, yPosition);
      yPosition += 6;
    });
    
    yPosition += 10;
    
    // Suggestions
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(217, 119, 6);
    pdf.text(this.getTranslation(language, 'Improvement Recommendations:'), margin, yPosition);
    
    yPosition += 10;
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(55, 65, 81);
    
    result.resumeAnalysis.suggestions.slice(0, 6).forEach((suggestion, index) => {
      const text = `• [${suggestion.priority.toUpperCase()}] ${suggestion.suggested}`;
      const lines = pdf.splitTextToSize(text, contentWidth - 10);
      pdf.text(lines, margin + 5, yPosition);
      yPosition += lines.length * 5;
    });
    
    return yPosition + 10;
  }

  private static addSkillsAnalysis(pdf: jsPDF, result: CareerAnalysisResult, yPosition: number, margin: number, contentWidth: number, language: string): number {
    // Section title
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 0, 0);
    const title = this.getTranslation(language, 'SKILLS ANALYSIS MATRIX');
    pdf.text(title, margin, yPosition);
    
    yPosition += 20;
    
    // Matched Skills
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(5, 150, 105);
    pdf.text(this.getTranslation(language, 'Matched Skills:'), margin, yPosition);
    
    yPosition += 10;
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(55, 65, 81);
    
    const matchedSkills = result.skillsAnalysis.matchedSkills.map(s => s.skill).join(', ');
    const matchedLines = pdf.splitTextToSize(matchedSkills, contentWidth);
    pdf.text(matchedLines, margin + 5, yPosition);
    
    yPosition += matchedLines.length * 5 + 10;
    
    // Skill Gaps
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(220, 38, 38);
    pdf.text(this.getTranslation(language, 'Critical Skill Gaps:'), margin, yPosition);
    
    yPosition += 10;
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(55, 65, 81);
    
    result.skillsAnalysis.skillGaps.slice(0, 8).forEach((gap, index) => {
      pdf.text(`• ${gap.skill} (${gap.importance} - ${gap.timeToAcquire})`, margin + 5, yPosition);
      yPosition += 6;
    });
    
    return yPosition + 10;
  }

  private static addInterviewPreparation(pdf: jsPDF, result: CareerAnalysisResult, yPosition: number, margin: number, contentWidth: number, language: string): number {
    // Section title
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 0, 0);
    const title = this.getTranslation(language, 'INTERVIEW PREPARATION GUIDE');
    pdf.text(title, margin, yPosition);
    
    yPosition += 20;
    
    // Sample Questions
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(124, 58, 237);
    pdf.text(this.getTranslation(language, 'Key Interview Questions:'), margin, yPosition);
    
    yPosition += 10;
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(55, 65, 81);
    
    result.interviewPreparation.questions.slice(0, 3).forEach((qa, index) => {
      // Question
      pdf.setFont('helvetica', 'bold');
      pdf.text(`Q${index + 1}: ${qa.question}`, margin + 5, yPosition);
      yPosition += 8;
      
      // Answer
      pdf.setFont('helvetica', 'normal');
      const answerLines = pdf.splitTextToSize(`A: ${qa.suggestedAnswer}`, contentWidth - 10);
      pdf.text(answerLines, margin + 5, yPosition);
      yPosition += answerLines.length * 4 + 8;
    });
    
    return yPosition + 10;
  }

  private static addActionPlan(pdf: jsPDF, result: CareerAnalysisResult, yPosition: number, margin: number, contentWidth: number, language: string): number {
    // Section title
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 0, 0);
    const title = this.getTranslation(language, 'STRATEGIC ACTION PLAN');
    pdf.text(title, margin, yPosition);
    
    yPosition += 20;
    
    const sections = [
      { title: this.getTranslation(language, 'Immediate Actions (1-2 weeks):'), items: result.actionPlan.immediate, color: this.COLORS.error },
      { title: this.getTranslation(language, 'Short-term Goals (1-3 months):'), items: result.actionPlan.shortTerm, color: this.COLORS.warning },
      { title: this.getTranslation(language, 'Long-term Objectives (3-12 months):'), items: result.actionPlan.longTerm, color: this.COLORS.primary }
    ];
    
    sections.forEach((section, sectionIndex) => {
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 0, 0);
      pdf.text(section.title, margin, yPosition);
      
      yPosition += 10;
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(55, 65, 81);
      
      section.items.slice(0, 3).forEach((item, index) => {
        const text = `• ${item.task} (${item.timeframe})`;
        const lines = pdf.splitTextToSize(text, contentWidth - 10);
        pdf.text(lines, margin + 5, yPosition);
        yPosition += lines.length * 5;
      });
      
      yPosition += 8;
    });
    
    return yPosition;
  }

  private static addFooter(pdf: jsPDF, language: string): void {
    const pageCount = pdf.getNumberOfPages();
    
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      
      // Footer line
      pdf.setDrawColor(229, 231, 235);
      pdf.line(20, 280, 190, 280);
      
      // Footer text
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(107, 114, 128);
      
      const footerText = this.getTranslation(language, 'Generated by Advanced AI Career Advisor - Professional Career Optimization Platform');
      pdf.text(footerText, 20, 285);
      
      // Page number
      pdf.text(`${this.getTranslation(language, 'Page')} ${i} ${this.getTranslation(language, 'of')} ${pageCount}`, 190, 285, { align: 'right' });
      
      // Generation timestamp
      const timestamp = new Date().toLocaleString(language === 'de' ? 'de-DE' : language === 'sq' ? 'sq-AL' : 'en-US');
      pdf.text(timestamp, 105, 290, { align: 'center' });
    }
  }

  private static getTranslation(language: string, text: string): string {
    // Simplified translation function - in a real app, this would use the i18n system
    const translations: { [key: string]: { [key: string]: string } } = {
      'en': {
        'PROFESSIONAL CAREER ANALYSIS REPORT': 'PROFESSIONAL CAREER ANALYSIS REPORT',
        'EXECUTIVE SUMMARY': 'EXECUTIVE SUMMARY',
        'PERFORMANCE METRICS': 'PERFORMANCE METRICS',
        'Overall Match': 'Overall Match',
        'ATS Compatibility': 'ATS Compatibility',
        'Keyword Density': 'Keyword Density',
        'Experience Alignment': 'Experience Alignment',
        'Skills Match': 'Skills Match',
        'AI-OPTIMIZED COVER LETTER': 'AI-OPTIMIZED COVER LETTER',
        'RESUME ANALYSIS & RECOMMENDATIONS': 'RESUME ANALYSIS & RECOMMENDATIONS',
        'Key Strengths:': 'Key Strengths:',
        'Improvement Recommendations:': 'Improvement Recommendations:',
        'SKILLS ANALYSIS MATRIX': 'SKILLS ANALYSIS MATRIX',
        'Matched Skills:': 'Matched Skills:',
        'Critical Skill Gaps:': 'Critical Skill Gaps:',
        'INTERVIEW PREPARATION GUIDE': 'INTERVIEW PREPARATION GUIDE',
        'Key Interview Questions:': 'Key Interview Questions:',
        'STRATEGIC ACTION PLAN': 'STRATEGIC ACTION PLAN',
        'Immediate Actions (1-2 weeks):': 'Immediate Actions (1-2 weeks):',
        'Short-term Goals (1-3 months):': 'Short-term Goals (1-3 months):',
        'Long-term Objectives (3-12 months):': 'Long-term Objectives (3-12 months):',
        'Page': 'Page',
        'of': 'of',
        'Generated by Advanced AI Career Advisor - Professional Career Optimization Platform': 'Generated by Advanced AI Career Advisor - Professional Career Optimization Platform'
      },
      'sq': {
        'PROFESSIONAL CAREER ANALYSIS REPORT': 'RAPORT PROFESIONAL ANALIZE KARRIERE',
        'EXECUTIVE SUMMARY': 'PËRMBLEDHJE EKZEKUTIVE',
        'PERFORMANCE METRICS': 'METRIKA PERFORMANCË',
        'Overall Match': 'Përputhja e Përgjithshme',
        'ATS Compatibility': 'Përputhshmëria ATS',
        'Keyword Density': 'Dendësia e Fjalëve Kyçe',
        'Experience Alignment': 'Përshtatja e Përvojës',
        'Skills Match': 'Përputhja e Aftësive',
        'AI-OPTIMIZED COVER LETTER': 'LETËR MOTIVUESE E OPTIMIZUAR NGA AI',
        'RESUME ANALYSIS & RECOMMENDATIONS': 'ANALIZË CV-JE DHE REKOMANDIME',
        'Key Strengths:': 'Pikat Kryesore të Forta:',
        'Improvement Recommendations:': 'Rekomandime për Përmirësim:',
        'SKILLS ANALYSIS MATRIX': 'MATRICË ANALIZE AFTËSISH',
        'Matched Skills:': 'Aftësi të Përputhura:',
        'Critical Skill Gaps:': 'Mangësi Kritike Aftësish:',
        'INTERVIEW PREPARATION GUIDE': 'UDHËZUES PËRGATITJE INTERVISTE',
        'Key Interview Questions:': 'Pyetje Kryesore Interviste:',
        'STRATEGIC ACTION PLAN': 'PLAN STRATEGJIK VEPRIMI',
        'Immediate Actions (1-2 weeks):': 'Veprime të Menjëhershme (1-2 javë):',
        'Short-term Goals (1-3 months):': 'Objektiva Afatshkurtra (1-3 muaj):',
        'Long-term Objectives (3-12 months):': 'Objektiva Afatgjata (3-12 muaj):',
        'Page': 'Faqe',
        'of': 'nga',
        'Generated by Advanced AI Career Advisor - Professional Career Optimization Platform': 'Gjeneruar nga Këshilltari i Avancuar AI për Karrierë - Platformë Profesionale Optimizimi Karriere'
      },
      'de': {
        'PROFESSIONAL CAREER ANALYSIS REPORT': 'PROFESSIONELLER KARRIERE-ANALYSEBERICHT',
        'EXECUTIVE SUMMARY': 'ZUSAMMENFASSUNG',
        'PERFORMANCE METRICS': 'LEISTUNGSMETRIKEN',
        'Overall Match': 'Gesamtübereinstimmung',
        'ATS Compatibility': 'ATS-Kompatibilität',
        'Keyword Density': 'Keyword-Dichte',
        'Experience Alignment': 'Erfahrungsausrichtung',
        'Skills Match': 'Fähigkeiten-Übereinstimmung',
        'AI-OPTIMIZED COVER LETTER': 'KI-OPTIMIERTES ANSCHREIBEN',
        'RESUME ANALYSIS & RECOMMENDATIONS': 'LEBENSLAUF-ANALYSE UND EMPFEHLUNGEN',
        'Key Strengths:': 'Hauptstärken:',
        'Improvement Recommendations:': 'Verbesserungsempfehlungen:',
        'SKILLS ANALYSIS MATRIX': 'FÄHIGKEITEN-ANALYSEMATRIX',
        'Matched Skills:': 'Übereinstimmende Fähigkeiten:',
        'Critical Skill Gaps:': 'Kritische Fähigkeitslücken:',
        'INTERVIEW PREPARATION GUIDE': 'INTERVIEW-VORBEREITUNGSLEITFADEN',
        'Key Interview Questions:': 'Wichtige Interview-Fragen:',
        'STRATEGIC ACTION PLAN': 'STRATEGISCHER AKTIONSPLAN',
        'Immediate Actions (1-2 weeks):': 'Sofortige Maßnahmen (1-2 Wochen):',
        'Short-term Goals (1-3 months):': 'Kurzfristige Ziele (1-3 Monate):',
        'Long-term Objectives (3-12 months):': 'Langfristige Ziele (3-12 Monate):',
        'Page': 'Seite',
        'of': 'von',
        'Generated by Advanced AI Career Advisor - Professional Career Optimization Platform': 'Erstellt von Advanced AI Career Advisor - Professionelle Karriere-Optimierungsplattform'
      }
    };
    
    return translations[language]?.[text] || text;
  }
}