import Slider from 'react-slick';
import heroSlideImage from 'figma:asset/6b25af3fc63b855ab1d685382f87b4c12b5067d2.png';
import heroSlideImage2 from 'figma:asset/7e2be0d32155949e6b204487f7b8195eaac95d41.png';
import heroSlideImage3 from 'figma:asset/2aa5f6c6f8348c6eed747df512fb481f74563188.png';
import heroSlideImage4 from 'figma:asset/829c563d89452f47b33ae624de65e7d770ba55ac.png';
import heroSlideImage5 from 'figma:asset/c2ca212a36049c4470714878b2235fa60aab72d9.png';

const slides = [
  {
    id: 1,
    image: heroSlideImage,
    type: 'custom',
    discount: '',
    title: '',
    subtitle: ''
  },
  {
    id: 2,
    image: heroSlideImage2,
    type: 'custom',
    discount: '',
    title: '',
    subtitle: ''
  },
  {
    id: 3,
    image: heroSlideImage3,
    type: 'custom',
    discount: '',
    title: '',
    subtitle: ''
  },
  {
    id: 4,
    image: heroSlideImage4,
    type: 'custom',
    discount: '',
    title: '',
    subtitle: ''
  },
  {
    id: 5,
    image: heroSlideImage5,
    type: 'custom',
    discount: '',
    title: '',
    subtitle: ''
  }
];

export function HeroSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    pauseOnHover: true,
    fade: true,
    cssEase: 'ease-in-out',
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    appendDots: (dots: any) => (
      <div style={{ bottom: '20px' }}>
        <ul style={{ margin: '0px', padding: '0px', display: 'flex', justifyContent: 'center', gap: '8px' }}> {dots} </ul>
      </div>
    ),
    customPaging: () => (
      <div
        style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.5)',
          cursor: 'pointer'
        }}
      ></div>
    )
  };

  return (
    <div className="w-full relative bg-[#0b0b1a]">
      <style>{`
        .hero-slider .slick-slider {
          position: relative;
        }
        .hero-slider .slick-list {
          overflow: hidden;
        }
        .hero-slider .slick-dots {
          bottom: 30px;
          z-index: 10;
        }
        .hero-slider .slick-dots li {
          margin: 0 4px;
        }
        .hero-slider .slick-dots li.slick-active div {
          background: linear-gradient(to right, #8b5cf6, #22d3ee) !important;
          width: 32px;
          border-radius: 6px;
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
        }
        .hero-slider .slick-dots li div {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(255, 255, 255, 0.2) !important;
        }
        .hero-slider .slick-prev,
        .hero-slider .slick-next {
          z-index: 20;
          width: 60px;
          height: 60px;
        }
        .hero-slider .slick-prev {
          left: 40px;
        }
        .hero-slider .slick-next {
          right: 40px;
        }
        .hero-slider .slick-prev:before,
        .hero-slider .slick-next:before {
          display: none;
        }
      `}</style>
      <div className="hero-slider relative group">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0b0b1a] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0b0b1a] to-transparent z-10 pointer-events-none"></div>

        <Slider {...settings}>
          {slides.map((slide) => (
            <div key={slide.id}>
              {slide.type === 'custom' ? (
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: '42.33 / 15.8' }}>
                  <img
                    src={slide.image}
                    alt="Casino Promotion"
                    className="w-full h-full object-cover transition-transform duration-10000 group-hover:scale-105"
                  />
                  {/* Subtle dark overlay to make it look deeper */}
                  <div className="absolute inset-0 bg-[#0b0b1a]/10"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b1a]/40 via-transparent to-[#0b0b1a]/40"></div>
                </div>
              ) : (
                <div className="relative w-full overflow-hidden bg-[#0d0d21]" style={{ aspectRatio: '42.33 / 15.8' }}>
                  {/* Background content from original code remains here but updated with dark colors */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-10 right-20 w-80 h-80 bg-purple-600/20 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-10 left-20 w-80 h-80 bg-cyan-600/20 rounded-full blur-[100px]"></div>
                  </div>
                  <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex-1 z-10">
                        <div className="text-7xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50 leading-none mb-4">
                          {slide.discount}
                        </div>
                        <div className="space-y-2">
                          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase italic">{slide.title}</h2>
                          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 tracking-tight uppercase italic">{slide.subtitle}</h2>
                        </div>
                        <button className="mt-8 px-10 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-2xl font-black text-sm tracking-widest transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] flex items-center gap-3 uppercase">
                          <span>Play Now</span>
                          <span className="text-xl">→</span>
                        </button>
                      </div>
                      <div className="hidden md:block flex-1 relative h-full">
                        <img src={slide.image} alt={slide.title} className="absolute right-0 top-1/2 transform -translate-y-1/2 h-[130%] w-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

function CustomPrevArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      className="absolute left-10 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center text-white transition-all duration-500 hover:scale-110 opacity-0 group-hover:opacity-100 transform hover:border-purple-500/50"
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </button>
  );
}

function CustomNextArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      className="absolute right-10 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center text-white transition-all duration-500 hover:scale-110 opacity-0 group-hover:opacity-100 transform hover:border-cyan-500/50"
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </button>
  );
}