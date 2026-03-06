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
    question: "¿Trabajan desde una sola unidad?",
    answer: "Sí. Puedes cotizar desde 1 unidad sin problema. No exigimos pedidos mínimos.",
  },
  {
    question: "¿Debo tener el diseño listo?",
    answer: "No necesariamente. Si tienes una idea, referencia o imagen base, te ayudamos a ordenarla para que quede bien en la prenda.",
  },
  {
    question: "¿Qué tipo de diseños pueden hacer?",
    answer: "Logos, nombres, ilustraciones, fotos, frases y diseños full color. DTF permite imprimir con gran detalle, degradados y sin límite de colores.",
  },
  {
    question: "¿Hacen envíos a regiones?",
    answer: "Sí, enviamos a todo Chile vía Starken, Chilexpress o el courier que prefieras. El costo del envío es adicional.",
  },
  {
    question: "¿Atienden en Santiago?",
    answer: "Sí. Coordinamos atención y entrega en Santiago. Visitas con cita previa en nuestra ubicación.",
  },
  {
    question: "¿Cuánto demora un pedido?",
    answer: "Depende del tipo de prenda, la cantidad y la carga de trabajo del momento. Escríbenos y te indicamos el plazo estimado exacto para tu pedido.",
  },
  {
    question: "¿Puedo cotizar para marca o negocio?",
    answer: "Sí. Trabajamos tanto con pedidos individuales como con producción para marcas, emprendimientos, eventos y empresas. Cotización personalizada según volumen.",
  },
];

// Process Steps - DTF
export const DTF_PROCESS = [
  {
    step: 1,
    title: "Envíanos tu idea o diseño",
    description: "Un logo, imagen, referencia o simplemente lo que necesitas. Te ayudamos a prepararlo para la impresión.",
  },
  {
    step: 2,
    title: "Te cotizamos rápido",
    description: "Revisamos tu pedido y te enviamos una propuesta clara con precio, plazo y opciones.",
  },
  {
    step: 3,
    title: "Producimos tu prenda",
    description: "Fabricamos con impresión DTF de alta calidad: colores vibrantes, buen acabado y excelente adherencia.",
  },
  {
    step: 4,
    title: "Coordinamos la entrega",
    description: "Retiras en Santiago según coordinación o solicitamos despacho a tu dirección en todo Chile.",
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
