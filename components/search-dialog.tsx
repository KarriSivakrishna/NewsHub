"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function SearchDialog() {
  const [open, setOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")

  // Mock search results
  const events = [
    { id: 1, title: "Web Development Workshop", date: "March 25, 2025", type: "Workshop" },
    { id: 2, title: "Flutter Hackathon", date: "April 10, 2025", type: "Hackathon" },
    { id: 3, title: "Cloud Study Jam", date: "April 18, 2025", type: "Study Jam" },
  ]

  const resources = [
    { id: 1, title: "Getting Started with Firebase", type: "Article" },
    { id: 2, title: "Flutter UI Masterclass", type: "Video" },
    { id: 3, title: "Building Your First PWA", type: "Tutorial" },
  ]

  const projects = [
    { id: 1, title: "GDG Event Manager", tech: "Next.js, Firebase" },
    { id: 2, title: "Community Learning Hub", tech: "React, Node.js, MongoDB" },
  ]

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredResources = resources.filter(
    (resource) =>
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tech.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Handle keyboard shortcut (Ctrl+K or Cmd+K)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-64 justify-start text-muted-foreground">
          <Search className="mr-2 h-4 w-4" />
          <span>Search...</span>
          <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Search events, resources, projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10"
            autoFocus
          />

          <Tabs defaultValue="all">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="max-h-[300px] overflow-auto space-y-4">
              {searchQuery && (
                <>
                  {filteredEvents.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-2">Events</h3>
                      <ul className="space-y-2">
                        {filteredEvents.map((event) => (
                          <li key={event.id} className="p-2 hover:bg-muted rounded-md">
                            <a href="#" className="block">
                              <div className="font-medium">{event.title}</div>
                              <div className="text-sm text-muted-foreground">
                                {event.date} • {event.type}
                              </div>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {filteredResources.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-2">Resources</h3>
                      <ul className="space-y-2">
                        {filteredResources.map((resource) => (
                          <li key={resource.id} className="p-2 hover:bg-muted rounded-md">
                            <a href="#" className="block">
                              <div className="font-medium">{resource.title}</div>
                              <div className="text-sm text-muted-foreground">{resource.type}</div>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {filteredProjects.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-2">Projects</h3>
                      <ul className="space-y-2">
                        {filteredProjects.map((project) => (
                          <li key={project.id} className="p-2 hover:bg-muted rounded-md">
                            <a href="#" className="block">
                              <div className="font-medium">{project.title}</div>
                              <div className="text-sm text-muted-foreground">{project.tech}</div>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {filteredEvents.length === 0 && filteredResources.length === 0 && filteredProjects.length === 0 && (
                    <div className="text-center py-6 text-muted-foreground">No results found for "{searchQuery}"</div>
                  )}
                </>
              )}

              {!searchQuery && <div className="text-center py-6 text-muted-foreground">Start typing to search...</div>}
            </TabsContent>

            <TabsContent value="events" className="max-h-[300px] overflow-auto">
              {searchQuery ? (
                filteredEvents.length > 0 ? (
                  <ul className="space-y-2">
                    {filteredEvents.map((event) => (
                      <li key={event.id} className="p-2 hover:bg-muted rounded-md">
                        <a href="#" className="block">
                          <div className="font-medium">{event.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {event.date} • {event.type}
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">No events found for "{searchQuery}"</div>
                )
              ) : (
                <div className="text-center py-6 text-muted-foreground">Start typing to search events...</div>
              )}
            </TabsContent>

            <TabsContent value="resources" className="max-h-[300px] overflow-auto">
              {searchQuery ? (
                filteredResources.length > 0 ? (
                  <ul className="space-y-2">
                    {filteredResources.map((resource) => (
                      <li key={resource.id} className="p-2 hover:bg-muted rounded-md">
                        <a href="#" className="block">
                          <div className="font-medium">{resource.title}</div>
                          <div className="text-sm text-muted-foreground">{resource.type}</div>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">No resources found for "{searchQuery}"</div>
                )
              ) : (
                <div className="text-center py-6 text-muted-foreground">Start typing to search resources...</div>
              )}
            </TabsContent>

            <TabsContent value="projects" className="max-h-[300px] overflow-auto">
              {searchQuery ? (
                filteredProjects.length > 0 ? (
                  <ul className="space-y-2">
                    {filteredProjects.map((project) => (
                      <li key={project.id} className="p-2 hover:bg-muted rounded-md">
                        <a href="#" className="block">
                          <div className="font-medium">{project.title}</div>
                          <div className="text-sm text-muted-foreground">{project.tech}</div>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">No projects found for "{searchQuery}"</div>
                )
              ) : (
                <div className="text-center py-6 text-muted-foreground">Start typing to search projects...</div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}

