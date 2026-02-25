// Navigation
export const NAV_ITEMS = [
  {
    label: "Textil DTF",
    href: "/",
    children: [
      { label: "Servicios DTF", href: "/" },
      { label: "Proceso DTF", href: "/#proceso" },
      { label: "Catálogo", href: "/#catalogo" },
      { label: "Cotizar Ahora", href: "/contacto?tema=textil" },
    ],
  },
  { label: "Portafolio", href: "/portafolio" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Blog", href: "/blog" },
];

// Services - Textil
export const TEXTIL_SERVICES = [
  {
    icon: "Shirt",
    title: "Poleras",
    description: "Algodón, poliéster o mezcla. Cuello redondo o polo. Desde talla XS hasta XXXL. Tu diseño en el pecho, espalda o manga.",
    image: "/images/polera.jpg",
  },
  {
    icon: "Jacket",
    title: "Polerones",
    description: "Con o sin capucha, canguro o full zipper. Ideales para equipos de trabajo, promociones y merchandising.",
    image: "/images/poleron.jpg",
  },
  {
    icon: "Users",
    title: "Uniformes Corporativos",
    description: "Polos, camisas, chaquetas. Con tu logo y los datos que necesites. Cotización especial por volumen.",
    image: "/images/uniforme.jpg",
  },
  {
    icon: "Gift",
    title: "Merchandising",
    description: "Bolsos, gorros, delantales y más. Si es tela, probablemente lo podemos personalizar.",
    image: "/images/merchandising.jpg",
  },
];

// FAQ - Textil
export const TEXTIL_FAQ = [
  {
    question: "¿Cuántos lavados aguanta?",
    answer: "Con cuidado normal (lavar al revés, no usar secadora), la impresión dura la vida útil de la prenda. Garantizamos mínimo 50 lavados sin deterioro visible.",
  },
  {
    question: "¿Pueden imprimir fotos?",
    answer: "Sí. DTF permite full color, degradados y fotos. El resultado depende de la calidad de la imagen original.",
  },
  {
    question: "¿Qué pasa si no tengo diseño?",
    answer: "Podemos ayudarte a crear uno simple o conectarte con diseñadores. Consulta por este servicio adicional.",
  },
  {
    question: "¿Puedo elegir la marca de la prenda?",
    answer: "Sí. Trabajamos con varias marcas y calidades. También puedes traer tus propias prendas.",
  },
  {
    question: "¿Hacen envíos a regiones?",
    answer: "Sí, a todo Chile vía Starken, Chilexpress o el courier de tu preferencia. Costo de envío adicional.",
  },
  {
    question: "¿Tienen tienda física?",
    answer: "Trabajamos principalmente con retiro coordinado y despacho. Visitas con cita previa en nuestra ubicación.",
  },
];

// Process Steps - DTF
export const DTF_PROCESS = [
  {
    step: 1,
    title: "Nos envías tu diseño",
    description: "Archivo en alta resolución (PNG, AI, PSD). Te asesoramos gratis si necesitas ajustes.",
  },
  {
    step: 2,
    title: "Preparamos el arte",
    description: "Optimizamos colores, tamaño y ubicación para el mejor resultado.",
  },
  {
    step: 3,
    title: "Imprimimos en film",
    description: "Tu diseño se imprime con tintas especiales en film de transferencia.",
  },
  {
    step: 4,
    title: "Transferimos a la prenda",
    description: "Aplicamos calor y presión controlados para adherir el diseño.",
  },
  {
    step: 5,
    title: "Control de calidad",
    description: "Revisamos cada prenda antes de embalar.",
  },
  {
    step: 6,
    title: "Entregamos",
    description: "Retiro en Santiago o despacho a todo Chile.",
  },
];

// Testimonials (PLACEHOLDERS)
export const TESTIMONIALS = [
  {
    quote: "Las poleras quedaron increíbles. Los colores vibrantes y la durabilidad superaron nuestras expectativas.",
    author: "Gerente de RRHH",
    company: "Empresa de Tecnología",
    type: "textil",
  },
  {
    quote: "Pedimos 200 uniformes personalizados y todo llegó perfecto. Ya estamos preparando el siguiente pedido.",
    author: "Dueño",
    company: "Restaurant",
    type: "textil",
  },
];

// Portfolio Items (PLACEHOLDERS)
export const PORTFOLIO_ITEMS = [
  {
    id: "2",
    title: "Uniformes Empresa Tech",
    description: "500 poleras y 200 polerones personalizados para equipo de startup",
    type: "textil",
    image: "/images/portfolio/textil-1.jpg",
    tags: ["DTF", "Corporativo", "Poleras", "Polerones"],
  },
  {
    id: "4",
    title: "Merchandising Evento",
    description: "Kit completo de merchandising para conferencia: poleras, bolsos y gorros",
    type: "textil",
    image: "/images/portfolio/textil-2.jpg",
    tags: ["DTF", "Evento", "Merchandising"],
  },
];
