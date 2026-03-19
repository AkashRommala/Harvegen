'use client'

import { useState } from 'react'

import Link from 'next/link'
import { FiSettings, FiDownload, FiBookOpen, FiArrowRight, FiCpu, FiGlobe, FiRadio, FiLayers, FiTarget, FiZap } from 'react-icons/fi'
import { Card, CardContent, CardTitle, CardDescription } from './ui/card'
import { Button, ButtonGroup } from './ui/button'
import { Badge } from './ui/badge'
import { ProjectImage } from './ui/image'

// Toast helper
const toast = (msg, type = 'info') => {
  let el = document.getElementById('toast')
  if (!el) {
    el = document.createElement('div')
    el.id = 'toast'
    document.body.appendChild(el)
  }
  const icons = { info: '', success: '', warn: '', error: '' }
  el.innerHTML = `${icons[type] || icons.info} <span>${msg}</span>`
  el.classList.add('show')
  clearTimeout(el._t)
  el._t = setTimeout(() => el.classList.remove('show'), 3200)
}

function Projects() {
  const [filter, setFilter] = useState('all')

  const projects = [
    { title: 'Smart Irrigation System', desc: 'ADC reads sensor data, relay controls the pump, UART logs to a cloud dashboard via ESP8266.', tags: ['intermediate', 'stm32', 'iot'], mcu: 'STM32F407VGT6', icon: FiZap, color: 'bg-emerald-900', image: '/iot.jpeg' },
    { title: 'Driver Drowsiness Detection', desc: 'IR sensor array detects eye blink patterns. Pattern recognition algorithm triggers audio-visual alert.', tags: ['advanced', 'lpc'], mcu: 'LPC1768 ARM M3', icon: FiTarget, color: 'bg-red-900', image: '/vlsi1.jpeg' },
    { title: 'IoT Weather Station', desc: 'DHT22 + BMP280 sensor fusion. ESP8266 uploads to Blynk dashboard in real time.', tags: ['beginner', 'arduino', 'iot'], mcu: 'Arduino Uno + ESP8266', icon: FiGlobe, color: 'bg-slate-800', image: '/iot2.jpg' },
    { title: 'Line Follower Robot', desc: 'IR sensor array reads a black line path. PID controller calculates motor corrections.', tags: ['intermediate', 'arduino'], mcu: 'Arduino Nano', icon: FiCpu, color: 'bg-slate-800', image: '/iot3.jpg' },
    { title: 'Autonomous Rover', desc: 'Ultrasonic + IR obstacle avoidance with FreeRTOS task management.', tags: ['advanced', 'stm32'], mcu: 'STM32F411 + FreeRTOS', icon: FiLayers, color: 'bg-indigo-900', image: '/vlsi 2.jpg' },
    { title: 'Mini Digital Oscilloscope', desc: 'High-speed ADC at 1MSPS with DMA. Waveform rendering on ST7735 TFT.', tags: ['advanced', 'stm32'], mcu: 'STM32F4 + TFT', icon: FiRadio, color: 'bg-slate-800', image: '/vlsi 2.jpeg' },
  ]

  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.tags.includes(filter))

  return (
    <>
      {/* Page Hero */}
      <header className="pt-[120px] pb-20 relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-primary-50/30">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/3 via-primary-500/8 to-transparent rounded-full blur-3xl animate-gradient"></div>
        <div className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-r from-primary-500/15 to-primary-500/8 top-1/2 left-1/2 -translate-x-3/5 -translate-y-2/5 pointer-events-none animate-float"></div>
        <div className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 top-1/4 right-1/4 pointer-events-none animate-float" style={{animationDelay: '2s'}}></div>
        
        <div className="max-w-[1400px] mx-auto px-8 w-full relative z-10">
          <div className="text-sm text-gray-500 mb-6 font-mono animate-fade-in">
            <Link href="/" className="text-gray-400 hover:text-primary-600 transition-colors">Home</Link> <span className="text-gray-400">/</span> <span className="text-primary-600">Projects</span>
          </div>
          
          <div className="space-y-6 animate-slide-up">
            <div className="inline-flex items-center gap-3 mb-4 font-semibold text-sm tracking-widest uppercase text-primary-600">
              <span className="w-8 h-px bg-primary-600"></span>
              Build Real Systems
            </div>
            
            <h1 className="text-gray-900 font-display text-5xl md:text-6xl font-bold leading-tight">
              Embedded<br/><span className="text-primary-600">Projects</span>
            </h1>
            
            <p className="text-gray-600 text-xl max-w-[600px] leading-relaxed">
              Real-world projects with full source code, schematics, and step-by-step explanations.
            </p>
          </div>
        </div>
      </header>

      <main className="py-24 bg-gradient-to-br from-white to-slate-50">
        <div className="max-w-[1400px] mx-auto px-8">
          {/* Filter Bar */}
          <div className="flex flex-wrap gap-3 mb-12 p-6 bg-white border border-gray-200 rounded-2xl shadow-lg">
            {['all', 'beginner', 'intermediate', 'advanced', 'iot', 'stm32', 'lpc', 'arduino'].map(f => (
              <Button 
                key={f}
                variant={filter === f ? 'default' : 'ghost'}
                size="lg"
                onClick={() => setFilter(f)}
                className={`px-6 py-3 font-semibold transition-all ${
                  filter === f 
                    ? 'bg-primary-600 text-white shadow-lg hover:shadow-xl' 
                    : 'bg-gray-50 text-gray-600 border border-gray-200 hover:border-primary-300 hover:text-primary-600 hover:shadow-md'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </Button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((proj, i) => (
              <article key={i} className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-primary-300 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="h-[200px] bg-gradient-to-br from-primary-50 to-primary-100 shadow-sm flex items-center justify-center overflow-hidden relative">
                  <img src={proj.image} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm border border-primary-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <proj.icon className="w-6 h-6 text-primary-600" />
                  </div>
                </div>
                <div className="p-6 pb-0">
                  <div className="flex gap-2 flex-wrap mb-3">
                    {proj.tags.map((tag, j) => (
                      <span key={j} className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold tracking-wider uppercase border ${
                        tag === 'beginner' ? 'text-emerald-700 border-emerald-200 bg-emerald-50' : 
                        tag === 'intermediate' ? 'text-amber-700 border-amber-200 bg-amber-50' : 
                        tag === 'advanced' ? 'text-red-700 border-red-200 bg-red-50' : 
                        'text-blue-700 border-blue-200 bg-blue-50'
                      }`}>{tag}</span>
                    ))}
                  </div>
                  <h3 className="font-mono text-lg font-bold text-slate-900 mb-3 group-hover:text-primary-700 transition-colors">{proj.title}</h3>
                  <p className="text-slate-600 text-sm line-clamp-2 mb-4 leading-relaxed">{proj.desc}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                    <span className="font-mono text-xs text-gray-500">{proj.mcu}</span>
                  </div>
                </div>
                <div className="p-6 flex justify-between items-center border-t border-slate-200 bg-slate-50/50">
                  <span className="font-mono text-xs text-slate-500 font-medium">{proj.tags[1] || proj.tags[0]}</span>
                  <Button variant="outline" size="sm" onClick={() => toast('Full article coming soon!', 'info')} className="shadow-sm hover:shadow-md">View Details</Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-700">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent rounded-3xl"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-3 mb-6 font-semibold text-sm tracking-widest uppercase text-white/90 justify-center">
                <span className="w-8 h-px bg-white/60"></span>
                Get Started
              </div>
              <h2 className="text-white mb-6 text-4xl font-bold">Download <span className="text-yellow-300">Source Code</span></h2>
              <p className="text-white/90 mx-auto mb-8 max-w-[600px] text-lg leading-relaxed">Download full project code, circuit schematics, and component lists for free. No login required.</p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button href="/resources" variant="secondary" size="lg" className="bg-white text-primary-600 hover:bg-gray-100 shadow-lg hover:shadow-xl">Download Code</Button>
                <Button href="/tutorials" variant="ghost" size="lg" className="bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm">Read Tutorials</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Projects