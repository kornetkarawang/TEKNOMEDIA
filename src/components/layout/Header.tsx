// Header.tsx - Fixed Mobile Links Version
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, Sparkles } from "lucide-react";
import logo from "../../assets/LOGO TEKNOMEDIA.png";

const NavLinkItem: React.FC<{
  to: string;
  children: React.ReactNode;
  isTransparent: boolean;
  onClick?: () => void;
}> = ({ to, children, isTransparent, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isActive = window.location.pathname === to;
  const textColor = isTransparent ? "text-white" : "text-foreground";

  return (
    <a
      href={to}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative py-1 ${textColor} font-semibold transition-all duration-300 group ${
        isActive ? "text-primary" : "hover:text-primary"
      }`}
    >
      {children}
      
      {/* Animated Underline */}
      <span
        className={`absolute bottom-0 left-0 h-[2px] transition-all duration-300 bg-gradient-to-r from-blue-500 via-cyan-400 to-green-400 ${
          isActive ? "w-full" : isHovered ? "w-full" : "w-0"
        }`}
      />
      
      {/* Glow Effect */}
      {isHovered && (
        <span className="absolute inset-0 blur-xl bg-primary/20 -z-10 animate-pulse" />
      )}
    </a>
  );
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBlogOpen, setIsBlogOpen] = useState(false);
  const [isElearningOpen, setIsElearningOpen] = useState(false);

  const blogDropdownRef = useRef<HTMLDivElement>(null);
  const elearningDropdownRef = useRef<HTMLDivElement>(null);

  const isHomePage = window.location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isBlogOpen &&
        blogDropdownRef.current &&
        !blogDropdownRef.current.contains(event.target as Node)
      ) {
        setIsBlogOpen(false);
      }
      if (
        isElearningOpen &&
        elearningDropdownRef.current &&
        !elearningDropdownRef.current.contains(event.target as Node)
      ) {
        setIsElearningOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isBlogOpen, isElearningOpen]);

  const isTransparent = !isScrolled && isHomePage;
  const textColor = isTransparent ? "text-white" : "text-foreground";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || !isHomePage
          ? "bg-background/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      {/* Top Glow Line */}
      <div className={`h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-green-400 transform origin-left transition-all duration-700 ${
        isScrolled ? "scale-x-100" : "scale-x-0"
      }`} />

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo with Animation */}
          <a href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              {/* Logo Glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-green-500 opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500" />
              
              <img 
                src={logo} 
                alt="Teknomedia Logo" 
                className="h-12 w-12 rounded-full transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative z-10 border-2 border-white/20"
              />
              
              {/* Sparkle Effect */}
              <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400 opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300" />
            </div>
            
            <h1 className={`text-2xl font-black ${isTransparent ? "text-white" : "bg-gradient-to-r from-blue-600 via-cyan-500 to-green-500 bg-clip-text text-transparent"} transform group-hover:scale-105 transition-transform duration-300`}>
              TEKNOMEDIA
            </h1>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinkItem to="/" isTransparent={isTransparent}>
              Home
            </NavLinkItem>

            {/* Desktop E-Learning Dropdown */}
            <div className="relative" ref={elearningDropdownRef}>
              <button
                onClick={() => setIsElearningOpen(!isElearningOpen)}
                className={`relative py-1 ${textColor} font-semibold flex items-center transition-all duration-300 group ${
                  isElearningOpen ? "text-primary" : "hover:text-primary"
                }`}
              >
                E-Learning
                <ChevronDown 
                  size={16} 
                  className={`ml-1 transition-transform duration-300 ${isElearningOpen ? "rotate-180" : "rotate-0"}`} 
                />
                
                {/* Underline */}
                <span className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300 ${
                  isElearningOpen ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </button>

              {/* Dropdown Menu */}
              {isElearningOpen && (
                <div className="absolute right-0 mt-3 w-60 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden animate-[slideDown_0.3s_ease-out]">
                  <a
                    href="https://lms.teknomedia.id/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsElearningOpen(false)}
                    className="group/item flex items-center gap-3 px-5 py-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 transition-all duration-300 border-b border-gray-100"
                  >
                    <span className="text-2xl">📚</span>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 group-hover/item:text-primary transition-colors">
                        Teknomedia E-Learning
                      </div>
                      <div className="text-xs text-gray-500">Platform pembelajaran digital</div>
                    </div>
                  </a>

                  <a
                    href="https://lms.xplore.id/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsElearningOpen(false)}
                    className="group/item flex items-center gap-3 px-5 py-4 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-300"
                  >
                    <span className="text-2xl">🛒</span>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 group-hover/item:text-primary transition-colors">
                        LMS Store
                      </div>
                      <div className="text-xs text-gray-500">Marketplace e-learning</div>
                    </div>
                  </a>
                </div>
              )}
            </div>

            {/* Desktop Blog Dropdown */}
            <div className="relative" ref={blogDropdownRef}>
              <button
                onClick={() => setIsBlogOpen(!isBlogOpen)}
                className={`relative py-1 ${textColor} font-semibold flex items-center transition-all duration-300 group ${
                  isBlogOpen ? "text-primary" : "hover:text-primary"
                }`}
              >
                Blog
                <ChevronDown 
                  size={16} 
                  className={`ml-1 transition-transform duration-300 ${isBlogOpen ? "rotate-180" : "rotate-0"}`} 
                />
                
                <span className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300 ${
                  isBlogOpen ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </button>

              {isBlogOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden animate-[slideDown_0.3s_ease-out]">
                  <a 
                    href="https://www.smksteknologi.sch.id/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsBlogOpen(false)}
                    className="group/item flex items-center gap-3 px-5 py-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 border-b border-gray-100"
                  >
                    <span className="text-2xl">🏫</span>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 group-hover/item:text-primary transition-colors">
                        SMK TEKNOLOGI
                      </div>
                    </div>
                  </a>
                  
                  <a 
                    href="https://smkalhurriyyah.sch.id/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsBlogOpen(false)}
                    className="group/item flex items-center gap-3 px-5 py-4 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300"
                  >
                    <span className="text-2xl">🏫</span>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 group-hover/item:text-primary transition-colors">
                        SMK AL HURIYYAH
                      </div>
                    </div>
                  </a>
                </div>
              )}
            </div>

            <NavLinkItem to="/contact" isTransparent={isTransparent}>
              Contact
            </NavLinkItem>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`md:hidden ${textColor} p-2 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-110`} 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X size={24} className="animate-[spin_0.3s_ease-out]" />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-6 bg-background/95 backdrop-blur-md shadow-2xl rounded-b-2xl p-6 border-t border-gray-200 animate-[slideDown_0.3s_ease-out]">
            <div className="flex flex-col space-y-3">
              
              <a 
                href="/" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-foreground hover:text-primary transition-all duration-300 py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 font-semibold transform hover:translate-x-2"
              >
                🏠 Home
              </a>

              {/* Mobile E-Learning - Direct Links */}
              <div className="border-l-2 border-primary/30 pl-4 space-y-2">
                <div className="text-foreground font-semibold py-2 px-4 text-sm uppercase tracking-wider">
                  📚 E-Learning
                </div>
                
                <a
                  href="https://lms.teknomedia.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-sm py-3 px-4 rounded-xl bg-white border-2 border-gray-200 hover:border-primary hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 transition-all duration-300 font-medium transform hover:translate-x-2 shadow-sm"
                >
                  📖 Teknomedia E-Learning
                </a>

                <a
                  href="https://lms.xplore.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-sm py-3 px-4 rounded-xl bg-white border-2 border-gray-200 hover:border-primary hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-300 font-medium transform hover:translate-x-2 shadow-sm"
                >
                  🛍️ LMS Store
                </a>
              </div>

              {/* Mobile Blog - Direct Links */}
              <div className="border-l-2 border-primary/30 pl-4 space-y-2">
                <div className="text-foreground font-semibold py-2 px-4 text-sm uppercase tracking-wider">
                  📝 Blog
                </div>
                
                <a
                  href="https://www.smksteknologi.sch.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-sm py-3 px-4 rounded-xl bg-white border-2 border-gray-200 hover:border-primary hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 font-medium transform hover:translate-x-2 shadow-sm"
                >
                  🎓 SMK TEKNOLOGI
                </a>

                <a
                  href="https://smkalhurriyyah.sch.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-sm py-3 px-4 rounded-xl bg-white border-2 border-gray-200 hover:border-primary hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300 font-medium transform hover:translate-x-2 shadow-sm"
                >
                  🎓 SMK AL HURIYYAH
                </a>
              </div>

              <a 
                href="/contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-foreground hover:text-primary transition-all duration-300 py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 font-semibold transform hover:translate-x-2"
              >
                📞 Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;