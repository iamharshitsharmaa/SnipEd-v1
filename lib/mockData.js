// Mock data for development when Supabase is not configured
export const isSupabaseConfigured = false

// Mock user data
export const mockUser = {
  id: "mock-user-id",
  email: "user@example.com",
  username: "testuser",
  full_name: "Test User",
  avatar_url: "/placeholder.svg?height=40&width=40&text=TU",
  bio: "Learning enthusiast",
  created_at: new Date().toISOString(),
}

// Mock reels data
export const mockReels = [
  {
    id: "1",
    title: "React Hooks in 60 Seconds",
    description: "Learn the basics of React hooks with this quick tutorial",
    video_url: "/placeholder-video.mp4",
    thumbnail_url: "/placeholder.svg?height=400&width=300&text=React+Hooks",
    view_count: 15420,
    like_count: 892,
    comment_count: 45,
    share_count: 23,
    creator: {
      id: "creator-1",
      username: "reactdev",
      full_name: "React Developer",
      avatar_url: "/placeholder.svg?height=40&width=40&text=RD",
      is_verified: true,
    },
    created_at: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    title: "CSS Grid Layout Magic",
    description: "Master CSS Grid with this visual guide",
    video_url: "/placeholder-video.mp4",
    thumbnail_url: "/placeholder.svg?height=400&width=300&text=CSS+Grid",
    view_count: 23100,
    like_count: 1205,
    comment_count: 67,
    share_count: 34,
    creator: {
      id: "creator-2",
      username: "cssmaster",
      full_name: "CSS Master",
      avatar_url: "/placeholder.svg?height=40&width=40&text=CM",
      is_verified: true,
    },
    created_at: "2024-01-14T15:45:00Z",
  },
]

// Mock categories data
export const mockCategories = [
  {
    id: "1",
    name: "Technology",
    description: "Latest tech trends and innovations",
    icon: "⚡",
    color: "#3B82F6",
  },
  {
    id: "2",
    name: "Programming",
    description: "Coding tutorials and development",
    icon: "💻",
    color: "#10B981",
  },
  {
    id: "3",
    name: "Comedy",
    description: "Entertainment and humor",
    icon: "😂",
    color: "#F59E0B",
  },
]

// Mock Supabase client for development
export const supabase = {
  auth: {
    getUser: async () => ({ data: { user: mockUser }, error: null }),
    signUp: async (credentials) => ({ data: { user: mockUser }, error: null }),
    signInWithPassword: async (credentials) => ({ data: { user: mockUser }, error: null }),
    signOut: async () => ({ error: null }),
  },
  from: (table) => ({
    select: () => ({
      eq: () => ({ data: mockReels, error: null }),
    }),
    insert: () => ({ data: null, error: null }),
    delete: () => ({
      eq: () => ({
        eq: () => ({ data: null, error: null }),
      }),
    }),
  }),
}
