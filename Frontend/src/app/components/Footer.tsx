import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  const paymentMethods = [
    'IBAN Transfer', 'Bank Transfer', 'Papara', 'CMT',
    'Bitcoin', 'Ethereum', 'Paysafe', 'Skrill', 'Neteller'
  ];

  const footerLinks = {
    [t('footer.aboutUs')]: [
      t('footer.whoWeAre'),
      t('footer.contact'),
      t('footer.career'),
      t('footer.press'),
      t('footer.partnership')
    ],
    [t('footer.help')]: [
      t('footer.faq'),
      t('footer.paymentMethods'),
      t('footer.withdrawal'),
      t('footer.responsibility'),
      t('footer.security')
    ],
    [t('footer.legal')]: [
      t('footer.termsOfUse'),
      t('footer.privacyPolicy'),
      t('footer.cookiePolicy'),
      t('footer.bonusTerms'),
      t('footer.license')
    ],
    [t('footer.games')]: [
      t('footer.slotGames'),
      t('footer.liveCasino'),
      t('footer.sportsBetting'),
      t('footer.virtualSports'),
      t('footer.eSports')
    ]
  };

  return (
    <footer className="bg-[#0b0b1a] text-white pt-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 space-y-6">
            <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 tracking-tighter italic">GARBET</h2>
            <p className="text-white/40 text-sm leading-relaxed font-medium">
              {t('footer.description')}
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-purple-500/20 hover:border-purple-500/40 hover:text-purple-400 transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-6">
              <h3 className="font-black text-xs uppercase tracking-[0.2em] text-white/30">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-white/60 hover:text-cyan-400 text-sm font-bold transition-all duration-300 hover:translate-x-1 inline-block">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="mt-20 p-8 rounded-[2.5rem] bg-[#16162d] border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-cyan-500/5 opacity-50"></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                <Mail className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Email Support</p>
                <a href="mailto:info@garbet.com" className="text-white font-black hover:text-purple-400 transition-colors">info@garbet.com</a>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                <Phone className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">{t('footer.phone')}</p>
                <a href="tel:+908501234567" className="text-white font-black hover:text-cyan-400 transition-colors">+90 850 123 45 67</a>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20">
                <MapPin className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">{t('footer.liveSupport')}</p>
                <span className="text-white font-black">{t('footer.alwaysHere')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 bg-[#080815] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-white/30 text-xs font-bold uppercase tracking-widest">{t('footer.copyright')}</p>
            <div className="flex flex-wrap justify-center gap-8">
              <span className="text-white/30 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors cursor-help">{t('footer.responsibleGaming')}</span>
              <span className="text-white/30 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors cursor-help">{t('footer.licenseNo')}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}