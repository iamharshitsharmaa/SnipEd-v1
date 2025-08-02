-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  website TEXT,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories table
CREATE TABLE public.categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  color TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reels table
CREATE TABLE public.reels (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  category_id UUID REFERENCES public.categories(id),
  duration INTEGER, -- in seconds
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Courses table
CREATE TABLE public.courses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  price DECIMAL(10,2),
  original_price DECIMAL(10,2),
  category_id UUID REFERENCES public.categories(id),
  level TEXT CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  language TEXT DEFAULT 'English',
  duration_hours INTEGER DEFAULT 0,
  duration_minutes INTEGER DEFAULT 0,
  what_you_learn TEXT[], -- Array of learning outcomes
  requirements TEXT[], -- Array of requirements
  target_audience TEXT[], -- Array of target audience
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Course sections table
CREATE TABLE public.course_sections (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Course lessons table
CREATE TABLE public.course_lessons (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  section_id UUID REFERENCES public.course_sections(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT,
  duration_seconds INTEGER DEFAULT 0,
  order_index INTEGER NOT NULL,
  is_preview BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Course enrollments table
CREATE TABLE public.course_enrollments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  progress_percentage INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- Course reviews table
CREATE TABLE public.course_reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- Reel likes table
CREATE TABLE public.reel_likes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  reel_id UUID REFERENCES public.reels(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, reel_id)
);

-- Comments table
CREATE TABLE public.comments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  reel_id UUID REFERENCES public.reels(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Follows table
CREATE TABLE public.follows (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  follower_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  following_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(follower_id, following_id)
);

-- Insert sample categories
INSERT INTO public.categories (name, description, icon, color) VALUES
('Technology', 'Latest tech trends and innovations', '⚡', '#3B82F6'),
('Programming', 'Coding tutorials and tips', '💻', '#10B981'),
('Design', 'UI/UX and creative design', '🎨', '#8B5CF6'),
('Business', 'Entrepreneurship and marketing', '💼', '#F59E0B'),
('Education', 'Learning and academic content', '🎓', '#6366F1'),
('Health', 'Fitness and wellness tips', '💪', '#EF4444'),
('Cooking', 'Recipes and cooking techniques', '👨‍🍳', '#F97316'),
('Travel', 'Travel guides and experiences', '✈️', '#06B6D4');

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reel_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can read all profiles, but only update their own
CREATE POLICY "Public profiles are viewable by everyone" ON public.users FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON public.users FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

-- Categories are readable by everyone
CREATE POLICY "Categories are viewable by everyone" ON public.categories FOR SELECT USING (true);

-- Reels policies
CREATE POLICY "Published reels are viewable by everyone" ON public.reels FOR SELECT USING (is_published = true);
CREATE POLICY "Users can insert their own reels" ON public.reels FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own reels" ON public.reels FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own reels" ON public.reels FOR DELETE USING (auth.uid() = user_id);

-- Courses policies
CREATE POLICY "Published courses are viewable by everyone" ON public.courses FOR SELECT USING (is_published = true);
CREATE POLICY "Users can view their own courses" ON public.courses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own courses" ON public.courses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own courses" ON public.courses FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own courses" ON public.courses FOR DELETE USING (auth.uid() = user_id);

-- Course sections policies
CREATE POLICY "Course sections are viewable by course owners and enrolled users" ON public.course_sections FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.courses c 
    WHERE c.id = course_id AND (c.user_id = auth.uid() OR c.is_published = true)
  )
);
CREATE POLICY "Users can manage their own course sections" ON public.course_sections FOR ALL USING (
  EXISTS (SELECT 1 FROM public.courses c WHERE c.id = course_id AND c.user_id = auth.uid())
);

-- Course lessons policies
CREATE POLICY "Course lessons are viewable by course owners and enrolled users" ON public.course_lessons FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.course_sections cs
    JOIN public.courses c ON c.id = cs.course_id
    WHERE cs.id = section_id AND (c.user_id = auth.uid() OR c.is_published = true)
  )
);
CREATE POLICY "Users can manage their own course lessons" ON public.course_lessons FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.course_sections cs
    JOIN public.courses c ON c.id = cs.course_id
    WHERE cs.id = section_id AND c.user_id = auth.uid()
  )
);

-- Course enrollments policies
CREATE POLICY "Users can view their own enrollments" ON public.course_enrollments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can enroll themselves" ON public.course_enrollments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own enrollment progress" ON public.course_enrollments FOR UPDATE USING (auth.uid() = user_id);

-- Course reviews policies
CREATE POLICY "Reviews are viewable by everyone" ON public.course_reviews FOR SELECT USING (true);
CREATE POLICY "Users can insert their own reviews" ON public.course_reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own reviews" ON public.course_reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own reviews" ON public.course_reviews FOR DELETE USING (auth.uid() = user_id);

-- Likes policies
CREATE POLICY "Likes are viewable by everyone" ON public.reel_likes FOR SELECT USING (true);
CREATE POLICY "Users can insert their own likes" ON public.reel_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own likes" ON public.reel_likes FOR DELETE USING (auth.uid() = user_id);

-- Comments policies
CREATE POLICY "Comments are viewable by everyone" ON public.comments FOR SELECT USING (true);
CREATE POLICY "Users can insert their own comments" ON public.comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own comments" ON public.comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own comments" ON public.comments FOR DELETE USING (auth.uid() = user_id);

-- Follows policies
CREATE POLICY "Follows are viewable by everyone" ON public.follows FOR SELECT USING (true);
CREATE POLICY "Users can insert their own follows" ON public.follows FOR INSERT WITH CHECK (auth.uid() = follower_id);
CREATE POLICY "Users can delete their own follows" ON public.follows FOR DELETE USING (auth.uid() = follower_id);

-- Functions to update counters
CREATE OR REPLACE FUNCTION update_reel_like_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.reels SET like_count = like_count + 1 WHERE id = NEW.reel_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.reels SET like_count = like_count - 1 WHERE id = OLD.reel_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_reel_comment_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.reels SET comment_count = comment_count + 1 WHERE id = NEW.reel_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.reels SET comment_count = comment_count - 1 WHERE id = OLD.reel_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Triggers
CREATE TRIGGER reel_like_count_trigger
  AFTER INSERT OR DELETE ON public.reel_likes
  FOR EACH ROW EXECUTE FUNCTION update_reel_like_count();

CREATE TRIGGER reel_comment_count_trigger
  AFTER INSERT OR DELETE ON public.comments
  FOR EACH ROW EXECUTE FUNCTION update_reel_comment_count();

-- Updated at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reels_updated_at BEFORE UPDATE ON public.reels FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON public.courses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_course_sections_updated_at BEFORE UPDATE ON public.course_sections FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_course_lessons_updated_at BEFORE UPDATE ON public.course_lessons FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_course_enrollments_updated_at BEFORE UPDATE ON public.course_enrollments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_course_reviews_updated_at BEFORE UPDATE ON public.course_reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON public.comments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
