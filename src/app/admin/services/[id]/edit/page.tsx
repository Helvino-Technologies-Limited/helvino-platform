import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ServiceForm } from "@/components/admin/service-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

async function getService(id: string) {
  return await prisma.service.findUnique({
    where: { id }
  })
}

export default async function EditServicePage({ params }: { params: { id: string } }) {
  const service = await getService(params.id)

  if (!service) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <Link href="/admin/services">
        <Button variant="ghost">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Services
        </Button>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Edit Service: {service.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ServiceForm service={service} isEdit />
        </CardContent>
      </Card>
    </div>
  )
}
