import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, Clock, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function EventsPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">GDG Events</h1>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Join our upcoming events or browse past events to watch recordings and access resources.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <Tabs defaultValue="upcoming" className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <TabsList className="mb-4 sm:mb-0">
              <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
              <TabsTrigger value="past">Past Events</TabsTrigger>
            </TabsList>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input type="search" placeholder="Search events..." className="pl-8 w-full sm:w-[250px]" />
              </div>
              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter by type" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  <SelectItem value="workshop">Workshops</SelectItem>
                  <SelectItem value="hackathon">Hackathons</SelectItem>
                  <SelectItem value="meetup">Meetups</SelectItem>
                  <SelectItem value="conference">Conferences</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="upcoming" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <EventCard
                title="Web Development Workshop"
                date="March 25, 2025"
                time="6:00 PM - 8:00 PM"
                location="GDG Hub, Downtown"
                image="/placeholder.svg?height=400&width=600"
                type="Workshop"
              />
              <EventCard
                title="Flutter Hackathon"
                date="April 10, 2025"
                time="9:00 AM - 5:00 PM"
                location="Tech Campus, Innovation Center"
                image="/placeholder.svg?height=400&width=600"
                type="Hackathon"
              />
              <EventCard
                title="Cloud Study Jam"
                date="April 18, 2025"
                time="2:00 PM - 4:00 PM"
                location="Virtual Event"
                image="/placeholder.svg?height=400&width=600"
                type="Study Jam"
              />
              <EventCard
                title="Android Dev Meetup"
                date="May 5, 2025"
                time="7:00 PM - 9:00 PM"
                location="GDG Hub, Downtown"
                image="/placeholder.svg?height=400&width=600"
                type="Meetup"
              />
              <EventCard
                title="Firebase Workshop"
                date="May 15, 2025"
                time="6:00 PM - 8:00 PM"
                location="Tech Campus, Room 302"
                image="/placeholder.svg?height=400&width=600"
                type="Workshop"
              />
              <EventCard
                title="Google I/O Extended"
                date="May 25, 2025"
                time="10:00 AM - 6:00 PM"
                location="Conference Center"
                image="/placeholder.svg?height=400&width=600"
                type="Conference"
              />
            </div>
          </TabsContent>

          <TabsContent value="past" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <EventCard
                title="TensorFlow Workshop"
                date="February 15, 2025"
                time="6:00 PM - 8:00 PM"
                location="GDG Hub, Downtown"
                image="/placeholder.svg?height=400&width=600"
                type="Workshop"
                isPast={true}
              />
              <EventCard
                title="Web Performance Meetup"
                date="January 20, 2025"
                time="7:00 PM - 9:00 PM"
                location="Tech Campus, Room 101"
                image="/placeholder.svg?height=400&width=600"
                type="Meetup"
                isPast={true}
              />
              <EventCard
                title="DevFest 2024"
                date="December 10, 2024"
                time="9:00 AM - 6:00 PM"
                location="Conference Center"
                image="/placeholder.svg?height=400&width=600"
                type="Conference"
                isPast={true}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function EventCard({ title, date, time, location, image, type, isPast = false }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={600}
          height={400}
          className="object-cover w-full h-48"
        />
        <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
          {type}
        </div>
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="flex items-center">
          <Calendar className="mr-1 h-4 w-4" /> {date}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="mr-1 h-4 w-4" /> {time}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <MapPin className="mr-1 h-4 w-4" /> {location}
        </div>
      </CardContent>
      <CardFooter>
        {isPast ? (
          <div className="flex w-full gap-2">
            <Button asChild variant="outline" className="flex-1">
              <Link href="#">View Recording</Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link href="#">Resources</Link>
            </Button>
          </div>
        ) : (
          <Button asChild className="w-full">
            <Link href="#">Register Now</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

function Search(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

