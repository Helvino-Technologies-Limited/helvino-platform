import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { prisma } from "@/lib/prisma"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ReviewActions } from "@/components/admin/review-actions"

async function getReviews() {
  return await prisma.review.findMany({
    include: { service: true },
    orderBy: { createdAt: 'desc' }
  })
}

export default async function ReviewsPage() {
  const reviews = await getReviews()
  const pendingCount = reviews.filter(r => r.status === 'PENDING').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-helvino-navy">Reviews & Testimonials</h1>
        <p className="text-gray-600 mt-2">
          Manage client reviews ({pendingCount} pending approval)
        </p>
      </div>

      {/* Reviews Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Reviews ({reviews.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {reviews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No reviews submitted yet</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Review</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell className="font-semibold">{review.clientName}</TableCell>
                    <TableCell>{review.company || '-'}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? "fill-yellow-500 text-yellow-500"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-md">
                      <p className="line-clamp-2 text-sm">{review.review}</p>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          review.status === 'APPROVED' ? 'default' :
                          review.status === 'PENDING' ? 'outline' :
                          'destructive'
                        }
                      >
                        {review.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {review.featured && <Badge className="bg-yellow-500">Featured</Badge>}
                    </TableCell>
                    <TableCell className="text-right">
                      <ReviewActions review={review} />
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
