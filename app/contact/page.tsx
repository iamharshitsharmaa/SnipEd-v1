"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { NeonButton } from "@/components/ui/neon-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MessageCircle, Phone, MapPin, Send, Users, BookOpen, Headphones, Globe, Clock, Star } from "lucide-react"

const contactMethods = [
  {
    title: "General Inquiries",
    description: "Questions about SnipEd platform",
    icon: Mail,
    contact: "hello@sniped.com",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Creator Support",
    description: "Help with content creation",
    icon: Users,
    contact: "creators@sniped.com",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Technical Support",
    description: "Platform issues and bugs",
    icon: Headphones,
    contact: "support@sniped.com",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    title: "Business Partnerships",
    description: "Collaboration opportunities",
    icon: Globe,
    contact: "partnerships@sniped.com",
    gradient: "from-amber-500 to-orange-500",
  },
]

const faqs = [
  {
    question: "How does SnipEd's focused learning work?",
    answer:
      "SnipEd eliminates distractions by letting you choose one category at a time. This focused approach helps you dive deep into topics without the chaos of mixed content feeds.",
  },
  {
    question: "Can I monetize my content on SnipEd?",
    answer:
      "Creators can earn through both free reels (ad revenue sharing) and premium courses. Our creator fund also provides additional monetization opportunities.",
  },
  {
    question: "What makes SnipEd different from other platforms?",
    answer:
      "SnipEd is built specifically for learning. We prioritize educational content, offer distraction-free viewing, and provide structured learning paths through our course system.",
  },
  {
    question: "Is SnipEd free to use?",
    answer:
      "Yes! SnipEd is free for learners. You can watch unlimited reels and access free course previews. Premium courses require individual purchases to support creators.",
  },
]

export default function ContactPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Ultra-futuristic background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-black to-green-900/10" />
        <div
          className="absolute w-[800px] h-[800px] bg-gradient-to-r from-blue-500/3 via-green-500/3 to-purple-500/3 rounded-full blur-3xl"
          style={{
            left: mousePosition.x - 400,
            top: mousePosition.y - 400,
            transition: "all 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
        <div className="absolute top-1/5 left-1/5 w-96 h-96 bg-gradient-to-r from-cyan-500/2 to-blue-500/2 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/5 right-1/5 w-80 h-80 bg-gradient-to-r from-green-500/2 to-emerald-500/2 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-green-500/10 backdrop-blur-xl border border-blue-500/20 rounded-full px-6 py-3 mb-8">
            <MessageCircle className="w-4 h-4 text-blue-400 animate-pulse" />
            <span className="text-sm font-medium text-blue-300">Get in Touch</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-200 to-green-200 bg-clip-text text-transparent">
              Contact
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-green-400 to-cyan-400 bg-clip-text text-transparent">
              SnipEd
            </span>
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have questions, feedback, or want to collaborate? We'd love to hear from you. Our team is here to help you
            succeed on your learning journey.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactMethods.map((method, index) => (
            <GlassCard key={index} variant="premium" className="group hover:scale-105 cursor-pointer">
              <div className="p-6 text-center">
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${method.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}
                >
                  <method.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{method.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{method.description}</p>
                <a
                  href={`mailto:${method.contact}`}
                  className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                >
                  {method.contact}
                </a>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <GlassCard variant="premium">
            <div className="p-8">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <Send className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">Send us a Message</h2>
                  <p className="text-gray-400">We'll get back to you within 24 hours</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white font-medium">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      className="bg-white/5 border-white/20 text-white placeholder-gray-400 rounded-xl focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="bg-white/5 border-white/20 text-white placeholder-gray-400 rounded-xl focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-white font-medium">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What's this about?"
                    className="bg-white/5 border-white/20 text-white placeholder-gray-400 rounded-xl focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white font-medium">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                    className="bg-white/5 border-white/20 text-white placeholder-gray-400 rounded-xl focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20"
                    required
                  />
                </div>

                <NeonButton type="submit" variant="primary" size="lg" className="w-full" glow>
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </NeonButton>
              </form>
            </div>
          </GlassCard>

          {/* FAQ Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Frequently Asked</h2>
                <p className="text-gray-400">Quick answers to common questions</p>
              </div>
            </div>

            {faqs.map((faq, index) => (
              <GlassCard key={index} variant="default" className="group hover:bg-white/10 transition-all duration-300">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                    {faq.question}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                </div>
              </GlassCard>
            ))}

            <GlassCard variant="glow">
              <div className="p-6 text-center">
                <Star className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Still have questions?</h3>
                <p className="text-gray-400 mb-4">Check out our comprehensive help center</p>
                <NeonButton variant="outline" size="sm">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Visit Help Center
                </NeonButton>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Office Info */}
        <GlassCard variant="premium">
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Headquarters</h3>
                <p className="text-gray-400">
                  123 Innovation Drive
                  <br />
                  San Francisco, CA 94105
                  <br />
                  United States
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Support Hours</h3>
                <p className="text-gray-400">
                  Monday - Friday
                  <br />
                  9:00 AM - 6:00 PM PST
                  <br />
                  24/7 Emergency Support
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Phone Support</h3>
                <p className="text-gray-400">
                  +1 (555) 123-SNIP
                  <br />
                  +1 (555) 123-7647
                  <br />
                  Toll-free in US & Canada
                </p>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
