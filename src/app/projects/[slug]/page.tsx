import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { prisma } from "@/lib/prisma"

async function getProject(slug: string) {
  try {
    return await prisma.project.findUnique({
      where: { slug },
      include: { service: true }
    })
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
  }
}

export async function generateStaticParams() {
  try {
    const projects = await prisma.project.findMany({
      select: { slug: true }
    })
    
    return projects.map((project) => ({
      slug: project.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug)
  
  if (!project) {
    return {
      title: "Project Not Found"
    }
  }

  return {
    title: project.title,
    description: project.description
  }
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="flex flex-col">
      <section className="pt-32 pb-12 bg-gradient-to-br from-helvino-navy via-helvino-blue to-helvino-navy text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/projects">
            <Button variant="ghost" className="text-white hover:bg-white/10 mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </Link>
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {project.featured && (
                <Badge className="bg-helvino-orange border-none">Featured Project</Badge>
              )}
              {project.industry && (
                <Badge variant="outline" className="border-white text-white">
                  {project.industry}
                </Badge>
              )}
              <Badge variant="outline" className="border-white text-white">
                {project.status}
              </Badge>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">{project.title}</h1>
            {project.client && (
              <p className="text-xl text-gray-200">Client: {project.client}</p>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-3xl font-bold text-helvino-navy mb-4">Project Overview</h2>
                <p className="text-lg text-gray-700 leading-relaxed">{project.description}</p>
              </div>

              {project.images && (project.images as string[]).length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold text-helvino-navy mb-6">Project Gallery</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {(project.images as string[]).map((image, index) => (
                      <div key={index} className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                        <div className="w-full h-full bg-gradient-to-br from-helvino-blue/20 to-helvino-orange/20" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.problem && (
                <div>
                  <h2 className="text-3xl font-bold text-helvino-navy mb-4">The Challenge</h2>
                  <p className="text-lg text-gray-700 leading-relaxed">{project.problem}</p>
                </div>
              )}

              {project.solution && (
                <div>
                  <h2 className="text-3xl font-bold text-helvino-navy mb-4">Our Solution</h2>
                  <p className="text-lg text-gray-700 leading-relaxed">{project.solution}</p>
                </div>
              )}

              {project.technologies && (project.technologies as string[]).length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold text-helvino-navy mb-4">Technologies Used</h2>
                  <div className="flex flex-wrap gap-2">
                    {(project.technologies as string[]).map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-base px-4 py-2">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {project.client && (
                      <div>
                        <p className="text-sm font-semibold text-gray-600">Client</p>
                        <p className="text-base text-helvino-navy">{project.client}</p>
                      </div>
                    )}
                    {project.industry && (
                      <div>
                        <p className="text-sm font-semibold text-gray-600">Industry</p>
                        <p className="text-base text-helvino-navy">{project.industry}</p>
                      </div>
                    )}
                    {project.service && (
                      <div>
                        <p className="text-sm font-semibold text-gray-600">Service Category</p>
                        <Link href={`/services#${project.service.slug}`}>
                          <Badge variant="outline" className="mt-1 cursor-pointer hover:bg-helvino-blue hover:text-white">
                            {project.service.title}
                          </Badge>
                        </Link>
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-gray-600">Status</p>
                      <Badge className="mt-1" variant={project.status === 'COMPLETED' ? 'default' : 'outline'}>
                        {project.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-helvino-navy to-helvino-blue text-white">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-2">Interested in Similar Solutions?</h3>
                    <p className="text-sm text-gray-200 mb-4">
                      Let's discuss how we can help your business achieve similar results.
                    </p>
                    <Link href="/contact">
                      <Button className="w-full bg-helvino-orange hover:bg-helvino-orange/90 text-white">
                        Get In Touch
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-helvino-navy mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Let's build something amazing together. Contact us today to discuss your requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-helvino-blue hover:bg-helvino-blue/90">
                Start Your Project
              </Button>
            </Link>
            <Link href="/projects">
              <Button size="lg" variant="outline">
                View More Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
