import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { clientName, company, email, review, rating, serviceId } = body

    // Validate required fields
    if (!clientName || !review || !rating) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }

    // Create review (pending approval)
    const newReview = await prisma.review.create({
      data: {
        clientName,
        company: company || null,
        email: email || null,
        review,
        rating,
        serviceId: serviceId || null,
        status: 'PENDING',
        featured: false
      }
    })

    return NextResponse.json({ success: true, review: newReview }, { status: 201 })
  } catch (error) {
    console.error('Error creating review:', error)
    return NextResponse.json(
      { error: 'Failed to submit review' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    const reviews = await prisma.review.findMany({
      where: status ? { status: status as any } : { status: 'APPROVED' },
      include: { service: true },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ reviews })
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}
