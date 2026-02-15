export type Service = {
  id: string
  title: string
  slug: string
  description: string
  icon?: string | null
  image?: string | null
  features?: any
  seoTitle?: string | null
  seoDescription?: string | null
  status: 'DRAFT' | 'ACTIVE' | 'INACTIVE'
  order: number
  createdAt: Date
  updatedAt: Date
}

export type Project = {
  id: string
  title: string
  slug: string
  description: string
  client?: string | null
  industry?: string | null
  problem?: string | null
  solution?: string | null
  technologies?: any
  images?: any
  featured: boolean
  status: 'ONGOING' | 'COMPLETED'
  serviceId?: string | null
  createdAt: Date
  updatedAt: Date
}

export type Review = {
  id: string
  clientName: string
  company?: string | null
  email?: string | null
  rating: number
  review: string
  featured: boolean
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  serviceId?: string | null
  createdAt: Date
  updatedAt: Date
}

export type BlogPost = {
  id: string
  title: string
  slug: string
  excerpt?: string | null
  content: string
  coverImage?: string | null
  category?: string | null
  tags?: any
  seoTitle?: string | null
  seoDescription?: string | null
  status: 'DRAFT' | 'ACTIVE' | 'INACTIVE'
  views: number
  authorId: string
  publishedAt?: Date | null
  createdAt: Date
  updatedAt: Date
}

export type ContactLead = {
  id: string
  name: string
  email: string
  phone?: string | null
  company?: string | null
  service?: string | null
  message: string
  type: 'CONTACT' | 'QUOTATION' | 'PARTNERSHIP'
  status: 'NEW' | 'CONTACTED' | 'IN_PROGRESS' | 'CLOSED' | 'LOST'
  notes?: string | null
  createdAt: Date
  updatedAt: Date
}
