"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Star, Loader2 } from "lucide-react"

export function ReviewForm() {
  const [loading, setLoading] = useState(false)
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const { toast } = useToast()

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    
    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a rating before submitting.",
        variant: "destructive"
      })
      return
    }

    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      clientName: formData.get('clientName'),
      company: formData.get('company'),
      email: formData.get('email'),
      review: formData.get('review'),
      rating
    }

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) throw new Error('Failed to submit')

      toast({
        title: "Review Submitted!",
        description: "Thank you! Your review will be published after approval.",
      })

      e.currentTarget.reset()
      setRating(0)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label>Your Rating *</Label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="focus:outline-none"
            >
              <Star
                className={`h-8 w-8 transition-colors ${
                  star <= (hoveredRating || rating)
                    ? "fill-helvino-orange text-helvino-orange"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="clientName">Your Name *</Label>
          <Input
            id="clientName"
            name="clientName"
            required
            placeholder="John Doe"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            name="company"
            placeholder="Company Name"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email (won't be published)</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="john@example.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="review">Your Review *</Label>
        <Textarea
          id="review"
          name="review"
          required
          rows={5}
          placeholder="Tell us about your experience..."
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-helvino-blue hover:bg-helvino-blue/90"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit Review'
        )}
      </Button>

      <p className="text-sm text-gray-500 text-center">
        Your review will be published after it's been approved by our team.
      </p>
    </form>
  )
}
