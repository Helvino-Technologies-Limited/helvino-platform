import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Linkedin, Clock } from "lucide-react"
import { ContactForm } from "@/components/public/contact-form"

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with Helvino Technologies Limited for IT solutions and consultations",
}

export default function ContactPage() {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "helvinotechltd@gmail.com",
      href: "mailto:helvinotechltd@gmail.com"
    },
    {
      icon: Phone,
      title: "Phone",
      content: "0703 445 756",
      href: "tel:0703445756"
    },
    {
      icon: MapPin,
      title: "Location",
      content: "Kisumu, Kenya",
      href: null
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      content: "Helvino Technologies Limited",
      href: "https://linkedin.com/company/helvino-technologies-limited"
    }
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-helvino-navy via-helvino-blue to-helvino-navy text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-helvino-orange border-none">Get In Touch</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Let's Start a Conversation
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              Ready to transform your business with innovative IT solutions? 
              We'd love to hear from you. Get in touch and let's discuss your project.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                  <p className="text-gray-600">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-helvino-blue to-helvino-orange flex items-center justify-center flex-shrink-0">
                        <info.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-helvino-navy">{info.title}</p>
                        {info.href ? (
                          
                            href={info.href}
                            target={info.href.startsWith('http') ? '_blank' : undefined}
                            rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="text-gray-600 hover:text-helvino-blue transition-colors"
                          >
                            {info.content}
                          </a>
                        ) : (
                          <p className="text-gray-600">{info.content}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-helvino-navy to-helvino-blue text-white">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3 mb-4">
                    <Clock className="h-5 w-5 mt-1" />
                    <div>
                      <p className="font-semibold mb-2">Business Hours</p>
                      <p className="text-sm text-gray-200">Monday - Friday: 8:00 AM - 6:00 PM</p>
                      <p className="text-sm text-gray-200">Saturday: 9:00 AM - 2:00 PM</p>
                      <p className="text-sm text-gray-200">Sunday: Closed</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 mt-4">
                    24/7 support available for enterprise clients
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Optional - placeholder) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-helvino-navy mb-4">Visit Our Office</h2>
            <p className="text-gray-600">Located in Kisumu, Kenya</p>
          </div>
          <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
            {/* Add Google Maps embed here if needed */}
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-gray-500">Map Loading...</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
