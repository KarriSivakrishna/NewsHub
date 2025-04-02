"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Clock, Bookmark, X } from "lucide-react"
import { timeAgo } from "@/lib/news-service"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load bookmarks from localStorage
    const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]")
    setBookmarks(savedBookmarks)
    setIsLoading(false)
  }, [])

  const removeBookmark = (article) => {
    const updatedBookmarks = bookmarks.filter((bookmark) => bookmark.title !== article.title)
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks))
    setBookmarks(updatedBookmarks)
    toast({
      title: "Removed from bookmarks",
      description: "Article has been removed from your bookmarks.",
    })
  }

  const clearAllBookmarks = () => {
    localStorage.setItem("bookmarks", "[]")
    setBookmarks([])
    toast({
      title: "All bookmarks cleared",
      description: "All articles have been removed from your bookmarks.",
    })
  }

  if (isLoading) {
    return (
      <div className="container py-8">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Your Bookmarks</h1>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-4 md:mb-0">Your Bookmarks</h1>
        {bookmarks.length > 0 && (
          <Button variant="outline" onClick={clearAllBookmarks}>
            Clear All Bookmarks
          </Button>
        )}
      </div>

      {bookmarks.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <Bookmark className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-medium mb-2">No bookmarks yet</h2>
          <p className="text-muted-foreground mb-4">Articles you bookmark will appear here for easy access.</p>
          <Button asChild>
            <Link href="/">Browse Articles</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((article, index) => (
            <Card key={index} className="overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={article.urlToImage || "/placeholder.svg?height=400&width=600"}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {article.category && (
                  <Badge className="absolute top-2 right-2 bg-primary/80 hover:bg-primary">{article.category}</Badge>
                )}
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 left-2 h-8 w-8"
                  onClick={() => removeBookmark(article)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <CardHeader className="flex-grow">
                <CardTitle className="line-clamp-2 text-lg">
                  <Link
                    href={`/article/${encodeURIComponent(article.title)}`}
                    className="hover:text-primary transition-colors"
                  >
                    {article.title}
                  </Link>
                </CardTitle>
                <CardDescription className="line-clamp-2 mt-2">
                  {article.description || "Read the full article for more details."}
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between items-center pt-0">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" />
                  <span>{timeAgo(article.publishedAt)}</span>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/article/${encodeURIComponent(article.title)}`}>Read More</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

