import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DeleteServiceButton } from "@/components/admin/delete-service-button"

async function getServices() {
  return await prisma.service.findMany({
    orderBy: { order: 'asc' }
  })
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-helvino-navy">Services</h1>
          <p className="text-gray-600 mt-2">Manage your service offerings</p>
        </div>
        <Link href="/admin/services/new">
          <Button className="bg-helvino-blue hover:bg-helvino-blue/90">
            <Plus className="mr-2 h-4 w-4" />
            Add Service
          </Button>
        </Link>
      </div>

      {/* Services Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Services ({services.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {services.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No services created yet</p>
              <Link href="/admin/services/new">
                <Button variant="outline">Create Your First Service</Button>
              </Link>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.order}</TableCell>
                    <TableCell className="font-semibold">{service.title}</TableCell>
                    <TableCell>
                      <Badge variant={service.status === 'ACTIVE' ? 'default' : 'outline'}>
                        {service.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-md">
                      <p className="line-clamp-2 text-sm text-gray-600">
                        {service.description}
                      </p>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/services/${service.id}/edit`}>
                          <Button variant="outline" size="sm">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>
                        <DeleteServiceButton serviceId={service.id} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
