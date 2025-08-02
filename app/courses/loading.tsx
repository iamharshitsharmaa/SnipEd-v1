"use client"

import { GlassCard } from "@/components/ui/glass-card"
import { Skeleton } from "@/components/ui/skeleton"

export default function CoursesLoading() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black to-blue-900/10" />
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-6 py-12">
          {/* Header Skeleton */}
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-48 mx-auto mb-6 bg-white/10" />
            <Skeleton className="h-16 w-96 mx-auto mb-6 bg-white/10" />
            <Skeleton className="h-6 w-128 mx-auto mb-8 bg-white/10" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="text-center">
                  <Skeleton className="w-12 h-12 rounded-xl mx-auto mb-2 bg-white/10" />
                  <Skeleton className="h-4 w-12 mx-auto mb-1 bg-white/10" />
                  <Skeleton className="h-3 w-16 mx-auto bg-white/10" />
                </div>
              ))}
            </div>
          </div>

          {/* Filters Skeleton */}
          <GlassCard className="mb-8">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 bg-white/10" />
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Course Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <GlassCard key={i}>
                <div className="relative">
                  <Skeleton className="w-full h-48 rounded-t-xl bg-white/10" />
                  <div className="p-6">
                    <div className="flex justify-between mb-3">
                      <Skeleton className="h-6 w-20 bg-white/10" />
                      <Skeleton className="h-6 w-16 bg-white/10" />
                    </div>
                    <Skeleton className="h-6 w-full mb-2 bg-white/10" />
                    <Skeleton className="h-4 w-full mb-4 bg-white/10" />
                    <div className="flex items-center mb-4">
                      <Skeleton className="w-8 h-8 rounded-full mr-3 bg-white/10" />
                      <Skeleton className="h-4 w-24 bg-white/10" />
                    </div>
                    <div className="flex justify-between">
                      <Skeleton className="h-8 w-16 bg-white/10" />
                      <Skeleton className="h-4 w-20 bg-white/10" />
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
