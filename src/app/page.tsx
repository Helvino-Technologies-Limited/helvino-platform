import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Code,
  Wifi,
  Camera,
  Shield,
  HeadphonesIcon,
  ArrowRight,
  CheckCircle2,
  Star,
  Users,
  Award,
  TrendingUp
} from "lucide-react"
import { prisma } from "@/lib/prisma"

export const revalidate = 0

async function getHomeData() {
  const [services, projects, reviews] = await Promise.all([
    prisma.service.findMany({
      where: { status: 'ACTIVE' },
      take: 5,
      orderBy: { order: 'asc' }
    }),
    prisma.project.findMany({
      where: { featured: true },
      take: 3,
      orderBy: { createdAt: 'desc' }
    }),
    prisma.review.findMany({
      where: { status: 'APPROVED', featured: true },
      take: 6,
      orderBy: { createdAt: 'desc' }
    })
  ])

  return { services, projects, reviews }
}

export default async function HomePage() {
  const { services, projects, reviews } = await getHomeData()

  const stats = [
    { icon: Users, label: "Happy Clients", value: "200+" },
    { icon: Award, label: "Projects Completed", value: "350+" },
    { icon: Star, label: "Client Satisfaction", value: "98%" },
    { icon: TrendingUp, label: "Years Experience", value: "5+" },
  ]

  return (
    <div className="flex flex-col">
      <section className="relative hero-pattern pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-helvino-navy/95 via-helvino-blue/90 to-helvino-navy/95" />

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-8 animate-fade-in">
              <Badge className="bg-helvino-orange text-white border-none">
                🚀 Trusted IT Solutions Partner
              </Badge>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Building Reliable
                <span className="block mt-2 bg-gradient-to-r from-white via-orange-200 to-helvino-orange bg-clip-text text-transparent">
                  Digital Foundations
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-200 leading-relaxed">
                Transform your business with cutting-edge IT solutions.
                From software development to cybersecurity, we deliver
                excellence that drives growth.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button size="lg" className="bg-helvino-orange hover:bg-helvino-orange/90 text-white w-full">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/services" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full">
                    Our Services
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-8 pt-4">
                {stats.slice(0, 2).map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-helvino-orange">{stat.value}</div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block relative">
              <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/hero-bg.jpg" 
                  alt="Helvino Technologies - IT Solutions" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-helvino-blue/30 to-helvino-orange/30" />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-20 right-10 w-72 h-72 bg-helvino-orange/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-helvino-blue/10 rounded-full blur-3xl animate-pulse delay-700" />
      </section>

      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform">
                <stat.icon className="h-10 w-10 mx-auto text-helvino-blue group-hover:text-helvino-orange transition-colors mb-3" />
                <div className="text-3xl font-bold text-helvino-navy">{stat.value}</div>
                <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4">Our Services</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-helvino-navy mb-4">
              Comprehensive IT Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              End-to-end technology services designed to elevate your business
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const icons = [Code, Wifi, Camera, Shield, HeadphonesIcon]
              const Icon = icons[index % icons.length]

              return (
                <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-helvino-blue">
                  <CardHeader>
                    <div className="h-14 w-14 rounded-lg bg-gradient-to-br from-helvino-blue to-helvino-orange flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-helvino-blue transition-colors">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {service.description.substring(0, 150)}...
                    </CardDescription>
                    <Link href={`/services#${service.slug}`}>
                      <Button variant="link" className="mt-4 p-0 text-helvino-blue">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="text-center mt-12">
            <Link href="/services">
              <Button size="lg" className="bg-helvino-blue hover:bg-helvino-blue/90">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4">Why Choose Helvino</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-helvino-navy mb-6">
                Your Trusted Technology Partner
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We combine technical expertise with business acumen to deliver
                solutions that drive real results for your organization.
              </p>

              <div className="space-y-4">
                {[
                  "Expert team with 5+ years of industry experience",
                  "Proven track record with 350+ successful projects",
                  "24/7 technical support and maintenance",
                  "Cutting-edge technology solutions",
                  "Cost-effective and scalable services",
                  "100% customer satisfaction guarantee"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-helvino-orange flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/hero-bg.jpg" 
                  alt="Why Choose Helvino" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-helvino-orange/20 rounded-2xl -z-10" />
              <div className="absolute -top-6 -left-6 w-48 h-48 bg-helvino-blue/20 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {projects.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge className="mb-4">Our Work</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-helvino-navy mb-4">
                Featured Projects
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Delivering excellence across diverse industries
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Card key={project.id} className="group hover:shadow-xl transition-all overflow-hidden">
                  <CardHeader>
                    <CardTitle className="group-hover:text-helvino-blue transition-colors">
                      {project.title}
                    </CardTitle>
                    {project.industry && (
                      <Badge variant="outline">{project.industry}</Badge>
                    )}
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="line-clamp-3">
                      {project.description}
                    </CardDescription>
                    <Link href={`/projects/${project.slug}`}>
                      <Button variant="link" className="mt-4 p-0 text-helvino-blue">
                        View Project <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/projects">
                <Button size="lg" variant="outline">
                  View All Projects
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {reviews.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge className="mb-4">Testimonials</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-helvino-navy mb-4">
                What Our Clients Say
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Don't just take our word for it
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.map((review) => (
                <Card key={review.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? "fill-helvino-orange text-helvino-orange"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <CardTitle className="text-lg">{review.clientName}</CardTitle>
                    {review.company && (
                      <CardDescription>{review.company}</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 italic">"{review.review}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/reviews">
                <Button size="lg" variant="outline">
                  Read More Reviews
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="py-20 bg-gradient-to-br from-helvino-navy via-helvino-blue to-helvino-navy text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Let's discuss how our IT solutions can help you achieve your goals.
            Get a free consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-helvino-orange hover:bg-helvino-orange/90 text-white">
                Get Free Consultation
              </Button>
            </Link>
            <Link href="tel:0703445756">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Call Us: 0703 445 756
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
