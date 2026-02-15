import Link from "next/link"
import { Mail, Phone, Linkedin, MapPin, MessageCircle } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-br from-helvino-navy via-helvino-blue to-helvino-navy text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <img src="/images/logo.png" alt="Helvino Technologies" className="h-12 w-auto brightness-0 invert" />
            <p className="text-sm text-gray-300">Building Reliable Digital Foundations</p>
            <p className="text-sm text-gray-300">Leading IT solutions provider specializing in software development, cybersecurity, networking, and surveillance systems.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-gray-300 hover:text-helvino-orange transition-colors">About Us</Link></li>
              <li><Link href="/services" className="text-sm text-gray-300 hover:text-helvino-orange transition-colors">Services</Link></li>
              <li><Link href="/projects" className="text-sm text-gray-300 hover:text-helvino-orange transition-colors">Projects</Link></li>
              <li><Link href="/blog" className="text-sm text-gray-300 hover:text-helvino-orange transition-colors">Blog</Link></li>
              <li><Link href="/reviews" className="text-sm text-gray-300 hover:text-helvino-orange transition-colors">Reviews</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-300">Software Development</li>
              <li className="text-sm text-gray-300">Network & Wi-Fi Installation</li>
              <li className="text-sm text-gray-300">CCTV & Surveillance</li>
              <li className="text-sm text-gray-300">Cybersecurity Solutions</li>
              <li className="text-sm text-gray-300">IT Support & Consultancy</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-sm text-gray-300">
                <Mail className="h-4 w-4 text-helvino-orange" />
                <a href="mailto:helvinotechltd@gmail.com" className="hover:text-helvino-orange transition-colors">helvinotechltd@gmail.com</a>
              </li>
              <li className="flex items-center space-x-2 text-sm text-gray-300">
                <Phone className="h-4 w-4 text-helvino-orange" />
                <a href="tel:0703445756" className="hover:text-helvino-orange transition-colors">0703 445 756</a>
              </li>
              <li className="flex items-center space-x-2 text-sm text-gray-300">
                <MessageCircle className="h-4 w-4 text-helvino-orange" />
                <a href="https://wa.me/254703445756" target="_blank" rel="noopener noreferrer" className="hover:text-helvino-orange transition-colors">WhatsApp Chat</a>
              </li>
              <li className="flex items-center space-x-2 text-sm text-gray-300">
                <MapPin className="h-4 w-4 text-helvino-orange" />
                <span>Siaya, Kenya | Serving Clients Worldwide</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-gray-300">
                <Linkedin className="h-4 w-4 text-helvino-orange" />
                <a href="https://linkedin.com/company/helvino-technologies-limited" target="_blank" rel="noopener noreferrer" className="hover:text-helvino-orange transition-colors">LinkedIn</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-400">© {currentYear} Helvino Technologies Limited. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
