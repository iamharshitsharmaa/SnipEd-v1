"use client"
import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "@/components/ui/button"

interface NeonButtonProps extends ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  glow?: boolean
}

export function NeonButton({ children, className, variant = "primary", glow = false, ...props }: NeonButtonProps) {
  const variants = {
    primary: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0",
    secondary: "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0",
    outline: "border-2 border-white/20 text-white hover:bg-white/5 bg-transparent",
    ghost: "text-white hover:bg-white/10 bg-transparent border-0",
  }

  const glowEffect = glow ? "shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40" : ""

  return (
    <Button
      className={cn(variants[variant], glowEffect, "transition-all duration-300 hover:scale-105", className)}
      {...props}
    >
      {children}
    </Button>
  )
}
