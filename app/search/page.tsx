"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Clock, Filter, ArrowUpDown, SearchIcon } from "lucide-react"
import { searchNews, timeAgo } from "@/lib/news-service"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  const [searchQuery, setSearchQuery] = useState(query)
  const [articles, setArticles] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [sortBy, setSortBy] = useState("relevancy")

  useEffect(() => {
    if (query) {
      setIsLoading(true)
      searchNews(query)
        .then((results) => {
          setArticles(results)
          setIsLoading(false)
        })
        .catch((error) => {
          console.error("Error searching news:", error)
          setIsLoading(false)
        })
    }
  }, [query])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  const handleSortChange = (value) => {
    setSortBy(value)
    // In a real app, we would re-fetch with the new sort parameter
    // For now, we'll just simulate sorting
    if (value === "newest") {
      setArticles([...articles].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()))
    } else if (value === "oldest") {
      setArticles([...articles].sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()))
    }
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-4">
          {query ? `Search Results for "${query}"` : "Search News"}
        </h1>

        <form onSubmit={handleSearch} className="flex gap-2 max-w-xl">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for news..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit">Search</Button>
        </form>
      </div>

      {query && (
        <>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <p className="text-muted-foreground mb-4 md:mb-0">
              {isLoading
                ? "Searching..."
                : articles.length > 0
                  ? `Found ${articles.length} results`
                  : "No results found"}
            </p>
            <div className="flex items-center gap-4">
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center">
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Sort by" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevancy">Relevancy</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="cnn">CNN</SelectItem>
                  <SelectItem value="bbc">BBC</SelectItem>
                  <SelectItem value="reuters">Reuters</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="space-y-3">
                  <div className="h-[200px] w-full bg-muted rounded-lg animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-muted rounded animate-pulse" />
                    <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-14 bg-muted rounded-full animate-pulse" />
                    <div className="h-3 w-20 bg-muted rounded-full animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, index) => (
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
                      <Badge className="absolute top-2 right-2 bg-primary/80 hover:bg-primary">
                        {article.category}
                      </Badge>
                    )}
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
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <SearchIcon className="h-16 w-16 text-muted-foreground mb-4" />
              <h2 className="text-xl font-medium mb-2">No results found</h2>
              <p className="text-muted-foreground mb-4">Try different keywords or browse our categories.</p>
              <Button asChild>
                <Link href="/">Browse News</Link>
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

