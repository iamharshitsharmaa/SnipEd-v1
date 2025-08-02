"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

interface BackButtonProps {
  href?: string
  label?: string
  variant?: "default" | "ghost" | "outline"
  className?: string
}

export function BackButton({ href, label = "Back", variant = "ghost", className }: BackButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    if (href) {
      router.push(href)
    } else {
      router.back()
    }
  }

  return (
    <Button
      variant={variant}
      onClick={handleClick}
      className={cn(
        "flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm border border-white/10",
        className,
      )}
    >
      <ArrowLeft className="w-4 h-4" />
      <span>{label}</span>
    </Button>
  )
}
