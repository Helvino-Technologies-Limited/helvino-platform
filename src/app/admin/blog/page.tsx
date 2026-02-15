import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Eye } from "lucide-react"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DeleteBlogButton } from "@/components/admin/delete-blog-button"
import { formatDate } from "@/lib/utils"

async function getBlogPosts() {
  return await prisma.blogPost.findMany({
    include: { author: { select: { name: true } } },
    orderBy: { createdAt: 'desc' }
  })
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-helvino-navy">Blog Posts</h1>
          <p className="text-gray-600 mt-2">Manage your blog content</p>
        </div>
        <Link href="/admin/blog/new">
          <Button className="bg-helvino-blue hover:bg-helvino-blue/90">
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </Link>
      </div>

      {/* Blog Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Posts ({posts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No blog posts created yet</p>
              <Link href="/admin/blog/new">
                <Button variant="outline">Create Your First Post</Button>
              </Link>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-semibold max-w-md">
                      <p className="line-clamp-1">{post.title}</p>
                    </TableCell>
                    <TableCell>{post.author.name}</TableCell>
                    <TableCell>
                      {post.category ? (
                        <Badge variant="outline">{post.category}</Badge>
                      ) : '-'}
                    </TableCell>
                    <TableCell>
                      <Badge variant={post.status === 'ACTIVE' ? 'default' : 'outline'}>
                        {post.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{post.views}</TableCell>
                    <TableCell>
                      {post.publishedAt ? formatDate(post.publishedAt) : formatDate(post.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {post.status === 'ACTIVE' && (
                          <Link href={`/blog/${post.slug}`} target="_blank">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                        )}
                        <Link href={`/admin/blog/${post.id}/edit`}>
                          <Button variant="outline" size="sm">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>
                        <DeleteBlogButton postId={post.id} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
