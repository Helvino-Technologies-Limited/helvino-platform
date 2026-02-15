import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Helvino Technologies Limited | Building Reliable Digital Foundations",
    template: "%s | Helvino Technologies Limited"
  },
  description: "Leading IT solutions provider in Kenya specializing in software development, cybersecurity, network infrastructure, CCTV surveillance, and IT consultancy services.",
  keywords: ["IT solutions", "software development", "cybersecurity", "network installation", "CCTV systems", "Kenya", "Kisumu", "IT consultancy"],
  authors: [{ name: "Helvino Technologies Limited" }],
  creator: "Helvino Technologies Limited",
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://helvinotech.com",
    title: "Helvino Technologies Limited",
    description: "Building Reliable Digital Foundations",
    siteName: "Helvino Technologies Limited",
  },
  twitter: {
    card: "summary_large_image",
    title: "Helvino Technologies Limited",
    description: "Building Reliable Digital Foundations",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
