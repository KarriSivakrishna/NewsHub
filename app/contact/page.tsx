import Link from "next/link"
import { Mail, MapPin, Phone, Clock, Send, Twitter, Github, Linkedin, Facebook } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ContactPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Get in Touch</h1>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Have questions or want to get involved? Reach out to our GDG chapter.
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-6 py-12 lg:grid-cols-2">
        <Card className="gdg-card">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Find us through these channels</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-google-blue" />
                <p>contact@gdgcommunity.com</p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-google-green" />
                <p>+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-google-red" />
                <p>123 Tech Street, Innovation District, San Francisco, CA 94103</p>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-google-yellow" />
                <p>Monday - Friday: 9:00 AM - 5:00 PM PST</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Community Meetups</h3>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Monthly Meetups: Last Saturday of every month</p>
                <p className="text-sm text-muted-foreground">Location: GDG Hub, Downtown</p>
                <p className="text-sm text-muted-foreground">Time: 2:00 PM - 5:00 PM</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Connect With Us</h3>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-500 hover:text-google-blue">
                  <Twitter className="h-6 w-6" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-gray-500 hover:text-google-blue">
                  <Github className="h-6 w-6" />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link href="#" className="text-gray-500 hover:text-google-blue">
                  <Linkedin className="h-6 w-6" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link href="#" className="text-gray-500 hover:text-google-blue">
                  <Facebook className="h-6 w-6" />
                  <span className="sr-only">Facebook</span>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Tabs defaultValue="contact" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="contact">Contact Us</TabsTrigger>
              <TabsTrigger value="join">Join GDG</TabsTrigger>
            </TabsList>
            <TabsContent value="contact" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                  <CardDescription>We'll get back to you as soon as possible.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Name
                        </label>
                        <Input id="name" placeholder="Enter your name" />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Email
                        </label>
                        <Input id="email" type="email" placeholder="Enter your email" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="subject"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Subject
                      </label>
                      <Input id="subject" placeholder="Enter subject" />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Enter your message"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-google-blue hover:bg-google-blue/90 gap-1">
                      <Send className="h-4 w-4 mr-1" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="join" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Join Our GDG Chapter</CardTitle>
                  <CardDescription>Become a member of our growing community.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="first-name"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          First Name
                        </label>
                        <Input id="first-name" placeholder="Enter your first name" />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="last-name"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Last Name
                        </label>
                        <Input id="last-name" placeholder="Enter your last name" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="join-email"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Email
                      </label>
                      <Input id="join-email" type="email" placeholder="Enter your email" />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="profession"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Profession
                      </label>
                      <Input id="profession" placeholder="e.g. Software Developer, Student" />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="interests"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Areas of Interest
                      </label>
                      <textarea
                        id="interests"
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="e.g. Web Development, Cloud, Machine Learning"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-google-green hover:bg-google-green/90">
                      Submit Application
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="mt-12">
        <Card className="gdg-card">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Common questions about our GDG chapter</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-medium">What is a Google Developer Group (GDG)?</h3>
              <p className="text-sm text-muted-foreground">
                Google Developer Groups (GDGs) are community-led groups that focus on Google technologies and developer
                products. GDGs organize events, workshops, and meetups to help developers learn and connect.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">How can I join the GDG community?</h3>
              <p className="text-sm text-muted-foreground">
                You can join our GDG by filling out the application form on this page or attending one of our events.
                Membership is free and open to all developers interested in Google technologies.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Are GDG events free to attend?</h3>
              <p className="text-sm text-muted-foreground">
                Most GDG events are free to attend. Some special events like workshops or conferences might have a
                nominal fee to cover costs, but we strive to make our events accessible to everyone.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">How can I become a speaker at GDG events?</h3>
              <p className="text-sm text-muted-foreground">
                We're always looking for speakers! If you're interested in sharing your knowledge, you can apply through
                our "Become a Speaker" form on the Speakers page or contact us directly.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Can I propose a project or initiative for the GDG community?</h3>
              <p className="text-sm text-muted-foreground">
                We encourage community-led initiatives. You can propose a project through our "Propose a Project" form
                on the Projects page or reach out to the organizers directly.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

