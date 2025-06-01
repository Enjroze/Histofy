"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Calendar, Settings, Camera, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MainLayout from "@/components/main-layout"

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: "Jane Doe",
    email: "jane.doe@example.com",
    location: "New York, USA",
    joinDate: "January 2023",
    bio: "Travel enthusiast and history lover. Always looking for new cultural sites to explore and document.",
    avatar: "/placeholder.svg?height=200&width=200",
  })

  const recentActivity = [
    {
      id: 1,
      action: "Identified",
      site: "Eiffel Tower",
      date: "2 days ago",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      action: "Added to journal",
      site: "Colosseum",
      date: "1 week ago",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      action: "Identified",
      site: "Taj Mahal",
      date: "2 weeks ago",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Sidebar */}
            <div className="w-full md:w-1/3">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center">
                    <div className="relative mb-4">
                      <Image
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                        width={120}
                        height={120}
                        className="rounded-full border-4 border-white shadow-md"
                      />
                      <Button
                        size="icon"
                        className="absolute bottom-0 right-0 rounded-full bg-primary text-white h-8 w-8"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>
                    <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
                    <p className="text-muted-foreground mb-4">{user.email}</p>

                    <div className="w-full space-y-3 mb-6">
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{user.location}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Joined {user.joinDate}</span>
                      </div>
                    </div>

                    <p className="text-sm text-center mb-6">{user.bio}</p>

                    <Link href="/profile/settings" className="w-full">
                      <Button variant="outline" className="w-full">
                        <Settings className="h-4 w-4 mr-2" />
                        Account Settings
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Profile Content */}
            <div className="w-full md:w-2/3">
              <Tabs defaultValue="activity">
                <TabsList className="mb-6">
                  <TabsTrigger value="activity">Recent Activity</TabsTrigger>
                  <TabsTrigger value="stats">Statistics</TabsTrigger>
                </TabsList>

                <TabsContent value="activity" className="space-y-4">
                  <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>

                  {recentActivity.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <div className="flex">
                        <div className="w-24 h-24 shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.site}
                            width={100}
                            height={100}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="p-4 flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm text-muted-foreground">{item.action}</p>
                              <h4 className="font-medium">{item.site}</h4>
                              <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
                            </div>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}

                  <div className="text-center mt-6">
                    <Button variant="outline">View All Activity</Button>
                  </div>
                </TabsContent>

                <TabsContent value="stats">
                  <h3 className="text-xl font-semibold mb-4">Your Statistics</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Sites Identified</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">24</div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Journal Entries</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">12</div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Countries Explored</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">8</div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Saved Sites</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">18</div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
