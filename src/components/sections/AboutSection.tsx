import React, { useState } from "react";

import about1 from "@/assets/about1.jpg";
import about2 from "@/assets/about2.jpg";
import about3 from "@/assets/about3.jpg";
import about4 from "@/assets/about4.jpg";
import vtnetLogo from "@/assets/vtnet.png";

const teamPhotos = [
  { src: about2, alt: "Foto Tim 1" },
  { src: about4, alt: "Foto Tim 2" },
  { src: about1, alt: "Foto Tim 3" },
  { src: about3, alt: "Foto Tim 4" },
];

const AboutSection: React.FC = () => {
  const [hoveredPhoto, setHoveredPhoto] = useState<number | null>(null);

  return (
    <>
      <section
        id="about"
        className="py-20 md:py-32 bg-background relative overflow-hidden"
      >
        {/* ANIMATED BACKGROUND ELEMENTS */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float-slow"></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-slow"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] 
                         bg-primary/5 rounded-full blur-3xl animate-pulse-slow"
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* FOTO KIRI - ENHANCED */}
            <div className="relative animate-fade-in-left">
              <div
                className="relative grid grid-cols-2 gap-4 p-4 bg-card/80 backdrop-blur-sm rounded-2xl 
                            shadow-xl border border-border group hover:shadow-2xl transition-all duration-500"
              >
                {/* GLOW EFFECT */}
                <div
                  className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-2xl 
                              opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"
                ></div>

                {teamPhotos.map((photo, index) => (
                  <div
                    key={index}
                    className="relative w-full aspect-[2/3] overflow-hidden rounded-lg shadow-md transform 
                             transition-all duration-500 ease-out cursor-pointer"
                    style={{
                      zIndex: 10 + index,
                      transform:
                        hoveredPhoto === index
                          ? `rotate(0deg) translateX(0px) translateY(0px) scale(1.05)`
                          : `rotate(${(index - 1.5) * 4}deg) translateX(${
                              index * 5 - 10
                            }px) translateY(${index * 5 - 10}px)`,
                    }}
                    onMouseEnter={() => setHoveredPhoto(index)}
                    onMouseLeave={() => setHoveredPhoto(null)}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-full object-cover transition-transform duration-500 
                               hover:scale-110"
                    />

                    {/* OVERLAY ON HOVER */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent 
                                  opacity-0 hover:opacity-100 transition-opacity duration-300"
                    ></div>
                  </div>
                ))}

                {/* GROUP HOVER OVERLAY */}
                <div
                  className="absolute inset-0 bg-primary/10 rounded-2xl opacity-0 group-hover:opacity-100 
                              transition-opacity duration-300 pointer-events-none"
                />
              </div>

              {/* FLOATING DECORATIONS */}
              <div
                className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-primary to-accent 
                            rounded-full blur-2xl opacity-50 animate-pulse"
              ></div>
              <div
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-accent to-primary 
                            rounded-full blur-2xl opacity-50 animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>

            {/* KONTEN KANAN - ENHANCED */}
            <div className="space-y-8 animate-fade-in-right">
              {/* JUDUL */}
              <div className="mb-8">
                <div className="inline-block mb-4 animate-fade-in">
                  <span
                    className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold 
                                 tracking-wide uppercase border border-primary/20 
                                 shadow-[0_0_20px_rgba(139,92,246,0.3)] animate-pulse-glow"
                  >
                    Company Profile
                  </span>
                </div>

                <h2
                  className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up"
                  style={{ animationDelay: "0.1s" }}
                >
                  <span
                    className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text 
                               text-transparent animate-gradient-x"
                  >
                    About Us
                  </span>
                </h2>

                <div
                  className="h-1 w-24 bg-gradient-to-r from-primary to-accent rounded-full 
                              animate-width-expand shadow-lg"
                ></div>
              </div>

              {/* DESKRIPSI */}
              <p
                className="text-lg text-muted-foreground text-justify leading-relaxed animate-fade-in-up
                          hover:text-foreground transition-colors duration-300"
                style={{ animationDelay: "0.2s" }}
              >
                Teknomedia adalah perusahaan penyedia layanan edukasi berbasis
                industri dan solusi teknologi yang berfokus pada peningkatan
                kompetensi digital generasi muda serta mendukung kebutuhan
                teknologi untuk institusi dan bisnis.
              </p>

              {/* VISI - ENHANCED */}
              <div
                className="p-6 bg-card/80 backdrop-blur-sm rounded-xl border border-border/50 
                            shadow-lg hover:shadow-2xl transition-all duration-500 group
                            hover:scale-[1.02] animate-fade-in-up relative overflow-hidden"
                style={{ animationDelay: "0.3s" }}
              >
                {/* ANIMATED BACKGROUND */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 
                              group-hover:opacity-100 transition-opacity duration-500"
                ></div>

                {/* GLOW EFFECT */}
                <div
                  className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-xl 
                              opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"
                ></div>

                <div className="relative z-10">
                  <h3
                    className="text-2xl font-bold text-primary mb-3 flex items-center group-hover:scale-105 
                               transition-transform duration-300"
                  >
                    <span className="mr-3 text-accent text-3xl animate-bounce-slow">
                      ✨
                    </span>
                    Visi Kami
                  </h3>
                  <p className="text-foreground group-hover:text-primary transition-colors duration-300">
                    Menjadi penyedia layanan edukasi industri dan solusi
                    teknologi yang inovatif dan terpercaya.
                  </p>
                </div>
              </div>

              {/* MISI - ENHANCED */}
              <div
                className="p-6 bg-card/80 backdrop-blur-sm rounded-xl border border-border/50 
                            shadow-lg hover:shadow-2xl transition-all duration-500 group
                            hover:scale-[1.02] animate-fade-in-up relative overflow-hidden"
                style={{ animationDelay: "0.4s" }}
              >
                {/* ANIMATED BACKGROUND */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-accent/5 to-primary/5 opacity-0 
                              group-hover:opacity-100 transition-opacity duration-500"
                ></div>

                {/* GLOW EFFECT */}
                <div
                  className="absolute -inset-1 bg-gradient-to-r from-accent to-primary rounded-xl 
                              opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"
                ></div>

                <div className="relative z-10">
                  <h3
                    className="text-2xl font-bold text-accent mb-3 flex items-center group-hover:scale-105 
                               transition-transform duration-300"
                  >
                    <span
                      className="mr-3 text-primary text-3xl animate-bounce-slow"
                      style={{ animationDelay: "0.5s" }}
                    >
                      🚀
                    </span>
                    Misi Kami
                  </h3>
                  <ul className="space-y-3 text-foreground">
                    {[
                      "Edukasi kelas industri & teaching factory.",
                      "Program digital marketing modern.",
                      "Layanan guru tamu untuk sekolah.",
                      "Solusi IT & layanan digital.",
                      "Layanan internet dedicated & broadband.",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start group/item hover:translate-x-2 transition-transform duration-300"
                        style={{ animationDelay: `${0.1 * index}s` }}
                      >
                        <span
                          className="mr-3 text-accent font-bold text-lg group-hover/item:scale-125 
                                       transition-transform duration-300"
                        >
                          •
                        </span>
                        <span className="group-hover/item:text-accent transition-colors duration-300">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===========================
            KEMITRAAN STRATEGIS - ENHANCED
        ============================ */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32 relative z-10">
          {/* HEADER SECTION */}
          <div
            className="text-center mb-16 animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="inline-block mb-4">
              <span
                className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold 
                             tracking-wide uppercase border border-primary/20 
                             shadow-[0_0_20px_rgba(139,92,246,0.3)] animate-pulse-glow"
              >
                Partnership
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span
                className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text 
                           text-transparent animate-gradient-x"
              >
                Kemitraan Strategis
              </span>
            </h2>

            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Berkolaborasi dengan mitra terpercaya untuk memberikan solusi
              terbaik dan mendukung pertumbuhan bisnis Anda.
            </p>

            {/* DECORATIVE LINE */}
            <div className="mt-6 flex justify-center items-center space-x-3">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary"></div>
              <div className="w-3 h-3 rounded-full bg-primary animate-ping"></div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent"></div>
            </div>
          </div>

          {/* PARTNERSHIP CARDS WRAPPER */}
          <div
            className="relative animate-fade-in-up"
            style={{ animationDelay: "0.7s" }}
          >
            {/* ANIMATED BACKGROUND */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 
                          rounded-3xl blur-3xl -z-10 animate-pulse-slow"
            ></div>

            <div
              className="bg-card/50 backdrop-blur-md rounded-2xl border border-border/50 shadow-2xl 
                          overflow-hidden hover:shadow-[0_0_60px_rgba(139,92,246,0.3)] transition-all duration-500"
            >
              {/* TOP BAR */}
              <div
                className="px-8 py-6 border-b border-border/50 bg-gradient-to-r from-primary/5 to-accent/5 
                            flex flex-col sm:flex-row justify-between items-center gap-4 relative overflow-hidden"
              >
                {/* SHINE EFFECT */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent 
                              -translate-x-full hover:translate-x-full transition-transform duration-1000"
                ></div>

                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-foreground">
                    Mitra Resmi Kami
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Dipercaya oleh industri terkemuka
                  </p>
                </div>

                <button
                  className="relative px-6 py-2.5 rounded-lg bg-gradient-to-r from-primary via-accent to-primary
                                 bg-size-200 bg-pos-0 hover:bg-pos-100 text-white font-semibold 
                                 transition-all duration-500 overflow-hidden group
                                 hover:shadow-[0_0_30px_rgba(139,92,246,0.6)]
                                 hover:scale-105 active:scale-95
                                 border-2 border-[#d400ff] 
                                 before:absolute before:inset-0 before:rounded-lg 
                                 before:bg-gradient-to-r before:from-primary before:via-accent before:to-primary
                                 before:-z-10 before:blur-md before:opacity-0 hover:before:opacity-75
                                 after:absolute after:inset-0 after:rounded-lg 
                                 after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent
                                 after:-translate-x-full hover:after:translate-x-full after:transition-transform 
                                 after:duration-700"
                  style={{
                    backgroundSize: "200% 100%",
                    backgroundPosition: "0% 0%",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundPosition = "100% 0%")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundPosition = "0% 0%")
                  }
                >
                  <span className="relative z-10">Lihat Semua Mitra</span>
                </button>
              </div>

              {/* CARD SECTION */}
              <div className="p-8 md:p-12">
                <div className="w-full flex justify-center">
                  <div className="grid grid-cols-1 place-items-center gap-8 max-w-md">
                    {/* VTNET CARD - SUPER ENHANCED */}
                    <div
                      className="group relative bg-white/95 rounded-xl 
                      border border-primary/40 
                      shadow-xl hover:shadow-primary/40 
                      hover:animate-border-pulse 
                      overflow-hidden transition-all duration-500 flex flex-col w-full"
                    >
                      {/* ANIMATED GRADIENT TOP */}
                      <div
                        className="h-1.5 bg-gradient-to-r from-primary via-accent to-primary 
                                    bg-size-200 animate-gradient-flow"
                      ></div>

                      {/* GLOW EFFECT */}
                      <div
                        className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary 
                                    rounded-xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 -z-10"
                      ></div>

                      <div className="p-6 flex flex-col flex-grow relative">
                        {/* FLOATING PARTICLES */}
                        <div
                          className="absolute top-0 left-0 w-2 h-2 bg-primary rounded-full 
                                      opacity-0 group-hover:opacity-100 group-hover:animate-float-up-1"
                        ></div>
                        <div
                          className="absolute top-0 right-0 w-2 h-2 bg-accent rounded-full 
                                      opacity-0 group-hover:opacity-100 group-hover:animate-float-up-2"
                        ></div>

                        {/* LOGO CONTAINER */}
                        <div className="relative mb-4 flex justify-center">
                          <div className="">
                            <img
                              src={vtnetLogo}
                              alt="VTNet Logo"
                              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>

                          {/* ROTATING RING */}
                          <div
                            className="absolute inset-0 rounded-xl border-2 border-primary/20 
                                        group-hover:animate-spin-slow"
                          ></div>

                          {/* PULSE RING */}
                          <div
                            className="absolute inset-0 rounded-xl border-2 border-accent/30 
                                        animate-ping-slow opacity-0 group-hover:opacity-100"
                          ></div>
                        </div>

                        {/* TEXT CONTENT */}
                        <div className="text-center mb-4 flex-grow">
                          <h3
                            className="text-xl font-bold text-foreground mb-2 
                                       group-hover:text-black group-hover:bg-gradient-to-r 
                                       group-hover:from-primary group-hover:to-accent 
                                       group-hover:bg-clip-text transition-all duration-300"
                          >
                            VTNet
                          </h3>

                          <div
                            className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary 
                                        text-xs font-semibold mb-3 border border-primary/20
                                        group-hover:bg-primary group-hover:text-white 
                                        transition-all duration-300 shadow-sm"
                          >
                            Network Provider
                          </div>

                          <p
                            className="text-muted-foreground text-sm leading-relaxed
                                      group-hover:text-foreground transition-colors duration-300"
                          >
                            Mitra resmi penyedia layanan internet &
                            infrastruktur jaringan terpercaya.
                          </p>
                        </div>

                        {/* CTA BUTTON - NEON */}
                        <a
                          href="https://vtnet.id/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative w-full py-2.5 rounded-lg 
                          bg-gradient-to-r from-primary via-accent to-primary
                          bg-size-200 bg-pos-0 text-white font-semibold text-center block
                          transition-all duration-500 overflow-hidden group/btn
                          hover:shadow-[0_0_40px_rgba(139,92,246,0.6)]
                          hover:scale-105 active:scale-95

                          /* 🟢 NEON GREEN BORDER */
                          border-2 border-[#d400ff] 

                          /* Existing effects */
                          before:absolute before:inset-0 before:rounded-lg 
                          before:bg-gradient-to-r before:from-primary before:via-accent before:to-primary
                          before:-z-10 before:blur-lg before:opacity-0 hover:before:opacity-75
                          after:absolute after:inset-0 after:rounded-lg 
                          after:bg-gradient-to-r after:from-transparent after:via-white/30 after:to-transparent
                          after:-translate-x-full hover:after:translate-x-full 
                          after:transition-transform after:duration-700"
                          style={{
                            backgroundSize: "200% 100%",
                            backgroundPosition: "0% 0%",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundPosition =
                              "100% 0%")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundPosition = "0% 0%")
                          }
                        >
                          <span className="relative z-10 flex items-center justify-center">
                            Kunjungi VTNet
                            <svg
                              className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                              ></path>
                            </svg>
                          </span>
                        </a>
                      </div>

                      {/* SHINE OVERLAY */}
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                                    -translate-x-full group-hover:translate-x-full transition-transform duration-1000
                                    pointer-events-none"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;
