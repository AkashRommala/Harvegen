'use client'

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiZap } from 'react-icons/fi'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Tutorials', path: '/tutorials' },
  { name: 'Projects', path: '/projects' },
  { name: 'MCUs', path: '/microcontrollers' },
  { name: 'Resources', path: '/resources' },
  { name: 'About', path: '/about' },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-card'
            : 'bg-white/80 backdrop-blur-sm border-b border-gray-100'
        }`}
      >
        <div className="flex items-center h-[64px] max-w-[1200px] mx-auto px-6">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 font-bold text-gray-900">
            <div className="w-8 h-8 bg-primary-600 rounded-md flex items-center justify-center text-white font-bold">
              <FiZap className="w-5 h-5" />
            </div>
            <span className="text-lg font-semibold">
              Har<span className="text-primary-600">vegen</span>
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-2 ml-10">
            {navLinks.map((link) => {
              const active = pathname === link.path
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? 'text-primary-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {link.name}

                  {/* Underline animation */}
                  <span
                    className={`absolute left-0 bottom-0 h-0.5 bg-primary-600 transition-all duration-300 ${
                      active ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              )
            })}
          </div>

          {/* CTA BUTTON */}
          <Link
            href="/projects"
            className="hidden md:inline-block ml-auto px-6 py-3 bg-primary-600 text-white rounded-full text-sm font-semibold hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:ring-2 hover:ring-primary-500/50 transform hover:-translate-y-0.5 hover:scale-105"
          >
            <FiZap className="inline mr-2 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" /> Explore Projects
          </Link>

          {/* MOBILE MENU BUTTON */}
          <button
            className="ml-auto md:hidden flex flex-col gap-1.5 p-2 rounded-full bg-primary-600 hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                mobileOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                mobileOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                mobileOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`fixed top-[64px] left-0 right-0 bg-white border-b border-gray-200 shadow-lg transition-all duration-300 ${
          mobileOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="flex flex-col p-5 gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setMobileOpen(false)}
              className="px-4 py-2 rounded-full text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
            >
              {link.name}
            </Link>
          ))}

          <Link
            href="/projects"
            onClick={() => setMobileOpen(false)}
            className="mt-3 text-center px-6 py-3 bg-primary-600 text-white rounded-full font-medium hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:scale-105"
          >
            <FiZap className="inline mr-2 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" /> Explore Projects
          </Link>
        </div>
      </div>
    </>
  )
}

export default Navbar