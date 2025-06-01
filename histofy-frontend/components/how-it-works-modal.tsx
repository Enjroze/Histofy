import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Upload, Search, Info } from "lucide-react"

interface HowItWorksModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function HowItWorksModal({ open, onOpenChange }: HowItWorksModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl mb-4">How Histofy Works</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">1. Upload a Photo</h3>
              <p className="text-sm text-muted-foreground">
                Take or upload a photo of any cultural landmark or historical site.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <Search className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">2. AI Identification</h3>
              <p className="text-sm text-muted-foreground">Our AI technology identifies the site in your photo.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <Info className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">3. Get Detailed Information</h3>
              <p className="text-sm text-muted-foreground">
                Receive comprehensive historical information about the identified site.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
