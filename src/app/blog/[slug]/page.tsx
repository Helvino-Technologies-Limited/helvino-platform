import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Calendar, User } from "lucide-react"
import { prisma } from "@/lib/prisma"
import { formatDate } from "@/lib/utils"

async function getBlogPost(slug: string) {
  try {
    return await prisma.blogPost.findUnique({
      where: { slug },
      include: { author: true }
    })
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

export async function generateStaticParams() {
  try {
    const posts = await prisma.blogPost.findMany({
      select: { slug: true }
    })
    
    return posts.map((post) => ({
      slug: post.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)
  
  if (!post) {
    return {
      title: "Post Not Found"
    }
  }

  return {
    title: post.title,
    description: post.excerpt || post.title
  }
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="flex flex-col">
      <section className="pt-32 pb-12 bg-gradient-to-br from-helvino-navy via-helvino-blue to-helvino-navy text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog">
            <Button variant="ghost" className="text-white hover:bg-white/10 mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
          <div className="max-w-4xl">
            {post.category && (
              <div className="mb-4">
                <Badge variant="outline" className="border-white text-white">
                  {post.category}
                </Badge>
              </div>
            )}
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>
            <div className="flex items-center gap-6 text-gray-200">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <article className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {post.excerpt && (
            <div className="text-xl text-gray-600 mb-8 pb-8 border-b">
              {post.excerpt}
            </div>
          )}
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </div>
      </article>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-helvino-navy mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">Contact us today to discuss how we can help your business.</p>
          <Link href="/contact">
            <Button size="lg" className="bg-helvino-blue hover:bg-helvino-blue/90">Get In Touch</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
