import { NextResponse } from 'next/server'
import { storeOTP } from '@/lib/otpstore'

// Dynamic import nodemailer to avoid ESM issues
let nodemailerModule = null
try {
  const nm = require('nodemailer')
  // Handle both ESM default export and CommonJS
  nodemailerModule = nm.createTransport ? nm : (nm.default ? nm.default : nm)
} catch (e) {
  console.error('Failed to load nodemailer:', e.message)
}

// Create transporter at startup (will be used if env vars were loaded)
let transporter = null
try {
  if (nodemailerModule && nodemailerModule.createTransport) {
    transporter = nodemailerModule.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })
  }
} catch (err) {
  console.error('Failed to create transporter:', err.message)
}

export async function POST(request) {
  try {
    // Debug: Log environment variables status
    console.log('SMTP Config Check:', {
      SMTP_HOST: process.env.SMTP_HOST,
      SMTP_PORT: process.env.SMTP_PORT,
      SMTP_USER: process.env.SMTP_USER ? 'set' : 'undefined',
      SMTP_PASS: process.env.SMTP_PASS ? 'set' : 'undefined',
      nodemailerLoaded: !!nodemailerModule,
      transporterExists: !!transporter
    })

    // Check if nodemailer loaded
    if (!nodemailerModule) {
      return NextResponse.json({ 
        error: 'Email module not loaded. Please restart the server.' 
      }, { status: 500 })
    }

    const currentUser = process.env.SMTP_USER
    const currentPass = process.env.SMTP_PASS
    
    if (!currentUser || !currentPass) {
      return NextResponse.json({ 
        error: 'SMTP credentials not configured. Please check .env.local file.' 
      }, { status: 503 })
    }

    // Try to use existing transporter, or create new one
    let mailTransporter = transporter
    if (!mailTransporter) {
      // Try fresh require
      try {
        const freshNm = require('nodemailer')
        console.log('freshNm keys:', Object.keys(freshNm).slice(0, 10))
        console.log('freshNm type:', typeof freshNm)
        console.log('freshNm.createTransport:', typeof freshNm?.createTransport)
        console.log('freshNm.default:', typeof freshNm?.default)
                console.log('freshNm.default?.createTransport:', typeof freshNm?.default?.createTransport)
        
        // Try to find createTransporter
        const createFn = freshNm.createTransport || freshNm.default?.createTransport
        if (createFn) {
          mailTransporter = createFn({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: false,
            auth: { user: currentUser, pass: currentPass }
          })
        } else {
          console.error('No createTransporter found in freshNm')
        }
      } catch (e) {
        console.error('Failed to create transporter:', e.message)
        return NextResponse.json({ error: 'Email module not configured correctly.' }, { status: 500 })
      }
    }

    if (!mailTransporter) {
      return NextResponse.json({ error: 'Email transporter not available.' }, { status: 500 })
    }

    const { email, name, phone, college, branch } = await request.json()
    
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Generate OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString()
    
    // Store OTP for verification using shared store
    storeOTP(email, otpCode)
    
    const userName = name || email.split('@')[0]

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 40px; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
            <span style="color: white; font-size: 24px; font-weight: bold;">H</span>
          </div>
          <h1 style="color: #1e293b; margin: 0; font-size: 28px;">Welcome to Harvegen, ${userName}!</h1>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 8px; margin-bottom: 30px; border: 1px solid #e2e8f0;">
          <h2 style="color: #1e293b; margin-top: 0; margin-bottom: 20px; font-size: 20px;">Your OTP Code</h2>
          <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
            <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #1e293b; font-family: monospace; background: white; padding: 15px; border-radius: 6px; display: inline-block; border: 2px solid #e2e8f0;">
              ${otpCode}
            </div>
            <p style="color: #64748b; margin-top: 10px; font-size: 14px;">Enter this 6-digit code in the app to complete your login</p>
          </div>
          
          <p style="color: #334155; line-height: 1.6; margin-bottom: 20px;">
            Thank you for joining our community. We're excited to have you on board.
          </p>
          
          <div style="background: #eff6ff; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6;">
            <h3 style="margin: 0 0 10px 0; color: #1e3a8a; font-size: 16px;">Next Steps:</h3>
            <ul style="color: #334155; margin: 0; padding-left: 20px; line-height: 1.6;">
              <li>Enter the OTP code above in the Harvegen app</li>
              <li>Explore our tutorials and resources</li>
              <li>Check out our projects and microcontrollers section</li>
              <li>Update your profile and preferences</li>
            </ul>
          </div>
        </div>

        <div style="text-align: center; color: #64748b; font-size: 14px;">
          <p style="margin: 0;">If you didn't request this login, please ignore this email.</p>
          <p style="margin: 10px 0 0 0;">Best regards,<br><strong>The Harvegen Team</strong></p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #94a3b8; font-size: 12px;">
          <p style="margin: 0;">This is an automated message. Please do not reply to this email.</p>
        </div>
      </div>
    `

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Your Harvegen OTP Code',
      html
    }

    await mailTransporter.sendMail(mailOptions)

    return NextResponse.json({ 
      success: true, 
      message: 'OTP sent successfully'
    })

  } catch (error) {
    console.error('Error sending OTP:', error.message)
    return NextResponse.json({ 
      error: error.message || 'Failed to send OTP'
    }, { status: 500 })
  }
}
