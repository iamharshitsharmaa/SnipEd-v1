import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/auth-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Navbar } from "@/components/navigation/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "SnipEd - Learn Through Bite-Sized Videos",
  description: "Master new skills with focused, distraction-free learning through vertical videos and expert courses.",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <div className="relative min-h-screen bg-black">
              {/* Dynamic background effects */}
              <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 via-black to-blue-900/5" />
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/3 to-pink-500/3 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/3 to-cyan-500/3 rounded-full blur-3xl animate-pulse delay-1000" />
              </div>

              <div className="relative z-10">
                <Navbar />
                <main>{children}</main>
              </div>
            </div>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
