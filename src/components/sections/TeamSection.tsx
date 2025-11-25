// src/components/sections/TeamSection.tsx
import React, { useState, useEffect } from 'react';
import pp1 from '@/assets/pp1.jpg';
import pp4 from '@/assets/pp4.jpg';
import { Linkedin, Instagram, Facebook, Twitter, MessageSquare } from 'lucide-react';

interface TeamMember {
  image: string;
  name: string;
  role: string;
  description: string;
  linkedin: string;
  instagram: string;
  facebook: string;
  twitter: string;
  whatsapp: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

const teamMembers: TeamMember[] = [
  {
    image: pp1,
    name: 'TARMA, S.Kom',
    role: 'Chief Executive Officer (CEO)',
    description:
      'Pemimpin strategis yang mengarahkan visi perusahaan dalam pengembangan solusi jaringan terintegrasi...',
    linkedin: '#',
    instagram: 'https://instagram.com/budisantoso',
    facebook: 'https://facebook.com/budisantoso',
    twitter: 'https://twitter.com/budisantoso',
    whatsapp: '628123456789',
  },
  {
    image: 'https://picsum.photos/id/177/300/300',
    name: 'INDRA ADE, S. Kom',
    role: 'E-Learning System Developer & Network Specialist',
    description:
      'Bertanggung jawab dalam perancangan dan pengembangan platform e-learning perusahaan...',
    linkedin: '#',
    instagram: '#',
    facebook: '#',
    twitter: '#',
    whatsapp: '628123456789',
  },
  {
    image: 'https://picsum.photos/id/187/300/300',
    name: 'YUSUF FAISAL',
    role: 'Windows Server Administrator & Infrastructure Engineer',
    description:
      'Mengelola dan mengoptimalkan server berbasis Windows untuk memastikan performa dan keamanan sistem perusahaan...',
    linkedin: '#',
    instagram: '#',
    facebook: '#',
    twitter: '#',
    whatsapp: '628123456789',
  },
  {
    image: pp4,
    name: 'AGRA MAESA KUSUMAH',
    role: 'Full Stack Web Developer & System Application Engineer',
    description:
      'Mengembangkan website company profile sekaligus merancang aplikasi berbasis web...',
    linkedin: '#',
    instagram: '#',
    facebook: '#',
    twitter: '#',
    whatsapp: '628123456789',
  },
];

const TeamSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <section id="team" className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 relative overflow-hidden">
      
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0 animate-[gridMove_20s_linear_infinite]"
          style={{
            backgroundImage: 'linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Floating Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-indigo-400 opacity-30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `float ${particle.duration}s ease-in-out infinite ${particle.delay}s`,
          }}
        />
      ))}

      {/* Tech Corner Decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 border-l-4 border-t-4 border-indigo-500/30 opacity-50" />
      <div className="absolute bottom-0 right-0 w-64 h-64 border-r-4 border-b-4 border-purple-500/30 opacity-50" />
      
      {/* Glowing Orbs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse [animation-delay:2s]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block">
            <h2 className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-2 animate-pulse">
              <span className="inline-block mr-2">⚡</span>
              Tim Inti Kami
              <span className="inline-block ml-2">⚡</span>
            </h2>
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
          </div>
          
          <h3 className="mt-4 text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Para Profesional di Balik
            <span className="block mt-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              Koneksi Andal Anda
            </span>
          </h3>
          
          <p className="mt-6 max-w-3xl text-lg text-gray-300 mx-auto leading-relaxed">
            Kami adalah perpaduan antara teknisi bersertifikasi dan ahli strategi bisnis yang berdedikasi.
          </p>

          {/* Tech Divider */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-indigo-500" />
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-indigo-500" />
          </div>
        </div>

        {/* Grid Anggota Tim */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative animate-[slideUp_0.8s_ease-out_both]"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Card Container */}
              <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm p-6 rounded-2xl border border-indigo-500/30 text-center transition-all duration-500 hover:border-indigo-400 hover:shadow-2xl hover:shadow-indigo-500/30 hover:-translate-y-3 overflow-hidden">
                
                {/* Animated Border Gradient */}
                <div 
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${hoveredIndex === index ? 'animate-[shimmer_2s_linear_infinite]' : ''}`}
                  style={{
                    background: 'linear-gradient(45deg, transparent 30%, rgba(99, 102, 241, 0.1) 50%, transparent 70%)',
                    backgroundSize: '200% 200%',
                  }}
                />

                {/* Corner Tech Accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-indigo-500/50 transition-all duration-300 group-hover:w-12 group-hover:h-12 group-hover:border-indigo-400" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-purple-500/50 transition-all duration-300 group-hover:w-12 group-hover:h-12 group-hover:border-purple-400" />

                {/* Scanning Lines */}
                <div className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-indigo-400 to-transparent transition-transform duration-1000 ${hoveredIndex === index ? 'translate-y-0' : '-translate-y-full'}`} />
                <div className={`absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent transition-transform duration-1000 ${hoveredIndex === index ? 'translate-y-0' : 'translate-y-full'}`} />

                {/* Foto Tim dengan Hexagon Effect */}
                <div className="relative mx-auto w-32 h-32 mb-6">
                  {/* Outer Glow Ring */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                  
                  {/* Rotating Ring */}
                  <div className={`absolute inset-0 rounded-full border-2 border-dashed border-indigo-400/50 transition-all duration-700 ${hoveredIndex === index ? 'rotate-180 scale-110' : 'rotate-0'}`} />
                  
                  {/* Photo Container */}
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-indigo-500/70 group-hover:border-indigo-400 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-indigo-500/50">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover transform group-hover:scale-125 transition-transform duration-700"
                    />
                    
                    {/* Scan Line Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent ${hoveredIndex === index ? 'animate-[scan_2s_linear_infinite]' : 'opacity-0'}`} />
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Tech Corner Markers */}
                  <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="relative z-10 space-y-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors duration-300">
                    {member.name}
                  </h3>
                  
                  <div className="inline-block">
                    <p className="text-sm font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300">
                      {member.role}
                    </p>
                    <div className="h-0.5 w-full bg-gradient-to-r from-indigo-500 to-purple-500 mt-1 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </div>
                  
                  <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {member.description}
                  </p>

                  {/* Tech Stats Bars (Decorative) */}
                  <div className="pt-3 space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="h-1 bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-full animate-[growBar_1s_ease-out] w-[85%]" />
                    <div className="h-1 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full animate-[growBar_1.2s_ease-out] w-[70%]" />
                    <div className="h-1 bg-gradient-to-r from-pink-600 to-pink-400 rounded-full animate-[growBar_1.4s_ease-out] w-[90%]" />
                  </div>

                  {/* Social Media Links */}
                  <div className="pt-4 flex justify-center gap-3">
                    <a 
                      href={member.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="p-2 rounded-lg bg-slate-700/50 text-gray-400 hover:text-blue-400 hover:bg-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-110 hover:-rotate-12" 
                      aria-label="LinkedIn"
                    >
                      <Linkedin size={18} />
                    </a>

                    <a 
                      href={member.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-700/50 text-gray-400 hover:text-pink-400 hover:bg-pink-500/20 hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300 transform hover:scale-110 hover:rotate-12" 
                      aria-label="Instagram"
                    >
                      <Instagram size={18} />
                    </a>
                    
                    <a 
                      href={member.facebook} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-700/50 text-gray-400 hover:text-blue-500 hover:bg-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-300 transform hover:scale-110 hover:-rotate-12" 
                      aria-label="Facebook"
                    >
                      <Facebook size={18} />
                    </a>

                    <a 
                      href={member.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-700/50 text-gray-400 hover:text-sky-400 hover:bg-sky-500/20 hover:shadow-lg hover:shadow-sky-500/30 transition-all duration-300 transform hover:scale-110 hover:rotate-12" 
                      aria-label="Twitter"
                    >
                      <Twitter size={18} />
                    </a>

                    <a 
                      href={`https://wa.me/${member.whatsapp}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-700/50 text-gray-400 hover:text-green-400 hover:bg-green-500/20 hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 transform hover:scale-110 hover:-rotate-12" 
                      aria-label="WhatsApp"
                    >
                      <MessageSquare size={18} />
                    </a>
                  </div>
                </div>

                {/* Bottom Tech Line */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
              </div>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
};

export default TeamSection;