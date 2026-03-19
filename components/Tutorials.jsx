'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FiSettings, FiBookOpen, FiCpu, FiGlobe, FiRadio, FiLayers, FiDownload, FiClock, FiTarget } from 'react-icons/fi'
import { Card, CardContent, CardTitle, CardDescription } from './ui/card'
import { Button, ButtonGroup } from './ui/button'
import { Badge } from './ui/badge'
import { TutorialImage } from './ui/image'

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

function Tutorials() {
  const [activeTab, setActiveTab] = useState('all')

  const tutorials = {
    all: [
      { title: 'Introduction to Embedded C', desc: 'Data types, bitwise operations, memory layout and direct hardware register access.', time: '20 min', level: 'Beginner', icon: FiBookOpen, image: '/vlsi 2.jpeg' },
      { title: 'GPIO: Input, Output & EXTI Interrupts', desc: 'Configure digital I/O, pull-up resistors, debounce, and external interrupt lines on STM32.', time: '25 min', level: 'Beginner', icon: FiSettings, image: '/iot3.jpg' },
      { title: 'Timers & PWM Generation', desc: 'Timer modes, prescaler, ARR. Generate PWM for LED dimming and motor speed control.', time: '30 min', level: 'Intermediate', icon: FiClock, image: '/vlsi1.jpeg' },
      { title: 'UART: From Config to Circular Buffers', desc: 'Set baud rate, interrupt RX, ring buffer, and serial debugging on LPC1768 and STM32.', time: '35 min', level: 'Intermediate', icon: FiRadio, image: '/vlsi 2.jpg' },
      { title: 'FreeRTOS: Tasks & Scheduling', desc: 'Create tasks, understand preemptive scheduling, priorities, and the tick timer.', time: '50 min', level: 'Advanced', icon: FiLayers, image: '/iot2.jpg' },
      { title: 'DMA: Zero-CPU Peripheral Transfers', desc: 'Configure DMA for UART, ADC, and SPI to maximise MCU throughput without polling.', time: '45 min', level: 'Advanced', icon: FiDownload, image: '/iot.jpeg' },
    ],
    c: [
      { title: 'Introduction to Embedded C', desc: 'Data types, bitwise operations, memory layout and direct hardware register access.', time: '20 min', level: 'Beginner', icon: FiBookOpen, image: '/vlsi 2.jpeg' },
      { title: 'Pointers & Memory in Embedded C', desc: 'Stack vs heap, volatile keyword, const correctness, and memory-mapped registers.', time: '30 min', level: 'Intermediate', icon: FiTarget, image: '/vlsi 2.jpg' },
    ],
    basics: [
      { title: 'GPIO: Input, Output & Interrupts', desc: 'Configure GPIO, debounce switches, and set up external interrupts on STM32.', time: '25 min', level: 'Beginner', icon: FiSettings, image: '/iot3.jpg' },
      { title: 'Timers & PWM Generation', desc: 'Timer modes, prescaler, ARR. Generate PWM for LED dimming and motor control.', time: '30 min', level: 'Intermediate', icon: FiClock, image: '/vlsi1.jpeg' },
    ],
    proto: [
      { title: 'UART: Complete Guide', desc: 'Baud rate config, interrupt RX, ring buffer, and serial debugging.', time: '35 min', level: 'Intermediate', icon: FiRadio, image: '/vlsi 2.jpg' },
      { title: 'I2C: Sensors & OLED Displays', desc: 'Address scan, MPU6050 IMU and SSD1306 OLED with hardware I2C.', time: '40 min', level: 'Intermediate', icon: FiGlobe, image: '/iot2.jpg' },
    ],
    rtos: [
      { title: 'FreeRTOS: Tasks & Scheduling', desc: 'Create tasks, understand preemptive scheduling, priorities, and the tick timer.', time: '50 min', level: 'Advanced', icon: FiLayers, image: '/iot.jpeg' },
      { title: 'FreeRTOS: Queues & Semaphores', desc: 'Inter-task communication via queues, binary semaphores, mutexes, and event groups.', time: '55 min', level: 'Advanced', icon: FiDownload, image: '/iot3.jpg' },
    ],
  }

  return (
    <>
      {/* Page Hero */}
      <header className="pt-[120px] pb-20 relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-primary-50/30">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/3 via-primary-500/8 to-transparent rounded-full blur-3xl animate-gradient"></div>
        <div className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-r from-primary-500/15 to-primary-500/8 top-1/2 left-1/2 -translate-x-3/5 -translate-y-2/5 pointer-events-none animate-float"></div>
        <div className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 top-1/4 right-1/4 pointer-events-none animate-float" style={{animationDelay: '2s'}}></div>
        
        <div className="max-w-[1400px] mx-auto px-8 w-full relative z-10">
          <div className="text-sm text-gray-500 mb-6 font-mono animate-fade-in">
            <Link href="/" className="text-gray-400 hover:text-primary-600 transition-colors">Home</Link> <span className="text-gray-400">/</span> <span className="text-primary-600">Tutorials</span>
          </div>
          
          <div className="space-y-6 animate-slide-up">
            <div className="inline-flex items-center gap-3 mb-4 font-semibold text-sm tracking-widest uppercase text-primary-600">
              <span className="w-8 h-px bg-primary-600"></span>
              Learning Resources
            </div>
            
            <h1 className="text-gray-900 font-display text-5xl md:text-6xl font-bold leading-tight">
              Embedded Systems<br/><span className="text-primary-600">Tutorials</span>
            </h1>
            
            <p className="text-gray-600 text-xl max-w-[600px] leading-relaxed">
              From beginner to advanced — Embedded C, MCU peripherals, communication protocols, and real-time operating systems.
            </p>
          </div>
        </div>
      </header>

      <main className="py-24 bg-gradient-to-br from-white to-slate-50">
        <div className="max-w-[1400px] mx-auto px-8">
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-12 pb-6 border-b border-gray-200">
            {[{ id: 'all', label: 'All Tutorials' },
              { id: 'c', label: 'Embedded C' },
              { id: 'basics', label: 'MCU Basics' },
              { id: 'proto', label: 'Protocols' },
              { id: 'rtos', label: 'RTOS' },
            ].map(tab => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'default' : 'ghost'}
                size="lg"
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-semibold transition-all ${
                  activeTab === tab.id 
                    ? 'bg-primary-600 text-white shadow-lg hover:shadow-xl' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-300 hover:text-primary-600 hover:shadow-md'
                }`}
              >
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Tutorial Cards */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {tutorials[activeTab].map((tut, i) => (
              <Link href="/tutorials" key={i} className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-primary-300 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 no-underline">
                <div className="h-[200px] bg-gradient-to-br from-primary-50 to-primary-100 shadow-sm flex items-center justify-center overflow-hidden relative">
                  <img src={tut.image} alt={tut.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm border border-primary-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <tut.icon className="w-6 h-6 text-primary-600" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-mono text-lg font-bold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors line-clamp-2">{tut.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed">{tut.desc}</p>
                  <div className="flex gap-4 items-center text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <span className="text-primary-500">⏱</span> {tut.time}
                    </span>
                    <span className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold tracking-wider uppercase ${
                      tut.level === 'Beginner' ? 'text-emerald-700 border-emerald-200 bg-emerald-50' : 
                      tut.level === 'Intermediate' ? 'text-amber-700 border-amber-200 bg-amber-50' : 
                      'text-red-700 border-red-200 bg-red-50'
                    }`}>{tut.level}</span>
                  </div>
                </div>
              </Link>
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
                Apply Your Skills
              </div>
              <h2 className="text-white mb-6 text-4xl font-bold">Learn by <span className="text-yellow-300">Building</span></h2>
              <p className="text-white/90 mx-auto mb-8 max-w-[600px] text-lg leading-relaxed">Each tutorial is linked to a real project. Grab the code, fire up your hardware, and start building embedded systems.</p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button href="/projects" variant="secondary" size="lg" className="bg-white text-primary-600 hover:bg-gray-100 shadow-lg hover:shadow-xl">Browse Projects</Button>
                <Button href="/resources" variant="ghost" size="lg" className="bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm">Get Source Code</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Tutorials