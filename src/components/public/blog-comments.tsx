"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, MessageCircle } from "lucide-react"
import { formatDate } from "@/lib/utils"

interface BlogCommentsProps {
  postId: string
}

export function BlogComments({ postId }: BlogCommentsProps) {
  const [comments, setComments] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    loadComments()
  }, [postId])

  async function loadComments() {
    setLoading(true)
    try {
      const response = await fetch(`/api/blog/${postId}/comments`)
      const data = await response.json()
      setComments(data.comments || [])
    } catch (error) {
      console.error('Failed to load comments:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      comment: formData.get('comment'),
    }

    try {
      const response = await fetch(`/api/blog/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (!response.ok) throw new Error(result.error)

      toast({
        title: "Comment Submitted! ✅",
        description: "Your comment is pending approval and will appear once approved.",
      })

      e.currentTarget.reset()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit comment",
        variant: "destructive"
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-helvino-navy mb-6 flex items-center gap-2">
          <MessageCircle className="h-6 w-6" />
          Comments ({comments.length})
        </h3>

        {loading ? (
          <div className="text-center py-8">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-helvino-blue" />
          </div>
        ) : comments.length === 0 ? (
          <p className="text-gray-600 text-center py-8">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <Card key={comment.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{comment.name}</CardTitle>
                  <p className="text-sm text-gray-500">{formatDate(comment.createdAt)}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{comment.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leave a Comment</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name *</Label>
                <Input
                  id="name"
                  name="name"
                  required
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comment">Your Comment *</Label>
              <Textarea
                id="comment"
                name="comment"
                required
                rows={4}
                placeholder="Share your thoughts..."
              />
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="bg-helvino-blue hover:bg-helvino-blue/90"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Comment'
              )}
            </Button>

            <p className="text-sm text-gray-500">
              Your comment will be visible after admin approval
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
