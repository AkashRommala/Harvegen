// Shared OTP store using file-based storage
// This ensures OTP can be shared between send-otp and verify-otp routes

import fs from 'fs'
import path from 'path'

const dataDir = path.join(process.cwd(), 'data')
const otpFile = path.join(dataDir, 'otp.json')

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

// Initialize OTP file if it doesn't exist
function initOTPFile() {
  if (!fs.existsSync(otpFile)) {
    fs.writeFileSync(otpFile, JSON.stringify({}))
  }
}

// Read OTP store from file
function readOTPStore() {
  initOTPFile()
  try {
    const data = fs.readFileSync(otpFile, 'utf8')
    return JSON.parse(data)
  } catch (e) {
    return {}
  }
}

// Write OTP store to file
function writeOTPStore(store) {
  fs.writeFileSync(otpFile, JSON.stringify(store, null, 2))
}

export function storeOTP(email, otp, expiresInMs = 5 * 60 * 1000) {
  const store = readOTPStore()
  store[email.toLowerCase()] = {
    otp,
    expires: Date.now() + expiresInMs
  }
  writeOTPStore(store)
  console.log('OTP stored for:', email.toLowerCase())
}

export function getOTP(email) {
  const store = readOTPStore()
  const record = store[email.toLowerCase()]
  console.log('Getting OTP for:', email.toLowerCase(), 'Found:', !!record)
  return record || null
}

export function deleteOTP(email) {
  const store = readOTPStore()
  delete store[email.toLowerCase()]
  writeOTPStore(store)
  console.log('OTP deleted for:', email.toLowerCase())
}

export function verifyOTP(email, otp) {
  const stored = getOTP(email)
  
  if (!stored) {
    return { valid: false, error: 'No OTP sent to this email' }
  }
  
  if (Date.now() > stored.expires) {
    deleteOTP(email)
    return { valid: false, error: 'OTP has expired' }
  }
  
  if (otp !== stored.otp) {
    return { valid: false, error: 'Invalid OTP' }
  }
  
  // Clear OTP after successful verification
  deleteOTP(email)
  
  return { valid: true }
}
