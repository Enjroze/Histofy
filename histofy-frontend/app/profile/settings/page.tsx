"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { User, Bell, Shield, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MainLayout from "@/components/main-layout"
import LoadingSpinner from "@/components/loading-spinner"

export default function SettingsPage() {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)

  const [profileData, setProfileData] = useState({
    name: "Jane Doe",
    email: "jane.doe@example.com",
    bio: "Travel enthusiast and history lover. Always looking for new cultural sites to explore and document.",
    location: "New York, USA",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    journalReminders: false,
    newFeatures: true,
    marketingEmails: false,
  })

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotificationSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSaveSettings = async () => {
    setIsSaving(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSaving(false)
    // Show success message or redirect
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

          <Tabs defaultValue="profile">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/4">
                <TabsList className="flex flex-col h-auto bg-transparent space-y-1">
                  <TabsTrigger value="profile" className="justify-start w-full data-[state=active]:bg-primary/10">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="justify-start w-full data-[state=active]:bg-primary/10">
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger value="security" className="justify-start w-full data-[state=active]:bg-primary/10">
                    <Shield className="h-4 w-4 mr-2" />
                    Security
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="w-full md:w-3/4">
                <TabsContent value="profile" className="m-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" name="name" value={profileData.name} onChange={handleProfileChange} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" value={profileData.email} onChange={handleProfileChange} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea id="bio" name="bio" value={profileData.bio} onChange={handleProfileChange} rows={4} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          name="location"
                          value={profileData.location}
                          onChange={handleProfileChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="language">Preferred Language</Label>
                        <Select defaultValue="en">
                          <SelectTrigger id="language">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                            <SelectItem value="zh">Chinese</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button onClick={handleSaveSettings} className="mt-4" disabled={isSaving}>
                        {isSaving ? (
                          <>
                            <LoadingSpinner />
                            <span className="ml-2">Saving...</span>
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="notifications" className="m-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <h4 className="font-medium">Email Notifications</h4>
                          <p className="text-sm text-muted-foreground">
                            Receive email notifications about your account activity
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.emailNotifications}
                          onCheckedChange={(checked) => handleNotificationChange("emailNotifications", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <h4 className="font-medium">Journal Reminders</h4>
                          <p className="text-sm text-muted-foreground">Get reminders to update your travel journals</p>
                        </div>
                        <Switch
                          checked={notificationSettings.journalReminders}
                          onCheckedChange={(checked) => handleNotificationChange("journalReminders", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <h4 className="font-medium">New Features</h4>
                          <p className="text-sm text-muted-foreground">
                            Be the first to know about new Histofy features
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.newFeatures}
                          onCheckedChange={(checked) => handleNotificationChange("newFeatures", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <h4 className="font-medium">Marketing Emails</h4>
                          <p className="text-sm text-muted-foreground">Receive promotional emails and special offers</p>
                        </div>
                        <Switch
                          checked={notificationSettings.marketingEmails}
                          onCheckedChange={(checked) => handleNotificationChange("marketingEmails", checked)}
                        />
                      </div>

                      <Button onClick={handleSaveSettings} className="mt-4" disabled={isSaving}>
                        {isSaving ? (
                          <>
                            <LoadingSpinner />
                            <span className="ml-2">Saving...</span>
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="security" className="m-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Security Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>

                      <div className="pt-4">
                        <h4 className="font-medium mb-2">Two-Factor Authentication</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Add an extra layer of security to your account by enabling two-factor authentication.
                        </p>
                        <Button variant="outline">Enable 2FA</Button>
                      </div>

                      <div className="pt-4">
                        <h4 className="font-medium mb-2">Connected Accounts</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Manage third-party services connected to your Histofy account.
                        </p>
                        <div className="space-y-2">
                          <Button variant="outline" className="w-full justify-start">
                            <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                              <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                              />
                              <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                              />
                              <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                              />
                              <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                              />
                              <path d="M1 1h22v22H1z" fill="none" />
                            </svg>
                            Connect Google
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                            </svg>
                            Connect GitHub
                          </Button>
                        </div>
                      </div>

                      <Button onClick={handleSaveSettings} className="mt-4" disabled={isSaving}>
                        {isSaving ? (
                          <>
                            <LoadingSpinner />
                            <span className="ml-2">Saving...</span>
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  )
}
