"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BackButton } from "@/components/ui/back-button"
import {
  MapPin,
  Calendar,
  LinkIcon,
  Users,
  Video,
  BookOpen,
  Trophy,
  Star,
  Heart,
  MessageCircle,
  Share,
  Play,
  Eye,
  MoreHorizontal,
  UserPlus,
  UserCheck,
} from "lucide-react"

// Mock user data
const userData = {
  username: "codewithsarah",
  displayName: "Sarah Chen",
  avatar: "/placeholder.svg?height=120&width=120&text=SC",
  verified: true,
  bio: "Full-stack developer & educator passionate about making coding accessible to everyone. Building the future one line of code at a time 🚀",
  location: "San Francisco, CA",
  website: "https://sarahchen.dev",
  joinDate: "2022-03-15",
  followers: 234500,
  following: 892,
  stats: {
    videos: 156,
    courses: 12,
    totalViews: "12.5M",
    totalLikes: "890K",
  },
  videos: [
    {
      id: 1,
      title: "10 JavaScript Tricks That Will Blow Your Mind 🤯",
      thumbnail: "/placeholder.svg?height=200&width=300&text=JS+Tricks",
      views: "1.2M",
      likes: "45.2K",
      duration: "8:32",
      uploadDate: "2024-01-15",
    },
    {
      id: 2,
      title: "React Hooks Explained in 5 Minutes",
      thumbnail: "/placeholder.svg?height=200&width=300&text=React+Hooks",
      views: "890K",
      likes: "32.1K",
      duration: "5:47",
      uploadDate: "2024-01-12",
    },
    {
      id: 3,
      title: "CSS Grid vs Flexbox: When to Use What?",
      thumbnail: "/placeholder.svg?height=200&width=300&text=CSS+Grid",
      views: "756K",
      likes: "28.9K",
      duration: "12:15",
      uploadDate: "2024-01-10",
    },
    {
      id: 4,
      title: "Building a REST API with Node.js",
      thumbnail: "/placeholder.svg?height=200&width=300&text=Node+API",
      views: "634K",
      likes: "24.7K",
      duration: "15:23",
      uploadDate: "2024-01-08",
    },
    {
      id: 5,
      title: "TypeScript for Beginners",
      thumbnail: "/placeholder.svg?height=200&width=300&text=TypeScript",
      views: "523K",
      likes: "19.8K",
      duration: "9:41",
      uploadDate: "2024-01-05",
    },
    {
      id: 6,
      title: "Database Design Best Practices",
      thumbnail: "/placeholder.svg?height=200&width=300&text=Database",
      views: "445K",
      likes: "17.2K",
      duration: "11:28",
      uploadDate: "2024-01-03",
    },
  ],
  courses: [
    {
      id: 1,
      title: "Complete React Development Bootcamp",
      thumbnail: "/placeholder.svg?height=200&width=300&text=React+Course",
      students: 45230,
      rating: 4.8,
      price: 89.99,
      lessons: 48,
    },
    {
      id: 2,
      title: "JavaScript Fundamentals Masterclass",
      thumbnail: "/placeholder.svg?height=200&width=300&text=JS+Course",
      students: 32150,
      rating: 4.9,
      price: 79.99,
      lessons: 36,
    },
    {
      id: 3,
      title: "Full-Stack Web Development",
      thumbnail: "/placeholder.svg?height=200&width=300&text=Fullstack",
      students: 28900,
      rating: 4.7,
      price: 129.99,
      lessons: 72,
    },
  ],
  achievements: [
    { id: 1, title: "Top Educator", description: "Reached 1M+ students", icon: Trophy, color: "text-yellow-400" },
    { id: 2, title: "Content Creator", description: "100+ videos published", icon: Video, color: "text-purple-400" },
    { id: 3, title: "Community Builder", description: "250K+ followers", icon: Users, color: "text-blue-400" },
    { id: 4, title: "Course Master", description: "10+ courses created", icon: BookOpen, color: "text-green-400" },
  ],
}

export default function ProfilePage({ params }: { params: { username: string } }) {
  const [isFollowing, setIsFollowing] = useState(false)
  const [activeTab, setActiveTab] = useState("videos")

  const toggleFollow = () => setIsFollowing(!isFollowing)

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-pink-900/20 via-transparent to-transparent" />

      <div className="relative z-10">
        {/* Header */}
        <div className="container mx-auto px-4 py-6">
          <BackButton
            href="/explore"
            label="Back to Explore"
            className="bg-black/60 backdrop-blur-md border border-white/10 text-white hover:bg-black/80"
          />
        </div>

        {/* Profile Header */}
        <div className="container mx-auto px-4 mb-8">
          <Card className="bg-black/40 backdrop-blur-md border border-white/10">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
                {/* Avatar */}
                <Avatar className="w-32 h-32 ring-4 ring-purple-500/20">
                  <AvatarImage src={userData.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-2xl">SC</AvatarFallback>
                </Avatar>

                {/* Profile Info */}
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-3xl font-bold text-white">{userData.displayName}</h1>
                    {userData.verified && <Star className="w-6 h-6 text-blue-400 fill-current" />}
                  </div>
                  <p className="text-gray-400 text-lg mb-1">@{userData.username}</p>

                  <p className="text-gray-300 mb-4 max-w-2xl leading-relaxed">{userData.bio}</p>

                  {/* Profile Details */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
                    {userData.location && (
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{userData.location}</span>
                      </div>
                    )}
                    {userData.website && (
                      <div className="flex items-center space-x-1">
                        <LinkIcon className="w-4 h-4" />
                        <a href={userData.website} className="text-purple-400 hover:text-purple-300 transition-colors">
                          {userData.website.replace("https://", "")}
                        </a>
                      </div>
                    )}
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Joined{" "}
                        {new Date(userData.joinDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                      </span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center space-x-8 mb-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-white">{formatNumber(userData.followers)}</p>
                      <p className="text-gray-400 text-sm">Followers</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-white">{formatNumber(userData.following)}</p>
                      <p className="text-gray-400 text-sm">Following</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-white">{userData.stats.totalViews}</p>
                      <p className="text-gray-400 text-sm">Total Views</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-white">{userData.stats.totalLikes}</p>
                      <p className="text-gray-400 text-sm">Total Likes</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-4">
                    <Button
                      onClick={toggleFollow}
                      className={`px-8 ${
                        isFollowing
                          ? "bg-gray-600 hover:bg-gray-700 text-white"
                          : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      }`}
                    >
                      {isFollowing ? (
                        <>
                          <UserCheck className="w-4 h-4 mr-2" />
                          Following
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4 mr-2" />
                          Follow
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                    >
                      <Share className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Tabs */}
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-black/40 border border-white/10 mb-8">
              <TabsTrigger value="videos" className="text-gray-300 data-[state=active]:text-white">
                Videos ({userData.stats.videos})
              </TabsTrigger>
              <TabsTrigger value="courses" className="text-gray-300 data-[state=active]:text-white">
                Courses ({userData.stats.courses})
              </TabsTrigger>
              <TabsTrigger value="achievements" className="text-gray-300 data-[state=active]:text-white">
                Achievements
              </TabsTrigger>
              <TabsTrigger value="about" className="text-gray-300 data-[state=active]:text-white">
                About
              </TabsTrigger>
            </TabsList>

            <TabsContent value="videos" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userData.videos.map((video) => (
                  <Card
                    key={video.id}
                    className="bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden group hover:border-purple-500/50 transition-all duration-300"
                  >
                    <div className="relative">
                      <img
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button
                          size="lg"
                          variant="ghost"
                          className="w-16 h-16 rounded-full bg-black/50 hover:bg-black/70"
                        >
                          <Play className="w-6 h-6 text-white" />
                        </Button>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-white font-medium mb-2 line-clamp-2">{video.title}</h3>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Eye className="w-3 h-3" />
                            <span>{video.views}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart className="w-3 h-3" />
                            <span>{video.likes}</span>
                          </div>
                        </div>
                        <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="courses" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userData.courses.map((course) => (
                  <Card
                    key={course.id}
                    className="bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden group hover:border-purple-500/50 transition-all duration-300"
                  >
                    <div className="relative">
                      <img
                        src={course.thumbnail || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm px-3 py-1 rounded-full">
                        ${course.price}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-white font-medium mb-2 line-clamp-2">{course.title}</h3>
                      <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                        <div className="flex items-center space-x-1">
                          <Users className="w-3 h-3" />
                          <span>{formatNumber(course.students)} students</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span>{course.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">{course.lessons} lessons</span>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        >
                          View Course
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userData.achievements.map((achievement) => (
                  <Card key={achievement.id} className="bg-black/40 backdrop-blur-md border border-white/10">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center ${achievement.color}`}
                        >
                          <achievement.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-lg">{achievement.title}</h3>
                          <p className="text-gray-400">{achievement.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="about" className="space-y-6">
              <Card className="bg-black/40 backdrop-blur-md border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">About {userData.displayName}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-white font-medium mb-2">Bio</h3>
                    <p className="text-gray-300 leading-relaxed">{userData.bio}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-white font-medium mb-3">Content Stats</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Videos Published</span>
                          <span className="text-white">{userData.stats.videos}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Courses Created</span>
                          <span className="text-white">{userData.stats.courses}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Total Views</span>
                          <span className="text-white">{userData.stats.totalViews}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Total Likes</span>
                          <span className="text-white">{userData.stats.totalLikes}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-white font-medium mb-3">Community</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Followers</span>
                          <span className="text-white">{formatNumber(userData.followers)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Following</span>
                          <span className="text-white">{formatNumber(userData.following)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Member Since</span>
                          <span className="text-white">{new Date(userData.joinDate).getFullYear()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
