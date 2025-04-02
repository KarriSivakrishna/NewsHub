import Link from "next/link"
import { Calendar, Users, Code, Bell, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function DashboardPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight gdg-gradient-text">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Alex! Here's what's happening in your GDG community.</p>
        </div>
        <Button className="mt-4 md:mt-0 bg-google-blue hover:bg-google-blue/90">
          <Bell className="mr-2 h-4 w-4" />
          Notifications
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="gdg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Events Attended</CardTitle>
            <Calendar className="h-4 w-4 text-google-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card className="gdg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
            <svg className="h-4 w-4 text-google-green" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-14.243l2.121 2.121 3.182-3.182 1.414 1.414-4.596 4.596-3.536-3.536 1.415-1.413z" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Cloud, Web, Flutter badges</p>
          </CardContent>
        </Card>
        <Card className="gdg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contributions</CardTitle>
            <Code className="h-4 w-4 text-google-yellow" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Projects contributed to</p>
          </CardContent>
        </Card>
        <Card className="gdg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Community Rank</CardTitle>
            <Users className="h-4 w-4 text-google-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Silver</div>
            <p className="text-xs text-muted-foreground">Top 15% of members</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-6">
        <Card className="col-span-4 gdg-card">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Events you've registered for</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 text-center">
                  <div className="text-xl font-bold text-google-blue">25</div>
                  <div className="text-xs text-muted-foreground">MAR</div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">Web Development Workshop</h4>
                  <p className="text-sm text-muted-foreground">6:00 PM - 8:00 PM • GDG Hub, Downtown</p>
                </div>
                <Badge className="bg-google-green">Registered</Badge>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-14 text-center">
                  <div className="text-xl font-bold text-google-blue">10</div>
                  <div className="text-xs text-muted-foreground">APR</div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">Flutter Hackathon</h4>
                  <p className="text-sm text-muted-foreground">9:00 AM - 5:00 PM • Tech Campus</p>
                </div>
                <Badge className="bg-google-green">Registered</Badge>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-14 text-center">
                  <div className="text-xl font-bold text-google-blue">18</div>
                  <div className="text-xs text-muted-foreground">APR</div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">Cloud Study Jam</h4>
                  <p className="text-sm text-muted-foreground">2:00 PM - 4:00 PM • Virtual Event</p>
                </div>
                <Badge variant="outline">Not Registered</Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              asChild
              variant="outline"
              className="w-full border-google-blue text-google-blue hover:bg-google-blue/10"
            >
              <Link href="/events">
                View All Events
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="col-span-3 gdg-card">
          <CardHeader>
            <CardTitle>Your Badges</CardTitle>
            <CardDescription>Achievements you've earned</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-blue-100 p-3 mb-2">
                  <svg className="h-6 w-6 text-google-blue" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5V7L12 12 2 7v10z" />
                  </svg>
                </div>
                <span className="text-xs text-center">Cloud Expert</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-green-100 p-3 mb-2">
                  <svg className="h-6 w-6 text-google-green" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                  </svg>
                </div>
                <span className="text-xs text-center">Web Dev</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-purple-100 p-3 mb-2">
                  <svg className="h-6 w-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.5 4.5c-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5-1.45 0-2.99.22-4.28.79C1.49 5.62 1 6.33 1 7.14v11.28c0 1.3 1.22 2.26 2.48 1.94.98-.25 2.02-.36 3.02-.36 1.56 0 3.22.26 4.56.92.6.3 1.28.3 1.87 0 1.34-.67 3-.92 4.56-.92 1 0 2.04.11 3.02.36 1.26.32 2.48-.63 2.48-1.94V7.14c0-.81-.49-1.52-1.22-1.85-1.28-.57-2.82-.79-4.27-.79zM21 17.23c0 .63-.58 1.09-1.2.98-.75-.14-1.53-.2-2.3-.2-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5.92 0 1.83.09 2.7.28.46.1.8.51.8.98v9.47z" />
                  </svg>
                </div>
                <span className="text-xs text-center">Flutter</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-yellow-100 p-3 mb-2">
                  <svg className="h-6 w-6 text-google-yellow" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
                  </svg>
                </div>
                <span className="text-xs text-center">Codelab</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-red-100 p-3 mb-2">
                  <svg className="h-6 w-6 text-google-red" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z" />
                    <path d="M12 17l-5-5h10z" />
                  </svg>
                </div>
                <span className="text-xs text-center">Firebase</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-gray-100 p-3 mb-2">
                  <svg className="h-6 w-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                  </svg>
                </div>
                <span className="text-xs text-center">DevFest</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              asChild
              variant="outline"
              className="w-full border-google-green text-google-green hover:bg-google-green/10"
            >
              <Link href="/badges">
                View All Badges
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-6">
        <Card className="gdg-card">
          <CardHeader>
            <CardTitle>Community Activity</CardTitle>
            <CardDescription>Recent updates from your GDG community</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@user1" />
                  <AvatarFallback>MG</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">Maria Garcia</h4>
                    <span className="text-xs text-muted-foreground">2 hours ago</span>
                  </div>
                  <p className="text-sm">Shared resources from the Flutter Workshop. Check them out!</p>
                  <div className="mt-2 rounded-md border p-2">
                    <Link href="#" className="text-sm text-google-blue hover:underline">
                      Flutter Workshop Resources - Slides and Code Samples
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@user2" />
                  <AvatarFallback>DK</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">David Kim</h4>
                    <span className="text-xs text-muted-foreground">Yesterday</span>
                  </div>
                  <p className="text-sm">Posted a new project looking for contributors:</p>
                  <div className="mt-2 rounded-md border p-2">
                    <h5 className="font-medium">GDG Event Manager</h5>
                    <p className="text-xs text-muted-foreground">
                      Looking for React and Firebase developers to help build our community event platform.
                    </p>
                    <Button variant="link" className="h-auto p-0 text-google-blue">
                      View Project
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@gdgadmin" />
                  <AvatarFallback>GDG</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">GDG Admin</h4>
                    <span className="text-xs text-muted-foreground">2 days ago</span>
                  </div>
                  <p className="text-sm">Announced a new event: Google I/O Extended on May 25, 2025</p>
                  <Button variant="link" className="h-auto p-0 text-google-blue">
                    Register Now
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              asChild
              variant="outline"
              className="w-full border-google-yellow text-google-yellow hover:bg-google-yellow/10"
            >
              <Link href="/community">
                View All Activity
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

