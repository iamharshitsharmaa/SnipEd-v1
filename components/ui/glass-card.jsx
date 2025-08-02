import { cn } from "@/lib/utils"

const glassVariants = {
  default: "bg-white/5 backdrop-blur-xl border border-white/10",
  premium: "bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl",
  glow: "bg-white/5 backdrop-blur-xl border border-purple-500/30 shadow-lg shadow-purple-500/10",
}

export function GlassCard({ className, variant = "default", children, ...props }) {
  return (
    <div className={cn("rounded-xl transition-all duration-300", glassVariants[variant], className)} {...props}>
      {children}
    </div>
  )
}
