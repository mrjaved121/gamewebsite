import { ImageWithFallback } from './figma/ImageWithFallback';

export function PartnersSection() {
  const partners = [
    'IBAN Transfer', 'Bank Transfer', 'Papara', 'CMT',
    'Bitcoin', 'Ethereum', 'Paysafe', 'Skrill', 'Neteller'
  ];

  return (
    <section className="bg-[#0f0f2d] py-8 sm:py-10 border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-cyan-500/5 opacity-50"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
              <div className="relative bg-white/5 hover:bg-white/10 px-5 sm:px-7 py-3 sm:py-4 rounded-xl border border-white/10 backdrop-blur-sm transition-all duration-300 transform group-hover:-translate-y-1">
                <span className="text-white/60 group-hover:text-white font-bold text-xs sm:text-sm tracking-wide transition-colors uppercase">{partner}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}