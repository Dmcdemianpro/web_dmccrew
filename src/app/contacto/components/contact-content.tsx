"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Heart,
  Shirt,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CONTACT_INFO, getWhatsAppLink } from "@/lib/utils";
import { cn } from "@/lib/utils";

type TopicType = "salud" | "textil" | "general";

const topics: { value: TopicType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { value: "salud", label: "Integración de Sistemas", icon: Heart },
  { value: "textil", label: "Impresión DTF", icon: Shirt },
  { value: "general", label: "Consulta General", icon: Mail },
];

interface FormStatus {
  type: "idle" | "loading" | "success" | "error";
  message: string;
}

export function ContactContent() {
  const searchParams = useSearchParams();
  const initialTopic = (searchParams.get("tema") as TopicType) || "general";
  const [topic, setTopic] = useState<TopicType>(initialTopic);
  const [formStatus, setFormStatus] = useState<FormStatus>({ type: "idle", message: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus({ type: "loading", message: "Enviando mensaje..." });

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      company: formData.get("company") as string,
      topic,
      message: formData.get("message") as string,
      garment: formData.get("garment") as string,
      quantity: formData.get("quantity") as string,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setFormStatus({
          type: "success",
          message: result.message || "Mensaje enviado correctamente. Te contactaremos pronto.",
        });
        form.reset();
      } else {
        setFormStatus({
          type: "error",
          message: result.error || "Error al enviar el mensaje. Intenta de nuevo.",
        });
      }
    } catch {
      setFormStatus({
        type: "error",
        message: "Error de conexión. Por favor intenta de nuevo o contáctanos por WhatsApp.",
      });
    }
  };

  const isSubmitting = formStatus.type === "loading";

  return (
    <Section className="pt-32">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4">Contacto</Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            Hablemos de tu proyecto
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Elige el tema que mejor describe tu consulta y te responderemos en
            menos de 24 horas.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-card rounded-xl border border-border p-6 md:p-8">
              {/* Topic Selector */}
              <div className="mb-8">
                <label className="block text-sm font-medium mb-3">
                  ¿Sobre qué tema nos contactas?
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {topics.map((t) => (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => setTopic(t.value)}
                      className={cn(
                        "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
                        topic === t.value
                          ? t.value === "salud"
                            ? "border-accent-salud bg-accent-salud/5"
                            : t.value === "textil"
                            ? "border-accent-textil bg-accent-textil/5"
                            : "border-brand bg-brand/5"
                          : "border-border hover:border-muted-foreground"
                      )}
                    >
                      <t.icon
                        className={cn(
                          "h-6 w-6",
                          topic === t.value
                            ? t.value === "salud"
                              ? "text-accent-salud"
                              : t.value === "textil"
                              ? "text-accent-textil"
                              : "text-brand"
                            : "text-muted-foreground"
                        )}
                      />
                      <span className="text-xs font-medium">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Nombre *
                    </label>
                    <Input
                      name="name"
                      placeholder="Tu nombre"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Email *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Teléfono
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      placeholder="+56 9 1234 5678"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      {topic === "salud" ? "Institución" : topic === "textil" ? "Empresa" : "Empresa (opcional)"}
                    </label>
                    <Input
                      name="company"
                      placeholder={topic === "salud" ? "Clínica, Hospital..." : "Nombre empresa"}
                    />
                  </div>
                </div>

                {topic === "textil" && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">
                        Tipo de prenda
                      </label>
                      <Input
                        name="garment"
                        placeholder="Poleras, polerones, etc."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">
                        Cantidad aproximada
                      </label>
                      <Input
                        name="quantity"
                        placeholder="Ej: 50 unidades"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Mensaje *
                  </label>
                  <Textarea
                    name="message"
                    placeholder={
                      topic === "salud"
                        ? "Describe tu proyecto de integración, sistemas involucrados, necesidades..."
                        : topic === "textil"
                        ? "Describe tu proyecto: tipo de diseño, tallas, colores de prenda..."
                        : "¿En qué podemos ayudarte?"
                    }
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                  variant={topic === "salud" ? "salud" : topic === "textil" ? "textil" : "default"}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Enviar mensaje
                    </>
                  )}
                </Button>

                {/* Status Messages */}
                <AnimatePresence mode="wait">
                  {formStatus.type === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-start gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/20"
                    >
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-green-500 font-medium">Mensaje enviado</p>
                        <p className="text-sm text-green-400/80 mt-1">{formStatus.message}</p>
                      </div>
                    </motion.div>
                  )}

                  {formStatus.type === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-start gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/20"
                    >
                      <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-red-500 font-medium">Error al enviar</p>
                        <p className="text-sm text-red-400/80 mt-1">{formStatus.message}</p>
                        <a
                          href={getWhatsAppLink(topic === "salud" ? "salud" : "textilCotizar")}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 mt-3 text-sm text-[#25D366] hover:underline"
                        >
                          <MessageCircle className="h-4 w-4" />
                          Contactar por WhatsApp
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* WhatsApp */}
            <div className="bg-[#25D366]/10 rounded-xl border border-[#25D366]/20 p-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-[#25D366]" />
                WhatsApp Directo
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                ¿Prefieres una respuesta más rápida? Escríbenos por WhatsApp.
              </p>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  asChild
                >
                  <a
                    href={getWhatsAppLink("salud")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Heart className="h-4 w-4 mr-2 text-accent-salud" />
                    Integración de sistemas
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  asChild
                >
                  <a
                    href={getWhatsAppLink("textilCotizar")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Shirt className="h-4 w-4 mr-2 text-accent-textil" />
                    Cotizar DTF
                  </a>
                </Button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-semibold mb-4">Información de Contacto</h3>
              <div className="space-y-4">
                <a
                  href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  {CONTACT_INFO.phone}
                </a>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  {CONTACT_INFO.email}
                </a>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {CONTACT_INFO.address}
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {CONTACT_INFO.schedule}
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-muted rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-brand mb-1">&lt; 24h</div>
              <p className="text-sm text-muted-foreground">
                Tiempo de respuesta promedio
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
