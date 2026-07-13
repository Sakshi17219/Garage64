import { useState, useEffect, useRef } from 'react'

// ── Image constants ──────────────────────────────────────────────────────────
const IMG = {
  hero: 'https://images.unsplash.com/photo-1580014317999-e9f1936787a5?w=1800&h=1000&fit=crop&auto=format',
  heroCar: 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=1600&h=900&fit=crop&auto=format',
  collection1: 'https://images.unsplash.com/photo-1515281239448-2abe329fe5e5?w=800&h=600&fit=crop&auto=format',
  collection2: 'https://images.unsplash.com/photo-1566137966241-b713866d24ea?w=800&h=600&fit=crop&auto=format',
  collection3: 'https://images.unsplash.com/photo-1775039585654-3f9f8678d4ac?w=800&h=600&fit=crop&auto=format',
  diecast1: 'https://images.unsplash.com/photo-1758873889126-90ee528a2ac2?w=600&h=700&fit=crop&auto=format',
  diecast2: 'https://images.unsplash.com/photo-1764693756664-769420e4ad6e?w=600&h=700&fit=crop&auto=format',
  diecast3: 'https://images.unsplash.com/photo-1770258282175-d870c5968507?w=600&h=700&fit=crop&auto=format',
  car1: 'https://images.unsplash.com/photo-1580014317999-e9f1936787a5?w=600&h=700&fit=crop&auto=format',
  car2: 'https://images.unsplash.com/photo-1567808291548-fc3ee04dbcf0?w=600&h=700&fit=crop&auto=format',
  car3: 'https://images.unsplash.com/photo-1601929862217-f1bf94503333?w=600&h=700&fit=crop&auto=format',
  car4: 'https://images.unsplash.com/photo-1618418721668-0d1f72aa4bab?w=600&h=700&fit=crop&auto=format',
  displayCase1: 'https://images.unsplash.com/photo-1731719133132-f3fa443c1a86?w=600&h=700&fit=crop&auto=format',
  displayCase2: 'https://images.unsplash.com/photo-1755055592218-33a9d949b3dc?w=600&h=700&fit=crop&auto=format',
  displayCase3: 'https://images.unsplash.com/photo-1755055592223-552b6bf183d3?w=600&h=700&fit=crop&auto=format',
  limitedEdition: 'https://images.unsplash.com/photo-1760713170685-b67abc3be5ad?w=1200&h=800&fit=crop&auto=format',
  insta1: 'https://images.unsplash.com/photo-1515281239448-2abe329fe5e5?w=400&h=400&fit=crop&auto=format',
  insta2: 'https://images.unsplash.com/photo-1758873889126-90ee528a2ac2?w=400&h=400&fit=crop&auto=format',
  insta3: 'https://images.unsplash.com/photo-1566137966241-b713866d24ea?w=400&h=400&fit=crop&auto=format',
  insta4: 'https://images.unsplash.com/photo-1764693756664-769420e4ad6e?w=400&h=400&fit=crop&auto=format',
  insta5: 'https://images.unsplash.com/photo-1775039585654-3f9f8678d4ac?w=400&h=400&fit=crop&auto=format',
  insta6: 'https://images.unsplash.com/photo-1783273552791-093faf74c280?w=400&h=400&fit=crop&auto=format',
}

// ── Types ────────────────────────────────────────────────────────────────────
interface Product {
  id: number
  brand: string
  name: string
  scale: string
  price: string
  image: string
  badge?: string
  wishlist?: boolean
}

// ── Data ─────────────────────────────────────────────────────────────────────
const newDrops: Product[] = [
  { id: 1, brand: 'Mini GT', name: 'Porsche 911 GT3 RS — Guards Red', scale: '1:64', price: '₹649', image: IMG.diecast1, badge: 'NEW DROP' },
  { id: 2, brand: 'Tarmac Works', name: 'Ferrari F40 Competizione', scale: '1:64', price: '₹899', image: IMG.car1, badge: 'LIMITED' },
  { id: 3, brand: 'Kaido House', name: 'Custom Datsun 510 Wagon V3', scale: '1:64', price: '₹749', image: IMG.diecast2 },
  { id: 4, brand: 'Inno64', name: 'Honda Civic EF9 — Racing Blue', scale: '1:64', price: '₹599', image: IMG.car2 },
  { id: 5, brand: 'Pop Race', name: 'Lamborghini Countach LP5000', scale: '1:64', price: '₹799', image: IMG.car3 },
]

const bestSellers: Product[] = [
  { id: 6, brand: 'Hot Wheels', name: 'RLC Porsche 917K Gulf Livery', scale: '1:64', price: '₹1,299', image: IMG.car4, badge: 'BESTSELLER' },
  { id: 7, brand: 'Mini GT', name: 'Lamborghini Huracán GT3 EVO', scale: '1:64', price: '₹649', image: IMG.diecast3 },
  { id: 8, brand: 'Tarmac Works', name: 'BMW M4 GT3 — IMSA Livery', scale: '1:64', price: '₹849', image: IMG.car2 },
  { id: 9, brand: 'Kaido House', name: 'Toyota Supra MK4 KAIDO v3', scale: '1:64', price: '₹699', image: IMG.car3 },
  { id: 10, brand: 'Inno64', name: 'Nissan Skyline GT-R R34 Blue', scale: '1:64', price: '₹579', image: IMG.diecast1 },
]

const brands = [
  { name: 'Hot Wheels', desc: 'RLC Exclusives & Mainline', image: IMG.diecast3 },
  { name: 'Mini GT', desc: 'Premium 1:64 Scale Models', image: IMG.car1 },
  { name: 'Tarmac Works', desc: 'Motorsport Replicas', image: IMG.diecast1 },
  { name: 'Kaido House', desc: 'JDM Customs & Builds', image: IMG.car2 },
  { name: 'Inno64', desc: 'Japanese & Asian Icons', image: IMG.diecast2 },
  { name: 'Pop Race', desc: 'Limited Run Specials', image: IMG.car3 },
]

const reviews = [
  { name: 'Arjun Mehra', city: 'Mumbai', text: "Garage 64 is the only place I trust for authentic Mini GT releases. Packaging is impeccable — every model arrives perfect.", stars: 5 },
  { name: 'Rishi Kapoor', city: 'Bengaluru', text: "Finally, a premium die-cast store that gets collector culture. The curation is spot-on and delivery is fast.", stars: 5 },
  { name: 'Priya Nair', city: 'Chennai', text: "Picked up three Tarmac Works pieces last month. All authentic, all mint. The website makes browsing genuinely enjoyable.", stars: 5 },
  { name: 'Dev Sharma', city: 'Delhi', text: "Limited edition drops sell out fast but Garage 64 always notifies me. The RLC exclusives section is a goldmine.", stars: 5 },
]

// ── Sub-components ───────────────────────────────────────────────────────────

function AnnouncementBar() {
  return (
    <div className="bg-[#27362E] py-2 overflow-hidden">
      <div className="flex animate-ticker whitespace-nowrap">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center gap-12 px-6 shrink-0">
            <span className="text-[#E7DDCF] text-xs font-medium tracking-widest uppercase" style={{ fontFamily: "'Manrope', sans-serif" }}>
              🚚 Free Shipping Above ₹1499
            </span>
            <span className="text-[#B08D57] text-xs">◆</span>
            <span className="text-[#E7DDCF] text-xs font-medium tracking-widest uppercase">
              ✓ 100% Authentic
            </span>
            <span className="text-[#B08D57] text-xs">◆</span>
            <span className="text-[#E7DDCF] text-xs font-medium tracking-widest uppercase">
              📦 Secure Collector Packaging
            </span>
            <span className="text-[#B08D57] text-xs">◆</span>
            <span className="text-[#E7DDCF] text-xs font-medium tracking-widest uppercase">
              PAN India Delivery
            </span>
            <span className="text-[#B08D57] text-xs">◆</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Navbar({ scrolled }: { scrolled: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const navLinks = ['Shop', 'Brands', 'New Drops', 'Limited Editions', 'Accessories', 'About']

  return (
    <nav
      className="fixed top-8 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(18,22,20,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(231,221,207,0.08)' : 'none',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-7 h-7 border border-[#B08D57] flex items-center justify-center">
            <span className="text-[#B08D57] text-[10px] font-bold tracking-wider">G64</span>
          </div>
          <span
            className="text-[#E7DDCF] tracking-[0.15em] text-sm font-medium"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            GARAGE 64
          </span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link}>
              <a
                href="#"
                className="text-[#E7DDCF]/70 hover:text-[#E7DDCF] text-xs tracking-widest uppercase transition-colors duration-200"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Icons */}
        <div className="flex items-center gap-5">
          <button className="text-[#E7DDCF]/60 hover:text-[#E7DDCF] transition-colors hidden md:block">
            <SearchIcon />
          </button>
          <button className="text-[#E7DDCF]/60 hover:text-[#E7DDCF] transition-colors hidden md:block">
            <HeartIcon />
          </button>
          <button className="text-[#E7DDCF]/60 hover:text-[#E7DDCF] transition-colors hidden md:block">
            <UserIcon />
          </button>
          <button className="text-[#E7DDCF]/60 hover:text-[#E7DDCF] transition-colors relative">
            <CartIcon />
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#B08D57] rounded-full text-[#121614] text-[9px] font-bold flex items-center justify-center">
              2
            </span>
          </button>
          <button
            className="lg:hidden text-[#E7DDCF]/70 hover:text-[#E7DDCF]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#121614]/95 backdrop-blur-xl border-t border-[#E7DDCF]/10 px-6 py-6">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="block py-3 text-[#E7DDCF]/70 hover:text-[#E7DDCF] text-xs tracking-widest uppercase border-b border-[#E7DDCF]/5 last:border-0"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-[#121614]">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={IMG.hero}
          alt="Premium die-cast automotive photography"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#121614] via-[#121614]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121614] via-transparent to-transparent" />
      </div>

      {/* Floating badges — hidden on small phones to avoid overlapping the headline, shown from sm up */}
      <div className="hidden sm:flex absolute top-1/4 right-4 md:right-16 flex-col gap-3 z-10">
        {['NEW DROP', 'LIMITED EDITION', 'PAN INDIA SHIPPING', '100% AUTHENTIC'].map((badge, i) => (
          <div
            key={badge}
            className="px-3 py-1.5 border border-[#B08D57]/40 text-[#B08D57] text-[9px] tracking-[0.2em] font-medium"
            style={{
              fontFamily: "'Manrope', sans-serif",
              background: 'rgba(18,22,20,0.7)',
              backdropFilter: 'blur(10px)',
              animationDelay: `${i * 0.1}s`,
            }}
          >
            {badge}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 pt-28 sm:pt-32 pb-20">
        <div className="max-w-2xl">
          <p
            className="text-[#B08D57] text-xs tracking-[0.35em] uppercase mb-6"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            The Collector's Destination
          </p>
          <h1
            className="font-display text-[clamp(2.25rem,9vw,7rem)] leading-[0.95] sm:leading-[0.9] font-semibold text-[#F5F1EB] mb-6"
          >
            Built For<br />
            <span className="italic text-[#E7DDCF]/80">Collectors.</span>
          </h1>
          <p
            className="text-[#E7DDCF]/60 text-base leading-relaxed mb-10 max-w-lg"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Rare die-cast models, limited editions, and collector accessories
            from the world's leading brands.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <button className="px-7 py-3.5 bg-[#3F5145] hover:bg-[#4a6050] text-[#E7DDCF] text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:scale-[1.02]"
              style={{ fontFamily: "'Manrope', sans-serif" }}>
              Shop New Drops
            </button>
            <button className="px-7 py-3.5 border border-[#E7DDCF]/30 hover:border-[#E7DDCF]/60 text-[#E7DDCF]/80 hover:text-[#E7DDCF] text-xs tracking-[0.2em] uppercase transition-all duration-300"
              style={{ fontFamily: "'Manrope', sans-serif" }}>
              Explore Brands
            </button>
          </div>
        </div>

        {/* Stat bar */}
        <div className="mt-14 sm:mt-20 flex items-center gap-6 sm:gap-12 flex-wrap">
          {[['1200+', 'Models In Stock'], ['42', 'Limited Drops'], ['100%', 'Authentic'], ['48h', 'Dispatch']].map(([num, label]) => (
            <div key={label}>
              <div
                className="font-display text-3xl font-semibold text-[#E7DDCF]"
              >
                {num}
              </div>
              <div
                className="text-[#E7DDCF]/40 text-[10px] tracking-[0.2em] uppercase mt-0.5"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-[#B08D57]/60" />
        <span className="text-[#B08D57]/60 text-[9px] tracking-[0.25em] uppercase"
          style={{ fontFamily: "'Manrope', sans-serif" }}>Scroll</span>
      </div>
    </section>
  )
}

function BrandCard({ brand }: { brand: typeof brands[0] }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-[#1a211d] cursor-pointer">
      <div className="overflow-hidden aspect-[4/5]">
        <img
          src={brand.image}
          alt={brand.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-90"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#121614] via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div
          className="text-[#E7DDCF]/50 text-[9px] tracking-[0.25em] uppercase mb-1"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          {brand.desc}
        </div>
        <div className="font-display text-2xl font-semibold text-[#F5F1EB] group-hover:text-[#E7DDCF]">
          {brand.name}
        </div>
        <div className="mt-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <span className="text-[#B08D57] text-[9px] tracking-[0.2em] uppercase"
            style={{ fontFamily: "'Manrope', sans-serif" }}>
            Shop Collection
          </span>
          <span className="text-[#B08D57] text-xs">→</span>
        </div>
      </div>
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  const [wishlisted, setWishlisted] = useState(false)

  return (
    <div className="group relative flex-shrink-0 w-56 md:w-64 bg-[#1a211d] rounded-[18px] overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40">
      <div className="relative overflow-hidden aspect-square bg-[#1e2820]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {product.badge && (
          <div
            className="absolute top-3 left-3 px-2 py-1 text-[9px] tracking-[0.18em] font-semibold uppercase"
            style={{
              fontFamily: "'Manrope', sans-serif",
              background: product.badge === 'LIMITED' ? '#B08D57' : '#27362E',
              color: product.badge === 'LIMITED' ? '#121614' : '#E7DDCF',
            }}
          >
            {product.badge}
          </div>
        )}
        <button
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center transition-all duration-200"
          style={{ background: 'rgba(18,22,20,0.7)', backdropFilter: 'blur(8px)' }}
          onClick={() => setWishlisted(!wishlisted)}
        >
          <HeartIcon filled={wishlisted} size={14} color={wishlisted ? '#B08D57' : '#E7DDCF'} />
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0">
          <button
            className="w-full py-2 bg-[#3F5145] hover:bg-[#4a6050] text-[#E7DDCF] text-[9px] tracking-[0.2em] uppercase transition-colors"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Quick Add
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <span
            className="text-[#B08D57] text-[9px] tracking-[0.2em] uppercase font-medium"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            {product.brand}
          </span>
          <span
            className="text-[#E7DDCF]/30 text-[9px] tracking-[0.1em]"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            {product.scale}
          </span>
        </div>
        <p
          className="text-[#E7DDCF]/90 text-sm leading-snug mb-3 line-clamp-2"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          {product.name}
        </p>
        <div
          className="font-display text-xl font-semibold text-[#E7DDCF]"
        >
          {product.price}
        </div>
      </div>
    </div>
  )
}

function ShopByBrand() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-[#121614] px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        <SectionHeader
          eyebrow="Curated Selection"
          title="Shop by Brand"
          subtitle="Each brand has its own story. Find yours."
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-12">
          {brands.map((brand) => (
            <BrandCard key={brand.name} brand={brand} />
          ))}
        </div>
      </div>
    </section>
  )
}

function NewThisWeek() {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-[#0e1210] px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex items-end justify-between mb-12">
          <SectionHeader
            eyebrow="Fresh Arrivals"
            title="New This Week"
            subtitle="Just landed — before they sell out."
          />
          <a
            href="#"
            className="hidden md:flex items-center gap-2 text-[#B08D57] text-xs tracking-[0.2em] uppercase hover:gap-3 transition-all"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            View All <span>→</span>
          </a>
        </div>

        <div className="flex gap-5 overflow-x-auto pb-4" ref={scrollRef}
          style={{ scrollSnapType: 'x mandatory' }}>
          {newDrops.map((product) => (
            <div key={product.id} style={{ scrollSnapAlign: 'start' }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function LimitedEditions() {
  const [time, setTime] = useState({ h: 11, m: 47, s: 32 })

  useEffect(() => {
    const id = setInterval(() => {
      setTime((t) => {
        let { h, m, s } = t
        s--
        if (s < 0) { s = 59; m-- }
        if (m < 0) { m = 59; h-- }
        if (h < 0) { h = 23; m = 59; s = 59 }
        return { h, m, s }
      })
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-[#27362E] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 70% 50%, #3F5145 0%, transparent 60%)',
        }}
      />
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left text */}
          <div>
            <p
              className="text-[#B08D57] text-[10px] tracking-[0.35em] uppercase mb-4"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Exclusive Release
            </p>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] font-semibold text-[#F5F1EB] mb-6">
              Limited<br />
              <span className="italic">Editions</span>
            </h2>
            <p
              className="text-[#E7DDCF]/60 text-sm leading-relaxed mb-10 max-w-md"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              The rarest releases. No restocks. No waitlists.
              Once they're gone, they're gone — built for collectors who don't hesitate.
            </p>

            {/* Countdown */}
            <div className="mb-10">
              <p
                className="text-[#E7DDCF]/40 text-[9px] tracking-[0.25em] uppercase mb-4"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Current Drop Ends In
              </p>
              <div className="flex items-end gap-4">
                {[['h', pad(time.h)], ['m', pad(time.m)], ['s', pad(time.s)]].map(([unit, val]) => (
                  <div key={unit} className="text-center">
                    <div className="font-display text-5xl font-semibold text-[#E7DDCF] leading-none">
                      {val}
                    </div>
                    <div
                      className="text-[#E7DDCF]/30 text-[9px] tracking-[0.2em] uppercase mt-1"
                      style={{ fontFamily: "'Manrope', sans-serif" }}
                    >
                      {unit === 'h' ? 'hrs' : unit === 'm' ? 'min' : 'sec'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="px-7 py-3.5 bg-[#E7DDCF] text-[#121614] hover:bg-[#F5F1EB] text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-300 hover:scale-[1.02]"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Explore Collection
            </button>
          </div>

          {/* Right image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-[#1a2920]">
              <img
                src={IMG.limitedEdition}
                alt="Limited edition die-cast models dark studio"
                className="w-full h-full object-cover opacity-80 hover:opacity-100 hover:scale-[1.02] transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#27362E]/60 to-transparent" />
            </div>
            <div
              className="absolute bottom-3 left-3 sm:-bottom-4 sm:-left-4 px-4 py-3 bg-[#121614] border border-[#B08D57]/30"
            >
              <div
                className="text-[#B08D57] text-[9px] tracking-[0.2em] uppercase"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Only 12 left
              </div>
              <div className="font-display text-xl font-semibold text-[#E7DDCF] mt-0.5">
                Porsche 935 Gulf
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function BestSellers() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-[#121614] px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex items-end justify-between mb-12">
          <SectionHeader
            eyebrow="Top Picks"
            title="Best Sellers"
            subtitle="What collectors keep coming back for."
          />
          <a
            href="#"
            className="hidden md:flex items-center gap-2 text-[#B08D57] text-xs tracking-[0.2em] uppercase hover:gap-3 transition-all"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            View All <span>→</span>
          </a>
        </div>
        <div className="flex gap-5 overflow-x-auto pb-4" style={{ scrollSnapType: 'x mandatory' }}>
          {bestSellers.map((product) => (
            <div key={product.id} style={{ scrollSnapAlign: 'start' }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhyGarage64() {
  const features = [
    { icon: <ShieldIcon />, title: '100% Authentic', desc: 'Every model is sourced directly from authorized distributors. Zero grey market, zero replicas.' },
    { icon: <BoxIcon />, title: 'Collector Packaging', desc: 'Each order is packed with protective foam inserts and archival tissue paper.' },
    { icon: <TruckIcon />, title: 'Fast Dispatch', desc: 'Orders placed before 4 PM ship the same day. Tracking provided on every shipment.' },
    { icon: <MapIcon />, title: 'PAN India Shipping', desc: 'We deliver to every pin code in India — metros, tier 2, tier 3, all covered.' },
  ]

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-[#121614] px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        <SectionHeader
          eyebrow="Our Commitment"
          title="Why Collectors Choose Garage 64"
          subtitle=""
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-6 border border-[#E7DDCF]/8 hover:border-[#B08D57]/30 bg-[#1a211d]/50 hover:bg-[#1a211d] rounded-xl transition-all duration-300 group"
            >
              <div className="text-[#B08D57] mb-5 group-hover:scale-110 transition-transform duration-300 inline-block">
                {f.icon}
              </div>
              <div
                className="text-[#E7DDCF] font-semibold text-sm mb-2"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                {f.title}
              </div>
              <div
                className="text-[#E7DDCF]/50 text-xs leading-relaxed"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                {f.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function InstagramGallery() {
  const imgs = [
    { src: IMG.insta1, span: 'lg:col-span-2 lg:row-span-2', aspect: 'aspect-square' },
    { src: IMG.insta2, span: '', aspect: 'aspect-square' },
    { src: IMG.insta3, span: '', aspect: 'aspect-square' },
    { src: IMG.insta4, span: '', aspect: 'aspect-square' },
    { src: IMG.insta5, span: '', aspect: 'aspect-square' },
    { src: IMG.insta6, span: 'lg:col-span-2', aspect: 'aspect-video' },
  ]

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-[#0e1210] px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex items-end justify-between mb-12">
          <SectionHeader
            eyebrow="@garage64india"
            title="The Community"
            subtitle="Real collectors, real setups."
          />
          <a
            href="#"
            className="hidden md:flex items-center gap-2 text-[#B08D57] text-xs tracking-[0.2em] uppercase hover:gap-3 transition-all"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Follow Us <span>→</span>
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {imgs.map((img, i) => (
            <div
              key={i}
              className={`${img.span} ${img.aspect} overflow-hidden rounded-xl bg-[#1a211d] group cursor-pointer`}
            >
              <img
                src={img.src}
                alt={`Garage 64 collector community shot ${i + 1}`}
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Reviews() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-[#121614] px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        <SectionHeader
          eyebrow="Verified Buyers"
          title="Collector Reviews"
          subtitle=""
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="p-6 border border-[#E7DDCF]/8 rounded-xl bg-[#1a211d]/40 hover:bg-[#1a211d] transition-colors duration-300"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: r.stars }).map((_, i) => (
                  <span key={i} className="text-[#B08D57] text-xs">★</span>
                ))}
              </div>
              <p
                className="text-[#E7DDCF]/70 text-sm leading-relaxed mb-5"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                "{r.text}"
              </p>
              <div>
                <div
                  className="text-[#E7DDCF] text-sm font-semibold"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  {r.name}
                </div>
                <div
                  className="text-[#E7DDCF]/30 text-xs mt-0.5"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  {r.city}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Newsletter() {
  const [email, setEmail] = useState('')

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-[#0e1210] px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        <div
          className="relative overflow-hidden rounded-2xl p-7 sm:p-12 md:p-16"
          style={{
            background: 'linear-gradient(135deg, #27362E 0%, #1a2920 50%, #121614 100%)',
            border: '1px solid rgba(176,141,87,0.15)',
          }}
        >
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #B08D57, transparent)', transform: 'translate(30%, -30%)' }}
          />
          <div className="relative z-10 max-w-xl">
            <p
              className="text-[#B08D57] text-[10px] tracking-[0.35em] uppercase mb-4"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Join The List
            </p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1] font-semibold text-[#F5F1EB] mb-4">
              First Access to<br />
              <span className="italic">New Drops</span>
            </h2>
            <p
              className="text-[#E7DDCF]/50 text-sm mb-8"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              No spam. Just the drops that matter, before they sell out.
            </p>
            <div className="flex gap-3 flex-col sm:flex-row max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-[#121614] border border-[#E7DDCF]/15 text-[#E7DDCF] placeholder-[#E7DDCF]/25 px-4 py-3 text-sm focus:outline-none focus:border-[#B08D57]/50 transition-colors"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              />
              <button
                className="px-6 py-3 bg-[#B08D57] hover:bg-[#C9A97A] text-[#121614] text-xs tracking-[0.2em] uppercase font-semibold transition-colors whitespace-nowrap"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const cols = [
    {
      title: 'Shop',
      links: ['New Drops', 'Limited Editions', 'Hot Wheels', 'Mini GT', 'Tarmac Works', 'Kaido House'],
    },
    {
      title: 'Brands',
      links: ['Inno64', 'Pop Race', 'Display Cases', 'Accessories', 'Merchandise'],
    },
    {
      title: 'Help',
      links: ['Track Order', 'Shipping Policy', 'Returns & Exchange', 'Authenticity Guarantee', 'FAQ', 'Contact Us'],
    },
    {
      title: 'Company',
      links: ['About Garage 64', 'Collector Blog', 'Press', 'Careers', 'Privacy Policy'],
    },
  ]

  return (
    <footer className="bg-[#0c0f0d] border-t border-[#E7DDCF]/6 pt-16 pb-8 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        {/* Top */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-7 h-7 border border-[#B08D57] flex items-center justify-center">
                <span className="text-[#B08D57] text-[10px] font-bold tracking-wider">G64</span>
              </div>
              <span
                className="text-[#E7DDCF] tracking-[0.15em] text-sm font-medium"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                GARAGE 64
              </span>
            </div>
            <p
              className="text-[#E7DDCF]/40 text-xs leading-relaxed mb-6 max-w-[200px]"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              India's premier destination for collector-grade die-cast models and accessories.
            </p>
            <div className="flex items-center gap-3">
              {['ig', 'tw', 'yt', 'fb'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-8 h-8 border border-[#E7DDCF]/12 hover:border-[#B08D57]/40 flex items-center justify-center text-[#E7DDCF]/40 hover:text-[#B08D57] text-[10px] uppercase transition-all"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <div
                className="text-[#E7DDCF]/50 text-[9px] tracking-[0.25em] uppercase mb-4"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                {col.title}
              </div>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[#E7DDCF]/50 hover:text-[#E7DDCF] text-xs transition-colors"
                      style={{ fontFamily: "'Manrope', sans-serif" }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#E7DDCF]/6 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-[#E7DDCF]/25 text-[10px]"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            © 2025 Garage 64. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {['VISA', 'MC', 'UPI', 'PAYTM', 'GPAY'].map((pay) => (
              <div
                key={pay}
                className="px-2 py-1 border border-[#E7DDCF]/10 text-[#E7DDCF]/30 text-[8px] tracking-wider"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                {pay}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ── Utility components ───────────────────────────────────────────────────────

function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <div className="max-w-xl">
      <p
        className="text-[#B08D57] text-[10px] tracking-[0.35em] uppercase mb-3"
        style={{ fontFamily: "'Manrope', sans-serif" }}
      >
        {eyebrow}
      </p>
      <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1] font-semibold text-[#F5F1EB]">
        {title}
      </h2>
      {subtitle && (
        <p
          className="text-[#E7DDCF]/50 text-sm mt-3"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}

// ── Icons ────────────────────────────────────────────────────────────────────

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  )
}

function HeartIcon({ filled = false, size = 18, color = 'currentColor' }: { filled?: boolean; size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

function BoxIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="21 8 21 21 3 21 3 8" />
      <rect x="1" y="3" width="22" height="5" />
      <line x1="10" y1="12" x2="14" y2="12" />
    </svg>
  )
}

function TruckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  )
}

function MapIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
      <line x1="9" y1="3" x2="9" y2="18" />
      <line x1="15" y1="6" x2="15" y2="21" />
    </svg>
  )
}

// ── Root ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#121614]">
      <AnnouncementBar />
      <Navbar scrolled={scrolled} />
      <HeroSection />
      <ShopByBrand />
      <NewThisWeek />
      <LimitedEditions />
      <BestSellers />
      <WhyGarage64 />
      <InstagramGallery />
      <Reviews />
      <Newsletter />
      <Footer />
    </div>
  )
}
