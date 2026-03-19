'use client'

import Link from 'next/link'
import { FiDownload, FiBookOpen, FiArrowRight, FiGithub, FiFileText, FiTool, FiCode, FiDatabase } from 'react-icons/fi'
import { Card, CardContent, CardTitle, CardDescription } from './ui/card'
import { Button, ButtonGroup } from './ui/button'
import { Badge } from './ui/badge'
import { ProjectImage } from './ui/image'

function Resources() {
  return (
    <>
      {/* Page Hero */}
      <header className="pt-[120px] pb-15 relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-blue-500/10 to-transparent rounded-full blur-3xl animate-gradient"></div>
        <div className="absolute w-[600px] h-[400px] rounded-full bg-gradient-to-r from-blue-500/20 to-blue-500/10 top-0 left-1/2 -translate-x-1/2 pointer-events-none animate-float"></div>
        <div className="max-w-[1160px] mx-auto px-6">
          <div className="text-[0.72rem] text-slate-500 mb-4 font-mono">
            <Link href="/" className="text-slate-400 hover:text-blue-500">index</Link> <span>/ resources</span>
          </div>
          <div className="inline-flex items-center gap-2 mb-3 font-mono text-[0.7rem] tracking-widest uppercase text-blue-500">
            <span className="w-6 h-px bg-blue-500"></span>
            Downloads
          </div>
          <h1 className="mb-3 text-slate-900 font-display">Free Resources<br/><span className="text-blue-500">& Downloads</span></h1>
          <p className="text-slate-400 max-w-[520px]">Source code, datasheets, circuit schematics, and development tools. Everything you need — no sign-up required.</p>
        </div>
      </header>

      <main className="pb-20">
        <div className="max-w-[1160px] mx-auto px-6 pt-12">
          {/* GitHub Banner */}
          <div className="flex items-center gap-6 bg-gradient-to-r from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-xl p-7 mb-12 flex-wrap">
            <div className="w-16 h-16 bg-white/10 border border-blue-500/30 rounded-xl flex items-center justify-center text-2xl">
              <FiGithub className="text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-mono text-base font-semibold text-slate-100 mb-1">All Source Code is on GitHub</h3>
              <p className="text-slate-400 text-[0.82rem]">Every project and tutorial has a companion GitHub repo. Fork, clone, and contribute — MIT Licensed.</p>
              <div className="flex gap-3 mt-3.5">
                <Button variant="default" size="default" icon="github" href="https://github.com" target="_blank">
                  View on GitHub
                </Button>
                <Button variant="outline" size="default" icon="download">
                  Download All
                </Button>
              </div>
            </div>
          </div>

          {/* Source Code Section */}
          <section className="py-13 border-b border-slate-700">
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 mb-3 font-mono text-[0.7rem] tracking-widest uppercase text-blue-500">
                <span className="w-6 h-px bg-blue-500"></span>
                Source Code
              </div>
              <h2 className="text-slate-100 text-2xl font-bold mb-2">Project Source Code</h2>
              <p className="text-slate-400 text-[0.9rem]">Complete, well-documented source code for all projects with build instructions and dependencies.</p>
            </div>
            <div className="grid gap-4">
              {[
                { 
                  name: 'Smart Irrigation System — STM32F407', 
                  meta: 'Keil µVision Project · 2.3 MB · C / HAL',
                  description: 'Complete source code with sensor integration, relay control, and cloud connectivity.',
                  tags: ['STM32', 'C', 'HAL', 'IoT']
                },
                { 
                  name: 'Driver Drowsiness Detection — LPC1768', 
                  meta: 'Keil µVision Project · 1.8 MB · Bare-Metal C',
                  description: 'IR sensor array processing with pattern recognition algorithms and alert system.',
                  tags: ['LPC1768', 'C', 'Bare-Metal', 'Safety']
                },
                { 
                  name: 'IoT Weather Station — Arduino + ESP8266', 
                  meta: 'Arduino IDE Sketch · 890 KB · C++',
                  description: 'Sensor fusion implementation with Blynk dashboard integration.',
                  tags: ['Arduino', 'C++', 'ESP8266', 'Blynk']
                },
                {
                  name: 'Autonomous Rover — STM32F411 + FreeRTOS',
                  meta: 'STM32CubeIDE Project · 3.1 MB · C',
                  description: 'Multi-task obstacle avoidance with path planning and sensor fusion.',
                  tags: ['STM32', 'FreeRTOS', 'C', 'Robotics']
                }
              ].map((res, i) => (
                <div key={i} className="flex items-center gap-6 bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all group">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-blue-500/10 border border-blue-500/30 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    <FiCode className="text-blue-400 text-2xl" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-mono text-[1rem] font-semibold text-slate-100">{res.name}</h4>
                      <span className="px-2 py-1 bg-slate-700 border border-slate-600 rounded text-[0.65rem] text-slate-300 font-mono">{res.meta}</span>
                    </div>
                    <p className="text-slate-400 text-[0.85rem] mb-3">{res.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {res.tags.map((tag, j) => (
                        <span key={j} className="px-2 py-1 bg-blue-500/10 border border-blue-500/30 rounded text-[0.65rem] text-blue-400 font-mono">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" icon="download">
                      Download
                    </Button>
                    <Button variant="ghost" size="sm" icon="github">
                      View Code
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Datasheets Section */}
          <section className="py-13 border-b border-slate-700">
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 mb-3 font-mono text-[0.7rem] tracking-widest uppercase text-blue-500">
                <span className="w-6 h-px bg-blue-500"></span>
                Documentation
              </div>
              <h2 className="text-slate-100 text-2xl font-bold mb-2">MCU & Component Datasheets</h2>
              <p className="text-slate-400 text-[0.9rem]">Official documentation for all microcontrollers and components used in our projects.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { 
                  name: 'LPC1768 User Manual — NXP UM10360', 
                  meta: 'PDF · 840 pages · NXP Semiconductors',
                  description: 'Complete reference for LPC1768 ARM Cortex-M3 microcontroller.',
                  size: '840 pages'
                },
                { 
                  name: 'STM32F407 Reference Manual — ST RM0090', 
                  meta: 'PDF · 1747 pages · STMicroelectronics',
                  description: 'Comprehensive guide for STM32F407 series microcontrollers.',
                  size: '1747 pages'
                },
                { 
                  name: 'ATmega328P Datasheet — Microchip DS40002061', 
                  meta: 'PDF · 660 pages · Microchip Technology',
                  description: 'Official datasheet for Arduino Uno\'s main microcontroller.',
                  size: '660 pages'
                },
                {
                  name: 'ESP8266 WiFi Module Datasheet',
                  meta: 'PDF · 156 pages · Espressif Systems',
                  description: 'Complete specifications for ESP8266 WiFi connectivity module.',
                  size: '156 pages'
                }
              ].map((res, i) => (
                <div key={i} className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-slate-600/20 to-slate-600/10 border border-slate-600/30 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                      <FiFileText className="text-slate-400 text-xl" />
                    </div>
                    <div>
                      <h4 className="font-mono text-[0.95rem] font-semibold text-slate-100 mb-1">{res.name}</h4>
                      <p className="text-slate-400 text-[0.8rem]">{res.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-slate-700 border border-slate-600 rounded text-[0.65rem] text-slate-300 font-mono">{res.meta}</span>
                    <Button variant="outline" size="sm" icon="fileText">
                      Download PDF
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Tools Section */}
          <section className="py-13">
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 mb-3 font-mono text-[0.7rem] tracking-widest uppercase text-blue-500">
                <span className="w-6 h-px bg-blue-500"></span>
                Toolchain
              </div>
              <h2 className="text-slate-100 text-2xl font-bold mb-2">Recommended Development Tools</h2>
              <p className="text-slate-400 text-[0.9rem]">Professional-grade tools and IDEs for embedded systems development.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  name: 'STM32CubeIDE', 
                  desc: 'Free Eclipse-based IDE from ST with code generation, HAL libraries, and integrated GDB debugger.',
                  badge: 'Free · st.com',
                  features: ['Code Generation', 'HAL Libraries', 'GDB Debugger', 'FreeRTOS Support']
                },
                { 
                  name: 'Keil µVision 5', 
                  desc: 'Industry-standard ARM IDE. Free with 32 KB code limit.',
                  badge: 'Free (limited) · keil.com',
                  features: ['Professional Debugging', 'RTOS Support', 'Extensive Libraries', 'Industry Standard']
                },
                { 
                  name: 'Arduino IDE 2.x', 
                  desc: 'Modern IDE with integrated debugger, board manager, library manager.',
                  badge: 'Free · arduino.cc',
                  features: ['Beginner Friendly', 'Integrated Debugger', 'Library Manager', 'Cross Platform']
                },
                { 
                  name: 'PlatformIO', 
                  desc: 'VS Code extension with 1000+ boards, unified build system.',
                  badge: 'Free · platformio.org',
                  features: ['VS Code Integration', '1000+ Boards', 'Unified Build System', 'Modern Toolchain']
                },
                {
                  name: 'STM32CubeMX',
                  desc: 'Graphical tool for configuring STM32 microcontrollers and generating initialization code.',
                  badge: 'Free · st.com',
                  features: ['Pin Configuration', 'Clock Tree', 'Middleware Integration', 'Code Generation']
                },
                {
                  name: 'Oscilloscope Software',
                  desc: 'PC-based oscilloscope and logic analyzer tools for debugging and analysis.',
                  badge: 'Various Options',
                  features: ['Signal Analysis', 'Protocol Decoding', 'Data Logging', 'Real-time Monitoring']
                }
              ].map((tool, i) => (
                <div key={i} className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all group hover:shadow-lg hover:shadow-slate-900/20">
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                    <FiTool className="text-slate-400" />
                  </div>
                  <h4 className="font-mono text-[1rem] font-semibold text-slate-100 mb-2">{tool.name}</h4>
                  <p className="text-slate-400 text-[0.8rem] mb-4 leading-relaxed">{tool.desc}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {tool.features.map((feature, j) => (
                      <span key={j} className="px-2 py-1 bg-slate-700 border border-slate-600 rounded text-[0.6rem] text-slate-300 font-mono">{feature}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[0.65rem] text-blue-400">{tool.badge}</span>
                    <Button variant="outline" size="sm" icon="arrowRight">
                      Get Started
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Links Section */}
          <section className="py-13">
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 mb-3 font-mono text-[0.7rem] tracking-widest uppercase text-blue-500">
                <span className="w-6 h-px bg-blue-500"></span>
                Quick Links
              </div>
              <h2 className="text-slate-100 text-2xl font-bold mb-2">Additional Resources</h2>
              <p className="text-slate-400 text-[0.9rem]">Quick access to commonly needed resources and documentation.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-500/20 border border-blue-500/30 rounded-lg flex items-center justify-center">
                    <FiCode className="text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-mono text-[0.9rem] font-semibold text-slate-100">Code Examples</h4>
                    <p className="text-slate-400 text-[0.75rem]">Ready-to-use code snippets</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    GPIO Examples
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    UART Examples
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    Timer Examples
                  </Button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center justify-center">
                    <FiDatabase className="text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-mono text-[0.9rem] font-semibold text-slate-100">Component Libraries</h4>
                    <p className="text-slate-400 text-[0.75rem]">Libraries and drivers</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    Sensor Libraries
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    Display Drivers
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    Communication Protocols
                  </Button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-500/20 border border-purple-500/30 rounded-lg flex items-center justify-center">
                    <FiTool className="text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-mono text-[0.9rem] font-semibold text-slate-100">Development Tools</h4>
                    <p className="text-slate-400 text-[0.75rem]">Utilities and helpers</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    Pinout Tools
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    Clock Calculators
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    Memory Maps
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}

export default Resources
