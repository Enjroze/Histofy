import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { History } from "lucide-react"

interface AboutModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function AboutModal({ open, onOpenChange }: AboutModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl mb-4">About Histofy</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto pr-2 space-y-4">
          <div className="flex items-center justify-center mb-4">
            <History className="h-8 w-8 text-primary mr-2" />
            <span className="text-2xl font-bold">Histofy</span>
          </div>
          <p className="text-center text-muted-foreground">Bringing history closer through AI</p>
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Our Mission</h3>
            <p className="text-sm text-muted-foreground">
              Histofy aims to make historical and cultural knowledge accessible to everyone. By leveraging cutting-edge
              AI technology, we bridge the gap between the physical world of landmarks and the vast realm of historical
              information.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">The Team</h3>
            <p className="text-sm text-muted-foreground">
              Our diverse team of historians, AI specialists, and software engineers work together to bring you accurate
              and fascinating insights about cultural landmarks worldwide.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Data Sources</h3>
            <p className="text-sm text-muted-foreground">We utilize a wide range of reputable sources, including:</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground mt-1">
              <li>UNESCO World Heritage archives</li>
              <li>National historical databases</li>
              <li>Academic research publications</li>
              <li>Verified local historical records</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Our Technology</h3>
            <p className="text-sm text-muted-foreground">
              Histofy employs state-of-the-art machine learning models for image recognition, natural language
              processing for information retrieval, and a user-friendly interface to deliver a seamless experience.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
