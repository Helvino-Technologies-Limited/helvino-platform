import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateSlug } from '@/lib/utils'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const project = await prisma.project.findUnique({
      where: { id: params.id },
      include: { service: true }
    })

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ project })
  } catch (error) {
    console.error('Error fetching project:', error)
    return NextResponse.json(
      { error: 'Failed to fetch project' },
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

    const updateData: any = {
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

    if (title) {
      updateData.title = title
      updateData.slug = generateSlug(title)
    }

    const project = await prisma.project.update({
      where: { id: params.id },
      data: updateData
    })

    return NextResponse.json({ success: true, project })
  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.project.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    )
  }
}
