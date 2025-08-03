// This defines the structure for what a "Reel" or video post looks like
export interface Reel {
  id: string;
  video_url: string;
  description: string;
  user: {
    username: string;
    avatar: string;
  };
  likes: number;
  comments: number;
  shares: number;
  song_name: string;
}

// Corrected mock data for your feed
export const mockReels: Reel[] = [
  {
    id: 'mock_1',
    // Using real video URLs for playback
    video_url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    // Combining title and description
    description: 'React Hooks Explained in 60 Seconds\n\nLearn the basics of React Hooks with this quick tutorial. Perfect for beginners who want to understand useState and useEffect! #React #WebDev #Programming',
    // Renaming 'creator' to 'user' and 'avatar_url' to 'avatar'
    user: {
      username: 'reactmaster',
      avatar: '/placeholder.svg?height=40&width=40&text=SJ',
    },
    // Renaming properties to match the Reel type
    likes: 1250,
    comments: 89,
    // Adding missing properties
    shares: 42,
    song_name: 'Upbeat Tech - Corporate Music',
  },
  {
    id: 'mock_2',
    video_url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    description: 'CSS Grid Layout Tricks\n\nMaster CSS Grid with these amazing layout tricks! Create responsive designs that look great on any device. #CSS #WebDesign #Frontend',
    user: {
      username: 'cssqueen',
      avatar: '/placeholder.svg?height=40&width=40&text=ED',
    },
    likes: 2100,
    comments: 156,
    shares: 98,
    song_name: 'Creative Minds - Lofi Beats',
  },
  {
    id: 'mock_3',
    video_url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    description: 'JavaScript ES6 Features You Must Know\n\nDiscover the most important ES6 features that every JavaScript developer should master. Arrow functions, destructuring, and more! #JavaScript #ES6 #WebDev',
    user: {
      username: 'jsninjas',
      avatar: '/placeholder.svg?height=40&width=40&text=AR',
    },
    likes: 3400,
    comments: 234,
    shares: 150,
    song_name: 'Future Bass - Electronic Mix',
  },
];


// Including the other mock data you provided
export const mockCourses = [
 {
   id: "1",
   title: "Complete React Development Course",
   description: "Master React from basics to advanced concepts. Build real-world projects and become a React expert.",
   thumbnail_url: "/placeholder.svg?height=200&width=300&text=React+Course",
   price: 89.99,
   original_price: 149.99,
   category: "Programming",
   level: "Intermediate",
   language: "English",
   duration_hours: 12,
   duration_minutes: 30,
   instructor: {
     username: "reactmaster",
     full_name: "Sarah Johnson",
     avatar_url: "/placeholder.svg?height=40&width=40&text=SJ",
   },
   rating: 4.9,
   student_count: 12500,
   lesson_count: 45,
   what_you_learn: [
     "Build modern React applications",
     "Master React Hooks and Context API",
     "Create responsive user interfaces",
     "Deploy React apps to production",
   ],
   requirements: ["Basic JavaScript knowledge", "HTML and CSS fundamentals", "A computer with internet connection"],
   target_audience: [
     "Beginner to intermediate developers",
     "Anyone wanting to learn React",
     "Frontend developers looking to upskill",
   ],
 },
 {
   id: "2",
   title: "UI/UX Design Masterclass",
   description: "Learn professional UI/UX design from industry experts. Create stunning designs that users love.",
   thumbnail_url: "/placeholder.svg?height=200&width=300&text=Design+Course",
   price: 79.99,
   original_price: 129.99,
   category: "Design",
   level: "Beginner",
   language: "English",
   duration_hours: 8,
   duration_minutes: 45,
   instructor: {
     username: "designpro",
     full_name: "Maya Patel",
     avatar_url: "/placeholder.svg?height=40&width=40&text=MP",
   },
   rating: 4.8,
   student_count: 8900,
   lesson_count: 32,
   what_you_learn: [
     "Design principles and theory",
     "User research and personas",
     "Wireframing and prototyping",
     "Design systems and components",
   ],
   requirements: [
     "No prior design experience needed",
     "Access to design software (Figma recommended)",
     "Creative mindset and willingness to learn",
   ],
   target_audience: [
     "Aspiring UI/UX designers",
     "Developers wanting to learn design",
     "Career changers interested in design",
   ],
 },
 {
   id: "3",
   title: "Digital Marketing Strategy",
   description: "Master digital marketing with proven strategies. Learn SEO, social media, and content marketing.",
   thumbnail_url: "/placeholder.svg?height=200&width=300&text=Marketing+Course",
   price: 69.99,
   original_price: 119.99,
   category: "Marketing",
   level: "Advanced",
   language: "English",
   duration_hours: 10,
   duration_minutes: 15,
   instructor: {
     username: "marketingguru",
     full_name: "David Kim",
     avatar_url: "/placeholder.svg?height=40&width=40&text=DK",
   },
   rating: 4.7,
   student_count: 15200,
   lesson_count: 38,
   what_you_learn: [
     "SEO and content marketing",
     "Social media advertising",
     "Email marketing campaigns",
     "Analytics and conversion optimization",
   ],
   requirements: [
     "Basic understanding of business",
     "Access to social media platforms",
     "Willingness to experiment and test",
   ],
   target_audience: [
     "Business owners and entrepreneurs",
     "Marketing professionals",
     "Anyone wanting to grow online presence",
   ],
 },
];

export const mockCategories = [
 { id: "1", name: "Technology", description: "Latest tech trends", icon: "⚡", color: "#3B82F6" },
 { id: "2", name: "Programming", description: "Coding tutorials", icon: "💻", color: "#10B981" },
 { id: "3", name: "Design", description: "UI/UX and creative design", icon: "🎨", color: "#8B5CF6" },
 { id: "4", name: "Business", description: "Entrepreneurship and marketing", icon: "💼", color: "#F59E0B" },
 { id: "5", name: "Education", description: "Learning and academic content", icon: "🎓", color: "#6366F1" },
 { id: "6", name: "Health", description: "Fitness and wellness", icon: "💪", color: "#EF4444" },
];