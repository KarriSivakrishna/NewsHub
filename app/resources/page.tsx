import Link from "next/link"
import Image from "next/image"
import { Search, Filter, BookOpen, Video, Code } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function ResourcesPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Learning Resources</h1>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Access tutorials, articles, and videos to enhance your skills in Google technologies.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="relative mb-4 sm:mb-0 sm:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input type="search" placeholder="Search resources..." className="pl-8" />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Select>
              <SelectTrigger className="w-full sm:w-[180px]">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by topic" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Topics</SelectItem>
                <SelectItem value="web">Web Development</SelectItem>
                <SelectItem value="mobile">Mobile Development</SelectItem>
                <SelectItem value="cloud">Cloud & DevOps</SelectItem>
                <SelectItem value="ml">Machine Learning</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full sm:w-[180px]">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by level" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <ResourceCard
                title="Getting Started with Firebase"
                description="Learn how to set up Firebase for your web applications and leverage its powerful features."
                type="article"
                topic="Web Development"
                level="Beginner"
                author="Alex Johnson"
                date="March 15, 2025"
                image="/placeholder.svg?height=400&width=600"
                link="#"
              />
              <ResourceCard
                title="Flutter UI Masterclass"
                description="A comprehensive guide to building beautiful UIs with Flutter, covering widgets, themes, and animations."
                type="video"
                topic="Mobile Development"
                level="Intermediate"
                author="Maria Garcia"
                date="February 28, 2025"
                image="/placeholder.svg?height=400&width=600"
                link="#"
              />
              <ResourceCard
                title="Building Your First PWA"
                description="Step-by-step guide to creating Progressive Web Apps that work offline and load instantly."
                type="tutorial"
                topic="Web Development"
                level="Beginner"
                author="David Kim"
                date="April 5, 2025"
                image="/placeholder.svg?height=400&width=600"
                link="#"
              />
              <ResourceCard
                title="Advanced Angular Techniques"
                description="Explore advanced patterns and practices in Angular development for enterprise applications."
                type="article"
                topic="Web Development"
                level="Advanced"
                author="James Wilson"
                date="March 22, 2025"
                image="/placeholder.svg?height=400&width=600"
                link="#"
              />
              <ResourceCard
                title="TensorFlow for Beginners"
                description="Introduction to machine learning with TensorFlow, covering basic concepts and your first ML model."
                type="video"
                topic="Machine Learning"
                level="Beginner"
                author="Sarah Chen"
                date="April 12, 2025"
                image="/placeholder.svg?height=400&width=600"
                link="#"
              />
              <ResourceCard
                title="Cloud Functions Deep Dive"
                description="Understanding serverless architecture with Google Cloud Functions for scalable applications."
                type="article"
                topic="Cloud & DevOps"
                level="Intermediate"
                author="Priya Patel"
                date="March 30, 2025"
                image="/placeholder.svg?height=400&width=600"
                link="#"
              />
            </div>
          </TabsContent>

          <TabsContent value="articles" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <ResourceCard
                title="Getting Started with Firebase"
                description="Learn how to set up Firebase for your web applications and leverage its powerful features."
                type="article"
                topic="Web Development"
                level="Beginner"
                author="Alex Johnson"
                date="March 15, 2025"
                image="/placeholder.svg?height=400&width=600"
                link="#"
              />
              <ResourceCard
                title="Advanced Angular Techniques"
                description="Explore advanced patterns and practices in Angular development for enterprise applications."
                type="article"
                topic="Web Development"
                level="Advanced"
                author="James Wilson"
                date="March 22, 2025"
                image="/placeholder.svg?height=400&width=600"
                link="#"
              />
              <ResourceCard
                title="Cloud Functions Deep Dive"
                description="Understanding serverless architecture with Google Cloud Functions for scalable applications."
                type="article"
                topic="Cloud & DevOps"
                level="Intermediate"
                author="Priya Patel"
                date="March 30, 2025"
                image="/placeholder.svg?height=400&width=600"
                link="#"
              />
            </div>
          </TabsContent>

          <TabsContent value="videos" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <ResourceCard
                title="Flutter UI Masterclass"
                description="A comprehensive guide to building beautiful UIs with Flutter, covering widgets, themes, and animations."
                type="video"
                topic="Mobile Development"
                level="Intermediate"
                author="Maria Garcia"
                date="February 28, 2025"
                image="/placeholder.svg?height=400&width=600"
                link="#"
              />
              <ResourceCard
                title="TensorFlow for Beginners"
                description="Introduction to machine learning with TensorFlow, covering basic concepts and your first ML model."
                type="video"
                topic="Machine Learning"
                level="Beginner"
                author="Sarah Chen"
                date="April 12, 2025"
                image="/placeholder.svg?height=400&width=600"
                link="#"
              />
            </div>
          </TabsContent>

          <TabsContent value="tutorials" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <ResourceCard
                title="Building Your First PWA"
                description="Step-by-step guide to creating Progressive Web Apps that work offline and load instantly."
                type="tutorial"
                topic="Web Development"
                level="Beginner"
                author="David Kim"
                date="April 5, 2025"
                image="/placeholder.svg?height=400&width=600"
                link="#"
              />
              <ResourceCard
                title="Kotlin Coroutines Workshop"
                description="Hands-on tutorial for asynchronous programming in Kotlin for Android development."
                type="tutorial"
                topic="Mobile Development"
                level="Intermediate"
                author="Priya Patel"
                date="March 18, 2025"
                image="/placeholder.svg?height=400&width=600"
                link="#"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-12 text-center">
        <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-google-blue mb-4">Contribute</div>
        <h2 className="text-2xl font-bold mb-4">Share Your Knowledge</h2>
        <p className="max-w-[600px] mx-auto mb-6 text-gray-500">
          Have a tutorial, article, or video that could help other developers? Submit your resource to our community
          library.
        </p>
        <Button asChild className="bg-google-blue text-white hover:bg-google-blue/90">
          <Link href="/resources/submit">Submit a Resource</Link>
        </Button>
      </div>
    </div>
  )
}

function ResourceCard({ title, description, type, topic, level, author, date, image, link }) {
  return (
    <Card className="overflow-hidden gdg-card">
      <div className="relative">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={600}
          height={400}
          className="object-cover w-full h-48"
        />
        <Badge
          className={`absolute top-2 right-2 ${
            type === "article" ? "bg-google-blue" : type === "video" ? "bg-google-red" : "bg-google-green"
          }`}
        >
          {type}
        </Badge>
      </div>
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline">{topic}</Badge>
          <Badge variant="outline">{level}</Badge>
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          By {author} • {date}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">{description}</p>
      </CardContent>
      <CardFooter>
        <Button
          asChild
          className={`w-full gap-1 ${
            type === "article"
              ? "bg-google-blue hover:bg-google-blue/90"
              : type === "video"
                ? "bg-google-red hover:bg-google-red/90"
                : "bg-google-green hover:bg-google-green/90"
          }`}
        >
          <Link href={link}>
            {type === "article" ? (
              <>
                <BookOpen className="h-4 w-4 mr-1" /> Read Article
              </>
            ) : type === "video" ? (
              <>
                <Video className="h-4 w-4 mr-1" /> Watch Video
              </>
            ) : (
              <>
                <Code className="h-4 w-4 mr-1" /> Start Tutorial
              </>
            )}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

