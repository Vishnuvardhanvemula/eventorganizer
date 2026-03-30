"use client";

export function Footer() {
  return (
    <footer className="w-full bg-[#111111] text-[#FCFAF5] pt-24 pb-12 border-t-4 border-[var(--color-gold)] relative z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 lg:gap-8 mb-20">
          
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-baseline gap-[2px] mb-6">
              <span className="font-serif text-4xl tracking-widest text-[#FCFAF5]">R</span>
              <span className="font-serif text-4xl text-[var(--color-gold)]">C</span>
              <span className="font-serif text-4xl tracking-widest text-[#FCFAF5]">B</span>
            </div>
            <p className="font-sans text-[var(--color-text-muted)] text-sm max-w-sm mb-8 leading-loose">
              Comprehensive event production focusing on bespoke audio, video, tailored lighting, and atmospheric design for unforgettable celebrations.
            </p>
            <div className="flex items-center gap-4 hidden md:flex">
              {['Facebook', 'Instagram', 'Vimeo'].map((platform) => (
                <a 
                  key={platform}
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/20 hover:border-white/50 flex items-center justify-center transition-colors text-xs font-sans text-[var(--color-text-muted)] hover:text-white"
                >
                  {platform.charAt(0)}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-sans text-[11px] tracking-[0.25em] uppercase text-[var(--color-text-muted)] mb-6 font-medium">Production</h4>
            <ul className="space-y-4">
              {['Premium Audio', 'LED Video Walls', 'Bespoke Lighting', 'Dance Floors', 'Atmosphere'].map((item) => (
                <li key={item}>
                  <a href="#" className="font-sans text-sm text-[var(--color-text-muted)] hover:text-[var(--color-gold)] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-[11px] tracking-[0.25em] uppercase text-[var(--color-text-muted)] mb-6 font-medium">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:+18005550199" className="font-sans text-sm text-[var(--color-text-muted)] hover:text-[#FCFAF5] transition-colors">
                  (800) 555-0199
                </a>
              </li>
              <li>
                <a href="mailto:hello@rcbevents.com" className="font-sans text-sm text-[var(--color-text-muted)] hover:text-[#FCFAF5] transition-colors">
                  hello@rcbevents.com
                </a>
              </li>
              <li className="font-sans text-sm text-[var(--color-text-muted)] pt-4">
                Available nationwide.
                <br />Based in Los Angeles.
              </li>
            </ul>
          </div>

        </div>

        <div className="w-full h-px bg-[var(--color-bg-secondary)]/10 mb-8" />

        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-sans text-[10px] tracking-[0.1em] uppercase text-[var(--color-text-muted)]">
            © {new Date().getFullYear()} RCB Events & Productions.
          </span>
          <div className="flex items-center gap-6 md:hidden">
            {["Instagram", "Vimeo", "Facebook"].map((social) => (
              <span key={social} className="font-sans text-[10px] tracking-[0.1em] uppercase text-[var(--color-text-muted)] hover:text-[#FCFAF5] cursor-pointer transition-colors">
                {social}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
