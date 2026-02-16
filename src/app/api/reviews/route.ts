import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const serviceId = searchParams.get('serviceId')

    const where: any = {}
    
    if (status) {
      where.status = status
    } else {
      // Default to showing only approved reviews on public site
      where.status = 'APPROVED'
    }

    if (serviceId) {
      where.serviceId = serviceId
    }

    const reviews = await prisma.review.findMany({
      where,
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { clientName, company, email, rating, review, serviceId } = body

    // Validate required fields
    if (!clientName || !email || !rating || !review) {
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

    const newReview = await prisma.review.create({
      data: {
        clientName,
        company: company || null,
        email,
        rating: Number(rating),
        review,
        serviceId: serviceId || null,
        status: 'PENDING',
        featured: false
      }
    })

    return NextResponse.json({ 
      success: true, 
      review: newReview,
      message: 'Review submitted successfully and is pending approval'
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating review:', error)
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    )
  }
}
