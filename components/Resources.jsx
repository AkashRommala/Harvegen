'use client'

import Link from 'next/link'

function Resources() {
  return (
    <>
      {/* Page Hero */}
      <header className="pt-[120px] pb-15 relative overflow-hidden bg-gradient-to-br from-teal-50 via-teal-50 to-teal-50">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 via-cyan-500/5 to-transparent rounded-full blur-3xl animate-gradient"></div>
        <div className="absolute w-[600px] h-[400px] rounded-full bg-gradient-to-r from-teal-500/20 to-cyan-500/20 top-0 left-1/2 -translate-x-1/2 pointer-events-none animate-float"></div>
        <div className="max-w-[1160px] mx-auto px-6">
          <div className="text-[0.72rem] text-slate-500 mb-4 font-mono">
            <Link href="/" className="text-slate-400 hover:text-teal-500">index</Link> <span>/ resources</span>
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
          <div className="flex items-center gap-6 bg-gradient-to-r from-teal-500/10 to-teal-500/5 border border-teal-500/20 rounded-xl p-7 mb-12 flex-wrap">
            <div className="text-[2.8rem]">🐙</div>
            <div className="flex-1">
              <h3 className="font-mono text-base font-semibold text-slate-100 mb-1">All Source Code is on GitHub</h3>
              <p className="text-slate-400 text-[0.82rem]">Every project and tutorial has a companion GitHub repo. Fork, clone, and contribute — MIT Licensed.</p>
              <button className="mt-3.5 px-5 py-2.5 bg-teal-500 text-slate-900 rounded font-mono text-[0.78rem] font-medium hover:bg-teal-400 transition-all"><FiGithub className="inline mr-1" /> View on GitHub</button>
            </div>
          </div>

          {/* Source Code */}
          <section className="py-13 border-b border-slate-700">
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 mb-3 font-mono text-[0.7rem] tracking-widest uppercase text-teal-500">
                <span className="w-6 h-px bg-teal-500"></span>
                Source Code
              </div>
              <h2 className="text-slate-100">Project Source Code</h2>
            </div>
            <div className="flex flex-col gap-2.5">
              {[{ name: 'Smart Irrigation System — STM32F407', meta: 'Keil µVision Project · 2.3 MB · C / HAL' },
                { name: 'Driver Drowsiness Detection — LPC1768', meta: 'Keil µVision Project · 1.8 MB · Bare-Metal C' },
                { name: 'IoT Weather Station — Arduino + ESP8266', meta: 'Arduino IDE Sketch · 890 KB · C++' },
              ].map((res, i) => (
                <div key={i} className="flex items-center gap-4 bg-slate-800 border border-slate-700 rounded-xl p-4 hover:border-slate-600 transition-all">
                  <div className="w-11 h-11 bg-white/5 border border-white/10 rounded flex items-center justify-center text-2xl shrink-0">📁</div>
                  <div className="flex-1">
                    <div className="font-mono text-[0.9rem] font-medium text-slate-100 mb-0.5">{res.name}</div>
                    <div className="text-slate-500 text-[0.75rem]">{res.meta}</div>
                  </div>
                  <button className="px-4 py-1.5 bg-transparent text-teal-500 border border-teal-500 rounded text-[0.72rem] font-mono hover:bg-teal-500/10 transition-all"><FiDownload className="inline mr-1" /> Download</button>
                </div>
              ))}
            </div>
          </section>

          {/* Datasheets */}
          <section className="py-13 border-b border-slate-700">
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 mb-3 font-mono text-[0.7rem] tracking-widest uppercase text-teal-500">
                <span className="w-6 h-px bg-teal-500"></span>
                Documentation
              </div>
              <h2 className="text-slate-100">MCU & Component Datasheets</h2>
            </div>
            <div className="flex flex-col gap-2.5">
              {[{ name: 'LPC1768 User Manual — NXP UM10360', meta: 'PDF · 840 pages · NXP Semiconductors' },
                { name: 'STM32F407 Reference Manual — ST RM0090', meta: 'PDF · 1747 pages · STMicroelectronics' },
                { name: 'ATmega328P Datasheet — Microchip DS40002061', meta: 'PDF · 660 pages · Microchip Technology' },
              ].map((res, i) => (
                <div key={i} className="flex items-center gap-4 bg-slate-800 border border-slate-700 rounded-xl p-4 hover:border-slate-600 transition-all">
                  <div className="w-11 h-11 bg-white/5 border border-white/10 rounded flex items-center justify-center text-2xl shrink-0">📄</div>
                  <div className="flex-1">
                    <div className="font-mono text-[0.9rem] font-medium text-slate-100 mb-0.5">{res.name}</div>
                    <div className="text-slate-500 text-[0.75rem]">{res.meta}</div>
                  </div>
                  <button className="px-4 py-1.5 bg-transparent text-teal-500 border border-teal-500 rounded text-[0.72rem] font-mono hover:bg-teal-500/10 transition-all"><FiFileText className="inline mr-1" /> PDF</button>
                </div>
              ))}
            </div>
          </section>

          {/* Tools */}
          <section className="py-13">
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 mb-3 font-mono text-[0.7rem] tracking-widest uppercase text-teal-500">
                <span className="w-6 h-px bg-teal-500"></span>
                Toolchain
              </div>
              <h2 className="text-slate-100">Recommended Development Tools</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[{ icon: '🛠', name: 'STM32CubeIDE', desc: 'Free Eclipse-based IDE from ST with code generation, HAL libraries, and integrated GDB debugger.', badge: 'Free · st.com' },
                { icon: '⚙', name: 'Keil µVision 5', desc: 'Industry-standard ARM IDE. Free with 32 KB code limit.', badge: 'Free (limited) · keil.com' },
                { icon: '🟢', name: 'Arduino IDE 2.x', desc: 'Modern IDE with integrated debugger, board manager, library manager.', badge: 'Free · arduino.cc' },
                { icon: '🔄', name: 'PlatformIO', desc: 'VS Code extension with 1000+ boards, unified build system.', badge: 'Free · platformio.org' },
              ].map((tool, i) => (
                <div key={i} className="bg-slate-800 border border-slate-700 rounded-xl p-5">
                  <div className="text-2xl mb-2.5">{tool.icon}</div>
                  <h4 className="font-mono text-[0.95rem] font-semibold text-slate-100 mb-1.5">{tool.name}</h4>
                  <p className="text-slate-400 text-[0.8rem] mb-3 leading-relaxed">{tool.desc}</p>
                  <div className="font-mono text-[0.65rem] text-teal-500">{tool.badge}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  )
}

export default Resources