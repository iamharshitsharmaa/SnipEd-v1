"use client"

import { useState } from "react"
import { auth, db } from "@/lib/firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { toast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  })
  const [signUpData, setSignUpData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("signin")
  const [error, setError] = useState("")

  // Function to clear errors when switching tabs
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    setError("")
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      await signInWithEmailAndPassword(auth, signInData.email, signInData.password)
      toast({ title: "Welcome back!" })
      onClose()
    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (signUpData.password.length < 6) {
      setError("Password should be at least 6 characters.")
      setIsLoading(false)
      return
    }

    try {
      // Step 1: Create user in Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        signUpData.email,
        signUpData.password
      )
      const user = userCredential.user

      // Step 2: Save additional data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName: signUpData.fullName,
        username: signUpData.username,
        email: signUpData.email,
        createdAt: new Date(),
      })

      toast({ title: "Account created successfully!" })
      onClose()
    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Join SnipEd</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          {/* Sign In Tab */}
          <TabsContent value="signin">
            <form onSubmit={handleSignIn} className="space-y-4 pt-4">
              {error && activeTab === "signin" && (
                <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm font-medium">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="signin-email">Email</Label>
                <Input
                  id="signin-email"
                  type="email"
                  placeholder="name@example.com"
                  value={signInData.email}
                  onChange={(e) => setSignInData((prev) => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signin-password">Password</Label>
                <Input
                  id="signin-password"
                  type="password"
                  value={signInData.password}
                  onChange={(e) => setSignInData((prev) => ({ ...prev, password: e.target.value }))}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </TabsContent>

          {/* Sign Up Tab */}
          <TabsContent value="signup">
            <form onSubmit={handleSignUp} className="space-y-4 pt-4">
              {error && activeTab === "signup" && (
                <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm font-medium">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="signup-fullname">Full Name</Label>
                <Input
                  id="signup-fullname"
                  placeholder="John Doe"
                  value={signUpData.fullName}
                  onChange={(e) => setSignUpData((prev) => ({ ...prev, fullName: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-username">Username</Label>
                <Input
                  id="signup-username"
                  placeholder="johndoe"
                  value={signUpData.username}
                  onChange={(e) => setSignUpData((prev) => ({ ...prev, username: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="name@example.com"
                  value={signUpData.email}
                  onChange={(e) => setSignUpData((prev) => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="6+ characters"
                  value={signUpData.password}
                  onChange={(e) => setSignUpData((prev) => ({ ...prev, password: e.target.value }))}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}