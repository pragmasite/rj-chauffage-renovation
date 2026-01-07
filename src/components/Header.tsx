import { useState } from "react";
import { Link } from "react-router-dom";
import { Globe, Phone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

const Header = () => {
  const { t, otherLangs, lang } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  window.addEventListener("scroll", () => {
    setIsScrolled(window.scrollY > 0);
  });

  const navLinks = [
    { id: "a-propos", label: t.nav.about },
    { id: "prestations", label: t.nav.services },
    { id: "galerie", label: t.nav.gallery },
    { id: "horaires", label: t.nav.hours },
    { id: "contact", label: t.nav.contact },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <a
          href={lang === "fr" ? "/" : `/${lang}`}
          className="flex flex-col"
        >
          <span
            className={`font-serif text-xl font-bold ${
              isScrolled ? "text-primary" : "text-white"
            }`}
          >
            RJ Chauffage
          </span>
          <span
            className={`text-xs tracking-widest ${
              isScrolled ? "text-muted-foreground" : "text-white/70"
            }`}
          >
            {t.nav.profession}
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`text-sm font-medium transition-colors ${
                isScrolled
                  ? "text-foreground hover:text-primary"
                  : "text-white hover:text-accent"
              }`}
            >
              {link.label}
            </a>
          ))}

          {/* Language Switcher Dropdown */}
          <div className="flex items-center gap-2 pl-4 border-l border-white/20">
            <Globe
              className={`h-4 w-4 ${
                isScrolled ? "text-primary" : "text-white"
              }`}
            />
            <select
              value={lang}
              onChange={(e) => {
                const newLang = e.target.value;
                window.location.href =
                  newLang === "fr" ? "/" : `/${newLang}`;
              }}
              className={`text-xs font-medium bg-transparent border-0 cursor-pointer ${
                isScrolled
                  ? "text-foreground"
                  : "text-white"
              }`}
            >
              <option value="fr">FR</option>
              <option value="de">DE</option>
              <option value="en">EN</option>
            </select>
          </div>

          {/* Call Button */}
          <Button
            asChild
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <a href="tel:+41798929391">
              <Phone className="h-4 w-4 mr-2" />
              {t.nav.call}
            </a>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-4">
          <div className="flex items-center gap-2">
            <Globe
              className={`h-4 w-4 ${
                isScrolled ? "text-primary" : "text-white"
              }`}
            />
            <select
              value={lang}
              onChange={(e) => {
                const newLang = e.target.value;
                window.location.href =
                  newLang === "fr" ? "/" : `/${newLang}`;
              }}
              className={`text-xs font-medium bg-transparent border-0 cursor-pointer ${
                isScrolled
                  ? "text-foreground"
                  : "text-white"
              }`}
            >
              <option value="fr">FR</option>
              <option value="de">DE</option>
              <option value="en">EN</option>
            </select>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden ${
              isScrolled ? "text-primary" : "text-white"
            }`}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="block text-sm font-medium text-foreground hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button
              asChild
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <a href="tel:+41798929391">
                <Phone className="h-4 w-4 mr-2" />
                {t.nav.call}
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
