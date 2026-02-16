"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

interface BlogPostFormProps {
  post?: any
  authorId: string
  isEdit?: boolean
}

export function BlogPostForm({ post, authorId, isEdit = false }: BlogPostFormProps) {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(post?.status || 'DRAFT')
  const router = useRouter()
  const { toast } = useToast()

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get('title'),
      excerpt: formData.get('excerpt'),
      content: formData.get('content'),
      coverImage: formData.get('coverImage'),
      category: formData.get('category'),
      seoTitle: formData.get('seoTitle'),
      seoDescription: formData.get('seoDescription'),
      status,
      authorId
    }

    try {
      const url = isEdit ? `/api/blog/${post.id}` : '/api/blog'
      const method = isEdit ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) throw new Error('Failed to save blog post')

      toast({
        title: isEdit ? "Post Updated" : "Post Created",
        description: `The blog post has been successfully ${isEdit ? 'updated' : 'created'}.`,
      })

      router.push('/admin/blog')
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${isEdit ? 'update' : 'create'} blog post. Please try again.`,
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Post Title *</Label>
        <Input
          id="title"
          name="title"
          required
          defaultValue={post?.title}
          placeholder="e.g., 10 Best Practices for Cybersecurity"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          name="excerpt"
          rows={3}
          defaultValue={post?.excerpt}
          placeholder="Brief summary of the post (optional)"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content *</Label>
        <Textarea
          id="content"
          name="content"
          required
          rows={15}
          defaultValue={post?.content}
          placeholder="Write your blog post content here... (HTML supported)"
          className="font-mono text-sm"
        />
        <p className="text-sm text-gray-500">You can use HTML formatting</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            name="category"
            defaultValue={post?.category}
            placeholder="e.g., Cybersecurity, Software Development"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="coverImage">Cover Image URL</Label>
          <Input
            id="coverImage"
            name="coverImage"
            defaultValue={post?.coverImage}
            placeholder="https://example.com/image.jpg"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="seoTitle">SEO Title</Label>
        <Input
          id="seoTitle"
          name="seoTitle"
          defaultValue={post?.seoTitle}
          placeholder="Custom title for search engines (optional)"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="seoDescription">SEO Description</Label>
        <Textarea
          id="seoDescription"
          name="seoDescription"
          rows={2}
          defaultValue={post?.seoDescription}
          placeholder="Description for search engines (optional)"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="DRAFT">Draft</SelectItem>
            <SelectItem value="ACTIVE">Active (Published)</SelectItem>
            <SelectItem value="INACTIVE">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-gray-500">
          Only "Active" posts will be visible on the public blog
        </p>
      </div>

      <div className="flex gap-4">
        <Button
          type="submit"
          disabled={loading}
          className="bg-helvino-blue hover:bg-helvino-blue/90"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isEdit ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            isEdit ? 'Update Post' : 'Create Post'
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/blog')}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
