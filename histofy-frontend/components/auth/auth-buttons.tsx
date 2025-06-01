"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"
import { History } from "lucide-react"
import ForgotPasswordModal from "./forgot-password-modal"

export default function AuthButtons() {
  const [showAuth, setShowAuth] = useState(false)
  const [isSignIn, setIsSignIn] = useState(true)
  const [showForgotPassword, setShowForgotPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Form submitted")
  }

  return (
    <>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          className="border-primary text-primary hover:bg-primary hover:text-white transition-colors"
          onClick={() => {
            setIsSignIn(true)
            setShowAuth(true)
          }}
        >
          Sign In
        </Button>
        <Button
          className="bg-primary text-white hover:bg-primary/90 transition-colors"
          onClick={() => {
            setIsSignIn(false)
            setShowAuth(true)
          }}
        >
          Sign Up
        </Button>
      </div>

      <Dialog open={showAuth} onOpenChange={setShowAuth}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="flex items-center justify-center mb-2">
              <History className="h-6 w-6 text-primary mr-2" />
              <span className="font-bold text-xl">Histofy</span>
            </div>
            <DialogTitle className="text-center text-2xl">{isSignIn ? "Sign In" : "Create Account"}</DialogTitle>
          </DialogHeader>

          <AnimatePresence mode="wait">
            <motion.div
              key={isSignIn ? "signin" : "signup"}
              initial={{ opacity: 0, x: isSignIn ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isSignIn ? 20 : -20 }}
              transition={{ duration: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                {!isSignIn && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" type="text" placeholder="John Doe" required />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" required />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    {isSignIn && (
                      <Button
                        variant="link"
                        className="p-0 h-auto text-xs"
                        onClick={(e) => {
                          e.preventDefault()
                          setShowForgotPassword(true)
                        }}
                      >
                        Forgot password?
                      </Button>
                    )}
                  </div>
                  <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  {isSignIn ? "Sign In" : "Create Account"}
                </Button>
              </form>
            </motion.div>
          </AnimatePresence>

          <div className="text-center text-sm mt-4">
            {isSignIn ? "Don't have an account? " : "Already have an account? "}
            <Button variant="link" className="p-0 h-auto" onClick={() => setIsSignIn(!isSignIn)}>
              {isSignIn ? "Sign up" : "Sign in"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <ForgotPasswordModal
        open={showForgotPassword}
        onOpenChange={setShowForgotPassword}
        onBackToSignIn={() => {
          setShowForgotPassword(false)
          setShowAuth(true)
        }}
      />
    </>
  )
}
