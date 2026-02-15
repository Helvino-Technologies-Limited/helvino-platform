import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, Eye, Award, Users, TrendingUp, Shield } from "lucide-react"

export const metadata = {
  title: "About Us",
  description: "Learn about Helvino Technologies Limited - your trusted IT solutions partner in Kenya",
}

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for excellence in every project, delivering quality that exceeds expectations."
    },
    {
      icon: Shield,
      title: "Integrity",
      description: "We operate with transparency, honesty, and ethical practices in all our engagements."
    },
    {
      icon: Users,
      title: "Client-Focused",
      description: "Your success is our success. We prioritize your needs and build lasting partnerships."
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "We embrace cutting-edge technologies to deliver forward-thinking solutions."
    },
  ]

  const milestones = [
    { year: "2019", event: "Company Founded", description: "Helvino Technologies established in Kisumu" },
    { year: "2020", event: "50+ Projects", description: "Delivered solutions across multiple industries" },
    { year: "2022", event: "100+ Clients", description: "Built a strong client base across East Africa" },
    { year: "2024", event: "200+ Projects", description: "Expanded services and technical capabilities" },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-helvino-navy via-helvino-blue to-helvino-navy text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-helvino-orange border-none">About Us</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Building Reliable Digital Foundations
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              Helvino Technologies Limited is a leading IT solutions provider specializing in 
              software development, cybersecurity, network infrastructure, and surveillance systems. 
              We empower businesses with technology that drives growth and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="border-2 border-helvino-blue/20 hover:border-helvino-blue transition-colors">
              <CardHeader>
                <div className="h-14 w-14 rounded-lg bg-gradient-to-br from-helvino-blue to-helvino-orange flex items-center justify-center mb-4">
                  <Target className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600 text-lg leading-relaxed">
                To deliver innovative, reliable, and scalable IT solutions that empower businesses 
                to thrive in the digital age. We are committed to excellence, integrity, and 
                building long-term partnerships with our clients.
              </CardContent>
            </Card>

            <Card className="border-2 border-helvino-orange/20 hover:border-helvino-orange transition-colors">
              <CardHeader>
                <div className="h-14 w-14 rounded-lg bg-gradient-to-br from-helvino-orange to-helvino-blue flex items-center justify-center mb-4">
                  <Eye className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600 text-lg leading-relaxed">
                To be the most trusted IT solutions partner in East Africa, recognized for our 
                technical excellence, innovative approach, and unwavering commitment to client 
                success and digital transformation.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4">Our Values</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-helvino-navy mb-4">
              What Drives Us
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our core values guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-helvino-blue to-helvino-orange flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story / Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4">Our Journey</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-helvino-navy mb-4">
              Growth & Milestones
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our commitment to excellence has driven consistent growth
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-8 items-start">
                  <div className="flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-helvino-blue to-helvino-orange flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    {index < milestones.length - 1 && (
                      <div className="w-0.5 h-24 bg-gradient-to-b from-helvino-blue to-helvino-orange" />
                    )}
                  </div>
                  <Card className="flex-1 hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{milestone.year}</Badge>
                      </div>
                      <CardTitle className="text-xl">{milestone.event}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{milestone.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-helvino-navy via-helvino-blue to-helvino-navy text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Why Businesses Choose Helvino
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div>
                <div className="text-4xl font-bold text-helvino-orange mb-2">200+</div>
                <p className="text-gray-200">Happy Clients</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-helvino-orange mb-2">350+</div>
                <p className="text-gray-200">Projects Completed</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-helvino-orange mb-2">98%</div>
                <p className="text-gray-200">Client Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
