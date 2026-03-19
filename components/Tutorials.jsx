'use client'

import { useState } from 'react'
import Link from 'next/link'
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
      { title: 'Introduction to Embedded C', desc: 'Data types, bitwise operations, memory layout and direct hardware register access.', time: '20 min', level: 'Beginner', icon: '🔤' },
      { title: 'GPIO: Input, Output & EXTI Interrupts', desc: 'Configure digital I/O, pull-up resistors, debounce, and external interrupt lines on STM32.', time: '25 min', level: 'Beginner', icon: '⚙' },
      { title: 'Timers & PWM Generation', desc: 'Timer modes, prescaler, ARR. Generate PWM for LED dimming and motor speed control.', time: '30 min', level: 'Intermediate', icon: '💡' },
      { title: 'UART: From Config to Circular Buffers', desc: 'Set baud rate, interrupt RX, ring buffer, and serial debugging on LPC1768 and STM32.', time: '35 min', level: 'Intermediate', icon: '📡' },
      { title: 'FreeRTOS: Tasks & Scheduling', desc: 'Create tasks, understand preemptive scheduling, priorities, and the tick timer.', time: '50 min', level: 'Advanced', icon: '🔄' },
      { title: 'DMA: Zero-CPU Peripheral Transfers', desc: 'Configure DMA for UART, ADC, and SPI to maximise MCU throughput without polling.', time: '45 min', level: 'Advanced', icon: '📦' },
    ],
    c: [
      { title: 'Introduction to Embedded C', desc: 'Data types, bitwise operations, memory layout and direct hardware register access.', time: '20 min', level: 'Beginner', icon: '🔤' },
      { title: 'Pointers & Memory in Embedded C', desc: 'Stack vs heap, volatile keyword, const correctness, and memory-mapped registers.', time: '30 min', level: 'Intermediate', icon: '🗺' },
    ],
    basics: [
      { title: 'GPIO: Input, Output & Interrupts', desc: 'Configure GPIO, debounce switches, and set up external interrupts on STM32.', time: '25 min', level: 'Beginner', icon: '⚙' },
      { title: 'Timers & PWM Generation', desc: 'Timer modes, prescaler, ARR. Generate PWM for LED dimming and motor control.', time: '30 min', level: 'Intermediate', icon: '💡' },
    ],
    proto: [
      { title: 'UART: Complete Guide', desc: 'Baud rate config, interrupt RX, ring buffer, and serial debugging.', time: '35 min', level: 'Intermediate', icon: '📡' },
      { title: 'I2C: Sensors & OLED Displays', desc: 'Address scan, MPU6050 IMU and SSD1306 OLED with hardware I2C.', time: '40 min', level: 'Intermediate', icon: '🔗' },
    ],
    rtos: [
      { title: 'FreeRTOS: Tasks & Scheduling', desc: 'Create tasks, understand preemptive scheduling, priorities, and the tick timer.', time: '50 min', level: 'Advanced', icon: '🔄' },
      { title: 'FreeRTOS: Queues & Semaphores', desc: 'Inter-task communication via queues, binary semaphores, mutexes, and event groups.', time: '55 min', level: 'Advanced', icon: '📬' },
    ],
  }

  return (
    <>
      {/* Page Hero */}
      <header className="pt-[120px] pb-15 relative overflow-hidden bg-gradient-to-br from-blue-50 via-blue-50 to-blue-50">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl animate-gradient"></div>
        <div className="absolute w-[600px] h-[400px] rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 top-0 left-1/2 -translate-x-1/2 pointer-events-none animate-float"></div>
        <div className="max-w-[1160px] mx-auto px-6">
          <div className="text-[0.72rem] text-slate-500 mb-4 font-mono">
            <Link href="/" className="text-slate-400 hover:text-blue-500">index</Link> <span>/ tutorials</span>
          </div>
          <div className="inline-flex items-center gap-2 mb-3 font-mono text-[0.7rem] tracking-widest uppercase text-blue-500">
            <span className="w-6 h-px bg-blue-500"></span>
            Learning Resources
          </div>
          <h1 className="mb-3 text-slate-900 font-display">Embedded Systems<br/><span className="text-blue-500">Tutorials</span></h1>
          <p className="text-slate-400 max-w-[520px]">From beginner to advanced — Embedded C, MCU peripherals, communication protocols, and real-time operating systems.</p>
        </div>
      </header>

      <main className="py-20">
        <div className="max-w-[1160px] mx-auto px-6">
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-700 pb-4">
            {[{ id: 'all', label: 'All Tutorials' },
              { id: 'c', label: 'Embedded C' },
              { id: 'basics', label: 'MCU Basics' },
              { id: 'proto', label: 'Protocols' },
              { id: 'rtos', label: 'RTOS' },
            ].map(tab => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Tutorial Cards */}
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {tutorials[activeTab].map((tut, i) => (
              <Link href="/tutorials" key={i} className="bg-white border border-slate-200 rounded-xl p-6 hover:border-slate-300 hover:-translate-y-0.5 hover:shadow-xl transition-all no-underline">
                <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg mb-4 overflow-hidden">
                  <img src="/vlsi1.jpeg" alt={tut.title} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-mono text-[0.95rem] font-semibold text-slate-900 mb-2">{tut.title}</h3>
                <p className="text-slate-600 text-[0.82rem] line-clamp-2 mb-3 leading-relaxed">{tut.desc}</p>
                <div className="flex gap-3 items-center text-[0.72rem] text-slate-500">
                  <span>⏱ {tut.time}</span>
                  <span className={`px-2.5 py-1 rounded-sm font-mono text-[0.65rem] font-semibold tracking-wider uppercase ${
                    tut.level === 'Beginner' ? 'text-green-600 border border-green-200 bg-green-50' : 
                    tut.level === 'Intermediate' ? 'text-amber-600 border border-amber-200 bg-amber-50' : 
                    'text-red-600 border border-red-200 bg-red-50'
                  }`}>{tut.level}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* CTA */}
      <section className="py-12 bg-slate-800">
        <div className="max-w-[1160px] mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-xl p-10 text-center">
            <div className="inline-flex items-center gap-2 mb-3 font-mono text-[0.7rem] tracking-widest uppercase text-blue-500 justify-center">
              <span className="w-6 h-px bg-blue-500"></span>
              Apply it
            </div>
            <h2 className="text-slate-100 mb-2">Learn by Building</h2>
            <p className="text-slate-400 mx-auto mb-6 max-w-[480px]">Each tutorial is linked to a real project. Grab the code and start soldering.</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Button href="/projects" variant="default" size="default" icon="arrowRight">Browse Projects</Button>
              <Button href="/resources" variant="outline" size="default" icon="download">Get Source Code</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Tutorials