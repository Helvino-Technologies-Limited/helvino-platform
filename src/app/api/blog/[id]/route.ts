import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateSlug } from '@/lib/utils'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { id: params.id },
      include: { author: true }
    })

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ post })
  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { 
      title, 
      excerpt,
      content, 
      coverImage, 
      category, 
      tags, 
      seoTitle, 
      seoDescription, 
      status,
      publishedAt
    } = body

    const updateData: any = {
      excerpt: excerpt || null,
      content,
      coverImage: coverImage || null,
      category: category || null,
      tags: tags || null,
      seoTitle: seoTitle || null,
      seoDescription: seoDescription || null,
      status: status || 'DRAFT',
      publishedAt: publishedAt ? new Date(publishedAt) : null
    }

    if (title) {
      updateData.title = title
      updateData.slug = generateSlug(title)
    }

    const post = await prisma.blogPost.update({
      where: { id: params.id },
      data: updateData
    })

    return NextResponse.json({ success: true, post })
  } catch (error) {
    console.error('Error updating post:', error)
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.blogPost.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting post:', error)
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    )
  }
}
