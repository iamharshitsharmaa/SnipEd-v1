"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import {
  ArrowLeft,
  Plus,
  GripVertical,
  ChevronDown,
  ChevronRight,
  Play,
  Upload,
  Clock,
  Eye,
  EyeOff,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Lesson {
  id: string
  title: string
  description: string
  duration: number
  videoFile: File | null
  isPreview: boolean
  uploadProgress: number
  isUploading: boolean
}

interface Section {
  id: string
  title: string
  description: string
  lessons: Lesson[]
  isExpanded: boolean
}

export default function CurriculumPage() {
  const router = useRouter()
  const [sections, setSections] = useState<Section[]>([
    {
      id: "section-1",
      title: "Getting Started",
      description: "Introduction to the course and setup",
      isExpanded: true,
      lessons: [
        {
          id: "lesson-1",
          title: "Welcome to the Course",
          description: "Course overview and what you'll learn",
          duration: 5,
          videoFile: null,
          isPreview: true,
          uploadProgress: 0,
          isUploading: false,
        },
        {
          id: "lesson-2",
          title: "Setting Up Your Environment",
          description: "Installing necessary tools and software",
          duration: 10,
          videoFile: null,
          isPreview: false,
          uploadProgress: 0,
          isUploading: false,
        },
      ],
    },
  ])

  const [newSectionTitle, setNewSectionTitle] = useState("")
  const [newLessonTitle, setNewLessonTitle] = useState("")
  const [selectedSectionId, setSelectedSectionId] = useState("")

  const addSection = () => {
    if (!newSectionTitle.trim()) return

    const newSection: Section = {
      id: `section-${Date.now()}`,
      title: newSectionTitle,
      description: "",
      lessons: [],
      isExpanded: true,
    }

    setSections([...sections, newSection])
    setNewSectionTitle("")
  }

  const addLesson = (sectionId: string) => {
    if (!newLessonTitle.trim()) return

    const newLesson: Lesson = {
      id: `lesson-${Date.now()}`,
      title: newLessonTitle,
      description: "",
      duration: 0,
      videoFile: null,
      isPreview: false,
      uploadProgress: 0,
      isUploading: false,
    }

    setSections(
      sections.map((section) =>
        section.id === sectionId ? { ...section, lessons: [...section.lessons, newLesson] } : section,
      ),
    )
    setNewLessonTitle("")
    setSelectedSectionId("")
  }

  const toggleSection = (sectionId: string) => {
    setSections(
      sections.map((section) => (section.id === sectionId ? { ...section, isExpanded: !section.isExpanded } : section)),
    )
  }

  const updateSection = (sectionId: string, field: keyof Section, value: any) => {
    setSections(sections.map((section) => (section.id === sectionId ? { ...section, [field]: value } : section)))
  }

  const updateLesson = (sectionId: string, lessonId: string, field: keyof Lesson, value: any) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              lessons: section.lessons.map((lesson) =>
                lesson.id === lessonId ? { ...lesson, [field]: value } : lesson,
              ),
            }
          : section,
      ),
    )
  }

  const deleteSection = (sectionId: string) => {
    setSections(sections.filter((section) => section.id !== sectionId))
  }

  const deleteLesson = (sectionId: string, lessonId: string) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              lessons: section.lessons.filter((lesson) => lesson.id !== lessonId),
            }
          : section,
      ),
    )
  }

  const handleVideoUpload = (sectionId: string, lessonId: string, file: File) => {
    updateLesson(sectionId, lessonId, "videoFile", file)
    updateLesson(sectionId, lessonId, "isUploading", true)
    updateLesson(sectionId, lessonId, "uploadProgress", 0)

    // Simulate upload progress
    const interval = setInterval(() => {
      updateLesson(sectionId, lessonId, "uploadProgress", (prev: number) => {
        if (prev >= 100) {
          clearInterval(interval)
          updateLesson(sectionId, lessonId, "isUploading", false)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const onDragEnd = (result: any) => {
    if (!result.destination) return

    const { source, destination, type } = result

    if (type === "section") {
      const newSections = Array.from(sections)
      const [reorderedSection] = newSections.splice(source.index, 1)
      newSections.splice(destination.index, 0, reorderedSection)
      setSections(newSections)
    } else if (type === "lesson") {
      const sectionId = source.droppableId
      const section = sections.find((s) => s.id === sectionId)
      if (!section) return

      const newLessons = Array.from(section.lessons)
      const [reorderedLesson] = newLessons.splice(source.index, 1)
      newLessons.splice(destination.index, 0, reorderedLesson)

      setSections(sections.map((s) => (s.id === sectionId ? { ...s, lessons: newLessons } : s)))
    }
  }

  const getTotalStats = () => {
    const totalLessons = sections.reduce((acc, section) => acc + section.lessons.length, 0)
    const totalDuration = sections.reduce(
      (acc, section) => acc + section.lessons.reduce((lessonAcc, lesson) => lessonAcc + lesson.duration, 0),
      0,
    )
    const uploadedVideos = sections.reduce(
      (acc, section) => acc + section.lessons.filter((lesson) => lesson.videoFile).length,
      0,
    )

    return { totalLessons, totalDuration, uploadedVideos }
  }

  const stats = getTotalStats()

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
                  <h1 className="text-xl font-bold text-white">Course Curriculum</h1>
                  <p className="text-sm text-gray-400">Step 2 of 3: Build your course content</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-400">
                  {stats.totalLessons} lessons • {Math.floor(stats.totalDuration / 60)}h {stats.totalDuration % 60}m
                </div>
                <Button
                  onClick={() => router.push("/courses/create/preview")}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  Preview Course
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Stats Sidebar */}
            <div className="lg:col-span-1">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm sticky top-8">
                <CardHeader>
                  <CardTitle className="text-white">Course Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Sections</span>
                      <span className="text-white">{sections.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Lessons</span>
                      <span className="text-white">{stats.totalLessons}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Total Duration</span>
                      <span className="text-white">
                        {Math.floor(stats.totalDuration / 60)}h {stats.totalDuration % 60}m
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Videos Uploaded</span>
                      <span className="text-white">
                        {stats.uploadedVideos}/{stats.totalLessons}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Completion</span>
                      <span className="text-white">
                        {stats.totalLessons > 0 ? Math.round((stats.uploadedVideos / stats.totalLessons) * 100) : 0}%
                      </span>
                    </div>
                    <Progress
                      value={stats.totalLessons > 0 ? (stats.uploadedVideos / stats.totalLessons) * 100 : 0}
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Add Section */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Input
                      value={newSectionTitle}
                      onChange={(e) => setNewSectionTitle(e.target.value)}
                      placeholder="Enter section title..."
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                      onKeyPress={(e) => e.key === "Enter" && addSection()}
                    />
                    <Button
                      onClick={addSection}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Section
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Sections */}
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="sections" type="section">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                      {sections.map((section, sectionIndex) => (
                        <Draggable key={section.id} draggableId={section.id} index={sectionIndex}>
                          {(provided) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="bg-white/5 border-white/10 backdrop-blur-sm"
                            >
                              <CardHeader className="pb-3">
                                <div className="flex items-center space-x-3">
                                  <div {...provided.dragHandleProps}>
                                    <GripVertical className="h-5 w-5 text-gray-400 cursor-grab" />
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => toggleSection(section.id)}
                                    className="text-white hover:bg-white/10"
                                  >
                                    {section.isExpanded ? (
                                      <ChevronDown className="h-4 w-4" />
                                    ) : (
                                      <ChevronRight className="h-4 w-4" />
                                    )}
                                  </Button>
                                  <div className="flex-1">
                                    <Input
                                      value={section.title}
                                      onChange={(e) => updateSection(section.id, "title", e.target.value)}
                                      className="bg-transparent border-none text-white text-lg font-semibold p-0 h-auto focus-visible:ring-0"
                                    />
                                  </div>
                                  <Badge variant="secondary" className="bg-purple-600/20 text-purple-300">
                                    {section.lessons.length} lessons
                                  </Badge>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => deleteSection(section.id)}
                                    className="text-red-400 hover:bg-red-400/10"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                                {section.isExpanded && (
                                  <Textarea
                                    value={section.description}
                                    onChange={(e) => updateSection(section.id, "description", e.target.value)}
                                    placeholder="Section description (optional)"
                                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 mt-3"
                                    rows={2}
                                  />
                                )}
                              </CardHeader>

                              {section.isExpanded && (
                                <CardContent className="pt-0">
                                  {/* Lessons */}
                                  <Droppable droppableId={section.id} type="lesson">
                                    {(provided) => (
                                      <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                                        {section.lessons.map((lesson, lessonIndex) => (
                                          <Draggable key={lesson.id} draggableId={lesson.id} index={lessonIndex}>
                                            {(provided) => (
                                              <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                className="bg-white/5 border border-white/10 rounded-lg p-4"
                                              >
                                                <div className="flex items-start space-x-3">
                                                  <div {...provided.dragHandleProps}>
                                                    <GripVertical className="h-4 w-4 text-gray-400 cursor-grab mt-1" />
                                                  </div>
                                                  <Play className="h-4 w-4 text-purple-400 mt-1" />
                                                  <div className="flex-1 space-y-3">
                                                    <div className="flex items-center space-x-3">
                                                      <Input
                                                        value={lesson.title}
                                                        onChange={(e) =>
                                                          updateLesson(section.id, lesson.id, "title", e.target.value)
                                                        }
                                                        className="bg-transparent border-none text-white font-medium p-0 h-auto focus-visible:ring-0"
                                                        placeholder="Lesson title"
                                                      />
                                                      <div className="flex items-center space-x-2">
                                                        <Switch
                                                          checked={lesson.isPreview}
                                                          onCheckedChange={(checked) =>
                                                            updateLesson(section.id, lesson.id, "isPreview", checked)
                                                          }
                                                        />
                                                        <span className="text-sm text-gray-400">Preview</span>
                                                        {lesson.isPreview ? (
                                                          <Eye className="h-4 w-4 text-green-400" />
                                                        ) : (
                                                          <EyeOff className="h-4 w-4 text-gray-400" />
                                                        )}
                                                      </div>
                                                    </div>

                                                    <Textarea
                                                      value={lesson.description}
                                                      onChange={(e) =>
                                                        updateLesson(
                                                          section.id,
                                                          lesson.id,
                                                          "description",
                                                          e.target.value,
                                                        )
                                                      }
                                                      placeholder="Lesson description"
                                                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                                                      rows={2}
                                                    />

                                                    <div className="flex items-center space-x-4">
                                                      <div className="flex items-center space-x-2">
                                                        <Clock className="h-4 w-4 text-gray-400" />
                                                        <Input
                                                          type="number"
                                                          value={lesson.duration}
                                                          onChange={(e) =>
                                                            updateLesson(
                                                              section.id,
                                                              lesson.id,
                                                              "duration",
                                                              Number.parseInt(e.target.value) || 0,
                                                            )
                                                          }
                                                          className="bg-white/5 border-white/20 text-white w-20"
                                                          placeholder="0"
                                                        />
                                                        <span className="text-sm text-gray-400">min</span>
                                                      </div>

                                                      <div className="flex-1">
                                                        {lesson.videoFile ? (
                                                          <div className="flex items-center space-x-3">
                                                            <div className="flex items-center space-x-2 text-green-400">
                                                              <Upload className="h-4 w-4" />
                                                              <span className="text-sm">{lesson.videoFile.name}</span>
                                                            </div>
                                                            {lesson.isUploading && (
                                                              <div className="flex-1">
                                                                <Progress
                                                                  value={lesson.uploadProgress}
                                                                  className="w-full"
                                                                />
                                                              </div>
                                                            )}
                                                          </div>
                                                        ) : (
                                                          <div>
                                                            <input
                                                              type="file"
                                                              accept="video/*"
                                                              onChange={(e) => {
                                                                const file = e.target.files?.[0]
                                                                if (file) handleVideoUpload(section.id, lesson.id, file)
                                                              }}
                                                              className="hidden"
                                                              id={`video-${lesson.id}`}
                                                            />
                                                            <Button
                                                              variant="outline"
                                                              size="sm"
                                                              onClick={() =>
                                                                document.getElementById(`video-${lesson.id}`)?.click()
                                                              }
                                                              className="border-white/20 text-white hover:bg-white/10"
                                                            >
                                                              <Upload className="h-4 w-4 mr-2" />
                                                              Upload Video
                                                            </Button>
                                                          </div>
                                                        )}
                                                      </div>

                                                      <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => deleteLesson(section.id, lesson.id)}
                                                        className="text-red-400 hover:bg-red-400/10"
                                                      >
                                                        <Trash2 className="h-4 w-4" />
                                                      </Button>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            )}
                                          </Draggable>
                                        ))}
                                        {provided.placeholder}
                                      </div>
                                    )}
                                  </Droppable>

                                  {/* Add Lesson */}
                                  <div className="mt-4 pt-4 border-t border-white/10">
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Button
                                          variant="outline"
                                          className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent"
                                          onClick={() => setSelectedSectionId(section.id)}
                                        >
                                          <Plus className="h-4 w-4 mr-2" />
                                          Add Lesson
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent className="bg-gray-900 border-white/20">
                                        <DialogHeader>
                                          <DialogTitle className="text-white">Add New Lesson</DialogTitle>
                                        </DialogHeader>
                                        <div className="space-y-4">
                                          <div className="space-y-2">
                                            <Label className="text-white">Lesson Title</Label>
                                            <Input
                                              value={newLessonTitle}
                                              onChange={(e) => setNewLessonTitle(e.target.value)}
                                              placeholder="Enter lesson title..."
                                              className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                                              onKeyPress={(e) => e.key === "Enter" && addLesson(selectedSectionId)}
                                            />
                                          </div>
                                          <div className="flex justify-end space-x-3">
                                            <Button
                                              variant="outline"
                                              onClick={() => setNewLessonTitle("")}
                                              className="border-white/20 text-white hover:bg-white/10"
                                            >
                                              Cancel
                                            </Button>
                                            <Button
                                              onClick={() => addLesson(selectedSectionId)}
                                              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                                            >
                                              Add Lesson
                                            </Button>
                                          </div>
                                        </div>
                                      </DialogContent>
                                    </Dialog>
                                  </div>
                                </CardContent>
                              )}
                            </Card>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>

              {/* Footer Actions */}
              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <Button
                  variant="outline"
                  onClick={() => router.push("/courses/create")}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Back to Course Info
                </Button>
                <Button
                  onClick={() => router.push("/courses/create/preview")}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  Preview & Publish
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
