import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"
import { ReviewForm } from "@/components/public/review-form"
import { prisma } from "@/lib/prisma"
import { calculateAverageRating } from "@/lib/utils"

export const metadata = {
  title: "Client Reviews",
  description: "Read what our clients say about working with Helvino Technologies",
}

export const revalidate = 0 // Always fetch fresh data

async function getReviews() {
  return await prisma.review.findMany({
    where: { status: 'APPROVED' },
    include: { service: true },
    orderBy: { createdAt: 'desc' }
  })
}

export default async function ReviewsPage() {
  const reviews = await getReviews()
  const averageRating = calculateAverageRating(reviews)

  return (
    <div className="flex flex-col">
      <section className="pt-32 pb-20 bg-gradient-to-br from-helvino-navy via-helvino-blue to-helvino-navy text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-helvino-orange border-none">Client Testimonials</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">What Our Clients Say</h1>
            <p className="text-xl text-gray-200 leading-relaxed">Don't just take our word for it. See what our clients have to say about working with Helvino Technologies.</p>
          </div>
        </div>
      </section>

      {reviews.length > 0 && (
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-helvino-navy">{averageRating}</div>
                <div className="flex gap-1 justify-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.round(Number(averageRating))
                          ? "fill-yellow-500 text-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 mt-2">Average Rating</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-helvino-navy">{reviews.length}</div>
                <p className="text-gray-600 mt-2">Total Reviews</p>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {reviews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 mb-4">No reviews yet. Be the first to share your experience!</p>
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-helvino-navy mb-12 text-center">Client Reviews ({reviews.length})</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {reviews.map((review) => (
                  <Card key={review.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex gap-1 mb-2">
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
                      <CardTitle className="text-lg">{review.clientName}</CardTitle>
                      {review.company && (
                        <p className="text-sm text-gray-600">{review.company}</p>
                      )}
                      {review.featured && (
                        <Badge className="bg-helvino-orange border-none mt-2">Featured Review</Badge>
                      )}
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 italic">"{review.review}"</p>
                      {review.service && (
                        <Badge variant="outline" className="mt-4">{review.service.title}</Badge>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-helvino-navy mb-4">Share Your Experience</h2>
            <p className="text-gray-600">We'd love to hear about your experience working with us</p>
          </div>
          <Card>
            <CardContent className="pt-6">
              <ReviewForm />
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
