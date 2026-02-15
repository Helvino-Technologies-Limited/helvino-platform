import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Calendar, Building2, Tag } from "lucide-react"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  const projects = await prisma.project.findMany({
    select: { slug: true }
  })

  return projects.map((project) => ({
    slug: project.slug,
  }))
}

async function getProject(slug: string) {
  return await prisma.project.findUnique({
    where: { slug },
    include: { service: true }
  })
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug)

  if (!project) {
    notFound()
  }

  const technologies = project.technologies as any

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-helvino-navy via-helvino-blue to-helvino-navy text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/projects">
            <Button variant="ghost" className="text-white hover:bg-white/10 mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
            </Button>
          </Link>
          
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              {project.featured && (
                <Badge className="bg-helvino-orange border-none">Featured</Badge>
              )}
              {project.industry && (
                <Badge variant="outline" className="border-white text-white">
                  {project.industry}
                </Badge>
              )}
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              {project.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Images Gallery */}
              {project.images && (project.images as any).length > 0 && (
                <div className="space-y-4">
                  <img
                    src={(project.images as any)[0]}
                    alt={project.title}
                    className="w-full rounded-lg shadow-lg"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80"
                    }}
                  />
                  {(project.images as any).length > 1 && (
                    <div className="grid grid-cols-3 gap-4">
                      {(project.images as any).slice(1, 4).map((img: string, idx: number) => (
                        <img
                          key={idx}
                          src={img}
                          alt={`${project.title} - ${idx + 2}`}
                          className="w-full aspect-video object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold text-helvino-navy mb-4">Overview</h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {project.description}
                </p>
              </div>

              {/* Problem */}
              {project.problem && (
                <Card className="border-l-4 border-l-helvino-orange">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold text-helvino-navy mb-3">The Challenge</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {project.problem}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Solution */}
              {project.solution && (
                <Card className="border-l-4 border-l-helvino-blue">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold text-helvino-navy mb-3">Our Solution</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {project.solution}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Technologies */}
              {technologies && technologies.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-helvino-navy mb-4">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech: string, idx: number) => (
                      <Badge key={idx} variant="outline" className="px-3 py-1">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <h3 className="font-bold text-helvino-navy mb-4">Project Info</h3>
                  
                  {project.client && (
                    <div className="flex items-start gap-3">
                      <Building2 className="h-5 w-5 text-helvino-blue mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Client</p>
                        <p className="font-medium">{project.client}</p>
                      </div>
                    </div>
                  )}

                  {project.service && (
                    <div className="flex items-start gap-3">
                      <Tag className="h-5 w-5 text-helvino-blue mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Service</p>
                        <p className="font-medium">{project.service.title}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-helvino-blue mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Completed</p>
                      <p className="font-medium">
                        {new Date(project.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long'
                        })}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-helvino-navy to-helvino-blue text-white">
                <CardContent className="pt-6 text-center">
                  <h3 className="text-xl font-bold mb-3">Have a Similar Project?</h3>
                  <p className="text-gray-200 mb-6">
                    Let's discuss how we can help you achieve your goals.
                  </p>
                  <Link href="/contact">
                    <Button className="bg-helvino-orange hover:bg-helvino-orange/90 w-full">
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
