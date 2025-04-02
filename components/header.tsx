"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Search, Bookmark, Sun, Moon, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export function Header() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled ? "bg-background/95 backdrop-blur-sm border-b shadow-sm" : "bg-background",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  href="/"
                  className={cn(
                    "flex items-center gap-2 text-lg font-medium transition-colors hover:text-primary",
                    pathname === "/" ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  Home
                </Link>
                <Link
                  href="/category/technology"
                  className={cn(
                    "flex items-center gap-2 text-lg font-medium transition-colors hover:text-primary",
                    pathname === "/category/technology" ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  Technology
                </Link>
                <Link
                  href="/category/business"
                  className={cn(
                    "flex items-center gap-2 text-lg font-medium transition-colors hover:text-primary",
                    pathname === "/category/business" ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  Business
                </Link>
                <Link
                  href="/category/entertainment"
                  className={cn(
                    "flex items-center gap-2 text-lg font-medium transition-colors hover:text-primary",
                    pathname === "/category/entertainment" ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  Entertainment
                </Link>
                <Link
                  href="/category/sports"
                  className={cn(
                    "flex items-center gap-2 text-lg font-medium transition-colors hover:text-primary",
                    pathname === "/category/sports" ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  Sports
                </Link>
                <Link
                  href="/category/health"
                  className={cn(
                    "flex items-center gap-2 text-lg font-medium transition-colors hover:text-primary",
                    pathname === "/category/health" ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  Health
                </Link>
                <Link
                  href="/category/science"
                  className={cn(
                    "flex items-center gap-2 text-lg font-medium transition-colors hover:text-primary",
                    pathname === "/category/science" ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  Science
                </Link>
                <Link
                  href="/bookmarks"
                  className={cn(
                    "flex items-center gap-2 text-lg font-medium transition-colors hover:text-primary",
                    pathname === "/bookmarks" ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  <Bookmark className="h-5 w-5" />
                  Bookmarks
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight">NewsHub</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/" ? "text-primary" : "text-muted-foreground",
            )}
          >
            Home
          </Link>
          <Link
            href="/category/technology"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/category/technology" ? "text-primary" : "text-muted-foreground",
            )}
          >
            Technology
          </Link>
          <Link
            href="/category/business"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/category/business" ? "text-primary" : "text-muted-foreground",
            )}
          >
            Business
          </Link>
          <Link
            href="/category/entertainment"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/category/entertainment" ? "text-primary" : "text-muted-foreground",
            )}
          >
            Entertainment
          </Link>
          <Link
            href="/category/sports"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/category/sports" ? "text-primary" : "text-muted-foreground",
            )}
          >
            Sports
          </Link>
          <Link
            href="/category/health"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/category/health" ? "text-primary" : "text-muted-foreground",
            )}
          >
            Health
          </Link>
        </nav>

        <div className="flex items-center space-x-2">
          {searchOpen ? (
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Search news..."
                className="w-[200px] sm:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0"
                onClick={() => setSearchOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </form>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}

          <Button variant="ghost" size="icon" asChild>
            <Link href="/bookmarks">
              <Bookmark className="h-5 w-5" />
              <span className="sr-only">Bookmarks</span>
            </Link>
          </Button>

          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  )
}

