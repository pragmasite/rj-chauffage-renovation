import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const Gallery = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    { src: "/images/img-1.jpg", alt: "Ancienne installation" },
    { src: "/images/img-2.jpg", alt: "Installation intérieure" },
    { src: "/images/img-3.jpg", alt: "Pompe à chaleur" },
    { src: "/images/img-4.jpg", alt: "Installation moderne" },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section id="galerie" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="text-sm uppercase tracking-widest text-primary">
            {t.gallery.label}
          </span>
          <h2 className="font-serif text-3xl font-bold md:text-5xl mt-2">
            {t.gallery.title}
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            {t.gallery.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Slider */}
          <div className="relative mb-8">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-card border border-border">
              <img
                src={images[currentSlide].src}
                alt={images[currentSlide].alt}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Navigation buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-accent/80 hover:bg-accent text-accent-foreground transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-accent/80 hover:bg-accent text-accent-foreground transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Slide counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/50 text-white text-sm">
              {currentSlide + 1} / {images.length}
            </div>
          </div>

          {/* Description */}
          <p className="text-center text-lg text-foreground font-serif mb-8">
            {images[currentSlide].alt}
          </p>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-4">
            {images.map((image, idx) => (
              <motion.button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`relative aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all ${
                  currentSlide === idx
                    ? "border-accent"
                    : "border-border hover:border-primary"
                }`}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover"
                />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
