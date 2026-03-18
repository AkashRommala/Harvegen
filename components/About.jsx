'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FiZap, FiSettings, FiBookOpen, FiMail, FiGithub, FiTwitter, FiLinkedin, FiSend } from 'react-icons/fi'
import { FaYoutube } from 'react-icons/fa'

function About() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
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
    
    toast("Message sent! We'll reply soon.", 'success')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <>
      {/* Page Hero */}
      <header className="pt-[120px] pb-15 relative overflow-hidden bg-gradient-to-br from-teal-50 via-teal-50 to-teal-50">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 via-cyan-500/5 to-transparent rounded-full blur-3xl animate-gradient"></div>
        <div className="absolute w-[600px] h-[400px] rounded-full bg-gradient-to-r from-teal-500/20 to-cyan-500/20 top-0 left-1/2 -translate-x-1/2 pointer-events-none animate-float"></div>
        <div className="max-w-[1160px] mx-auto px-6">
          <div className="text-[0.72rem] text-slate-500 mb-4 font-mono">
            <Link href="/" className="text-slate-400 hover:text-teal-500">index</Link> <span>/ about</span>
          </div>
          <div className="inline-flex items-center gap-2 mb-3 font-mono text-[0.7rem] tracking-widest uppercase text-blue-500">
            <span className="w-6 h-px bg-blue-500"></span>
            Our Story
          </div>
              <h1 className="mb-3 text-slate-900 font-display">Built for Engineers,<br/><span className="text-blue-500">By Engineers</span></h1>
          <p className="text-slate-400 max-w-[560px]">Embedded Projects Hub started as a personal notebook of MCU code — and grew into an open-source learning platform used by students and developers worldwide.</p>
        </div>
      </header>

      <main>
        {/* Mission */}
        <section className="py-20">
          <div className="max-w-[1160px] mx-auto px-6">
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 mb-3 font-mono text-[0.7rem] tracking-widest uppercase text-teal-500">
                <span className="w-6 h-px bg-teal-500"></span>
                Mission
              </div>
              <h2 className="text-slate-100">Why We Built This</h2>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-xl p-9 mb-5">
              <blockquote className="font-mono text-clamp text-slate-100 leading-relaxed border-l-2 border-teal-500 pl-5">
                "There were plenty of Hello World tutorials for microcontrollers,
                but almost no <em className="text-teal-500 not-italic">practical, project-based resources</em> that bridge
                the gap between coursework and real-world firmware development."
              </blockquote>
            </div>

            <div className="grid md:grid-cols-2 gap-10 items-start">
              <div>
                <p className="text-slate-400 leading-relaxed mb-4">
                  We believe the best way to learn embedded systems is to <strong className="text-slate-100">build real things</strong>.
                  Every tutorial on this hub is tied to a working project.
                  Every line of code has a purpose. Every schematic can be soldered.
                </p>
                <p className="text-slate-400 leading-relaxed mb-6">
                  Our goal is to create the most <strong className="text-slate-100">technically rigorous</strong>,
                  accessible, and practical open-source embedded systems learning resource
                  on the internet — completely free, forever.
                </p>
                <div className="flex gap-3 flex-wrap">
                  <Link href="/projects" className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded font-mono text-[0.78rem] font-medium hover:from-blue-400 hover:to-blue-500 transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transform hover:-translate-y-0.5">⚙ Browse Projects</Link>
                  <Link href="/tutorials" className="px-5 py-2.5 bg-transparent text-blue-500 border border-blue-500 rounded font-mono text-[0.78rem] font-medium hover:bg-blue-500/10 transition-all">📖 Start Learning</Link>
                </div>
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-xl h-80 flex items-center justify-center text-7xl relative overflow-hidden">
                <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'linear-gradient(slate-700 1px, transparent 1px), linear-gradient(90deg, slate-700 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
                <span className="relative z-10"><FiZap className="w-16 h-16 text-teal-500" /></span>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-slate-800">
          <div className="max-w-[1160px] mx-auto px-6">
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 mb-3 font-mono text-[0.7rem] tracking-widest uppercase text-teal-500">
                <span className="w-6 h-px bg-teal-500"></span>
                Team
              </div>
              <h2 className="text-slate-100">The People Behind EPHub</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[{ name: 'Arjun Reddy', role: 'Founder & Lead Developer', bio: '5+ years firmware development. Former automotive ECU developer passionate about bare-metal programming and RTOS.', initials: 'AR' },
                { name: 'Sneha Nair', role: 'IoT Specialist & Technical Writer', bio: 'IoT architect specialising in MQTT, cloud integration, and sensor networks.', initials: 'SN' },
                { name: 'Karthik Patel', role: 'Hardware & PCB Designer', bio: 'PCB design expert. Creates all circuit schematics and hardware reference designs.', initials: 'KP' },
              ].map((member, i) => (
                <div key={i} className="bg-slate-800 border border-slate-700 rounded-xl p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-700 rounded-full mx-auto mb-4 flex items-center justify-center font-mono text-xl font-semibold text-white">{member.initials}</div>
                  <h4 className="font-mono text-base font-semibold text-slate-100 mb-1">{member.name}</h4>
                  <div className="text-teal-500 text-[0.75rem] mb-3">{member.role}</div>
                  <p className="text-slate-400 text-[0.82rem] leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-20">
          <div className="max-w-[1160px] mx-auto px-6">
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 mb-3 font-mono text-[0.7rem] tracking-widest uppercase text-teal-500">
                <span className="w-6 h-px bg-teal-500"></span>
                Contact
              </div>
              <h2 className="text-slate-100">Get in Touch</h2>
            </div>

            <div className="grid md:grid-cols-5 gap-12">
              <div className="md:col-span-2">
                <p className="text-slate-400 text-[0.9rem] leading-relaxed mb-7">Have a project to contribute? Found an error in a tutorial? Want to collaborate or sponsor the hub? We'd love to hear from you.</p>

                <div className="mb-6">
                  {[{ icon: FiMail, label: 'Email', val: 'hello@ephub.dev' },
                    { icon: FiGithub, label: 'GitHub', val: 'github.com/embedded-projects-hub' },
                    { icon: FiTwitter, label: 'Twitter / X', val: '@ephubdev' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3.5 py-3.5 border-b border-slate-700">
                      <div className="w-9 h-9 bg-teal-500/10 border border-teal-500/25 rounded flex items-center justify-center text-lg shrink-0"><item.icon className="w-4 h-4 text-teal-500" /></div>
                      <div>
                        <div className="font-mono text-[0.65rem] tracking-widest uppercase text-slate-500 mb-0.5">{item.label}</div>
                        <div className="font-mono text-[0.82rem] text-teal-500">{item.val}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <a href="#" className="w-9 h-9 bg-slate-700 border border-slate-600 rounded flex items-center justify-center text-lg hover:border-teal-500 hover:bg-teal-500/10 transition-all"><FiGithub /></a>
                  <a href="#" className="w-9 h-9 bg-slate-700 border border-slate-600 rounded flex items-center justify-center text-lg hover:border-teal-500 hover:bg-teal-500/10 transition-all"><FaYoutube /></a>
                  <a href="#" className="w-9 h-9 bg-slate-700 border border-slate-600 rounded flex items-center justify-center text-lg hover:border-teal-500 hover:bg-teal-500/10 transition-all"><FiTwitter /></a>
                  <a href="#" className="w-9 h-9 bg-slate-700 border border-slate-600 rounded flex items-center justify-center text-lg hover:border-teal-500 hover:bg-teal-500/10 transition-all"><FiLinkedin /></a>
                </div>
              </div>

              <form className="md:col-span-3 bg-slate-800 border border-slate-700 rounded-xl p-7" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block font-mono text-[0.72rem] text-slate-400 mb-1.5">Name</label>
                    <input type="text" placeholder="Your name" required className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded text-[0.85rem] text-slate-100 font-mono focus:outline-none focus:border-teal-500 transition-colors" />
                  </div>
                  <div>
                    <label className="block font-mono text-[0.72rem] text-slate-400 mb-1.5">Email</label>
                    <input type="email" placeholder="you@example.com" required className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded text-[0.85rem] text-slate-100 font-mono focus:outline-none focus:border-teal-500 transition-colors" />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block font-mono text-[0.72rem] text-slate-400 mb-1.5">Subject</label>
                  <input type="text" placeholder="Project contribution / Bug report / Collaboration" className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded text-[0.85rem] text-slate-100 font-mono focus:outline-none focus:border-blue-500 transition-colors" />
                </div>
                <div className="mb-4">
                  <label className="block font-mono text-[0.72rem] text-slate-400 mb-1.5">Message</label>
                  <textarea rows="5" placeholder="Tell us what's on your mind…" required className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded text-[0.85rem] text-slate-100 font-mono focus:outline-none focus:border-blue-500 transition-colors resize-none"></textarea>
                </div>
                <button type="submit" className="px-5 py-2.5 bg-teal-500 text-slate-900 rounded font-mono text-[0.78rem] font-medium hover:bg-teal-400 transition-all"><FiSend className="inline mr-1" /> Send Message</button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default About