"use client"

import { useState, useEffect } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { Sparkles, Shield, Eye, Lock, Database, Globe, Clock, Users } from "lucide-react"

export default function PrivacyPage() {
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
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-black to-blue-900/10" />
        <div
          className="absolute w-[600px] h-[600px] bg-gradient-to-r from-green-500/4 via-blue-500/4 to-purple-500/4 rounded-full blur-3xl"
          style={{
            left: mousePosition.x - 300,
            top: mousePosition.y - 300,
            transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-emerald-500/2 to-teal-500/2 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/2 to-indigo-500/2 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500/10 to-blue-500/10 backdrop-blur-xl border border-green-500/20 rounded-full px-6 py-3 mb-8">
            <Shield className="w-4 h-4 text-green-400 animate-pulse" />
            <span className="text-sm font-medium text-green-300">Privacy & Security</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-green-200 to-blue-200 bg-clip-text text-transparent">
              Privacy
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Policy
            </span>
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal
            information on SnipEd.
          </p>

          <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Last updated: January 15, 2024</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span>GDPR & CCPA Compliant</span>
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
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <Eye className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Information We Collect</h2>
                  </div>
                  <div className="text-gray-300 leading-relaxed space-y-4">
                    <p>
                      We collect information you provide directly to us, information we obtain automatically when you
                      use our services, and information from third parties.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                        <h4 className="text-blue-300 font-semibold mb-3">Information You Provide:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Account registration details</li>
                          <li>Profile information and bio</li>
                          <li>Content you create and upload</li>
                          <li>Messages and communications</li>
                          <li>Payment and billing information</li>
                        </ul>
                      </div>
                      <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
                        <h4 className="text-purple-300 font-semibold mb-3">Automatically Collected:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Device and browser information</li>
                          <li>IP address and location data</li>
                          <li>Usage patterns and preferences</li>
                          <li>Cookies and tracking technologies</li>
                          <li>Performance and error logs</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2 */}
                <div className="mb-12">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <Database className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">How We Use Your Information</h2>
                  </div>
                  <div className="text-gray-300 leading-relaxed space-y-4">
                    <p>
                      We use the information we collect to provide, maintain, and improve our services, process
                      transactions, and communicate with you.
                    </p>

                    <div className="space-y-4">
                      <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                        <h4 className="text-green-300 font-semibold mb-2">Service Provision:</h4>
                        <p className="text-sm">
                          Deliver and personalize content, process payments, provide customer support, and maintain
                          platform security.
                        </p>
                      </div>
                      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                        <h4 className="text-amber-300 font-semibold mb-2">Communication:</h4>
                        <p className="text-sm">
                          Send notifications, updates, marketing materials (with consent), and respond to your
                          inquiries.
                        </p>
                      </div>
                      <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
                        <h4 className="text-purple-300 font-semibold mb-2">Improvement & Analytics:</h4>
                        <p className="text-sm">
                          Analyze usage patterns, conduct research, develop new features, and improve our algorithms.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 3 */}
                <div className="mb-12">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Information Sharing</h2>
                  </div>
                  <div className="text-gray-300 leading-relaxed space-y-4">
                    <p>
                      We do not sell your personal information. We may share your information in limited circumstances
                      as described below.
                    </p>

                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                      <h4 className="text-red-300 font-semibold mb-2">We Never Sell Your Data</h4>
                      <p className="text-sm">
                        SnipEd does not and will never sell your personal information to third parties for monetary
                        gain.
                      </p>
                    </div>

                    <h4 className="text-white font-semibold">Limited Sharing Scenarios:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white/5 rounded-xl p-4">
                        <h5 className="text-white font-medium mb-2">Service Providers</h5>
                        <p className="text-sm text-gray-400">
                          Trusted partners who help us operate our platform (hosting, analytics, payment processing)
                        </p>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4">
                        <h5 className="text-white font-medium mb-2">Legal Requirements</h5>
                        <p className="text-sm text-gray-400">
                          When required by law, court order, or to protect our rights and safety
                        </p>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4">
                        <h5 className="text-white font-medium mb-2">Business Transfers</h5>
                        <p className="text-sm text-gray-400">
                          In connection with mergers, acquisitions, or asset sales (with user notification)
                        </p>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4">
                        <h5 className="text-white font-medium mb-2">With Your Consent</h5>
                        <p className="text-sm text-gray-400">
                          When you explicitly agree to share information with third parties
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 4 */}
                <div className="mb-12">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                      <Lock className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Data Security</h2>
                  </div>
                  <div className="text-gray-300 leading-relaxed space-y-4">
                    <p>
                      We implement appropriate technical and organizational measures to protect your personal
                      information against unauthorized access, alteration, disclosure, or destruction.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-center">
                        <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                          <Shield className="w-6 h-6 text-green-400" />
                        </div>
                        <h5 className="text-green-300 font-semibold mb-2">Encryption</h5>
                        <p className="text-sm text-gray-400">
                          End-to-end encryption for sensitive data transmission and storage
                        </p>
                      </div>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-center">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                          <Lock className="w-6 h-6 text-blue-400" />
                        </div>
                        <h5 className="text-blue-300 font-semibold mb-2">Access Control</h5>
                        <p className="text-sm text-gray-400">
                          Multi-factor authentication and role-based access controls
                        </p>
                      </div>
                      <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 text-center">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                          <Database className="w-6 h-6 text-purple-400" />
                        </div>
                        <h5 className="text-purple-300 font-semibold mb-2">Data Protection</h5>
                        <p className="text-sm text-gray-400">Regular security audits and compliance monitoring</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 5 */}
                <div className="mb-12">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center">
                      <Eye className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Your Privacy Rights</h2>
                  </div>
                  <div className="text-gray-300 leading-relaxed space-y-4">
                    <p>
                      Depending on your location, you may have certain rights regarding your personal information under
                      applicable privacy laws.
                    </p>

                    <div className="space-y-4">
                      <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                        <h4 className="text-green-300 font-semibold mb-3">Your Rights Include:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Access your personal data</li>
                            <li>Correct inaccurate information</li>
                            <li>Delete your account and data</li>
                            <li>Export your data</li>
                          </ul>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Restrict data processing</li>
                            <li>Object to data processing</li>
                            <li>Withdraw consent</li>
                            <li>File complaints with authorities</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                        <h4 className="text-blue-300 font-semibold mb-2">How to Exercise Your Rights:</h4>
                        <p className="text-sm">
                          Contact us at privacy@sniped.com or use the privacy controls in your account settings. We'll
                          respond within 30 days.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 6 */}
                <div className="mb-12">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <Globe className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">International Transfers</h2>
                  </div>
                  <div className="text-gray-300 leading-relaxed space-y-4">
                    <p>
                      SnipEd operates globally. Your information may be transferred to and processed in countries other
                      than your own, including the United States.
                    </p>
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                      <p className="text-amber-300 text-sm">
                        <strong>Protection Measures:</strong> We ensure appropriate safeguards are in place for
                        international transfers, including standard contractual clauses and adequacy decisions.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 7 */}
                <div className="mb-12">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Data Retention</h2>
                  </div>
                  <div className="text-gray-300 leading-relaxed space-y-4">
                    <p>
                      We retain your personal information for as long as necessary to provide our services, comply with
                      legal obligations, resolve disputes, and enforce our agreements.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white/5 rounded-xl p-4">
                        <h5 className="text-white font-medium mb-2">Account Data</h5>
                        <p className="text-sm text-gray-400">
                          Retained while your account is active, plus 90 days after deletion
                        </p>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4">
                        <h5 className="text-white font-medium mb-2">Content</h5>
                        <p className="text-sm text-gray-400">
                          Deleted immediately when you remove it, with backup deletion within 30 days
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 8 */}
                <div className="mb-12">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-green-500 rounded-xl flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Changes to This Policy</h2>
                  </div>
                  <div className="text-gray-300 leading-relaxed space-y-4">
                    <p>
                      We may update this Privacy Policy from time to time. We will notify you of any material changes by
                      posting the new policy on this page and updating the "Last updated" date.
                    </p>
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
                      <p className="text-yellow-300 text-sm">
                        <strong>Stay Informed:</strong> We recommend reviewing this policy periodically to stay informed
                        about how we protect your information.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="border-t border-white/10 pt-8">
                  <h3 className="text-xl font-bold text-white mb-4">Contact Us</h3>
                  <div className="text-gray-300 space-y-2">
                    <p>
                      If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                    </p>
                    <div className="bg-white/5 rounded-xl p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p>
                            <strong>Privacy Officer:</strong> privacy@sniped.com
                          </p>
                          <p>
                            <strong>General Inquiries:</strong> hello@sniped.com
                          </p>
                          <p>
                            <strong>Phone:</strong> +1 (555) 123-SNIP
                          </p>
                        </div>
                        <div>
                          <p>
                            <strong>Address:</strong>
                          </p>
                          <p>
                            SnipEd Inc.
                            <br />
                            123 Innovation Drive
                            <br />
                            San Francisco, CA 94105
                            <br />
                            United States
                          </p>
                        </div>
                      </div>
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
