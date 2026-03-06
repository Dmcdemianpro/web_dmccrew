"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useContent } from "@/context/ContentContext";

export function TextilFAQ() {
  const { content } = useContent();
  const faqs = content.textilFaq || [];

  return (
    <section id="faq" className="theme-textil py-10 md:py-14 relative overflow-hidden">
      {/* Dark Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#111]" />
      <div className="absolute inset-0 urban-pattern opacity-10" />

      {/* Animated Orbs */}
      <motion.div
        className="absolute top-1/3 right-0 w-[300px] h-[300px] rounded-full bg-[#ff0040]/10 blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2
            className="text-3xl font-bold tracking-tight sm:text-4xl text-white mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Preguntas <span className="title-gradient-animated">Frecuentes</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Respuestas a las dudas más comunes sobre impresión DTF
          </p>
          <div className="divider-racing mt-6" />
        </motion.div>

        <Accordion type="single" defaultValue="0">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <AccordionItem value={index.toString()} className="accordion-racing mb-3">
                <AccordionTrigger
                  value={index.toString()}
                  className="text-white hover:text-[#ff0040] px-6 py-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent value={index.toString()} className="text-gray-400 px-6 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
