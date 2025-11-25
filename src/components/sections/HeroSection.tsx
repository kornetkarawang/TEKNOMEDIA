// src/components/sections/HeroSection.tsx

import { useState, useEffect } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import hero1 from "../../assets/hero-1.jpg";
import hero2 from "../../assets/hero-2.jpg";
import hero3 from "../../assets/hero-3.jpg";

const SLIDE_INTERVAL = 5000;

const slides = [
  { id: 1, image: hero1, alt: "Education Technology" },
  { id: 2, image: hero2, alt: "Digital Learning" },
  { id: 3, image: hero3, alt: "E-Learning Platform" },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [textVisible, setTextVisible] = useState(false);

  // 🔄 Auto-Slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  // ✨ Text Animation Trigger
  useEffect(() => {
    setTextVisible(false);
    const textTimer = setTimeout(() => setTextVisible(true), 300);
    return () => clearTimeout(textTimer);
  }, [currentSlide]);

  // 🔑 Scroll Function
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
      ))}

      {/* Animated Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-[twinkle_3s_ease-in-out_infinite]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* 📝 Konten Teks dengan Animasi */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white z-10 px-4 max-w-5xl">
          
          {/* Welcome Badge */}
          <div 
            className={`inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2 rounded-full mb-6 transition-all duration-700 ${
              textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
            }`}
          >
            <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
            <span className="text-sm font-semibold tracking-wider">SELAMAT DATANG</span>
            <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
          </div>

          {/* Main Title dengan Multiple Effects */}
          <h1 className={`text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 transition-all duration-700 delay-100 ${
            textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <span className="inline-block animate-[fadeInUp_1s_ease-out_0.2s_both]">
              Selamat Datang di
            </span>
            <br />
            <span className="relative inline-block mt-2">
              {/* Glowing Background */}
              <span className="absolute inset-0 blur-2xl bg-gradient-to-r from-blue-500 via-cyan-400 to-green-400 opacity-50 animate-pulse" />
              
              {/* Main Text with Gradient */}
              <span className="relative bg-gradient-to-r from-blue-400 via-cyan-300 to-green-400 bg-clip-text text-transparent font-black animate-[shimmerText_3s_ease-in-out_infinite]">
                Teknomedia
              </span>
              
              {/* Underline Animation */}
              <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 500 12" preserveAspectRatio="none">
                <path 
                  d="M0,6 Q125,0 250,6 T500,6" 
                  fill="none" 
                  stroke="url(#heroGradient)" 
                  strokeWidth="3"
                  className="animate-[drawLine_2s_ease-out_0.5s_forwards]"
                  style={{ strokeDasharray: 500, strokeDashoffset: 500 }}
                />
                <defs>
                  <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="50%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>

          {/* Subtitle dengan Typing Effect */}
          <div className={`mb-10 transition-all duration-700 delay-300 ${
            textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed">
              <span className="inline-block animate-[fadeIn_0.5s_ease-out_0.6s_both]">Solusi</span>{' '}
              <span className="font-bold text-cyan-300 animate-[fadeIn_0.5s_ease-out_0.7s_both]">Edukasi</span>
              <span className="animate-[fadeIn_0.5s_ease-out_0.8s_both]">,</span>{' '}
              <span className="font-bold text-blue-300 animate-[fadeIn_0.5s_ease-out_0.9s_both]">Teknologi</span>
              <span className="animate-[fadeIn_0.5s_ease-out_1s_both]">, dan</span>{' '}
              <span className="font-bold text-green-300 animate-[fadeIn_0.5s_ease-out_1.1s_both]">Internet Bisnis</span>
              <br />
              <span className="animate-[fadeIn_0.5s_ease-out_1.2s_both]">dalam</span>{' '}
              <span className="relative inline-block animate-[fadeIn_0.5s_ease-out_1.3s_both]">
                <span className="relative z-10">Satu Platform Terpadu</span>
                <span className="absolute bottom-1 left-0 w-full h-2 bg-gradient-to-r from-blue-500/30 to-green-500/30 -rotate-1" />
              </span>
            </p>
          </div>

          {/* CTA Button dengan Animasi */}
          <div className={`flex flex-col items-center gap-6 transition-all duration-700 delay-500 ${
            textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <button
              onClick={() => scrollToSection("about")}
              className="group relative px-10 py-4 bg-gradient-to-r from-blue-600 via-cyan-500 to-green-500 rounded-full text-lg font-bold shadow-2xl hover:shadow-cyan-500/50 transition-all duration-500 hover:scale-105 overflow-hidden"
            >
              {/* Button Shine Effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              
              {/* Button Glow */}
              <span className="absolute inset-0 blur-xl bg-gradient-to-r from-blue-400 to-green-400 opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
              
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="w-5 h-5 animate-[spin_3s_linear_infinite]" />
                Mulai Menjelajah
                <ChevronDown className="w-5 h-5 animate-bounce" />
              </span>
            </button>

            {/* Scroll Indicator */}
            <div className="flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity animate-bounce">
              <span className="text-xs uppercase tracking-widest">Scroll Down</span>
              <ChevronDown className="w-6 h-6" />
            </div>
          </div>

          {/* Decorative Lines */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-white/50 animate-[growDown_2s_ease-out]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-t from-transparent to-white/50 animate-[growUp_2s_ease-out]" />
        </div>
      </div>

      {/* Navigation Dots dengan Animasi */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 rounded-full transition-all duration-500 hover:scale-110 ${
              index === currentSlide
                ? "w-8 bg-gradient-to-r from-blue-500 to-green-500 shadow-lg shadow-cyan-500/50"
                : "w-3 bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

    </section>
  );
};

export default HeroSection;