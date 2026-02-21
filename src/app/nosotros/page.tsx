import { Metadata } from "next";
import { NosotrosHero } from "./components/hero";
import { NosotrosStory } from "./components/story";
import { NosotrosValues } from "./components/values";
import { NosotrosProcess } from "./components/process";
import { NosotrosCTA } from "./components/cta";

export const metadata: Metadata = {
  title: "Sobre DMC Projects",
  description:
    "Conoce al equipo detrás de DMC Projects. Especialistas en personalización textil e impresión DTF.",
};

export default function NosotrosPage() {
  return (
    <>
      <NosotrosHero />
      <NosotrosStory />
      <NosotrosValues />
      <NosotrosProcess />
      <NosotrosCTA />
    </>
  );
}
