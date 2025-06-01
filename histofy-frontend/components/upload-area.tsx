"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, Camera, X } from "lucide-react"
import Image from "next/image"
import SiteIdentificationResult from "./site-identification-result"

export default function UploadArea() {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isIdentifying, setIsIdentifying] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const removeImage = () => {
    setUploadedImage(null)
    setIsIdentifying(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleIdentifySite = () => {
    setIsIdentifying(true)
  }

  return (
    <div className="w-full">
      {!uploadedImage ? (
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
            isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/20"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="mx-auto w-16 h-16 mb-4 bg-primary/10 rounded-full flex items-center justify-center">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-medium mb-2">Upload a photo of a cultural site</h3>
          <p className="text-muted-foreground mb-6">Drag and drop your image here, or click to browse</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={triggerFileInput} className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Browse Files
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              Take Photo
            </Button>
          </div>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
          <p className="text-xs text-muted-foreground mt-6">Supported formats: JPG, PNG, HEIC. Max file size: 10MB</p>
        </div>
      ) : isIdentifying ? (
        <SiteIdentificationResult imageUrl={uploadedImage} onReset={removeImage} />
      ) : (
        <div className="relative">
          <div className="rounded-xl overflow-hidden border border-muted">
            <Image
              src={uploadedImage || "/placeholder.svg"}
              alt="Uploaded image"
              width={800}
              height={500}
              className="w-full h-auto max-h-[400px] object-contain"
            />
          </div>
          <div className="absolute top-2 right-2">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full bg-background/80 backdrop-blur-sm"
              onClick={removeImage}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Remove image</span>
            </Button>
          </div>
          <div className="mt-4 flex justify-center">
            <Button className="px-8" onClick={handleIdentifySite}>
              Identify This Site
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
