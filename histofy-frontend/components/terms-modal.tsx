"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { motion } from "framer-motion"

interface TermsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function TermsModal({ open, onOpenChange }: TermsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl mb-4">Terms of Service</DialogTitle>
        </DialogHeader>
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <section>
            <h3 className="font-semibold text-lg mb-2">1. User Agreement</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>By using Histofy, you agree to comply with these terms and conditions.</li>
              <li>You must be at least 13 years old to use this service.</li>
              <li>You are responsible for maintaining the confidentiality of your account.</li>
              <li>We reserve the right to terminate accounts that violate our terms.</li>
            </ul>
          </section>
          <section>
            <h3 className="font-semibold text-lg mb-2">2. Content and Copyright</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Users retain ownership of the content they upload.</li>
              <li>
                By uploading content, you grant Histofy a non-exclusive license to use, modify, and display the content.
              </li>
              <li>Do not upload content that infringes on others' intellectual property rights.</li>
              <li>We may remove content that violates our policies without prior notice.</li>
            </ul>
          </section>
          <section>
            <h3 className="font-semibold text-lg mb-2">3. User Conduct</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Do not use Histofy for any illegal or unauthorized purpose.</li>
              <li>Respect other users and their content.</li>
              <li>Do not attempt to interfere with or disrupt the service or its servers.</li>
              <li>Do not harass, threaten, or impersonate others.</li>
            </ul>
          </section>
          <section>
            <h3 className="font-semibold text-lg mb-2">4. Limitation of Liability</h3>
            <p className="text-sm text-muted-foreground">
              Histofy is provided "as is" without any warranties. We are not liable for any damages or losses resulting
              from your use of the service. This includes but is not limited to direct, indirect, incidental,
              consequential, and punitive damages.
            </p>
          </section>
          <section>
            <h3 className="font-semibold text-lg mb-2">5. Changes to Terms</h3>
            <p className="text-sm text-muted-foreground">
              We reserve the right to modify these terms at any time. Continued use of Histofy after changes constitutes
              acceptance of the new terms. We will make reasonable efforts to notify users of significant changes.
            </p>
          </section>
          <section>
            <h3 className="font-semibold text-lg mb-2">6. Governing Law</h3>
            <p className="text-sm text-muted-foreground">
              These terms are governed by and construed in accordance with applicable laws. Any disputes arising from
              these terms will be subject to the exclusive jurisdiction of the courts in our jurisdiction.
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
