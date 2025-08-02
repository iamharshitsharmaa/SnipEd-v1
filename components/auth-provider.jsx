"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { supabase, isSupabaseConfigured, mockUser } from "@/lib/mockData"

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    if (isSupabaseConfigured) {
      supabase.auth.getUser().then(({ data: { user } }) => {
        setUser(user)
        setLoading(false)
      })

      // Listen for auth changes
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      })

      return () => subscription.unsubscribe()
    } else {
      // Mock mode - simulate loading
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
  }, [])

  const signUp = async (email, password, metadata = {}) => {
    if (!isSupabaseConfigured) {
      // Mock sign up
      setUser({ ...mockUser, email, ...metadata })
      return { data: { user: mockUser }, error: null }
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    })

    if (error) throw error
    return { data, error }
  }

  const signIn = async (email, password) => {
    if (!isSupabaseConfigured) {
      // Mock sign in
      setUser({ ...mockUser, email })
      return { data: { user: mockUser }, error: null }
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
    return { data, error }
  }

  const signOut = async () => {
    if (!isSupabaseConfigured) {
      setUser(null)
      return { error: null }
    }

    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return { error }
  }

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
