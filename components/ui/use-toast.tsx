"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

type ToastProps = {
  title: string
  description?: string
  duration?: number
}

let toastId = 0

export function toast({ title, description, duration = 3000 }: ToastProps) {
  const id = ++toastId
  const event = new CustomEvent("toast", {
    detail: { id, title, description, duration },
  })
  document.dispatchEvent(event)
}

export function Toaster() {
  const [toasts, setToasts] = useState<(ToastProps & { id: number })[]>([])

  useEffect(() => {
    const handleToast = (event: Event) => {
      const { id, title, description, duration } = (event as CustomEvent).detail
      setToasts((prev) => [...prev, { id, title, description, duration }])

      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id))
      }, duration)
    }

    document.addEventListener("toast", handleToast)
    return () => document.removeEventListener("toast", handleToast)
  }, [])

  return (
    <div className="fixed bottom-0 right-0 z-50 flex flex-col gap-2 p-4 max-w-md w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "bg-background border rounded-lg shadow-lg p-4 transition-all duration-300 ease-in-out pointer-events-auto",
            "animate-in slide-in-from-bottom-5",
          )}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{toast.title}</h3>
              {toast.description && <p className="text-sm text-muted-foreground mt-1">{toast.description}</p>}
            </div>
            <button
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

