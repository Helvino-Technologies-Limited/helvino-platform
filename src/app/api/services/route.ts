import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateSlug } from '@/lib/utils'

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { order: 'asc' }
    })

    return NextResponse.json({ services })
  } catch (error) {
    console.error('Error fetching services:', error)
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, icon, image, features, seoTitle, seoDescription, status, order } = body

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      )
    }

    const slug = generateSlug(title)

    const service = await prisma.service.create({
      data: {
        title,
        slug,
        description,
        icon: icon || null,
        image: image || null,
        features: features || null,
        seoTitle: seoTitle || null,
        seoDescription: seoDescription || null,
        status: status || 'ACTIVE',
        order: order || 0
      }
    })

    return NextResponse.json({ success: true, service }, { status: 201 })
  } catch (error) {
    console.error('Error creating service:', error)
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    )
  }
}
