import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const WHATSAPP_NUMBER = "56942287787";

export const WHATSAPP_MESSAGES = {
  salud: "Hola, mi nombre es {nombre}. Me interesa conversar sobre integración de sistemas clínicos.",
  textilPersonalizar: "Hola, mi nombre es {nombre}. Me interesa *personalizar prendas* con impresión DTF. ¿Me pueden dar más información?",
  textilEstampado: "Hola, mi nombre es {nombre}. Necesito solo el *estampado DTF* (transfer/lámina). ¿Me pueden enviar detalles y precios?",
  textilMayor: "Hola, mi nombre es {nombre}. Quiero *cotizar por mayor* impresión DTF. ¿Me pueden enviar precios por volumen?",
  general: "Hola, mi nombre es {nombre}. Me gustaría conocer más sobre los servicios de DMC Projects.",
};

export function getWhatsAppLink(message: keyof typeof WHATSAPP_MESSAGES = "general", nombre?: string) {
  const text = WHATSAPP_MESSAGES[message].replace("{nombre}", nombre || "");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function openWhatsApp(option: keyof typeof WHATSAPP_MESSAGES = "general") {
  window.dispatchEvent(new CustomEvent("open-whatsapp", { detail: { option } }));
}

export const CONTACT_INFO = {
  phone: "+56 9 4228 7787",
  email: "contacto@dmcprojects.cl",
  address: "Santiago, Chile",
  schedule: "Lunes a Viernes, 9:00 - 18:00",
  instagram: "https://instagram.com/dmcprojects",
  linkedin: "https://linkedin.com/company/dmcprojects",
};
