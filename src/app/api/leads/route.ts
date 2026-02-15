import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendContactNotification } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company, service, message, type } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create lead in database
    const lead = await prisma.contactLead.create({
      data: {
        name,
        email,
        phone: phone || null,
        company: company || null,
        service: service || null,
        message,
        type: type || 'CONTACT',
        status: 'NEW'
      }
    })

    // Send email notification
    try {
      await sendContactNotification({
        name,
        email,
        phone,
        company,
        service,
        message,
        type: type || 'CONTACT'
      })
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError)
      // Continue even if email fails
    }

    return NextResponse.json({ success: true, lead }, { status: 201 })
  } catch (error) {
    console.error('Error creating lead:', error)
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    const leads = await prisma.contactLead.findMany({
      where: status ? { status: status as any } : undefined,
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ leads })
  } catch (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    )
  }
}
