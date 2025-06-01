"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { MapPin, Calendar, Edit, Save, X, Heart, Share2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Journal {
  id: number
  title: string
  location: string
  date: string
  image: string
  notes: string
}

interface JournalDetailModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  journal: Journal | null
  isFavorite: boolean
  onToggleFavorite: () => void
}

export default function JournalDetailModal({
  open,
  onOpenChange,
  journal,
  isFavorite,
  onToggleFavorite,
}: JournalDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedJournal, setEditedJournal] = useState<Journal | null>(null)

  if (!journal) return null

  const handleEdit = () => {
    setEditedJournal({ ...journal })
    setIsEditing(true)
  }

  const handleSave = () => {
    if (editedJournal) {
      // Here you would typically save to your backend
      console.log("Saving journal:", editedJournal)
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditedJournal(null)
    setIsEditing(false)
  }

  const handleInputChange = (field: keyof Journal, value: string) => {
    if (editedJournal) {
      setEditedJournal({
        ...editedJournal,
        [field]: value,
      })
    }
  }

  const currentJournal = isEditing ? editedJournal : journal

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">
              {isEditing ? (
                <Input
                  value={editedJournal?.title || ""}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="text-2xl font-bold border-none p-0 h-auto"
                />
              ) : (
                currentJournal?.title
              )}
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleFavorite}
                className={isFavorite ? "text-red-500" : "text-muted-foreground"}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
              </Button>
              <Button variant="ghost" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image */}
          <div className="relative h-64 sm:h-80 rounded-lg overflow-hidden">
            <Image
              src={currentJournal?.image || "/placeholder.svg"}
              alt={currentJournal?.title || "Journal image"}
              fill
              className="object-cover"
            />
          </div>

          {/* Location and Date */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {isEditing ? (
                <Input
                  value={editedJournal?.location || ""}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  className="border-none p-0 h-auto"
                />
              ) : (
                <span>{currentJournal?.location}</span>
              )}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {isEditing ? (
                <Input
                  type="date"
                  value={editedJournal?.date ? new Date(editedJournal.date).toISOString().split("T")[0] : ""}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  className="border-none p-0 h-auto"
                />
              ) : (
                <span>{currentJournal?.date}</span>
              )}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">My Notes</h3>
              <AnimatePresence>
                {!isEditing ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <Button variant="outline" size="sm" onClick={handleEdit}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    className="flex gap-2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <Button variant="outline" size="sm" onClick={handleCancel}>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleSave}>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {isEditing ? (
              <Textarea
                value={editedJournal?.notes || ""}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                rows={6}
                className="resize-none"
                placeholder="Write your thoughts and experiences..."
              />
            ) : (
              <div className="bg-muted/30 p-4 rounded-lg">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{currentJournal?.notes}</p>
              </div>
            )}
          </div>

          {/* Tags/Categories (Future feature) */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Tags</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Architecture</Badge>
              <Badge variant="secondary">Historical</Badge>
              <Badge variant="secondary">France</Badge>
              <Badge variant="secondary">Landmark</Badge>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-muted/20 p-4 rounded-lg space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground">Journal Details</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Created:</span>
                <span className="ml-2">{currentJournal?.date}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Last Modified:</span>
                <span className="ml-2">{currentJournal?.date}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
