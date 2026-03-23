import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { getOTP, deleteOTP } from '@/lib/otpstore'

// CSV file path
const dataDir = path.join(process.cwd(), 'data')
const usersFile = path.join(dataDir, 'users.csv')

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

// Initialize CSV file with headers if it doesn't exist
function initCSV() {
  if (!fs.existsSync(usersFile)) {
    fs.writeFileSync(usersFile, 'name,email,phone,college,branch,timestamp\n')
  }
}

// Sanitize input to prevent CSV injection
function sanitizeCSV(value) {
  if (!value) return ''
  // Remove any formula characters at the start (=, +, -, @, tab, CR)
  const sanitized = String(value).replace(/^[=+\-@\t\r]/, '')
  // Escape quotes and wrap in quotes if contains comma or quote
  if (sanitized.includes(',') || sanitized.includes('"') || sanitized.includes('\n')) {
    return '"' + sanitized.replace(/"/g, '""') + '"'
  }
  return sanitized
}

export async function POST(request) {
  try {
    const { email, name, phone, college, branch, otp } = await request.json()
    
    if (!email || !otp) {
      return NextResponse.json({ error: 'Email and OTP are required' }, { status: 400 })
    }

    // Validate OTP format
    if (!/^\d{6}$/.test(otp)) {
      return NextResponse.json({ error: 'Invalid OTP format' }, { status: 400 })
    }

    // Check if OTP was sent to this email using shared store
    const storedOTP = getOTP(email)
    if (!storedOTP) {
      return NextResponse.json({ error: 'No OTP sent to this email. Please request a new OTP.' }, { status: 400 })
    }

    // Check if OTP has expired (5 minutes)
    if (Date.now() > storedOTP.expires) {
      deleteOTP(email)
      return NextResponse.json({ error: 'OTP has expired. Please request a new OTP.' }, { status: 400 })
    }

    // Verify OTP matches
    if (otp !== storedOTP.otp) {
      return NextResponse.json({ error: 'Invalid OTP. Please try again.' }, { status: 400 })
    }

    // Clear the OTP after successful verification
    deleteOTP(email)

    // Initialize CSV if needed
    initCSV()

    // Save user data to CSV (with sanitized input)
    const sanitizedName = sanitizeCSV(name || email.split('@')[0])
    const sanitizedEmail = sanitizeCSV(email)
    const sanitizedPhone = sanitizeCSV(phone || '')
    const sanitizedCollege = sanitizeCSV(college || '')
    const sanitizedBranch = sanitizeCSV(branch || '')
    const timestamp = new Date().toISOString()
    
    // Create CSV line with proper quoting
    const line = `${sanitizedName},${sanitizedEmail},${sanitizedPhone},${sanitizedCollege},${sanitizedBranch},${timestamp}`
    fs.appendFileSync(usersFile, line + '\n')
    
    console.log('User data saved to CSV:', line)

    return NextResponse.json({ 
      success: true, 
      message: 'OTP verified successfully',
      user: {
        name: name || email.split('@')[0],
        email: email,
        phone: phone || '',
        college: college || '',
        branch: branch || '',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
      }
    })

  } catch (error) {
    console.error('Error verifying OTP:', error)
    return NextResponse.json({ error: 'Failed to verify OTP' }, { status: 500 })
  }
}
