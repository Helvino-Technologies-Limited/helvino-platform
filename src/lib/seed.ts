import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('Admin123!', 10)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@helvinotech.com' },
    update: {},
    create: {
      email: 'admin@helvinotech.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'ADMIN'
    }
  })

  console.log('✅ Admin user created:', admin.email)

  // Create sample services
  const services = [
    {
      title: 'Software Development',
      slug: 'software-development',
      description: 'Custom software solutions tailored to your business needs. From web applications to mobile apps, we build scalable, secure, and user-friendly software.',
      icon: '💻',
      features: [
        'Custom web application development',
        'Mobile app development (iOS & Android)',
        'API development and integration',
        'Cloud-based solutions',
        'Legacy system modernization'
      ],
      status: 'ACTIVE' as const,
      order: 1
    },
    {
      title: 'Network & Wi-Fi Installation',
      slug: 'network-wifi-installation',
      description: 'Professional network infrastructure setup and Wi-Fi deployment for businesses of all sizes. Reliable, secure, and high-performance networking solutions.',
      icon: '📡',
      features: [
        'LAN/WAN network setup',
        'Enterprise Wi-Fi deployment',
        'Network security configuration',
        'Cable management and installation',
        'Network monitoring and maintenance'
      ],
      status: 'ACTIVE' as const,
      order: 2
    },
    {
      title: 'CCTV & Surveillance Systems',
      slug: 'cctv-surveillance',
      description: 'Advanced CCTV and surveillance solutions to protect your premises. High-definition cameras, remote monitoring, and 24/7 recording capabilities.',
      icon: '📹',
      features: [
        'HD CCTV camera installation',
        'Remote monitoring systems',
        '24/7 recording and storage',
        'Motion detection alerts',
        'Access control integration'
      ],
      status: 'ACTIVE' as const,
      order: 3
    },
    {
      title: 'Cybersecurity Solutions',
      slug: 'cybersecurity',
      description: 'Comprehensive cybersecurity services to protect your business from threats. Vulnerability assessments, penetration testing, and security audits.',
      icon: '🔒',
      features: [
        'Security audits and assessments',
        'Penetration testing',
        'Firewall configuration',
        'Malware protection',
        'Employee security training'
      ],
      status: 'ACTIVE' as const,
      order: 4
    },
    {
      title: 'IT Support & Consultancy',
      slug: 'it-support-consultancy',
      description: 'Expert IT support and strategic consultancy to keep your business running smoothly. Proactive maintenance, troubleshooting, and technology planning.',
      icon: '🛠️',
      features: [
        '24/7 technical support',
        'System maintenance',
        'IT strategy consultation',
        'Hardware and software support',
        'Cloud migration assistance'
      ],
      status: 'ACTIVE' as const,
      order: 5
    }
  ]

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: service
    })
  }

  console.log('✅ Sample services created')

  // Create sample project
  await prisma.project.upsert({
    where: { slug: 'enterprise-erp-system' },
    update: {},
    create: {
      title: 'Enterprise ERP System',
      slug: 'enterprise-erp-system',
      description: 'A comprehensive Enterprise Resource Planning system built for a leading manufacturing company in Kenya.',
      client: 'ABC Manufacturing Ltd',
      industry: 'Manufacturing',
      problem: 'The client was using multiple disconnected systems for inventory, sales, and accounting, leading to data inconsistencies and operational inefficiencies.',
      solution: 'We developed a unified ERP system that integrated all business processes, providing real-time data synchronization and automated workflows.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
      images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80'],
      featured: true,
      status: 'COMPLETED'
    }
  })

  console.log('✅ Sample project created')

  // Create sample review
  await prisma.review.create({
    data: {
      clientName: 'John Doe',
      company: 'Tech Innovations Ltd',
      email: 'john@techinnovations.com',
      rating: 5,
      review: 'Helvino Technologies delivered exceptional service! Their team was professional, knowledgeable, and completed our network installation ahead of schedule. Highly recommended!',
      status: 'APPROVED',
      featured: true
    }
  })

  console.log('✅ Sample review created')

  console.log('🎉 Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
