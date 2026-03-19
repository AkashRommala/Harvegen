'use client'

import Link from 'next/link'
import { FiZap, FiSettings, FiBookOpen, FiCpu, FiGlobe, FiRadio, FiLayers, FiDownload } from 'react-icons/fi'
import { Card, CardContent, CardTitle, CardDescription } from './ui/card'
import { Button, ButtonGroup } from './ui/button'
import { Badge } from './ui/badge'
import { ProjectImage, TutorialImage } from './ui/image'
import HeroBanner from './HeroBanner'

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

  const projects = [
    { title: 'Smart Irrigation System', desc: 'Automated soil-moisture irrigation system using ADC sensors on STM32F407. Features real-time monitoring, automatic pump control, and mobile app notifications.', tags: ['Medium', 'STM32', 'IoT'], icon: FiZap, color: 'bg-emerald-900', image: '/iot.jpeg' },
    { title: 'Driver Drowsiness Detection', desc: 'Advanced IR sensor-based eye-blink pattern recognition system on NXP LPC1768 ARM Cortex-M3. Uses machine learning algorithms for accurate detection.', tags: ['Advanced', 'LPC1768'], icon: FiZap, color: 'bg-red-900', image: '/vlsi1.jpeg' },
    { title: 'IoT Weather Station', desc: 'Complete weather monitoring solution with DHT22 temperature/humidity and BMP280 pressure sensors. Data uploaded via ESP8266 to Blynk dashboard.', tags: ['Beginner', 'Arduino', 'IoT'], icon: FiGlobe, color: 'bg-slate-800', image: '/iot2.jpg' },
  ]

  const tutorials = [
    { title: 'GPIO: Input, Output & EXTI Interrupts', desc: 'Complete guide to configuring digital I/O on STM32 at register level. Learn to handle button inputs, LED control, and external interrupt handling.', time: '25 min', level: 'Beginner', icon: FiSettings, image: '/iot3.jpg' },
    { title: 'UART: From Config to Circular Buffers', desc: 'Master UART communication from basic configuration to advanced interrupt-driven receiver with efficient circular buffer implementation.', time: '35 min', level: 'Intermediate', icon: FiRadio, image: '/iot2.jpg' },
    { title: 'FreeRTOS: Tasks, Queues & Semaphores', desc: 'Deep dive into real-time operating systems. Create tasks, share data safely with queues, and synchronize using semaphores and mutexes.', time: '55 min', level: 'Advanced', icon: FiLayers, image: '/vlsi 2.jpg' },
  ]

  return (
    <>
      {/* Hero Banner Component */}
      <HeroBanner />

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
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((proj, i) => (
              <article key={i} className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:border-primary-500 hover:-translate-y-1 transition-all duration-300">
                <div className="h-[180px] bg-gradient-to-br from-primary-50 to-primary-100 shadow-sm flex items-center justify-center overflow-hidden relative">
                  <img src={proj.image} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6 pb-0">
                  <div className="flex gap-2 flex-wrap mb-3">
                    {proj.tags.map((tag, j) => (
                      <span key={j} className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider uppercase border ${
                        tag === 'Beginner' ? 'text-emerald-700 border-emerald-200 bg-emerald-50' : 
                        tag === 'Medium' ? 'text-amber-700 border-amber-200 bg-amber-50' : 
                        tag === 'Advanced' ? 'text-red-700 border-red-200 bg-red-50' : 
                        'text-[#1e3a8a] border-[#1e3a8a]/20 bg-[#1e3a8a]/10'
                      }`}>{tag}</span>
                    ))}
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">{proj.title}</h3>
                </div>
                <div className="p-6 flex justify-between items-center border-t border-gray-100 bg-gray-50/50">
                  <span className="text-xs text-gray-500 font-medium">{proj.tags[1] || proj.tags[0]}</span>
                  <Button variant="default" size="sm" onClick={() => toast('Full article coming soon!', 'info')} className="shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">View Project</Button>
                </div>
              </article>
            ))}
          </div>

          {/* All Projects Button */}
          <div className="mt-12 flex justify-center">
            <Button href="/projects" variant="secondary" size="lg" className="bg-white text-primary-600 hover:bg-gray-100 shadow-lg hover:shadow-xl px-8 py-4 text-base md:text-lg">
              All Projects →
            </Button>
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

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {tutorials.map((tut, i) => (
              <Link href="/tutorials" key={i} className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:border-primary-500 hover:-translate-y-1 transition-all duration-300 no-underline">
                <div className="h-[160px] bg-gradient-to-br from-primary-50 to-primary-100 shadow-sm flex items-center justify-center overflow-hidden relative">
                  <img src={tut.image} alt={tut.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <tut.icon className="w-5 h-5 text-[#1e3a8a]" />
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex gap-2 flex-wrap mb-3">
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold tracking-wider uppercase border ${
                      tut.level === 'Beginner' ? 'text-emerald-700 border-emerald-200 bg-emerald-50' : 
                      tut.level === 'Intermediate' ? 'text-amber-700 border-amber-200 bg-amber-50' : 
                      'text-red-700 border border-red-200 bg-red-50'
                    }`}>{tut.level}</span>
                  </div>
                  <h3 className="font-bold text-base text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">{tut.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3 leading-relaxed">{tut.desc}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <span className="text-[#1e3a8a] font-bold">⏱</span> {tut.time}
                    </span>
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
            {[{ name: 'LPC1768', desc: 'NXP ARM Cortex-M3 running at 100 MHz. The academic standard for learning bare-metal register-level programming with comprehensive peripheral support including ADC, UART, SPI, I2C, PWM, and timers.', projects: 12, tutorials: 18, icon: FiCpu, tags: ['ARM', 'Cortex-M3', 'Academic'] },
              { name: 'STM32', desc: 'ST Microelectronics ARM Cortex-M4 processor with DSP instructions and FPU. Running up to 168 MHz with industry-standard HAL/LL libraries. Perfect for advanced embedded applications.', projects: 18, tutorials: 25, icon: FiCpu, tags: ['ARM', 'Cortex-M4', 'Industry'] },
              { name: 'Arduino', desc: 'ATmega-based prototyping platform. Beginner-friendly with massive library ecosystem and thousands of available shields. Ideal for rapid prototyping and IoT projects.', projects: 15, tutorials: 20, icon: FiCpu, tags: ['ATmega', 'Beginner', 'Popular'] },
            ].map((mcu, i) => (
              <div key={i} className="group bg-white border border-gray-200 rounded-2xl p-8 shadow-md hover:shadow-2xl hover:border-primary-500 hover:-translate-y-1 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <mcu.icon className="w-8 h-8 text-primary-600" />
                </div>
                <div className="flex gap-2 flex-wrap mb-3">
                  {mcu.tags.map((tag, j) => (
                    <span key={j} className="px-3 py-1 rounded-lg text-xs font-bold tracking-wider uppercase bg-[#1e3a8a]/10 text-[#1e3a8a] border border-[#1e3a8a]/20">{tag}</span>
                  ))}
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">{mcu.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{mcu.desc}</p>
                <Link href="/microcontrollers" className="inline-block px-8 py-4 bg-[#1e3a8a] text-white rounded-xl text-sm font-bold hover:bg-[#1e40af] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">Explore {mcu.name} →</Link>
                <div className="flex gap-6 pt-6 mt-6 border-t border-gray-200">
                  <div className="text-center">
                    <div className="font-bold text-2xl text-[#1e3a8a]">{mcu.projects}</div>
                    <div className="text-gray-500 text-xs tracking-wider uppercase font-medium">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-2xl text-[#1e3a8a]">{mcu.tutorials}</div>
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