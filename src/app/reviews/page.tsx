import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"
import { prisma } from "@/lib/prisma"
import { ReviewForm } from "@/components/public/review-form"
import { calculateAverageRating } from "@/lib/utils"

export const metadata = {
  title: "Client Reviews",
  description: "See what our clients say about Helvino Technologies Limited",
}

async function getReviews() {
  const reviews = await prisma.review.findMany({
    where: { status: 'APPROVED' },
    orderBy: { createdAt: 'desc' },
    include: { service: true }
  })

  const averageRating = calculateAverageRating(reviews)
  
  return { reviews, averageRating }
}

export default async function ReviewsPage() {
  const { reviews, averageRating } = await getReviews()

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-helvino-navy via-helvino-blue to-helvino-navy text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-helvino-orange border-none">Client Reviews</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              What Our Clients Say
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed mb-8">
              Don't just take our word for it. Here's what our clients have to say 
              about working with Helvino Technologies.
            </p>

            {reviews.length > 0 && (
              <div className="flex items-center gap-8 bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-4xl font-bold text-helvino-orange">
                      {averageRating}
                    </span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-6 w-6 ${
                            i < Math.round(averageRating)
                              ? "fill-helvino-orange text-helvino-orange"
                              : "text-gray-400"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-300">
                    Based on {reviews.length} reviews
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {reviews.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">No reviews yet.</p>
              <p className="text-gray-500 mt-2">Be the first to leave a review!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {reviews.map((review) => (
                <Card key={review.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? "fill-helvino-orange text-helvino-orange"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <CardTitle className="text-lg">{review.clientName}</CardTitle>
                    {review.company && (
                      <p className="text-sm text-gray-600">{review.company}</p>
                    )}
                    {review.service && (
                      <Badge variant="outline" className="mt-2 w-fit">
                        {review.service.title}
                      </Badge>
                    )}
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 italic leading-relaxed">
                      "{review.review}"
                    </p>
                    <p className="text-xs text-gray-400 mt-4">
                      {new Date(review.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Review Form */}
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">Leave a Review</CardTitle>
                <p className="text-center text-gray-600">
                  Share your experience working with us
                </p>
              </CardHeader>
              <CardContent>
                <ReviewForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
