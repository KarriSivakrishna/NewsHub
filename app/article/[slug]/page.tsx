import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, User, Tag, Share2, ThumbsUp, MessageSquare } from "lucide-react"
import { fetchEverything, timeAgo, generateAISummary } from "@/lib/news-service"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { BookmarkButton } from "@/components/bookmark-button"

export const revalidate = 3600 // Revalidate every hour

export async function generateMetadata({ params }) {
  const title = decodeURIComponent(params.slug)
  return {
    title: `${title} - NewsHub`,
    description: `Read the full article: ${title}`,
  }
}

async function getArticleData(slug) {
  const decodedSlug = decodeURIComponent(slug)

  // Search for the article by title
  const searchResults = await fetchEverything(decodedSlug, "relevancy", 1)

  if (searchResults && searchResults.length > 0) {
    return searchResults[0]
  }

  // Fallback to a mock article if not found
  return {
    title: decodedSlug,
    description: "Article description not available.",
    content: "Article content not available.",
    urlToImage: "/placeholder.svg?height=800&width=1200",
    publishedAt: new Date().toISOString(),
    source: { name: "Unknown Source" },
    author: "Unknown Author",
    url: "#",
    category: "General",
  }
}

async function getRelatedArticles(category) {
  const articles = await fetchEverything(category, "publishedAt", 4)
  return articles
}

function RelatedArticleCard({ article }) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row gap-4 p-4">
        <div className="relative h-24 md:h-auto md:w-1/3 flex-shrink-0">
          <Image
            src={article.urlToImage || "/placeholder.svg?height=200&width=200"}
            alt={article.title}
            fill
            className="object-cover rounded-md"
            sizes="(max-width: 768px) 100vw, 150px"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-sm line-clamp-2 hover:text-primary transition-colors">
            <Link href={`/article/${encodeURIComponent(article.title)}`}>{article.title}</Link>
          </h3>
          <div className="flex items-center mt-2 text-xs text-muted-foreground">
            <Calendar className="mr-1 h-3 w-3" />
            <span>{timeAgo(article.publishedAt)}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default async function ArticlePage({ params }) {
  const article = await getArticleData(params.slug)
  const relatedArticles = await getRelatedArticles(article.category || "general")
  const aiSummary = generateAISummary(article.content)

  return (
    <div className="container py-8">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to News
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <article>
            <div className="mb-6">
              {article.category && <Badge className="mb-4">{article.category}</Badge>}
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>

              <div className="flex flex-wrap items-center text-muted-foreground mb-6">
                <div className="flex items-center mr-4">
                  <Calendar className="mr-1 h-4 w-4" />
                  <span>{timeAgo(article.publishedAt)}</span>
                </div>
                {article.author && (
                  <div className="flex items-center mr-4">
                    <User className="mr-1 h-4 w-4" />
                    <span>{article.author}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <Tag className="mr-1 h-4 w-4" />
                  <span>{article.source.name}</span>
                </div>
              </div>
            </div>

            <div className="relative w-full h-[400px] mb-8">
              <Image
                src={article.urlToImage || "/placeholder.svg?height=800&width=1200"}
                alt={article.title}
                fill
                className="object-cover rounded-lg"
                priority
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>

            <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
              {aiSummary && (
                <div className="bg-muted p-4 rounded-lg mb-6">
                  <h3 className="text-lg font-medium mb-2 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 mr-2 text-primary"
                    >
                      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                      <circle cx="12" cy="17" r=".5" />
                    </svg>
                    AI Summary
                  </h3>
                  <p className="text-muted-foreground">{aiSummary}</p>
                </div>
              )}

              <p className="text-lg font-medium mb-4">{article.description}</p>

              <p>
                {article.content?.replace(/\[\+\d+ chars\]$/, "") ||
                  `
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, 
                  nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia,
                  nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
                `}
              </p>

              <p>
                Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
                Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
                Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
              </p>

              <h2>Key Takeaways</h2>

              <ul>
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                <li>Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl.</li>
                <li>Eget aliquam nisl nisl sit amet nisl.</li>
                <li>Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl.</li>
              </ul>

              <p>
                Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
                Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
              </p>

              <blockquote>
                "This is a quote from the article that highlights an important point or statement made by someone
                relevant to the story."
              </blockquote>

              <p>
                Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
                Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
              </p>
            </div>

            <div className="flex items-center justify-between py-4 border-t border-b">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <ThumbsUp className="mr-1 h-4 w-4" />
                  Like
                </Button>
                <Button variant="outline" size="sm">
                  <MessageSquare className="mr-1 h-4 w-4" />
                  Comment
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="mr-1 h-4 w-4" />
                  Share
                </Button>
                <BookmarkButton article={article} />
              </div>

              <div className="flex items-center">
                <span className="text-sm text-muted-foreground mr-2">Source:</span>
                <Link
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  {article.source.name}
                </Link>
              </div>
            </div>
          </article>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <h2 className="text-xl font-bold mb-4">Related Articles</h2>
            <div className="space-y-4">
              {relatedArticles.map((relatedArticle, index) => (
                <Suspense key={index} fallback={<Skeleton className="h-24 w-full rounded-lg" />}>
                  <RelatedArticleCard article={relatedArticle} />
                </Suspense>
              ))}
            </div>

            <Separator className="my-8" />

            <div className="mt-8">
              <NewsletterSignup />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

