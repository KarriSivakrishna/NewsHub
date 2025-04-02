"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { timeAgo } from "@/lib/news-service"

export function HeroCarousel({ articles }) {
  const [current, setCurrent] = useState(0)

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === articles.length - 1 ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [articles.length])

  const prev = () => {
    setCurrent((current) => (current === 0 ? articles.length - 1 : current - 1))
  }

  const next = () => {
    setCurrent((current) => (current === articles.length - 1 ? 0 : current + 1))
  }

  if (!articles || articles.length === 0) {
    return null
  }

  return (
    <div className="relative overflow-hidden bg-black">
      <div className="relative h-[500px] md:h-[600px]">
        {articles.map((article, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 h-full w-full transition-opacity duration-1000",
              index === current ? "opacity-100" : "opacity-0 pointer-events-none",
            )}
          >
            <Image
              src={article.urlToImage || "/placeholder.svg?height=800&width=1200"}
              alt={article.title}
              fill
              className="object-cover opacity-60"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
              <div className="container mx-auto">
                <div className="max-w-3xl">
                  {article.category && (
                    <Badge className="mb-4 bg-primary hover:bg-primary/90">{article.category}</Badge>
                  )}
                  <h1 className="text-2xl md:text-4xl font-bold mb-4">
                    <Link
                      href={`/article/${encodeURIComponent(article.title)}`}
                      className="hover:text-primary/90 transition-colors"
                    >
                      {article.title}
                    </Link>
                  </h1>
                  <p className="text-sm md:text-base text-white/80 mb-4 line-clamp-2 md:line-clamp-3">
                    {article.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-white/70 text-sm">
                      <span className="mr-2">{article.source.name}</span>
                      <span>•</span>
                      <span className="ml-2">{timeAgo(article.publishedAt)}</span>
                    </div>
                    <Button asChild variant="default" size="sm" className="bg-primary hover:bg-primary/90">
                      <Link href={`/article/${encodeURIComponent(article.title)}`}>Read Full Story</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/20 text-white backdrop-blur-sm hover:bg-black/30"
        onClick={prev}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Previous slide</span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/20 text-white backdrop-blur-sm hover:bg-black/30"
        onClick={next}
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Next slide</span>
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {articles.map((_, index) => (
          <button
            key={index}
            className={cn("h-2 w-2 rounded-full transition-all", index === current ? "bg-white w-6" : "bg-white/50")}
            onClick={() => setCurrent(index)}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

