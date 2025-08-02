import { supabase, isSupabaseConfigured } from "@/lib/mockData"

export async function signOut() {
  if (isSupabaseConfigured) {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }
  // For demo mode, just resolve
  return Promise.resolve()
}

export async function signIn(email: string, password: string) {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
    return data
  }
  // Mock sign in for demo
  return {
    user: {
      id: "demo-user",
      email,
      user_metadata: {
        full_name: "Demo User",
        username: "demouser",
      },
    },
    session: null,
  }
}

export async function signUp(email: string, password: string, metadata: any) {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    })
    if (error) throw error
    return data
  }
  // Mock sign up for demo
  return {
    user: {
      id: "demo-user",
      email,
      user_metadata: metadata,
    },
    session: null,
  }
}
