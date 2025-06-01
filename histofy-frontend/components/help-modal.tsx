"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Loader2 } from "lucide-react"

interface HelpModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function HelpModal({ open, onOpenChange }: HelpModalProps) {
  const [activeTab, setActiveTab] = useState<"faq" | "contact">("faq")
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  })
  const [formErrors, setFormErrors] = useState({
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    let valid = true
    const newErrors = { email: "", message: "" }

    if (!formData.email) {
      newErrors.email = "Email is required"
      valid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
      valid = false
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
      valid = false
    }

    setFormErrors(newErrors)
    return valid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          email: "",
          subject: "",
          message: "",
        })
      }, 3000)
    }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl mb-4">Help Center</DialogTitle>
        </DialogHeader>

        <div className="flex border-b mb-6">
          <button
            className={`pb-2 px-4 text-sm font-medium transition-colors relative ${
              activeTab === "faq" ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveTab("faq")}
          >
            Frequently Asked Questions
            {activeTab === "faq" && (
              <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" layoutId="activeTab" />
            )}
          </button>
          <button
            className={`pb-2 px-4 text-sm font-medium transition-colors relative ${
              activeTab === "contact" ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveTab("contact")}
          >
            Contact Support
            {activeTab === "contact" && (
              <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" layoutId="activeTab" />
            )}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "faq" ? (
            <motion.div
              key="faq"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium text-base mb-1">How do I upload a photo?</h4>
                  <p className="text-sm text-muted-foreground">
                    Click the "Upload" button on the home page, or drag and drop an image into the designated area. We
                    support JPG, PNG, and HEIC formats with a maximum file size of 10MB.
                  </p>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium text-base mb-1">What if my photo isn't recognized?</h4>
                  <p className="text-sm text-muted-foreground">
                    Ensure the landmark is clearly visible and try uploading a different angle. Our AI works best with
                    well-lit, unobstructed views of cultural sites. You can also use the "I Don't Agree" button to
                    provide feedback if the identification is incorrect.
                  </p>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium text-base mb-1">How do I save sites to my journal?</h4>
                  <p className="text-sm text-muted-foreground">
                    After identifying a site, click the "Save to My Journals" button. You can access all saved sites in
                    the "My Journals" section of your account. You can organize them, add notes, and create custom
                    collections.
                  </p>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium text-base mb-1">Is my data secure?</h4>
                  <p className="text-sm text-muted-foreground">
                    Yes, we take data security seriously. Your uploaded photos and personal information are protected
                    using industry-standard encryption. You can review our Privacy Policy for more details on how we
                    handle your data.
                  </p>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium text-base mb-1">Can I use Histofy offline?</h4>
                  <p className="text-sm text-muted-foreground">
                    Currently, Histofy requires an internet connection to identify sites as our AI processing happens on
                    our servers. However, you can access your saved journals offline if you've previously loaded them.
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <AnimatePresence>
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
                  >
                    <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <Check className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-medium text-green-800 mb-2">Message Sent Successfully!</h3>
                    <p className="text-sm text-green-600">
                      Thank you for contacting us. We'll get back to you as soon as possible.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Your Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={formErrors.email ? "border-red-300" : ""}
                      />
                      {formErrors.email && <p className="text-xs text-red-500">{formErrors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </Label>
                      <Input
                        type="text"
                        id="subject"
                        name="subject"
                        placeholder="What's your question about?"
                        value={formData.subject}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-medium">
                        Message <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Describe your issue or question in detail..."
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        className={formErrors.message ? "border-red-300" : ""}
                      />
                      {formErrors.message && <p className="text-xs text-red-500">{formErrors.message}</p>}
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      We typically respond within 24-48 hours during business days.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
