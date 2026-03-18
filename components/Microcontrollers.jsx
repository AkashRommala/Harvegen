'use client'

import Link from 'next/link'

function Microcontrollers() {
  return (
    <>
      {/* Page Hero */}
      <header className="pt-[120px] pb-15 relative overflow-hidden bg-gradient-to-br from-teal-50 via-teal-50 to-teal-50">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 via-cyan-500/5 to-transparent rounded-full blur-3xl animate-gradient"></div>
        <div className="absolute w-[600px] h-[400px] rounded-full bg-gradient-to-r from-teal-500/20 to-cyan-500/20 top-0 left-1/2 -translate-x-1/2 pointer-events-none animate-float"></div>
        <div className="max-w-[1160px] mx-auto px-6">
          <div className="text-[0.72rem] text-slate-500 mb-4 font-mono">
            <Link href="/" className="text-slate-400 hover:text-teal-500">index</Link> <span>/ microcontrollers</span>
          </div>
          <div className="inline-flex items-center gap-2 mb-3 font-mono text-[0.7rem] tracking-widest uppercase text-blue-500">
            <span className="w-6 h-px bg-blue-500"></span>
            MCU Platforms
          </div>
          <h1 className="mb-3 text-slate-900 font-display">Microcontroller<br/><span className="text-blue-500">Platform Guide</span></h1>
          <p className="text-slate-400 max-w-[520px]">Architecture, peripherals, specs, and curated tutorials + projects for each MCU family.</p>
          
          <nav className="flex gap-2.5 flex-wrap mt-6">
            <Link href="#lpc" className="px-4 py-2 bg-transparent text-slate-400 border border-slate-600 rounded text-[0.72rem] font-mono hover:border-slate-500 hover:text-slate-200 transition-all">🔵 LPC1768</Link>
            <Link href="#stm32" className="px-4 py-2 bg-transparent text-slate-400 border border-slate-600 rounded text-[0.72rem] font-mono hover:border-slate-500 hover:text-slate-200 transition-all">🟣 STM32</Link>
            <Link href="#arduino" className="px-4 py-2 bg-transparent text-slate-400 border border-slate-600 rounded text-[0.72rem] font-mono hover:border-slate-500 hover:text-slate-200 transition-all">🟢 Arduino</Link>
          </nav>
        </div>
      </header>

      <main>
        {/* LPC1768 Section */}
        <section id="lpc" className="py-15">
          <div className="max-w-[1160px] mx-auto px-6">
            <div className="flex items-center gap-4 mb-7">
              <div className="w-14 h-14 bg-teal-500/10 border border-teal-500/25 rounded-xl flex items-center justify-center text-3xl shrink-0"><FiCpu className="w-7 h-7 text-teal-500" /></div>
              <div>
                <h2 className="text-slate-100">LPC1768 — NXP ARM Cortex-M3</h2>
                <p className="text-slate-400 text-[0.88rem]">32-bit Cortex-M3 at 100 MHz. Bare-metal register-level programming powerhouse.</p>
              </div>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-7">
              {[{ key: 'Core', val: 'ARM Cortex-M3' },
                { key: 'Clock', val: '100 MHz' },
                { key: 'Flash', val: '512 KB' },
                { key: 'SRAM', val: '64 KB' },
                { key: 'GPIO Pins', val: '70' },
                { key: 'ADC', val: '12-bit, 8ch' },
                { key: 'UART', val: '4× UART' },
                { key: 'Supply', val: '3.3 V' },
              ].map((spec, i) => (
                <div key={i} className="bg-slate-800 border border-slate-700 rounded p-3 text-center">
                  <div className="font-mono text-[0.65rem] text-slate-500 uppercase tracking-wider mb-1">{spec.key}</div>
                  <div className="font-mono text-[0.85rem] text-slate-200">{spec.val}</div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-7">
              <div>
                <div className="font-mono text-[0.68rem] tracking-widest uppercase text-slate-500 mb-4">📘 LPC1768 Tutorials</div>
                <div className="flex flex-col gap-3">
                  {[{ title: 'GPIO via PINSEL Registers', desc: 'Configure I/O ports, set pin directions bare-metal, and blink LEDs on MBED board.', time: '20 min', level: 'Beginner', icon: '⚙' },
                    { title: 'UART0 on LPC1768', desc: 'Set baud rate, configure UART0, implement interrupt-driven receive with FIFO.', time: '30 min', level: 'Intermediate', icon: '📡' },
                  ].map((tut, i) => (
                    <Link href="/tutorials" key={i} className="flex gap-4 bg-slate-800 border border-slate-700 rounded-xl p-4 hover:border-slate-600 transition-all no-underline">
                      <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded flex items-center justify-center text-xl shrink-0">{tut.icon}</div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-mono text-[0.9rem] font-semibold text-slate-100 mb-1">{tut.title}</h4>
                        <p className="text-slate-400 text-[0.8rem] line-clamp-1 mb-1">{tut.desc}</p>
                        <div className="flex gap-2 items-center text-[0.7rem] text-slate-500">
                          <span>⏱ {tut.time}</span>
                          <span className="text-green-500 border border-green-500/30 bg-green-500/10 px-2 py-0.5 rounded-sm font-mono text-[0.65rem]">{tut.level}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <div className="font-mono text-[0.68rem] tracking-widest uppercase text-slate-500 mb-4">🛠 LPC1768 Projects</div>
                <div className="flex flex-col gap-3">
                  {[{ title: 'Driver Drowsiness Detection', desc: 'IR eye-blink detection with pattern recognition and buzzer/LED alert system.', level: 'Advanced', mcu: 'LPC1768' },
                    { title: 'Smart Door Lock', desc: 'RFID + keypad auth with solenoid lock and I2C EEPROM access log.', level: 'Medium', mcu: 'LPC1768' },
                  ].map((proj, i) => (
                    <article key={i} className="bg-slate-800 border border-slate-700 rounded-xl p-4">
                      <div className="flex gap-1.5 mb-2">
                        <span className="text-red-500 border border-red-500/30 bg-red-500/10 px-2 py-0.5 rounded-sm font-mono text-[0.65rem]">{proj.level}</span>
                      </div>
                      <h4 className="font-mono text-[0.95rem] font-semibold text-slate-100 mb-1">{proj.title}</h4>
                      <p className="text-slate-400 text-[0.82rem] mb-3">{proj.desc}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-[0.7rem] text-slate-500">{proj.mcu}</span>
                        <button className="px-4 py-1.5 bg-transparent text-blue-500 border border-blue-500 rounded text-[0.72rem] font-mono hover:bg-blue-500/10 transition-all">View</button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STM32 Section */}
        <section id="stm32" className="py-15 bg-slate-800">
          <div className="max-w-[1160px] mx-auto px-6">
            <div className="flex items-center gap-4 mb-7">
              <div className="w-14 h-14 bg-purple-500/10 border border-purple-500/25 rounded-xl flex items-center justify-center text-3xl shrink-0">🟣</div>
              <div>
                <h2 className="text-slate-100">STM32 — ST ARM Cortex-M4</h2>
                <p className="text-slate-400 text-[0.88rem]">Industry-standard up to 168 MHz with FPU, 12-bit ADC, and rich peripheral set.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-7">
              {[{ key: 'Core', val: 'ARM Cortex-M4' },
                { key: 'Clock', val: '168 MHz' },
                { key: 'Flash', val: '1 MB' },
                { key: 'SRAM', val: '192 KB' },
              ].map((spec, i) => (
                <div key={i} className="bg-slate-900 border border-slate-700 rounded p-3 text-center">
                  <div className="font-mono text-[0.65rem] text-slate-500 uppercase tracking-wider mb-1">{spec.key}</div>
                  <div className="font-mono text-[0.85rem] text-slate-200">{spec.val}</div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-7">
              <div>
                <div className="font-mono text-[0.68rem] tracking-widest uppercase text-slate-500 mb-4">📘 STM32 Tutorials</div>
                <div className="flex flex-col gap-3">
                  {[{ title: 'STM32 GPIO & HAL Library', desc: 'HAL_GPIO_WritePin, interrupt callbacks, and EXTI lines with CubeMX generation.', time: '25 min', level: 'Beginner', icon: '⚙' },
                    { title: 'FreeRTOS on STM32', desc: 'Set up FreeRTOS with CubeMX, create tasks, use CMSIS RTOS2 API wrappers.', time: '50 min', level: 'Advanced', icon: '🔄' },
                  ].map((tut, i) => (
                    <Link href="/tutorials" key={i} className="flex gap-4 bg-slate-900 border border-slate-700 rounded-xl p-4 hover:border-slate-600 transition-all no-underline">
                      <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded flex items-center justify-center text-xl shrink-0">{tut.icon}</div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-mono text-[0.9rem] font-semibold text-slate-100 mb-1">{tut.title}</h4>
                        <p className="text-slate-400 text-[0.8rem] line-clamp-1 mb-1">{tut.desc}</p>
                        <div className="flex gap-2 items-center text-[0.7rem] text-slate-500">
                          <span>⏱ {tut.time}</span>
                          <span className="text-green-500 border border-green-500/30 bg-green-500/10 px-2 py-0.5 rounded-sm font-mono text-[0.65rem]">{tut.level}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <div className="font-mono text-[0.68rem] tracking-widest uppercase text-slate-500 mb-4">🛠 STM32 Projects</div>
                <div className="flex flex-col gap-3">
                  {[{ title: 'Smart Irrigation System', desc: 'ADC moisture sensing, relay pump control, UART logging on STM32F407.', level: 'Medium', mcu: 'STM32F407' },
                    { title: 'Autonomous Rover', desc: 'FreeRTOS multi-task obstacle avoidance + path planning on STM32F411.', level: 'Advanced', mcu: 'STM32F411' },
                  ].map((proj, i) => (
                    <article key={i} className="bg-slate-900 border border-slate-700 rounded-xl p-4">
                      <div className="flex gap-1.5 mb-2">
                        <span className="text-red-500 border border-red-500/30 bg-red-500/10 px-2 py-0.5 rounded-sm font-mono text-[0.65rem]">{proj.level}</span>
                      </div>
                      <h4 className="font-mono text-[0.95rem] font-semibold text-slate-100 mb-1">{proj.title}</h4>
                      <p className="text-slate-400 text-[0.82rem] mb-3">{proj.desc}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-[0.7rem] text-slate-500">{proj.mcu}</span>
                        <button className="px-4 py-1.5 bg-transparent text-blue-500 border border-blue-500 rounded text-[0.72rem] font-mono hover:bg-blue-500/10 transition-all">View</button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Arduino Section */}
        <section id="arduino" className="py-15">
          <div className="max-w-[1160px] mx-auto px-6">
            <div className="flex items-center gap-4 mb-7">
              <div className="w-14 h-14 bg-green-500/10 border border-green-500/25 rounded-xl flex items-center justify-center text-3xl shrink-0">🟢</div>
              <div>
                <h2 className="text-slate-100">Arduino — ATmega Ecosystem</h2>
                <p className="text-slate-400 text-[0.88rem]">Beginner-friendly platform. Massive library support, easy IDE, perfect for prototyping.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-7">
              {[{ key: 'Core (Uno)', val: 'ATmega328P' },
                { key: 'Clock', val: '16 MHz' },
                { key: 'Flash', val: '32 KB' },
                { key: 'SRAM', val: '2 KB' },
              ].map((spec, i) => (
                <div key={i} className="bg-slate-800 border border-slate-700 rounded p-3 text-center">
                  <div className="font-mono text-[0.65rem] text-slate-500 uppercase tracking-wider mb-1">{spec.key}</div>
                  <div className="font-mono text-[0.85rem] text-slate-200">{spec.val}</div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-7">
              <div>
                <div className="font-mono text-[0.68rem] tracking-widest uppercase text-slate-500 mb-4">📘 Arduino Tutorials</div>
                <div className="flex flex-col gap-3">
                  {[{ title: 'Arduino — Getting Started', desc: 'Install IDE, understand sketch structure, blink LED, and use Serial Monitor.', time: '15 min', level: 'Beginner', icon: '🌱' },
                    { title: 'Sensors & analogRead()', desc: 'Interface DHT22, BMP280, and LDR. Use I2C/SPI libraries for sensor fusion.', time: '25 min', level: 'Beginner', icon: '📊' },
                  ].map((tut, i) => (
                    <Link href="/tutorials" key={i} className="flex gap-4 bg-slate-800 border border-slate-700 rounded-xl p-4 hover:border-slate-600 transition-all no-underline">
                      <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded flex items-center justify-center text-xl shrink-0">{tut.icon}</div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-mono text-[0.9rem] font-semibold text-slate-100 mb-1">{tut.title}</h4>
                        <p className="text-slate-400 text-[0.8rem] line-clamp-1 mb-1">{tut.desc}</p>
                        <div className="flex gap-2 items-center text-[0.7rem] text-slate-500">
                          <span>⏱ {tut.time}</span>
                          <span className="text-green-500 border border-green-500/30 bg-green-500/10 px-2 py-0.5 rounded-sm font-mono text-[0.65rem]">{tut.level}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <div className="font-mono text-[0.68rem] tracking-widest uppercase text-slate-500 mb-4">🛠 Arduino Projects</div>
                <div className="flex flex-col gap-3">
                  {[{ title: 'IoT Weather Station', desc: 'DHT22 + BMP280 with ESP8266 uploading to Blynk cloud dashboard.', level: 'Beginner', mcu: 'Arduino Uno' },
                    { title: 'Line Follower Robot', desc: 'PID-controlled IR sensor array line tracking on Arduino Nano.', level: 'Medium', mcu: 'Arduino Nano' },
                  ].map((proj, i) => (
                    <article key={i} className="bg-slate-800 border border-slate-700 rounded-xl p-4">
                      <div className="flex gap-1.5 mb-2">
                        <span className="text-amber-500 border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 rounded-sm font-mono text-[0.65rem]">{proj.level}</span>
                      </div>
                      <h4 className="font-mono text-[0.95rem] font-semibold text-slate-100 mb-1">{proj.title}</h4>
                      <p className="text-slate-400 text-[0.82rem] mb-3">{proj.desc}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-[0.7rem] text-slate-500">{proj.mcu}</span>
                        <button className="px-4 py-1.5 bg-transparent text-blue-500 border border-blue-500 rounded text-[0.72rem] font-mono hover:bg-blue-500/10 transition-all">View</button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default Microcontrollers