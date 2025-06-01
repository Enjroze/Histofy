"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, Info, MapPin } from "lucide-react"
import MainLayout from "@/components/main-layout"
import UploadArea from "@/components/upload-area"
import { useState } from "react"
import ExploreModal from "@/components/explore-modal"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  const [showExploreModal, setShowExploreModal] = useState(false)

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <section className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4 sm:text-5xl">
            Discover the history behind cultural sites
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Upload a photo of any cultural landmark or historical site and instantly learn about its name, history, and
            significance.
          </p>
          <div className="flex justify-center">
            <Button
              onClick={() => setShowExploreModal(true)}
              className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              Explore Sample Sites
            </Button>
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-16">
          <Card className="shadow-md border-0 bg-white">
            <CardContent className="p-8">
              <UploadArea />
            </CardContent>
          </Card>
        </section>

        <section className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium text-lg mb-2">Upload a photo</h3>
            <p className="text-muted-foreground">Drag and drop or select a photo of any cultural site or landmark.</p>
          </div>
          <div className="text-center p-6">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Info className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium text-lg mb-2">Get information</h3>
            <p className="text-muted-foreground">
              Our AI identifies the site and provides detailed historical information.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium text-lg mb-2">Explore more</h3>
            <p className="text-muted-foreground">Discover related sites and plan your next cultural adventure.</p>
          </div>
        </section>

        <ExploreModal open={showExploreModal} onOpenChange={setShowExploreModal} />
      </div>
    </MainLayout>
  )
}
