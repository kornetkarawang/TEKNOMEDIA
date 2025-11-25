// src/components/sections/GaleryTeam.tsx
import React, { useState } from 'react';
import { ImageIcon, Camera, Eye, ZoomIn, Heart } from 'lucide-react';

interface GalleryItem {
  id: number;
  image: string;
  title: string;
  description: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    image: 'https://picsum.photos/400/300?random=11',
    title: 'Meeting & Diskusi Proyek',
    description: 'Sesi brainstorming bersama tim untuk merancang solusi jaringan sekolah modern.',
  },
  {
    id: 2,
    image: 'https://picsum.photos/400/300?random=12',
    title: 'Implementasi Fiber Optik',
    description: 'Tim lapangan melakukan penarikan kabel dan konfigurasi perangkat FO.',
  },
  {
    id: 3,
    image: 'https://picsum.photos/400/300?random=13',
    title: 'Training E-Learning',
    description: 'Pelatihan penggunaan platform e-learning untuk guru dan staf sekolah.',
  },
  {
    id: 4,
    image: 'https://picsum.photos/400/300?random=14',
    title: 'Setup Server Sekolah',
    description: 'Konfigurasi Windows Server untuk manajemen user dan data sekolah.',
  },
  {
    id: 5,
    image: 'https://picsum.photos/400/300?random=15',
    title: 'Maintenance Perangkat',
    description: 'Pemeliharaan rutin access point dan switch jaringan.',
  },
  {
    id: 6,
    image: 'https://picsum.photos/400/300?random=16',
    title: 'Kolaborasi Tim',
    description: 'Dokumentasi kolaborasi internal untuk meningkatkan layanan digital.',
  },
];

const GaleryTeam: React.FC = () => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set());

  const toggleLike = (id: number) => {
    const newLiked = new Set(likedItems);
    if (newLiked.has(id)) {
      newLiked.delete(id);
    } else {
      newLiked.add(id);
    }
    setLikedItems(newLiked);
  };

  return (
    <section id="galeri-tim" className="py-16 md:py-24 bg-gradient-to-b from-slate-50 via-gray-50 to-white relative overflow-hidden">
      
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {/* Camera Icons Background */}
        <Camera className="absolute top-20 left-10 w-32 h-32 text-indigo-200 animate-[float_8s_ease-in-out_infinite] rotate-12" />
        <Camera className="absolute bottom-32 right-20 w-40 h-40 text-purple-200 animate-[float_10s_ease-in-out_infinite] -rotate-12" />
        
        {/* Polaroid Frames */}
        <div className="absolute top-40 right-10 w-24 h-28 border-8 border-white shadow-lg rotate-12 animate-[sway_6s_ease-in-out_infinite]" />
        <div className="absolute bottom-40 left-20 w-20 h-24 border-8 border-white shadow-lg -rotate-6 animate-[sway_7s_ease-in-out_infinite]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">

        {/* Header Section */}
        <div className="text-center mb-16 space-y-6">
          {/* Camera Icon Decoration */}
          <div className="flex justify-center items-center gap-4 mb-4">
            <div className="flex items-center gap-2 animate-[fadeIn_1s_ease-out]">
              <Camera className="w-8 h-8 text-indigo-500 animate-[shake_2s_ease-in-out_infinite]" />
              <div className="h-px w-16 bg-gradient-to-r from-indigo-400 to-transparent" />
            </div>
            <Eye className="w-8 h-8 text-purple-500 animate-pulse" />
            <div className="flex items-center gap-2 animate-[fadeIn_1s_ease-out_0.2s_both]">
              <div className="h-px w-16 bg-gradient-to-l from-purple-400 to-transparent" />
              <ImageIcon className="w-8 h-8 text-pink-500 animate-[shake_2s_ease-in-out_infinite]" />
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-[0.2em] animate-[fadeIn_1s_ease-out]">
              Galeri Kegiatan
            </h2>
            
            <p className="text-4xl md:text-5xl font-extrabold text-gray-900 animate-[fadeInUp_1s_ease-out]">
              Dokumentasi Tim
              <br />
              <span className="relative inline-block mt-2">
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Profesional Kami
                </span>
                {/* Film Strip Underline */}
                <div className="absolute -bottom-2 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-500 animate-[expand_1.5s_ease-out]">
                  <div className="flex justify-around h-full">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="w-1 h-full bg-white" />
                    ))}
                  </div>
                </div>
              </span>
            </p>
          </div>

          <p className="max-w-3xl text-lg text-gray-600 mx-auto leading-relaxed animate-[fadeInUp_1s_ease-out_0.3s_both]">
            Mengabadikan momen kolaborasi, instalasi jaringan, dan implementasi solusi digital terbaik untuk institusi pendidikan.
          </p>
        </div>

        {/* Grid Galeri Foto - Masonry Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className="group relative animate-[zoomIn_0.6s_ease-out_both]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Polaroid Frame Effect */}
              <div className="relative bg-white rounded-lg shadow-xl border-8 border-white transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 hover:rotate-2 overflow-hidden">
                
                {/* Photo Container */}
                <div className="relative h-64 w-full bg-gray-200 overflow-hidden">
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Flash Effect */}
                  <div 
                    className={`absolute inset-0 bg-white ${hoveredItem === item.id ? 'animate-[flash_0.5s_ease-out]' : 'opacity-0'}`}
                  />

                  {/* View Icon Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform duration-500">
                      <ZoomIn className="w-8 h-8 text-indigo-600" />
                    </div>
                  </div>

                  {/* Like Button */}
                  <button
                    onClick={() => toggleLike(item.id)}
                    className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg transform translate-y-0 opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300 hover:scale-110"
                  >
                    <Heart 
                      className={`w-5 h-5 transition-all duration-300 ${likedItems.has(item.id) ? 'fill-red-500 text-red-500 scale-110' : 'text-gray-600'}`}
                    />
                  </button>

                  {/* Film Frame Corners */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-white/50" />
                  <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-white/50" />
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-white/50" />
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-white/50" />
                </div>

                {/* Caption Area */}
                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 group-hover:text-gray-700 transition-colors duration-300">
                    {item.description}
                  </p>

                  {/* View Button */}
                  <button
                    className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden group/btn relative"
                  >
                    {/* Button Shine */}
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                    
                    <ImageIcon size={18} className="mr-2 relative z-10 animate-[wiggle_1s_ease-in-out_infinite]" />
                    <span className="relative z-10">Lihat Foto</span>
                  </button>
                </div>

                {/* Tape Effect on Top */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-yellow-100/80 border border-yellow-200 shadow-md rotate-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-full h-px bg-yellow-300/50" />
                  </div>
                </div>

                {/* ID Number (Polaroid Style) */}
                <div className="absolute bottom-2 right-2 text-xs text-gray-400 font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  #{item.id.toString().padStart(3, '0')}
                </div>
              </div>

              {/* Shadow Effect */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform scale-95 group-hover:scale-105" />
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-16 text-center animate-[fadeInUp_1s_ease-out_0.8s_both]">
          <a
            href="#galeri-lengkap"
            className="group inline-flex items-center justify-center px-10 py-4 border-2 border-indigo-600 text-base font-semibold rounded-xl text-indigo-600 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-500 shadow-md hover:shadow-2xl relative overflow-hidden"
          >
            {/* Button Background Slide */}
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            
            <Camera size={20} className="mr-3 relative z-10 group-hover:animate-[shake_0.5s_ease-in-out]" />
            <span className="relative z-10">Lihat Galeri Lengkap</span>
            <div className="ml-3 relative z-10 flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i}
                  className="w-2 h-2 bg-current rounded-full animate-[bounce_1s_ease-in-out_infinite]"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </a>
        </div>

      </div>

    </section>
  );
};

export default GaleryTeam;