"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Star, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ReviewActions({ review }: { review: any }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  async function updateReview(status: string, featured?: boolean) {
    setLoading(true)
    try {
      const response = await fetch(`/api/reviews/${review.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          status,
          featured: featured !== undefined ? featured : review.featured
        })
      })

      if (!response.ok) throw new Error('Failed to update')

      toast({
        title: "Review Updated",
        description: "The review has been successfully updated.",
      })

      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update review. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Actions'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {review.status === 'PENDING' && (
          <>
            <DropdownMenuItem onClick={() => updateReview('APPROVED')}>
              <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
              Approve
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => updateReview('REJECTED')}>
              <XCircle className="mr-2 h-4 w-4 text-red-600" />
              Reject
            </DropdownMenuItem>
          </>
        )}
        {review.status === 'APPROVED' && (
          <DropdownMenuItem onClick={() => updateReview('APPROVED', !review.featured)}>
            <Star className="mr-2 h-4 w-4 text-yellow-600" />
            {review.featured ? 'Unfeature' : 'Feature'}
          </DropdownMenuItem>
        )}
        {review.status === 'REJECTED' && (
          <DropdownMenuItem onClick={() => updateReview('APPROVED')}>
            <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
            Approve
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
