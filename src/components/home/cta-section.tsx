"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MessageCircle } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { openWhatsApp } from "@/lib/utils";

export function CTASection() {
  return (
    <Section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-brand/5" />
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-accent-salud/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent-textil/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          ¿Listo para comenzar?
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Cuéntanos sobre tu proyecto. Ya sea integrar sistemas clínicos o
          personalizar prendas, estamos listos para ayudarte.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="salud" size="lg" asChild>
            <Link href="/contacto?tema=salud">
              <Calendar className="h-5 w-5 mr-2" />
              Agendar reunión técnica
            </Link>
          </Button>

          <Button
            variant="textil"
            size="lg"
            onClick={() => openWhatsApp("textilPersonalizar")}
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Cotizar por WhatsApp
          </Button>
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 pt-8 border-t border-border"
        >
          <p className="text-sm text-muted-foreground mb-4">
            Respondemos en menos de 24 horas
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success" />
              Cotización sin compromiso
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success" />
              Reunión técnica gratuita
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success" />
              Soporte post-venta
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}
