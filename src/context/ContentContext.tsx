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
  type: 'salud' | 'textil'
  image: string
  tags: string[]
}

interface Testimonial {
  id: number
  quote: string
  author: string
  company: string
  type: 'salud' | 'textil'
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
  saludCard: {
    title: string
    subtitle: string
    description: string
    image: string
    buttonText: string
  }
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

  // Salud
  saludHero: HeroContent
  saludServices: ServiceItem[]
  saludTechnologies: {
    motors: string[]
    standards: string[]
    profiles: string[]
    protocols: string[]
    databases: string[]
  }

  // Textil
  textilHero: HeroContent
  textilServices: ServiceItem[]
  textilPricing: {
    adultos: { producto: string; talla: string; precio: number }[]
    ninos: { producto: string; talla: string; precio: number }[]
    cotizacion: string[]
  }
  textilGallery: { id: number; url: string; caption: string }[]

  // Stock Designs (Poleras de Stock)
  stockDesigns: StockDesign[]

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
  siteName: 'DMC Projects',
  siteTagline: 'Conectamos sistemas de salud e imprimimos tu identidad',

  // Diseño
  design: {
    logo: '/logo.png',
    fontFamily: 'Inter',
    primaryColor: '#3b82f6',
    secondaryColor: '#10b981',
    accentColor: '#ff0040',
  },

  // Selector de Bienvenida
  welcome: {
    title: 'Bienvenido a DMC Projects Spa',
    subtitle: 'Dos especialidades, un solo equipo',
    description: 'Somos una empresa dedicada a dos rubros especializados. Selecciona el area que necesitas para conocer nuestros servicios.',
    backgroundImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80',
    saludCard: {
      title: 'Salud Digital',
      subtitle: 'Interoperabilidad e Integracion',
      description: 'Conectamos sistemas clinicos HIS, RIS, LIS, PACS con estandares HL7, FHIR y CDA. Especialistas en Mirth Connect y motores de integracion.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&q=80',
      buttonText: 'Explorar Salud Digital',
    },
    textilCard: {
      title: 'Personalizacion Textil',
      subtitle: 'Impresion DTF Profesional',
      description: 'Poleras, polerones, uniformes y merchandising con impresion DTF de alta calidad. Desde 1 unidad hasta pedidos mayoristas.',
      image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80',
      buttonText: 'Explorar Textil DTF',
    },
  },

  // Hero Principal
  hero: {
    title1: 'Conectamos sistemas de salud',
    title2: 'e imprimimos tu identidad',
    subtitle: 'Un equipo, dos especialidades, cero complicaciones',
    description: 'Interoperabilidad clinica + Personalizacion textil DTF.',
  },

  // Salud
  saludHero: {
    title1: 'Interoperabilidad',
    title2: 'e Integracion de Sistemas',
    subtitle: 'Que tus sistemas hablen el mismo idioma',
    description: 'Conectamos tus sistemas clinicos HIS, RIS, LIS, PACS con estandares HL7, FHIR y CDA. Desde el levantamiento inicial hasta el monitoreo continuo.',
  },
  saludServices: [
    { id: 1, icon: 'GitBranch', title: 'Levantamiento de Flujos', description: 'Mapeamos tus procesos actuales, identificamos puntos de integracion y documentamos requerimientos tecnicos y de negocio.' },
    { id: 2, icon: 'Layers', title: 'Diseno de Integracion', description: 'Definimos la arquitectura de integracion optima: protocolos, transformaciones, validaciones y manejo de errores.' },
    { id: 3, icon: 'Plug', title: 'Desarrollo de Conectores', description: 'Construimos interfaces especificas para tus sistemas: HIS, RIS, LIS, PACS, ERP, y cualquier aplicacion con capacidad de integracion.' },
    { id: 4, icon: 'RefreshCw', title: 'Normalizacion y Transformacion', description: 'Convertimos datos entre formatos y estandares. HL7 v2 a FHIR, XML a JSON, y cualquier transformacion que requieras.' },
    { id: 5, icon: 'Server', title: 'Implementacion de Motores', description: 'Instalamos, configuramos y optimizamos Mirth Connect u OIE segun tus necesidades de volumen, redundancia y monitoreo.' },
    { id: 6, icon: 'Activity', title: 'Monitoreo y Trazabilidad', description: 'Dashboards en tiempo real, alertas proactivas y logs completos para auditoria y troubleshooting.' },
  ],
  saludTechnologies: {
    motors: ['Mirth Connect (NextGen)', 'Open Integration Engine (OIE)'],
    standards: ['HL7 v2.x (ADT, ORM, ORU, SIU, MDM...)', 'HL7 FHIR R4', 'CDA (Clinical Document Architecture)'],
    profiles: ['PIX/PDQ (Gestion de pacientes)', 'XDS (Documentos)', 'ATNA (Auditoria)'],
    protocols: ['MLLP, HTTP/REST, SOAP', 'TCP/IP, SFTP, AS2'],
    databases: ['PostgreSQL', 'MySQL', 'SQL Server', 'Oracle'],
  },

  // Textil
  textilHero: {
    title1: 'PERSONALIZA',
    title2: 'TU ESTILO',
    subtitle: 'Impresion DTF Profesional',
    description: 'Tu diseno, impreso con calidad excepcional en la prenda que elijas. Poleras, polerones, uniformes corporativos y mas. Desde 1 unidad.',
  },
  textilServices: [
    { id: 1, icon: 'Shirt', title: 'Poleras', description: 'Algodon, poliester o mezcla. Cuello redondo o polo. Desde talla XS hasta XXXL.', image: '/images/polera.jpg' },
    { id: 2, icon: 'Jacket', title: 'Polerones', description: 'Con o sin capucha, canguro o full zipper. Ideales para equipos de trabajo.', image: '/images/poleron.jpg' },
    { id: 3, icon: 'Users', title: 'Uniformes Corporativos', description: 'Polos, camisas, chaquetas. Con tu logo y datos. Cotizacion especial por volumen.', image: '/images/uniforme.jpg' },
    { id: 4, icon: 'Gift', title: 'Merchandising', description: 'Bolsos, gorros, delantales y mas. Si es tela, probablemente lo podemos personalizar.', image: '/images/merchandising.jpg' },
  ],
  textilPricing: {
    adultos: [
      { producto: 'Polera Dogo Premium Hombre', talla: 'S-2XL', precio: 13990 },
      { producto: 'Polera Piqué Monzha Mujer', talla: 'S-2XL', precio: 17000 },
      { producto: 'Polera Piqué Pegaso Premium Mujer', talla: 'S-2XL', precio: 17000 },
      { producto: 'Polera Piqué Tormo', talla: 'S-2XL', precio: 19000 },
      { producto: 'Polera Dogo Premium', talla: '3XL-4XL', precio: 15990 },
      { producto: 'Polera Piqué Monzha Hombre', talla: 'S-3XL', precio: 17000 },
      { producto: 'Canguro', talla: 'S-XL', precio: 20990 },
      { producto: 'Canguro', talla: 'XXL', precio: 22990 },
      { producto: 'Polerón Polo', talla: 'S-XL', precio: 16990 },
      { producto: 'Polerón Polo', talla: 'XXL', precio: 22990 },
      { producto: 'Polerón Cierre', talla: 'S-XL', precio: 24990 },
      { producto: 'Polerón Cierre', talla: 'XXL', precio: 24990 },
    ],
    ninos: [
      { producto: 'Polera Dogo Premium Niño', talla: '3/4-11/12', precio: 12990 },
      { producto: 'Canguro', talla: '2-8', precio: 15600 },
      { producto: 'Canguro', talla: '10-16', precio: 15600 },
      { producto: 'Polerón Polo', talla: '2-8', precio: 15000 },
      { producto: 'Polerón Polo', talla: '10-16', precio: 15600 },
      { producto: 'Polerón Cierre', talla: '2-8', precio: 20990 },
      { producto: 'Polerón Cierre', talla: '10-16', precio: 22990 },
    ],
    cotizacion: ['Personalización Empresas', 'Tallas Especiales', 'Pedidos por Mayor'],
  },
  textilGallery: [
    { id: 1, url: '/images/gallery/dtf-1.jpg', caption: 'Polera Full Color' },
    { id: 2, url: '/images/gallery/dtf-2.jpg', caption: 'Poleron Personalizado' },
    { id: 3, url: '/images/gallery/dtf-3.jpg', caption: 'Uniformes Empresa' },
    { id: 4, url: '/images/gallery/dtf-4.jpg', caption: 'Merchandising Evento' },
  ],

  // Stock Designs
  stockDesigns: [],

  // Portfolio
  portfolio: [
    { id: 1, title: 'Integracion HIS-LIS', description: 'Conexion bidireccional entre sistema hospitalario y laboratorio usando HL7 v2.5', type: 'salud', image: '/images/portfolio/salud-1.jpg', tags: ['HL7', 'Mirth Connect', 'HIS', 'LIS'] },
    { id: 2, title: 'Uniformes Empresa Tech', description: '500 poleras y 200 polerones personalizados para equipo de startup', type: 'textil', image: '/images/portfolio/textil-1.jpg', tags: ['DTF', 'Corporativo', 'Poleras'] },
    { id: 3, title: 'Motor FHIR R4', description: 'Implementacion de gateway FHIR para interoperabilidad con apps moviles', type: 'salud', image: '/images/portfolio/salud-2.jpg', tags: ['FHIR', 'API', 'Mirth Connect'] },
    { id: 4, title: 'Merchandising Evento', description: 'Kit completo de merchandising para conferencia', type: 'textil', image: '/images/portfolio/textil-2.jpg', tags: ['DTF', 'Evento', 'Merchandising'] },
  ],

  // Testimoniales
  testimonials: [
    { id: 1, quote: 'DMC Projects integro nuestros sistemas HIS y LIS en tiempo record. La comunicacion fue excelente.', author: 'Director de TI', company: 'Centro Medico', type: 'salud' },
    { id: 2, quote: 'Las poleras quedaron increibles. Los colores vibrantes y la durabilidad superaron expectativas.', author: 'Gerente de RRHH', company: 'Empresa Tech', type: 'textil' },
    { id: 3, quote: 'Profesionales y comprometidos. Resolvieron integraciones complejas que otros no pudieron.', author: 'Jefe de Informatica', company: 'Clinica Privada', type: 'salud' },
    { id: 4, quote: 'Pedimos 200 uniformes personalizados y todo llego perfecto. Ya preparamos el siguiente pedido.', author: 'Dueno', company: 'Restaurant', type: 'textil' },
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
  updateSaludHero: (data: Partial<HeroContent>) => void
  updateTextilHero: (data: Partial<HeroContent>) => void
  updateTextilPricing: (data: SiteContent['textilPricing']) => void
  updateContact: (data: Partial<ContactInfo>) => void
  updateWelcome: (data: Partial<WelcomeSelector>) => void
  updateDesign: (data: Partial<SiteContent['design']>) => void
  addService: (type: 'salud' | 'textil', service: Omit<ServiceItem, 'id'>) => void
  updateService: (type: 'salud' | 'textil', id: number, data: Partial<ServiceItem>) => void
  deleteService: (type: 'salud' | 'textil', id: number) => void
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

  const updateSaludHero = (data: Partial<HeroContent>) => {
    setContent(prev => ({ ...prev, saludHero: { ...prev.saludHero, ...data } }))
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
  const addService = (type: 'salud' | 'textil', service: Omit<ServiceItem, 'id'>) => {
    const key = type === 'salud' ? 'saludServices' : 'textilServices'
    const newService = { ...service, id: Date.now() }
    setContent(prev => ({ ...prev, [key]: [...prev[key], newService] }))
  }

  const updateService = (type: 'salud' | 'textil', id: number, data: Partial<ServiceItem>) => {
    const key = type === 'salud' ? 'saludServices' : 'textilServices'
    setContent(prev => ({
      ...prev,
      [key]: prev[key].map(s => s.id === id ? { ...s, ...data } : s)
    }))
  }

  const deleteService = (type: 'salud' | 'textil', id: number) => {
    const key = type === 'salud' ? 'saludServices' : 'textilServices'
    setContent(prev => ({ ...prev, [key]: prev[key].filter(s => s.id !== id) }))
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
    updateSaludHero,
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
