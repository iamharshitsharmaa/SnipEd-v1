import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const neonVariants = {
  primary: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0",
  secondary: "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0",
  ghost: "bg-white/10 hover:bg-white/20 text-white border border-white/20",
  outline: "bg-transparent hover:bg-white/10 text-white border-2 border-white/30 hover:border-white/50",
}

export function NeonButton({ className, variant = "primary", glow = false, children, ...props }) {
  return (
    <Button
      className={cn(
        "transition-all duration-300 font-medium",
        neonVariants[variant],
        glow && "shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40",
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  )
}
