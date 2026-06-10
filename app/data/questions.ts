export type QuestionType = "single-choice" | "likert";

export interface Option {
  label: string;
  value: number | string;
  weight?: number; // Score weighting used in scoring algorithm
}

export interface Question {
  id: string; // e.g., 'q1_age_group'
  text: string;
  type: QuestionType;
  options: Option[];
}

export interface Section {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}

export const surveyData: Section[] = [
  {
    id: "section_1",
    title: "SECTION 1: ABOUT YOU",
    questions: [
      {
        id: "q1_age_group",
        text: "Age Group",
        type: "single-choice",
        options: [
          { label: "Below 18", value: "Below 18" },
          { label: "18–20", value: "18–20" },
          { label: "21–23", value: "21–23" },
          { label: "24–26", value: "24–26" },
          { label: "Above 26", value: "Above 26" },
        ],
      },
      {
        id: "q2_gender",
        text: "Gender",
        type: "single-choice",
        options: [
          { label: "Male", value: "Male" },
          { label: "Female", value: "Female" },
          { label: "Non-binary", value: "Non-binary" },
          { label: "Prefer not to say", value: "Prefer not to say" },
        ],
      },
      {
        id: "q3_edu_level",
        text: "Current Educational Level",
        type: "single-choice",
        options: [
          { label: "Undergraduate", value: "Undergraduate" },
          { label: "Postgraduate", value: "Postgraduate" },
          { label: "Recent Graduate", value: "Recent Graduate" },
        ],
      },
      {
        id: "q4_degree_stream",
        text: "Degree Stream",
        type: "single-choice",
        options: [
          { label: "Science", value: "Science" },
          { label: "Commerce", value: "Commerce" },
          { label: "Arts & Humanities", value: "Arts & Humanities" },
          { label: "Engineering & Technology", value: "Engineering & Technology" },
          { label: "Management", value: "Management" },
          { label: "Social Sciences", value: "Social Sciences" },
          { label: "Other", value: "Other" },
        ],
      },
      {
        id: "q5_current_year",
        text: "Current Year",
        type: "single-choice",
        options: [
          { label: "First Year", value: "First Year" },
          { label: "Second Year", value: "Second Year" },
          { label: "Third Year", value: "Third Year" },
          { label: "Fourth Year", value: "Fourth Year" },
          { label: "Fifth Year or Above", value: "Fifth Year or Above" },
          { label: "Graduated", value: "Graduated" },
        ],
      },
    ],
  },
  {
    id: "section_2",
    title: "SECTION 2: ACADEMIC PROFILE",
    questions: [
      {
        id: "q6_academic_perf",
        text: "How would you describe your academic performance?",
        type: "single-choice",
        options: [
          { label: "Below Average", value: "Below Average", weight: 10 },
          { label: "Average", value: "Average", weight: 30 },
          { label: "Above Average", value: "Above Average", weight: 50 },
          { label: "Good", value: "Good", weight: 75 },
          { label: "Excellent", value: "Excellent", weight: 100 },
        ],
      },
      {
        id: "q7_backlogs",
        text: "Have you ever had academic backlogs/failures?",
        type: "single-choice",
        options: [
          { label: "Yes", value: "Yes", weight: 40 },
          { label: "No", value: "No", weight: 100 },
        ],
      },
      {
        id: "q8_study_hours",
        text: "How many hours do you study outside class each week?",
        type: "single-choice",
        options: [
          { label: "Less than 2", value: "Less than 2", weight: 20 },
          { label: "2–5", value: "2–5", weight: 50 },
          { label: "6–10", value: "6–10", weight: 80 },
          { label: "More than 10", value: "More than 10", weight: 100 },
        ],
      },
      {
        id: "q9_attendance",
        text: "How often do you attend classes?",
        type: "single-choice",
        options: [
          { label: "Less than 50%", value: "Less than 50%", weight: 20 },
          { label: "50–70%", value: "50–70%", weight: 50 },
          { label: "70–85%", value: "70–85%", weight: 80 },
          { label: "More than 85%", value: "More than 85%", weight: 100 },
        ],
      },
      {
        id: "q10_assignments",
        text: "How often do you complete assignments before deadlines?",
        type: "likert",
        options: [
          { label: "1 - Never", value: 1, weight: 20 },
          { label: "2 - Rarely", value: 2, weight: 40 },
          { label: "3 - Sometimes", value: 3, weight: 60 },
          { label: "4 - Frequently", value: 4, weight: 80 },
          { label: "5 - Always", value: 5, weight: 100 },
        ],
      },
    ],
  },
  {
    id: "section_3",
    title: "SECTION 3: EXPERIENCE & DEVELOPMENT",
    questions: [
      {
        id: "q11_internships",
        text: "Internships Completed",
        type: "single-choice",
        options: [
          { label: "None", value: "None", weight: 0 },
          { label: "One", value: "One", weight: 50 },
          { label: "Two", value: "Two", weight: 80 },
          { label: "Three or More", value: "Three or More", weight: 100 },
        ],
      },
      {
        id: "q12_certifications",
        text: "Professional Certifications",
        type: "single-choice",
        options: [
          { label: "None", value: "None", weight: 0 },
          { label: "One", value: "One", weight: 40 },
          { label: "Two to Three", value: "Two to Three", weight: 80 },
          { label: "More than Three", value: "More than Three", weight: 100 },
        ],
      },
      {
        id: "q13_projects",
        text: "Projects Completed",
        type: "single-choice",
        options: [
          { label: "None", value: "None", weight: 0 },
          { label: "1–2", value: "1–2", weight: 40 },
          { label: "3–5", value: "3–5", weight: 80 },
          { label: "More than 5", value: "More than 5", weight: 100 },
        ],
      },
      {
        id: "q14_competitions",
        text: "Participation in competitions, hackathons, research projects, case studies, or similar activities",
        type: "single-choice",
        options: [
          { label: "Never", value: "Never", weight: 0 },
          { label: "Once", value: "Once", weight: 40 },
          { label: "2–3 Times", value: "2–3 Times", weight: 80 },
          { label: "More than 3 Times", value: "More than 3 Times", weight: 100 },
        ],
      },
      {
        id: "q15_leadership",
        text: "Have you held a leadership or responsibility position?",
        type: "single-choice",
        options: [
          { label: "Yes", value: "Yes", weight: 100 },
          { label: "No", value: "No", weight: 40 },
        ],
      },
      {
        id: "q16_independent_learning",
        text: "How often do you learn new skills independently?",
        type: "likert",
        options: [
          { label: "1 - Never", value: 1, weight: 20 },
          { label: "2 - Rarely", value: 2, weight: 40 },
          { label: "3 - Sometimes", value: 3, weight: 60 },
          { label: "4 - Frequently", value: 4, weight: 80 },
          { label: "5 - Always", value: 5, weight: 100 },
        ],
      },
    ],
  },
  {
    id: "section_4",
    title: "SECTION 4: CAREER READINESS",
    questions: [
      {
        id: "q17_communication",
        text: "Communication Skills",
        type: "likert",
        options: [
          { label: "1 - Poor", value: 1, weight: 20 },
          { label: "2 - Fair", value: 2, weight: 40 },
          { label: "3 - Good", value: 3, weight: 60 },
          { label: "4 - Very Good", value: 4, weight: 80 },
          { label: "5 - Excellent", value: 5, weight: 100 },
        ],
      },
      {
        id: "q18_problem_solving",
        text: "Problem-Solving Ability",
        type: "likert",
        options: [
          { label: "1", value: 1, weight: 20 },
          { label: "2", value: 2, weight: 40 },
          { label: "3", value: 3, weight: 60 },
          { label: "4", value: 4, weight: 80 },
          { label: "5", value: 5, weight: 100 },
        ],
      },
      {
        id: "q19_teamwork",
        text: "Teamwork Ability",
        type: "likert",
        options: [
          { label: "1", value: 1, weight: 20 },
          { label: "2", value: 2, weight: 40 },
          { label: "3", value: 3, weight: 60 },
          { label: "4", value: 4, weight: 80 },
          { label: "5", value: 5, weight: 100 },
        ],
      },
      {
        id: "q20_leadership_ability",
        text: "Leadership Ability",
        type: "likert",
        options: [
          { label: "1", value: 1, weight: 20 },
          { label: "2", value: 2, weight: 40 },
          { label: "3", value: 3, weight: 60 },
          { label: "4", value: 4, weight: 80 },
          { label: "5", value: 5, weight: 100 },
        ],
      },
      {
        id: "q21_public_speaking",
        text: "Public Speaking Confidence",
        type: "likert",
        options: [
          { label: "1", value: 1, weight: 20 },
          { label: "2", value: 2, weight: 40 },
          { label: "3", value: 3, weight: 60 },
          { label: "4", value: 4, weight: 80 },
          { label: "5", value: 5, weight: 100 },
        ],
      },
      {
        id: "q22_interview_readiness",
        text: "Interview Readiness",
        type: "likert",
        options: [
          { label: "1", value: 1, weight: 20 },
          { label: "2", value: 2, weight: 40 },
          { label: "3", value: 3, weight: 60 },
          { label: "4", value: 4, weight: 80 },
          { label: "5", value: 5, weight: 100 },
        ],
      },
      {
        id: "q23_aptitude_confidence",
        text: "Confidence in Aptitude Assessments",
        type: "likert",
        options: [
          { label: "1", value: 1, weight: 20 },
          { label: "2", value: 2, weight: 40 },
          { label: "3", value: 3, weight: 60 },
          { label: "4", value: 4, weight: 80 },
          { label: "5", value: 5, weight: 100 },
        ],
      },
      {
        id: "q24_adaptability",
        text: "Adaptability to New Situations",
        type: "likert",
        options: [
          { label: "1", value: 1, weight: 20 },
          { label: "2", value: 2, weight: 40 },
          { label: "3", value: 3, weight: 60 },
          { label: "4", value: 4, weight: 80 },
          { label: "5", value: 5, weight: 100 },
        ],
      },
      {
        id: "q25_stress_handling",
        text: "Ability to Handle Stress and Pressure",
        type: "likert",
        options: [
          { label: "1", value: 1, weight: 20 },
          { label: "2", value: 2, weight: 40 },
          { label: "3", value: 3, weight: 60 },
          { label: "4", value: 4, weight: 80 },
          { label: "5", value: 5, weight: 100 },
        ],
      },
    ],
  },
  {
    id: "section_5",
    title: "SECTION 5: INDUSTRY EXPOSURE",
    questions: [
      {
        id: "q26_workshops",
        text: "Have you attended career workshops, webinars, networking events, or industry sessions?",
        type: "single-choice",
        options: [
          { label: "Never", value: "Never", weight: 0 },
          { label: "Occasionally", value: "Occasionally", weight: 60 },
          { label: "Frequently", value: "Frequently", weight: 100 },
        ],
      },
      {
        id: "q27_resume_portfolio",
        text: "Do you maintain a resume, portfolio, or professional profile?",
        type: "single-choice",
        options: [
          { label: "Yes", value: "Yes", weight: 100 },
          { label: "No", value: "No", weight: 20 },
        ],
      },
      {
        id: "q28_career_guidance",
        text: "Have you received career guidance or mentoring?",
        type: "single-choice",
        options: [
          { label: "Yes", value: "Yes", weight: 100 },
          { label: "No", value: "No", weight: 40 },
        ],
      },
      {
        id: "q29_networking",
        text: "How often do you network with professionals?",
        type: "single-choice",
        options: [
          { label: "Never", value: "Never", weight: 0 },
          { label: "Rarely", value: "Rarely", weight: 30 },
          { label: "Sometimes", value: "Sometimes", weight: 70 },
          { label: "Frequently", value: "Frequently", weight: 100 },
        ],
      },
    ],
  },
  {
    id: "section_6",
    title: "SECTION 6: EMPLOYMENT OUTCOME",
    questions: [
      {
        id: "q30_recruitment_participation",
        text: "Have you participated in placement or recruitment processes?",
        type: "single-choice",
        options: [
          { label: "Yes", value: "Yes", weight: 100 },
          { label: "No", value: "No", weight: 50 },
        ],
      },
      {
        id: "q31_current_status",
        text: "Current Status",
        type: "single-choice",
        options: [
          { label: "Employed", value: "Employed", weight: 100 },
          { label: "Placed", value: "Placed", weight: 100 },
          { label: "Seeking Opportunities", value: "Seeking Opportunities", weight: 70 },
          { label: "Higher Studies", value: "Higher Studies", weight: 80 },
          { label: "Not Yet Eligible", value: "Not Yet Eligible", weight: 60 },
        ],
      },
      {
        id: "q32_applications",
        text: "How many job/internship applications have you submitted in the past 12 months?",
        type: "single-choice",
        options: [
          { label: "0", value: "0", weight: 30 },
          { label: "1–10", value: "1–10", weight: 60 },
          { label: "11–25", value: "11–25", weight: 80 },
          { label: "More than 25", value: "More than 25", weight: 100 },
        ],
      },
      {
        id: "q33_interviews",
        text: "How many interviews have you attended?",
        type: "single-choice",
        options: [
          { label: "0", value: "0", weight: 30 },
          { label: "1–2", value: "1–2", weight: 60 },
          { label: "3–5", value: "3–5", weight: 90 },
          { label: "More than 5", value: "More than 5", weight: 100 },
        ],
      },
    ],
  },
];

export const getAllQuestions = (): Question[] => {
  return surveyData.flatMap((section) => section.questions);
};
