import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle } from "lucide-react"
import { prisma } from "@/lib/prisma"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CommentActions } from "@/components/admin/comment-actions"
import { formatDate } from "@/lib/utils"

async function getComments() {
  return await prisma.blogComment.findMany({
    include: { post: { select: { title: true } } },
    orderBy: { createdAt: 'desc' },
  })
}

export default async function CommentsPage() {
  const comments = await getComments()
  const pendingCount = comments.filter(c => c.status === 'PENDING').length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-helvino-navy">Blog Comments</h1>
        <p className="text-gray-600 mt-2">
          Manage blog comments ({pendingCount} pending approval)
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            All Comments ({comments.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {comments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No comments submitted yet</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Author</TableHead>
                  <TableHead>Post</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comments.map((comment) => (
                  <TableRow key={comment.id}>
                    <TableCell>
                      <p className="font-semibold">{comment.name}</p>
                      <p className="text-sm text-gray-500">{comment.email}</p>
                    </TableCell>
                    <TableCell className="max-w-[160px]">
                      <p className="text-sm line-clamp-2">{comment.post.title}</p>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <p className="text-sm line-clamp-3">{comment.comment}</p>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500 whitespace-nowrap">
                      {formatDate(comment.createdAt)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          comment.status === 'APPROVED' ? 'default' :
                          comment.status === 'PENDING' ? 'outline' :
                          'destructive'
                        }
                      >
                        {comment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <CommentActions comment={comment} />
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
