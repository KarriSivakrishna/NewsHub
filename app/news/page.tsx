import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { Clock, Bookmark, Share2, TrendingUp, Filter, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getMockNewsArticles, type NewsArticle } from "@/lib/news-service"
import NewsLoading from "./loading"

export const revalidate = 3600 // Revalidate every hour

async function getNewsData() {
  // If you have a valid API key, use these functions instead of getMockNewsArticles
  // const featuredStories = await fetchTopHeadlines("general", "us", 5);
  // const technologyNews = await fetchTopHeadlines("technology", "us", 6);
  // const businessNews = await fetchTopHeadlines("business", "us", 6);
  // const trendingTopics = await fetchEverything("trending OR viral", "popularity", 4);

  // Using mock data for demo purposes
  const allMockNews = getMockNewsArticles(20)

  return {
    featuredStories: allMockNews.slice(0, 5),
    technologyNews: allMockNews.filter((article) => article.category === "Technology").slice(0, 6),
    businessNews: allMockNews.filter((article) => article.category === "Business").slice(0, 6),
    scienceNews: allMockNews.filter((article) => article.category === "Science").slice(0, 6),
    trendingTopics: allMockNews.slice(10, 14),
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function FeaturedStoryCard({ article }: { article: NewsArticle }) {
  return (
    <Card className="overflow-hidden gdg-card h-full flex flex-col">
      <div className="relative">
        <Image
          src={article.urlToImage || "/placeholder.svg?height=400&width=600"}
          alt={article.title}
          width={600}
          height={400}
          className="object-cover w-full h-48"
        />
        <Badge className="absolute top-2 right-2 bg-google-red">Featured</Badge>
      </div>
      <CardHeader className="flex-grow">
        <CardTitle className="line-clamp-2">{article.title}</CardTitle>
        <CardDescription className="flex items-center mt-2">
          <Clock className="mr-1 h-4 w-4" /> {formatDate(article.publishedAt)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 line-clamp-3">{article.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" size="sm">
          <Bookmark className="h-4 w-4 mr-1" />
          Save
        </Button>
        <Button variant="ghost" size="sm">
          <Share2 className="h-4 w-4 mr-1" />
          Share
        </Button>
        <Button asChild className="ml-auto">
          <Link href={`/news/article/${encodeURIComponent(article.title)}`}>Read More</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <Card className="overflow-hidden gdg-card h-full flex flex-col">
      <div className="relative">
        <Image
          src={article.urlToImage || "/placeholder.svg?height=400&width=600"}
          alt={article.title}
          width={600}
          height={300}
          className="object-cover w-full h-40"
        />
        <Badge className="absolute top-2 right-2 bg-primary">{article.category}</Badge>
      </div>
      <CardHeader>
        <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
        <CardDescription className="flex items-center mt-1">
          <Clock className="mr-1 h-3 w-3" /> {formatDate(article.publishedAt)}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-500 line-clamp-2">{article.description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/news/article/${encodeURIComponent(article.title)}`}>Read Article</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

function TrendingTopicCard({ article }: { article: NewsArticle }) {
  return (
    <div className="flex gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
      <div className="relative h-20 w-20 flex-shrink-0">
        <Image
          src={article.urlToImage || "/placeholder.svg?height=200&width=200"}
          alt={article.title}
          fill
          className="object-cover rounded-md"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-medium line-clamp-2">{article.title}</h3>
        <div className="flex items-center mt-2 text-xs text-muted-foreground">
          <TrendingUp className="h-3 w-3 mr-1 text-google-red" />
          <span>Trending</span>
          <span className="mx-2">•</span>
          <span>{article.source.name}</span>
        </div>
      </div>
    </div>
  )
}

export default async function NewsPage() {
  const { featuredStories, technologyNews, businessNews, scienceNews, trendingTopics } = await getNewsData()

  return (
    <div className="container py-10">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl gdg-gradient-text">GDG News</h1>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Stay updated with the latest news and trends in technology, business, and more.
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-col lg:flex-row gap-8">
        <div className="lg:w-3/4">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Featured Stories</h2>
              <Button asChild variant="ghost" className="gap-1">
                <Link href="/news/featured">View All</Link>
              </Button>
            </div>
            <Suspense fallback={<NewsLoading />}>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {featuredStories.slice(0, 3).map((article, index) => (
                  <FeaturedStoryCard key={index} article={article} />
                ))}
              </div>
            </Suspense>
          </div>

          <div className="mt-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <h2 className="text-2xl font-bold mb-4 sm:mb-0">Latest News</h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input type="search" placeholder="Search news..." className="pl-8 w-full sm:w-[250px]" />
                </div>
                <Select>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Filter by category" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Tabs defaultValue="technology" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="technology">Technology</TabsTrigger>
                <TabsTrigger value="business">Business</TabsTrigger>
                <TabsTrigger value="science">Science</TabsTrigger>
              </TabsList>

              <TabsContent value="technology" className="mt-6">
                <Suspense fallback={<NewsLoading />}>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {technologyNews.map((article, index) => (
                      <NewsCard key={index} article={article} />
                    ))}
                  </div>
                </Suspense>
              </TabsContent>

              <TabsContent value="business" className="mt-6">
                <Suspense fallback={<NewsLoading />}>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {businessNews.map((article, index) => (
                      <NewsCard key={index} article={article} />
                    ))}
                  </div>
                </Suspense>
              </TabsContent>

              <TabsContent value="science" className="mt-6">
                <Suspense fallback={<NewsLoading />}>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {scienceNews.map((article, index) => (
                      <NewsCard key={index} article={article} />
                    ))}
                  </div>
                </Suspense>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="lg:w-1/4">
          <div className="sticky top-20">
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-google-red" />
                Trending Topics
              </h2>
              <Suspense fallback={<NewsLoading />}>
                <div className="space-y-4">
                  {trendingTopics.map((article, index) => (
                    <TrendingTopicCard key={index} article={article} />
                  ))}
                </div>
              </Suspense>
            </div>

            <div className="mt-8 p-6 border rounded-lg bg-muted/30">
              <h3 className="font-bold mb-4">Subscribe to Newsletter</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get the latest news and updates delivered directly to your inbox.
              </p>
              <form className="space-y-4">
                <Input type="email" placeholder="Your email address" />
                <Button className="w-full bg-google-blue hover:bg-google-blue/90">Subscribe</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

