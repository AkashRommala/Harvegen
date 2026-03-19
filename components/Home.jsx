'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FiZap, FiSettings, FiBookOpen, FiCpu, FiGlobe, FiRadio, FiLayers, FiDownload } from 'react-icons/fi'
import { Card, CardContent, CardTitle, CardDescription } from './ui/card'
import { Button, ButtonGroup } from './ui/button'
import { Badge } from './ui/badge'
import { ProjectImage, TutorialImage } from './ui/image'

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
    { title: 'Smart Irrigation System', desc: 'Automated soil-moisture irrigation using ADC sensors on STM32F407.', tags: ['Medium', 'STM32', 'IoT'], icon: FiZap, color: 'bg-emerald-900', image: '/iot.jpeg' },
    { title: 'Driver Drowsiness Detection', desc: 'IR sensor eye-blink pattern recognition on NXP LPC1768 ARM Cortex-M3.', tags: ['Advanced', 'LPC1768'], icon: FiZap, color: 'bg-red-900', image: '/vlsi1.jpeg' },
    { title: 'IoT Weather Station', desc: 'DHT22 + BMP280 with ESP8266 Wi-Fi uploading to Blynk dashboard.', tags: ['Beginner', 'Arduino', 'IoT'], icon: FiGlobe, color: 'bg-slate-800', image: '/iot2.jpg' },
  ]

  const tutorials = [
    { title: 'GPIO: Input, Output & EXTI Interrupts', desc: 'Configure digital I/O on STM32 at register level.', time: '25 min', level: 'Beginner', icon: FiSettings },
    { title: 'UART: From Config to Circular Buffers', desc: 'Set baud rate, interrupt-driven RX, implement ring buffer.', time: '35 min', level: 'Intermediate', icon: FiRadio },
    { title: 'FreeRTOS: Tasks, Queues & Semaphores', desc: 'Create tasks, share data with queues, synchronise with semaphores.', time: '55 min', level: 'Advanced', icon: FiLayers },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-[120px] pb-20 relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-primary-50/30">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/3 via-primary-500/8 to-transparent rounded-full blur-3xl animate-gradient"></div>
        <div className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-r from-primary-500/15 to-primary-500/8 top-1/2 left-1/2 -translate-x-3/5 -translate-y-2/5 pointer-events-none animate-float"></div>
        <div className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 top-1/4 right-1/4 pointer-events-none animate-float" style={{animationDelay: '2s'}}></div>
        
        <div className="max-w-[1400px] mx-auto px-8 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary-50/80 backdrop-blur-sm border border-primary-200/50 rounded-full text-sm tracking-wider uppercase text-primary-700 font-semibold shadow-lg animate-fade-in">
                <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
                Open Source · Free Forever · v2.0
              </div>

              <div className="space-y-6">
                <h1 className="text-gray-900 font-display text-6xl md:text-7xl font-bold leading-tight animate-fade-in" style={{animationDelay: '0.1s'}}>
                  Embedded<br/>
                  <span className="text-primary-600">Projects Hub</span>
                </h1>

                <p className="text-gray-600 text-xl md:text-2xl max-w-[600px] leading-relaxed animate-slide-up" style={{animationDelay: '0.2s'}}>
                  Learn Embedded Systems through Practical Projects —
                  from blinking LEDs to <strong className="text-primary-600">{typeText}<span className="inline-block w-2 h-6 bg-primary-500 align-middle ml-1 animate-pulse"></span></strong>
                </p>
              </div>

              <div className="flex gap-4 flex-wrap animate-slide-up" style={{animationDelay: '0.3s'}}>
                <Button href="/projects" variant="default" size="lg" className="shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">Browse Projects</Button>
                <Button href="/tutorials" variant="secondary" size="lg" className="shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">Start Learning</Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-gray-200/50 animate-slide-up" style={{animationDelay: '0.4s'}}>
                <div className="text-center">
                  <div className="font-bold text-4xl text-gray-900 mb-2">40+</div>
                  <div className="text-gray-600 text-sm tracking-wider uppercase font-medium">Projects</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-4xl text-gray-900 mb-2">60+</div>
                  <div className="text-gray-600 text-sm tracking-wider uppercase font-medium">Tutorials</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-4xl text-gray-900 mb-2">3</div>
                  <div className="text-gray-600 text-sm tracking-wider uppercase font-medium">MCU Platforms</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-4xl text-gray-900 mb-2">100%</div>
                  <div className="text-gray-600 text-sm tracking-wider uppercase font-medium">Free</div>
                </div>
              </div>
            </div>

            {/* Right: Terminal */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-all duration-300 animate-slide-up" style={{animationDelay: '0.5s'}}>
              <div className="flex items-center gap-2 py-3 px-5 bg-gray-800/60 backdrop-blur-sm border-b border-gray-700">
                <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-lg"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg"></div>
                <span className="ml-3 font-mono text-sm text-gray-400 font-medium">irrigation_main.c — STM32F407</span>
              </div>
              <div className="p-6 font-mono text-sm leading-[2] bg-gray-950">
                <div className="flex gap-4"><span className="text-slate-600 select-none min-w-5 text-right">1</span><span><span className="text-slate-500 italic">/* Smart Irrigation System */</span></span></div>
                <div className="flex gap-4"><span className="text-slate-600 select-none min-w-5 text-right">2</span><span><span className="text-purple-400">#include</span> <span className="text-green-400">{'&lt;stm32f4xx_hal.h&gt;'}</span></span></div>
                <div className="flex gap-4"><span className="text-slate-600 select-none min-w-5 text-right">3</span><span><span className="text-purple-400">#include</span> <span className="text-green-400">"sensor_adc.h"</span></span></div>
                <div className="flex gap-4"><span className="text-slate-600 select-none min-w-5 text-right">4</span><span></span></div>
                <div className="flex gap-4"><span className="text-slate-600 select-none min-w-5 text-right">5</span><span><span className="text-purple-400">#define</span> <span className="text-blue-300">DRY_THRESHOLD</span> <span className="text-amber-400">300</span></span></div>
                <div className="flex gap-4"><span className="text-slate-600 select-none min-w-5 text-right">6</span><span></span></div>
                <div className="flex gap-4"><span className="text-slate-600 select-none min-w-5 text-right">7</span><span><span className="text-sky-300">void</span> <span className="text-blue-300">Irrigation_Task</span><span className="text-slate-300">(</span><span className="text-sky-300">void</span> <span className="text-slate-300">*arg) {'{'}</span></span></div>
                <div className="flex gap-4"><span className="text-slate-600 select-none min-w-5 text-right">8</span><span><span className="text-slate-300">&nbsp;&nbsp;</span><span className="text-sky-300">uint16_t</span> <span className="text-slate-300">moisture;</span></span></div>
                <div className="flex gap-4"><span className="text-slate-600 select-none min-w-5 text-right">9</span><span><span className="text-sky-300">&nbsp;&nbsp;for</span><span className="text-slate-300">(;;) {'{'}</span></span></div>
                <div className="flex gap-4"><span className="text-slate-600 select-none min-w-5 text-right">10</span><span><span className="text-slate-300">&nbsp;&nbsp;&nbsp;&nbsp;moisture = </span><span className="text-blue-300">ADC_Read</span><span className="text-slate-300">(CH0);</span></span></div>
                <div className="flex gap-4"><span className="text-slate-600 select-none min-w-5 text-right">11</span><span><span className="text-sky-300">&nbsp;&nbsp;&nbsp;&nbsp;if</span><span className="text-slate-300">(moisture {'<'} DRY_THRESHOLD)</span></span></div>
                <div className="flex gap-4"><span className="text-slate-600 select-none min-w-5 text-right">12</span><span><span className="text-slate-300">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;HAL_GPIO_WritePin</span><span className="text-slate-300">(GPIOA, GPIO_PIN_5, GPIO_PIN_SET);</span></span></div>
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
      <section className="py-24 bg-gradient-to-br from-gray-50 to-slate-50">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="flex justify-between items-end mb-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-3 mb-4 font-semibold text-sm tracking-widest uppercase text-primary-600">
                <span className="w-8 h-px bg-primary-600"></span>
                Featured Work
              </div>
              <h2 className="text-gray-900 mb-4 text-4xl font-bold">Featured Projects</h2>
              <p className="text-gray-600 text-lg leading-relaxed">Curated projects that build real-world embedded systems skills from the ground up.</p>
            </div>
            <Link href="/projects" className="px-6 py-3 bg-white text-gray-700 border border-gray-200 rounded-lg text-sm font-semibold hover:border-gray-300 hover:text-gray-900 hover:shadow-lg transition-all shadow-md">All Projects →</Link>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((proj, i) => (
              <article key={i} className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-primary-300 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="h-[180px] bg-gradient-to-br from-primary-50 to-primary-100 shadow-sm flex items-center justify-center overflow-hidden relative">
                  <img src={proj.image} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6 pb-0">
                  <div className="flex gap-2 flex-wrap mb-3">
                    {proj.tags.map((tag, j) => (
                      <span key={j} className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold tracking-wider uppercase border ${
                        tag === 'Beginner' ? 'text-emerald-700 border-emerald-200 bg-emerald-50' : 
                        tag === 'Medium' ? 'text-amber-700 border-amber-200 bg-amber-50' : 
                        tag === 'Advanced' ? 'text-red-700 border-red-200 bg-red-50' : 
                        'text-blue-700 border-blue-200 bg-blue-50'
                      }`}>{tag}</span>
                    ))}
                  </div>
                  <h3 className="font-mono text-lg font-bold text-slate-900 mb-3 group-hover:text-primary-700 transition-colors">{proj.title}</h3>
                </div>
                <div className="p-6 flex justify-between items-center border-t border-slate-200 bg-slate-50/50">
                  <span className="font-mono text-xs text-slate-500 font-medium">{proj.tags[1] || proj.tags[0]}</span>
                  <Button variant="outline" size="sm" onClick={() => toast('Full article coming soon!', 'info')} className="shadow-sm hover:shadow-md">Read More</Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Tutorials */}
      <section className="py-24 bg-gradient-to-br from-white to-slate-50">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="flex justify-between items-end mb-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-3 mb-4 font-semibold text-sm tracking-widest uppercase text-primary-600">
                <span className="w-8 h-px bg-primary-600"></span>
                Learning Path
              </div>
              <h2 className="text-gray-900 mb-4 text-4xl font-bold">Latest Tutorials</h2>
              <p className="text-gray-600 text-lg leading-relaxed">Step-by-step guides from register-level basics to production RTOS patterns.</p>
            </div>
            <Link href="/tutorials" className="px-6 py-3 bg-white text-gray-700 border border-gray-200 rounded-lg text-sm font-semibold hover:border-gray-300 hover:text-gray-900 hover:shadow-lg transition-all shadow-md">All Tutorials →</Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tutorials.map((tut, i) => (
              <Link href="/tutorials" key={i} className="group flex gap-5 bg-white border border-slate-200 rounded-2xl p-6 hover:border-primary-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 no-underline">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200 rounded-xl flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <tut.icon className="w-7 h-7 text-primary-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-mono text-base font-bold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors line-clamp-2">{tut.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3 leading-relaxed">{tut.desc}</p>
                  <div className="flex gap-4 items-center text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <span className="text-primary-500">⏱</span> {tut.time}
                    </span>
                    <span className={`px-3 py-1 rounded-lg font-mono text-xs font-bold tracking-wider uppercase ${
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
      </section>

      {/* MCU Platforms */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-4 font-semibold text-sm tracking-widest uppercase text-primary-600 justify-center">
              <span className="w-8 h-px bg-primary-600"></span>
              Platforms
            </div>
            <h2 className="text-gray-900 mb-4 text-4xl font-bold">Microcontroller Platforms</h2>
            <p className="mx-auto text-gray-600 text-lg max-w-[600px] leading-relaxed">Tutorials and projects organised by microcontroller family.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[{ name: 'LPC1768', desc: 'NXP ARM Cortex-M3 at 100 MHz. The academic staple for bare-metal register-level programming.', projects: 12, tutorials: 18, icon: FiCpu },
              { name: 'STM32', desc: 'ST ARM Cortex-M4 up to 168 MHz with FPU. Industry standard with HAL/LL ecosystem.', projects: 18, tutorials: 25, icon: FiCpu },
              { name: 'Arduino', desc: 'ATmega-based prototyping platform. Beginner-friendly with massive library ecosystem.', projects: 15, tutorials: 20, icon: FiCpu },
            ].map((mcu, i) => (
              <div key={i} className="group bg-white border border-slate-200 rounded-2xl p-8 hover:border-primary-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <mcu.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="font-mono text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors">{mcu.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{mcu.desc}</p>
                <Link href="/microcontrollers" className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg">Explore {mcu.name}</Link>
                <div className="flex gap-6 pt-6 mt-6 border-t border-slate-200">
                  <div className="text-center">
                    <div className="font-bold text-2xl text-primary-600">{mcu.projects}</div>
                    <div className="text-gray-500 text-xs tracking-wider uppercase font-medium">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-2xl text-primary-600">{mcu.tutorials}</div>
                    <div className="text-gray-500 text-xs tracking-wider uppercase font-medium">Tutorials</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
              <h2 className="text-white mb-6 text-4xl font-bold">Ready to Build Something <span className="text-yellow-300">Real?</span></h2>
              <p className="text-white/90 mx-auto mb-8 max-w-[600px] text-lg leading-relaxed">All source code, schematics, and datasheets are free. No login required.</p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button href="/projects" variant="secondary" size="lg" className="bg-white text-primary-600 hover:bg-gray-100 shadow-lg hover:shadow-xl">Start a Project</Button>
                <Button href="/resources" variant="ghost" size="lg" className="bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm">Download Resources</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home