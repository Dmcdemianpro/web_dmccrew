import { Suspense } from "react";
import { Metadata } from "next";
import { ContactContent } from "./components/contact-content";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Agenda una reunión, solicita cotización o escríbenos. Impresión DTF y personalización textil en Chile.",
};

function ContactLoading() {
  return (
    <div className="pt-32 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="animate-pulse space-y-8">
          <div className="text-center space-y-4">
            <div className="h-6 w-24 bg-muted rounded-full mx-auto" />
            <div className="h-12 w-96 bg-muted rounded mx-auto" />
            <div className="h-6 w-64 bg-muted rounded mx-auto" />
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 h-96 bg-muted rounded-xl" />
            <div className="space-y-6">
              <div className="h-48 bg-muted rounded-xl" />
              <div className="h-48 bg-muted rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContactoPage() {
  return (
    <Suspense fallback={<ContactLoading />}>
      <ContactContent />
    </Suspense>
  );
}
