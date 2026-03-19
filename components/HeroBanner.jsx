'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FiZap, FiSettings, FiBookOpen, FiCpu, FiGlobe, FiRadio, FiLayers, FiDownload, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Button } from './ui/button'

const slides = [
  {
    id: 1,
    image: '/iot2.jpg',
    subtitle: 'Open Source Learning Platform',
    title: 'Embedded Systems',
    description: 'Master microcontrollers, IoT, and embedded C programming with hands-on projects.',
    cta: 'Explore Projects',
    ctaLink: '/projects',
    secondaryCta: 'Start Learning',
    secondaryLink: '/tutorials'
  },
  {
    id: 2,
    image: '/iot3.jpg',
    subtitle: 'Practical IoT Solutions',
    title: 'IoT Development',
    description: 'Build smart connected devices with ESP8266, sensors, and cloud integration.',
    cta: 'View IoT Projects',
    ctaLink: '/projects',
    secondaryCta: 'Learn IoT',
    secondaryLink: '/tutorials'
  },
  {
    id: 3,
    image: '/vlsi 2.jpg',
    subtitle: 'VLSI Design & FPGA',
    title: 'Hardware Design',
    description: 'Learn digital circuit design, Verilog, FPGA programming, and hardware acceleration.',
    cta: 'Explore Hardware',
    ctaLink: '/projects',
    secondaryCta: 'Learn VLSI',
    secondaryLink: '/tutorials'
  },
  {
    id: 4,
    image: '/iot.jpeg',
    subtitle: 'ARM Cortex-M Programming',
    title: 'Microcontrollers',
    description: 'Program STM32, LPC1768, and other ARM-based microcontrollers from scratch.',
    cta: 'Browse MCUs',
    ctaLink: '/microcontrollers',
    secondaryCta: 'View Tutorials',
    secondaryLink: '/tutorials'
  }
]

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return
    setIsAnimating(true)
    setCurrentSlide(index)
    setTimeout(() => setIsAnimating(false), 500)
  }

  // Auto-rotate slides every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 6000)
    return () => clearInterval(interval)
  }, [currentSlide])

  const current = slides[currentSlide]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
          </div>
        ))}
      </div>

      {/* Gradient Orbs for visual interest */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-8 w-full pt-32 pb-20">
        <div className={`transition-all duration-700 transform ${
          isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}>
          {/* Subtitle */}
          <div className="flex items-center gap-3 mb-4 animate-fade-in">
            <span className="w-12 h-px bg-primary-400"></span>
            <span className="text-primary-400 font-semibold tracking-wider uppercase text-sm">
              {current.subtitle}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-white font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {current.title}
          </h1>

          {/* Description */}
          <p className="text-gray-300 text-xl md:text-2xl max-w-[700px] mb-10 leading-relaxed">
            {current.description}
          </p>

          {/* Buttons */}
          <div className="flex gap-4 flex-wrap">
            <Button 
              href={current.ctaLink} 
              variant="default" 
              size="lg"
              className="bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
            >
              {current.cta}
            </Button>
            <Button 
              href={current.secondaryLink} 
              variant="secondary" 
              size="lg"
              className="bg-white/10 backdrop-blur-sm text-white border border-white/30 hover:bg-white/20 hover:border-white/50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
            >
              {current.secondaryCta}
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300"
        aria-label="Previous slide"
      >
        <FiChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300"
        aria-label="Next slide"
      >
        <FiChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-primary-500 w-10'
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-20 flex flex-col items-center text-white/60">
        <span className="text-xs tracking-wider uppercase mb-2">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent animate-bounce"></div>
      </div>
    </section>
  )
}
