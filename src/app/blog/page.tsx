import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Calendar, User } from "lucide-react"
import { prisma } from "@/lib/prisma"
import { formatDate } from "@/lib/utils"

export const metadata = {
  title: "Blog",
  description: "Latest insights, tutorials, and updates from Helvino Technologies",
}

export const revalidate = 0

async function getBlogPosts() {
  return await prisma.blogPost.findMany({
    where: { status: 'ACTIVE' },
    include: { author: true },
    orderBy: { createdAt: 'desc' }
  })
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="flex flex-col">
      <section className="pt-32 pb-20 bg-gradient-to-br from-helvino-navy via-helvino-blue to-helvino-navy text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-helvino-orange border-none">Our Blog</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Insights & Updates</h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              Stay updated with the latest trends, tutorials, and insights from our team of IT experts.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">No blog posts available at the moment.</p>
              <p className="text-gray-500 mt-2">Check back soon for updates!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Card key={post.id} className="group hover:shadow-xl transition-all overflow-hidden">
                  {post.coverImage && (
                    <div className="aspect-video overflow-hidden bg-gray-200">
                      <div className="w-full h-full bg-gradient-to-br from-helvino-blue/20 to-helvino-orange/20" />
                    </div>
                  )}
                  <CardHeader>
                    {post.category && (
                      <div className="mb-2">
                        <Badge variant="outline">{post.category}</Badge>
                      </div>
                    )}
                    <CardTitle className="group-hover:text-helvino-blue transition-colors">
                      {post.title}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{post.author.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(post.createdAt)}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {post.excerpt && (
                      <CardDescription className="line-clamp-3 mb-4">
                        {post.excerpt}
                      </CardDescription>
                    )}
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
