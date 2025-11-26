import { useState, useEffect, useCallback, useMemo } from 'react';
import { ArrowRight, Calendar, User, Tag } from 'lucide-react';

// --- TYPE DEFINITIONS ---
interface BlogPost {
  id: string;
  title: string;
  url: string;
  published: string;
  content: string;
  author: {
    displayName: string;
  };
  labels?: string[];
}

interface BloggerFeedData {
  feed: {
    entry: {
      id: { $t: string };
      title: { $t: string };
      link: { href: string; rel: string }[];
      published: { $t: string };
      content: { $t: string };
      author: { name: { $t: string } }[];
      category?: { term: string }[];
    }[];
  };
}

// Perluas definisi window untuk mengenali fungsi callback JSONP (penting untuk TypeScript)
declare global {
  interface Window {
    [key: string]: ((data: BloggerFeedData) => void) | undefined;
  }
}

const PortalBeritaSection = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Ambil dan olah variabel lingkungan (menggunakan useMemo agar stabil)
  const BLOG_SOURCES = useMemo(() => {
    const RAW_BLOG_URLS = import.meta.env.VITE_BLOG_URLS || '';
    return RAW_BLOG_URLS.split(',')
      .map(url => url.trim())
      .filter(url => url.startsWith('http'));
  }, []);

  const MAX_RESULTS = useMemo(() => {
    const rawMax = import.meta.env.VITE_MAX_RESULTS_PER_BLOG;
    const num = parseInt(rawMax as string) || 50;
    
    // Batas maksimal yang diizinkan Blogger adalah 50
    return Math.min(num, 50); 
  }, []);

  // --- UTILITY FUNCTIONS ---

  const formatDate = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, []);

  const stripHtmlTags = useCallback((html: string): string => {
    if (typeof document === 'undefined') return '';
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
  }, []);

  const truncateText = useCallback((text: string, maxLength: number = 120): string => {
    if (!text) return '';
    const stripped = stripHtmlTags(text);
    return stripped.length > maxLength 
      ? stripped.substring(0, maxLength) + '...' 
      : stripped;
  }, [stripHtmlTags]);

  const getFirstImage = useCallback((post: BlogPost): string | null => {
    if (typeof document === 'undefined') return null;
    const temp = document.createElement('div');
    temp.innerHTML = post.content;
    const img = temp.querySelector('img');
    let imgSrc = img ? img.src : null;
    
    // Perbaikan URL gambar Blogger
    if (imgSrc && imgSrc.includes('/s1600/')) {
        imgSrc = imgSrc.replace('/s1600/', '/s0/');
    }
    return imgSrc;
  }, []);
  
  // --- FETCH LOGIC (JSONP) ---

  useEffect(() => {
    if (BLOG_SOURCES.length === 0) {
      setError('URL Blog tidak ditemukan. Harap atur VITE_BLOG_URLS di .env.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    let completedRequests = 0;
    let allPosts: BlogPost[] = [];
    const totalExpectedResponses = BLOG_SOURCES.length;
    const scriptTags: HTMLScriptElement[] = [];

    // Fungsi untuk memproses dan menggabungkan data
    const processResponse = (data: BloggerFeedData) => {
      if (data.feed && data.feed.entry) {
        const transformedPosts: BlogPost[] = data.feed.entry.map(entry => {
          const postUrl = entry.link.find(link => link.rel === 'alternate')?.href || '#';
          
          return {
            id: entry.id.$t,
            title: entry.title.$t,
            url: postUrl,
            published: entry.published.$t,
            content: entry.content.$t,
            author: { displayName: entry.author[0].name.$t },
            labels: entry.category?.map(cat => cat.term),
          };
        });
        allPosts = allPosts.concat(transformedPosts);
      }

      completedRequests++;
      if (completedRequests === totalExpectedResponses) {
        // Gabungkan semua, dan urutkan berdasarkan tanggal terbaru
        allPosts.sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime());
        setPosts(allPosts); 
        setLoading(false);
      }
    };

    BLOG_SOURCES.forEach((baseUrl, index) => {
      const callbackName = `bloggerjsonp_${index}`;
      
      // 1. Definisikan callback global
      window[callbackName] = (data: BloggerFeedData) => {
        try {
          processResponse(data);
          delete window[callbackName]; // Hapus callback setelah sukses
        } catch (e) {
          console.error(`Error memproses data dari blog ${baseUrl}:`, e);
          completedRequests++;
          if (completedRequests === totalExpectedResponses) {
              setLoading(false);
          }
          delete window[callbackName]; // Hapus callback walau error
        }
      };

      // 2. Buat URL JSONP
      const apiUrl = `${baseUrl}/feeds/posts/default?alt=json-in-script&max-results=${MAX_RESULTS}&callback=${callbackName}`;
      
      // 3. Suntikkan tag <script>
      const script = document.createElement('script');
      script.src = apiUrl;
      script.onerror = () => {
        console.error(`Gagal memuat script JSONP dari ${baseUrl}. Cek koneksi atau URL blog.`);
        setError(`Gagal memuat data dari setidaknya satu blog. Cek URL di .env`);
        
        // Panggil processResponse dengan data kosong/gagal agar counter tetap berjalan
        completedRequests++; 
        if (completedRequests === totalExpectedResponses) {
          setLoading(false);
        }
        delete window[callbackName]; // Hapus callback saat error
      };
      
      document.body.appendChild(script);
      scriptTags.push(script);
    });

    // --- CLEANUP YANG SUDAH DIBERSIHKAN DARI GARIS MERAH `_` ---
    return () => {
        // Hapus tag <script>
        scriptTags.forEach(script => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        });
        
        // Hapus fungsi global menggunakan for loop (menggantikan forEach((_, index) => ...))
        for (let index = 0; index < totalExpectedResponses; index++) {
             const callbackName = `bloggerjsonp_${index}`;
             delete window[callbackName];
        }
    };
  }, [BLOG_SOURCES, MAX_RESULTS]);


  // --- RENDERING UI ---

  if (loading) {
     return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Memuat artikel dari {BLOG_SOURCES.length} sumber blog...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-block p-6 bg-red-50 rounded-2xl shadow-lg border border-red-200">
              <svg
                className="w-16 h-16 text-red-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-red-600 text-lg font-semibold mb-2">Gagal memuat artikel</p>
              <p className="text-red-500 text-sm max-w-md mx-auto">{error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-3 tracking-wider">
            PORTAL INFORMASI TERBARU
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Berita & Artikel Gabungan
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Menampilkan **{posts.length} artikel terbaru** dari {BLOG_SOURCES.length} sumber blog yang berbeda.
          </p>
        </div>

        {/* Blog Posts Grid */}
        {posts.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
              {posts.map((post) => {
                const thumbnail = getFirstImage(post);
                
                return (
                  <article
                    key={post.id}
                    className="bg-white rounded-3xl shadow-xl border border-gray-100 
                                hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 overflow-hidden group"
                  >
                     <div className="relative h-56 overflow-hidden">
                      {thumbnail ? (
                        <img
                          src={thumbnail}
                          alt={post.title}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                          [Image Placeholder]
                        </div>
                      )}
                      
                      {/* Label Overlay */}
                      {post.labels && post.labels.length > 0 && (
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full shadow-md">
                            <Tag className="w-3 h-3" />
                            {post.labels[0]}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-6 md:p-8">
                      {/* Meta Info: Author and Date */}
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4 flex-wrap gap-2">
                        {post.author && (
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="font-medium truncate">{post.author.displayName}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>{formatDate(post.published)}</span>
                        </div>
                      </div>


                      {/* Title */}
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
                        <a 
                          href={post.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="group-hover:text-blue-600 transition-colors duration-300"
                        >
                          {post.title}
                        </a>
                      </h3>

                      {/* Excerpt */}
                      <div className="text-gray-600 mb-6 line-clamp-3">
                        {truncateText(post.content, 120)}
                      </div>

                      {/* Read More Link */}
                      <a
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-600 font-semibold transition-all duration-300 hover:gap-3 hover:text-blue-700"
                      >
                        <span>Baca Selengkapnya</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Tombol Kunjungi Portal Utama (link ke blog pertama) */}
            <div className="text-center mt-10">
              <a
                href={BLOG_SOURCES[0]} 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-4 bg-blue-600 text-white font-semibold rounded-full text-lg
                           hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/50 hover:shadow-xl"
              >
                <span>Kunjungi Portal Utama</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="inline-block p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="text-gray-600 text-lg font-medium">Belum ada artikel yang dipublikasikan dari blog manapun.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PortalBeritaSection;