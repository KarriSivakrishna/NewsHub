import Link from "next/link"
import Image from "next/image"
import { Github, ExternalLink, Search, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function ProjectsPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Community Projects</h1>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Explore open-source projects created by our GDG community members and contribute to ongoing initiatives.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <TabsList className="mb-4 sm:mb-0">
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="web">Web</TabsTrigger>
              <TabsTrigger value="mobile">Mobile</TabsTrigger>
              <TabsTrigger value="cloud">Cloud</TabsTrigger>
            </TabsList>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input type="search" placeholder="Search projects..." className="pl-8 w-full sm:w-[250px]" />
              </div>
              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter by tech" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Technologies</SelectItem>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="angular">Angular</SelectItem>
                  <SelectItem value="flutter">Flutter</SelectItem>
                  <SelectItem value="firebase">Firebase</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="all" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <ProjectCard
                title="GDG Event Manager"
                description="An open-source platform for managing GDG events and attendees. Features include registration, check-in, and analytics."
                tech={["Next.js", "Firebase", "Tailwind CSS"]}
                image="/placeholder.svg?height=400&width=600"
                github="https://github.com/gdg/event-manager"
                demo="https://gdg-event-manager.vercel.app"
                contributors={5}
                category="Web"
              />
              <ProjectCard
                title="Community Learning Hub"
                description="A collaborative learning platform for sharing resources and tutorials. Includes content management and user progress tracking."
                tech={["React", "Node.js", "MongoDB"]}
                image="/placeholder.svg?height=400&width=600"
                github="https://github.com/gdg/learning-hub"
                demo="https://gdg-learning-hub.vercel.app"
                contributors={8}
                category="Web"
              />
              <ProjectCard
                title="GDG Mobile Companion"
                description="A Flutter app for GDG members to track events, connect with other members, and access resources on the go."
                tech={["Flutter", "Firebase", "Google Maps API"]}
                image="/placeholder.svg?height=400&width=600"
                github="https://github.com/gdg/mobile-companion"
                demo="https://gdg-mobile.dev"
                contributors={4}
                category="Mobile"
              />
              <ProjectCard
                title="Cloud Functions Toolkit"
                description="A collection of reusable Google Cloud Functions for common GDG community needs like event notifications and data processing."
                tech={["Node.js", "Google Cloud", "TypeScript"]}
                image="/placeholder.svg?height=400&width=600"
                github="https://github.com/gdg/cloud-functions-toolkit"
                demo="https://gdg-cloud-toolkit.dev"
                contributors={3}
                category="Cloud"
              />
              <ProjectCard
                title="DevFest Website Template"
                description="A customizable website template for GDG DevFest events with schedule, speaker, and venue information."
                tech={["Vue.js", "Firebase", "PWA"]}
                image="/placeholder.svg?height=400&width=600"
                github="https://github.com/gdg/devfest-template"
                demo="https://devfest-template.web.app"
                contributors={12}
                category="Web"
              />
              <ProjectCard
                title="GDG Analytics Dashboard"
                description="A data visualization tool for GDG organizers to track community growth, event attendance, and member engagement."
                tech={["Angular", "D3.js", "Firebase"]}
                image="/placeholder.svg?height=400&width=600"
                github="https://github.com/gdg/analytics-dashboard"
                demo="https://gdg-analytics.web.app"
                contributors={6}
                category="Web"
              />
            </div>
          </TabsContent>

          <TabsContent value="web" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <ProjectCard
                title="GDG Event Manager"
                description="An open-source platform for managing GDG events and attendees. Features include registration, check-in, and analytics."
                tech={["Next.js", "Firebase", "Tailwind CSS"]}
                image="/placeholder.svg?height=400&width=600"
                github="https://github.com/gdg/event-manager"
                demo="https://gdg-event-manager.vercel.app"
                contributors={5}
                category="Web"
              />
              <ProjectCard
                title="Community Learning Hub"
                description="A collaborative learning platform for sharing resources and tutorials. Includes content management and user progress tracking."
                tech={["React", "Node.js", "MongoDB"]}
                image="/placeholder.svg?height=400&width=600"
                github="https://github.com/gdg/learning-hub"
                demo="https://gdg-learning-hub.vercel.app"
                contributors={8}
                category="Web"
              />
              <ProjectCard
                title="DevFest Website Template"
                description="A customizable website template for GDG DevFest events with schedule, speaker, and venue information."
                tech={["Vue.js", "Firebase", "PWA"]}
                image="/placeholder.svg?height=400&width=600"
                github="https://github.com/gdg/devfest-template"
                demo="https://devfest-template.web.app"
                contributors={12}
                category="Web"
              />
            </div>
          </TabsContent>

          <TabsContent value="mobile" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <ProjectCard
                title="GDG Mobile Companion"
                description="A Flutter app for GDG members to track events, connect with other members, and access resources on the go."
                tech={["Flutter", "Firebase", "Google Maps API"]}
                image="/placeholder.svg?height=400&width=600"
                github="https://github.com/gdg/mobile-companion"
                demo="https://gdg-mobile.dev"
                contributors={4}
                category="Mobile"
              />
              <ProjectCard
                title="Flutter UI Components"
                description="A library of reusable Flutter UI components following Material Design guidelines for GDG apps."
                tech={["Flutter", "Dart", "Material Design"]}
                image="/placeholder.svg?height=400&width=600"
                github="https://github.com/gdg/flutter-ui-components"
                demo="https://gdg-flutter-ui.dev"
                contributors={7}
                category="Mobile"
              />
            </div>
          </TabsContent>

          <TabsContent value="cloud" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <ProjectCard
                title="Cloud Functions Toolkit"
                description="A collection of reusable Google Cloud Functions for common GDG community needs like event notifications and data processing."
                tech={["Node.js", "Google Cloud", "TypeScript"]}
                image="/placeholder.svg?height=400&width=600"
                github="https://github.com/gdg/cloud-functions-toolkit"
                demo="https://gdg-cloud-toolkit.dev"
                contributors={3}
                category="Cloud"
              />
              <ProjectCard
                title="GCP Deployment Templates"
                description="Infrastructure as Code templates for deploying GDG applications on Google Cloud Platform."
                tech={["Terraform", "GCP", "CI/CD"]}
                image="/placeholder.svg?height=400&width=600"
                github="https://github.com/gdg/gcp-templates"
                demo="https://gdg-gcp-templates.dev"
                contributors={5}
                category="Cloud"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-12 text-center">
        <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-google-blue mb-4">Contribute</div>
        <h2 className="text-2xl font-bold mb-4">Want to Start a New Project?</h2>
        <p className="max-w-[600px] mx-auto mb-6 text-gray-500">
          Have an idea for a community project? We welcome new initiatives that help our GDG community grow and learn.
        </p>
        <Button asChild className="bg-google-blue text-white hover:bg-google-blue/90">
          <Link href="/projects/propose">Propose a Project</Link>
        </Button>
      </div>
    </div>
  )
}

function ProjectCard({ title, description, tech, image, github, demo, contributors, category }) {
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
        <Badge className="absolute top-2 right-2 bg-primary">{category}</Badge>
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="flex flex-wrap gap-2 mt-1">
          {tech.map((item) => (
            <span
              key={item}
              className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              {item}
            </span>
          ))}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">{description}</p>
        <div className="mt-4 flex items-center text-sm text-gray-500">
          <Users className="mr-1 h-4 w-4" /> {contributors} contributors
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button asChild variant="outline" className="gap-1">
          <Link href={demo} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4 mr-1" />
            Demo
          </Link>
        </Button>
        <Button asChild className="gap-1 bg-google-green hover:bg-google-green/90">
          <Link href={github} target="_blank" rel="noopener noreferrer">
            <Github className="h-4 w-4 mr-1" />
            GitHub
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

function Users(props) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

