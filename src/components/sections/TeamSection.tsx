// src/components/sections/TeamSection.tsx
import React from 'react';
// IMPORT LENGKAP: Hanya ikon yang digunakan di bawah yang diimport
import { Linkedin, Instagram, Facebook, Twitter, MessageSquare } from 'lucide-react'; 

// Data Anggota Tim (Ditambahkan Link Sosial Media lengkap)
const teamMembers = [
  {
    image: 'https://picsum.photos/id/64/300/300', 
    name: 'Budi Santoso',
    role: 'Chief Executive Officer (CEO)',
    description: 'Visioner di balik solusi jaringan terintegrasi, fokus pada inovasi teknologi dan kemitraan strategis.',
    linkedin: '#',
    instagram: 'https://instagram.com/budisantoso', // Ganti dengan link aktual
    facebook: 'https://facebook.com/budisantoso',
    twitter: 'https://twitter.com/budisantoso',
    whatsapp: '628123456789', // Hanya nomor tanpa + atau ()
  },
  {
    image: 'https://picsum.photos/id/177/300/300',
    name: 'Rina Wijaya',
    role: 'Lead Network Engineer',
    description: 'Ahli dalam topologi Fiber Optik dan konfigurasi jaringan enterprise dengan sertifikasi internasional.',
    linkedin: '#', instagram: '#', facebook: '#', twitter: '#', whatsapp: '628123456789',
  },
  {
    image: 'https://picsum.photos/id/187/300/300',
    name: 'Asep Kusuma',
    role: 'Customer Service & Support Lead',
    description: 'Garda terdepan kami yang memastikan setiap klien mendapatkan dukungan teknis yang cepat dan solusi terbaik.',
    linkedin: '#', instagram: '#', facebook: '#', twitter: '#', whatsapp: '628123456789',
  },
  {
    image: 'https://picsum.photos/id/83/300/300',
    name: 'Dewi Lestari',
    role: 'Marketing & Sales Manager',
    description: 'Bertanggung jawab dalam menjangkau pasar dan memastikan produk serta layanan kami sesuai dengan kebutuhan klien.',
    linkedin: '#', instagram: '#', facebook: '#', twitter: '#', whatsapp: '628123456789',
  },
];

const TeamSection: React.FC = () => {
  return (
    <section id="team" className="py-16 md:py-24 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Header Section (TETAP) */}
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">
            Tim Inti Kami
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Para Profesional di Balik Koneksi Andal Anda
          </p>
          <p className="mt-4 max-w-3xl text-xl text-gray-500 mx-auto">
            Kami adalah perpaduan antara teknisi bersertifikasi dan ahli strategi bisnis yang berdedikasi.
          </p>
        </div>

        {/* Grid Anggota Tim (TETAP) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 text-center transition duration-300 hover:shadow-2xl"
            >
              
              {/* Foto Tim (TETAP) */}
              <div className="mx-auto h-32 w-32 rounded-full overflow-hidden mb-4 border-4 border-indigo-500/50">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900">
                {member.name}
              </h3>
              <p className="mt-1 text-base font-semibold text-indigo-600">
                {member.role}
              </p>
              <p className="mt-3 text-sm text-gray-600 line-clamp-3">
                {member.description}
              </p>

              {/* BARU: Social Media Links Lengkap */}
              <div className="mt-4 flex justify-center space-x-3">
                
                {/* 1. LinkedIn */}
                <a href={member.linkedin} target="_blank" className="text-gray-400 hover:text-blue-700 transition" aria-label="LinkedIn" rel="noopener noreferrer">
                    <Linkedin size={20} />
                </a>

                {/* 2. Instagram */}
                <a href={member.instagram} target="_blank" className="text-gray-400 hover:text-pink-600 transition" aria-label="Instagram" rel="noopener noreferrer">
                    <Instagram size={20} />
                </a>
                
                {/* 3. Facebook */}
                <a href={member.facebook} target="_blank" className="text-gray-400 hover:text-blue-600 transition" aria-label="Facebook" rel="noopener noreferrer">
                    <Facebook size={20} />
                </a>

                {/* 4. Twitter/X */}
                <a href={member.twitter} target="_blank" className="text-gray-400 hover:text-black transition" aria-label="Twitter">
                    <Twitter size={20} />
                </a>

                {/* 5. WhatsApp (Menggunakan MessageSquare sebagai ikon chat) */}
                <a href={`https://wa.me/${member.whatsapp}`} target="_blank" className="text-gray-400 hover:text-green-600 transition" aria-label="WhatsApp" rel="noopener noreferrer">
                    <MessageSquare size={20} />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TeamSection;