// News API service
const NEWS_API_KEY = "e63bc0e38f034654a64975005c91e972"
const NEWS_API_BASE_URL = "https://newsapi.org/v2"

export type NewsArticle = {
  source: {
    id: string | null
    name: string
  }
  author: string | null
  title: string
  description: string | null
  url: string
  urlToImage: string | null
  publishedAt: string
  content: string | null
  category?: string
}

export type NewsResponse = {
  status: string
  totalResults: number
  articles: NewsArticle[]
}

export async function fetchTopHeadlines(
  category = "general",
  country = "us",
  pageSize = 10,
  page = 1,
): Promise<NewsArticle[]> {
  try {
    const response = await fetch(
      `${NEWS_API_BASE_URL}/top-headlines?country=${country}&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=${NEWS_API_KEY}`,
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch news: ${response.status}`)
    }

    const data: NewsResponse = await response.json()
    return data.articles.map((article) => ({
      ...article,
      category: category,
    }))
  } catch (error) {
    console.error("Error fetching top headlines:", error)
    return []
  }
}

export async function fetchEverything(
  query: string,
  sortBy = "publishedAt",
  pageSize = 10,
  page = 1,
): Promise<NewsArticle[]> {
  try {
    const response = await fetch(
      `${NEWS_API_BASE_URL}/everything?q=${query}&sortBy=${sortBy}&pageSize=${pageSize}&page=${page}&apiKey=${NEWS_API_KEY}`,
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch news: ${response.status}`)
    }

    const data: NewsResponse = await response.json()
    return data.articles
  } catch (error) {
    console.error("Error fetching everything:", error)
    return []
  }
}

export async function searchNews(query: string, pageSize = 10, page = 1): Promise<NewsArticle[]> {
  try {
    const response = await fetch(
      `${NEWS_API_BASE_URL}/everything?q=${query}&pageSize=${pageSize}&page=${page}&apiKey=${NEWS_API_KEY}`,
    )

    if (!response.ok) {
      throw new Error(`Failed to search news: ${response.status}`)
    }

    const data: NewsResponse = await response.json()
    return data.articles
  } catch (error) {
    console.error("Error searching news:", error)
    return []
  }
}

// For fallback when API limits are reached
export function getMockNewsArticles(count = 10): NewsArticle[] {
  const categories = ["Technology", "Business", "Sports", "Entertainment", "Health"]

  return Array.from({ length: count }, (_, i) => ({
    source: {
      id: `source-${i}`,
      name: `News Source ${(i % 5) + 1}`,
    },
    author: `Author ${(i % 7) + 1}`,
    title: `This is a sample news article title ${i + 1} about ${categories[i % categories.length]}`,
    description: `This is a longer description for the news article ${i + 1}. It provides more context about what the article is about and why it might be interesting to readers.`,
    url: "https://example.com/article",
    urlToImage: `/placeholder.svg?height=400&width=600&text=News+${i + 1}`,
    publishedAt: new Date(Date.now() - i * 3600000).toISOString(),
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.",
    category: categories[i % categories.length],
  }))
}

// Helper function to format date
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

// Helper function to format time ago
export function timeAgo(dateString: string): string {
  const now = new Date()
  const date = new Date(dateString)
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  let interval = Math.floor(seconds / 31536000)
  if (interval >= 1) {
    return interval === 1 ? "1 year ago" : `${interval} years ago`
  }

  interval = Math.floor(seconds / 2592000)
  if (interval >= 1) {
    return interval === 1 ? "1 month ago" : `${interval} months ago`
  }

  interval = Math.floor(seconds / 86400)
  if (interval >= 1) {
    return interval === 1 ? "1 day ago" : `${interval} days ago`
  }

  interval = Math.floor(seconds / 3600)
  if (interval >= 1) {
    return interval === 1 ? "1 hour ago" : `${interval} hours ago`
  }

  interval = Math.floor(seconds / 60)
  if (interval >= 1) {
    return interval === 1 ? "1 minute ago" : `${interval} minutes ago`
  }

  return "Just now"
}

// Generate AI summary (mock implementation)
export function generateAISummary(content: string | null): string {
  if (!content) return "No content available for summarization."

  // In a real implementation, this would call an AI service
  // For now, we'll just return the first sentence or a truncated version
  const firstSentence = content.split(".")[0]
  return firstSentence.length > 150 ? firstSentence.substring(0, 150) + "..." : firstSentence + "."
}

