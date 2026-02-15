import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { prisma } from "@/lib/prisma"

export const metadata = {
  title: "Our Services",
  description: "Comprehensive IT solutions including software development, cybersecurity, network infrastructure, CCTV systems, and IT consultancy",
}

async function getServices() {
  return await prisma.service.findMany({
    where: { status: 'ACTIVE' },
    orderBy: { order: 'asc' }
  })
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-helvino-navy via-helvino-blue to-helvino-navy text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-helvino-orange border-none">Our Services</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Comprehensive IT Solutions
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              From software development to cybersecurity, we provide end-to-end technology 
              services that transform businesses and drive digital success.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((service, index) => {
              const features = service.features as any
              
              return (
                <div
                  key={service.id}
                  id={service.slug}
                  className="scroll-mt-24"
                >
                  <Card className="overflow-hidden border-2 hover:border-helvino-blue transition-all">
                    <div className={`grid lg:grid-cols-2 gap-0 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                      <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                        {service.image ? (
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover min-h-[300px]"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-helvino-blue to-helvino-orange min-h-[300px] flex items-center justify-center">
                            <span className="text-6xl text-white opacity-20">{service.icon || '💻'}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className={`p-8 lg:p-12 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                        <Badge className="mb-4">Service {index + 1}</Badge>
                        <h2 className="text-3xl font-bold text-helvino-navy mb-4">
                          {service.title}
                        </h2>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                          {service.description}
                        </p>

                        {features && features.length > 0 && (
                          <div className="space-y-3 mb-8">
                            <h3 className="font-semibold text-helvino-navy">Key Features:</h3>
                            {features.map((feature: string, idx: number) => (
                              <div key={idx} className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-helvino-orange flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700">{feature}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        <Link href="/contact">
                          <Button className="bg-helvino-blue hover:bg-helvino-blue/90">
                            Get Started <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-br from-helvino-navy via-helvino-blue to-helvino-navy text-white p-12 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Let's discuss how our services can help transform your business.
              Contact us for a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-helvino-orange hover:bg-helvino-orange/90">
                  Request a Quote
                </Button>
              </Link>
              <Link href="tel:0703445756">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Call: 0703 445 756
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
