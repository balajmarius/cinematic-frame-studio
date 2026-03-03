import { usePageMeta } from "@/hooks/usePageMeta";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  usePageMeta({ title: "Pagina nu a fost găsită" });

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />
      <main id="main-content" className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center px-6">
          <h1 className="display-xl text-foreground mb-4">404</h1>
          <p className="text-lg text-muted-foreground mb-8">Pagina nu a fost găsită.</p>
          <a href="/" className="btn-primary">
            Înapoi acasă
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
