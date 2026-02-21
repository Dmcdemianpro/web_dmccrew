import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shirt } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Blog - Recursos y Artículos",
  description:
    "Guías de impresión DTF, tips de diseño y recursos para personalizar tus prendas.",
};

// Placeholder blog posts
const blogPosts = [
  {
    slug: "dtf-vs-sublimado-vs-serigrafia",
    title: "DTF vs Sublimado vs Serigrafía: ¿Qué técnica elegir?",
    excerpt:
      "Guía completa para entender las diferencias entre las técnicas de impresión textil más populares.",
    type: "textil",
    date: "2024-01-10",
    readTime: "6 min",
  },
  {
    slug: "preparar-diseno-dtf",
    title: "Cómo preparar tu diseño para impresión DTF perfecta",
    excerpt:
      "Tips y recomendaciones para que tu diseño quede espectacular en la prenda final.",
    type: "textil",
    date: "2024-01-01",
    readTime: "4 min",
  },
];

export default function BlogPage() {
  return (
    <Section className="pt-32">
      <SectionHeader
        title="Blog y Recursos"
        subtitle="Artículos, guías y recursos para sacar el máximo de la impresión DTF"
      />

      {/* Blog Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block"
          >
            <article className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              {/* Image Placeholder */}
              <div className="aspect-video bg-muted relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Shirt className="h-12 w-12 text-accent-textil/30" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Badge variant="textil">Textil</Badge>
                  <span className="text-xs text-muted-foreground">
                    {post.readTime} de lectura
                  </span>
                </div>

                <h2 className="text-xl font-semibold mb-2 group-hover:text-brand transition-colors">
                  {post.title}
                </h2>
                <p className="text-muted-foreground text-sm mb-4">
                  {post.excerpt}
                </p>

                <div className="flex items-center text-sm font-medium text-brand">
                  Leer artículo
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* Coming Soon Notice */}
      <div className="mt-12 text-center p-8 bg-muted rounded-xl">
        <p className="text-muted-foreground">
          Más artículos próximamente. ¿Tienes algún tema que te gustaría que cubramos?
        </p>
        <Link
          href="/contacto"
          className="inline-flex items-center text-brand font-medium mt-2 hover:underline"
        >
          Sugiérenos un tema
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </Section>
  );
}
