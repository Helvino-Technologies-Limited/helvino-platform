import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, Building2, Calendar } from "lucide-react"
import { prisma } from "@/lib/prisma"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { LeadActions } from "@/components/admin/lead-actions"
import { formatDate } from "@/lib/utils"

async function getLeads() {
  return await prisma.contactLead.findMany({
    orderBy: { createdAt: 'desc' }
  })
}

export default async function LeadsPage() {
  const leads = await getLeads()
  const newCount = leads.filter(l => l.status === 'NEW').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-helvino-navy">Contact Leads</h1>
        <p className="text-gray-600 mt-2">
          Manage inquiries and quotation requests ({newCount} new)
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {['NEW', 'CONTACTED', 'IN_PROGRESS', 'CLOSED'].map((status) => {
          const count = leads.filter(l => l.status === status).length
          return (
            <Card key={status}>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-helvino-navy">{count}</div>
                <p className="text-sm text-gray-600">{status.replace('_', ' ')}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Leads ({leads.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {leads.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No leads yet</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell>
                      <div>
                        <p className="font-semibold">{lead.name}</p>
                        {lead.company && (
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <Building2 className="h-3 w-3" />
                            {lead.company}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-sm flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {lead.email}
                        </p>
                        {lead.phone && (
                          <p className="text-sm flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {lead.phone}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{lead.type}</Badge>
                    </TableCell>
                    <TableCell>{lead.service || '-'}</TableCell>
                    <TableCell className="max-w-md">
                      <p className="line-clamp-2 text-sm">{lead.message}</p>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          lead.status === 'NEW' ? 'default' :
                          lead.status === 'CLOSED' ? 'outline' :
                          'secondary'
                        }
                      >
                        {lead.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(lead.createdAt)}
                      </p>
                    </TableCell>
                    <TableCell className="text-right">
                      <LeadActions lead={lead} />
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
