"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { X, ArrowLeft, Sparkles, Zap, Building, Globe, User, Mail, Phone, Calendar } from "lucide-react"

interface FormData {
  businessType: string
  businessDescription: string
  projectType: string
  helpWith: string
  monthlyRevenue: string
  websiteUrl: string
  firstName: string
  lastName: string
  email: string
  phone: string
  countryCode: string
  company: string
}

export default function GetStartedPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isTypingDescription, setIsTypingDescription] = useState(false) // New state for description textarea
  const [isTypingHelpWith, setIsTypingHelpWith] = useState(false) // New state for helpWith textarea
  const [formData, setFormData] = useState<FormData>({
    businessType: "",
    businessDescription: "",
    projectType: "",
    helpWith: "",
    monthlyRevenue: "",
    websiteUrl: "https://",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryCode: "+1",
    company: "",
  })

  const [calComUrl, setCalComUrl] = useState("")
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({})
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)

  // Validation helper functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateWebsite = (url: string): boolean => {
    if (!url || url === "https://") return true // Allow empty or default
    try {
      const urlObj = new URL(url)
      return urlObj.protocol === "http:" || urlObj.protocol === "https:"
    } catch {
      // Check if it's a LinkedIn profile or simple domain
      const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[\w-]+\/?$/i
      const domainRegex = /^(https?:\/\/)?(www\.)?[\w-]+\.[\w-]+(\.[\w-]+)*\/?$/i
      return linkedinRegex.test(url) || domainRegex.test(url)
    }
  }

  const validateField = (field: string, value: string): string => {
    switch (field) {
      case "email":
        if (!value.trim()) return "Email is required"
        if (!validateEmail(value)) return "Please enter a valid email address"
        return ""
      case "websiteUrl":
        if (value && value !== "https://" && !validateWebsite(value)) {
          return "Please enter a valid website URL or LinkedIn profile"
        }
        return ""
      case "firstName":
        if (!value.trim()) return "First name is required"
        if (value.trim().length < 2) return "First name must be at least 2 characters"
        return ""
      case "lastName":
        if (!value.trim()) return "Last name is required"
        if (value.trim().length < 2) return "Last name must be at least 2 characters"
        return ""
      case "company":
        if (!value.trim()) return "Company name is required"
        return ""
      case "phone":
        if (!value.trim()) return "Phone number is required"
        const cleaned = value.replace(/\D/g, "")
        if (cleaned.length < 7) {
          return "Please enter a valid phone number"
        }
        return ""
      default:
        return ""
    }
  }

  // Country codes with flag emojis
  const countryCodes = [
    { code: "+1", country: "US", flag: "🇺🇸", name: "United States" },
    { code: "+1", country: "CA", flag: "🇨🇦", name: "Canada" },
    { code: "+44", country: "GB", flag: "🇬🇧", name: "United Kingdom" },
    { code: "+33", country: "FR", flag: "🇫🇷", name: "France" },
    { code: "+49", country: "DE", flag: "🇩🇪", name: "Germany" },
    { code: "+39", country: "IT", flag: "🇮🇹", name: "Italy" },
    { code: "+34", country: "ES", flag: "🇪🇸", name: "Spain" },
    { code: "+31", country: "NL", flag: "🇳🇱", name: "Netherlands" },
    { code: "+41", country: "CH", flag: "🇨🇭", name: "Switzerland" },
    { code: "+46", country: "SE", flag: "🇸🇪", name: "Sweden" },
    { code: "+47", country: "NO", flag: "🇳🇴", name: "Norway" },
    { code: "+45", country: "DK", flag: "🇩🇰", name: "Denmark" },
    { code: "+358", country: "FI", flag: "🇫🇮", name: "Finland" },
    { code: "+61", country: "AU", flag: "🇦🇺", name: "Australia" },
    { code: "+64", country: "NZ", flag: "🇳🇿", name: "New Zealand" },
    { code: "+81", country: "JP", flag: "🇯🇵", name: "Japan" },
    { code: "+82", country: "KR", flag: "🇰🇷", name: "South Korea" },
    { code: "+86", country: "CN", flag: "🇨🇳", name: "China" },
    { code: "+91", country: "IN", flag: "🇮🇳", name: "India" },
    { code: "+65", country: "SG", flag: "🇸🇬", name: "Singapore" },
    { code: "+852", country: "HK", flag: "🇭🇰", name: "Hong Kong" },
    { code: "+971", country: "AE", flag: "🇦🇪", name: "UAE" },
    { code: "+966", country: "SA", flag: "🇸🇦", name: "Saudi Arabia" },
    { code: "+972", country: "IL", flag: "🇮🇱", name: "Israel" },
    { code: "+90", country: "TR", flag: "🇹🇷", name: "Turkey" },
    { code: "+7", country: "RU", flag: "🇷🇺", name: "Russia" },
    { code: "+55", country: "BR", flag: "🇧🇷", name: "Brazil" },
    { code: "+52", country: "MX", flag: "🇲🇽", name: "Mexico" },
    { code: "+54", country: "AR", flag: "🇦🇷", name: "Argentina" },
    { code: "+56", country: "CL", flag: "🇨🇱", name: "Chile" },
    { code: "+57", country: "CO", flag: "🇨🇴", name: "Colombia" },
    { code: "+27", country: "ZA", flag: "🇿🇦", name: "South Africa" },
    { code: "+20", country: "EG", flag: "🇪🇬", name: "Egypt" },
    { code: "+234", country: "NG", flag: "🇳🇬", name: "Nigeria" },
    { code: "+254", country: "KE", flag: "🇰🇪", name: "Kenya" },
  ]

  // Format phone number based on country
  const formatPhoneNumber = (phone: string, countryCode: string): string => {
    const cleaned = phone.replace(/\D/g, "")

    if (countryCode === "+1") {
      // US/Canada format: (555) 123-4567
      if (cleaned.length >= 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`
      } else if (cleaned.length >= 6) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
      } else if (cleaned.length >= 3) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`
      }
    }

    // For other countries, just add spaces every 3-4 digits
    if (cleaned.length > 6) {
      return cleaned.replace(/(\d{3})(\d{3})(\d+)/, "$1 $2 $3")
    } else if (cleaned.length > 3) {
      return cleaned.replace(/(\d{3})(\d+)/, "$1 $2")
    }

    return cleaned
  }

  const handleFieldChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })

    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors({ ...validationErrors, [field]: "" })
    }
  }

  const handleFieldBlur = (field: string, value: string) => {
    const error = validateField(field, value)
    setValidationErrors({ ...validationErrors, [field]: error })
  }

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value, formData.countryCode)
    setFormData({ ...formData, phone: formatted })

    // Clear validation error when user starts typing
    if (validationErrors.phone) {
      setValidationErrors({ ...validationErrors, phone: "" })
    }
  }

  const businessTypes = [
    { key: "A", value: "service", label: "Service Business" },
    { key: "B", value: "ecommerce", label: "E-commerce" },
    { key: "C", value: "software", label: "Software/SaaS" },
    { key: "D", value: "brick-mortar", label: "Physical Business" },
    { key: "E", value: "other", label: "Other" },
  ]

  const projectTypes = [
    { key: "A", value: "one-time", label: "One-time Project", description: "Custom solution for specific needs" },
    { key: "B", value: "ongoing", label: "Ongoing Partnership", description: "Monthly automation service" },
  ]

  const revenueRanges = [
    { key: "A", value: "<10k", label: "< $10k", color: "from-red-500/20 to-orange-500/20" },
    { key: "B", value: "10k-25k", label: "$10k - $25k", color: "from-orange-500/20 to-yellow-500/20" },
    { key: "C", value: "25k-50k", label: "$25k - $50k", color: "from-yellow-500/20 to-green-500/20" },
    { key: "D", value: "50k-100k", label: "$50k - $100k", color: "from-green-500/20 to-emerald-500/20" },
    { key: "E", value: "100k-200k", label: "$100k - $200k", color: "from-emerald-500/20 to-teal-500/20" },
    { key: "F", value: "200k-500k", label: "$200k - $500k", color: "from-teal-500/20 to-cyan-500/20" },
    { key: "G", value: ">500k", label: "> $500K", color: "from-cyan-500/20 to-blue-500/20" },
  ]

  const handleNext = () => {
    setIsAnimating(true)
    setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1)
      }
      setIsAnimating(false)
    }, 300)
  }

  const handleBack = () => {
    setIsAnimating(true)
    setTimeout(() => {
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1)
      } else {
        router.push("/")
      }
      setIsAnimating(false)
    }, 300)
  }

  const handleSubmit = () => {
    // Construct Cal.com URL with pre-filled data
    const calComBaseUrl = "https://cal.com/ritwik-singh/30min"
    const queryParams = new URLSearchParams()
    queryParams.append("name", `${formData.firstName} ${formData.lastName}`)
    queryParams.append("email", formData.email)
    queryParams.append("company", formData.company)
    queryParams.append("phonenumber", `${formData.countryCode} ${formData.phone}`)

    queryParams.append("custom_businessType", formData.businessType)
    queryParams.append("custom_projectType", formData.projectType)
    queryParams.append("custom_monthlyRevenue", formData.monthlyRevenue)
    queryParams.append("custom_websiteUrl", formData.websiteUrl)
    // Use the custom field identifiers you created in Cal.com
    queryParams.append("custom_helpwith", formData.helpWith)
    queryParams.append("custom_aboutBusiness", formData.businessDescription)

    // Store the full URL to be used by the iframe
    setCalComUrl(`${calComBaseUrl}?${queryParams.toString()}`)

    // Then move to the next step (Step 8)
    handleNext()
  }

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter") {
      action()
    }
  }

  // Auto-focus on text inputs
  useEffect(() => {
    const timer = setTimeout(() => {
      const input = document.querySelector('input[type="text"], input[type="email"], textarea')
      if (input) {
        ;(input as HTMLElement).focus()
      }
    }, 400)
    return () => clearTimeout(timer)
  }, [currentStep])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showCountryDropdown) {
        const target = event.target as Element
        if (!target.closest(".relative")) {
          setShowCountryDropdown(false)
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showCountryDropdown])

  const steps = [
    // Step 0: Welcome
    {
      content: (
        <div className="text-center space-y-8">
          {/* Enhanced Welcome Section */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5fa973] via-[#d2c1ab] to-[#44713c]">
              Let's Transform Your Business
            </span>
          </h1>
          <h2 className="text-2xl md:text-3xl text-[#f2ece6]/90 mb-8 font-medium">
            Ready to automate your way to success?
          </h2>

          <p className="text-[#f2ece6]/80 text-xl leading-relaxed max-w-2xl mx-auto">
            We'll ask you a few quick questions to understand your business and create a personalized automation
            strategy.
          </p>

          <div className="flex items-center justify-center space-x-6 text-[#f2ece6]/60">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#5fa973] rounded-full"></div>
              <span className="text-sm">7 Questions</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#5fa973] rounded-full"></div>
              <span className="text-sm">2 Minutes</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#5fa973] rounded-full"></div>
              <span className="text-sm">Free Analysis</span>
            </div>
          </div>

          <Button
            onClick={handleNext}
            size="lg"
            className="bg-gradient-to-r from-[#5fa973] to-[#44713c] hover:from-[#44713c] hover:to-[#5fa973] text-[#130f0a] font-semibold px-12 py-4 text-lg rounded-full shadow-2xl shadow-[#5fa973]/25 hover:shadow-[#5fa973]/40 transition-all duration-300 hover:transform hover:scale-105"
          >
            <Zap className="mr-2 h-5 w-5" />
            Let's Get Started
          </Button>
        </div>
      ),
    },
    // Step 1: Business Type
    {
      title: "What type of business do you run?",
      subtitle: "Help us understand your industry",
      stepNumber: 1,
      content: (
        <div className="space-y-6">
          <div className="grid gap-4 max-w-2xl mx-auto">
            {businessTypes.map((type, index) => {
              return (
                <button
                  key={type.value}
                  onClick={() => {
                    setFormData({ ...formData, businessType: type.value })
                    setTimeout(handleNext, 500)
                  }}
                  className={`group relative p-6 border border-[#404040] rounded-2xl hover:border-[#5fa973]/50 transition-all duration-300 text-left ${
                    formData.businessType === type.value
                      ? "border-[#5fa973] bg-gradient-to-r from-[#5fa973]/10 to-[#44713c]/10 shadow-lg shadow-[#5fa973]/20"
                      : "bg-[#1a1a1a]/50 backdrop-blur-sm hover:bg-[#1a1a1a]/80"
                  } hover:transform hover:scale-[1.02]`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-[#5fa973] font-mono text-sm opacity-60">{type.key}</span>
                    <h3 className="text-[#f2ece6] font-semibold text-lg">{type.label}</h3>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      ),
    },
    // Step 2: Business Description
    {
      title: "Tell us about your business",
      subtitle: "What makes your business unique?",
      stepNumber: 2,
      content: (
        <div className="max-w-2xl mx-auto space-y-6">
          <div>
            <Textarea
              value={formData.businessDescription}
              onChange={(e) => setFormData({ ...formData, businessDescription: e.target.value })}
              onFocus={() => setIsTypingDescription(true)}
              onBlur={() => setIsTypingDescription(false)}
              placeholder="Describe what your business does in 2-3 sentences. For example: 'I help dentists get more patients using Facebook ads, typically generating $2,000-$5,000 in new revenue per month.'"
              className="bg-[#1a1a1a]/50 backdrop-blur-sm border-2 border-[#404040] focus:border-[#5fa973] rounded-2xl text-[#f2ece6] placeholder:text-[#666] text-lg min-h-[120px] resize-none p-6 transition-all duration-300 flex items-center"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  if (formData.businessDescription.trim()) handleNext()
                }
              }}
            />
            {isTypingDescription && (
              <p className="text-[#666] text-sm mt-2">
                <kbd className="px-2 py-1 bg-[#2a2a2a] rounded text-xs">Shift + Enter</kbd> for new line
              </p>
            )}
          </div>

          {formData.businessDescription.trim() && (
            <div className="text-center">
              <Button
                onClick={handleNext}
                className="bg-[#5fa973] hover:bg-[#44713c] text-[#130f0a] font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:transform hover:scale-105"
              >
                Continue
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Button>
            </div>
          )}
        </div>
      ),
    },
    // Step 3: Project Type
    {
      title: "What type of engagement works best?",
      subtitle: "Choose your preferred working relationship",
      stepNumber: 3,
      content: (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="grid gap-6">
            {projectTypes.map((type, index) => (
              <button
                key={type.value}
                onClick={() => {
                  setFormData({ ...formData, projectType: type.value })
                  setTimeout(handleNext, 500)
                }}
                className={`group relative p-8 border border-[#404040] rounded-2xl hover:border-[#5fa973]/50 transition-all duration-300 text-left ${
                  formData.projectType === type.value
                    ? "border-[#5fa973] bg-gradient-to-r from-[#5fa973]/10 to-[#44713c]/10 shadow-lg shadow-[#5fa973]/20"
                    : "bg-[#1a1a1a]/50 backdrop-blur-sm hover:bg-[#1a1a1a]/80"
                } hover:transform hover:scale-[1.02]`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center space-x-4 mb-3">
                  <span className="text-[#5fa973] font-mono text-lg font-bold">{type.key}</span>
                  <h3 className="text-[#f2ece6] font-bold text-xl">{type.label}</h3>
                </div>
                <p className="text-[#f2ece6]/70 text-base leading-relaxed">{type.description}</p>
              </button>
            ))}
          </div>
        </div>
      ),
    },
    // Step 4: Help With
    {
      title: "What challenges can we solve?",
      subtitle: "Be specific about your automation needs",
      stepNumber: 4,
      content: (
        <div className="max-w-2xl mx-auto space-y-6">
          <div>
            <Textarea
              value={formData.helpWith}
              onChange={(e) => setFormData({ ...formData, helpWith: e.target.value })}
              onFocus={() => setIsTypingHelpWith(true)}
              onBlur={() => setIsTypingHelpWith(false)}
              placeholder="Describe your biggest business challenges or time-consuming tasks. The more specific you are, the better we can help. For example: 'I spend 10 hours a week manually following up with leads and scheduling appointments.'"
              className="bg-[#1a1a1a]/50 backdrop-blur-sm border-2 border-[#404040] focus:border-[#5fa973] rounded-2xl text-[#f2ece6] placeholder:text-[#666] text-lg min-h-[140px] resize-none p-6 transition-all duration-300 flex items-center"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  if (formData.helpWith.trim()) handleNext()
                }
              }}
            />
            {isTypingHelpWith && (
              <p className="text-[#666] text-sm mt-2">
                <kbd className="px-2 py-1 bg-[#2a2a2a] rounded text-xs">Shift + Enter</kbd> for new line
              </p>
            )}
          </div>

          {formData.helpWith.trim() && (
            <div className="text-center">
              <Button
                onClick={handleNext}
                className="bg-[#5fa973] hover:bg-[#44713c] text-[#130f0a] font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:transform hover:scale-105"
              >
                Continue
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Button>
            </div>
          )}
        </div>
      ),
    },
    // Step 5: Monthly Revenue
    {
      title: "What's your monthly revenue?",
      subtitle: "This helps us recommend the right solution",
      stepNumber: 5,
      content: (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="grid gap-3">
            {revenueRanges.map((range, index) => (
              <button
                key={range.value}
                onClick={() => {
                  setFormData({ ...formData, monthlyRevenue: range.value })
                  setTimeout(handleNext, 500)
                }}
                className={`group relative p-4 border border-[#404040] rounded-xl hover:border-[#5fa973]/50 transition-all duration-300 text-left ${
                  formData.monthlyRevenue === range.value
                    ? "border-[#5fa973] bg-gradient-to-r from-[#5fa973]/10 to-[#44713c]/10 shadow-lg shadow-[#5fa973]/20"
                    : "bg-[#1a1a1a]/50 backdrop-blur-sm hover:bg-[#1a1a1a]/80"
                } hover:transform hover:scale-[1.02]`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-3 h-3 rounded-full bg-gradient-to-r ${range.color} border border-[#5fa973]/30`}
                  ></div>
                  <span className="text-[#5fa973] font-mono text-sm opacity-60">{range.key}</span>
                  <span className="text-[#f2ece6] font-semibold text-lg">{range.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      ),
    },
    // Step 6: Website URL
    {
      title: "Where can we learn more?",
      subtitle: "Share your website or LinkedIn profile",
      stepNumber: 6,
      content: (
        <div className="max-w-xl mx-auto space-y-6">
          <div className="relative">
            <div className="absolute left-4 top-[20px] z-10">
              <Globe className="h-5 w-5 text-[#5fa973]" />
            </div>
            <Input
              value={formData.websiteUrl}
              onChange={(e) => handleFieldChange("websiteUrl", e.target.value)}
              onBlur={(e) => handleFieldBlur("websiteUrl", e.target.value)}
              placeholder="https://yourwebsite.com or LinkedIn profile"
              className={`bg-[#1a1a1a]/50 backdrop-blur-sm border-2 ${
                validationErrors.websiteUrl
                  ? "border-red-500 focus:border-red-500"
                  : "border-[#404040] focus:border-[#5fa973]"
              } rounded-xl text-[#f2ece6] text-lg pl-12 py-4 transition-all duration-300 h-14 flex items-center`}
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  formData.websiteUrl.trim() &&
                  formData.websiteUrl !== "https://" &&
                  !validationErrors.websiteUrl
                ) {
                  handleNext()
                }
              }}
            />
            {validationErrors.websiteUrl && (
              <p className="text-red-400 text-sm mt-2 flex items-center">
                <span className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center mr-2 text-xs">!</span>
                {validationErrors.websiteUrl}
              </p>
            )}
          </div>

          <p className="text-[#5fa973]/80 text-center text-sm">
            Don't have a website? No problem! Share your LinkedIn profile instead.
          </p>

          {formData.websiteUrl.trim() && formData.websiteUrl !== "https://" && !validationErrors.websiteUrl && (
            <div className="text-center">
              <Button
                onClick={handleNext}
                className="bg-[#5fa973] hover:bg-[#44713c] text-[#130f0a] font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:transform hover:scale-105"
              >
                Continue
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Button>
            </div>
          )}
        </div>
      ),
    },
    // Step 7: Contact Info
    {
      title: "Let's connect!",
      subtitle: "How should we reach out to you?",
      stepNumber: 7,
      content: (
        <div className="max-w-xl mx-auto space-y-6">
          <div className="grid gap-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <div className="absolute left-4 top-[20px] z-10">
                  <User className="h-5 w-5 text-[#5fa973]" />
                </div>
                <Input
                  value={formData.firstName}
                  onChange={(e) => handleFieldChange("firstName", e.target.value)}
                  onBlur={(e) => handleFieldBlur("firstName", e.target.value)}
                  placeholder="First name"
                  className={`bg-[#1a1a1a]/50 backdrop-blur-sm border-2 ${
                    validationErrors.firstName
                      ? "border-red-500 focus:border-red-500"
                      : "border-[#404040] focus:border-[#5fa973]"
                  } rounded-xl text-[#f2ece6] pl-12 py-4 transition-all duration-300 h-14 flex items-center`}
                />
                {validationErrors.firstName && (
                  <p className="text-red-400 text-xs mt-1">{validationErrors.firstName}</p>
                )}
              </div>
              <div className="relative">
                <div className="absolute left-4 top-[20px] z-10">
                  <User className="h-5 w-5 text-[#5fa973]" />
                </div>
                <Input
                  value={formData.lastName}
                  onChange={(e) => handleFieldChange("lastName", e.target.value)}
                  onBlur={(e) => handleFieldBlur("lastName", e.target.value)}
                  placeholder="Last name"
                  className={`bg-[#1a1a1a]/50 backdrop-blur-sm border-2 ${
                    validationErrors.lastName
                      ? "border-red-500 focus:border-red-500"
                      : "border-[#404040] focus:border-[#5fa973]"
                  } rounded-xl text-[#f2ece6] pl-12 py-4 transition-all duration-300 h-14 flex items-center`}
                />
                {validationErrors.lastName && <p className="text-red-400 text-xs mt-1">{validationErrors.lastName}</p>}
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-4 top-[20px] z-10">
                <Mail className="h-5 w-5 text-[#5fa973]" />
              </div>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleFieldChange("email", e.target.value)}
                onBlur={(e) => handleFieldBlur("email", e.target.value)}
                placeholder="your@email.com"
                className={`bg-[#1a1a1a]/50 backdrop-blur-sm border-2 ${
                  validationErrors.email
                    ? "border-red-500 focus:border-red-500"
                    : "border-[#404040] focus:border-[#5fa973]"
                } rounded-xl text-[#f2ece6] pl-12 py-4 transition-all duration-300 h-14 flex items-center`}
              />
              {validationErrors.email && (
                <p className="text-red-400 text-sm mt-2 flex items-center">
                  <span className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center mr-2 text-xs">
                    !
                  </span>
                  {validationErrors.email}
                </p>
              )}
            </div>

            <div className="relative">
              <div className="flex">
                {/* Country Code Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                    className="bg-[#1a1a1a]/50 backdrop-blur-sm border-2 border-[#404040] hover:border-[#5fa973]/50 rounded-l-xl text-[#f2ece6] px-4 py-4 h-14 flex items-center space-x-2 transition-all duration-300 min-w-[100px]"
                  >
                    <span className="text-lg">
                      {countryCodes.find((c) => c.code === formData.countryCode)?.flag || "🇺🇸"}
                    </span>
                    <span className="text-sm font-mono">{formData.countryCode}</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showCountryDropdown && (
                    <div className="absolute top-full left-0 mt-1 w-80 bg-[#1a1a1a] border border-[#404040] rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto">
                      {countryCodes.map((country) => (
                        <button
                          key={`${country.code}-${country.country}`}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, countryCode: country.code })
                            setShowCountryDropdown(false)
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-[#2a2a2a] transition-colors flex items-center space-x-3"
                        >
                          <span className="text-lg">{country.flag}</span>
                          <span className="font-mono text-sm text-[#5fa973]">{country.code}</span>
                          <span className="text-[#f2ece6] text-sm">{country.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Phone Input */}
                <div className="flex-1 relative">
                  <div className="absolute left-4 top-[20px] z-10">
                    <Phone className="h-5 w-5 text-[#5fa973]" />
                  </div>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    onBlur={(e) => handleFieldBlur("phone", e.target.value)}
                    placeholder="(555) 123-4567"
                    className={`bg-[#1a1a1a]/50 backdrop-blur-sm border-2 ${
                      validationErrors.phone
                        ? "border-red-500 focus:border-red-500"
                        : "border-[#404040] focus:border-[#5fa973]"
                    } rounded-r-xl border-l-0 text-[#f2ece6] pl-12 py-4 transition-all duration-300 h-14 flex items-center`}
                  />
                </div>
              </div>
              {validationErrors.phone && (
                <p className="text-red-400 text-sm mt-2 flex items-center">
                  <span className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center mr-2 text-xs">
                    !
                  </span>
                  {validationErrors.phone}
                </p>
              )}
            </div>

            <div className="relative">
              <div className="absolute left-4 top-[20px] z-10">
                <Building className="h-5 w-5 text-[#5fa973]" />
              </div>
              <Input
                value={formData.company}
                onChange={(e) => handleFieldChange("company", e.target.value)}
                onBlur={(e) => handleFieldBlur("company", e.target.value)}
                placeholder="Company name"
                className={`bg-[#1a1a1a]/50 backdrop-blur-sm border-2 ${
                  validationErrors.company
                    ? "border-red-500 focus:border-red-500"
                    : "border-[#404040] focus:border-[#5fa973]"
                } rounded-xl text-[#f2ece6] pl-12 py-4 transition-all duration-300 h-14 flex items-center`}
              />
              {validationErrors.company && <p className="text-red-400 text-xs mt-1">{validationErrors.company}</p>}
            </div>
          </div>

          {formData.firstName &&
            formData.lastName &&
            formData.email &&
            formData.phone &&
            formData.company &&
            !validationErrors.firstName &&
            !validationErrors.lastName &&
            !validationErrors.email &&
            !validationErrors.phone &&
            !validationErrors.company && (
              <div className="text-center pt-4">
                <Button
                  onClick={handleSubmit}
                  size="lg"
                  className="bg-gradient-to-r from-[#5fa973] to-[#44713c] hover:from-[#44713c] hover:to-[#5fa973] text-[#130f0a] font-semibold px-12 py-4 text-lg rounded-full shadow-2xl shadow-[#5fa973]/25 hover:shadow-[#5fa973]/40 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule My Call
                </Button>
                <p className="text-[#f2ece6]/60 text-sm mt-3">
                  Choose a time that works best for your personalized consultation
                </p>
              </div>
            )}
        </div>
      ),
    },
    // Step 8: Calendar Booking
    {
      title: "Pick Your Perfect Time",
      subtitle: "Schedule your free automation consultation",
      stepNumber: 8,
      content: (
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-6 py-3 bg-[#5fa973]/10 border border-[#5fa973]/20 rounded-full mb-6">
              <Sparkles className="h-5 w-5 text-[#5fa973] mr-2" />
              <span className="text-[#5fa973] font-medium">Almost there, {formData.firstName}!</span>
            </div>
            <p className="text-[#f2ece6]/80 text-lg max-w-2xl mx-auto">
              Select a time that works best for you. We'll discuss your business needs and create a personalized
              automation roadmap.
            </p>
          </div>

          {/* Cal.com Embed */}
          <div className="bg-[#1a1a1a]/50 backdrop-blur-sm border border-[#404040] rounded-2xl p-6 min-h-[600px]">
            <iframe
              src={calComUrl} // Use the state variable here
              width="100%"
              height="600"
              frameBorder="0"
              className="rounded-xl"
              title="Schedule a meeting"
            ></iframe>
          </div>

          <div className="text-center">
            <p className="text-[#f2ece6]/60 text-sm mb-4">
              Can't find a suitable time? Email us at{" "}
              <a href="mailto:hello@workflowmonk.com" className="text-[#5fa973] hover:underline">
                hello@workflowmonk.com
              </a>
            </p>
            <Button
              onClick={() => router.push("/?success=true")}
              variant="outline"
              className="bg-transparent border-[#d2c1ab] text-[#d2c1ab] hover:bg-[#d2c1ab] hover:text-[#130f0a] px-6 py-2"
            >
              I'll Schedule Later
            </Button>
          </div>
        </div>
      ),
    },
  ]

  const currentStepData = steps[currentStep]
  const progress = currentStep === 0 ? 0 : ((currentStep - 1) / (steps.length - 2)) * 100

  return (
    <div className="min-h-screen bg-[#130f0a] text-[#f2ece6] relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#130f0a] via-[#1a1410] to-[#130f0a]"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#5fa973]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#44713c]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#5fa973]/5 to-[#44713c]/5 rounded-full blur-3xl"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-[#5fa973]/40 rounded-full animate-float"></div>
      <div className="absolute top-40 right-20 w-3 h-3 bg-[#44713c]/40 rounded-full animate-float delay-1000"></div>
      <div className="absolute bottom-40 left-20 w-2 h-2 bg-[#d2c1ab]/40 rounded-full animate-float delay-500"></div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 lg:p-8">
          <button
            onClick={handleBack}
            className="flex items-center text-[#666] hover:text-[#f2ece6] transition-all duration-300 group"
          >
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:transform group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">{currentStep === 0 ? "Back to Home" : "Back"}</span>
          </button>

          <div className="flex items-center space-x-3">
            <div className="relative">
              <img src="/logo.png?v=1" alt="WorkFlow MonK" className="h-8 w-8" />
              <div className="absolute inset-0 bg-[#5fa973]/20 rounded-full blur-lg opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <span className="text-xl font-bold text-[#d2c1ab] hidden sm:inline">WorkFlow Monk</span>
          </div>

          <button
            onClick={() => router.push("/")}
            className="text-[#666] hover:text-[#f2ece6] transition-colors p-2 hover:bg-[#1a1a1a]/50 rounded-full"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Progress Bar */}
        {currentStep > 0 && currentStep < steps.length - 1 && (
          <div className="px-6 lg:px-8 mb-8">
            <div className="max-w-2xl mx-auto">
              <div className="flex justify-between text-sm text-[#666] mb-3">
                <span>
                  Step {currentStep} of {steps.length - 2}
                </span>
                <span>{Math.round(progress)}% complete</span>
              </div>
              <div className="w-full bg-[#1a1a1a] rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#5fa973] to-[#44713c] h-2 rounded-full transition-all duration-700 ease-out relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-6 lg:px-8 pb-8">
          <div
            className={`w-full max-w-4xl transition-all duration-500 ${isAnimating ? "opacity-0 transform translate-y-8" : "opacity-100 transform translate-y-0"}`}
          >
            <div className="text-center mb-12">
              {currentStepData.stepNumber && (
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#5fa973] to-[#44713c] rounded-full text-[#130f0a] font-bold text-lg mb-6 shadow-lg shadow-[#5fa973]/25">
                  {currentStepData.stepNumber}
                </div>
              )}

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#f2ece6] mb-4 leading-tight">
                {currentStepData.title}
              </h1>

              {currentStepData.subtitle && (
                <p className="text-xl text-[#f2ece6]/70 mb-8 max-w-2xl mx-auto">{currentStepData.subtitle}</p>
              )}
            </div>

            <div className="animate-fade-in-up">{currentStepData.content}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
