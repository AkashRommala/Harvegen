import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// Dynamic require to handle ESM nodemailer
let nodemailer = null
try {
  nodemailer = require('nodemailer')
} catch (e) {
  console.error('Failed to load nodemailer:', e.message)
}

// Create transporter - handle both CommonJS and ESM exports
const createTransporter = () => {
  if (!nodemailer) {
    throw new Error('Nodemailer not loaded')
  }
  // Handle both CommonJS (nodemailer.createTransport) and ESM (nodemailer.default?.createTransport)
  const createFn = nodemailer.createTransport || nodemailer.default?.createTransport
  if (!createFn) {
    throw new Error('createTransport not found in nodemailer')
  }
  return createFn({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER || 'your-email@gmail.com',
      pass: process.env.SMTP_PASS || 'your-app-password'
    }
  })
}

// Create transporter lazily to ensure env vars are loaded
let transporter = null
const getTransporter = () => {
  if (!transporter) {
    transporter = createTransporter()
  }
  return transporter
}

// CSV file path
const dataDir = path.join(process.cwd(), 'data')
const contactsFile = path.join(dataDir, 'contacts.csv')

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

// Initialize CSV file with headers if it doesn't exist
function initCSV() {
  if (!fs.existsSync(contactsFile)) {
    fs.writeFileSync(contactsFile, 'name,email,subject,message,timestamp\n')
  }
}

export async function POST(request) {
  try {
    const formData = await request.json()
    const { name, email, subject: formSubject, message } = formData
    
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 })
    }

    // Initialize CSV if needed
    initCSV()

    // Save contact data to CSV
    const line = `"${name}","${email}","${formSubject || ''}","${message.replace(/"/g, '""')}","${new Date().toISOString()}"` 
    fs.appendFileSync(contactsFile, line + '\n')

    // Send admin notification email
    const adminHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Contact Form Submission</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${formSubject || 'No subject'}</p>
          <p><strong>Message:</strong></p>
          <p style="background: white; padding: 15px; border-radius: 4px;">${message}</p>
        </div>
      </div>
    `

    const adminMailOptions = {
      from: process.env.SMTP_USER || 'your-email@gmail.com',
      to: process.env.ADMIN_EMAIL || 'admin@harvegen.com',
      subject: `New Contact: ${formSubject || 'No subject'}`,
      html: adminHtml
    }

    await getTransporter().sendMail(adminMailOptions)

    // Send confirmation email to user
    const userHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Thank you for contacting us!</h2>
        <p>Hi ${name},</p>
        <p>We've received your message and will get back to you soon.</p>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Subject:</strong> ${formSubject || 'No subject'}</p>
          <p><strong>Message:</strong></p>
          <p style="background: white; padding: 15px; border-radius: 4px;">${message}</p>
        </div>
        <p>Best regards,<br>The Harvegen Team</p>
      </div>
    `

    const userMailOptions = {
      from: process.env.SMTP_USER || 'your-email@gmail.com',
      to: email,
      subject: 'We received your message!',
      html: userHtml
    }

    await getTransporter().sendMail(userMailOptions)

    return NextResponse.json({ 
      success: true, 
      message: 'Message sent successfully'
    })

  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json({ error: 'Failed to process contact form' }, { status: 500 })
  }
}