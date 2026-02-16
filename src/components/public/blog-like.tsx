"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface BlogLikeProps {
  postId: string
}

export function BlogLike({ postId }: BlogLikeProps) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    // Load like count
    fetch(`/api/blog/${postId}/like`)
      .then(res => res.json())
      .then(data => setLikeCount(data.likeCount))
      .catch(() => {})

    // Check if user already liked (from localStorage)
    const email = localStorage.getItem('userEmail')
    if (email) {
      setUserEmail(email)
    }
  }, [postId])

  async function handleLike() {
    let email = userEmail

    if (!email) {
      const promptEmail = prompt("Enter your email to like this post:")
      if (!promptEmail) return
      
      email = promptEmail
      localStorage.setItem('userEmail', email)
      setUserEmail(email)
    }

    setLoading(true)

    try {
      const response = await fetch(`/api/blog/${postId}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (!response.ok) throw new Error(data.error)

      setLiked(data.liked)
      setLikeCount(data.likeCount)

      toast({
        title: data.liked ? "Post Liked! ❤️" : "Like Removed",
        description: data.liked ? "Thank you for your support!" : "",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to like post",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      size="lg"
      onClick={handleLike}
      disabled={loading}
      className={`gap-2 ${liked ? 'text-red-500 border-red-500' : ''}`}
    >
      <Heart className={`h-5 w-5 ${liked ? 'fill-red-500' : ''}`} />
      <span>{likeCount} {likeCount === 1 ? 'Like' : 'Likes'}</span>
    </Button>
  )
}
