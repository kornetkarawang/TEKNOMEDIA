// src/pages/ContactPage.tsx

import React, { useState } from "react";
import type { ContactFormState, ContactFormErrors } from "../types/contact";

const initialFormState: ContactFormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const initialFormErrors: ContactFormErrors = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormState>(initialFormState);
  const [errors, setErrors] = useState<ContactFormErrors>(initialFormErrors);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [focusedField, setFocusedField] = useState<string>("");

  const validate = (data: ContactFormState): ContactFormErrors => {
    let newErrors: ContactFormErrors = {
      name: "",
      email: "",
      subject: "",
      message: "",
    };

    if (!data.name) newErrors.name = "Nama harus diisi.";
    if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Email tidak valid.";
    }
    if (!data.subject) newErrors.subject = "Subjek harus diisi.";
    if (!data.message || data.message.length < 10) {
      newErrors.message = "Pesan minimal 10 karakter.";
    }
    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.values(validationErrors).some((error) => error !== "")) {
      setStatus("idle");
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      setFormData(initialFormState);
    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (fieldError: string, fieldName: string) =>
    `w-full px-4 py-3 border-2 rounded-lg bg-background/50 backdrop-blur-sm
     transition-all duration-300 outline-none
     ${
       fieldError
         ? "border-red-500 focus:border-red-600 focus:shadow-[0_0_20px_rgba(239,68,68,0.3)]"
         : focusedField === fieldName
         ? "border-accent focus:shadow-[0_0_30px_rgba(139,92,246,0.4)] scale-[1.02]"
         : "border-border hover:border-accent/50"
     }`;

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* ANIMATED BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4">
        {/* HEADER SECTION */}
        <div className="text-center mb-16 relative">
          <div className="inline-block mb-4 animate-fade-in">
            <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide uppercase
                           border border-primary/20 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
              Get In Touch
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent
                           animate-gradient bg-size-200">
              Hubungi Kami
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Kami siap berdiskusi tentang proyek Anda. Sampaikan kebutuhan melalui formulir di bawah ini.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* CONTACT INFO CARD */}
          <div className="lg:col-span-1 space-y-6 animate-fade-in-left">
            <div className="relative p-8 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl rounded-2xl 
                          border border-border/50 shadow-2xl overflow-hidden group
                          hover:shadow-[0_0_40px_rgba(139,92,246,0.3)] transition-all duration-500">
              {/* ANIMATED BORDER */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                   style={{
                     background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.5), transparent)',
                     animation: 'border-flow 3s linear infinite'
                   }}>
              </div>
              
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Informasi Kontak
              </h3>

              <div className="space-y-6">
                {/* EMAIL */}
                <div className="flex items-start space-x-4 p-4 rounded-xl bg-background/50 backdrop-blur-sm
                              hover:bg-primary/5 transition-all duration-300 hover:scale-105 cursor-pointer
                              border border-transparent hover:border-primary/30">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center
                                flex-shrink-0 shadow-lg animate-float">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M3 8l7.8 5L21 8M3 8V16a2 2 0 002 2h14a2 2 0 002-2V8M3 8V6a2 2 0 012-2h14a2 2 0 012 2v2"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Email</p>
                    <p className="text-muted-foreground text-sm">teknomediainfo77@gmail.com</p>
                  </div>
                </div>

                {/* PHONE */}
                <div className="flex items-start space-x-4 p-4 rounded-xl bg-background/50 backdrop-blur-sm
                              hover:bg-accent/5 transition-all duration-300 hover:scale-105 cursor-pointer
                              border border-transparent hover:border-accent/30"
                     style={{ animationDelay: '0.1s' }}>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-lime-500 to-primary flex items-center justify-center
                                flex-shrink-0 shadow-lg animate-float" style={{ animationDelay: '0.5s' }}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.14a8 8 0 003.22 5.22l1.14-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Telepon</p>
                    <p className="text-muted-foreground text-sm">+62 812 9494 2081</p>
                  </div>
                </div>

                {/* LOCATION */}
                <div className="flex items-start space-x-4 p-4 rounded-xl bg-background/50 backdrop-blur-sm
                              hover:bg-primary/5 transition-all duration-300 hover:scale-105 cursor-pointer
                              border border-transparent hover:border-primary/30"
                     style={{ animationDelay: '0.2s' }}>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-accent flex items-center justify-center
                                flex-shrink-0 shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0L6.343 16.657A8 8 0 1117.657 16.657z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Alamat Kantor</p>
                    <p className="text-muted-foreground text-sm">
                      M9JH+PJV, Jl. Lemah Mulya, Lemahmulya, Kec. Majalaya, Karawang, Jawa Barat 41371
                    </p>
                  </div>
                </div>
              </div>

              {/* MAP */}
              <div className="pt-6 mt-6 border-t border-border/50">
                <h4 className="font-semibold mb-3 text-foreground flex items-center">
                  <span className="w-2 h-2 rounded-full bg-accent mr-2 animate-pulse"></span>
                  Lokasi Kami
                </h4>
                <div className="w-full h-56 rounded-xl overflow-hidden border-2 border-border/50 hover:border-accent/50
                              transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15862.340353940954!2d107.36057786724093!3d-6.318104446971375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69770002e947c5%3A0x65cc7df9abea9603!2sTEKNOMEDIA.NET!5e0!3m2!1sid!2sid!4v1764040420343!5m2!1sid!2sid"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          {/* CONTACT FORM */}
          <div className="lg:col-span-2 animate-fade-in-right">
            <form onSubmit={handleSubmit} className="relative p-8 md:p-10 bg-gradient-to-br from-card/80 to-card/40 
                                                     backdrop-blur-xl rounded-2xl border border-border/50 shadow-2xl overflow-hidden
                                                     hover:shadow-[0_0_60px_rgba(139,92,246,0.4)] transition-all duration-500">
              {/* ANIMATED CORNER ACCENTS */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-accent/20 to-transparent rounded-tr-full blur-2xl"></div>

              <h3 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary via-accent to-primary 
                           bg-clip-text text-transparent relative z-10">
                Kirim Pesan
              </h3>

              {/* STATUS MESSAGES */}
              {status === "success" && (
                <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 backdrop-blur-sm
                              animate-fade-in flex items-center space-x-3 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 animate-bounce">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <p className="text-green-600 font-medium">Pesan berhasil dikirim! Kami akan segera menghubungi Anda.</p>
                </div>
              )}
              
              {status === "error" && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 backdrop-blur-sm
                              animate-fade-in flex items-center space-x-3 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                  <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 animate-bounce">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <p className="text-red-600 font-medium">Terjadi kesalahan. Silakan coba lagi nanti.</p>
                </div>
              )}

              <div className="space-y-6 relative z-10">
                {/* NAME INPUT */}
                <div className="relative group">
                  <label htmlFor="name" className="block text-sm font-semibold mb-2 text-foreground transition-colors duration-200
                                                   group-focus-within:text-accent">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField("")}
                    className={inputClass(errors.name, "name")}
                    placeholder="Masukkan nama lengkap Anda"
                  />
                  {errors.name && (
                    <p className="mt-2 text-xs text-red-500 animate-shake flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                      </svg>
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* EMAIL INPUT */}
                <div className="relative group">
                  <label htmlFor="email" className="block text-sm font-semibold mb-2 text-foreground transition-colors duration-200
                                                    group-focus-within:text-accent">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField("")}
                    className={inputClass(errors.email, "email")}
                    placeholder="email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-2 text-xs text-red-500 animate-shake flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                      </svg>
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* SUBJECT INPUT */}
                <div className="relative group">
                  <label htmlFor="subject" className="block text-sm font-semibold mb-2 text-foreground transition-colors duration-200
                                                      group-focus-within:text-accent">
                    Subjek
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("subject")}
                    onBlur={() => setFocusedField("")}
                    className={inputClass(errors.subject, "subject")}
                    placeholder="Topik pembicaraan"
                  />
                  {errors.subject && (
                    <p className="mt-2 text-xs text-red-500 animate-shake flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                      </svg>
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* MESSAGE TEXTAREA */}
                <div className="relative group">
                  <label htmlFor="message" className="block text-sm font-semibold mb-2 text-foreground transition-colors duration-200
                                                      group-focus-within:text-accent">
                    Pesan
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField("")}
                    className={`${inputClass(errors.message, "message")} resize-none`}
                    placeholder="Tulis pesan Anda di sini..."
                  ></textarea>
                  {errors.message && (
                    <p className="mt-2 text-xs text-red-500 animate-shake flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                      </svg>
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative w-full py-4 rounded-xl bg-gradient-to-r from-primary via-accent to-primary
                           bg-size-200 bg-pos-0 text-white font-bold text-lg
                           transition-all duration-500 overflow-hidden group
                           disabled:opacity-50 disabled:cursor-not-allowed
                           hover:shadow-[0_0_40px_rgba(139,92,246,0.6)]
                           hover:scale-[1.02] active:scale-95
                           before:absolute before:inset-0 before:rounded-xl before:p-[2px]
                           before:bg-gradient-to-r before:from-primary before:via-accent before:to-primary
                           before:-z-10
                           after:absolute after:inset-0 after:rounded-xl after:blur-xl
                           after:bg-gradient-to-r after:from-primary after:via-accent after:to-primary
                           after:opacity-0 hover:after:opacity-75 after:-z-20 after:transition-opacity"
                  style={{
                    backgroundSize: '200% 100%',
                    backgroundPosition: '0% 0%'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) e.currentTarget.style.backgroundPosition = '100% 0%';
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) e.currentTarget.style.backgroundPosition = '0% 0%';
                  }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Mengirim Pesan...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center relative z-10">
                      Kirim Pesan
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" 
                           fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style></style>
    </section>
  );
};

export default ContactPage;