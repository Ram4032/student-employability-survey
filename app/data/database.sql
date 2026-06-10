-- Supabase Database Schema for 'Could You Get Hired Today?'

CREATE TABLE employability_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    score INT NOT NULL,
    category TEXT NOT NULL,
    
    -- Section 1: About You
    q1_age_group TEXT,
    q2_gender TEXT,
    q3_edu_level TEXT,
    q4_degree_stream TEXT,
    q5_current_year TEXT,
    
    -- Section 2: Academic Profile
    q6_academic_perf TEXT,
    q7_backlogs TEXT,
    q8_study_hours TEXT,
    q9_attendance TEXT,
    q10_assignments INT,
    
    -- Section 3: Experience & Development
    q11_internships TEXT,
    q12_certifications TEXT,
    q13_projects TEXT,
    q14_competitions TEXT,
    q15_leadership TEXT,
    q16_independent_learning INT,
    
    -- Section 4: Career Readiness
    q17_communication INT,
    q18_problem_solving INT,
    q19_teamwork INT,
    q20_leadership_ability INT,
    q21_public_speaking INT,
    q22_interview_readiness INT,
    q23_aptitude_confidence INT,
    q24_adaptability INT,
    q25_stress_handling INT,
    
    -- Section 5: Industry Exposure
    q26_workshops TEXT,
    q27_resume_portfolio TEXT,
    q28_career_guidance TEXT,
    q29_networking TEXT,
    
    -- Section 6: Employment Outcome
    q30_recruitment_participation TEXT,
    q31_current_status TEXT,
    q32_applications TEXT,
    q33_interviews TEXT
);

-- Row Level Security Setup
ALTER TABLE employability_responses ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert responses
CREATE POLICY "Allow anonymous insert" ON employability_responses
    FOR INSERT 
    WITH CHECK (true);

-- Allow public read for statistics (if needed)
CREATE POLICY "Allow public read" ON employability_responses
    FOR SELECT 
    USING (true);
