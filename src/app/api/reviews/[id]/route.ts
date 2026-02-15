import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { status, featured } = body

    const review = await prisma.review.update({
      where: { id: params.id },
      data: {
        status: status || undefined,
        featured: featured !== undefined ? featured : undefined
      }
    })

    return NextResponse.json({ success: true, review })
  } catch (error) {
    console.error('Error updating review:', error)
    return NextResponse.json(
      { error: 'Failed to update review' },
      { status: 500 }
    )
  }
}
