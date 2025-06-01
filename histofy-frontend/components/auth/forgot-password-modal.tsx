"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { History } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ForgotPasswordModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onBackToSignIn: () => void
}

export default function ForgotPasswordModal({ open, onOpenChange, onBackToSignIn }: ForgotPasswordModalProps) {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send a request to your backend to initiate the password reset process
    setIsSubmitted(true)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center justify-center mb-2">
            <History className="h-6 w-6 text-primary mr-2" />
            <span className="font-bold text-xl">Histofy</span>
          </div>
          <DialogTitle className="text-center text-2xl mb-4">Reset Password</DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form
              key="reset-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="reset-email">Email</Label>
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Send Reset Link
              </Button>
              <Button type="button" variant="outline" className="w-full" onClick={onBackToSignIn}>
                Back to Sign In
              </Button>
            </motion.form>
          ) : (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center space-y-4"
            >
              <p className="text-green-600">A password reset link has been sent to your email.</p>
              <Button type="button" variant="outline" className="w-full" onClick={onBackToSignIn}>
                Back to Sign In
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
