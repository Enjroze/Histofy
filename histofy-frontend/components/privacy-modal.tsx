"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { motion } from "framer-motion"

interface PrivacyModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function PrivacyModal({ open, onOpenChange }: PrivacyModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl mb-4">Privacy Policy</DialogTitle>
        </DialogHeader>
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <section>
            <h3 className="font-semibold text-lg mb-2">1. Data Collection</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>We collect personal information you provide, such as name and email address.</li>
              <li>
                We also collect data from your interactions with Histofy, including uploaded photos and search queries.
              </li>
              <li>Usage data, such as IP address and browser type, is automatically collected.</li>
              <li>We use cookies and similar tracking technologies to enhance your experience.</li>
            </ul>
          </section>
          <section>
            <h3 className="font-semibold text-lg mb-2">2. Use of Data</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Your data is used to provide and improve Histofy services.</li>
              <li>Uploaded photos are processed by our AI to identify cultural landmarks.</li>
              <li>We may use your email to send important notifications about the service.</li>
              <li>We analyze usage patterns to improve our platform and user experience.</li>
            </ul>
          </section>
          <section>
            <h3 className="font-semibold text-lg mb-2">3. Data Protection</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>We implement security measures to protect your personal information.</li>
              <li>Your data is stored on secure servers with restricted access.</li>
              <li>We do not sell your personal information to third parties.</li>
              <li>We retain your data only as long as necessary to provide our services.</li>
            </ul>
          </section>
          <section>
            <h3 className="font-semibold text-lg mb-2">4. Third-Party Services</h3>
            <p className="text-sm text-muted-foreground">
              Histofy may use third-party services for analytics and performance monitoring. These services may collect
              and process data about your use of Histofy. We ensure these third parties comply with applicable data
              protection laws and maintain appropriate security measures.
            </p>
          </section>
          <section>
            <h3 className="font-semibold text-lg mb-2">5. Your Rights</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>You have the right to access, correct, or delete your personal data.</li>
              <li>You can opt-out of marketing communications at any time.</li>
              <li>You may request a copy of your data that we hold.</li>
              <li>Contact us if you have any questions or concerns about your data.</li>
            </ul>
          </section>
          <section>
            <h3 className="font-semibold text-lg mb-2">6. Children's Privacy</h3>
            <p className="text-sm text-muted-foreground">
              Our service is not intended for children under 13. We do not knowingly collect personal information from
              children under 13. If you believe we have collected information from a child under 13, please contact us
              immediately.
            </p>
          </section>
          <section className="pt-4 border-t">
            <p className="text-xs text-muted-foreground text-center">Last updated: March 14, 2025</p>
          </section>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
