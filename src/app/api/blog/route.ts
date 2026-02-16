import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import slugify from 'slugify'

export async function GET(request: NextRequest) {
  try {
    const posts = await prisma.blogPost.findMany({
      include: { author: true },
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
      authorId 
    } = body

    if (!title || !content || !authorId) {
      return NextResponse.json(
        { error: 'Title, content, and author are required' },
        { status: 400 }
      )
    }

    const slug = slugify(title, { lower: true, strict: true })

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        coverImage,
        category,
        tags,
        seoTitle,
        seoDescription,
        status: status || 'DRAFT',
        authorId,
        publishedAt: status === 'ACTIVE' ? new Date() : null
      }
    })

    return NextResponse.json({ post }, { status: 201 })
  } catch (error) {
    console.error('Error creating blog post:', error)
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    )
  }
}
