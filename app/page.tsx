"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Star, CheckCircle, ArrowRight, Zap, Users, Mail } from "lucide-react"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function HomePage() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechStart Inc.",
      content:
        "The AI automation systems transformed our lead generation process. We saw a 300% increase in qualified leads within the first month.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      company: "Growth Dynamics",
      content:
        "BusinessOS revolutionized how we operate. The automated fulfillment and project management systems saved us 40 hours per week.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      company: "Scale Solutions",
      content:
        "The personalized automation roadmap was exactly what we needed. Implementation was seamless and results were immediate.",
      rating: 5,
    },
  ]

  const faqItems = [
    {
      question: "How quickly can I see results from AI automation?",
      answer:
        "Most clients see initial improvements within 2-4 weeks of implementation. Full system optimization typically occurs within 60-90 days, depending on complexity.",
    },
    {
      question: "Do I need technical expertise to use these systems?",
      answer:
        "No technical expertise required. Our AI systems are designed to be user-friendly, and we provide comprehensive training and ongoing support.",
    },
    {
      question: "Can the systems integrate with my existing tools?",
      answer:
        "Yes, our AI solutions are built to integrate seamlessly with popular business tools including CRMs, email platforms, project management software, and more.",
    },
    {
      question: "What makes your AI different from other automation tools?",
      answer:
        "Our AI systems are custom-built for your specific business needs, not generic templates. They learn and adapt to your processes, becoming more effective over time.",
    },
    {
      question: "Is there a setup fee or long-term contract required?",
      answer:
        "The Free Tier has no setup fees or contracts. Custom and BusinessOS tiers are tailored to your needs with flexible terms discussed during consultation.",
    },
  ]

  return (
    <div className="min-h-screen bg-[#130f0a] text-[#f2ece6]">
      {/* Navigation */}
      <nav className="border-b border-[#d2c1ab]/20 bg-[#130f0a]/95 backdrop-blur-md sticky top-0 z-50 shadow-lg shadow-[#130f0a]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3 group">
              <div className="relative">
                <img
                  src="/logo.png?v=1"
                  alt="WorkFlow MonK"
                  className="h-10 w-10 transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#5fa973]/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <span className="text-xl font-bold text-[#d2c1ab] group-hover:text-[#5fa973] transition-colors duration-300">
                WorkFlow Monk
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-[#f2ece6] hover:text-[#5fa973] transition-all duration-300 relative group"
              >
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#5fa973] group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                href="#pricing"
                className="text-[#f2ece6] hover:text-[#5fa973] transition-all duration-300 relative group"
              >
                Pricing
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#5fa973] group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#faq" className="text-[#f2ece6] hover:text-[#5fa973] transition-all duration-300 relative group">
                FAQ
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#5fa973] group-hover:w-full transition-all duration-300"></span>
              </a>
              <Link href="/get-started">
                <Button className="bg-gradient-to-r from-[#5fa973] to-[#44713c] hover:from-[#44713c] hover:to-[#5fa973] text-[#130f0a] font-semibold transition-all duration-300 hover:transform hover:scale-105 shadow-lg shadow-[#5fa973]/25">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Enhanced background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#130f0a] via-[#1a1410] to-[#130f0a]"></div>
        <div className="absolute top-1/2 left-10 w-32 h-32 bg-[#5fa973]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-10 w-48 h-48 bg-[#44713c]/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-[#d2c1ab]/10 rounded-full blur-2xl animate-pulse delay-500"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="mb-8 animate-fade-in-up">
              <div className="inline-flex items-center px-4 py-2 bg-[#5fa973]/10 border border-[#5fa973]/20 rounded-full mb-6">
                <Zap className="h-4 w-4 text-[#5fa973] mr-2" />
                <span className="text-[#5fa973] text-sm font-medium">AI-Powered Business Automation</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in-up delay-200">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d2c1ab] to-[#5fa973]">
                Don't Run Your Business
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5fa973] to-[#44713c]">
                like it's 2020
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-[#d2c1ab] mb-8 max-w-4xl mx-auto leading-relaxed animate-fade-in-up delay-400">
              Automatic Intelligent (AI) Systems for Scaling Your Business on Autopilot.
              <br />
              <br />
              <span className="text-[#f2ece6]/80">Empower your business with AI today.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up delay-600">
              <Link href="/get-started">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#5fa973] to-[#44713c] hover:from-[#44713c] hover:to-[#5fa973] text-[#130f0a] font-semibold px-8 py-4 text-lg shadow-2xl shadow-[#5fa973]/25 hover:shadow-[#5fa973]/40 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Start Free Analysis
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-[#d2c1ab] text-[#d2c1ab] hover:bg-[#d2c1ab] hover:text-[#130f0a] px-8 py-4 text-lg transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-[#d2c1ab]/20"
              >
                Watch Demo
              </Button>
            </div>

            {/* Stats section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in-up delay-800">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#5fa973] mb-2">500+</div>
                <div className="text-[#f2ece6]/70">Businesses Automated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#5fa973] mb-2">90%</div>
                <div className="text-[#f2ece6]/70">Time Saved</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#5fa973] mb-2">$2M+</div>
                <div className="text-[#f2ece6]/70">Revenue Generated</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 bg-[#130f0a]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#d2c1ab]">Trusted by Growing Businesses</h2>
            <p className="text-lg text-[#f2ece6]/80">See what our clients say about their transformation</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-[#d2c1ab]/5 border-[#d2c1ab]/20 hover:bg-[#d2c1ab]/10 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-[#5fa973]/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Users className="h-6 w-6 text-[#5fa973]" />
                    </div>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-[#5fa973] fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-[#f2ece6] mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-[#d2c1ab]">{testimonial.name}</p>
                    <p className="text-sm text-[#f2ece6]/70">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#d2c1ab]">Real Results, Real Transformations</h2>
            <p className="text-xl text-[#f2ece6]/80">See how businesses like yours achieved breakthrough results</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-[#1a1a1a] border-[#333] hover:border-[#5fa973]/30 transition-all duration-300 rounded-2xl">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-[#5fa973] mb-4">
                  Retail Giant Sees 40% Increase in Online Sales Conversion
                </h3>
                <p className="text-[#f2ece6]/80 mb-6 leading-relaxed">
                  Learn how our AI-powered personalization engine transformed their e-commerce platform, boosting
                  customer engagement and sales.
                </p>
                <Button variant="link" className="text-[#5fa973] hover:text-[#44713c] p-0 h-auto font-semibold">
                  Read Case Study <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-[#1a1a1a] border-[#333] hover:border-[#5fa973]/30 transition-all duration-300 rounded-2xl">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-[#5fa973] mb-4">
                  Healthcare Provider Reduces Patient Wait Times by 50%
                </h3>
                <p className="text-[#f2ece6]/80 mb-6 leading-relaxed">
                  Discover how automated scheduling and AI-driven resource allocation streamlined operations and
                  improved patient satisfaction.
                </p>
                <Button variant="link" className="text-[#5fa973] hover:text-[#44713c] p-0 h-auto font-semibold">
                  Read Case Study <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-[#1a1a1a] border-[#333] hover:border-[#5fa973]/30 transition-all duration-300 rounded-2xl">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-[#5fa973] mb-4">
                  Fintech Startup Automates 90% of Customer Support Queries
                </h3>
                <p className="text-[#f2ece6]/80 mb-6 leading-relaxed">
                  Explore how our intelligent chatbot solution freed up their support team to focus on complex issues,
                  enhancing efficiency and customer experience.
                </p>
                <Button variant="link" className="text-[#5fa973] hover:text-[#44713c] p-0 h-auto font-semibold">
                  Read Case Study <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-[#1a1a1a] border-[#333] hover:border-[#5fa973]/30 transition-all duration-300 rounded-2xl">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-[#5fa973] mb-4">
                  Manufacturing Firm Achieves 25% Reduction in Production Waste
                </h3>
                <p className="text-[#f2ece6]/80 mb-6 leading-relaxed">
                  See how AI-driven predictive maintenance and quality control optimized their processes, leading to
                  significant cost savings and sustainability gains.
                </p>
                <Button variant="link" className="text-[#5fa973] hover:text-[#44713c] p-0 h-auto font-semibold">
                  Read Case Study <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Personal Note from Founder */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-[#44713c]/10 border-[#44713c]/30">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-32 h-32 bg-[#d2c1ab]/20 rounded-full flex items-center justify-center">
                  <Users className="h-16 w-16 text-[#5fa973]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4 text-[#d2c1ab]">A Personal Note from Our Founder</h3>
                  <p className="text-[#f2ece6] mb-4 leading-relaxed">
                    "I started this company because I was tired of seeing brilliant entrepreneurs trapped in outdated
                    systems. In 2024, there's no excuse for manual processes that AI can handle better, faster, and more
                    consistently."
                  </p>
                  <p className="text-[#f2ece6] mb-6 leading-relaxed">
                    "Our mission is simple: give you back your time so you can focus on what truly matters - growing
                    your vision and serving your customers. Every system we build is designed to work as your
                    intelligent business partner."
                  </p>
                  <p className="text-[#5fa973] font-semibold">- Alex Thompson, Founder & CEO</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-[#130f0a]/50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#5fa973]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#44713c]/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#f2ece6]">Simple Pricing for Every Stage</h2>
            <p className="text-xl text-[#f2ece6]/70">Choose the perfect plan to scale your business</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 max-w-5xl mx-auto items-stretch">
            {/* Free Tier */}
            <div className="flex-1 bg-[#2a2a2a] border border-[#404040] rounded-2xl p-8 hover:border-[#5fa973]/30 transition-all duration-300 hover:transform hover:scale-105 flex flex-col">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-[#f2ece6] mb-2">Free</h3>
                <div className="flex items-baseline mb-3 h-16">
                  <span className="text-4xl font-bold text-[#5fa973]">$0</span>
                  <span className="text-[#f2ece6]/60 ml-1">/mo</span>
                </div>
                <p className="text-[#f2ece6]/70 h-12">Get started with AI basics.</p>
              </div>

              <div className="space-y-3 mb-8 flex-grow">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-[#5fa973] flex-shrink-0" />
                  <span className="text-[#f2ece6]">Basic AI Chatbot</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-[#5fa973] flex-shrink-0" />
                  <span className="text-[#f2ece6]">Limited Automations</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-[#5fa973] flex-shrink-0" />
                  <span className="text-[#f2ece6]">Email Support</span>
                </div>
              </div>

              <Link href="/get-started" className="w-full">
                <Button className="w-full bg-[#d2c1ab] hover:bg-[#d2c1ab]/80 text-[#130f0a] font-semibold py-3 rounded-xl transition-all duration-300 mt-auto">
                  Get Started Free
                </Button>
              </Link>
            </div>

            {/* Custom Tier */}
            <div className="flex-1 bg-[#2a2a2a] border-2 border-[#5fa973] rounded-2xl p-8 relative hover:transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-[#5fa973]/20 flex flex-col">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#5fa973] text-[#130f0a] px-4 py-2 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>

              <div className="mb-6 mt-2">
                <h3 className="text-2xl font-bold text-[#f2ece6] mb-2">Custom</h3>
                <div className="mb-3 h-16 flex items-baseline">
                  <span className="text-4xl font-bold text-[#5fa973]">Tailored</span>
                </div>
                <p className="text-[#f2ece6]/70 h-12">AI solutions designed for your unique needs.</p>
              </div>

              <div className="space-y-3 mb-8 flex-grow">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-[#5fa973] flex-shrink-0" />
                  <span className="text-[#f2ece6]">All Free Features, plus:</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-[#5fa973] flex-shrink-0" />
                  <span className="text-[#f2ece6]">Advanced AI Chatbots & Agents</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-[#5fa973] flex-shrink-0" />
                  <span className="text-[#f2ece6]">Custom Automation Workflows</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-[#5fa973] flex-shrink-0" />
                  <span className="text-[#f2ece6]">CRM Integration</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-[#5fa973] flex-shrink-0" />
                  <span className="text-[#f2ece6]">Priority Support</span>
                </div>
              </div>

              <Link href="/get-started" className="w-full">
                <Button className="w-full bg-[#5fa973] hover:bg-[#44713c] text-[#130f0a] font-semibold py-3 rounded-xl transition-all duration-300 mt-auto">
                  Request a Quote
                </Button>
              </Link>
            </div>

            {/* BusinessOS */}
            <div className="flex-1 bg-[#2a2a2a] border border-[#404040] rounded-2xl p-8 hover:border-[#5fa973]/30 transition-all duration-300 hover:transform hover:scale-105 flex flex-col">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-[#f2ece6] mb-2">BusinessOS</h3>
                <div className="flex items-baseline mb-3 h-16">
                  <span className="text-4xl font-bold text-[#5fa973]">$8600</span>
                  <span className="text-[#f2ece6]/60 ml-1">/mo</span>
                </div>
                <p className="text-[#f2ece6]/70 h-12">The complete AI-powered operating system.</p>
              </div>

              <div className="space-y-3 mb-8 flex-grow">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-[#5fa973] flex-shrink-0" />
                  <span className="text-[#f2ece6]">All Custom Features, plus:</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-[#5fa973] flex-shrink-0" />
                  <span className="text-[#f2ece6]">Full Business Automation Suite</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-[#5fa973] flex-shrink-0" />
                  <span className="text-[#f2ece6]">AI-Powered Analytics & Reporting</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-[#5fa973] flex-shrink-0" />
                  <span className="text-[#f2ece6]">Dedicated Account Manager</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-[#5fa973] flex-shrink-0" />
                  <span className="text-[#f2ece6]">API Access</span>
                </div>
              </div>

              <Link href="/get-started" className="w-full">
                <Button className="w-full bg-[#d2c1ab] hover:bg-[#d2c1ab]/80 text-[#130f0a] font-semibold py-3 rounded-xl transition-all duration-300 mt-auto">
                  Choose BusinessOS
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-[#44713c]/20 to-[#5fa973]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#d2c1ab]">Ready to Scale Your Business?</h2>
          <p className="text-xl text-[#f2ece6]/90 mb-8 leading-relaxed">
            Stop running your business like it's 2020. Join hundreds of entrepreneurs who've already transformed their
            operations with AI automation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/get-started">
              <Button
                size="lg"
                className="bg-[#5fa973] hover:bg-[#44713c] text-[#130f0a] font-semibold px-8 py-4 text-lg"
              >
                <ArrowRight className="mr-2 h-5 w-5" />
                Start Your Free Analysis
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-[#d2c1ab] text-[#d2c1ab] hover:bg-[#d2c1ab] hover:text-[#130f0a] px-8 py-4 text-lg"
            >
              Schedule a Call
            </Button>
          </div>
          <p className="text-sm text-[#f2ece6]/60 mt-6">
            No credit card required • Free consultation • Results guaranteed
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#d2c1ab]">Frequently Asked Questions</h2>
            <p className="text-xl text-[#f2ece6]/80">Everything you need to know about AI business automation</p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-[#d2c1ab]/20">
                <AccordionTrigger className="text-left text-[#d2c1ab] hover:text-[#5fa973] text-lg font-semibold">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#f2ece6]/90 text-base leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="py-20 bg-[#130f0a] relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
         <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#d2c1ab]">
  Stay Ahead with—<br />
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5fa973] via-[#d2c1ab] to-[#44713c]">
    Large Language Business
  </span>
</h2>

          <p className="text-xl text-[#f2ece6]/80 mb-10 leading-relaxed">
            Get the latest AI automation insights, exclusive tips, and product updates delivered straight to your inbox.
          </p>
          <div className="w-full max-w-md mx-auto">
            <form className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Label htmlFor="email-newsletter" className="sr-only">
                  Email
                </Label>
                <Input
                  id="email-newsletter"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-[#1a1a1a]/50 border border-[#404040] text-[#f2ece6] placeholder:text-[#666] rounded-xl py-3 px-5 pr-12 focus:border-[#5fa973] transition-all duration-300 h-14 text-lg"
                />
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#5fa973]" />
              </div>
              <Button
                type="submit"
                size="lg"
                className="bg-gradient-to-r from-[#5fa973] to-[#44713c] hover:from-[#44713c] hover:to-[#5fa973] text-[#130f0a] font-semibold px-8 py-4 text-lg rounded-xl shadow-lg shadow-[#5fa973]/25 hover:shadow-[#5fa973]/40 transition-all duration-300 hover:transform hover:scale-105"
              >
                Subscribe
              </Button>
            </form>
            <p className="text-sm text-[#f2ece6]/60 mt-4">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#d2c1ab]/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <img src="/logo.png?v=1" alt="WorkFlow MonK" className="h-8 w-8" />
              <span className="text-xl font-bold text-[#d2c1ab]">WorkFlow Monk</span>
            </div>
            <div className="text-[#f2ece6]/60 text-sm">© 2024 WorkFlow Monk. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
