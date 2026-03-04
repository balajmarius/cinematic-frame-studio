import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import ProjectsSection from "@/components/ProjectsSection";
import Footer from "@/components/Footer";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function Projects() {
  usePageMeta({
    title: "Portofoliu",
    description: "Descoperă proiectele noastre — filmări corporate, comerciale, after movie și content video pentru branduri din România.",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
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
      <PageHero title="Portofoliu" />
      <main id="main-content">
        <ProjectsSection />
      </main>
      <Footer />
    </div>
  );
}
