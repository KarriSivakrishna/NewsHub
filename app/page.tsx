import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { Clock, TrendingUp, ArrowRight } from "lucide-react"
import { fetchTopHeadlines, fetchEverything, timeAgo } from "@/lib/news-service"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { CategorySidebar } from "@/components/category-sidebar"
import { TrendingArticles } from "@/components/trending-articles"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { HeroCarousel } from "@/components/hero-carousel"

export const revalidate = 3600 // Revalidate every hour

async function getHomePageData() {
  const [featuredNews, technologyNews, businessNews, entertainmentNews, sportsNews, healthNews, trendingNews] =
    await Promise.all([
      fetchTopHeadlines("general", "us", 5),
      fetchTopHeadlines("technology", "us", 4),
      fetchTopHeadlines("business", "us", 4),
      fetchTopHeadlines("entertainment", "us", 4),
      fetchTopHeadlines("sports", "us", 4),
      fetchTopHeadlines("health", "us", 4),
      fetchEverything("trending", "popularity", 5),
    ])

  return {
    featuredNews,
    technologyNews,
    businessNews,
    entertainmentNews,
    sportsNews,
    healthNews,
    trendingNews,
  }
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

function SectionHeader({ title, viewAllLink }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      <Button variant="link" size="sm" asChild className="gap-1">
        <Link href={viewAllLink}>
          View All
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  )
}

export default async function Home() {
  const { featuredNews, technologyNews, businessNews, entertainmentNews, sportsNews, healthNews, trendingNews } =
    await getHomePageData()

  return (
    <div className="min-h-screen">
      <Suspense
        fallback={
          <div className="h-[500px] flex items-center justify-center">
            <Skeleton className="h-[400px] w-full rounded-lg" />
          </div>
        }
      >
        <HeroCarousel articles={featuredNews.slice(0, 3)} />
      </Suspense>

      <div className="container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="lg:w-3/4">
            <section className="mb-12">
              <SectionHeader title="Technology" viewAllLink="/category/technology" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {technologyNews.map((article, index) => (
                  <Suspense key={index} fallback={<NewsCardSkeleton />}>
                    <NewsCard article={article} priority={index < 2} />
                  </Suspense>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <SectionHeader title="Business" viewAllLink="/category/business" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {businessNews.map((article, index) => (
                  <Suspense key={index} fallback={<NewsCardSkeleton />}>
                    <NewsCard article={article} />
                  </Suspense>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <SectionHeader title="Entertainment" viewAllLink="/category/entertainment" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {entertainmentNews.map((article, index) => (
                  <Suspense key={index} fallback={<NewsCardSkeleton />}>
                    <NewsCard article={article} />
                  </Suspense>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <SectionHeader title="Sports" viewAllLink="/category/sports" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {sportsNews.map((article, index) => (
                  <Suspense key={index} fallback={<NewsCardSkeleton />}>
                    <NewsCard article={article} />
                  </Suspense>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="sticky top-24">
              <Suspense fallback={<Skeleton className="h-[400px] w-full rounded-lg" />}>
                <CategorySidebar />
              </Suspense>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                  Trending Now
                </h3>
                <Suspense fallback={<Skeleton className="h-[300px] w-full rounded-lg" />}>
                  <TrendingArticles articles={trendingNews} />
                </Suspense>
              </div>

              <div className="mt-8">
                <NewsletterSignup />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

