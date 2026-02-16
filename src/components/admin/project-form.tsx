"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Plus, X } from "lucide-react"

interface ProjectFormProps {
  project?: any
  services: any[]
  isEdit?: boolean
}

export function ProjectForm({ project, services, isEdit = false }: ProjectFormProps) {
  const [loading, setLoading] = useState(false)
  const [technologies, setTechnologies] = useState<string[]>(project?.technologies || [])
  const [images, setImages] = useState<string[]>(project?.images || [])
  const [newTech, setNewTech] = useState("")
  const [newImage, setNewImage] = useState("")
  const [featured, setFeatured] = useState(project?.featured || false)
  const [selectedService, setSelectedService] = useState(project?.serviceId || "none")
  const router = useRouter()
  const { toast } = useToast()

  function addTechnology() {
    if (newTech.trim()) {
      setTechnologies([...technologies, newTech.trim()])
      setNewTech("")
    }
  }

  function removeTechnology(index: number) {
    setTechnologies(technologies.filter((_, i) => i !== index))
  }

  function addImage() {
    if (newImage.trim()) {
      setImages([...images, newImage.trim()])
      setNewImage("")
    }
  }

  function removeImage(index: number) {
    setImages(images.filter((_, i) => i !== index))
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get('title'),
      description: formData.get('description'),
      client: formData.get('client'),
      industry: formData.get('industry'),
      problem: formData.get('problem'),
      solution: formData.get('solution'),
      technologies,
      images,
      featured,
      status: formData.get('status'),
      serviceId: selectedService === "none" ? null : selectedService
    }

    try {
      const url = isEdit ? `/api/projects/${project.id}` : '/api/projects'
      const method = isEdit ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) throw new Error('Failed to save project')

      toast({
        title: isEdit ? "Project Updated" : "Project Created",
        description: `The project has been successfully ${isEdit ? 'updated' : 'created'}.`,
      })

      router.push('/admin/projects')
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${isEdit ? 'update' : 'create'} project. Please try again.`,
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
          <Label htmlFor="title">Project Title *</Label>
          <Input
            id="title"
            name="title"
            required
            defaultValue={project?.title}
            placeholder="e.g., E-Commerce Platform"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="client">Client Name</Label>
          <Input
            id="client"
            name="client"
            defaultValue={project?.client}
            placeholder="Client or Company Name"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Project Description *</Label>
        <Textarea
          id="description"
          name="description"
          required
          rows={4}
          defaultValue={project?.description}
          placeholder="Brief overview of the project..."
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="industry">Industry</Label>
          <Input
            id="industry"
            name="industry"
            defaultValue={project?.industry}
            placeholder="e.g., E-Commerce, Healthcare"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="serviceId">Related Service</Label>
          <Select value={selectedService} onValueChange={setSelectedService}>
            <SelectTrigger>
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No Service</SelectItem>
              {services.map((service) => (
                <SelectItem key={service.id} value={service.id}>
                  {service.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="problem">The Challenge</Label>
        <Textarea
          id="problem"
          name="problem"
          rows={3}
          defaultValue={project?.problem}
          placeholder="What problem did this project solve?"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="solution">Our Solution</Label>
        <Textarea
          id="solution"
          name="solution"
          rows={3}
          defaultValue={project?.solution}
          placeholder="How did you solve it?"
        />
      </div>

      <div className="space-y-2">
        <Label>Technologies Used</Label>
        <div className="flex gap-2">
          <Input
            value={newTech}
            onChange={(e) => setNewTech(e.target.value)}
            placeholder="Add a technology"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
          />
          <Button type="button" onClick={addTechnology} variant="outline">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {technologies.map((tech, index) => (
              <div key={index} className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full">
                <span className="text-sm">{tech}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0"
                  onClick={() => removeTechnology(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label>Project Images (URLs)</Label>
        <div className="flex gap-2">
          <Input
            value={newImage}
            onChange={(e) => setNewImage(e.target.value)}
            placeholder="https://example.com/image.jpg"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addImage())}
          />
          <Button type="button" onClick={addImage} variant="outline">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {images.length > 0 && (
          <div className="space-y-2 mt-2">
            {images.map((image, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                <div className="h-16 w-16 bg-gray-200 rounded flex-shrink-0" />
                <span className="flex-1 text-sm truncate">{image}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeImage(index)}
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
          <Select name="status" defaultValue={project?.status || 'COMPLETED'}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="COMPLETED">Completed</SelectItem>
              <SelectItem value="ONGOING">Ongoing</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2 pt-8">
          <Checkbox
            id="featured"
            checked={featured}
            onCheckedChange={(checked) => setFeatured(checked as boolean)}
          />
          <Label htmlFor="featured" className="cursor-pointer">
            Feature this project on homepage
          </Label>
        </div>
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
            isEdit ? 'Update Project' : 'Create Project'
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/projects')}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
