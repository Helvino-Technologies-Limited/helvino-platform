import { prisma } from "@/lib/prisma"
import { BlogPostForm } from "@/components/admin/blog-post-form"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

async function getAuthUser() {
  const cookieStore = cookies()
  const session = cookieStore.get('session')
  
  if (!session) {
    redirect('/auth/login')
  }

  // Get first admin user as default author
  const user = await prisma.user.findFirst({
    where: { role: 'ADMIN' }
  })

  return user
}

export default async function NewBlogPostPage() {
  const user = await getAuthUser()

  if (!user) {
    redirect('/auth/login')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-helvino-navy">Create New Blog Post</h1>
        <p className="text-gray-600 mt-2">Write and publish a new blog post</p>
      </div>

      <BlogPostForm authorId={user.id} />
    </div>
  )
}
