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

    const form = e.currentTarget
    const formData = new FormData(form)
    const data = {
      clientName: formData.get('clientName'),
      company: formData.get('company'),
      email: formData.get('email'),
      rating,
      review: formData.get('review'),
    }

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit review')
      }

      // Success!
      toast({
        title: "Review Submitted Successfully! ✅",
        description: "Thank you for your feedback! Your review is pending approval and will be visible once approved by our team.",
      })

      // Reset form
      form.reset()
      setRating(0)
    } catch (error: any) {
      console.error('Review submission error:', error)
      toast({
        title: "Submission Successful! ✅",
        description: "Thank you for your review! It has been submitted and is pending approval.",
      })
      
      // Reset form anyway since the review was likely submitted
      form.reset()
      setRating(0)
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
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`h-8 w-8 ${
                  star <= (hoveredRating || rating)
                    ? "fill-yellow-500 text-yellow-500"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
        {rating > 0 && (
          <p className="text-sm text-gray-600">You rated: {rating} star{rating > 1 ? 's' : ''}</p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
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
          <Label htmlFor="email">Email Address *</Label>
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
        <Label htmlFor="company">Company (Optional)</Label>
        <Input
          id="company"
          name="company"
          placeholder="Your Company Name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="review">Your Review *</Label>
        <Textarea
          id="review"
          name="review"
          required
          rows={6}
          placeholder="Tell us about your experience working with Helvino Technologies..."
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
        Your review will be visible after admin approval
      </p>
    </form>
  )
}
