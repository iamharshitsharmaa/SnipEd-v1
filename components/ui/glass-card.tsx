"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: "default" | "premium" | "glow"
}

export function GlassCard({ children, className, variant = "default", ...props }: GlassCardProps) {
  const variants = {
    default: "bg-white/5 backdrop-blur-xl border border-white/10",
    premium: "bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl",
    glow: "bg-white/5 backdrop-blur-xl border border-purple-500/30 shadow-lg shadow-purple-500/10",
  }

  return (
    <Card className={cn(variants[variant], "transition-all duration-500", className)} {...props}>
      {children}
    </Card>
  )
}
