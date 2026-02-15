import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Calendar, User } from "lucide-react"
import { prisma } from "@/lib/prisma"
import { formatDate } from "@/lib/utils"

export const metadata = {
  title: "Blog & Insights",
  description: "Latest insights, tips, and updates from Helvino Technologies Limited",
}

async function getBlogPosts() {
  return await prisma.blogPost.findMany({
    where: { status: 'ACTIVE', publishedAt: { not: null } },
    include: { author: { select: { name: true } } },
    orderBy: { publishedAt: 'desc' }
  })
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-helvino-navy via-helvino-blue to-helvino-navy text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-helvino-orange border-none">Blog & Insights</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Technology Insights & Updates
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              Stay informed with the latest trends, tips, and insights from our team of 
              technology experts.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">No blog posts available yet.</p>
              <p className="text-gray-500 mt-2">Check back soon for updates!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Card key={post.id} className="group hover:shadow-xl transition-all overflow-hidden">
                  {post.coverImage && (
                    <div className="aspect-video overflow-hidden bg-gray-200">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&q=80"
                        }}
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                      {post.publishedAt && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(post.publishedAt)}
                        </div>
                      )}
                      {post.author && (
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {post.author.name}
                        </div>
                      )}
                    </div>
                    {post.category && (
                      <Badge variant="outline" className="mb-2 w-fit">
                        {post.category}
                      </Badge>
                    )}
                    <CardTitle className="group-hover:text-helvino-blue transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                    {post.excerpt && (
                      <CardDescription className="line-clamp-3">
                        {post.excerpt}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <Link href={`/blog/${post.slug}`}>
                      <Button variant="link" className="p-0 text-helvino-blue">
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
