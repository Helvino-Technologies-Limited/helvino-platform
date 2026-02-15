import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateSlug } from '@/lib/utils'

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: { service: true },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ projects })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      title, 
      description, 
      client, 
      industry, 
      problem, 
      solution, 
      technologies, 
      images, 
      featured, 
      status, 
      serviceId 
    } = body

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      )
    }

    const slug = generateSlug(title)

    const project = await prisma.project.create({
      data: {
        title,
        slug,
        description,
        client: client || null,
        industry: industry || null,
        problem: problem || null,
        solution: solution || null,
        technologies: technologies || null,
        images: images || null,
        featured: featured || false,
        status: status || 'COMPLETED',
        serviceId: serviceId || null
      }
    })

    return NextResponse.json({ success: true, project }, { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}
