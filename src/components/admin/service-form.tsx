"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Plus, X } from "lucide-react"

interface ServiceFormProps {
  service?: any
  isEdit?: boolean
}

export function ServiceForm({ service, isEdit = false }: ServiceFormProps) {
  const [loading, setLoading] = useState(false)
  const [features, setFeatures] = useState<string[]>(service?.features || [])
  const [newFeature, setNewFeature] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  function addFeature() {
    if (newFeature.trim()) {
      setFeatures([...features, newFeature.trim()])
      setNewFeature("")
    }
  }

  function removeFeature(index: number) {
    setFeatures(features.filter((_, i) => i !== index))
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get('title'),
      description: formData.get('description'),
      icon: formData.get('icon'),
      image: formData.get('image'),
      features,
      seoTitle: formData.get('seoTitle'),
      seoDescription: formData.get('seoDescription'),
      status: formData.get('status'),
      order: parseInt(formData.get('order') as string) || 0
    }

    try {
      const url = isEdit ? `/api/services/${service.id}` : '/api/services'
      const method = isEdit ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) throw new Error('Failed to save service')

      toast({
        title: isEdit ? "Service Updated" : "Service Created",
        description: `The service has been successfully ${isEdit ? 'updated' : 'created'}.`,
      })

      router.push('/admin/services')
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${isEdit ? 'update' : 'create'} service. Please try again.`,
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Service Title *</Label>
          <Input
            id="title"
            name="title"
            required
            defaultValue={service?.title}
            placeholder="e.g., Software Development"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="icon">Icon (Emoji or Unicode)</Label>
          <Input
            id="icon"
            name="icon"
            defaultValue={service?.icon}
            placeholder="e.g., 💻"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          name="description"
          required
          rows={4}
          defaultValue={service?.description}
          placeholder="Detailed description of the service..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Image URL (Optional)</Label>
        <Input
          id="image"
          name="image"
          type="url"
          defaultValue={service?.image}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="space-y-2">
        <Label>Key Features</Label>
        <div className="flex gap-2">
          <Input
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            placeholder="Add a feature"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
          />
          <Button type="button" onClick={addFeature} variant="outline">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {features.length > 0 && (
          <div className="space-y-2 mt-2">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                <span className="flex-1 text-sm">{feature}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFeature(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select name="status" defaultValue={service?.status || 'ACTIVE'}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="DRAFT">Draft</SelectItem>
              <SelectItem value="INACTIVE">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="order">Display Order</Label>
          <Input
            id="order"
            name="order"
            type="number"
            defaultValue={service?.order || 0}
            placeholder="0"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="seoTitle">SEO Title (Optional)</Label>
        <Input
          id="seoTitle"
          name="seoTitle"
          defaultValue={service?.seoTitle}
          placeholder="SEO optimized title"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="seoDescription">SEO Description (Optional)</Label>
        <Textarea
          id="seoDescription"
          name="seoDescription"
          rows={3}
          defaultValue={service?.seoDescription}
          placeholder="SEO meta description"
        />
      </div>

      <div className="flex gap-4">
        <Button
          type="submit"
          disabled={loading}
          className="bg-helvino-blue hover:bg-helvino-blue/90"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isEdit ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            isEdit ? 'Update Service' : 'Create Service'
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/services')}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
