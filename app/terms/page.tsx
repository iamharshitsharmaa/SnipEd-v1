"use client"

import { useState, useEffect } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { FileText, Globe, Clock } from "lucide-react"

export default function TermsPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Ultra-futuristic background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-black to-purple-900/10" />
        <div
          className="absolute w-[600px] h-[600px] bg-gradient-to-r from-blue-500/4 via-purple-500/4 to-pink-500/4 rounded-full blur-3xl"
          style={{
            left: mousePosition.x - 300,
            top: mousePosition.y - 300,
            transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-cyan-500/2 to-blue-500/2 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/2 to-pink-500/2 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-blue-500/20 rounded-full px-6 py-3 mb-8">
            <FileText className="w-4 h-4 text-blue-400 animate-pulse" />
            <span className="text-sm font-medium text-blue-300">Legal Information</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Terms of
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Service
            </span>
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Please read these terms carefully before using SnipEd. By accessing our platform, you agree to be bound by
            these terms.
          </p>

          <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Last updated: January 15, 2024</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span>Effective globally</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <GlassCard variant="premium">
            <div className="p-8 md:p-12">
              <div className="prose prose-invert max-w-none">
                {/* Section 1 */}
                <div className="mb-12">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white">Acceptance of Terms</h2>
                  </div>
                  <div className="text-gray-300 leading-relaxed space-y-4">
                    <p>
                      By accessing and using SnipEd ("the Service"), you accept and agree to be bound by the terms and
                      provision of this agreement. If you do not agree to abide by the above, please do not use this
                      service.
                    </p>
                    <p>
                      These Terms of Service ("Terms") govern your use of our website located at sniped.com (the
                      "Service") operated by SnipEd Inc. ("us", "we", or "our").
                    </p>
                  </div>
                </div>

                {/* Section 2 */}
                <div className="mb-12">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white">User Accounts</h2>
                  </div>
                  <div className="text-gray-300 leading-relaxed space-y-4">
                    <p>
                      When you create an account with us, you must provide information that is accurate, complete, and
                      current at all times. You are responsible for safeguarding the password and for all activities
                      that occur under your account.
                    </p>
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                      <h4 className="text-blue-300 font-semibold mb-2">Account Requirements:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>You must be at least 13 years old to create an account</li>
                        <li>One account per person</li>
                        <li>Accurate and truthful information required</li>
                        <li>You are responsible for account security</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Section 3 */}
                <div className="mb-12">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white">Content and Conduct</h2>
                  </div>
                  <div className="text-gray-300 leading-relaxed space-y-4">
                    <p>
                      Our Service allows you to post, link, store, share and otherwise make available certain
                      information, text, graphics, videos, or other material ("Content"). You are responsible for the
                      Content that you post to the Service.
                    </p>

                    <h4 className="text-white font-semibold">Prohibited Content:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Illegal or harmful content</li>
                          <li>Harassment or bullying</li>
                          <li>Spam or misleading information</li>
                          <li>Copyright infringement</li>
                        </ul>
                      </div>
                      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Adult or explicit content</li>
                          <li>Violence or threats</li>
                          <li>Hate speech or discrimination</li>
                          <li>Privacy violations</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 4 */}
                <div className="mb-12">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold">4</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white">Creator Monetization</h2>
                  </div>
                  <div className="text-gray-300 leading-relaxed space-y-4">
                    <p>
                      SnipEd provides monetization opportunities for creators through various means including but not
                      limited to course sales, creator fund, and advertising revenue sharing.
                    </p>
                    <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                      <h4 className="text-green-300 font-semibold mb-2">Monetization Terms:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Revenue sharing rates are subject to change with 30 days notice</li>
                        <li>Payments are processed monthly for balances over $50</li>
                        <li>Tax compliance is the creator's responsibility</li>
                        <li>Content must comply with our community guidelines</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Section 5 */}
                <div className="mb-12">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold">5</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white">Intellectual Property</h2>
                  </div>
                  <div className="text-gray-300 leading-relaxed space-y-4">
                    <p>
                      The Service and its original content, features and functionality are and will remain the exclusive
                      property of SnipEd Inc. and its licensors. The Service is protected by copyright, trademark, and
                      other laws.
                    </p>
                    <p>
                      You retain ownership of content you create and upload to SnipEd, but you grant us a license to
                      use, display, and distribute your content on our platform.
                    </p>
                  </div>
                </div>

                {/* Section 6 */}
                <div className="mb-12">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold">6</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white">Termination</h2>
                  </div>
                  <div className="text-gray-300 leading-relaxed space-y-4">
                    <p>
                      We may terminate or suspend your account immediately, without prior notice or liability, for any
                      reason whatsoever, including without limitation if you breach the Terms.
                    </p>
                    <p>
                      Upon termination, your right to use the Service will cease immediately. If you wish to terminate
                      your account, you may simply discontinue using the Service.
                    </p>
                  </div>
                </div>

                {/* Section 7 */}
                <div className="mb-12">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold">7</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white">Limitation of Liability</h2>
                  </div>
                  <div className="text-gray-300 leading-relaxed space-y-4">
                    <p>
                      In no event shall SnipEd Inc., nor its directors, employees, partners, agents, suppliers, or
                      affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages,
                      including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                    </p>
                  </div>
                </div>

                {/* Section 8 */}
                <div className="mb-12">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-green-500 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold">8</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white">Changes to Terms</h2>
                  </div>
                  <div className="text-gray-300 leading-relaxed space-y-4">
                    <p>
                      We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a
                      revision is material, we will try to provide at least 30 days notice prior to any new terms taking
                      effect.
                    </p>
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
                      <p className="text-yellow-300 text-sm">
                        <strong>Important:</strong> Your continued use of the Service after we post any modifications to
                        the Terms constitutes acceptance of those changes.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="border-t border-white/10 pt-8">
                  <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>
                  <div className="text-gray-300 space-y-2">
                    <p>If you have any questions about these Terms of Service, please contact us:</p>
                    <div className="bg-white/5 rounded-xl p-4">
                      <p>
                        <strong>Email:</strong> legal@sniped.com
                      </p>
                      <p>
                        <strong>Address:</strong> 123 Innovation Drive, San Francisco, CA 94105
                      </p>
                      <p>
                        <strong>Phone:</strong> +1 (555) 123-SNIP
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
