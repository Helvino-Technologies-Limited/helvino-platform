import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProjectForm } from "@/components/admin/project-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { prisma } from "@/lib/prisma"

async function getServices() {
  return await prisma.service.findMany({
    where: { status: 'ACTIVE' },
    orderBy: { title: 'asc' }
  })
}

export default async function NewProjectPage() {
  const services = await getServices()

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
          <CardTitle>Create New Project</CardTitle>
        </CardHeader>
        <CardContent>
          <ProjectForm services={services} />
        </CardContent>
      </Card>
    </div>
  )
}
