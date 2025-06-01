"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { History } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import LoadingSpinner from "@/components/loading-spinner"
import HowItWorksModal from "@/components/how-it-works-modal"
import AboutModal from "@/components/about-modal"
import TermsModal from "@/components/terms-modal"
import PrivacyModal from "@/components/privacy-modal"
import HelpModal from "@/components/help-modal"

export default function AuthPage() {
  const router = useRouter()
  const [isSignIn, setIsSignIn] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const [showHowItWorks, setShowHowItWorks] = useState(false)
  const [showAbout, setShowAbout] = useState(false)

  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false)
  const [resetEmail, setResetEmail] = useState("")

  const [showTermsModal, setShowTermsModal] = useState(false)
  const [showPrivacyModal, setShowPrivacyModal] = useState(false)
  const [showHelpModal, setShowHelpModal] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Redirect to main site after successful authentication
    router.push("/dashboard")
  }

  const handleForgotPassword = () => {
    setShowForgotPasswordForm(true)
  }

  const handleSendResetLink = () => {
    if (resetEmail) {
      // Simulate sending reset email
      alert("Password reset link has been sent to your email.")
      setShowForgotPasswordForm(false)
      setResetEmail("")
    } else {
      alert("Please enter your email address")
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="container mx-auto py-6 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Histofy</span>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => setShowHowItWorks(true)}>
              How it Works
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setShowAbout(true)}>
              About
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setShowHelpModal(true)}>
              Help
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg border-0">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center mb-6">
              <History className="h-8 w-8 text-primary mr-2" />
              <span className="text-2xl font-bold">Histofy</span>
            </div>

            <div className="flex gap-2 mb-6">
              <Button variant={isSignIn ? "default" : "outline"} className="flex-1" onClick={() => setIsSignIn(true)}>
                Sign In
              </Button>
              <Button variant={!isSignIn ? "default" : "outline"} className="flex-1" onClick={() => setIsSignIn(false)}>
                Sign Up
              </Button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={isSignIn ? "signin" : "signup"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isSignIn && (
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required={!isSignIn}
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      {isSignIn && (
                        <Button
                          variant="link"
                          className="p-0 h-auto text-xs"
                          onClick={handleForgotPassword}
                          type="button"
                        >
                          Forgot password?
                        </Button>
                      )}
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? <LoadingSpinner /> : isSignIn ? "Sign In" : "Create Account"}
                  </Button>
                </form>
              </motion.div>
            </AnimatePresence>

            {isSignIn && showForgotPasswordForm && (
              <div className="mt-4 p-4 border rounded-md bg-slate-50">
                <h4 className="font-medium mb-2">Reset Password</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
                <div className="space-y-3">
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setShowForgotPasswordForm(false)}>
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleSendResetLink}>
                      Send Reset Link
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <div className="text-center text-sm mt-6">
              {isSignIn ? "Don't have an account? " : "Already have an account? "}
              <Button variant="link" className="p-0 h-auto" onClick={() => setIsSignIn(!isSignIn)}>
                {isSignIn ? "Sign up" : "Sign in"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      {/* Modals */}
      <HowItWorksModal open={showHowItWorks} onOpenChange={setShowHowItWorks} />
      <AboutModal open={showAbout} onOpenChange={setShowAbout} />
      <TermsModal open={showTermsModal} onOpenChange={setShowTermsModal} />
      <PrivacyModal open={showPrivacyModal} onOpenChange={setShowPrivacyModal} />
      <HelpModal open={showHelpModal} onOpenChange={setShowHelpModal} />
    </div>
  )
}
