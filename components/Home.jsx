'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FiZap, FiSettings, FiBookOpen, FiCpu, FiGlobe, FiRadio, FiLayers, FiDownload } from 'react-icons/fi'

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

function Home() {
  const [typeText, setTypeText] = useState('')
  const words = ['Microcontrollers', 'IoT Devices', 'Embedded C', 'RTOS', 'ARM Cortex-M', 'STM32', 'LPC1768', 'Arduino']
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[wordIndex]
    const timeout = isDeleting ? 55 : 90
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setTypeText(currentWord.slice(0, charIndex + 1))
        setCharIndex(charIndex + 1)
        if (charIndex + 1 === currentWord.length) {
          setIsDeleting(true)
          setTimeout(() => {}, 1600)
        }
      } else {
        setTypeText(currentWord.slice(0, charIndex - 1))
        setCharIndex(charIndex - 1)
        if (charIndex - 1 === 0) {
          setIsDeleting(false)
          setWordIndex((wordIndex + 1) % words.length)
        }
      }
    }, charIndex === currentWord.length && !isDeleting ? 1600 : timeout)

    return () => clearTimeout(timer)
  }, [charIndex, isDeleting, wordIndex, words])

  const projects = [
    { title: 'Smart Irrigation System', desc: 'Automated soil-moisture irrigation using ADC sensors on STM32F407.', tags: ['Medium', 'STM32', 'IoT'], icon: FiZap, color: 'bg-emerald-900' },
    { title: 'Driver Drowsiness Detection', desc: 'IR sensor eye-blink pattern recognition on NXP LPC1768 ARM Cortex-M3.', tags: ['Advanced', 'LPC1768'], icon: FiZap, color: 'bg-red-900' },
    { title: 'IoT Weather Station', desc: 'DHT22 + BMP280 with ESP8266 Wi-Fi uploading to Blynk dashboard.', tags: ['Beginner', 'Arduino', 'IoT'], icon: FiGlobe, color: 'bg-slate-800' },
  ]

  const tutorials = [
    { title: 'GPIO: Input, Output & EXTI Interrupts', desc: 'Configure digital I/O on STM32 at register level.', time: '25 min', level: 'Beginner', icon: FiSettings },
    { title: 'UART: From Config to Circular Buffers', desc: 'Set baud rate, interrupt-driven RX, implement ring buffer.', time: '35 min', level: 'Intermediate', icon: FiRadio },
    { title: 'FreeRTOS: Tasks, Queues & Semaphores', desc: 'Create tasks, share data with queues, synchronise with semaphores.', time: '55 min', level: 'Advanced', icon: FiLayers },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-[100px] pb-15 relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-primary-500/10 to-transparent rounded-full blur-3xl animate-gradient"></div>
        <div className="absolute w-[700px] h-[700px] rounded-full bg-gradient-to-r from-primary-500/10 to-primary-500/10 top-1/2 left-1/2 -translate-x-3/5 -translate-y-2/5 pointer-events-none animate-float"></div>
        
        <div className="max-w-[1160px] mx-auto px-6 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-50 border border-primary-100 rounded-full text-[0.68rem] tracking-wider uppercase text-primary-700 mb-5 font-medium">
                <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse"></span>
                Open Source · Free Forever · v2.0
              </div>

              <h1 className="mb-4 text-gray-900 font-display text-4xl md:text-5xl font-bold">
                Embedded<br/>
                <span className="text-primary-600">Projects Hub</span>
              </h1>

              <p className="text-gray-600 text-lg max-w-[500px] mb-9 leading-relaxed">
                Learn Embedded Systems through Practical Projects —
                from blinking LEDs to <strong className="text-primary-600">{typeText}<span className="inline-block w-1.5 h-5 bg-primary-500 align-middle ml-0.5 animate-pulse"></span></strong>
              </p>

          <div className="flex gap-3 flex-wrap mb-12">
            <Link href="/projects" className="px-5 py-2.5 bg-primary-600 text-white rounded-md font-semibold text-sm hover:bg-primary-700 transition-colors shadow-sm hover:shadow-md">Browse Projects</Link>
            <Link href="/tutorials" className="px-5 py-2.5 bg-white text-primary-600 border border-primary-200 rounded-md font-semibold text-sm hover:bg-primary-50 transition-colors">Start Learning</Link>
          </div>

              {/* Stats */}
              <div className="flex gap-8 pt-7 border-t border-gray-200 flex-wrap">
                <div>
                  <div className="font-bold text-2xl text-gray-900">40+</div>
                  <div className="text-gray-500 text-xs tracking-wider uppercase">Projects</div>
                </div>
                <div>
                  <div className="font-bold text-2xl text-gray-900">60+</div>
                  <div className="text-gray-500 text-xs tracking-wider uppercase">Tutorials</div>
                </div>
                <div>
                  <div className="font-bold text-2xl text-gray-900">3</div>
                  <div className="text-gray-500 text-xs tracking-wider uppercase">MCU Platforms</div>
                </div>
                <div>
                  <div className="font-bold text-2xl text-gray-900">100%</div>
                  <div className="text-gray-500 text-xs tracking-wider uppercase">Free</div>
                </div>
              </div>
            </div>

            {/* Right: Terminal */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-xl">
              <div className="flex items-center gap-1.5 py-[11px] px-4 bg-gray-800/50 border-b border-gray-700">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                <span className="ml-2 font-mono text-[0.7rem] text-gray-400">irrigation_main.c — STM32F407</span>
              </div>
              <div className="p-5 font-mono text-[0.75rem] leading-[1.9]">
                <div className="flex gap-3.5"><span className="text-slate-600 select-none min-w-4 text-right">1</span><span><span className="text-slate-500 italic">/* Smart Irrigation System */</span></span></div>
                <div className="flex gap-3.5"><span className="text-slate-600 select-none min-w-4 text-right">2</span><span><span className="text-purple-400">#include</span> <span className="text-green-500">{'<stm32f4xx_hal.h>'}</span></span></div>
                <div className="flex gap-3.5"><span className="text-slate-600 select-none min-w-4 text-right">3</span><span><span className="text-purple-400">#include</span> <span className="text-green-500">"sensor_adc.h"</span></span></div>
                <div className="flex gap-3.5"><span className="text-slate-600 select-none min-w-4 text-right">4</span><span></span></div>
                <div className="flex gap-3.5"><span className="text-slate-600 select-none min-w-4 text-right">5</span><span><span className="text-purple-400">#define</span> <span className="text-blue-300">DRY_THRESHOLD</span> <span className="text-amber-500">300</span></span></div>
                <div className="flex gap-3.5"><span className="text-slate-600 select-none min-w-4 text-right">6</span><span></span></div>
                <div className="flex gap-3.5"><span className="text-slate-600 select-none min-w-4 text-right">7</span><span><span className="text-sky-300">void</span> <span className="text-blue-300">Irrigation_Task</span><span className="text-slate-300">(</span><span className="text-sky-300">void</span> <span className="text-slate-300">*arg) {'{'}</span></span></div>
                <div className="flex gap-3.5"><span className="text-slate-600 select-none min-w-4 text-right">8</span><span><span className="text-slate-300">&nbsp;&nbsp;</span><span className="text-sky-300">uint16_t</span> <span className="text-slate-300">moisture;</span></span></div>
                <div className="flex gap-3.5"><span className="text-slate-600 select-none min-w-4 text-right">9</span><span><span className="text-sky-300">&nbsp;&nbsp;for</span><span className="text-slate-300">(;;) {'{'}</span></span></div>
                <div className="flex gap-3.5"><span className="text-slate-600 select-none min-w-4 text-right">10</span><span><span className="text-slate-300">&nbsp;&nbsp;&nbsp;&nbsp;moisture = </span><span className="text-blue-300">ADC_Read</span><span className="text-slate-300">(CH0);</span></span></div>
                <div className="flex gap-3.5"><span className="text-slate-600 select-none min-w-4 text-right">11</span><span><span className="text-sky-300">&nbsp;&nbsp;&nbsp;&nbsp;if</span><span className="text-slate-300">(moisture {'<'} DRY_THRESHOLD)</span></span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Strip */}
      <div className="max-w-[1160px] mx-auto px-6 pb-0">
        <div className="flex flex-wrap bg-white border border-gray-200 rounded-lg overflow-hidden shadow-card">
          {[{ icon: FiCpu, val: 'ARM', lbl: 'Cortex-M4 Core' },
            { icon: FiGlobe, val: 'IoT', lbl: 'Cloud Connected' },
            { icon: FiRadio, val: 'UART/SPI/I2C', lbl: 'Protocols Covered' },
            { icon: FiLayers, val: 'RTOS', lbl: 'FreeRTOS Content' },
            { icon: FiDownload, val: 'Free', lbl: 'All Resources' },
          ].map((item, i) => (
            <div key={i} className="flex-1 min-w-[150px] py-5 px-4 text-center border-r border-gray-100 last:border-r-0 hover:bg-gray-50 transition-colors">
              <div className="text-2xl mb-1.5 flex justify-center"><item.icon className="w-6 h-6 text-primary-600" /></div>
              <div className="font-semibold text-gray-900">{item.val}</div>
              <div className="text-gray-500 text-[0.68rem]">{item.lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Projects */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[1160px] mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 mb-3 font-medium text-[0.7rem] tracking-widest uppercase text-primary-600">
                <span className="w-6 h-px bg-primary-600"></span>
                Featured Work
              </div>
              <h2 className="text-gray-900 mb-2.5 text-2xl font-bold">Featured Projects</h2>
              <p className="text-gray-600">Curated projects that build real-world embedded systems skills.</p>
            </div>
            <Link href="/projects" className="px-4 py-2 bg-white text-gray-600 border border-gray-200 rounded text-[0.72rem] font-medium hover:border-gray-300 hover:text-gray-900 transition-all">All Projects →</Link>
          </div>

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
      </section>

      {/* Latest Tutorials */}
      <section className="py-20 bg-white">
        <div className="max-w-[1160px] mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 mb-3 font-medium text-[0.7rem] tracking-widest uppercase text-primary-600">
                <span className="w-6 h-px bg-primary-600"></span>
                Learning
              </div>
              <h2 className="text-gray-900 mb-2.5 text-2xl font-bold">Latest Tutorials</h2>
              <p className="text-gray-600">Step-by-step guides from register-level basics to production RTOS patterns.</p>
            </div>
            <Link href="/tutorials" className="px-4 py-2 bg-white text-gray-600 border border-gray-200 rounded text-[0.72rem] font-medium hover:border-gray-300 hover:text-gray-900 transition-all">All Tutorials →</Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {tutorials.map((tut, i) => (
              <Link href="/tutorials" key={i} className="flex gap-4 bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 hover:shadow-card-hover hover:-translate-y-0.5 transition-all no-underline">
                <div className="w-12 h-12 bg-primary-50 border border-primary-100 rounded flex items-center justify-center text-xl shrink-0"><tut.icon className="w-6 h-6 text-primary-600" /></div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-mono text-[0.95rem] font-semibold text-gray-900 mb-1.5">{tut.title}</h3>
                  <p className="text-gray-600 text-[0.82rem] line-clamp-2 mb-2.5 leading-relaxed">{tut.desc}</p>
                  <div className="flex gap-3 items-center text-[0.72rem] text-gray-500">
                    <span>⏱ {tut.time}</span>
                    <span className={`px-2.5 py-1 rounded-sm font-mono text-[0.65rem] font-semibold tracking-wider uppercase ${
                      tut.level === 'Beginner' ? 'text-green-500 border border-green-500/30 bg-green-500/10' : 
                      tut.level === 'Intermediate' ? 'text-amber-500 border border-amber-500/30 bg-amber-500/10' : 
                      'text-red-500 border border-red-500/30 bg-red-500/10'
                    }`}>{tut.level}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* MCU Platforms */}
      <section className="py-20">
        <div className="max-w-[1160px] mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-3 font-medium text-[0.7rem] tracking-widest uppercase text-primary-600 justify-center">
              <span className="w-6 h-px bg-primary-600"></span>
              Platforms
            </div>
            <h2 className="text-slate-100 mb-2.5">Microcontroller Platforms</h2>
            <p className="mx-auto text-slate-400 max-w-[520px]">Tutorials and projects organised by microcontroller family.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[{ name: 'LPC1768', desc: 'NXP ARM Cortex-M3 at 100 MHz. The academic staple for bare-metal register-level programming.', projects: 12, tutorials: 18, icon: FiCpu },
              { name: 'STM32', desc: 'ST ARM Cortex-M4 up to 168 MHz with FPU. Industry standard with HAL/LL ecosystem.', projects: 18, tutorials: 25, icon: FiCpu },
              { name: 'Arduino', desc: 'ATmega-based prototyping platform. Beginner-friendly with massive library ecosystem.', projects: 15, tutorials: 20, icon: FiCpu },
            ].map((mcu, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-card-hover transition-all">
                <div className="text-4xl mb-3"><mcu.icon className="w-10 h-10" /></div>
                <h3 className="font-mono text-lg font-semibold text-slate-100 mb-2">{mcu.name}</h3>
                <p className="text-slate-400 text-[0.85rem] mb-4 leading-relaxed">{mcu.desc}</p>
              <Link href="/microcontrollers" className="inline-block px-4 py-1.5 bg-transparent text-teal-500 border border-teal-500 rounded text-[0.72rem] font-mono mb-4 hover:bg-teal-500/10 transition-all">Explore {mcu.name}</Link>
                <div className="flex gap-5 pt-4 border-t border-slate-700">
                  <div className="text-[0.75rem] text-gray-500"><strong className="font-semibold text-primary-600 text-base">{mcu.projects}</strong> Projects</div>
                  <div className="text-[0.75rem] text-gray-500"><strong className="font-semibold text-primary-600 text-base">{mcu.tutorials}</strong> Tutorials</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="max-w-[1160px] mx-auto px-6">
          <div className="bg-primary-600 rounded-xl p-10 text-center text-white">
            <div className="inline-flex items-center gap-2 mb-3 font-medium text-[0.7rem] tracking-widest uppercase text-white/80 justify-center">
              <span className="w-6 h-px bg-white/80"></span>
              Get Started
            </div>
            <h2 className="text-white mb-2 text-2xl font-bold">Ready to Build Something <span className="text-white">Real?</span></h2>
            <p className="text-white/80 mx-auto mb-6 max-w-[480px]">All source code, schematics, and datasheets are free. No login required.</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link href="/projects" className="px-5 py-2.5 bg-white text-primary-700 rounded font-semibold text-sm hover:bg-gray-100 transition-colors">Start a Project</Link>
              <Link href="/resources" className="px-5 py-2.5 bg-transparent text-white border border-white/30 rounded font-semibold text-sm hover:bg-white/10 transition-colors">Download Resources</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home