"use client"

import { Button } from "@/components/ui/button"
import { Facebook, Linkedin, Twitter, Link2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface SocialShareProps {
  url: string
  title: string
  description?: string
}

export function SocialShare({ url, title, description }: SocialShareProps) {
  const { toast } = useToast()
  const fullUrl = `https://helvino.vercel.app${url}`

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(title)}`,
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(fullUrl)
    toast({
      title: "Link Copied!",
      description: "The blog post link has been copied to your clipboard.",
    })
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm font-semibold text-gray-600">Share:</span>
      <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer">
        <Button variant="outline" size="sm" className="gap-2">
          <Facebook className="h-4 w-4" />
          <span className="hidden sm:inline">Facebook</span>
        </Button>
      </a>
      <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer">
        <Button variant="outline" size="sm" className="gap-2">
          <Linkedin className="h-4 w-4" />
          <span className="hidden sm:inline">LinkedIn</span>
        </Button>
      </a>
      <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer">
        <Button variant="outline" size="sm" className="gap-2">
          <Twitter className="h-4 w-4" />
          <span className="hidden sm:inline">Twitter</span>
        </Button>
      </a>
      <Button variant="outline" size="sm" onClick={copyToClipboard} className="gap-2">
        <Link2 className="h-4 w-4" />
        <span className="hidden sm:inline">Copy</span>
      </Button>
    </div>
  )
}
