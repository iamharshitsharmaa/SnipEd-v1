"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { BackButton } from "@/components/ui/back-button"
import {
  User,
  Mail,
  Bell,
  Shield,
  Palette,
  Monitor,
  Moon,
  Sun,
  Camera,
  Save,
  Trash2,
  Download,
  Upload,
} from "lucide-react"

const themes = [
  { id: "dark", name: "Dark", icon: Moon },
  { id: "light", name: "Light", icon: Sun },
  { id: "system", name: "System", icon: Monitor },
]

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "ja", name: "日本語" },
  { code: "ko", name: "한국어" },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [profile, setProfile] = useState({
    username: "johndoe",
    displayName: "John Doe",
    email: "john@example.com",
    bio: "Content creator passionate about technology and education",
    website: "https://johndoe.com",
    location: "San Francisco, CA",
  })

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    likes: true,
    comments: true,
    follows: true,
    mentions: true,
  })

  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showEmail: false,
    showLocation: true,
    allowMessages: true,
  })

  const [preferences, setPreferences] = useState({
    theme: "dark",
    language: "en",
    autoplay: true,
    qualityAuto: true,
  })

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "preferences", label: "Preferences", icon: Palette },
    { id: "account", label: "Account", icon: Mail },
  ]

  const handleSave = () => {
    // Save settings logic here
    console.log("Settings saved")
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
              <h1 className="text-3xl font-bold text-white">Settings</h1>
              <p className="text-gray-400">Manage your account and preferences</p>
            </div>
          </div>
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-black/40 backdrop-blur-md border border-white/10">
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-all duration-200 ${
                        activeTab === tab.id
                          ? "bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-r-2 border-purple-500 text-white"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === "profile" && (
              <div className="space-y-6">
                <Card className="bg-black/40 backdrop-blur-md border border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Profile Information</CardTitle>
                    <CardDescription className="text-gray-400">
                      Update your profile details and public information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Avatar */}
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src="/placeholder.svg?height=80&width=80&text=JD" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <Button
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                        >
                          <Camera className="w-4 h-4 mr-2" />
                          Change Photo
                        </Button>
                        <p className="text-sm text-gray-400">JPG, PNG or GIF. Max size 5MB.</p>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="username" className="text-white">
                          Username
                        </Label>
                        <Input
                          id="username"
                          value={profile.username}
                          onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                          className="bg-gray-800/50 border-gray-600 text-white mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="displayName" className="text-white">
                          Display Name
                        </Label>
                        <Input
                          id="displayName"
                          value={profile.displayName}
                          onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                          className="bg-gray-800/50 border-gray-600 text-white mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-white">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="bg-gray-800/50 border-gray-600 text-white mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="bio" className="text-white">
                        Bio
                      </Label>
                      <Textarea
                        id="bio"
                        value={profile.bio}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        rows={3}
                        className="bg-gray-800/50 border-gray-600 text-white mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="website" className="text-white">
                          Website
                        </Label>
                        <Input
                          id="website"
                          value={profile.website}
                          onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                          className="bg-gray-800/50 border-gray-600 text-white mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="location" className="text-white">
                          Location
                        </Label>
                        <Input
                          id="location"
                          value={profile.location}
                          onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                          className="bg-gray-800/50 border-gray-600 text-white mt-1"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "notifications" && (
              <Card className="bg-black/40 backdrop-blur-md border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Notification Preferences</CardTitle>
                  <CardDescription className="text-gray-400">
                    Choose how you want to be notified about activity
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-400">Receive notifications via email</p>
                      </div>
                      <Switch
                        checked={notifications.email}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">Push Notifications</p>
                        <p className="text-sm text-gray-400">Receive push notifications on your device</p>
                      </div>
                      <Switch
                        checked={notifications.push}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                      />
                    </div>

                    <div className="border-t border-gray-700 pt-4">
                      <h4 className="text-white font-medium mb-4">Activity Notifications</h4>
                      <div className="space-y-4">
                        {[
                          { key: "likes", label: "Likes on your content" },
                          { key: "comments", label: "Comments on your content" },
                          { key: "follows", label: "New followers" },
                          { key: "mentions", label: "Mentions and tags" },
                        ].map((item) => (
                          <div key={item.key} className="flex items-center justify-between">
                            <p className="text-gray-300">{item.label}</p>
                            <Switch
                              checked={notifications[item.key as keyof typeof notifications]}
                              onCheckedChange={(checked) =>
                                setNotifications({
                                  ...notifications,
                                  [item.key]: checked,
                                })
                              }
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "privacy" && (
              <Card className="bg-black/40 backdrop-blur-md border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Privacy Settings</CardTitle>
                  <CardDescription className="text-gray-400">
                    Control who can see your information and content
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {[
                      {
                        key: "profilePublic",
                        label: "Public Profile",
                        description: "Make your profile visible to everyone",
                      },
                      {
                        key: "showEmail",
                        label: "Show Email",
                        description: "Display your email on your profile",
                      },
                      {
                        key: "showLocation",
                        label: "Show Location",
                        description: "Display your location on your profile",
                      },
                      {
                        key: "allowMessages",
                        label: "Allow Messages",
                        description: "Let other users send you direct messages",
                      },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-medium">{item.label}</p>
                          <p className="text-sm text-gray-400">{item.description}</p>
                        </div>
                        <Switch
                          checked={privacy[item.key as keyof typeof privacy]}
                          onCheckedChange={(checked) =>
                            setPrivacy({
                              ...privacy,
                              [item.key]: checked,
                            })
                          }
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "preferences" && (
              <div className="space-y-6">
                <Card className="bg-black/40 backdrop-blur-md border border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Appearance</CardTitle>
                    <CardDescription className="text-gray-400">Customize how the app looks and feels</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-white">Theme</Label>
                        <div className="grid grid-cols-3 gap-3 mt-2">
                          {themes.map((theme) => (
                            <button
                              key={theme.id}
                              onClick={() => setPreferences({ ...preferences, theme: theme.id })}
                              className={`p-3 rounded-lg border transition-all duration-200 ${
                                preferences.theme === theme.id
                                  ? "border-purple-500 bg-purple-500/10"
                                  : "border-gray-600 hover:border-gray-500"
                              }`}
                            >
                              <theme.icon className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                              <p className="text-white text-sm">{theme.name}</p>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label className="text-white">Language</Label>
                        <select
                          value={preferences.language}
                          onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                          className="w-full mt-2 bg-gray-800/50 border border-gray-600 text-white rounded-lg px-3 py-2"
                        >
                          {languages.map((lang) => (
                            <option key={lang.code} value={lang.code}>
                              {lang.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 backdrop-blur-md border border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Playback</CardTitle>
                    <CardDescription className="text-gray-400">
                      Control video and audio playback settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">Autoplay Videos</p>
                        <p className="text-sm text-gray-400">Automatically play videos when scrolling</p>
                      </div>
                      <Switch
                        checked={preferences.autoplay}
                        onCheckedChange={(checked) => setPreferences({ ...preferences, autoplay: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">Auto Quality</p>
                        <p className="text-sm text-gray-400">Automatically adjust video quality based on connection</p>
                      </div>
                      <Switch
                        checked={preferences.qualityAuto}
                        onCheckedChange={(checked) => setPreferences({ ...preferences, qualityAuto: checked })}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "account" && (
              <div className="space-y-6">
                <Card className="bg-black/40 backdrop-blur-md border border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Account Management</CardTitle>
                    <CardDescription className="text-gray-400">Manage your account data and security</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button
                      variant="outline"
                      className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Your Data
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Import Data
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-red-900/20 backdrop-blur-md border border-red-500/20">
                  <CardHeader>
                    <CardTitle className="text-red-400">Danger Zone</CardTitle>
                    <CardDescription className="text-gray-400">Irreversible and destructive actions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="destructive" className="w-full">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
