import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ServiceForm } from "@/components/admin/service-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NewServicePage() {
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
          <CardTitle>Create New Service</CardTitle>
        </CardHeader>
        <CardContent>
          <ServiceForm />
        </CardContent>
      </Card>
    </div>
  )
}
