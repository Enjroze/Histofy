"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, ThumbsDown, Save, Loader2, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface SiteIdentificationResultProps {
  imageUrl: string
  onReset: () => void
}

export default function SiteIdentificationResult({ imageUrl, onReset }: SiteIdentificationResultProps) {
  const [isIdentifying, setIsIdentifying] = useState(true)
  const [isLiked, setIsLiked] = useState(false)
  const [showDisagreeForm, setShowDisagreeForm] = useState(false)
  const [disagreeData, setDisagreeData] = useState({
    correctSite: "",
    comment: "",
  })
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const { toast } = useToast()

  // Simulated site data - in a real app, this would come from an API
  const siteData = {
    name: "Eiffel Tower",
    location: "Paris, France",
    description:
      "The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower from 1887 to 1889 as the entrance to the 1889 World's Fair.",
    year: "1889",
    height: "330 meters",
    architect: "Gustave Eiffel",
  }

  // Simulate the identification process
  setTimeout(() => {
    if (isIdentifying) {
      setIsIdentifying(false)
    }
  }, 2000)

  const handleLike = () => {
    setIsLiked(!isLiked)
    if (!isLiked) {
      toast({
        title: "Thanks for your feedback!",
        description: "You liked this identification.",
      })
    }
  }

  const handleDisagree = () => {
    setShowDisagreeForm(!showDisagreeForm)
  }

  const handleDisagreeSubmit = () => {
    // In a real app, this would send the data to an API
    toast({
      title: "Feedback submitted",
      description: "Thank you for helping us improve our identifications.",
    })
    setShowDisagreeForm(false)
  }

  const handleSaveToJournals = () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setIsSaved(true)
      toast({
        title: "Saved to My Journals!",
        description: "You can view this site in your journals section.",
      })
    }, 1000)
  }

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {isIdentifying ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-12"
          >
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
            <h3 className="text-lg font-medium">Identifying site...</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Our AI is analyzing your image to identify the cultural site.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative mb-6">
              <div className="absolute top-2 right-2 z-10">
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full bg-background/80 backdrop-blur-sm"
                  onClick={onReset}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close result</span>
                </Button>
              </div>
              <div className="rounded-xl overflow-hidden border border-muted">
                <Image
                  src={imageUrl || "/placeholder.svg"}
                  alt="Uploaded image"
                  width={800}
                  height={500}
                  className="w-full h-auto max-h-[400px] object-contain"
                />
              </div>
            </div>

            <Card className="mb-6">
              <CardContent className="p-6">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <h2 className="text-2xl font-bold mb-1">{siteData.name}</h2>
                  <p className="text-muted-foreground mb-4">{siteData.location}</p>
                  <p className="mb-4">{siteData.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Year Built</h4>
                      <p>{siteData.year}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Height</h4>
                      <p>{siteData.height}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Architect</h4>
                      <p>{siteData.architect}</p>
                    </div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                <Button
                  variant={isLiked ? "default" : "outline"}
                  className={`w-full ${isLiked ? "bg-green-600 hover:bg-green-700" : ""}`}
                  onClick={handleLike}
                >
                  <Heart className={`h-4 w-4 mr-2 ${isLiked ? "fill-white" : "fill-none"}`} />
                  {isLiked ? "Liked" : "Like This Identification"}
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                <Button
                  variant={showDisagreeForm ? "default" : "outline"}
                  className={`w-full ${showDisagreeForm ? "bg-amber-600 hover:bg-amber-700" : ""}`}
                  onClick={handleDisagree}
                >
                  <ThumbsDown className="h-4 w-4 mr-2" />I Don't Agree
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                <Button
                  variant={isSaved ? "default" : "outline"}
                  className={`w-full ${isSaved ? "bg-primary hover:bg-primary/90" : ""}`}
                  onClick={handleSaveToJournals}
                  disabled={isSaving || isSaved}
                >
                  {isSaving ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : isSaved ? (
                    <Check className="h-4 w-4 mr-2" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  {isSaving ? "Saving..." : isSaved ? "Saved to Journals" : "Save to My Journals"}
                </Button>
              </motion.div>
            </div>

            <AnimatePresence>
              {showDisagreeForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="mb-6">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-medium mb-4">Help us improve</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="correct-site">What do you think this site is?</Label>
                          <Input
                            id="correct-site"
                            placeholder="e.g. Arc de Triomphe"
                            value={disagreeData.correctSite}
                            onChange={(e) => setDisagreeData({ ...disagreeData, correctSite: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="comment">Additional comments (optional)</Label>
                          <Textarea
                            id="comment"
                            placeholder="Tell us why you think the identification is incorrect..."
                            value={disagreeData.comment}
                            onChange={(e) => setDisagreeData({ ...disagreeData, comment: e.target.value })}
                            rows={3}
                          />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" onClick={() => setShowDisagreeForm(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleDisagreeSubmit}>Submit Feedback</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
