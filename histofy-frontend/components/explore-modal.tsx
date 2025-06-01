import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"

interface ExploreModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function ExploreModal({ open, onOpenChange }: ExploreModalProps) {
  const landmarks = [
    {
      name: "Eiffel Tower",
      description: "Iconic iron lattice tower on the Champ de Mars in Paris, France.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      name: "Taj Mahal",
      description: "An ivory-white marble mausoleum and UNESCO World Heritage Site in Agra, India.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      name: "Great Wall of China",
      description: "Ancient fortification system built across the historical northern borders of China.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      name: "Machu Picchu",
      description: "15th-century Inca citadel situated on a mountain ridge in Peru.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      name: "Colosseum",
      description: "Oval amphitheatre in the center of Rome, the largest ancient amphitheatre ever built.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      name: "Petra",
      description: "Historical and archaeological city in southern Jordan famous for its rock-cut architecture.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      name: "Stonehenge",
      description: "Prehistoric monument consisting of a ring of standing stones in Wiltshire, England.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      name: "Angkor Wat",
      description: "Temple complex in Cambodia and the largest religious monument in the world.",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[85vw] max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl mb-4">Explore Famous Cultural Sites</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto pr-2 pb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {landmarks.map((landmark, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <Image
                    src={landmark.image || "/placeholder.svg"}
                    alt={landmark.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                </CardContent>
                <CardFooter className="flex flex-col items-start p-4">
                  <h3 className="font-semibold text-lg">{landmark.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{landmark.description}</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
