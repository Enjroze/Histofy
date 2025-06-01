"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { History, User, Book, LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { motion } from "framer-motion"
import TermsModal from "@/components/terms-modal"
import PrivacyModal from "@/components/privacy-modal"
import HelpModal from "@/components/help-modal"

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [showPrivacyModal, setShowPrivacyModal] = useState(false)
  const [showHelpModal, setShowHelpModal] = useState(false)

  const handleLogout = () => {
    // Handle logout logic
    router.push("/auth")
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto py-4 px-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2">
              <History className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Histofy</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/dashboard"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Dashboard
              </Link>

              <div className="flex items-center gap-4">
                <Link href="/journals">
                  <motion.div
                    className="flex items-center gap-1 text-sm font-medium text-primary px-3 py-2 rounded-md hover:bg-primary/10 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Book className="h-4 w-4" />
                    <span>My Journals</span>
                  </motion.div>
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.div
                      className="flex items-center gap-1 text-sm font-medium text-primary px-3 py-2 rounded-md hover:bg-primary/10 transition-colors cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </motion.div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/profile">My Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile/settings">Account Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                      <LogOut className="h-4 w-4 mr-2" />
                      <span>Log Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden py-4 space-y-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="/dashboard"
                className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/journals"
                className="block py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <Book className="h-4 w-4" />
                  <span>My Journals</span>
                </div>
              </Link>
              <Link
                href="/profile"
                className="block py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </div>
              </Link>
              <Button
                variant="ghost"
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 px-2"
                onClick={() => {
                  setMobileMenuOpen(false)
                  handleLogout()
                }}
              >
                <LogOut className="h-4 w-4 mr-2" />
                <span>Log Out</span>
              </Button>
            </motion.div>
          )}
        </div>
      </header>

      <main className="flex-1">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          {children}
        </motion.div>
      </main>

      <footer className="bg-white border-t py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <History className="h-5 w-5 text-primary" />
              <span className="font-bold">Histofy</span>
            </div>
            <div className="flex gap-8">
              <button
                onClick={() => setShowTermsModal(true)}
                className="text-sm text-muted-foreground hover:text-primary hover:underline transition-colors"
              >
                Terms
              </button>
              <button
                onClick={() => setShowPrivacyModal(true)}
                className="text-sm text-muted-foreground hover:text-primary hover:underline transition-colors"
              >
                Privacy
              </button>
              <button
                onClick={() => setShowHelpModal(true)}
                className="text-sm text-muted-foreground hover:text-primary hover:underline transition-colors"
              >
                Help
              </button>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Histofy. All rights reserved.
          </div>
        </div>
      </footer>
      <TermsModal open={showTermsModal} onOpenChange={setShowTermsModal} />
      <PrivacyModal open={showPrivacyModal} onOpenChange={setShowPrivacyModal} />
      <HelpModal open={showHelpModal} onOpenChange={setShowHelpModal} />
    </div>
  )
}
