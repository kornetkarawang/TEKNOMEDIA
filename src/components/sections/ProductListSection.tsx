// src/components/sections/ProductListSection.tsx
import React from 'react';
import { ShoppingCart} from 'lucide-react'; 

// Data Dummy List Produk (Contoh 6 Produk)
const allProducts = [
  {
    id: 1,
    image: 'https://picsum.photos/400/300?random=a',
    category: 'Router & AP',
    name: 'Access Point Enterprise ZT-500',
    price: 'Rp 1.500.000',
    stock: 12,
  },
  {
    id: 2,
    image: 'https://picsum.photos/400/300?random=b',
    category: 'Kabel & Aksesoris',
    name: 'Kabel Fiber Optik Outdoor (500m)',
    price: 'Rp 4.200.000',
    stock: 5,
  },
  {
    id: 3,
    image: 'https://picsum.photos/400/300?random=c',
    category: 'Switch & Server',
    name: 'Managed Switch 24-Port Gigabit',
    price: 'Rp 2.800.000',
    stock: 8,
  },
  {
    id: 4,
    image: 'https://picsum.photos/400/300?random=d',
    category: 'Router & AP',
    name: 'Router MikroTik RB4011iGS+',
    price: 'Rp 2.100.000',
    stock: 15,
  },
  {
    id: 5,
    image: 'https://picsum.photos/400/300?random=e',
    category: 'Kabel & Aksesoris',
    name: 'Alat Splicing Fiber Optik Portable',
    price: 'Rp 18.000.000',
    stock: 3,
  },
  {
    id: 6,
    image: 'https://picsum.photos/400/300?random=f',
    category: 'Switch & Server',
    name: 'Mini PC Server Monitoring',
    price: 'Rp 3.500.000',
    stock: 6,
  },
];

const ProductListSection: React.FC = () => {
  return (
    <section id="product-list" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">
            Katalog Lengkap
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Peralatan Jaringan Siap Jual
          </p>
          <p className="mt-4 max-w-3xl text-xl text-gray-500 mx-auto">
            Temukan semua kebutuhan perangkat keras dan aksesoris jaringan Anda dari merek terpercaya.
          </p>
        </div>

        {/* Grid Produk (4 Kolom pada desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {allProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition duration-300 hover:shadow-2xl"
            >
              
              {/* Gambar Produk */}
              <div className="relative h-48 w-full bg-gray-200">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-4">
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-full">
                    {product.category}
                </span>
                
                <h3 className="mt-2 text-lg font-bold text-gray-900 truncate">
                  {product.name}
                </h3>
                
                <p className="mt-2 text-xl font-extrabold text-indigo-700">
                  {product.price}
                </p>

                <p className={`mt-1 text-sm ${product.stock > 5 ? 'text-green-600' : 'text-orange-600'}`}>
                    Stok: {product.stock} Tersedia
                </p>

                {/* Tombol CTA */}
                <a 
                  href={`#product-${product.id}`}
                  className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300"
                >
                  <ShoppingCart size={18} className="mr-2" />
                  Lihat Detail
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
            {/* CTA untuk menuju halaman katalog penuh jika ada lebih banyak produk */}
            <a 
                href="/katalog"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-indigo-600 text-base font-medium rounded-md text-indigo-600 hover:bg-indigo-50 transition duration-300"
            >
                Jelajahi Semua Produk (100+)
            </a>
        </div>

      </div>
    </section>
  );
};

export default ProductListSection;