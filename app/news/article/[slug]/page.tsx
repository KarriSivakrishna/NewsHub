import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, User, Tag, Share2, Bookmark, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getMockNewsArticles, type NewsArticle } from "@/lib/news-service"

export const revalidate = 3600 // Revalidate every hour

type ArticlePageProps = {
  params: {
    slug: string
  }
}

async function getArticleData(slug: string) {
  // In a real application, you would fetch the specific article by its ID or slug
  // For demo purposes, we'll use mock data and find an article with a matching title
  const allArticles = getMockNewsArticles(20)
  const decodedSlug = decodeURIComponent(slug)

  // Find the article with the matching title
  const article = allArticles.find((article) => article.title.toLowerCase() === decodedSlug.toLowerCase())

  // If no matching article is found, use the first article
  return article || allArticles[0]
}

async function getRelatedArticles(category: string) {
  // In a real application, you would fetch related articles based on the current article
  const allArticles = getMockNewsArticles(20)
  return allArticles.filter((article) => article.category === category).slice(0, 3)
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

function RelatedArticleCard({ article }: { article: NewsArticle }) {
  return (
    <Card className="overflow-hidden gdg-card">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative h-40 md:h-auto md:w-1/3">
          <Image
            src={article.urlToImage || "/placeholder.svg?height=200&width=200"}
            alt={article.title}
            fill
            className="object-cover rounded-md"
          />
        </div>
        <div className="flex-1 p-4 md:p-0">
          <Badge className="mb-2">{article.category}</Badge>
          <h3 className="font-bold line-clamp-2 mb-2">{article.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{article.description}</p>
          <Button asChild variant="link" className="p-0 h-auto mt-2">
            <Link href={`/news/article/${encodeURIComponent(article.title)}`}>Read More</Link>
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticleData(params.slug)
  const relatedArticles = await getRelatedArticles(article.category || "Technology")

  return (
    <div className="container py-10">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/news">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to News
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <article>
            <div className="mb-6">
              <Badge className="mb-4">{article.category}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>

              <div className="flex flex-wrap items-center text-muted-foreground mb-6">
                <div className="flex items-center mr-4">
                  <Calendar className="mr-1 h-4 w-4" />
                  <span>{formatDate(article.publishedAt)}</span>
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
              />
            </div>

            <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
              <p className="text-lg font-medium mb-4">{article.description}</p>

              <p>
                {article.content ||
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
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  <ThumbsUp className="mr-1 h-4 w-4" />
                  Like
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="mr-1 h-4 w-4" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Bookmark className="mr-1 h-4 w-4" />
                  Save
                </Button>
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
          <div className="sticky top-20">
            <h2 className="text-xl font-bold mb-4">Related Articles</h2>
            <div className="space-y-4">
              {relatedArticles.map((relatedArticle, index) => (
                <RelatedArticleCard key={index} article={relatedArticle} />
              ))}
            </div>

            <Separator className="my-8" />

            <div className="p-6 border rounded-lg bg-muted/30">
              <h3 className="font-bold mb-4">Subscribe to Newsletter</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get the latest news and updates delivered directly to your inbox.
              </p>
              <form className="space-y-4">
                <input type="email" placeholder="Your email address" className="w-full px-3 py-2 border rounded-md" />
                <Button className="w-full bg-google-blue hover:bg-google-blue/90">Subscribe</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

