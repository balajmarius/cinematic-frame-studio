import { useReveal } from "@/hooks/useReveal";
import { siteData } from "@/data/siteContent";

export default function AboutSection() {
  const ref = useReveal();
  const imgRef = useReveal();

  return (
    <section id="about" className="section-padding bg-background">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div ref={imgRef} className="reveal relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
              <img
                src={siteData.about.image}
                alt="PertuFilm studio"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
            {/* Floating stat card */}
            <div
              className="absolute -bottom-6 -right-6 card-surface p-6 w-44 text-center"
              style={{ background: "hsl(var(--surface-elevated))" }}
            >
              <div className="text-4xl font-display font-bold text-gold">16+</div>
              <div className="text-xs text-muted-foreground mt-1 tracking-wide uppercase">Ani experiență</div>
            </div>
          </div>

          {/* Text */}
          <div ref={ref} className="reveal">
            <span className="label-tag mb-4 block">Despre noi</span>
            <div className="divider-line mb-8" />
            <h2 className="display-lg text-foreground mb-8 max-w-lg">
              {siteData.about.headline}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-10 text-base">
              {siteData.about.body}
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-6">
              {siteData.stats.map((stat) => (
                <div key={stat.label} className="border-t border-border pt-5">
                  <div className="text-3xl font-display font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground tracking-wide uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
