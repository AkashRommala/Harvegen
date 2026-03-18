'use client'

import { useState } from 'react'

import Link from 'next/link'
import { FiSettings, FiDownload, FiBookOpen, FiArrowRight } from 'react-icons/fi'

// Toast helper
const toast = (msg, type = 'info') => {
  let el = document.getElementById('toast')
  if (!el) {
    el = document.createElement('div')
    el.id = 'toast'
    document.body.appendChild(el)
  }
  const icons = { info: 'ℹ️', success: '✅', warn: '⚠️', error: '❌' }
  el.innerHTML = `${icons[type] || icons.info} <span>${msg}</span>`
  el.classList.add('show')
  clearTimeout(el._t)
  el._t = setTimeout(() => el.classList.remove('show'), 3200)
}

function Projects() {
  const [filter, setFilter] = useState('all')

  const projects = [
    { title: 'Smart Irrigation System', desc: 'ADC reads sensor data, relay controls the pump, UART logs to a cloud dashboard via ESP8266.', tags: ['intermediate', 'stm32', 'iot'], mcu: 'STM32F407VGT6', emoji: '🌱', color: 'bg-emerald-900' },
    { title: 'Driver Drowsiness Detection', desc: 'IR sensor array detects eye blink patterns. Pattern recognition algorithm triggers audio-visual alert.', tags: ['advanced', 'lpc'], mcu: 'LPC1768 ARM M3', emoji: '👁', color: 'bg-red-900' },
    { title: 'IoT Weather Station', desc: 'DHT22 + BMP280 sensor fusion. ESP8266 uploads to Blynk dashboard in real time.', tags: ['beginner', 'arduino', 'iot'], mcu: 'Arduino Uno + ESP8266', emoji: '🌦', color: 'bg-slate-800' },
    { title: 'Line Follower Robot', desc: 'IR sensor array reads a black line path. PID controller calculates motor corrections.', tags: ['intermediate', 'arduino'], mcu: 'Arduino Nano', emoji: '🤖', color: 'bg-slate-800' },
    { title: 'Autonomous Rover', desc: 'Ultrasonic + IR obstacle avoidance with FreeRTOS task management.', tags: ['advanced', 'stm32'], mcu: 'STM32F411 + FreeRTOS', emoji: '🚀', color: 'bg-indigo-900' },
    { title: 'Mini Digital Oscilloscope', desc: 'High-speed ADC at 1MSPS with DMA. Waveform rendering on ST7735 TFT.', tags: ['advanced', 'stm32'], mcu: 'STM32F4 + TFT', emoji: '📈', color: 'bg-slate-800' },
  ]

  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.tags.includes(filter))

  return (
    <>
      {/* Page Hero */}
      <header className="pt-[120px] pb-15 relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-primary-500/10 to-transparent rounded-full blur-3xl animate-gradient"></div>
        <div className="absolute w-[600px] h-[400px] rounded-full bg-gradient-to-r from-primary-500/10 to-primary-500/10 top-0 left-1/2 -translate-x-1/2 pointer-events-none animate-float"></div>
        <div className="max-w-[1160px] mx-auto px-6">
          <div className="text-[0.72rem] text-slate-500 mb-4 font-mono">
            <Link href="/" className="text-gray-500 hover:text-primary-600">index</Link> <span>/ projects</span>
          </div>
          <div className="inline-flex items-center gap-2 mb-3 font-mono text-[0.7rem] tracking-widest uppercase text-blue-500">
            <span className="w-6 h-px bg-blue-500"></span>
            Build
          </div>
          <h1 className="mb-3 text-slate-900 font-display">Embedded<br/><span className="text-blue-500">Projects</span></h1>
          <p className="text-slate-400 max-w-[520px]">Real-world projects with full source code, schematics, and step-by-step explanations.</p>
        </div>
      </header>

      <main className="py-20">
        <div className="max-w-[1160px] mx-auto px-6">
          {/* Filter Bar */}
          <div className="flex flex-wrap gap-2 mb-8 p-3 bg-slate-800 border border-slate-700 rounded-xl">
            {['all', 'beginner', 'intermediate', 'advanced', 'iot', 'stm32', 'lpc', 'arduino'].map(f => (
              <button 
                key={f}
                className={`px-4 py-2 rounded font-medium text-sm transition-all ${filter === f ? 'bg-primary-600 text-white' : 'bg-transparent border border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900'}`}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((proj, i) => (
              <article key={i} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-slate-300 hover:-translate-y-0.5 hover:shadow-xl transition-all">
                <div className="h-[140px] bg-gradient-to-br from-blue-50 to-blue-100 shadow-sm flex items-center justify-center">
                  <img src="/api/placeholder/120/120" alt={proj.title} className="w-20 h-20 object-cover rounded-lg shadow-md" />
                </div>
                <div className="p-5 pb-0">
                  <div className="flex gap-1.5 flex-wrap mb-2.5">
                    {proj.tags.map((tag, j) => (
                      <span key={j} className={`px-2.5 py-1 rounded-sm font-mono text-[0.65rem] font-semibold tracking-wider uppercase border ${
                        tag === 'Beginner' ? 'text-green-600 border border-green-200 bg-green-50' : 
                        tag === 'Medium' ? 'text-amber-600 border border-amber-200 bg-amber-50' : 
                        tag === 'Advanced' ? 'text-red-600 border border-red-200 bg-red-50' : 
                        'text-blue-600 border border-blue-200 bg-blue-50'
                      }`}>{tag}</span>
                    ))}
                  </div>
                  <h3 className="font-mono text-base font-semibold text-slate-900 mb-2">{proj.title}</h3>
                  <p className="text-slate-600 text-[0.85rem] line-clamp-2 leading-relaxed">{proj.desc}</p>
                </div>
                <div className="p-5 flex justify-between items-center border-t border-slate-200">
                  <span className="font-mono text-[0.7rem] text-slate-500">{proj.tags[1] || proj.tags[0]}</span>
                  <button className="px-4 py-1.5 bg-transparent text-blue-600 border border-blue-200 rounded text-[0.72rem] font-mono hover:bg-blue-50 hover:border-blue-300 transition-all" onClick={() => toast('Full article coming soon!', 'info')}>Read More</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      {/* CTA */}
      <section className="py-12 bg-slate-800">
        <div className="max-w-[1160px] mx-auto px-6">
          <div className="bg-primary-600 rounded-xl p-10 text-center text-white">
            <div className="inline-flex items-center gap-2 mb-3 font-medium text-[0.7rem] tracking-widest uppercase text-white/80 justify-center">
              <span className="w-6 h-px bg-white/80"></span>
              Resources
            </div>
            <h2 className="text-slate-100 mb-2">Get the Source Code</h2>
            <p className="text-slate-400 mx-auto mb-6 max-w-[480px]">Download full project code, circuit schematics, and component lists for free.</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link href="/resources" className="px-5 py-2.5 bg-white text-primary-700 rounded font-medium text-sm hover:bg-gray-100 transition-colors">Download Code</Link>
              <Link href="/tutorials" className="px-5 py-2.5 bg-primary-600 text-white rounded font-medium text-sm hover:bg-primary-700 transition-colors shadow-md">Read Tutorials</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Projects