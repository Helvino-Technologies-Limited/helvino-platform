import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PasswordChangeForm } from "@/components/admin/password-change-form"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-helvino-navy">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account settings</p>
      </div>

      <div className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <p className="text-sm text-gray-600">
              Update your password to keep your account secure
            </p>
          </CardHeader>
          <CardContent>
            <PasswordChangeForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
