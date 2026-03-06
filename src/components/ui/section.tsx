"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  container?: boolean;
  animate?: boolean;
}

function Section({ className, container = true, animate = true, children, id }: SectionProps) {
  const content = container ? (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      {children}
    </div>
  ) : (
    children
  );

  if (animate) {
    return (
      <motion.section
        id={id}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn("py-10 md:py-16", className)}
      >
        {content}
      </motion.section>
    );
  }

  return (
    <section id={id} className={cn("py-10 md:py-16", className)}>
      {content}
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

function SectionHeader({ title, subtitle, align = "center", className }: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-8",
        align === "center" && "text-center",
        className
      )}
    >
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export { Section, SectionHeader };
