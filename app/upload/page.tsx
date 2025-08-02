"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BackButton } from "@/components/ui/back-button"
import {
  Upload,
  Video,
  ImageIcon,
  Music,
  FileText,
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Settings,
  Eye,
  Globe,
  Lock,
} from "lucide-react"

const categories = [
  "Education",
  "Technology",
  "Lifestyle",
  "Entertainment",
  "Business",
  "Health",
  "Art",
  "Music",
  "Sports",
  "Travel",
  "Food",
  "Fashion",
]

const privacyOptions = [
  { value: "public", label: "Public", icon: Globe, description: "Anyone can view" },
  { value: "unlisted", label: "Unlisted", icon: Eye, description: "Only with link" },
  { value: "private", label: "Private", icon: Lock, description: "Only you" },
]

export default function UploadPage() {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [privacy, setPrivacy] = useState("public")
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0])
    }
  }

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handleUpload = async () => {
    if (!uploadedFile || !title.trim()) return

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          // Reset form or redirect
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("video/")) return Video
    if (file.type.startsWith("image/")) return ImageIcon
    if (file.type.startsWith("audio/")) return Music
    return FileText
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-pink-900/20 via-transparent to-transparent" />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <BackButton
              href="/"
              label="Back to Home"
              className="bg-black/60 backdrop-blur-md border border-white/10 text-white hover:bg-black/80"
            />
            <div>
              <h1 className="text-3xl font-bold text-white">Upload Content</h1>
              <p className="text-gray-400">Share your knowledge with the world</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* File Upload */}
            <Card className="bg-black/40 backdrop-blur-md border border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Upload className="w-5 h-5 mr-2" />
                  Upload File
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Drag and drop your video, image, or audio file here
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!uploadedFile ? (
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                      dragActive ? "border-purple-500 bg-purple-500/10" : "border-gray-600 hover:border-gray-500"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-white mb-2">Drop your file here, or click to browse</p>
                    <p className="text-sm text-gray-400 mb-4">Supports MP4, MOV, AVI, JPG, PNG, MP3, WAV (Max 500MB)</p>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept="video/*,image/*,audio/*"
                      className="hidden"
                      id="file-upload"
                    />
                    <Button
                      asChild
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      <label htmlFor="file-upload" className="cursor-pointer">
                        Choose File
                      </label>
                    </Button>
                  </div>
                ) : (
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {(() => {
                          const IconComponent = getFileIcon(uploadedFile)
                          return <IconComponent className="w-8 h-8 text-purple-400" />
                        })()}
                        <div>
                          <p className="text-white font-medium">{uploadedFile.name}</p>
                          <p className="text-sm text-gray-400">{(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setUploadedFile(null)}
                        className="text-gray-400 hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    {uploadedFile.type.startsWith("video/") && (
                      <div className="bg-black/50 rounded-lg p-4 mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white text-sm">Preview</span>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="ghost" onClick={() => setIsPlaying(!isPlaying)}>
                              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => setIsMuted(!isMuted)}>
                              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                            </Button>
                          </div>
                        </div>
                        <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                          <Video className="w-12 h-12 text-gray-600" />
                        </div>
                      </div>
                    )}

                    {isUploading && (
                      <div className="mt-4">
                        <div className="flex justify-between text-sm text-gray-400 mb-2">
                          <span>Uploading...</span>
                          <span>{Math.round(uploadProgress)}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Content Details */}
            <Card className="bg-black/40 backdrop-blur-md border border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Content Details</CardTitle>
                <CardDescription className="text-gray-400">
                  Add title, description, and tags for your content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-white">
                    Title *
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter a catchy title..."
                    className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="text-white">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your content..."
                    rows={4}
                    className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 mt-1"
                  />
                </div>

                <div>
                  <Label className="text-white">Categories</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {categories.map((category) => (
                      <Badge
                        key={category}
                        variant={selectedCategories.includes(category) ? "default" : "outline"}
                        className={`cursor-pointer transition-all duration-200 ${
                          selectedCategories.includes(category)
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0"
                            : "border-gray-600 text-gray-300 hover:border-gray-500"
                        }`}
                        onClick={() => toggleCategory(category)}
                      >
                        {category}
                        {selectedCategories.includes(category) && <X className="w-3 h-3 ml-1" />}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Settings Sidebar */}
          <div className="space-y-6">
            {/* Privacy Settings */}
            <Card className="bg-black/40 backdrop-blur-md border border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {privacyOptions.map((option) => (
                  <div
                    key={option.value}
                    className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                      privacy === option.value
                        ? "border-purple-500 bg-purple-500/10"
                        : "border-gray-600 hover:border-gray-500"
                    }`}
                    onClick={() => setPrivacy(option.value)}
                  >
                    <div className="flex items-center space-x-3">
                      <option.icon className="w-5 h-5 text-purple-400" />
                      <div>
                        <p className="text-white font-medium">{option.label}</p>
                        <p className="text-sm text-gray-400">{option.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upload Actions */}
            <Card className="bg-black/40 backdrop-blur-md border border-white/10">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <Button
                    onClick={handleUpload}
                    disabled={!uploadedFile || !title.trim() || isUploading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50"
                  >
                    {isUploading ? "Uploading..." : "Publish Content"}
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                    disabled={!uploadedFile || !title.trim()}
                  >
                    Save as Draft
                  </Button>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-700">
                  <p className="text-xs text-gray-400 text-center">
                    By uploading, you agree to our Terms of Service and Community Guidelines
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
