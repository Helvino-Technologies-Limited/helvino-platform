import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { prisma } from "@/lib/prisma"

export const metadata = {
  title: "Our Projects",
  description: "Explore our portfolio of successful IT projects across various industries",
}

async function getProjects() {
  return await prisma.project.findMany({
    where: { status: 'COMPLETED' },
    include: { service: true },
    orderBy: { createdAt: 'desc' }
  })
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-helvino-navy via-helvino-blue to-helvino-navy text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-helvino-orange border-none">Our Portfolio</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Projects That Drive Success
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              Explore our portfolio of successful projects across diverse industries. 
              Each solution is tailored to meet specific business challenges and deliver 
              measurable results.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {projects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">No projects available at the moment.</p>
              <p className="text-gray-500 mt-2">Check back soon for updates!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Card key={project.id} className="group hover:shadow-xl transition-all overflow-hidden">
                  {project.images && (project.images as any)[0] && (
                    <div className="aspect-video overflow-hidden bg-gray-200">
                      <img
                        src={(project.images as any)[0]}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
                        }}
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      {project.featured && (
                        <Badge className="bg-helvino-orange border-none">Featured</Badge>
                      )}
                      {project.industry && (
                        <Badge variant="outline">{project.industry}</Badge>
                      )}
                    </div>
                    <CardTitle className="group-hover:text-helvino-blue transition-colors">
                      {project.title}
                    </CardTitle>
                    {project.client && (
                      <CardDescription>Client: {project.client}</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 line-clamp-3 mb-4">
                      {project.description}
                    </p>
                    {project.service && (
                      <Badge variant="outline" className="mb-4">
                        {project.service.title}
                      </Badge>
                    )}
                    <Link href={`/projects/${project.slug}`}>
                      <Button variant="link" className="p-0 text-helvino-blue">
                        View Details <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-helvino-navy mb-6">
            Start Your Project Today
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Ready to bring your vision to life? Let's discuss your project requirements.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-helvino-blue hover:bg-helvino-blue/90">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
