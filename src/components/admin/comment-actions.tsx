"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Trash2, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function CommentActions({ comment }: { comment: any }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  async function updateComment(status: string) {
    setLoading(true)
    try {
      const response = await fetch(`/api/admin/comments/${comment.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) throw new Error('Failed to update')

      toast({
        title: "Comment Updated",
        description: `Comment has been ${status.toLowerCase()}.`,
      })

      router.refresh()
    } catch {
      toast({
        title: "Error",
        description: "Failed to update comment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  async function deleteComment() {
    setLoading(true)
    try {
      const response = await fetch(`/api/admin/comments/${comment.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete')

      toast({
        title: "Comment Deleted",
        description: "The comment has been removed.",
      })

      router.refresh()
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete comment. Please try again.",
        variant: "destructive",
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
        {comment.status === 'PENDING' && (
          <>
            <DropdownMenuItem onClick={() => updateComment('APPROVED')}>
              <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
              Approve
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => updateComment('REJECTED')}>
              <XCircle className="mr-2 h-4 w-4 text-red-600" />
              Reject
            </DropdownMenuItem>
          </>
        )}
        {comment.status === 'APPROVED' && (
          <DropdownMenuItem onClick={() => updateComment('REJECTED')}>
            <XCircle className="mr-2 h-4 w-4 text-red-600" />
            Reject
          </DropdownMenuItem>
        )}
        {comment.status === 'REJECTED' && (
          <DropdownMenuItem onClick={() => updateComment('APPROVED')}>
            <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
            Approve
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={deleteComment} className="text-red-600">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
