import Link from "next/link"
import Image from "next/image"
import { TrendingUp, Clock } from "lucide-react"
import { timeAgo } from "@/lib/news-service"
import { cn } from "@/lib/utils"

export function TrendingArticles({ articles }) {
  if (!articles || articles.length === 0) {
    return <p className="text-muted-foreground">No trending articles available.</p>
  }

  return (
    <div className="space-y-4">
      {articles.map((article, index) => (
        <Link
          key={index}
          href={`/article/${encodeURIComponent(article.title)}`}
          className={cn("flex gap-3 p-2 rounded-lg transition-colors", "hover:bg-muted group")}
        >
          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
            <Image
              src={article.urlToImage || "/placeholder.svg?height=200&width=200"}
              alt={article.title}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
              {article.title}
            </h4>
            <div className="mt-1 flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-primary" />
              <span className="mr-2">Trending</span>
              <Clock className="mr-1 h-3 w-3" />
              <span>{timeAgo(article.publishedAt)}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

