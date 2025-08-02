import { supabase, isSupabaseConfigured } from "@/lib/mockData"

export const signIn = async (email: string, password: string) => {
  if (!isSupabaseConfigured() || !supabase) {
    // Mock authentication for demo
    return {
      user: {
        id: "demo-user-id",
        email,
        user_metadata: {
          full_name: "Demo User",
          username: "demouser",
        },
      },
    }
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

export const signUp = async (email: string, password: string, username: string, fullName: string) => {
  if (!isSupabaseConfigured() || !supabase) {
    // Mock authentication for demo
    return {
      user: {
        id: "demo-user-id",
        email,
        user_metadata: {
          full_name: fullName,
          username,
        },
      },
    }
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
        full_name: fullName,
      },
    },
  })

  if (error) throw error

  // Create user profile
  if (data.user) {
    const { error: profileError } = await supabase.from("users").insert([
      {
        id: data.user.id,
        username,
        full_name: fullName,
      },
    ])

    if (profileError) throw profileError
  }

  return data
}

export const signOut = async () => {
  if (!isSupabaseConfigured() || !supabase) {
    // Mock sign out
    return
  }

  const { error } = await supabase.auth.signOut()
  if (error) throw error
}
