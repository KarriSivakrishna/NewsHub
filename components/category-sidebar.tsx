"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Laptop, Briefcase, Film, Trophy, Heart, Microscope, Globe, Newspaper } from "lucide-react"
import { cn } from "@/lib/utils"

const categories = [
  {
    name: "All News",
    href: "/",
    icon: Newspaper,
  },
  {
    name: "Technology",
    href: "/category/technology",
    icon: Laptop,
  },
  {
    name: "Business",
    href: "/category/business",
    icon: Briefcase,
  },
  {
    name: "Entertainment",
    href: "/category/entertainment",
    icon: Film,
  },
  {
    name: "Sports",
    href: "/category/sports",
    icon: Trophy,
  },
  {
    name: "Health",
    href: "/category/health",
    icon: Heart,
  },
  {
    name: "Science",
    href: "/category/science",
    icon: Microscope,
  },
  {
    name: "World",
    href: "/category/general",
    icon: Globe,
  },
]

export function CategorySidebar() {
  const pathname = usePathname()

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-6">
        <h3 className="font-semibold text-lg mb-4">Categories</h3>
        <nav className="space-y-1">
          {categories.map((category) => {
            const isActive =
              category.href === "/"
                ? pathname === "/"
                : pathname === category.href || pathname.startsWith(`${category.href}/`)

            return (
              <Link
                key={category.name}
                href={category.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                )}
              >
                <category.icon className="h-4 w-4" />
                <span>{category.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

