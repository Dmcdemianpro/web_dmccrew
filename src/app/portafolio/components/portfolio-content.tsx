"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Shirt, ArrowRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PORTFOLIO_ITEMS } from "@/lib/constants";

type FilterType = "textil";

export function PortfolioContent() {
  const filter: FilterType = "textil";

  const filteredItems = PORTFOLIO_ITEMS.filter((item) => item.type === filter);

  return (
    <Section className="pt-32">
      <SectionHeader
        title="Portafolio"
        subtitle="Conoce algunos de nuestros trabajos de personalización textil"
      />

      {/* Portfolio Grid */}
      <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Image */}
              <div className="aspect-video bg-muted relative overflow-hidden">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Shirt className="h-12 w-12 text-accent-textil/30" />
                  </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium flex items-center gap-2">
                    Ver detalles
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <Badge variant="textil" className="mb-3">
                  Textil
                </Badge>

                <h3 className="text-lg font-semibold mb-2 group-hover:text-brand transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 text-center"
      >
        <p className="text-muted-foreground mb-4">
          ¿Quieres que tu proyecto sea el próximo?
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="textil" asChild>
            <Link href="/contacto?tema=textil">Cotizar trabajo DTF</Link>
          </Button>
        </div>
      </motion.div>
    </Section>
  );
}
