import { getAllQuestions } from "../data/questions";

export interface ScoreResult {
  totalScore: number;
  category: string;
  strengths: string[];
  improvements: string[];
  recommendations: string[];
}

export const calculateScore = (answers: Record<string, string | number>): ScoreResult => {
  const questions = getAllQuestions();
  let totalScore = 0;
  const strengths: string[] = [];
  const improvements: string[] = [];
  const recommendations: string[] = [];

  // Group scores by sections
  let academicSum = 0, academicCount = 0;
  let expSum = 0, expCount = 0;
  let compSum = 0, compCount = 0;
  let indSum = 0, indCount = 0;

  for (const q of questions) {
    const answer = answers[q.id];
    if (answer === undefined) continue;

    const option = q.options.find(opt => opt.value === answer || opt.label === answer);
    const weight = option?.weight;

    if (weight !== undefined) {
      // Determine section based on question ID
      if (q.id.startsWith("q6") || q.id.startsWith("q7") || q.id.startsWith("q8") || q.id.startsWith("q9") || q.id.startsWith("q10")) {
        academicSum += weight;
        academicCount++;
      } else if (q.id.startsWith("q11") || q.id.startsWith("q12") || q.id.startsWith("q13") || q.id.startsWith("q14") || q.id.startsWith("q15") || q.id.startsWith("q16")) {
        expSum += weight;
        expCount++;
      } else if (q.id.startsWith("q17") || q.id.startsWith("q18") || q.id.startsWith("q19") || q.id.startsWith("q20") || q.id.startsWith("q21") || q.id.startsWith("q22") || q.id.startsWith("q23") || q.id.startsWith("q24") || q.id.startsWith("q25")) {
        compSum += weight;
        compCount++;
      } else if (q.id.startsWith("q26") || q.id.startsWith("q27") || q.id.startsWith("q28") || q.id.startsWith("q29")) {
        indSum += weight;
        indCount++;
      }
    }
  }

  const academicAvg = academicCount > 0 ? academicSum / academicCount : 0;
  const expAvg = expCount > 0 ? expSum / expCount : 0;
  const compAvg = compCount > 0 ? compSum / compCount : 0;
  const indAvg = indCount > 0 ? indSum / indCount : 0;

  // Weights: Academic 20%, Exp 30%, Comp 30%, Industry 20%
  totalScore = Math.round((academicAvg * 0.2) + (expAvg * 0.3) + (compAvg * 0.3) + (indAvg * 0.2));

  // Determine category
  let category = "";
  if (totalScore <= 40) category = "Developing";
  else if (totalScore <= 70) category = "Progressing";
  else category = "Career Ready";

  // Generate personalized strengths & improvements
  if (academicAvg > 75) strengths.push("Strong Academic Foundation");
  if (expAvg > 70) strengths.push("Rich Practical Experience");
  if (compAvg > 75) strengths.push("Excellent Soft Skills");
  if (indAvg > 70) strengths.push("Active Industry Network");

  // Specific recommendations
  if (answers["q11_internships"] === "None") {
    improvements.push("Practical Experience");
    recommendations.push("Consider gaining internship experience to apply classroom knowledge in real-world scenarios.");
  }
  if (answers["q27_resume_portfolio"] === "No") {
    improvements.push("Professional Branding");
    recommendations.push("Build a professional portfolio or resume to highlight your projects and skills.");
  }
  if (answers["q26_workshops"] === "Never" || answers["q26_workshops"] === "Occasionally") {
    improvements.push("Industry Exposure");
    recommendations.push("Increase participation in industry events, workshops, and webinars to expand your network.");
  }
  if (answers["q12_certifications"] === "None") {
    recommendations.push("Pursue relevant professional certifications in your industry to validate your expertise.");
  }
  if (Number(answers["q21_public_speaking"]) <= 3) {
    improvements.push("Public Speaking");
    recommendations.push("Join a public speaking group (e.g., Toastmasters) or practice presenting to build confidence.");
  }
  if (Number(answers["q22_interview_readiness"]) <= 3) {
    improvements.push("Interview Skills");
    recommendations.push("Conduct mock interviews with peers or mentors to improve response delivery.");
  }

  // Fallbacks if no specific recommendations trigger
  if (recommendations.length === 0) {
    recommendations.push("Continue maintaining your excellent profile and expanding your network.");
    recommendations.push("Consider mentoring junior students to build leadership experience.");
  }
  
  if (strengths.length === 0) {
    strengths.push("Willingness to Assess Readiness");
  }

  // Cap recommendations
  const finalRecommendations = recommendations.slice(0, 3);
  const finalImprovements = improvements.slice(0, 3);

  return {
    totalScore,
    category,
    strengths,
    improvements: finalImprovements.length > 0 ? finalImprovements : ["Targeted Skill Development"],
    recommendations: finalRecommendations
  };
};
