import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Check if already liked
    const existingLike = await prisma.blogLike.findUnique({
      where: {
        postId_userEmail: {
          postId: params.id,
          userEmail: email
        }
      }
    })

    if (existingLike) {
      // Unlike
      await prisma.blogLike.delete({
        where: { id: existingLike.id }
      })
      
      const likeCount = await prisma.blogLike.count({
        where: { postId: params.id }
      })

      return NextResponse.json({ liked: false, likeCount })
    } else {
      // Like
      await prisma.blogLike.create({
        data: {
          postId: params.id,
          userEmail: email,
          userIP: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
        }
      })

      const likeCount = await prisma.blogLike.count({
        where: { postId: params.id }
      })

      return NextResponse.json({ liked: true, likeCount })
    }
  } catch (error) {
    console.error('Like error:', error)
    return NextResponse.json(
      { error: 'Failed to process like' },
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const likeCount = await prisma.blogLike.count({
      where: { postId: params.id }
    })

    return NextResponse.json({ likeCount })
  } catch (error) {
    return NextResponse.json({ likeCount: 0 })
  }
}
