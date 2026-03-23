'use client'

import { useState } from 'react'
import { FiMail, FiX, FiArrowRight, FiShield, FiCheckCircle } from 'react-icons/fi'

export default function LoginModal({ isOpen, onClose, onLogin }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [college, setCollege] = useState('')
  const [branch, setBranch] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState('form') // 'form' or 'otp'
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otpError, setOtpError] = useState('')

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setOtpError('') // Clear previous errors
    if (email.trim()) {
      setIsLoading(true)
      try {
        // Send OTP via API
        const response = await fetch('/api/send-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, name, phone, college, branch }),
        })

        const result = await response.json()
        
        if (result.success) {
          setOtpSent(true)
          setStep('otp')
          setIsLoading(false)
        } else {
          throw new Error(result.error || 'Failed to send OTP')
        }
      } catch (error) {
        console.error('Error sending OTP:', error)
        setOtpError(error.message || 'Failed to send OTP. Please try again.')
        setIsLoading(false)
      }
    }
  }

  const handleOtpSubmit = async (e) => {
    e.preventDefault()
    
    if (otp.length !== 6) {
      setOtpError('Please enter a valid 6-digit OTP')
      return
    }

    setIsLoading(true)
    try {
      // Verify OTP via API
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          name, 
          phone,
          college,
          branch,
          otp 
        }),
      })

      const result = await response.json()
      
      if (result.success) {
        // Complete login
        onLogin(result.user)
        setIsLoading(false)
        onClose()
      } else {
        setOtpError(result.error || 'Invalid OTP. Please try again.')
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Error verifying OTP:', error)
      setOtpError('Network error. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-6 text-center">
          <h2 className="text-2xl font-bold text-white">Welcome to Harvegen</h2>
          <p className="text-white/80 mt-1">Sign in to continue learning</p>
        </div>

        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
        >
          <FiX className="w-5 h-5" />
        </button>

        {/* Form Step */}
        {step === 'form' && (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                College / Organization
              </label>
              <input
                type="text"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                placeholder="Enter your college or organization"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Branch / Field of Interest
              </label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all bg-white"
              >
                <option value="">Select your branch/interest</option>
                <option value="embedded-systems">Embedded Systems</option>
                <option value="iot">Internet of Things (IoT)</option>
                <option value="vlsi">VLSI Design</option>
                <option value="robotics">Robotics</option>
                <option value="fpga">FPGA</option>
                <option value="microcontrollers">Microcontrollers</option>
                <option value="electronics">Electronics</option>
                <option value="other">Other</option>
              </select>
            </div>

            {otpError && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                {otpError}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!email.trim() || isLoading}
              className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Send OTP
                  <FiShield className="w-5 h-5" />
                </>
              )}
            </button>

            <p className="text-center text-xs text-gray-500">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </form>
        )}

        {/* OTP Step */}
        {step === 'otp' && (
          <div className="p-6 space-y-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiMail className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Check Your Email</h3>
              <p className="text-gray-600 text-sm">
                We've sent a 6-digit OTP to <span className="font-mono">{email}</span>
              </p>
            </div>

            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enter OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="123456"
                  maxLength={6}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-center text-lg font-mono"
                />
                {otpError && (
                  <p className="text-red-500 text-sm mt-1">{otpError}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={otp.length !== 6 || isLoading}
                className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Verify OTP
                    <FiCheckCircle className="w-5 h-5" />
                  </>
                )}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setStep('form')
                    setOtp('')
                    setOtpError('')
                  }}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Back to Email
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
