"use client";

import { motion } from "framer-motion";
import { Shirt, Zap } from "lucide-react";
import { Section } from "@/components/ui/section";

export function NosotrosStory() {
  return (
    <Section>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-6">Nuestra Historia</h2>

          <div className="prose prose-lg text-muted-foreground">
            <p>
              DMC Projects nació con una obsesión simple: prendas personalizadas
              que se vean increíbles y duren. Desde el primer pedido, priorizamos
              calidad, color y detalle por sobre lo fácil.
            </p>
            <p>
              Nos especializamos en impresión DTF para entregar resultados
              consistentes, con tonos vivos y una terminación limpia. Cada
              proyecto se trata como si fuera para nuestra propia marca.
            </p>
            <p>
              Hoy trabajamos con emprendedores, equipos y empresas que quieren
              destacar su identidad. Nuestro foco es simple: que tu prenda se vea
              premium y llegue a tiempo.
            </p>
          </div>

          {/* Visual Representation */}
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-accent-textil/5 rounded-xl border border-accent-textil/20 p-6 flex items-center gap-4"
            >
              <div className="w-14 h-14 rounded-full bg-accent-textil/10 flex items-center justify-center">
                <Shirt className="h-7 w-7 text-accent-textil" />
              </div>
              <div>
                <h3 className="font-semibold text-accent-textil">DTF Premium</h3>
                <p className="text-sm text-muted-foreground">
                  Colores vivos, buena adherencia y excelente durabilidad
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-accent-textil/5 rounded-xl border border-accent-textil/20 p-6 flex items-center gap-4"
            >
              <div className="w-14 h-14 rounded-full bg-accent-textil/10 flex items-center justify-center">
                <Zap className="h-7 w-7 text-accent-textil" />
              </div>
              <div>
                <h3 className="font-semibold text-accent-textil">Producción Ágil</h3>
                <p className="text-sm text-muted-foreground">
                  Tiempos rápidos y cumplimiento en cada entrega
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
