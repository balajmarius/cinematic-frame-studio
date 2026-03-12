import { useState } from "react";
import { Send, MapPin, Mail, Phone, Instagram } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { siteData } from "@/data/siteContent";

export default function ContactSection() {
  const ref = useReveal();
  const formRef = useReveal();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left */}
          <div ref={ref} className="reveal">
            <span className="label-tag mb-4 block">Contact</span>
            <div className="divider-line mb-8" />
            <h2 className="display-lg text-foreground mb-6">
              Fiecare proiect începe cu o conversație.
            </h2>
            <p className="text-muted-foreground mb-12 leading-relaxed">
              Fie că ai un proiect concret sau ești la stadiul de idee, suntem bucuroși să venim cu o perspectivă creativă.
            </p>

            <div className="flex flex-col gap-6">
              <ContactDetail icon={<Mail size={16} />} label="Email" value={siteData.contact.email} href={`mailto:${siteData.contact.email}`} />
              <ContactDetail icon={<Phone size={16} />} label="Telefon" value={siteData.contact.phone} href={`tel:${siteData.contact.phone}`} />
              <ContactDetail icon={<MapPin size={16} />} label="Locație" value={siteData.contact.address} />

              <div className="flex items-center gap-3 mt-2">
                <a href="https://www.facebook.com/profile.php?id=61585090943297" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-gold hover:text-gold transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://www.instagram.com/pertufilm/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-gold hover:text-gold transition-colors duration-200">
                  <Instagram size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div ref={formRef} className="reveal">
            {submitted ? (
              <div className="card-surface p-10 flex flex-col items-center justify-center text-center h-full min-h-[400px] gap-4">
                <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold flex items-center justify-center mb-2">
                  <Send size={20} className="text-gold" />
                </div>
                <h3 className="text-xl font-display font-bold text-foreground">Mesaj trimis!</h3>
                <p className="text-muted-foreground text-sm">Te vom contacta în curând.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card-surface p-8 flex flex-col gap-5">
                <FormField
                  id="contact-name"
                  label="Nume"
                  type="text"
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                  placeholder="Numele tău"
                  required
                />
                <FormField
                  id="contact-email"
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  placeholder="email@exemplu.com"
                  required
                />
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-message" className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
                    Mesaj
                  </label>
                  <textarea
                    id="contact-message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Descrie proiectul tău..."
                    required
                    rows={5}
                    className="bg-muted border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-colors duration-200 resize-none"
                  />
                </div>
                <button type="submit" className="btn-primary w-full justify-center mt-2 gap-2">
                  <Send size={12} />
                  Trimite mesajul
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FormField({
  label, type, value, onChange, placeholder, required, id,
}: {
  label: string; type: string; value: string; onChange: (v: string) => void; placeholder: string; required?: boolean; id: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-xs font-medium text-muted-foreground tracking-wide uppercase">{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="bg-muted border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-colors duration-200"
      />
    </div>
  );
}

function ContactDetail({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const content = (
    <div className="flex items-center gap-4 group">
      <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground group-hover:border-gold group-hover:text-gold transition-colors duration-200">
        {icon}
      </div>
      <div>
        <div className="text-xs text-muted-foreground tracking-wide uppercase mb-0.5">{label}</div>
        <div className="text-sm text-foreground font-medium">{value}</div>
      </div>
    </div>
  );
  if (href) return <a href={href} className="block">{content}</a>;
  return <div>{content}</div>;
}
