import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LoginForm } from "@/components/admin/login-form"

export const metadata = {
  title: "Admin Login",
  description: "Login to Helvino Technologies admin dashboard",
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-helvino-navy via-helvino-blue to-helvino-navy p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <img
            src="/images/logo.png"
            alt="Helvino Technologies"
            className="h-16 mx-auto mb-4"
          />
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>
            Sign in to access the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  )
}
