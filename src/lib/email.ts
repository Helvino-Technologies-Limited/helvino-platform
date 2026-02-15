import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
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
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_SERVER_USER,
      subject: `New ${data.type} from ${data.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Type:</strong> ${data.type}</p>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
        ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
        ${data.service ? `<p><strong>Service Interest:</strong> ${data.service}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `,
    }

    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error('Email sending failed:', error)
    return { success: false, error }
  }
}
