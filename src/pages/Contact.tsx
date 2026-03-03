import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function Contact() {
  usePageMeta({
    title: "Contact",
    description: "Contactează-ne pentru o ofertă de producție video. Studio PertuFilm, Timișoara.",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.08 }
    );
    const els = document.querySelectorAll(".reveal");
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />
      <main id="main-content" className="pt-20">
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
