import { useRef, useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, ArrowUpRight, Github, Linkedin, Twitter } from "lucide-react";

const METHODS = [
  { icon: Mail,   label: "EMAIL US DIRECTLY", value: "harshitardik312@gmail.com", href: "mailto:harshitardik312@gmail.com", accent: "#ff1694" },
  { icon: Phone,  label: "VOICE ENCRYPTED",  value: "+91 94318 31261",            href: "tel:+919431831261",               accent: "#38b6ff" },
  { icon: MapPin, label: "BASE TERMINAL",    value: "Darbhanga, Bihar · India",   href: null,                              accent: "#52D3D8" },
];

export function ContactSection() {
  return (
    <section id="contact" className="relative py-28 px-6 md:px-12 overflow-hidden bg-[#FFFDEC] dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto relative">
        <div className="section-ghost-num right-0 top-0 text-black/5 dark:text-white/5">04</div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 relative z-10"
        >
          <div className="plasma-pill mb-5 w-fit font-bold uppercase animate-bounce" style={{ background: "var(--neo-yellow)", color: "#000" }}>
            Ready Station
          </div>
          <h2 className="font-display text-[clamp(2.2rem,6vw,4.8rem)] font-black leading-[0.9] text-black dark:text-white">
            START A<br />
            <span className="bg-[#38b6ff] text-black px-4 py-1.5 rotate-[-1deg] inline-block border-[3.5px] border-black dark:border-white shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#fff] mt-3">
              CONVERSATION
            </span>
          </h2>
          <p className="font-body font-semibold text-black/60 dark:text-zinc-400 max-w-sm text-sm leading-relaxed mt-4">
            Have an operational task or project in mind? Submit a transmission below.
          </p>
        </motion.div>

        {/* Big pop-art email banner button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 relative z-10"
        >
          <a href="mailto:harshitardik312@gmail.com"
            className="group flex items-center justify-between py-6 px-6 sm:px-8 bg-white dark:bg-zinc-900 border-[3px] border-black dark:border-white hover:-translate-y-1 hover:translate-x-[-1px] transition-all rounded-xl shadow-[5px_5px_0px_#000] dark:shadow-[5px_5px_0px_#fff] hover:shadow-[7px_7px_0px_#000] dark:hover:shadow-[7px_7px_0px_#fff] cursor-none duration-300"
          >
            <span className="font-display font-black text-[clamp(1.1rem,3.2vw,2.5rem)] text-black dark:text-white tracking-wide leading-none select-all">
              harshitardik312@gmail.com
            </span>
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border-[3px] border-black dark:border-white bg-[#FFDE47] flex items-center justify-center shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff] group-hover:scale-105 transition-transform flex-shrink-0">
              <ArrowUpRight size={20} className="text-black stroke-[3px]" />
            </div>
          </a>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
          {/* Left panel: Info panels */}
          <div className="space-y-4">
            {METHODS.map((m, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -20 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.08 }}
              >
                {m.href ? (
                  <a 
                    href={m.href} 
                    className="neo-card rounded-xl flex items-center gap-4 p-5 group cursor-none transition-all bg-white dark:bg-zinc-900 border-[3px] border-black dark:border-white shadow-[6px_6px_0px_#000] dark:shadow-[6px_6px_0px_#fff]"
                    style={{
                      transform: `rotate(${(i % 2 === 0 ? 1 : -1) * 0.8}deg)`
                    }}
                  >
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 border-2 border-black dark:border-white shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff]" 
                      style={{ background: m.accent }}
                    >
                      <m.icon size={18} className="text-black stroke-[2.5px]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-accent text-[9px] tracking-widest font-black uppercase mb-0.5 text-black/45 dark:text-zinc-500">
                        {m.label}
                      </p>
                      <p className="font-body text-xs font-bold text-black dark:text-white truncate">
                        {m.value}
                      </p>
                    </div>
                    <ArrowUpRight size={16} className="text-black/30 group-hover:text-black dark:text-zinc-500 dark:group-hover:text-white transition-colors stroke-[2.5px]" />
                  </a>
                ) : (
                  <div 
                    className="neo-card rounded-xl flex items-center gap-4 p-5 bg-white dark:bg-zinc-900 border-[3px] border-black dark:border-white shadow-[6px_6px_0px_#000] dark:shadow-[6px_6px_0px_#fff]"
                    style={{
                      transform: `rotate(${(i % 2 === 0 ? 1 : -1) * 0.8}deg)`
                    }}
                  >
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 border-2 border-black dark:border-white shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff]" 
                      style={{ background: m.accent }}
                    >
                      <m.icon size={18} className="text-black stroke-[2.5px]" />
                    </div>
                    <div>
                      <p className="font-accent text-[9px] tracking-widest font-black uppercase mb-0.5 text-black/45 dark:text-zinc-500">
                        {m.label}
                      </p>
                      <p className="font-body text-xs font-bold text-black dark:text-white">
                        {m.value}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            {/* Social handles */}
            <div className="flex gap-4 pt-2">
              {[
                { Icon: Github, href: "https://github.com/WRECKERKNIGHT" },
                { Icon: Linkedin, href: "https://linkedin.com" },
                { Icon: Twitter, href: "https://twitter.com" }
              ].map((s, i) => (
                <a 
                  key={i} 
                  href={s.href} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-11 h-11 rounded-full border-[3px] border-black dark:border-white bg-white dark:bg-zinc-900 flex items-center justify-center shadow-[3px_3px_0px_#000] dark:shadow-[3px_3px_0px_#fff] hover:-translate-y-1 transition-transform cursor-none duration-300"
                >
                  <s.Icon size={16} className="text-black dark:text-white stroke-[2.5px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Right panel: Comic pop-art callout card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="neo-card p-8 md:p-10 bg-[#FFDE47] dark:bg-zinc-900 border-[3.5px] border-black dark:border-white shadow-[6px_6px_0px_#000] dark:shadow-[6px_6px_0px_#fff] rotate-[1.5deg] relative flex flex-col justify-between transition-all duration-300"
          >
            <div>
              {/* Active project pill indicator */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3.5 h-3.5 rounded-full bg-[#52D3D8] border-2 border-black dark:border-white relative">
                  <div className="absolute inset-0 rounded-full bg-[#52D3D8] animate-ping opacity-60" />
                </div>
                <span className="font-accent text-[10px] tracking-wider text-black dark:text-zinc-200 font-black uppercase">
                  OPEN FOR RESERVATIONS
                </span>
              </div>

              <h3 className="font-display font-black text-4xl md:text-5xl text-black dark:text-white leading-[0.9] mb-4">
                READY TO<br />
                <span className="bg-[#ff1694] text-white px-3 py-1 rotate-[-2deg] inline-block border-2 border-black dark:border-white shadow-[3px_3px_0px_#000] dark:shadow-[3px_3px_0px_#fff] mt-2">
                  BUILD?
                </span>
              </h3>
              <p className="font-body text-xs font-bold text-black/70 dark:text-zinc-300 leading-relaxed mb-8 max-w-sm">
                Let's sit down and convert your vision into a robust application. Shipped rapidly and maintained reliably.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a href="mailto:harshitardik312@gmail.com" className="clay-btn clay-btn-secondary font-black text-xs py-2.5 px-6">
                Send Transmission ⚡
              </a>
              <a href="tel:+919431831261" className="clay-btn bg-white dark:bg-zinc-800 text-black dark:text-white font-black text-xs py-2.5 px-6 border-2 border-black dark:border-white">
                Phone Dial ↗
              </a>
            </div>
          </motion.div>
        </div>

        {/* Footer info line */}
        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          viewport={{ once: true }} 
          transition={{ delay: 0.4 }}
          className="mt-20 pt-8 border-t-3 border-black dark:border-white flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p className="font-display text-lg tracking-wider text-black dark:text-white font-black uppercase">
            © 2026 HARSHIT MISHRA
          </p>
          <p className="font-accent text-[10px] tracking-widest text-black/50 dark:text-zinc-500 uppercase font-black">
            HAND-SKETCHED SYSTEM · DARBHANGA, BIHAR
          </p>
        </motion.div>
      </div>
    </section>
  );
}
