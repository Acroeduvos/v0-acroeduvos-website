-- Enable Row Level Security (RLS) for all tables

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.module_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.problem_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.problem_solutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topic_problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.problem_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Courses policies (public read access)
CREATE POLICY "Courses are viewable by everyone" ON public.courses
    FOR SELECT USING (is_published = true);

CREATE POLICY "Only instructors can manage courses" ON public.courses
    FOR ALL USING (auth.uid() = instructor_id);

-- Course modules policies
CREATE POLICY "Course modules are viewable by everyone" ON public.course_modules
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.courses 
            WHERE courses.id = course_modules.course_id 
            AND courses.is_published = true
        )
    );

-- Module topics policies
CREATE POLICY "Module topics are viewable by everyone" ON public.module_topics
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.course_modules cm
            JOIN public.courses c ON c.id = cm.course_id
            WHERE cm.id = module_topics.module_id 
            AND c.is_published = true
        )
    );

-- Problems policies (public read access)
CREATE POLICY "Problems are viewable by everyone" ON public.problems
    FOR SELECT USING (true);

-- Problem companies policies
CREATE POLICY "Problem companies are viewable by everyone" ON public.problem_companies
    FOR SELECT USING (true);

-- Problem solutions policies
CREATE POLICY "Problem solutions are viewable by everyone" ON public.problem_solutions
    FOR SELECT USING (true);

-- Topic problems policies
CREATE POLICY "Topic problems are viewable by everyone" ON public.topic_problems
    FOR SELECT USING (true);

-- User progress policies (users can only see their own progress)
CREATE POLICY "Users can view their own progress" ON public.user_progress
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress" ON public.user_progress
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" ON public.user_progress
    FOR UPDATE USING (auth.uid() = user_id);

-- Problem submissions policies (users can only see their own submissions)
CREATE POLICY "Users can view their own submissions" ON public.problem_submissions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own submissions" ON public.problem_submissions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- User achievements policies
CREATE POLICY "Users can view their own achievements" ON public.user_achievements
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own achievements" ON public.user_achievements
    FOR INSERT WITH CHECK (auth.uid() = user_id);
