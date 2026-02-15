import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateSlug } from '@/lib/utils'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    const posts = await prisma.blogPost.findMany({
      where: status ? { status: status as any } : { status: 'ACTIVE' },
      include: { author: { select: { name: true, email: true } } },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ posts })
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
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
      authorId,
      publishedAt
    } = body

    if (!title || !content || !authorId) {
      return NextResponse.json(
        { error: 'Title, content, and author are required' },
        { status: 400 }
      )
    }

    const slug = generateSlug(title)

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        excerpt: excerpt || null,
        content,
        coverImage: coverImage || null,
        category: category || null,
        tags: tags || null,
        seoTitle: seoTitle || null,
        seoDescription: seoDescription || null,
        status: status || 'DRAFT',
        authorId,
        publishedAt: publishedAt ? new Date(publishedAt) : null
      }
    })

    return NextResponse.json({ success: true, post }, { status: 201 })
  } catch (error) {
    console.error('Error creating blog post:', error)
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    )
  }
}
