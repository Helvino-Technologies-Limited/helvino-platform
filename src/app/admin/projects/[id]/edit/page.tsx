import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProjectForm } from "@/components/admin/project-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

async function getProject(id: string) {
  return await prisma.project.findUnique({
    where: { id }
  })
}

async function getServices() {
  return await prisma.service.findMany({
    where: { status: 'ACTIVE' },
    orderBy: { title: 'asc' }
  })
}

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const [project, services] = await Promise.all([
    getProject(params.id),
    getServices()
  ])

  if (!project) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <Link href="/admin/projects">
        <Button variant="ghost">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Button>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Edit Project: {project.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ProjectForm project={project} services={services} isEdit />
        </CardContent>
      </Card>
    </div>
  )
}
