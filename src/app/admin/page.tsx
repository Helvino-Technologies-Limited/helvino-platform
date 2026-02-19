import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Briefcase,
  FolderKanban,
  Star,
  MessageSquare,
  MessageCircle,
  TrendingUp,
  Users,
  FileText,
  CheckCircle
} from "lucide-react"
import { prisma } from "@/lib/prisma"

async function getDashboardStats() {
  const [
    totalServices,
    activeServices,
    totalProjects,
    featuredProjects,
    totalReviews,
    pendingReviews,
    approvedReviews,
    totalLeads,
    newLeads,
    totalBlogPosts,
    publishedPosts,
    pendingComments,
  ] = await Promise.all([
    prisma.service.count(),
    prisma.service.count({ where: { status: 'ACTIVE' } }),
    prisma.project.count(),
    prisma.project.count({ where: { featured: true } }),
    prisma.review.count(),
    prisma.review.count({ where: { status: 'PENDING' } }),
    prisma.review.count({ where: { status: 'APPROVED' } }),
    prisma.contactLead.count(),
    prisma.contactLead.count({ where: { status: 'NEW' } }),
    prisma.blogPost.count(),
    prisma.blogPost.count({ where: { status: 'ACTIVE' } }),
    prisma.blogComment.count({ where: { status: 'PENDING' } }),
  ])

  // Get recent items
  const [recentLeads, recentReviews] = await Promise.all([
    prisma.contactLead.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' }
    }),
    prisma.review.findMany({
      where: { status: 'PENDING' },
      take: 5,
      orderBy: { createdAt: 'desc' }
    })
  ])

  // Calculate average rating
  const reviews = await prisma.review.findMany({
    where: { status: 'APPROVED' },
    select: { rating: true }
  })
  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '0'

  return {
    stats: {
      totalServices,
      activeServices,
      totalProjects,
      featuredProjects,
      totalReviews,
      pendingReviews,
      approvedReviews,
      totalLeads,
      newLeads,
      totalBlogPosts,
      publishedPosts,
      pendingComments,
      averageRating
    },
    recentLeads,
    recentReviews
  }
}

export default async function AdminDashboard() {
  const { stats, recentLeads, recentReviews } = await getDashboardStats()

  const cards = [
    {
      title: "Services",
      value: stats.totalServices,
      description: `${stats.activeServices} active`,
      icon: Briefcase,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Projects",
      value: stats.totalProjects,
      description: `${stats.featuredProjects} featured`,
      icon: FolderKanban,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Reviews",
      value: stats.totalReviews,
      description: `${stats.pendingReviews} pending approval`,
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      title: "Leads",
      value: stats.totalLeads,
      description: `${stats.newLeads} new`,
      icon: MessageSquare,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "Blog Posts",
      value: stats.totalBlogPosts,
      description: `${stats.publishedPosts} published`,
      icon: FileText,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100"
    },
    {
      title: "Comments",
      value: stats.pendingComments,
      description: "pending approval",
      icon: MessageCircle,
      color: "text-teal-600",
      bgColor: "bg-teal-100"
    },
    {
      title: "Average Rating",
      value: stats.averageRating,
      description: `From ${stats.approvedReviews} reviews`,
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-helvino-navy">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {card.title}
              </CardTitle>
              <div className={`h-10 w-10 rounded-lg ${card.bgColor} flex items-center justify-center`}>
                <card.icon className={`h-5 w-5 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-helvino-navy">{card.value}</div>
              <p className="text-sm text-gray-600 mt-1">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Recent Leads
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentLeads.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No leads yet</p>
            ) : (
              <div className="space-y-4">
                {recentLeads.map((lead) => (
                  <div key={lead.id} className="border-l-4 border-helvino-blue pl-4 py-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-helvino-navy">{lead.name}</p>
                        <p className="text-sm text-gray-600">{lead.email}</p>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                          {lead.message}
                        </p>
                      </div>
                      <Badge variant={lead.status === 'NEW' ? 'default' : 'outline'}>
                        {lead.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pending Reviews */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Pending Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentReviews.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No pending reviews</p>
            ) : (
              <div className="space-y-4">
                {recentReviews.map((review) => (
                  <div key={review.id} className="border-l-4 border-yellow-500 pl-4 py-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-helvino-navy">{review.clientName}</p>
                        {review.company && (
                          <p className="text-sm text-gray-600">{review.company}</p>
                        )}
                        <div className="flex gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < review.rating
                                  ? "fill-yellow-500 text-yellow-500"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {review.review}
                        </p>
                      </div>
                      <Badge variant="outline" className="bg-yellow-50">
                        PENDING
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-br from-helvino-navy to-helvino-blue text-white">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a href="/admin/services" className="p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-center">
              <Briefcase className="h-6 w-6 mx-auto mb-2" />
              <p className="text-sm">Add Service</p>
            </a>
            <a href="/admin/projects" className="p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-center">
              <FolderKanban className="h-6 w-6 mx-auto mb-2" />
              <p className="text-sm">Add Project</p>
            </a>
            <a href="/admin/blog" className="p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-center">
              <FileText className="h-6 w-6 mx-auto mb-2" />
              <p className="text-sm">Write Post</p>
            </a>
            <a href="/admin/reviews" className="p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-center">
              <CheckCircle className="h-6 w-6 mx-auto mb-2" />
              <p className="text-sm">Review Approval</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
