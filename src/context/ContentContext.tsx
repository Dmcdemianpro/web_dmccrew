'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Tipos
interface HeroContent {
  title1: string
  title2: string
  subtitle: string
  description: string
}

interface ServiceItem {
  id: number
  icon: string
  title: string
  description: string
  image?: string
}

interface PortfolioItem {
  id: number
  title: string
  description: string
  type: 'textil'
  image: string
  tags: string[]
}

interface Testimonial {
  id: number
  quote: string
  author: string
  company: string
  type: 'textil'
}

interface ContactInfo {
  phone: string
  whatsapp: string
  email: string
  address: string
  schedule: string
  instagram: string
  facebook: string
  linkedin: string
}

interface TextilStat {
  value: string
  label: string
  icon: string
}

interface CatalogItem {
  id: number
  title: string
  description: string
  image: string
  features: string[]
  highlighted: boolean
}

interface ConfiguratorProduct {
  id: number
  nombre: string
  imagen: string
}

interface ConfiguratorColor {
  id: number
  nombre: string
  hex: string
}

interface TextilConfigurator {
  products: ConfiguratorProduct[]
  colors: ConfiguratorColor[]
  sizes: string[]
}

interface StockDesign {
  id: number
  nombre: string
  imagen: string
  tipo: 'adulto' | 'nino'
  tallas: { talla: string; disponible: boolean }[]
}

// Selector de bienvenida
interface WelcomeSelector {
  title: string
  subtitle: string
  description: string
  backgroundImage: string
  textilCard: {
    title: string
    subtitle: string
    description: string
    image: string
    buttonText: string
  }
}

interface SiteContent {
  // General
  siteName: string
  siteTagline: string

  // Diseño
  design: {
    logo: string
    fontFamily: string
    primaryColor: string
    secondaryColor: string
    accentColor: string
  }

  // Selector de Bienvenida
  welcome: WelcomeSelector

  // Hero Principal
  hero: HeroContent

  // Textil
  textilHero: HeroContent
  textilStats: TextilStat[]
  textilCatalog: CatalogItem[]
  textilServices: ServiceItem[]
  textilPricing: {
    adultos: { producto: string; talla: string; precio: number }[]
    ninos: { producto: string; talla: string; precio: number }[]
    cotizacion: string[]
  }
  textilGallery: { id: number; url: string; caption: string }[]

  // Configurador Textil
  textilConfigurator: TextilConfigurator

  // Stock Designs (Poleras de Stock)
  stockDesigns: StockDesign[]

  // Beneficios
  textilBenefits: { icon: string; title: string; description: string }[]

  // Proceso
  textilProcess: { step: number; title: string; description: string }[]

  // FAQ
  textilFaq: { question: string; answer: string }[]

  // CTA
  textilCta: { title: string; highlightedWord: string; description: string; buttonText: string }

  // Portfolio
  portfolio: PortfolioItem[]

  // Testimoniales
  testimonials: Testimonial[]

  // Contacto
  contact: ContactInfo
}

// Contenido por defecto
const defaultContent: SiteContent = {
  // General
  siteName: 'DMC Crew',
  siteTagline: 'Personalización textil DTF con calidad premium',

  // Diseño
  design: {
    logo: '/images/logo_dmccrew.png',
    fontFamily: 'Inter',
    primaryColor: '#3b82f6',
    secondaryColor: '#10b981',
    accentColor: '#ff0040',
  },

  // Selector de Bienvenida
  welcome: {
    title: 'Bienvenido a DMC Crew',
    subtitle: 'Personalización Textil DTF',
    description: 'Selecciona tu prenda y personalízala con impresión DTF de alta calidad.',
    backgroundImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80',
    textilCard: {
      title: 'Personalización Textil',
      subtitle: 'Impresión DTF Profesional',
      description: 'Poleras, polerones, uniformes y merchandising con impresión DTF de alta calidad. Desde 1 unidad hasta pedidos mayoristas.',
      image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80',
      buttonText: 'Explorar Textil DTF',
    },
  },

  // Hero Principal
  hero: {
    title1: 'Personaliza',
    title2: 'tu estilo',
    subtitle: 'Impresión DTF Profesional',
    description: 'Tu diseño, impreso con calidad excepcional en la prenda que elijas.',
  },

  // Textil
  textilHero: {
    title1: 'PERSONALIZA',
    title2: 'TU ESTILO',
    subtitle: 'Impresión DTF Profesional',
    description: 'Tu diseño, impreso con calidad excepcional en la prenda que elijas. Poleras, polerones, uniformes y más. Desde 1 unidad.',
  },
  textilStats: [
    { value: '1+', label: 'Desde 1 unidad', icon: 'Star' },
    { value: 'DTF', label: 'Alta calidad de impresión', icon: 'Palette' },
    { value: '⚡', label: 'Entrega rápida', icon: 'Zap' },
  ],
  textilCatalog: [
    { id: 1, title: 'Poleras Streetwear', description: 'Algodón premium, oversize y regular fit. Diseños urbanos, gráficos bold y colores vibrantes.', image: '', features: ['Oversize', 'Full Color', 'Urban'], highlighted: true },
    { id: 2, title: 'Polerones Urban', description: 'Hoodies premium con o sin capucha. Estilo streetwear, perfectos para tu crew o marca.', image: '', features: ['Hoodie', 'Crew', 'Premium'], highlighted: false },
    { id: 3, title: 'Uniformes Corporativos', description: 'Polos, camisas y chaquetas con tu identidad. Cotización especial por volumen.', image: '', features: ['Logo', 'Bordado', 'Volumen'], highlighted: false },
    { id: 4, title: 'Gorras & Accesorios', description: 'Snapbacks, dad hats, beanies y más. Complementa tu estilo con accesorios personalizados.', image: '', features: ['Snapback', 'Beanie', 'Custom'], highlighted: false },
  ],
  textilServices: [
    { id: 1, icon: 'Shirt', title: 'Poleras', description: 'Algodón, poliéster o mezcla. Cuello redondo o polo. Desde talla XS hasta XXXL.', image: '/images/polera.jpg' },
    { id: 2, icon: 'Jacket', title: 'Polerones', description: 'Con o sin capucha, canguro o full zipper. Ideales para equipos de trabajo.', image: '/images/poleron.jpg' },
    { id: 3, icon: 'Users', title: 'Uniformes Corporativos', description: 'Polos, camisas, chaquetas. Con tu logo y datos. Cotización especial por volumen.', image: '/images/uniforme.jpg' },
    { id: 4, icon: 'Gift', title: 'Merchandising', description: 'Bolsos, gorros, delantales y mas. Si es tela, probablemente lo podemos personalizar.', image: '/images/merchandising.jpg' },
  ],
  textilPricing: {
    adultos: [
      { producto: 'Polera Dogo Premium Hombre', talla: 'S-2XL', precio: 12990 },
      { producto: 'Polera Piqué Monzha Mujer', talla: 'S-2XL', precio: 15000 },
      { producto: 'Polera Piqué Pegaso Premium Mujer', talla: 'S-2XL', precio: 16000 },
      { producto: 'Polera Piqué Tormo', talla: 'S-2XL', precio: 18000 },
      { producto: 'Polera Dogo Premium 3XL-4XL', talla: '3XL-4XL', precio: 13000 },
      { producto: 'Polera Piqué Monzha Hombre', talla: 'S-3XL', precio: 15500 },
      { producto: 'Polerón Canguro adulto', talla: 'S-XL', precio: 28990 },
      { producto: 'Polerón Canguro adulto', talla: 'XXL', precio: 30500 },
      { producto: 'Polerón Polo adulto', talla: 'S-XL', precio: 29000 },
      { producto: 'Polerón Polo adulto', talla: 'XXL', precio: 29990 },
    ],
    ninos: [
      { producto: 'Polera Dogo Premium Niño', talla: '3/4-11/12', precio: 12990 },
      { producto: 'Polerón Canguro niño', talla: '2-8', precio: 19500 },
      { producto: 'Polerón Canguro niño', talla: '10-16', precio: 20000 },
      { producto: 'Polerón Polo niño', talla: '2-8', precio: 21000 },
      { producto: 'Polerón Polo niño', talla: '10-16', precio: 21500 },
    ],
    cotizacion: ['Personalización Empresas', 'Tallas Especiales', 'Pedidos por Mayor'],
  },
  textilGallery: [
    { id: 1, url: '/images/gallery/trabajo-01.jpg', caption: 'Trabajo DTF' },
    { id: 2, url: '/images/gallery/trabajo-02.jpg', caption: 'Polera Personalizada' },
    { id: 3, url: '/images/gallery/trabajo-03.jpg', caption: 'Impresion DTF' },
    { id: 4, url: '/images/gallery/trabajo-04.jpg', caption: 'Trabajo DTF' },
    { id: 5, url: '/images/gallery/trabajo-05.jpg', caption: 'Polera Full Color' },
    { id: 6, url: '/images/gallery/trabajo-06.jpg', caption: 'Polera Personalizada' },
    { id: 7, url: '/images/gallery/trabajo-07.jpg', caption: 'Impresion DTF' },
    { id: 8, url: '/images/gallery/trabajo-08.jpg', caption: 'Trabajo DTF' },
    { id: 9, url: '/images/gallery/trabajo-09.jpg', caption: 'Polera Personalizada' },
    { id: 10, url: '/images/gallery/trabajo-10.jpg', caption: 'Poleras DTF' },
    { id: 11, url: '/images/gallery/trabajo-11.jpg', caption: 'Trabajos Recientes' },
  ],

  // Configurador Textil
  textilConfigurator: {
    products: [
      { id: 1, nombre: 'Polera', imagen: '' },
      { id: 2, nombre: 'Polerón', imagen: '' },
    ],
    colors: [
      { id: 1, nombre: 'Negro', hex: '#000000' },
      { id: 2, nombre: 'Blanco', hex: '#FFFFFF' },
      { id: 3, nombre: 'Rojo', hex: '#EF4444' },
      { id: 4, nombre: 'Azul Marino', hex: '#1E3A5F' },
      { id: 5, nombre: 'Gris', hex: '#6B7280' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },

  // Stock Designs
  stockDesigns: [],

  // Beneficios
  textilBenefits: [
    { icon: 'Package', title: 'Desde 1 unidad', description: 'Sin mínimos. Personalizamos desde una sola prenda sin costos adicionales.' },
    { icon: 'Palette', title: 'Full color y gran definición', description: 'Ideal para logos, fotos e ilustraciones. Sin límite de colores ni degradados.' },
    { icon: 'Droplet', title: 'Excelente terminación', description: 'Acabado profesional, colores vibrantes y alta adherencia. Resiste el lavado con cuidado normal.' },
    { icon: 'Truck', title: 'Entrega rápida', description: 'Gestionamos tu pedido con tiempos ágiles. Retiro coordinado en Santiago o despacho a todo Chile.' },
    { icon: 'MessageCircle', title: 'Atención directa y simple', description: 'Cotizas, confirmamos, producimos y coordinamos la entrega. Sin vueltas ni complicaciones.' },
  ],

  // Proceso
  textilProcess: [
    { step: 1, title: 'Envíanos tu idea o diseño', description: 'Un logo, imagen, referencia o simplemente lo que necesitas. Te ayudamos a prepararlo para la impresión.' },
    { step: 2, title: 'Te cotizamos rápido', description: 'Revisamos tu pedido y te enviamos una propuesta clara con precio, plazo y opciones.' },
    { step: 3, title: 'Producimos tu prenda', description: 'Fabricamos con impresión DTF de alta calidad: colores vibrantes, buen acabado y excelente adherencia.' },
    { step: 4, title: 'Coordinamos la entrega', description: 'Retiras en Santiago según coordinación o solicitamos despacho a tu dirección en todo Chile.' },
  ],

  // FAQ
  textilFaq: [
    { question: '¿Trabajan desde 1 unidad?', answer: 'Sí. No exigimos pedidos mínimos. Puedes cotizar desde una sola prenda sin costo adicional.' },
    { question: '¿Cuánto demora un pedido?', answer: 'Depende de la cantidad y el tipo de prenda. Escríbenos y te indicamos el plazo exacto para tu pedido.' },
    { question: '¿Hacen envíos a regiones?', answer: 'Sí, enviamos a todo Chile vía Starken, Chilexpress o el courier que prefieras. El costo del envío es adicional.' },
    { question: '¿Me ayudan con el diseño?', answer: 'Sí. Si tienes una idea, referencia o imagen base, te orientamos para que quede bien impresa en la prenda.' },
    { question: '¿Puedo cotizar para mi marca o empresa?', answer: 'Sí. Trabajamos con pedidos individuales y producción para marcas, emprendimientos, eventos y empresas. Cotización personalizada según volumen.' },
  ],

  // CTA
  textilCta: {
    title: 'Tu diseño puede convertirse en una prenda lista para',
    highlightedWord: 'usar, vender o regalar',
    description: 'Personalizamos poleras y polerones con impresión DTF, atención directa y cotización rápida.',
    buttonText: 'Cotizar por WhatsApp',
  },

  // Portfolio
  portfolio: [
    { id: 2, title: 'Uniformes Empresa Tech', description: '500 poleras y 200 polerones personalizados para equipo de startup', type: 'textil', image: '/images/portfolio/textil-1.jpg', tags: ['DTF', 'Corporativo', 'Poleras'] },
    { id: 4, title: 'Merchandising Evento', description: 'Kit completo de merchandising para conferencia', type: 'textil', image: '/images/portfolio/textil-2.jpg', tags: ['DTF', 'Evento', 'Merchandising'] },
  ],

  // Testimoniales
  testimonials: [
    { id: 1, quote: 'Pedí 30 poleras para mi equipo y quedaron perfectas. Los colores salieron exactos al diseño y llegaron antes de lo esperado.', author: 'Francisca M.', company: 'Coordinadora de eventos', type: 'textil' },
    { id: 2, quote: 'Desde la primera consulta por WhatsApp hasta la entrega todo fue muy directo. Sin vueltas. Las poleras para mi marca quedaron increíbles.', author: 'Rodrigo A.', company: 'Emprendimiento streetwear', type: 'textil' },
    { id: 3, quote: 'Cotizamos uniformes para 80 personas y el precio fue muy competitivo. La calidad de la impresión DTF aguanta perfectamente el lavado.', author: 'Javier C.', company: 'Empresa de servicios', type: 'textil' },
  ],

  // Contacto
  contact: {
    phone: '+56 9 XXXX XXXX',
    whatsapp: '569XXXXXXXX',
    email: 'contacto@dmcprojects.cl',
    address: 'Santiago, Chile',
    schedule: 'Lunes a Viernes: 9:00 - 18:00',
    instagram: 'https://www.instagram.com/dmcprojects.cl/',
    facebook: 'https://www.facebook.com/dmcprojects',
    linkedin: 'https://www.linkedin.com/company/dmcprojects',
  },
}

// Credenciales de admin
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'dmc2024',
}

// Interfaz del contexto
interface ContentContextType {
  content: SiteContent
  isAuthenticated: boolean
  isSaving: boolean
  isPublishing: boolean
  hasUnsavedChanges: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
  updateContent: <K extends keyof SiteContent>(section: K, data: SiteContent[K]) => void
  updateHero: (data: Partial<HeroContent>) => void
  updateTextilHero: (data: Partial<HeroContent>) => void
  updateTextilPricing: (data: SiteContent['textilPricing']) => void
  updateContact: (data: Partial<ContactInfo>) => void
  updateWelcome: (data: Partial<WelcomeSelector>) => void
  updateDesign: (data: Partial<SiteContent['design']>) => void
  addService: (type: 'textil', service: Omit<ServiceItem, 'id'>) => void
  updateService: (type: 'textil', id: number, data: Partial<ServiceItem>) => void
  deleteService: (type: 'textil', id: number) => void
  addPortfolioItem: (item: Omit<PortfolioItem, 'id'>) => void
  updatePortfolioItem: (id: number, data: Partial<PortfolioItem>) => void
  deletePortfolioItem: (id: number) => void
  addTestimonial: (testimonial: Omit<Testimonial, 'id'>) => void
  updateTestimonial: (id: number, data: Partial<Testimonial>) => void
  deleteTestimonial: (id: number) => void
  addGalleryItem: (item: { url: string; caption: string }) => void
  updateGalleryItem: (id: number, data: { url?: string; caption?: string }) => void
  deleteGalleryItem: (id: number) => void
  addStockDesign: (design: Omit<StockDesign, 'id'>) => void
  updateStockDesign: (id: number, data: Partial<StockDesign>) => void
  deleteStockDesign: (id: number) => void
  resetToDefault: () => void
  saveToServer: () => Promise<{ success: boolean; message: string }>
  publishChanges: () => Promise<{ success: boolean; message: string }>
}

const ContentContext = createContext<ContentContextType | undefined>(undefined)

// Función para detectar URLs de placeholder rotas
function isBrokenPlaceholderUrl(value: unknown): boolean {
  if (typeof value !== 'string') return false
  const lowerValue = value.toLowerCase()
  return (
    lowerValue.includes('placeholder.com') ||
    lowerValue.includes('via.placeholder') ||
    lowerValue.includes('400x300?text=') ||
    lowerValue.includes('800x600?text=') ||
    lowerValue.includes('placehold.co') ||
    lowerValue.includes('placeholdit')
  )
}

// Función recursiva para limpiar URLs de placeholder rotas del contenido
function cleanBrokenUrls<T>(obj: T, defaultFallback: string = ''): T {
  if (obj === null || obj === undefined) return obj

  if (typeof obj === 'string') {
    return isBrokenPlaceholderUrl(obj) ? (defaultFallback as unknown as T) : obj
  }

  if (Array.isArray(obj)) {
    return obj.map(item => cleanBrokenUrls(item, defaultFallback)) as unknown as T
  }

  if (typeof obj === 'object') {
    const cleaned: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(obj)) {
      // Para campos de imagen, usar string vacío como fallback
      if (key === 'image' || key === 'url' || key === 'backgroundImage' || key === 'logo') {
        cleaned[key] = cleanBrokenUrls(value, '')
      } else {
        cleaned[key] = cleanBrokenUrls(value, defaultFallback)
      }
    }
    return cleaned as T
  }

  return obj
}

export function ContentProvider({ children }: { children: ReactNode }) {
  // Inicializar con valores por defecto para evitar error de hidratación
  const [content, setContent] = useState<SiteContent>(defaultContent)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [serverContent, setServerContent] = useState<string>('')

  // Cargar contenido: primero del servidor (JSON file), luego localStorage como fallback
  useEffect(() => {
    const loadContent = async () => {
      try {
        // Intentar cargar desde el servidor primero
        const response = await fetch('/api/content', {
          credentials: 'include',
        })
        const serverData = await response.json()

        if (serverData && !serverData.error) {
          // Limpiar URLs de placeholder rotas antes de usar el contenido
          const cleanedData = cleanBrokenUrls(serverData)
          setContent({ ...defaultContent, ...cleanedData })
          setServerContent(JSON.stringify(cleanedData))
          // También actualizar localStorage para consistencia local
          localStorage.setItem('dmcContent', JSON.stringify(cleanedData))
        } else {
          // Si no hay datos en servidor, cargar desde localStorage
          const savedContent = localStorage.getItem('dmcContent')
          if (savedContent) {
            try {
              const parsed = JSON.parse(savedContent)
              const cleanedData = cleanBrokenUrls(parsed)
              setContent({ ...defaultContent, ...cleanedData })
            } catch (e) {
              console.error('Error parsing saved content:', e)
            }
          }
        }
      } catch {
        // Si falla la llamada al servidor, usar localStorage
        const savedContent = localStorage.getItem('dmcContent')
        if (savedContent) {
          try {
            const parsed = JSON.parse(savedContent)
            const cleanedData = cleanBrokenUrls(parsed)
            setContent({ ...defaultContent, ...cleanedData })
          } catch (e) {
            console.error('Error parsing saved content:', e)
          }
        }
      }

      const savedAuth = localStorage.getItem('dmcAdminAuth')
      if (savedAuth === 'true') {
        setIsAuthenticated(true)
      }

      setIsHydrated(true)
    }

    loadContent()
  }, [])

  // Guardar en localStorage cuando cambie el contenido (solo después de hidratar)
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('dmcContent', JSON.stringify(content))
      // Verificar si hay cambios sin guardar en el servidor
      const currentContentStr = JSON.stringify(content)
      if (serverContent && currentContentStr !== serverContent) {
        setHasUnsavedChanges(true)
      }
    }
  }, [content, isHydrated, serverContent])

  // Aplicar estilos de diseño cuando cambien
  useEffect(() => {
    if (typeof window !== 'undefined' && content.design) {
      // Aplicar fuente
      document.documentElement.style.setProperty('--font-family', content.design.fontFamily)

      // Aplicar colores como CSS variables
      document.documentElement.style.setProperty('--color-primary', content.design.primaryColor)
      document.documentElement.style.setProperty('--color-secondary', content.design.secondaryColor)
      document.documentElement.style.setProperty('--color-accent', content.design.accentColor)
    }
  }, [content.design])

  // Funciones de autenticacion
  const login = (username: string, password: string) => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true)
      localStorage.setItem('dmcAdminAuth', 'true')
      // Cookie para que las API detecten sesión (solo bandera, no es seguridad fuerte)
      if (typeof window !== 'undefined') {
        const host = window.location.hostname
        const isLocal = host === 'localhost' || host === '127.0.0.1'
        const rootDomain = host.split('.').slice(-2).join('.')
        const domainPart = isLocal ? '' : `; domain=.${rootDomain}`
        const securePart = window.location.protocol === 'https:' ? '; Secure' : ''
        document.cookie = `dmcAdminAuth=true; Path=/; Max-Age=604800; SameSite=Lax${domainPart}${securePart}`
      }
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('dmcAdminAuth')
    if (typeof window !== 'undefined') {
      const host = window.location.hostname
      const isLocal = host === 'localhost' || host === '127.0.0.1'
      const rootDomain = host.split('.').slice(-2).join('.')
      const domainPart = isLocal ? '' : `; domain=.${rootDomain}`
      const securePart = window.location.protocol === 'https:' ? '; Secure' : ''
      document.cookie = `dmcAdminAuth=; Path=/; Max-Age=0; SameSite=Lax${domainPart}${securePart}`
    }
  }

  // Funciones para actualizar contenido
  const updateContent = <K extends keyof SiteContent>(section: K, data: SiteContent[K]) => {
    setContent(prev => ({ ...prev, [section]: data }))
  }

  const updateHero = (data: Partial<HeroContent>) => {
    setContent(prev => ({ ...prev, hero: { ...prev.hero, ...data } }))
  }

  const updateTextilHero = (data: Partial<HeroContent>) => {
    setContent(prev => ({ ...prev, textilHero: { ...prev.textilHero, ...data } }))
  }

  const updateTextilPricing = (data: SiteContent['textilPricing']) => {
    setContent(prev => ({ ...prev, textilPricing: data }))
  }

  const updateContact = (data: Partial<ContactInfo>) => {
    setContent(prev => ({ ...prev, contact: { ...prev.contact, ...data } }))
  }

  const updateWelcome = (data: Partial<WelcomeSelector>) => {
    setContent(prev => ({ ...prev, welcome: { ...prev.welcome, ...data } }))
  }

  const updateDesign = (data: Partial<SiteContent['design']>) => {
    setContent(prev => ({ ...prev, design: { ...prev.design, ...data } }))
  }

  // Servicios
  const addService = (_type: 'textil', service: Omit<ServiceItem, 'id'>) => {
    const newService = { ...service, id: Date.now() }
    setContent(prev => ({ ...prev, textilServices: [...prev.textilServices, newService] }))
  }

  const updateService = (_type: 'textil', id: number, data: Partial<ServiceItem>) => {
    setContent(prev => ({
      ...prev,
      textilServices: prev.textilServices.map(s => s.id === id ? { ...s, ...data } : s)
    }))
  }

  const deleteService = (_type: 'textil', id: number) => {
    setContent(prev => ({ ...prev, textilServices: prev.textilServices.filter(s => s.id !== id) }))
  }

  // Portfolio
  const addPortfolioItem = (item: Omit<PortfolioItem, 'id'>) => {
    const newItem = { ...item, id: Date.now() }
    setContent(prev => ({ ...prev, portfolio: [...prev.portfolio, newItem] }))
  }

  const updatePortfolioItem = (id: number, data: Partial<PortfolioItem>) => {
    setContent(prev => ({
      ...prev,
      portfolio: prev.portfolio.map(p => p.id === id ? { ...p, ...data } : p)
    }))
  }

  const deletePortfolioItem = (id: number) => {
    setContent(prev => ({ ...prev, portfolio: prev.portfolio.filter(p => p.id !== id) }))
  }

  // Testimoniales
  const addTestimonial = (testimonial: Omit<Testimonial, 'id'>) => {
    const newTestimonial = { ...testimonial, id: Date.now() }
    setContent(prev => ({ ...prev, testimonials: [...prev.testimonials, newTestimonial] }))
  }

  const updateTestimonial = (id: number, data: Partial<Testimonial>) => {
    setContent(prev => ({
      ...prev,
      testimonials: prev.testimonials.map(t => t.id === id ? { ...t, ...data } : t)
    }))
  }

  const deleteTestimonial = (id: number) => {
    setContent(prev => ({ ...prev, testimonials: prev.testimonials.filter(t => t.id !== id) }))
  }

  // Gallery
  const addGalleryItem = (item: { url: string; caption: string }) => {
    const newItem = { ...item, id: Date.now() }
    setContent(prev => ({ ...prev, textilGallery: [...prev.textilGallery, newItem] }))
  }

  const updateGalleryItem = (id: number, data: { url?: string; caption?: string }) => {
    setContent(prev => ({
      ...prev,
      textilGallery: prev.textilGallery.map(g => g.id === id ? { ...g, ...data } : g)
    }))
  }

  const deleteGalleryItem = (id: number) => {
    setContent(prev => ({ ...prev, textilGallery: prev.textilGallery.filter(g => g.id !== id) }))
  }

  // Stock Designs
  const addStockDesign = (design: Omit<StockDesign, 'id'>) => {
    const newDesign = { ...design, id: Date.now() }
    setContent(prev => ({ ...prev, stockDesigns: [...(prev.stockDesigns || []), newDesign] }))
  }

  const updateStockDesign = (id: number, data: Partial<StockDesign>) => {
    setContent(prev => ({
      ...prev,
      stockDesigns: (prev.stockDesigns || []).map(d => d.id === id ? { ...d, ...data } : d)
    }))
  }

  const deleteStockDesign = (id: number) => {
    setContent(prev => ({ ...prev, stockDesigns: (prev.stockDesigns || []).filter(d => d.id !== id) }))
  }

  // Resetear a valores por defecto
  const resetToDefault = () => {
    setContent(defaultContent)
    localStorage.setItem('dmcContent', JSON.stringify(defaultContent))
  }

  // Guardar contenido en el servidor (archivo JSON)
  const saveToServer = async (): Promise<{ success: boolean; message: string }> => {
    setIsSaving(true)
    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-auth': 'true',
        },
        credentials: 'include',
        body: JSON.stringify(content),
      })

      const data = await response.json()

      if (data.success) {
        setServerContent(JSON.stringify(content))
        setHasUnsavedChanges(false)
        return { success: true, message: 'Contenido guardado en el servidor' }
      } else {
        return { success: false, message: data.error || 'Error al guardar' }
      }
    } catch (error) {
      console.error('Error saving to server:', error)
      return { success: false, message: 'Error de conexión al guardar' }
    } finally {
      setIsSaving(false)
    }
  }

  // Publicar cambios (guardar + disparar deploy)
  const publishChanges = async (): Promise<{ success: boolean; message: string }> => {
    setIsPublishing(true)
    try {
      // Primero guardar en el servidor
      const saveResult = await saveToServer()
      if (!saveResult.success) {
        return saveResult
      }

      // Luego disparar el deploy
      const deployResponse = await fetch('/api/deploy', {
        method: 'POST',
      })

      const deployData = await deployResponse.json()

      if (deployData.success) {
        return { success: true, message: 'Cambios publicados. El sitio se actualizará en unos minutos.' }
      } else {
        // Si el deploy falla pero el guardado fue exitoso, informar
        if (deployData.error === 'Deploy hook not configured') {
          return {
            success: true,
            message: 'Contenido guardado. Para publicar automáticamente, configura DEPLOY_HOOK_URL en las variables de entorno.'
          }
        }
        return { success: false, message: deployData.message || 'Error al publicar' }
      }
    } catch (error) {
      console.error('Error publishing:', error)
      return { success: false, message: 'Error de conexión al publicar' }
    } finally {
      setIsPublishing(false)
    }
  }

  const value: ContentContextType = {
    content,
    isAuthenticated,
    isSaving,
    isPublishing,
    hasUnsavedChanges,
    login,
    logout,
    updateContent,
    updateHero,
    updateTextilHero,
    updateTextilPricing,
    updateContact,
    updateWelcome,
    updateDesign,
    addService,
    updateService,
    deleteService,
    addPortfolioItem,
    updatePortfolioItem,
    deletePortfolioItem,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    addStockDesign,
    updateStockDesign,
    deleteStockDesign,
    resetToDefault,
    saveToServer,
    publishChanges,
  }

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  const context = useContext(ContentContext)
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider')
  }
  return context
}

export default ContentContext
