"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload, Plus, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

interface CourseFormData {
  title: string
  subtitle: string
  description: string
  category: string
  level: string
  language: string
  price: string
  originalPrice: string
  thumbnail: File | null
  learningOutcomes: string[]
  requirements: string[]
  targetAudience: string[]
}

export default function CreateCoursePage() {
  const router = useRouter()
  const [currentTab, setCurrentTab] = useState("basics")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const [formData, setFormData] = useState<CourseFormData>({
    title: "",
    subtitle: "",
    description: "",
    category: "",
    level: "",
    language: "English",
    price: "",
    originalPrice: "",
    thumbnail: null,
    learningOutcomes: [""],
    requirements: [""],
    targetAudience: [""],
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const categories = [
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Machine Learning",
    "UI/UX Design",
    "Digital Marketing",
    "Business",
    "Photography",
    "Music",
    "Health & Fitness",
  ]

  const levels = ["Beginner", "Intermediate", "Advanced", "All Levels"]
  const languages = ["English", "Spanish", "French", "German", "Portuguese", "Chinese", "Japanese"]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) newErrors.title = "Title is required"
    if (!formData.subtitle.trim()) newErrors.subtitle = "Subtitle is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (!formData.category) newErrors.category = "Category is required"
    if (!formData.level) newErrors.level = "Level is required"
    if (!formData.price.trim()) newErrors.price = "Price is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof CourseFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleArrayFieldChange = (field: keyof CourseFormData, index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] as string[]).map((item, i) => (i === index ? value : item)),
    }))
  }

  const addArrayField = (field: keyof CourseFormData) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...(prev[field] as string[]), ""],
    }))
  }

  const removeArrayField = (field: keyof CourseFormData, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index),
    }))
  }

  const handleThumbnailUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, thumbnail: file }))

      // Simulate upload progress
      setIsUploading(true)
      setUploadProgress(0)

      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setIsUploading(false)
            return 100
          }
          return prev + 10
        })
      }, 200)
    }
  }

  const handleSaveDraft = () => {
    console.log("Saving draft:", formData)
    // Simulate save
    setTimeout(() => {
      alert("Draft saved successfully!")
    }, 1000)
  }

  const handleContinue = () => {
    if (validateForm()) {
      console.log("Form data:", formData)
      router.push("/courses/create/curriculum")
    }
  }

  const getCompletionPercentage = () => {
    const requiredFields = ["title", "subtitle", "description", "category", "level", "price"]
    const completedFields = requiredFields.filter((field) => formData[field as keyof CourseFormData])
    return Math.round((completedFields.length / requiredFields.length) * 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => router.back()}
                  className="text-white hover:bg-white/10"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                  <h1 className="text-xl font-bold text-white">Create New Course</h1>
                  <p className="text-sm text-gray-400">Step 1 of 3: Course Information</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-sm text-gray-400">{getCompletionPercentage()}% complete</div>
                <Progress value={getCompletionPercentage()} className="w-24" />
                <Button
                  variant="outline"
                  onClick={handleSaveDraft}
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  Save Draft
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white/5 border border-white/10">
              <TabsTrigger value="basics" className="data-[state=active]:bg-purple-600">
                Basics
              </TabsTrigger>
              <TabsTrigger value="details" className="data-[state=active]:bg-purple-600">
                Details
              </TabsTrigger>
              <TabsTrigger value="pricing" className="data-[state=active]:bg-purple-600">
                Pricing
              </TabsTrigger>
              <TabsTrigger value="media" className="data-[state=active]:bg-purple-600">
                Media
              </TabsTrigger>
            </TabsList>

            {/* Course Basics */}
            <TabsContent value="basics" className="space-y-6">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Course Basics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-white">
                      Course Title *
                    </Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder="e.g., Complete React Development Course"
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                    />
                    {errors.title && <p className="text-red-400 text-sm">{errors.title}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subtitle" className="text-white">
                      Course Subtitle *
                    </Label>
                    <Input
                      id="subtitle"
                      value={formData.subtitle}
                      onChange={(e) => handleInputChange("subtitle", e.target.value)}
                      placeholder="e.g., Learn React from basics to advanced concepts"
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                    />
                    {errors.subtitle && <p className="text-red-400 text-sm">{errors.subtitle}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-white">
                      Course Description *
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Describe what students will learn in this course..."
                      rows={4}
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                    />
                    {errors.description && <p className="text-red-400 text-sm">{errors.description}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-white">Category *</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger className="bg-white/5 border-white/20 text-white">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.category && <p className="text-red-400 text-sm">{errors.category}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">Level *</Label>
                      <Select value={formData.level} onValueChange={(value) => handleInputChange("level", value)}>
                        <SelectTrigger className="bg-white/5 border-white/20 text-white">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          {levels.map((level) => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.level && <p className="text-red-400 text-sm">{errors.level}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">Language</Label>
                      <Select value={formData.language} onValueChange={(value) => handleInputChange("language", value)}>
                        <SelectTrigger className="bg-white/5 border-white/20 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {languages.map((language) => (
                            <SelectItem key={language} value={language}>
                              {language}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Course Details */}
            <TabsContent value="details" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Learning Outcomes */}
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">What will students learn?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {formData.learningOutcomes.map((outcome, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          value={outcome}
                          onChange={(e) => handleArrayFieldChange("learningOutcomes", index, e.target.value)}
                          placeholder="e.g., Build modern React applications"
                          className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                        />
                        {formData.learningOutcomes.length > 1 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeArrayField("learningOutcomes", index)}
                            className="text-red-400 hover:bg-red-400/10"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => addArrayField("learningOutcomes")}
                      className="w-full border-white/20 text-white hover:bg-white/10"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Learning Outcome
                    </Button>
                  </CardContent>
                </Card>

                {/* Requirements */}
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Requirements</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {formData.requirements.map((requirement, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          value={requirement}
                          onChange={(e) => handleArrayFieldChange("requirements", index, e.target.value)}
                          placeholder="e.g., Basic JavaScript knowledge"
                          className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                        />
                        {formData.requirements.length > 1 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeArrayField("requirements", index)}
                            className="text-red-400 hover:bg-red-400/10"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => addArrayField("requirements")}
                      className="w-full border-white/20 text-white hover:bg-white/10"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Requirement
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Target Audience */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Who is this course for?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.targetAudience.map((audience, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={audience}
                        onChange={(e) => handleArrayFieldChange("targetAudience", index, e.target.value)}
                        placeholder="e.g., Beginner developers wanting to learn React"
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                      />
                      {formData.targetAudience.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeArrayField("targetAudience", index)}
                          className="text-red-400 hover:bg-red-400/10"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => addArrayField("targetAudience")}
                    className="w-full border-white/20 text-white hover:bg-white/10"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Target Audience
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Pricing */}
            <TabsContent value="pricing" className="space-y-6">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Course Pricing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="price" className="text-white">
                        Course Price (USD) *
                      </Label>
                      <Input
                        id="price"
                        type="number"
                        value={formData.price}
                        onChange={(e) => handleInputChange("price", e.target.value)}
                        placeholder="99.99"
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                      />
                      {errors.price && <p className="text-red-400 text-sm">{errors.price}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="originalPrice" className="text-white">
                        Original Price (Optional)
                      </Label>
                      <Input
                        id="originalPrice"
                        type="number"
                        value={formData.originalPrice}
                        onChange={(e) => handleInputChange("originalPrice", e.target.value)}
                        placeholder="149.99"
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  {formData.price && formData.originalPrice && (
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-medium">Discount Preview</p>
                          <p className="text-gray-400 text-sm">
                            Students save $
                            {(Number.parseFloat(formData.originalPrice) - Number.parseFloat(formData.price)).toFixed(2)}
                          </p>
                        </div>
                        <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                          {Math.round(
                            ((Number.parseFloat(formData.originalPrice) - Number.parseFloat(formData.price)) /
                              Number.parseFloat(formData.originalPrice)) *
                              100,
                          )}
                          % OFF
                        </Badge>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Media */}
            <TabsContent value="media" className="space-y-6">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Course Thumbnail</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center">
                    {formData.thumbnail ? (
                      <div className="space-y-4">
                        <div className="w-32 h-20 mx-auto bg-white/10 rounded-lg flex items-center justify-center">
                          <Check className="h-8 w-8 text-green-400" />
                        </div>
                        <div>
                          <p className="text-white font-medium">{formData.thumbnail.name}</p>
                          <p className="text-gray-400 text-sm">
                            {(formData.thumbnail.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        {isUploading && (
                          <div className="space-y-2">
                            <Progress value={uploadProgress} className="w-full" />
                            <p className="text-gray-400 text-sm">Uploading... {uploadProgress}%</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                        <div>
                          <p className="text-white font-medium">Upload course thumbnail</p>
                          <p className="text-gray-400 text-sm">Recommended: 1280x720 pixels, JPG or PNG, max 5MB</p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleThumbnailUpload}
                          className="hidden"
                          id="thumbnail-upload"
                        />
                        <Button
                          variant="outline"
                          onClick={() => document.getElementById("thumbnail-upload")?.click()}
                          className="border-white/20 text-white hover:bg-white/10"
                        >
                          Choose File
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-white/10">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              onClick={handleContinue}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              Continue to Curriculum
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
