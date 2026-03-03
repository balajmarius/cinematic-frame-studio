import { useRef, useState, useEffect, useCallback } from "react";
import { useReveal } from "@/hooks/useReveal";
import { siteData } from "@/data/siteContent";

export default function ClientsSection() {
  const ref = useReveal();
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const offsetRef = useRef(0);
  const speedRef = useRef(0.5);

  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);

  // Triple the items for seamless looping
  const items = [...siteData.clients, ...siteData.clients, ...siteData.clients];
  const itemWidth = 232; // w-52 (208) + gap-6 (24)
  const singleSetWidth = siteData.clients.length * itemWidth;

  const animate = useCallback(() => {
    if (!isPaused && !isDragging) {
      offsetRef.current -= speedRef.current;

      // Seamless reset: when we've scrolled past one full set, jump back
      if (Math.abs(offsetRef.current) >= singleSetWidth) {
        offsetRef.current += singleSetWidth;
      }
    }

    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${offsetRef.current}px)`;
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [isPaused, isDragging, singleSetWidth]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [animate]);

  // Mouse drag
  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragStartOffset.current = offsetRef.current;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const delta = e.clientX - dragStartX.current;
    offsetRef.current = dragStartOffset.current + delta;

    // Wrap offset to stay within bounds
    if (offsetRef.current > 0) offsetRef.current -= singleSetWidth;
    if (Math.abs(offsetRef.current) >= singleSetWidth) offsetRef.current += singleSetWidth;
  };

  const stopDrag = () => setIsDragging(false);

  // Touch drag
  const onTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    dragStartX.current = e.touches[0].clientX;
    dragStartOffset.current = offsetRef.current;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const delta = e.touches[0].clientX - dragStartX.current;
    offsetRef.current = dragStartOffset.current + delta;

    if (offsetRef.current > 0) offsetRef.current -= singleSetWidth;
    if (Math.abs(offsetRef.current) >= singleSetWidth) offsetRef.current += singleSetWidth;
  };

  const onTouchEnd = () => setIsDragging(false);

  return (
    <section className="py-20 bg-surface border-y border-border" aria-label="Clienți">
      <div className="container-wide mb-10">
        <div ref={ref} className="reveal">
          <span className="label-tag mb-2 block">Clienți de încredere</span>
        </div>
      </div>

      <div
        className="overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => { setIsPaused(false); stopDrag(); }}
      >
        <div
          ref={trackRef}
          role="region"
          aria-label="Carusel logo-uri clienți — glisați pentru a vedea mai multe"
          tabIndex={0}
          className={`flex gap-6 px-6 md:px-12 lg:px-20 select-none will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={stopDrag}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {items.map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              className="shrink-0 flex items-center justify-center w-52 h-28 rounded-lg border border-border hover:border-gold/40 transition-colors duration-300 bg-background/30"
              style={{ pointerEvents: isDragging ? "none" : "auto" }}
            >
              <img
                src={client.logo}
                alt={client.name}
                className="max-w-[110px] max-h-[48px] object-contain opacity-50 hover:opacity-90 transition-opacity duration-300"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
