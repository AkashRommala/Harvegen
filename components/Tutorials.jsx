'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FiSettings, FiBookOpen, FiCpu, FiGlobe, FiRadio, FiLayers, FiDownload, FiClock, FiTarget, FiCode } from 'react-icons/fi'
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
  const [activeTab, setActiveTab] = useState('c')

  const tutorials = {
    all: [
      { title: 'Introduction to Embedded C', desc: 'Data types, bitwise operations, memory layout and direct hardware register access.', time: '20 min', level: 'Beginner', icon: FiBookOpen, image: '/vlsi 2.jpeg', slug: 'introduction-to-embedded-c' },
      { title: 'GPIO: Input, Output & EXTI Interrupts', desc: 'Configure digital I/O, pull-up resistors, debounce, and external interrupt lines on STM32.', time: '25 min', level: 'Beginner', icon: FiSettings, image: '/iot3.jpg', slug: 'gpio-input-output-exti-interrupts' },
      { title: 'Timers & PWM Generation', desc: 'Timer modes, prescaler, ARR. Generate PWM for LED dimming and motor speed control.', time: '30 min', level: 'Intermediate', icon: FiClock, image: '/vlsi1.jpeg', slug: 'timers-pwm-generation' },
      { title: 'UART: From Config to Circular Buffers', desc: 'Set baud rate, interrupt RX, ring buffer, and serial debugging on LPC1768 and STM32.', time: '35 min', level: 'Intermediate', icon: FiRadio, image: '/vlsi 2.jpg', slug: 'uart-from-config-to-circular-buffers' },
      { title: 'FreeRTOS: Tasks & Scheduling', desc: 'Create tasks, understand preemptive scheduling, priorities, and the tick timer.', time: '50 min', level: 'Advanced', icon: FiLayers, image: '/iot2.jpg', slug: 'freertos-tasks-scheduling' },
      { title: 'DMA: Zero-CPU Peripheral Transfers', desc: 'Configure DMA for UART, ADC, and SPI to maximise MCU throughput without polling.', time: '45 min', level: 'Advanced', icon: FiDownload, image: '/iot.jpeg', slug: 'dma-zero-cpu-peripheral-transfers' },
    ],
    c: [
      { title: 'Introduction to Embedded C', desc: 'Data types, bitwise operations, memory layout and direct hardware register access.', time: '20 min', level: 'Beginner', icon: FiBookOpen, image: '/vlsi 2.jpeg', slug: 'introduction-to-embedded-c' },
      { title: 'Pointers & Memory in Embedded C', desc: 'Stack vs heap, volatile keyword, const correctness, and memory-mapped registers.', time: '30 min', level: 'Intermediate', icon: FiTarget, image: '/vlsi 2.jpg', slug: 'pointers-memory-embedded-c' },
      { title: 'Bitwise Operations Deep Dive', desc: 'AND, OR, XOR, shifts, bit masking techniques for register configuration.', time: '25 min', level: 'Beginner', icon: FiSettings, image: '/iot3.jpg', slug: 'bitwise-operations-deep-dive' },
      { title: 'Structures & Unions in Embedded Systems', desc: 'Pack alignment, bit-fields, and creating register maps with structures.', time: '35 min', level: 'Intermediate', icon: FiLayers, image: '/vlsi1.jpeg', slug: 'structures-unions-embedded' },
      { title: 'Interrupt Handling & ISR Design', desc: 'Writing interrupt service routines, context saving, and critical sections.', time: '40 min', level: 'Advanced', icon: FiCpu, image: '/iot.jpeg', slug: 'interrupt-handling-isr-design' },
      { title: 'Memory Management in Embedded', desc: 'Flash, SRAM, EEPROM usage, linker scripts, and memory optimization.', time: '45 min', level: 'Advanced', icon: FiDownload, image: '/iot2.jpg', slug: 'memory-management-embedded' },
      { title: 'Preprocessor Directives & Macros', desc: '#define, #ifdef, inline functions, and creating efficient macros.', time: '25 min', level: 'Beginner', icon: FiCode, image: '/vlsi 2.jpeg', slug: 'preprocessor-directives-macros' },
      { title: 'Fixed-Point Arithmetic', desc: 'Q format, scaling, and implementing DSP algorithms without FPU.', time: '40 min', level: 'Advanced', icon: FiTarget, image: '/iot3.jpg', slug: 'fixed-point-arithmetic' },
      { title: 'Error Handling & Asserts', desc: 'Debug assertions, error codes, and writing robust firmware.', time: '20 min', level: 'Beginner', icon: FiSettings, image: '/vlsi1.jpeg', slug: 'error-handling-asserts' },
      { title: 'Code Optimization Techniques', desc: 'Loop unrolling, function inlining, and reducing code size.', time: '35 min', level: 'Intermediate', icon: FiLayers, image: '/iot.jpeg', slug: 'code-optimization-techniques' },
      { title: 'Linker Scripts & Memory Maps', desc: 'Understanding linker scripts, sections, and memory layout.', time: '45 min', level: 'Advanced', icon: FiDownload, image: '/iot2.jpg', slug: 'linker-scripts-memory-maps' },
      { title: 'Startup Code & Boot Process', desc: 'Reset handler, vector table, and initializing variables before main.', time: '40 min', level: 'Advanced', icon: FiCpu, image: '/vlsi 2.jpg', slug: 'startup-code-boot-process' },
      { title: 'Writing Clean Embedded C', desc: 'Naming conventions, code organization, and best practices.', time: '30 min', level: 'Beginner', icon: FiBookOpen, image: '/iot3.jpg', slug: 'writing-clean-embedded-c' },
      { title: 'Unit Testing for Embedded', desc: 'Unity test framework, mocking hardware, and TDD for firmware.', time: '50 min', level: 'Intermediate', icon: FiTarget, image: '/vlsi1.jpeg', slug: 'unit-testing-embedded' },
      { title: 'Debugging with GDB & OpenOCD', desc: 'JTAG debugging, breakpoints, and inspecting memory.', time: '45 min', level: 'Intermediate', icon: FiSettings, image: '/iot.jpeg', slug: 'debugging-gdb-openocd' },
    ],
    basics: [
      { title: 'GPIO: Input, Output & Interrupts', desc: 'Configure GPIO, debounce switches, and set up external interrupts on STM32.', time: '25 min', level: 'Beginner', icon: FiSettings, image: '/iot3.jpg', slug: 'gpio-input-output-exti-interrupts' },
      { title: 'Timers & PWM Generation', desc: 'Timer modes, prescaler, ARR. Generate PWM for LED dimming and motor control.', time: '30 min', level: 'Intermediate', icon: FiClock, image: '/vlsi1.jpeg', slug: 'timers-pwm-generation' },
      { title: 'ADC: Analog-to-Digital Conversion', desc: 'ADC configuration, sampling rates, DMA-based acquisition and sensor interfacing.', time: '35 min', level: 'Intermediate', icon: FiCpu, image: '/vlsi 2.jpeg', slug: 'adc-analog-to-digital-conversion' },
      { title: 'Watchdog Timer Implementation', desc: 'IWDG and WWDG configuration, preventing system lockups in critical applications.', time: '25 min', level: 'Intermediate', icon: FiTarget, image: '/iot2.jpg', slug: 'watchdog-timer-implementation' },
      { title: 'Clock Configuration & PLL Setup', desc: 'HSE, HSI, PLL configuration for optimal MCU performance and power management.', time: '40 min', level: 'Advanced', icon: FiLayers, image: '/iot.jpeg', slug: 'clock-configuration-pll-setup' },
      { title: 'Low Power Modes & Sleep', desc: 'Sleep, Stop, and Standby modes for battery-powered embedded applications.', time: '45 min', level: 'Advanced', icon: FiDownload, image: '/vlsi 2.jpg', slug: 'low-power-modes-sleep' },
      { title: 'RTC: Real-Time Clock', desc: 'Calendar functions, alarms, and time-stamping applications.', time: '35 min', level: 'Intermediate', icon: FiClock, image: '/iot3.jpg', slug: 'rtc-real-time-clock' },
      { title: 'Comparator & Op-Amp Config', desc: 'Internal comparator, window detectors, and analog signal processing.', time: '30 min', level: 'Intermediate', icon: FiCpu, image: '/vlsi1.jpeg', slug: 'comparator-opamp-config' },
      { title: 'GPIO Interfacing Basics', desc: 'LED, button, and switch interfacing with pull-up/down resistors.', time: '20 min', level: 'Beginner', icon: FiSettings, image: '/iot.jpeg', slug: 'gpio-interfacing-basics' },
      { title: 'PWM Motor Control', desc: 'H-bridge drivers, direction control, and speed regulation.', time: '40 min', level: 'Intermediate', icon: FiLayers, image: '/iot2.jpg', slug: 'pwm-motor-control' },
      { title: 'Input Capture & Encoders', desc: 'Reading rotary encoders, measuring frequency and pulse width.', time: '35 min', level: 'Intermediate', icon: FiTarget, image: '/vlsi 2.jpeg', slug: 'input-capture-encoders' },
      { title: 'DAC: Digital-to-Analog Output', desc: 'DAC configuration, waveform generation, and audio output.', time: '30 min', level: 'Intermediate', icon: FiGlobe, image: '/iot3.jpg', slug: 'dac-digital-analog-output' },
      { title: 'Backup Domain & VBAT', desc: 'RTC backup registers and battery backup power management.', time: '25 min', level: 'Intermediate', icon: FiDownload, image: '/vlsi1.jpeg', slug: 'backup-domain-vbat' },
      { title: 'System Configuration & Boot', desc: 'Boot modes, option bytes, and system configuration.', time: '35 min', level: 'Advanced', icon: FiCpu, image: '/iot.jpeg', slug: 'system-configuration-boot' },
      { title: 'Hardware Debugging Tips', desc: 'Common hardware issues, debugging tips, and oscilloscope basics.', time: '40 min', level: 'Beginner', icon: FiSettings, image: '/iot2.jpg', slug: 'hardware-debugging-tips' },
    ],
    proto: [
      { title: 'UART: Complete Guide', desc: 'Baud rate config, interrupt RX, ring buffer, and serial debugging.', time: '35 min', level: 'Intermediate', icon: FiRadio, image: '/vlsi 2.jpg', slug: 'uart-from-config-to-circular-buffers' },
      { title: 'I2C: Sensors & OLED Displays', desc: 'Address scan, MPU6050 IMU and SSD1306 OLED with hardware I2C.', time: '40 min', level: 'Intermediate', icon: FiGlobe, image: '/iot2.jpg', slug: 'i2c-sensors-oled-displays' },
      { title: 'SPI: High-Speed Communication', desc: 'SPI configuration, DMA transfers, and interfacing with flash memory and displays.', time: '35 min', level: 'Intermediate', icon: FiLayers, image: '/vlsi1.jpeg', slug: 'spi-high-speed-communication' },
      { title: 'CAN Bus: Automotive Networks', desc: 'CAN protocol, message filtering, and vehicle network communication.', time: '45 min', level: 'Advanced', icon: FiDownload, image: '/iot.jpeg', slug: 'can-bus-automotive-networks' },
      { title: 'USB Device Mode', desc: 'CDC, HID, and custom USB device class implementation on STM32.', time: '50 min', level: 'Advanced', icon: FiCpu, image: '/iot3.jpg', slug: 'usb-device-mode' },
      { title: 'Bluetooth LE: BLE Projects', desc: 'BLE advertising, GATT services, and connecting with mobile apps.', time: '55 min', level: 'Advanced', icon: FiTarget, image: '/vlsi 2.jpeg', slug: 'bluetooth-le-ble-projects' },
      { title: 'One-Wire Protocol', desc: 'DS18B20 temperature sensor and custom One-Wire device interfacing.', time: '30 min', level: 'Intermediate', icon: FiSettings, image: '/vlsi 2.jpg', slug: 'one-wire-protocol' },
      { title: 'I2S: Audio Interface', desc: 'I2S configuration for audio codecs, microphones, and digital audio.', time: '40 min', level: 'Advanced', icon: FiGlobe, image: '/iot2.jpg', slug: 'i2s-audio-interface' },
      { title: 'Ethernet: lwIP Stack', desc: 'TCP/IP implementation, socket programming, and web server basics.', time: '60 min', level: 'Advanced', icon: FiLayers, image: '/iot.jpeg', slug: 'ethernet-lwip-stack' },
      { title: 'UART DMA Optimization', desc: 'Using DMA for high-speed UART without CPU overhead.', time: '35 min', level: 'Intermediate', icon: FiRadio, image: '/vlsi1.jpeg', slug: 'uart-dma-optimization' },
      { title: 'SPI DMA Transfers', desc: 'Double buffering, DMA interrupts, and continuous SPI transfers.', time: '40 min', level: 'Advanced', icon: FiDownload, image: '/iot3.jpg', slug: 'spi-dma-transfers' },
      { title: 'I2C Error Handling', desc: 'Bus arbitration, clock stretching, and recovering from errors.', time: '30 min', level: 'Intermediate', icon: FiTarget, image: '/vlsi 2.jpeg', slug: 'i2c-error-handling' },
      { title: 'Modbus RTU Protocol', desc: 'Modbus serial communication for industrial applications.', time: '45 min', level: 'Intermediate', icon: FiCpu, image: '/iot.jpeg', slug: 'modbus-rtu-protocol' },
      { title: 'Wireless Communication', desc: 'RF modules, packet structure, and wireless sensor networks.', time: '50 min', level: 'Intermediate', icon: FiGlobe, image: '/iot2.jpg', slug: 'wireless-communication' },
      { title: 'IR Remote Control', desc: 'NEC protocol, IR decoding, and creating IR remotes.', time: '30 min', level: 'Beginner', icon: FiSettings, image: '/vlsi1.jpeg', slug: 'ir-remote-control' },
    ],
    rtos: [
      { title: 'FreeRTOS: Tasks & Scheduling', desc: 'Create tasks, understand preemptive scheduling, priorities, and the tick timer.', time: '50 min', level: 'Advanced', icon: FiLayers, image: '/iot.jpeg', slug: 'freertos-tasks-scheduling' },
      { title: 'FreeRTOS: Queues & Semaphores', desc: 'Inter-task communication via queues, binary semaphores, mutexes, and event groups.', time: '55 min', level: 'Advanced', icon: FiDownload, image: '/iot3.jpg', slug: 'freertos-queues-semaphores' },
      { title: 'FreeRTOS: Memory Management', desc: 'Heap allocation, memory pools, and dynamic task creation strategies.', time: '40 min', level: 'Advanced', icon: FiCpu, image: '/vlsi 2.jpg', slug: 'freertos-memory-management' },
      { title: 'FreeRTOS: Interrupt Management', desc: 'Deferring interrupt handling to tasks, binary semaphores in ISRs.', time: '35 min', level: 'Advanced', icon: FiTarget, image: '/iot2.jpg', slug: 'freertos-interrupt-management' },
      { title: 'FreeRTOS: Software Timers', desc: 'Software timer creation, callback functions, and timer service tasks.', time: '30 min', level: 'Advanced', icon: FiClock, image: '/vlsi1.jpeg', slug: 'freertos-software-timers' },
      { title: 'FreeRTOS: Debugging & Profiling', desc: 'Tracealyzer integration, stack overflow detection, and performance tuning.', time: '45 min', level: 'Advanced', icon: FiSettings, image: '/vlsi 2.jpeg', slug: 'freertos-debugging-profiling' },
      { title: 'FreeRTOS: Task Notifications', desc: 'Direct to task notifications, efficient signaling without queues.', time: '35 min', level: 'Advanced', icon: FiLayers, image: '/iot.jpeg', slug: 'freertos-task-notifications' },
      { title: 'FreeRTOS: Event Groups', desc: 'Event group creation, set/clear/wait operations for synchronization.', time: '40 min', level: 'Advanced', icon: FiDownload, image: '/iot2.jpg', slug: 'freertos-event-groups' },
      { title: 'FreeRTOS: Stream Buffers', desc: 'Stream buffers for passing data between tasks efficiently.', time: '35 min', level: 'Advanced', icon: FiCpu, image: '/vlsi1.jpeg', slug: 'freertos-stream-buffers' },
      { title: 'FreeRTOS: Message Buffers', desc: 'Variable length message passing between tasks.', time: '30 min', level: 'Advanced', icon: FiTarget, image: '/iot3.jpg', slug: 'freertos-message-buffers' },
      { title: 'FreeRTOS: Tickless Idle Mode', desc: 'Implementing low power tickless mode for battery applications.', time: '45 min', level: 'Advanced', icon: FiGlobe, image: '/vlsi 2.jpeg', slug: 'freertos-tickless-idle' },
      { title: 'FreeRTOS: MPU Protection', desc: 'Memory Protection Unit configuration for secure task isolation.', time: '50 min', level: 'Advanced', icon: FiSettings, image: '/iot.jpeg', slug: 'freertos-mpu-protection' },
      { title: 'FreeRTOS: Porting Guide', desc: 'Porting FreeRTOS to new architectures and custom MCUs.', time: '60 min', level: 'Advanced', icon: FiLayers, image: '/iot2.jpg', slug: 'freertos-porting-guide' },
      { title: 'FreeRTOS: Tick Hook Functions', desc: 'Tick hook, idle hook, and runtime statistics collection.', time: '35 min', level: 'Advanced', icon: FiDownload, image: '/vlsi 2.jpg', slug: 'freertos-tick-hook' },
      { title: 'FreeRTOS: Priority Inversion', desc: 'Understanding and solving priority inversion problems with mutexes.', time: '40 min', level: 'Advanced', icon: FiCpu, image: '/iot3.jpg', slug: 'freertos-priority-inversion' },
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
            {[{ id: 'c', label: 'Embedded C' },
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
              <Link href={`/tutorials/${tut.slug}`} key={i} className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:border-primary-500 hover:-translate-y-1 transition-all duration-300 no-underline">
                <div className=" bg-gradient-to-br from-primary-50 to-primary-100 shadow-sm flex items-center justify-center overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">{tut.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed">{tut.desc}</p>
                  <div className="flex gap-4 items-center text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <span className="text-primary-500">⏱</span> {tut.time}
                    </span>
                    <span className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold tracking-wider uppercase ${
                      tut.level === 'Beginner' ? 'text-emerald-700 border border-emerald-200 bg-emerald-50' : 
                      tut.level === 'Intermediate' ? 'text-amber-700 border border-amber-200 bg-amber-50' : 
                      'text-red-700 border border-red-200 bg-red-50'
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