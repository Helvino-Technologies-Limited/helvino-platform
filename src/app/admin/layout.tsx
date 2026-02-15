import { redirect } from "next/navigation"
import { AdminNav } from "@/components/admin/admin-nav"
import { cookies } from "next/headers"

export const metadata = {
  title: "Admin Dashboard | Helvino Technologies",
  description: "Admin dashboard for Helvino Technologies",
}

async function getSession() {
  const cookieStore = cookies()
  const session = cookieStore.get('session')
  return session?.value
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  if (!session) {
    redirect('/auth/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}
