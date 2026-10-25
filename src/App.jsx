import { useMemo, useState } from 'react'
import {
  ArrowDownRight, ArrowRight, Check, ChevronDown, Heart, Menu, Minus,
  Plus, ShoppingBag, X, Instagram, Truck, ShieldCheck, RotateCcw
} from 'lucide-react'

const products = [
  {
    id: 1, name: 'Heavyweight Essential Tee', category: 'Tops', price: 1499,
    color: 'Washed Stone', tag: 'BESTSELLER', sizes: ['XS', 'S', 'M', 'L', 'XL'],
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=85',
    description: 'A considered everyday uniform. Cut from substantial cotton jersey with a relaxed shoulder and a clean, structured drape.'
  },
  {
    id: 2, name: 'Relaxed Utility Overshirt', category: 'Outerwear', price: 3299,
    color: 'Oat Beige', tag: 'NEW ARRIVAL', sizes: ['S', 'M', 'L', 'XL'],
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1000&q=85',
    description: 'An easy layer with considered proportions, tonal buttons and a soft hand-feel. Designed to move between seasons.'
  },
  {
    id: 3, name: 'Everyday Straight-Leg Denim', category: 'Bottoms', price: 2899,
    color: 'Vintage Indigo', tag: '', sizes: ['28', '30', '32', '34', '36'],
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1000&q=85',
    description: 'A straight-leg profile with a lived-in finish. The versatile foundation of a modern, repeatable wardrobe.'
  },
  {
    id: 4, name: 'Form Oversized Hoodie', category: 'Tops', price: 2799,
    color: 'Deep Charcoal', tag: 'LIMITED', sizes: ['S', 'M', 'L', 'XL'],
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1000&q=85',
    description: 'A heavyweight fleece hoodie with a generous fit, clean detailing and the kind of comfort you reach for daily.'
  },
  {
    id: 5, name: 'Studio Relaxed Trousers', category: 'Bottoms', price: 2599,
    color: 'Warm Taupe', tag: '', sizes: ['28', '30', '32', '34', '36'],
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1000&q=85',
    description: 'Fluid but structured. These relaxed trousers balance everyday ease with a sharp, intentional silhouette.'
  },
  {
    id: 6, name: 'Minimal Canvas Tote', category: 'Accessories', price: 999,
    color: 'Natural Canvas', tag: '', sizes: ['ONE SIZE'],
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=85',
    description: 'A dependable carry-all made for everyday essentials. Minimal branding, thoughtful proportions, no unnecessary details.'
  },
  {
    id: 7, name: 'Layered Long Sleeve', category: 'Tops', price: 1899,
    color: 'Soft Ecru', tag: '', sizes: ['XS', 'S', 'M', 'L', 'XL'],
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=85',
    description: 'A lightweight layering piece with a relaxed fit and tactile cotton finish. Made to work alone or under your favourite layer.'
  },
  {
    id: 8, name: 'Everyday Crossbody', category: 'Accessories', price: 1699,
    color: 'Black', tag: 'LOW STOCK', sizes: ['ONE SIZE'],
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=85',
    description: 'Compact, functional and quietly considered. A hands-free essential for city days and weekends away.'
  },
]

const categories = ['All pieces', 'Tops', 'Bottoms', 'Outerwear', 'Accessories']
const money = (value) => `₹${value.toLocaleString('en-IN')}`

function App() {
  const [activeCategory, setActiveCategory] = useState('All pieces')
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedSize, setSelectedSize] = useState('')
  const [mobileMenu, setMobileMenu] = useState(false)
  const [favorites, setFavorites] = useState([])
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const visibleProducts = useMemo(
    () => activeCategory === 'All pieces' ? products : products.filter(p => p.category === activeCategory),
    [activeCategory]
  )
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const addToCart = (product, size) => {
    const chosenSize = size || product.sizes[0]
    setCart(current => {
      const found = current.find(item => item.id === product.id && item.size === chosenSize)
      if (found) return current.map(item => item.id === product.id && item.size === chosenSize ? { ...item, quantity: item.quantity + 1 } : item)
      return [...current, { ...product, size: chosenSize, quantity: 1 }]
    })
    setSelectedProduct(null)
    setSelectedSize('')
    setCartOpen(true)
  }

  const updateQuantity = (id, size, change) => {
    setCart(current => current
      .map(item => item.id === id && item.size === size ? { ...item, quantity: item.quantity + change } : item)
      .filter(item => item.quantity > 0))
  }

  const toggleFavorite = (id) => setFavorites(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id])

  const orderOnWhatsApp = () => {
    const phone = '919999999999' // Replace with the store owner's WhatsApp number, including country code.
    const lines = cart.map(item => `${item.name} / Size ${item.size} x${item.quantity} — ${money(item.price * item.quantity)}`)
    const message = `Hi NOIR, I'd like to place an order:\n${lines.join('\n')}\n\nSubtotal: ${money(subtotal)}\nPlease confirm availability and delivery details.`
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  const handleSubscribe = (event) => {
    event.preventDefault()
    if (email.trim()) setSubscribed(true)
  }

  return (
    <div className="min-h-screen bg-noir-paper text-noir-ink">
      <div className="bg-noir-ink px-4 py-2.5 text-center text-[9px] uppercase tracking-[0.2em] text-noir-paper sm:text-[10px]">
        Complimentary shipping on orders over ₹3,500 <span className="mx-2 text-noir-sand">✳</span> Designed to be worn on repeat
      </div>

      <header className="sticky top-0 z-40 border-b border-noir-line/80 bg-noir-paper/95 backdrop-blur-md">
        <div className="container-wide flex h-[76px] items-center justify-between">
          <button className="flex items-center gap-2 md:hidden" aria-label="Open menu" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <X size={21} strokeWidth={1.5} /> : <Menu size={21} strokeWidth={1.5} />}
          </button>
          <nav className="hidden items-center gap-8 md:flex">
            <a className="eyebrow transition hover:opacity-50" href="#shop">Shop all</a>
            <a className="eyebrow transition hover:opacity-50" href="#story">Our approach</a>
            <a className="eyebrow transition hover:opacity-50" href="#journal">Journal</a>
          </nav>
          <a href="#" className="absolute left-1/2 -translate-x-1/2 text-center" aria-label="NOIR home">
            <span className="block text-[28px] font-semibold leading-none tracking-[0.28em]">NOIR</span>
            <span className="mt-1 block text-[7px] uppercase tracking-[0.38em] text-noir-muted">Considered essentials</span>
          </a>
          <div className="ml-auto flex items-center gap-5">
            <a href="#newsletter" className="eyebrow hidden transition hover:opacity-50 lg:block">Join the list</a>
            <button onClick={() => setCartOpen(true)} className="relative flex items-center gap-2" aria-label={`Open bag, ${cartCount} items`}>
              <ShoppingBag size={20} strokeWidth={1.5} />
              <span className="eyebrow hidden sm:inline">Bag</span>
              <span className="flex h-[19px] min-w-[19px] items-center justify-center rounded-full bg-noir-ink px-1 text-[9px] text-white">{cartCount}</span>
            </button>
          </div>
        </div>
        {mobileMenu && (
          <div className="border-t border-noir-line px-6 py-5 md:hidden">
            <div className="flex flex-col gap-5">
              <a href="#shop" onClick={() => setMobileMenu(false)} className="eyebrow">Shop all</a>
              <a href="#story" onClick={() => setMobileMenu(false)} className="eyebrow">Our approach</a>
              <a href="#journal" onClick={() => setMobileMenu(false)} className="eyebrow">Journal</a>
            </div>
          </div>
        )}
      </header>

      <main>
        <section className="container-wide grid min-h-[610px] grid-cols-1 items-stretch gap-5 py-5 md:min-h-[660px] md:grid-cols-[0.88fr_1.12fr] md:gap-8 md:py-8">
          <div className="flex flex-col justify-center py-10 md:py-16">
            <p className="eyebrow mb-6 flex items-center gap-3 text-noir-muted"><span className="h-px w-8 bg-noir-muted" /> The new uniform · Collection 01</p>
            <h1 className="display-title max-w-[600px] text-[58px] leading-[0.98] sm:text-[76px] lg:text-[92px]">
              Less, but<br /><span className="italic">better.</span>
            </h1>
            <p className="mt-7 max-w-[370px] text-sm leading-7 text-noir-muted sm:text-base">
              Elevated essentials for the way you move. Thoughtful silhouettes, honest textures, and pieces that feel like you.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <a href="#shop" className="group inline-flex items-center gap-7 bg-noir-ink px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-white transition hover:bg-[#45413b]">
                Explore collection <ArrowRight size={15} className="transition group-hover:translate-x-1" />
              </a>
              <a href="#story" className="eyebrow border-b border-noir-ink pb-1 transition hover:opacity-50">Our philosophy</a>
            </div>
            <div className="mt-14 flex items-center gap-4 border-t border-noir-line pt-6">
              <div className="flex -space-x-2">
                {['photo-1534528741775-53994a69daeb','photo-1500648767791-00dcc994a43e','photo-1531123897727-8f129e1688ce'].map((id) => (
                  <img key={id} src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=80&h=80&q=80`} alt="" className="h-8 w-8 rounded-full border-2 border-noir-paper object-cover" />
                ))}
              </div>
              <p className="text-[11px] leading-5 text-noir-muted"><span className="font-semibold text-noir-ink">Made for everyday.</span><br />Worn your way, season after season.</p>
            </div>
          </div>
          <div className="relative min-h-[440px] overflow-hidden bg-noir-cream md:min-h-0">
            <img
              className="absolute inset-0 h-full w-full object-cover object-center"
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1600&q=90"
              alt="Editorial streetwear campaign featuring neutral, modern fashion"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/5" />
            <div className="absolute left-6 top-6 border border-white/50 px-3 py-2 text-[9px] uppercase tracking-[0.2em] text-white">Collection 01 / 25</div>
            <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between text-white sm:bottom-10 sm:left-10 sm:right-10">
              <div>
                <p className="eyebrow mb-2 text-white/75">Quiet confidence</p>
                <p className="display-title text-3xl sm:text-4xl">Everyday, elevated.</p>
              </div>
              <a href="#shop" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/60 transition hover:bg-white hover:text-noir-ink" aria-label="Shop collection"><ArrowDownRight size={20} /></a>
            </div>
          </div>
        </section>

        <section className="border-y border-noir-line bg-[#eee8dd]">
          <div className="container-wide grid grid-cols-2 gap-6 py-6 sm:grid-cols-4 sm:py-7">
            {[
              ['01', 'Thoughtful design'], ['02', 'Wear on repeat'], ['03', 'Easy everyday fit'], ['04', 'Less, not more']
            ].map(([num, label]) => (
              <div key={num} className="flex items-center gap-3">
                <span className="font-display text-lg italic text-noir-muted">{num}</span>
                <span className="eyebrow !text-[8px] sm:!text-[9px]">{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="shop" className="container-wide scroll-mt-28 py-20 sm:py-28">
          <div className="mb-10 flex flex-col justify-between gap-7 sm:mb-12 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow mb-4 text-noir-muted">The considered edit</p>
              <h2 className="display-title text-4xl sm:text-5xl">Pieces to live in.</h2>
              <p className="mt-4 max-w-md text-sm leading-6 text-noir-muted">A focused collection of dependable favourites. Built around feel, fit, and the details that matter.</p>
            </div>
            <a href="#shop" className="eyebrow inline-flex items-center gap-3 self-start border-b border-noir-ink pb-2 sm:self-auto">Explore all pieces <ArrowRight size={13} /></a>
          </div>

          <div className="no-scrollbar mb-8 flex gap-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <button key={category} onClick={() => setActiveCategory(category)} className={`whitespace-nowrap border px-4 py-3 text-[9px] uppercase tracking-[0.15em] transition sm:px-5 ${activeCategory === category ? 'border-noir-ink bg-noir-ink text-white' : 'border-noir-line hover:border-noir-ink'}`}>
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-5 sm:gap-y-12 lg:grid-cols-4">
            {visibleProducts.map(product => (
              <article key={product.id} className="group">
                <div className="image-zoom relative aspect-[3/4] overflow-hidden bg-noir-cream">
                  <button className="absolute inset-0 z-0" onClick={() => { setSelectedProduct(product); setSelectedSize('') }} aria-label={`View ${product.name}`}>
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover" loading="lazy" />
                  </button>
                  {product.tag && <span className="absolute left-2 top-2 z-10 bg-noir-paper px-2 py-1.5 text-[7px] tracking-[0.14em] sm:left-3 sm:top-3 sm:text-[8px]">{product.tag}</span>}
                  <button onClick={() => toggleFavorite(product.id)} className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-noir-paper/90 transition hover:bg-white sm:right-3 sm:top-3" aria-label={favorites.includes(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}>
                    <Heart size={15} strokeWidth={1.5} fill={favorites.includes(product.id) ? '#201e1b' : 'none'} />
                  </button>
                  <button onClick={() => { setSelectedProduct(product); setSelectedSize('') }} className="absolute bottom-0 left-0 right-0 z-10 flex translate-y-full items-center justify-between bg-noir-paper px-4 py-4 text-[9px] uppercase tracking-[0.16em] transition-transform group-hover:translate-y-0 max-sm:hidden">
                    Quick view <ArrowRight size={14} />
                  </button>
                  <button onClick={() => { setSelectedProduct(product); setSelectedSize('') }} className="absolute bottom-2 right-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-noir-paper sm:hidden" aria-label="Quick view"><Plus size={16} /></button>
                </div>
                <div className="flex items-start justify-between gap-2 pt-4">
                  <div>
                    <button onClick={() => { setSelectedProduct(product); setSelectedSize('') }} className="text-left text-[11px] font-medium leading-5 sm:text-sm">{product.name}</button>
                    <p className="mt-1 text-[10px] text-noir-muted sm:text-xs">{product.color}</p>
                  </div>
                  <span className="whitespace-nowrap text-[11px] sm:text-sm">{money(product.price)}</span>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-10 text-center text-[10px] uppercase tracking-[0.18em] text-noir-muted">Showing {visibleProducts.length} considered essentials</p>
        </section>

        <section id="story" className="scroll-mt-24 bg-[#e8dfd1]">
          <div className="container-wide grid grid-cols-1 items-center gap-10 py-16 sm:py-20 md:grid-cols-2 md:gap-16 md:py-24">
            <div className="relative aspect-[4/5] overflow-hidden bg-noir-sand">
              <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85" alt="Friends wearing timeless everyday fashion" className="h-full w-full object-cover" loading="lazy" />
              <div className="absolute bottom-5 left-5 bg-noir-paper px-4 py-3">
                <span className="eyebrow">Less noise. More you.</span>
              </div>
            </div>
            <div className="py-2 md:py-10">
              <p className="eyebrow mb-5 text-noir-muted">The NOIR point of view</p>
              <h2 className="display-title max-w-lg text-4xl leading-tight sm:text-5xl lg:text-6xl">A wardrobe should work <span className="italic">for you.</span></h2>
              <p className="mt-7 max-w-lg text-sm leading-7 text-noir-muted sm:text-base sm:leading-8">We believe the best pieces are the ones you reach for without thinking. NOIR is built around versatile shapes, tactile fabrics and a quieter approach to getting dressed.</p>
              <p className="mt-4 max-w-lg text-sm leading-7 text-noir-muted sm:text-base sm:leading-8">No chasing every trend. Just considered essentials that earn their place in your everyday rotation.</p>
              <a href="#shop" className="mt-8 inline-flex items-center gap-5 border-b border-noir-ink pb-2 text-[10px] uppercase tracking-[0.2em]">Find your everyday <ArrowRight size={14} /></a>
            </div>
          </div>
        </section>

        <section id="journal" className="container-wide scroll-mt-24 py-20 sm:py-24">
          <div className="mb-9 flex items-end justify-between">
            <div>
              <p className="eyebrow mb-4 text-noir-muted">Notes on getting dressed</p>
              <h2 className="display-title text-4xl sm:text-5xl">The journal.</h2>
            </div>
            <span className="eyebrow hidden text-noir-muted sm:block">Vol. 01 — The everyday edit</span>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {[
              { no: '01 / Style notes', title: 'The art of wearing less', image: 'photo-1515886657613-9f3515b0c78f' },
              { no: '02 / In focus', title: 'Fit is a feeling', image: 'photo-1525507119028-ed4c629a60a3' },
              { no: '03 / The edit', title: 'Building your everyday uniform', image: 'photo-1487222477894-8943e31ef7b2' },
            ].map(story => (
              <a href="#newsletter" key={story.no} className="group">
                <div className="image-zoom aspect-[5/4] overflow-hidden bg-noir-cream">
                  <img src={`https://images.unsplash.com/${story.image}?auto=format&fit=crop&w=900&q=80`} alt="" className="h-full w-full object-cover" loading="lazy" />
                </div>
                <p className="eyebrow mt-5 text-noir-muted">{story.no}</p>
                <div className="mt-2 flex items-center justify-between gap-4">
                  <h3 className="display-title text-xl sm:text-2xl">{story.title}</h3>
                  <ArrowRight size={17} className="shrink-0 transition group-hover:translate-x-1" />
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="border-y border-noir-line bg-[#eee8dd]">
          <div className="container-wide grid grid-cols-1 gap-6 py-9 sm:grid-cols-3 sm:gap-10 sm:py-11">
            <div className="flex items-start gap-4"><Truck size={21} strokeWidth={1.3} /><div><p className="text-xs font-semibold">Complimentary shipping</p><p className="mt-1 text-xs text-noir-muted">On orders over ₹3,500</p></div></div>
            <div className="flex items-start gap-4"><ShieldCheck size={21} strokeWidth={1.3} /><div><p className="text-xs font-semibold">Considered quality</p><p className="mt-1 text-xs text-noir-muted">Details made to be lived in</p></div></div>
            <div className="flex items-start gap-4"><RotateCcw size={21} strokeWidth={1.3} /><div><p className="text-xs font-semibold">Easy order support</p><p className="mt-1 text-xs text-noir-muted">Here to help with your fit</p></div></div>
          </div>
        </section>

        <section id="newsletter" className="container-wide py-20 text-center sm:py-24">
          <p className="eyebrow mb-4 text-noir-muted">A little less noise</p>
          <h2 className="display-title text-4xl sm:text-5xl">Stay in the know.</h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-noir-muted">New releases, thoughtful edits and the occasional note from us. No clutter, ever.</p>
          {subscribed ? (
            <p className="mx-auto mt-7 flex max-w-md items-center justify-center gap-2 text-sm"><Check size={16} /> You're on the list. Thanks for being here.</p>
          ) : (
            <form onSubmit={handleSubscribe} className="mx-auto mt-8 flex max-w-lg border-b border-noir-ink">
              <input value={email} onChange={e => setEmail(e.target.value)} type="email" required placeholder="Your email address" className="min-w-0 flex-1 bg-transparent px-1 py-4 text-sm outline-none placeholder:text-noir-muted" aria-label="Your email address" />
              <button className="flex items-center gap-3 px-2 text-[9px] uppercase tracking-[0.18em] transition hover:opacity-60" type="submit">Sign me up <ArrowRight size={14} /></button>
            </form>
          )}
          <p className="mt-4 text-[9px] text-noir-muted">By subscribing, you agree to receive NOIR updates. Unsubscribe anytime.</p>
        </section>
      </main>

      <footer className="bg-noir-ink text-noir-paper">
        <div className="container-wide grid grid-cols-1 gap-12 py-14 sm:grid-cols-2 sm:py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <a href="#" className="inline-block text-3xl font-semibold tracking-[0.28em]">NOIR</a>
            <p className="mt-4 max-w-xs text-xs leading-6 text-white/55">Considered essentials for everyday rituals. Less, but better — always.</p>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-xs text-white/70 transition hover:text-white"><Instagram size={15} /> Follow our world</a>
          </div>
          <div>
            <p className="eyebrow mb-5 text-white/45">Explore</p>
            <div className="flex flex-col gap-3 text-xs text-white/75">
              <a href="#shop" className="hover:text-white">Shop all</a><a href="#shop" className="hover:text-white">New arrivals</a><a href="#shop" className="hover:text-white">Best sellers</a><a href="#story" className="hover:text-white">Our approach</a>
            </div>
          </div>
          <div>
            <p className="eyebrow mb-5 text-white/45">Customer care</p>
            <div className="flex flex-col gap-3 text-xs text-white/75">
              <a href="#newsletter" className="hover:text-white">Contact us</a><a href="#newsletter" className="hover:text-white">Shipping & returns</a><a href="#newsletter" className="hover:text-white">Size guide</a><a href="#newsletter" className="hover:text-white">FAQs</a>
            </div>
          </div>
          <div>
            <p className="eyebrow mb-5 text-white/45">The fine print</p>
            <div className="flex flex-col gap-3 text-xs text-white/75">
              <a href="#newsletter" className="hover:text-white">Privacy policy</a><a href="#newsletter" className="hover:text-white">Terms of service</a><a href="#newsletter" className="hover:text-white">Accessibility</a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/15">
          <div className="container-wide flex flex-col gap-3 py-5 text-[9px] uppercase tracking-[0.12em] text-white/45 sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} NOIR Studio. All rights reserved.</span>
            <span>Independent concept store · Made with intention</span>
            <span>Built by <a className="text-white/80 hover:text-white" href="https://builtbyamos.in" target="_blank" rel="noreferrer">Built By Amos</a></span>
          </div>
        </div>
      </footer>

      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 backdrop-blur-[2px] sm:items-center sm:p-6" onMouseDown={e => { if (e.target === e.currentTarget) setSelectedProduct(null) }}>
          <div className="relative grid max-h-[92vh] w-full max-w-4xl grid-cols-1 overflow-y-auto bg-noir-paper sm:grid-cols-2">
            <button onClick={() => setSelectedProduct(null)} className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-noir-paper/90" aria-label="Close product details"><X size={18} /></button>
            <div className="max-h-[38vh] min-h-[280px] bg-noir-cream sm:max-h-none sm:min-h-[540px]"><img src={selectedProduct.image} alt={selectedProduct.name} className="h-full w-full object-cover" /></div>
            <div className="flex flex-col justify-center p-6 sm:p-10">
              <p className="eyebrow mb-4 text-noir-muted">{selectedProduct.category} / NOIR essentials</p>
              <h2 className="display-title text-3xl leading-tight sm:text-4xl">{selectedProduct.name}</h2>
              <p className="mt-4 text-lg">{money(selectedProduct.price)}</p>
              <p className="mt-5 text-sm leading-7 text-noir-muted">{selectedProduct.description}</p>
              <p className="mt-7 text-xs">{selectedProduct.color}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedProduct.sizes.map(size => (
                  <button key={size} onClick={() => setSelectedSize(size)} className={`min-w-11 border px-3 py-3 text-[10px] transition ${selectedSize === size ? 'border-noir-ink bg-noir-ink text-white' : 'border-noir-line hover:border-noir-ink'}`}>{size}</button>
                ))}
              </div>
              <button onClick={() => addToCart(selectedProduct, selectedSize)} className="mt-7 flex w-full items-center justify-center gap-3 bg-noir-ink px-5 py-4 text-[10px] uppercase tracking-[0.2em] text-white transition hover:bg-[#45413b]"><ShoppingBag size={16} /> Add to bag — {money(selectedProduct.price)}</button>
              <p className="mt-4 text-center text-[10px] text-noir-muted">Need help with sizing? Message us after adding to your bag.</p>
            </div>
          </div>
        </div>
      )}

      {cartOpen && (
        <div className="fixed inset-0 z-[60] bg-black/40" onMouseDown={e => { if (e.target === e.currentTarget) setCartOpen(false) }}>
          <aside className="absolute bottom-0 right-0 top-0 flex w-full max-w-md flex-col bg-noir-paper shadow-2xl">
            <div className="flex items-center justify-between border-b border-noir-line px-6 py-5">
              <div><p className="display-title text-2xl">Your bag</p><p className="mt-1 text-[10px] text-noir-muted">{cartCount} {cartCount === 1 ? 'piece' : 'pieces'} selected</p></div>
              <button onClick={() => setCartOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-full border border-noir-line" aria-label="Close bag"><X size={17} /></button>
            </div>
            {cart.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <ShoppingBag size={30} strokeWidth={1.2} />
                <h3 className="display-title mt-5 text-2xl">Your bag is taking it slow.</h3>
                <p className="mt-3 max-w-xs text-sm leading-6 text-noir-muted">Find a few considered essentials and make them your own.</p>
                <button onClick={() => { setCartOpen(false); document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' }) }} className="mt-7 bg-noir-ink px-6 py-4 text-[10px] uppercase tracking-[0.18em] text-white">Explore the collection</button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-3">
                  {cart.map(item => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-4 border-b border-noir-line py-5">
                      <img src={item.image} alt="" className="h-28 w-24 bg-noir-cream object-cover" />
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-3"><p className="text-xs font-medium leading-5">{item.name}</p><button onClick={() => updateQuantity(item.id, item.size, -item.quantity)} aria-label="Remove item"><X size={14} /></button></div>
                        <p className="mt-1 text-[10px] text-noir-muted">Size: {item.size} · {item.color}</p>
                        <div className="mt-auto flex items-center justify-between pt-4">
                          <div className="flex items-center border border-noir-line">
                            <button onClick={() => updateQuantity(item.id, item.size, -1)} className="p-2" aria-label="Decrease quantity"><Minus size={12} /></button>
                            <span className="min-w-6 text-center text-[10px]">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.size, 1)} className="p-2" aria-label="Increase quantity"><Plus size={12} /></button>
                          </div>
                          <span className="text-xs">{money(item.price * item.quantity)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-noir-line px-6 py-6">
                  <div className="flex items-center justify-between text-sm"><span>Subtotal</span><span>{money(subtotal)}</span></div>
                  <p className="mt-2 text-[10px] leading-5 text-noir-muted">Shipping and any applicable taxes are confirmed when your order is placed.</p>
                  <button onClick={orderOnWhatsApp} className="mt-5 flex w-full items-center justify-center gap-3 bg-noir-ink px-5 py-4 text-[10px] uppercase tracking-[0.18em] text-white transition hover:bg-[#45413b]">Order on WhatsApp <ArrowRight size={15} /></button>
                  <p className="mt-3 text-center text-[9px] text-noir-muted">Demo checkout · WhatsApp number must be configured before launch</p>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  )
}

export default App
