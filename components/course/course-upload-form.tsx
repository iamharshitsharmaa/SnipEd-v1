"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Upload, Video, ImageIcon, FileText, CheckCircle, AlertCircle, DollarSign } from "lucide-react"

interface CourseUploadFormProps {
  onSubmit: (data: any) => void
  isLoading?: boolean
}

export function CourseUploadForm({ onSubmit, isLoading = false }: CourseUploadFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    level: "",
    price: "",
    thumbnail: null as File | null,
    videoFile: null as File | null,
  })
  const [uploadProgress, setUploadProgress] = useState(0)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const categories = [
    { value: "programming", label: "Programming" },
    { value: "design", label: "Design" },
    { value: "business", label: "Business" },
    { value: "technology", label: "Technology" },
  ]

  const levels = [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleFileUpload = (field: "thumbnail" | "videoFile", file: File) => {
    setFormData((prev) => ({ ...prev, [field]: file }))

    // Simulate upload progress
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) newErrors.title = "Title is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (!formData.category) newErrors.category = "Category is required"
    if (!formData.level) newErrors.level = "Level is required"
    if (!formData.price) newErrors.price = "Price is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <Card className="bg-black/40 backdrop-blur-md border border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Course Information
          </CardTitle>
          <CardDescription className="text-gray-400">Provide basic details about your course</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white">
              Course Title *
            </Label>
            <Input
              id="title"
              placeholder="Enter course title..."
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
            />
            {errors.title && (
              <p className="text-red-400 text-sm flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.title}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-white">
              Description *
            </Label>
            <Textarea
              id="description"
              placeholder="Describe what students will learn..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 min-h-[100px]"
            />
            {errors.description && (
              <p className="text-red-400 text-sm flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value} className="text-white">
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-red-400 text-sm flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.category}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-white">Level *</Label>
              <Select value={formData.level} onValueChange={(value) => handleInputChange("level", value)}>
                <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  {levels.map((level) => (
                    <SelectItem key={level.value} value={level.value} className="text-white">
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.level && (
                <p className="text-red-400 text-sm flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.level}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price" className="text-white">
              Price (USD) *
            </Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="price"
                type="number"
                placeholder="99.99"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 pl-10"
              />
            </div>
            {errors.price && (
              <p className="text-red-400 text-sm flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.price}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Media Upload */}
      <Card className="bg-black/40 backdrop-blur-md border border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Upload className="w-5 h-5 mr-2" />
            Course Media
          </CardTitle>
          <CardDescription className="text-gray-400">Upload thumbnail and course video</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Thumbnail Upload */}
          <div className="space-y-2">
            <Label className="text-white">Course Thumbnail</Label>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
              {formData.thumbnail ? (
                <div className="space-y-4">
                  <img
                    src={URL.createObjectURL(formData.thumbnail) || "/placeholder.svg"}
                    alt="Thumbnail preview"
                    className="w-32 h-20 object-cover rounded-lg mx-auto"
                  />
                  <p className="text-gray-300">{formData.thumbnail.name}</p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setFormData((prev) => ({ ...prev, thumbnail: null }))}
                    className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <ImageIcon className="w-12 h-12 text-gray-400 mx-auto" />
                  <div>
                    <p className="text-gray-300 mb-2">Upload course thumbnail</p>
                    <p className="text-gray-500 text-sm">Recommended: 1280x720px, JPG or PNG</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleFileUpload("thumbnail", file)
                    }}
                    className="hidden"
                    id="thumbnail-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("thumbnail-upload")?.click()}
                    className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Choose File
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Video Upload */}
          <div className="space-y-2">
            <Label className="text-white">Course Video</Label>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
              {formData.videoFile ? (
                <div className="space-y-4">
                  <Video className="w-12 h-12 text-green-400 mx-auto" />
                  <div>
                    <p className="text-gray-300">{formData.videoFile.name}</p>
                    <p className="text-gray-500 text-sm">{(formData.videoFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="space-y-2">
                      <Progress value={uploadProgress} className="w-full" />
                      <p className="text-gray-400 text-sm">Uploading... {uploadProgress}%</p>
                    </div>
                  )}
                  {uploadProgress === 100 && (
                    <div className="flex items-center justify-center space-x-2 text-green-400">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">Upload complete</span>
                    </div>
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setFormData((prev) => ({ ...prev, videoFile: null }))}
                    className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Video className="w-12 h-12 text-gray-400 mx-auto" />
                  <div>
                    <p className="text-gray-300 mb-2">Upload course video</p>
                    <p className="text-gray-500 text-sm">MP4, MOV, or AVI up to 2GB</p>
                  </div>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleFileUpload("videoFile", file)
                    }}
                    className="hidden"
                    id="video-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("video-upload")?.click()}
                    className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Choose File
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
        >
          Save as Draft
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          {isLoading ? "Creating..." : "Create Course"}
        </Button>
      </div>
    </form>
  )
}
