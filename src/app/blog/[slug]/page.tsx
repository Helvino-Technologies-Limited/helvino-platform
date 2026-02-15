import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Calendar, User } from "lucide-react"
import { prisma } from "@/lib/prisma"
import { formatDate } from "@/lib/utils"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  const posts = await prisma.blogPost.findMany({
    where: { status: 'ACTIVE' },
    select: { slug: true }
  })

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

async function getBlogPost(slug: string) {
  return await prisma.blogPost.findUnique({
    where: { slug },
    include: { author: { select: { name: true, email: true } } }
  })
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  if (!post || post.status !== 'ACTIVE') {
    notFound()
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-helvino-navy via-helvino-blue to-helvino-navy text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog">
            <Button variant="ghost" className="text-white hover:bg-white/10 mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
            </Button>
          </Link>
          
          <div className="max-w-4xl">
            {post.category && (
              <Badge className="mb-4 bg-helvino-orange border-none">
                {post.category}
              </Badge>
            )}
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-gray-200">
              {post.author && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {post.author.name}
                </div>
              )}
              {post.publishedAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.publishedAt)}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Post Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <article className="max-w-4xl mx-auto">
            {post.coverImage && (
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full rounded-lg shadow-lg mb-12"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200&q=80"
                }}
              />
            )}

            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            {post.tags && (post.tags as any).length > 0 && (
              <div className="mt-12 pt-8 border-t">
                <h3 className="text-lg font-semibold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {(post.tags as any).map((tag: string, idx: number) => (
                    <Badge key={idx} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </article>
        </div>
      </section>
    </div>
  )
}
