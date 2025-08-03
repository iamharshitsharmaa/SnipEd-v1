"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useVideos } from "@/app/contexts/VideoContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  Video,
  FileText,
  X,
  Settings,
  Eye,
  Globe,
  Lock,
  ArrowLeft,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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
];

const privacyOptions = [
  {
    value: "public",
    label: "Public",
    icon: Globe,
    description: "Anyone can view",
  },
  {
    value: "unlisted",
    label: "Unlisted",
    icon: Eye,
    description: "Only with link",
  },
  {
    value: "private",
    label: "Private",
    icon: Lock,
    description: "Only you",
  },
];

export default function UploadPage() {
  const router = useRouter();
  const { addVideo } = useVideos();
  const { toast } = useToast();
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [privacy, setPrivacy] = useState("public");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        setUploadedFile(e.target.files[0]);
      }
    },
    []
  );

  const toggleCategory = useCallback((category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  }, []);

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("video/")) return Video;
    return FileText;
  };

  useEffect(() => {
    if (uploadProgress >= 100) {
      const timer = setTimeout(() => {
        toast({ title: "Published!", description: "Your content is now live." });
        router.push("/feed");
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [uploadProgress, router, toast]);

  const handleUpload = useCallback(async () => {
    if (!uploadedFile || !title.trim()) {
      toast({
        title: "Error",
        description: "Please select a video file and provide a title.",
        variant: "destructive",
      });
      return;
    }

    const newVideo = {
      id: `user_video_${Date.now()}`,
      video_url: URL.createObjectURL(uploadedFile),
      description: `${title}\n\n${description}`,
      user: {
        username: "sniped_user",
        avatar: "/placeholder.svg?text=U",
      },
      likes: 0,
      comments: 0,
      shares: 0,
      song_name: "Original Audio",
    };

    addVideo(newVideo);

    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((currentProgress) => {
        const nextProgress = currentProgress + 20;
        if (nextProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return nextProgress;
      });
    }, 300);
  }, [uploadedFile, title, description, addVideo, toast]);

  const handleCancelUpload = useCallback(() => {
    setUploadedFile(null);
    setUploadProgress(0);
    setIsUploading(false);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-pink-900/20 via-transparent to-transparent" />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Button
            onClick={() => router.back()}
            variant="ghost"
            className="bg-black/60 backdrop-blur-md border border-white/10 text-white hover:bg-black/80"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Upload Content</h1>
            <p className="text-gray-400">Share your video with the world</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-black/40 backdrop-blur-md border border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Upload className="w-5 h-5 mr-2" />
                  Upload File
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Drag and drop your video file here
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!uploadedFile ? (
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                      dragActive
                        ? "border-purple-500 bg-purple-500/10"
                        : "border-gray-600 hover:border-gray-500"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-white mb-2">Drop your file here, or</p>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept="video/*"
                      className="hidden"
                      id="file-upload"
                    />
                    <Button
                      asChild
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      <Label htmlFor="file-upload" className="cursor-pointer">
                        Choose File
                      </Label>
                    </Button>
                  </div>
                ) : (
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {
                          (() => {
                            const IconComponent = getFileIcon(uploadedFile);
                            return (
                              <IconComponent className="w-8 h-8 text-purple-400" />
                            );
                          })()
                        }
                        <div>
                          <p className="text-white font-medium">
                            {uploadedFile.name}
                          </p>
                          <p className="text-sm text-gray-400">
                            {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleCancelUpload}
                        className="text-gray-400 hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    {isUploading && (
                      <div className="mt-4">
                        <div className="flex justify-between text-sm text-gray-400 mb-2">
                          <span>Publishing...</span>
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

            <Card className="bg-black/40 backdrop-blur-md border border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Content Details</CardTitle>
                <CardDescription className="text-gray-400">
                  Add title, description, and categories for your content
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
                        variant={
                          selectedCategories.includes(category)
                            ? "default"
                            : "outline"
                        }
                        className={`cursor-pointer transition-all duration-200 ${
                          selectedCategories.includes(category)
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0"
                            : "border-gray-600 text-gray-300 hover:border-gray-500"
                        }`}
                        onClick={() => toggleCategory(category)}
                      >
                        {category}
                        {
                          selectedCategories.includes(category) && (
                            <X className="w-3 h-3 ml-1" />
                          )
                        }
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
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
                        <p className="text-sm text-gray-400">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="bg-black/40 backdrop-blur-md border border-white/10">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <Button
                    onClick={handleUpload}
                    disabled={!uploadedFile || !title.trim() || isUploading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50"
                  >
                    {isUploading ? "Publishing..." : "Publish Content"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}