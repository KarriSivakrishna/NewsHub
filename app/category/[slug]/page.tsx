import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { Clock, Filter, ArrowUpDown } from "lucide-react"
import { fetchTopHeadlines, timeAgo } from "@/lib/news-service"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { CategorySidebar } from "@/components/category-sidebar"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const revalidate = 3600 // Revalidate every hour

export async function generateMetadata({ params }) {
  const category = params.slug.charAt(0).toUpperCase() + params.slug.slice(1)
  return {
    title: `${category} News - NewsHub`,
    description: `Latest ${category} news and updates from around the world`,
  }
}

async function getCategoryData(category) {
  const articles = await fetchTopHeadlines(category, "us", 12)
  return articles
}

function NewsCardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-[200px] w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="flex items-center space-x-2">
        <Skeleton className="h-3 w-14 rounded-full" />
        <Skeleton className="h-3 w-20 rounded-full" />
      </div>
    </div>
  )
}

function NewsCard({ article, priority = false }) {
  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={article.urlToImage || "/placeholder.svg?height=400&width=600"}
          alt={article.title}
          fill
          className="object-cover transition-transform hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
        />
        {article.category && (
          <Badge className="absolute top-2 right-2 bg-primary/80 hover:bg-primary">{article.category}</Badge>
        )}
      </div>
      <CardHeader className="flex-grow">
        <CardTitle className="line-clamp-2 text-lg">
          <Link href={`/article/${encodeURIComponent(article.title)}`} className="hover:text-primary transition-colors">
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
  )
}

export default async function CategoryPage({ params }) {
  const category = params.slug
  const articles = await getCategoryData(category)
  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1)

  return (
    <div className="container py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main content */}
        <div className="lg:w-3/4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-4 md:mb-0">{categoryTitle} News</h1>
            <div className="flex items-center gap-4">
              <Select defaultValue="latest">
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center">
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Sort by" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <Suspense key={index} fallback={<NewsCardSkeleton />}>
                <NewsCard article={article} priority={index < 3} />
              </Suspense>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Button variant="outline" className="gap-2">
              Load More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/4">
          <div className="sticky top-24">
            <Suspense fallback={<Skeleton className="h-[400px] w-full rounded-lg" />}>
              <CategorySidebar />
            </Suspense>

            <div className="mt-8">
              <NewsletterSignup />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

