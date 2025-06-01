"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { History } from "lucide-react"

interface SignInModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function SignInModal({ open, onOpenChange }: SignInModalProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Reset errors
    setErrors({})

    // Validate form
    const newErrors: { email?: string; password?: string } = {}

    if (!email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!password) {
      newErrors.password = "Password is required"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Submit form
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      onOpenChange(false)
      // Reset form
      setEmail("")
      setPassword("")
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center justify-center mb-2">
            <History className="h-6 w-6 text-primary mr-2" />
            <span className="font-bold text-xl">Histofy</span>
          </div>
          <DialogTitle className="text-center text-2xl">Sign In</DialogTitle>
          <DialogDescription className="text-center">Enter your credentials to access your account</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Button
                variant="link"
                className="p-0 h-auto text-xs"
                type="button"
                onClick={() => setShowForgotPassword(true)}
              >
                Forgot password?
              </Button>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? "border-destructive" : ""}
            />
            {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign In"}
          </Button>

          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Button
              variant="link"
              className="p-0 h-auto"
              onClick={() => {
                onOpenChange(false)
                // Small delay to avoid modal transition conflicts
                setTimeout(() => {
                  document
                    .querySelector("[data-sign-up-button]")
                    ?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
                }, 100)
              }}
            >
              Sign up
            </Button>
          </div>
        </form>
        {showForgotPassword && (
          <div className="mt-4 p-4 border rounded-md bg-slate-50">
            <h4 className="font-medium mb-2">Reset Password</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            <div className="space-y-3">
              <Input type="email" placeholder="you@example.com" />
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowForgotPassword(false)}>
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    // Simulate sending reset email
                    alert("Password reset link sent to your email")
                    setShowForgotPassword(false)
                  }}
                >
                  Send Reset Link
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
