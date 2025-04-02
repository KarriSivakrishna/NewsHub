"use client"

import { useState, useEffect } from "react"
import { Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

export function BookmarkButton({ article }) {
  const [isBookmarked, setIsBookmarked] = useState(false)

  useEffect(() => {
    // Check if article is already bookmarked
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]")
    const isAlreadyBookmarked = bookmarks.some((bookmark) => bookmark.title === article.title)
    setIsBookmarked(isAlreadyBookmarked)
  }, [article])

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]")

    if (isBookmarked) {
      // Remove bookmark
      const updatedBookmarks = bookmarks.filter((bookmark) => bookmark.title !== article.title)
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks))
      setIsBookmarked(false)
      toast({
        title: "Removed from bookmarks",
        description: "Article has been removed from your bookmarks.",
      })
    } else {
      // Add bookmark
      const updatedBookmarks = [...bookmarks, article]
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks))
      setIsBookmarked(true)
      toast({
        title: "Added to bookmarks",
        description: "Article has been saved to your bookmarks.",
      })
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={toggleBookmark} className={isBookmarked ? "bg-primary/10" : ""}>
      <Bookmark className={`mr-1 h-4 w-4 ${isBookmarked ? "fill-primary" : ""}`} />
      {isBookmarked ? "Bookmarked" : "Bookmark"}
    </Button>
  )
}

