import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

const Contact = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contactInfo = [
    {
      icon: Phone,
      label: t.contact.phone,
      value: "+41 79 892 93 91",
      href: "tel:+41798929391",
    },
    {
      icon: Mail,
      label: t.contact.email,
      value: "info@rjsanitaire-chauffage.ch",
      href: "mailto:info@rjsanitaire-chauffage.ch",
    },
    {
      icon: MapPin,
      label: t.contact.address,
      value: "Crêt-du-Jura 8, 2208 Les Hauts-Geneveys",
      href: "https://maps.google.com/?q=Crêt-du-Jura+8,+2208+Les+Hauts-Geneveys",
    },
  ];

  return (
    <section id="contact" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="text-sm uppercase tracking-widest text-primary">
            {t.contact.label}
          </span>
          <h2 className="font-serif text-3xl font-bold md:text-5xl mt-2">
            {t.contact.title1}
            <br />
            <span className="text-accent">{t.contact.title2}</span>
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            {t.contact.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {contactInfo.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={idx}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : "_self"}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : ""}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
                  className="group flex items-start gap-4 p-6 rounded-xl bg-card border border-border hover:border-accent hover:shadow-medium transition-all"
                >
                  <div className="p-3 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-foreground mb-1">
                      {item.label}
                    </h4>
                    <p className="text-muted-foreground group-hover:text-primary transition-colors">
                      {item.value}
                    </p>
                  </div>
                </motion.a>
              );
            })}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pt-4"
            >
              <Button
                asChild
                size="lg"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <a href="tel:+41798929391">
                  <Phone className="mr-2 h-5 w-5" />
                  {t.contact.cta}
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Google Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="rounded-2xl overflow-hidden border border-border shadow-medium"
          >
            <iframe
              width="100%"
              height="400"
              frameBorder="0"
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDr-CMNB-6m5qGe9o7E-G8Hbfb-KSxTKd8&q=Crêt-du-Jura+8,+2208+Les+Hauts-Geneveys,+Switzerland&center=47.050028,6.875664&zoom=15`}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
