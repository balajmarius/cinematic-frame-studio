import { useRef, useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { siteData } from "@/data/siteContent";

export default function ClientsSection() {
  const ref = useReveal();
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (trackRef.current?.offsetLeft ?? 0));
    setScrollLeft(trackRef.current?.scrollLeft ?? 0);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (trackRef.current?.offsetLeft ?? 0);
    const walk = (x - startX) * 1.2;
    if (trackRef.current) trackRef.current.scrollLeft = scrollLeft - walk;
  };

  const stopDrag = () => setIsDragging(false);

  // Touch support
  const onTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].pageX - (trackRef.current?.offsetLeft ?? 0));
    setScrollLeft(trackRef.current?.scrollLeft ?? 0);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const x = e.touches[0].pageX - (trackRef.current?.offsetLeft ?? 0);
    const walk = (x - startX) * 1.2;
    if (trackRef.current) trackRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="py-20 bg-surface border-y border-border">
      <div className="container-wide mb-10">
        <div ref={ref} className="reveal">
          <span className="label-tag mb-2 block">Clienți de încredere</span>
        </div>
      </div>

      {/* Draggable carousel */}
      <div
        ref={trackRef}
        className={`flex gap-4 overflow-x-auto px-6 md:px-12 lg:px-20 pb-2 select-none scrollbar-hide ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {siteData.clients.map((client) => (
          <div
            key={client.name}
            className="shrink-0 flex items-center justify-center w-40 h-20 rounded-lg border border-border hover:border-gold/40 transition-colors duration-300 bg-background/30"
            style={{ pointerEvents: isDragging ? "none" : "auto" }}
          >
            <img
              src={client.logo}
              alt={client.name}
              className="max-w-[80px] max-h-[36px] object-contain opacity-50 hover:opacity-90 transition-opacity duration-300"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
