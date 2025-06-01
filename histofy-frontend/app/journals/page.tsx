"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Book,
  Plus,
  Search,
  Calendar,
  MapPin,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Grid,
  List,
  Heart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import MainLayout from "@/components/main-layout"
import JournalDetailModal from "@/components/journal-detail-modal"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

interface Journal {
  id: number
  title: string
  location: string
  date: string
  image: string
  notes: string
}

export default function JournalsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddingJournal, setIsAddingJournal] = useState(false)
  const [selectedJournal, setSelectedJournal] = useState<Journal | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [favoriteJournals, setFavoriteJournals] = useState<Set<number>>(new Set())
  const { toast } = useToast()

  const journals: Journal[] = [
    {
      id: 1,
      title: "Eiffel Tower",
      location: "Paris, France",
      date: "June 15, 2023",
      image: "/placeholder.svg?height=200&width=300",
      notes:
        "Amazing view from the top! The architecture is truly impressive. The iron lattice work is a marvel of engineering from the 19th century. Standing at 330 meters tall, it was the world's tallest structure when completed in 1889. The tower offers breathtaking panoramic views of Paris, especially beautiful during sunset when the city lights begin to twinkle.",
    },
    {
      id: 2,
      title: "Colosseum",
      location: "Rome, Italy",
      date: "July 22, 2023",
      image: "/placeholder.svg?height=200&width=300",
      notes:
        "Walking through history. It's incredible how well-preserved it is after thousands of years. The underground chambers where gladiators and wild animals were kept are fascinating. You can almost hear the roar of the crowds from ancient times. The engineering feat of this amphitheater is remarkable - it could hold up to 80,000 spectators.",
    },
    {
      id: 3,
      title: "Taj Mahal",
      location: "Agra, India",
      date: "August 5, 2023",
      image: "/placeholder.svg?height=200&width=300",
      notes:
        "The marble work is exquisite. The symmetry and details are breathtaking. Built as a mausoleum by Emperor Shah Jahan for his wife Mumtaz Mahal, it's a testament to eternal love. The way the white marble changes color throughout the day - from pink at dawn to golden at sunset - is magical. The intricate inlay work with precious stones is unparalleled.",
    },
    {
      id: 4,
      title: "Great Wall of China",
      location: "Beijing, China",
      date: "September 10, 2023",
      image: "/placeholder.svg?height=200&width=300",
      notes:
        "Hiking along the wall was challenging but rewarding. The views are spectacular. Stretching over 13,000 miles, it's an incredible feat of human engineering and determination. The section at Mutianyu was less crowded and offered stunning views of the surrounding mountains. It's humbling to think about the millions of workers who built this over centuries.",
    },
    {
      id: 5,
      title: "Machu Picchu",
      location: "Cusco, Peru",
      date: "October 18, 2023",
      image: "/placeholder.svg?height=200&width=300",
      notes:
        "The journey to get here was as amazing as the destination itself. The ancient city is magical. Perched high in the Andes Mountains, this Incan citadel is a masterpiece of architecture and engineering. The precision of the stone work, done without mortar, is incredible. The spiritual energy of this place is palpable, especially at sunrise when the mist clears to reveal the ancient terraces.",
    },
    {
      id: 6,
      title: "Petra",
      location: "Ma'an, Jordan",
      date: "November 25, 2023",
      image: "/placeholder.svg?height=200&width=300",
      notes:
        "The rose-colored stone is even more beautiful in person. A true wonder. Walking through the narrow Siq canyon and emerging to see the Treasury carved into the rock face is an unforgettable moment. The Nabataean civilization created this incredible city in the desert, with sophisticated water management systems. The colors of the sandstone change throughout the day, creating a constantly shifting palette.",
    },
  ]

  const filteredJournals = journals.filter(
    (journal) =>
      journal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      journal.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      journal.notes.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const favoriteJournalsList = journals.filter((journal) => favoriteJournals.has(journal.id))

  const handleViewDetails = (journal: Journal) => {
    setSelectedJournal(journal)
    setShowDetailModal(true)
  }

  const toggleFavorite = (journalId: number) => {
    const newFavorites = new Set(favoriteJournals)
    if (newFavorites.has(journalId)) {
      newFavorites.delete(journalId)
      toast({
        title: "Removed from favorites",
        description: "Journal removed from your favorites list.",
      })
    } else {
      newFavorites.add(journalId)
      toast({
        title: "Added to favorites",
        description: "Journal added to your favorites list.",
      })
    }
    setFavoriteJournals(newFavorites)
  }

  const renderJournalCard = (journal: Journal, showInGrid = true) => {
    const isFavorite = favoriteJournals.has(journal.id)

    if (showInGrid) {
      return (
        <Card className="overflow-hidden h-full flex flex-col">
          <div className="relative h-48">
            <Image src={journal.image || "/placeholder.svg"} alt={journal.title} fill className="object-cover" />
            <Button
              variant="ghost"
              size="icon"
              className={`absolute top-2 right-2 rounded-full bg-background/80 backdrop-blur-sm ${
                isFavorite ? "text-red-500" : "text-muted-foreground"
              }`}
              onClick={() => toggleFavorite(journal.id)}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
            </Button>
          </div>
          <CardContent className="p-4 flex-1">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-lg">{journal.title}</h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toggleFavorite(journal.id)}>
                    <Heart className={`h-4 w-4 mr-2 ${isFavorite ? "fill-current text-red-500" : ""}`} />
                    {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-500">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex items-center text-sm text-muted-foreground mt-1 mb-2">
              <MapPin className="h-3 w-3 mr-1" />
              <span>{journal.location}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground mb-3">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{journal.date}</span>
            </div>
            <p className="text-sm line-clamp-3">{journal.notes}</p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button variant="outline" size="sm" className="w-full" onClick={() => handleViewDetails(journal)}>
              View Details
            </Button>
          </CardFooter>
        </Card>
      )
    } else {
      return (
        <Card>
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-48 h-32 sm:h-auto relative">
              <Image src={journal.image || "/placeholder.svg"} alt={journal.title} fill className="object-cover" />
              <Button
                variant="ghost"
                size="icon"
                className={`absolute top-2 right-2 rounded-full bg-background/80 backdrop-blur-sm ${
                  isFavorite ? "text-red-500" : "text-muted-foreground"
                }`}
                onClick={() => toggleFavorite(journal.id)}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
              </Button>
            </div>
            <div className="flex-1 p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{journal.title}</h3>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{journal.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{journal.date}</span>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toggleFavorite(journal.id)}>
                      <Heart className={`h-4 w-4 mr-2 ${isFavorite ? "fill-current text-red-500" : ""}`} />
                      {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className="text-sm line-clamp-2 mb-3">{journal.notes}</p>
              <Button variant="outline" size="sm" onClick={() => handleViewDetails(journal)}>
                View Details
              </Button>
            </div>
          </div>
        </Card>
      )
    }
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Journals</h1>
              <p className="text-muted-foreground">Document and organize your cultural site visits</p>
            </div>

            <Dialog open={isAddingJournal} onOpenChange={setIsAddingJournal}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add New Journal
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Add New Journal Entry</DialogTitle>
                  <DialogDescription>Create a new journal entry for a cultural site you've visited.</DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="site-name">Site Name</Label>
                    <Input id="site-name" placeholder="e.g. Eiffel Tower" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="e.g. Paris, France" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="visit-date">Visit Date</Label>
                    <Input id="visit-date" type="date" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="photo">Photo</Label>
                    <div className="border-2 border-dashed rounded-md p-4 text-center cursor-pointer hover:bg-slate-50 transition-colors">
                      <input type="file" id="photo" className="hidden" />
                      <label htmlFor="photo" className="cursor-pointer">
                        <div className="flex flex-col items-center gap-2">
                          <Plus className="h-8 w-8 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Click to upload or drag and drop</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea id="notes" placeholder="Write your thoughts and experiences..." rows={4} />
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddingJournal(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" onClick={() => setIsAddingJournal(false)}>
                    Save Journal
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search journals..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>

              <div className="border rounded-md flex">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  className="rounded-r-none"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  className="rounded-l-none"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Journals</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="favorites">
                Favorites {favoriteJournals.size > 0 && `(${favoriteJournals.size})`}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="m-0">
              {filteredJournals.length === 0 ? (
                <div className="text-center py-12">
                  <Book className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No journals found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery ? "Try a different search term" : "Start by adding your first journal entry"}
                  </p>
                  {!searchQuery && (
                    <Button onClick={() => setIsAddingJournal(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Journal
                    </Button>
                  )}
                </div>
              ) : (
                <div
                  className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}
                >
                  {filteredJournals.map((journal) => (
                    <motion.div
                      key={journal.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {renderJournalCard(journal, viewMode === "grid")}
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="recent" className="m-0">
              <div
                className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}
              >
                {filteredJournals.slice(0, 3).map((journal) => (
                  <motion.div
                    key={journal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderJournalCard(journal, viewMode === "grid")}
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="favorites" className="m-0">
              {favoriteJournalsList.length === 0 ? (
                <div className="text-center py-12">
                  <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No favorites yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Mark journals as favorites by clicking the heart icon to see them here
                  </p>
                </div>
              ) : (
                <div
                  className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}
                >
                  {favoriteJournalsList.map((journal) => (
                    <motion.div
                      key={journal.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {renderJournalCard(journal, viewMode === "grid")}
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <JournalDetailModal
        open={showDetailModal}
        onOpenChange={setShowDetailModal}
        journal={selectedJournal}
        isFavorite={selectedJournal ? favoriteJournals.has(selectedJournal.id) : false}
        onToggleFavorite={selectedJournal ? () => toggleFavorite(selectedJournal.id) : () => {}}
      />
    </MainLayout>
  )
}
