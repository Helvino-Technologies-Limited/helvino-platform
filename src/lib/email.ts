import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransporter({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
})

export async function sendContactNotification(data: {
  name: string
  email: string
  phone?: string
  company?: string
  service?: string
  message: string
  type: string
}) {
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #0056A4;">New ${data.type === 'QUOTATION' ? 'Quotation Request' : 'Contact'} from Website</h2>
      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
        ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
        ${data.service ? `<p><strong>Service Interest:</strong> ${data.service}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${data.message}</p>
      </div>
      <p style="color: #666; margin-top: 20px; font-size: 12px;">
        Sent from Helvino Technologies Website
      </p>
    </div>
  `

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: 'helvinotechltd@gmail.com',
    subject: `${data.type === 'QUOTATION' ? 'New Quotation Request' : 'New Contact Message'} - ${data.name}`,
    html: emailHtml,
  })
}
