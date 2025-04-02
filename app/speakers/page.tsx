import Image from "next/image"
import Link from "next/link"
import { Search, Filter, Twitter, Github, Linkedin, Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function SpeakersPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Featured Speakers</h1>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Learn from industry experts and Google Developer Experts (GDEs) who share their knowledge and experience.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <TabsList className="mb-4 sm:mb-0">
              <TabsTrigger value="all">All Speakers</TabsTrigger>
              <TabsTrigger value="gde">Google Developer Experts</TabsTrigger>
              <TabsTrigger value="community">Community Speakers</TabsTrigger>
              <TabsTrigger value="google">Google Engineers</TabsTrigger>
            </TabsList>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input type="search" placeholder="Search speakers..." className="pl-8 w-full sm:w-[250px]" />
              </div>
              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter by expertise" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Expertise</SelectItem>
                  <SelectItem value="web">Web Development</SelectItem>
                  <SelectItem value="mobile">Mobile Development</SelectItem>
                  <SelectItem value="cloud">Cloud & DevOps</SelectItem>
                  <SelectItem value="ml">Machine Learning</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="all" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <SpeakerCard
                name="Alex Johnson"
                title="Senior Web Developer"
                company="TechCorp"
                expertise="Web Development"
                bio="Alex is a Google Developer Expert in Web Technologies with over 10 years of experience building scalable web applications."
                image="/placeholder.svg?height=300&width=300"
                twitter="alexjdev"
                github="alexjohnson"
                linkedin="alexjohnson-dev"
                website="https://alexjohnson.dev"
                type="GDE"
              />
              <SpeakerCard
                name="Maria Garcia"
                title="Flutter Developer"
                company="MobileApps Inc."
                expertise="Flutter & Mobile"
                bio="Maria specializes in cross-platform mobile development with Flutter and has contributed to several open-source Flutter projects."
                image="/placeholder.svg?height=300&width=300"
                twitter="mariagarcia"
                github="mariagarcia"
                linkedin="maria-garcia"
                website="https://mariagarcia.dev"
                type="GDE"
              />
              <SpeakerCard
                name="David Kim"
                title="Cloud Architect"
                company="CloudSolutions"
                expertise="Cloud & DevOps"
                bio="David is a cloud architecture expert with extensive experience in Google Cloud Platform and serverless technologies."
                image="/placeholder.svg?height=300&width=300"
                twitter="davidkim"
                github="davidkim"
                linkedin="david-kim"
                website="https://davidkim.tech"
                type="Community"
              />
              <SpeakerCard
                name="Sarah Chen"
                title="ML Engineer"
                company="Google"
                expertise="Machine Learning"
                bio="Sarah works on TensorFlow at Google and specializes in making machine learning accessible to developers of all skill levels."
                image="/placeholder.svg?height=300&width=300"
                twitter="sarahchen"
                github="sarahchen"
                linkedin="sarah-chen"
                website="https://sarahchen.ai"
                type="Google"
              />
              <SpeakerCard
                name="James Wilson"
                title="Angular Developer"
                company="WebFrameworks"
                expertise="Web Development"
                bio="James is an Angular expert who has been building enterprise applications with Angular since version 2."
                image="/placeholder.svg?height=300&width=300"
                twitter="jameswilson"
                github="jameswilson"
                linkedin="james-wilson"
                website="https://jameswilson.dev"
                type="Community"
              />
              <SpeakerCard
                name="Priya Patel"
                title="Android Developer Advocate"
                company="Google"
                expertise="Android Development"
                bio="Priya is a Developer Advocate at Google focusing on Android development and Kotlin."
                image="/placeholder.svg?height=300&width=300"
                twitter="priyapatel"
                github="priyapatel"
                linkedin="priya-patel"
                website="https://priyapatel.dev"
                type="Google"
              />
            </div>
          </TabsContent>

          <TabsContent value="gde" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <SpeakerCard
                name="Alex Johnson"
                title="Senior Web Developer"
                company="TechCorp"
                expertise="Web Development"
                bio="Alex is a Google Developer Expert in Web Technologies with over 10 years of experience building scalable web applications."
                image="/placeholder.svg?height=300&width=300"
                twitter="alexjdev"
                github="alexjohnson"
                linkedin="alexjohnson-dev"
                website="https://alexjohnson.dev"
                type="GDE"
              />
              <SpeakerCard
                name="Maria Garcia"
                title="Flutter Developer"
                company="MobileApps Inc."
                expertise="Flutter & Mobile"
                bio="Maria specializes in cross-platform mobile development with Flutter and has contributed to several open-source Flutter projects."
                image="/placeholder.svg?height=300&width=300"
                twitter="mariagarcia"
                github="mariagarcia"
                linkedin="maria-garcia"
                website="https://mariagarcia.dev"
                type="GDE"
              />
            </div>
          </TabsContent>

          <TabsContent value="community" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <SpeakerCard
                name="David Kim"
                title="Cloud Architect"
                company="CloudSolutions"
                expertise="Cloud & DevOps"
                bio="David is a cloud architecture expert with extensive experience in Google Cloud Platform and serverless technologies."
                image="/placeholder.svg?height=300&width=300"
                twitter="davidkim"
                github="davidkim"
                linkedin="david-kim"
                website="https://davidkim.tech"
                type="Community"
              />
              <SpeakerCard
                name="James Wilson"
                title="Angular Developer"
                company="WebFrameworks"
                expertise="Web Development"
                bio="James is an Angular expert who has been building enterprise applications with Angular since version 2."
                image="/placeholder.svg?height=300&width=300"
                twitter="jameswilson"
                github="jameswilson"
                linkedin="james-wilson"
                website="https://jameswilson.dev"
                type="Community"
              />
            </div>
          </TabsContent>

          <TabsContent value="google" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <SpeakerCard
                name="Sarah Chen"
                title="ML Engineer"
                company="Google"
                expertise="Machine Learning"
                bio="Sarah works on TensorFlow at Google and specializes in making machine learning accessible to developers of all skill levels."
                image="/placeholder.svg?height=300&width=300"
                twitter="sarahchen"
                github="sarahchen"
                linkedin="sarah-chen"
                website="https://sarahchen.ai"
                type="Google"
              />
              <SpeakerCard
                name="Priya Patel"
                title="Android Developer Advocate"
                company="Google"
                expertise="Android Development"
                bio="Priya is a Developer Advocate at Google focusing on Android development and Kotlin."
                image="/placeholder.svg?height=300&width=300"
                twitter="priyapatel"
                github="priyapatel"
                linkedin="priya-patel"
                website="https://priyapatel.dev"
                type="Google"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-12 text-center">
        <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-google-blue mb-4">
          Become a Speaker
        </div>
        <h2 className="text-2xl font-bold mb-4">Share Your Knowledge</h2>
        <p className="max-w-[600px] mx-auto mb-6 text-gray-500">
          Are you passionate about Google technologies? Apply to become a speaker at our upcoming GDG events.
        </p>
        <Button asChild className="bg-google-blue text-white hover:bg-google-blue/90">
          <Link href="/speakers/apply">Apply to Speak</Link>
        </Button>
      </div>
    </div>
  )
}

function SpeakerCard({ name, title, company, expertise, bio, image, twitter, github, linkedin, website, type }) {
  return (
    <Card className="gdg-card">
      <CardHeader className="text-center">
        <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full border-4 border-google-blue mb-4">
          <Image src={image || "/placeholder.svg"} alt={name} width={128} height={128} className="object-cover" />
          <Badge
            className={`absolute -right-1 -top-1 ${
              type === "GDE" ? "bg-google-blue" : type === "Google" ? "bg-google-red" : "bg-google-green"
            }`}
          >
            {type}
          </Badge>
        </div>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          {title} at {company}
        </CardDescription>
        <div className="mt-2">
          <Badge variant="outline" className="bg-blue-50 text-google-blue border-google-blue">
            {expertise}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 text-center">{bio}</p>
      </CardContent>
      <CardFooter className="flex justify-center space-x-4">
        {twitter && (
          <Link
            href={`https://twitter.com/${twitter}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-google-blue"
          >
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </Link>
        )}
        {github && (
          <Link
            href={`https://github.com/${github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-google-blue"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
        )}
        {linkedin && (
          <Link
            href={`https://linkedin.com/in/${linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-google-blue"
          >
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
        )}
        {website && (
          <Link
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-google-blue"
          >
            <Globe className="h-5 w-5" />
            <span className="sr-only">Website</span>
          </Link>
        )}
      </CardFooter>
    </Card>
  )
}

