import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Toaster } from "@/components/ui/toaster"
import { WhatsAppFloat } from "@/components/layout/whatsapp-float"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Helvino Technologies Limited | IT Solutions & Services",
    template: "%s | Helvino Technologies"
  },
  description: "Leading IT solutions provider in Kenya specializing in software development, cybersecurity, networking, and surveillance systems. Building reliable digital foundations for businesses worldwide.",
  keywords: ["IT solutions", "software development", "cybersecurity", "networking", "CCTV", "Kenya", "Siaya", "Helvino Technologies"],
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <Toaster />
      </body>
    </html>
  )
}
