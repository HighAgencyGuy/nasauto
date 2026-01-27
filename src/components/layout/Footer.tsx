import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const quickLinks = [
  { name: "Browse Inventory", href: "/inventory" },
  { name: "Compare Cars", href: "/compare" },
  { name: "Financing Options", href: "/financing" },
  { name: "Sell/Swap Cars", href: "/sell-swap-cars" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const carCategories = [
  { name: "New Cars", href: "/inventory?condition=brand_new" },
  { name: "Foreign Used", href: "/inventory?condition=foreign_used" },
  { name: "Nigerian Used", href: "/inventory?condition=nigerian_used" },
  { name: "SUVs", href: "/inventory?body_type=suv" },
  { name: "Sedans", href: "/inventory?body_type=sedan" },
  { name: "Luxury Cars", href: "/inventory?min_price=20000000" },
];

const legalLinks = [
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms of Service", href: "/terms-of-service" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white">
      {/* CTA Section */}
      <div className="section-container py-16">
        <div className="bg-gradient-gold rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-2">
              Ready to Find Your Perfect Car?
            </h3>
            <p className="text-charcoal/80 text-lg">
              Browse our premium selection or speak with our team today.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="dark" size="xl" asChild>
              <Link to="/inventory">
                View Inventory
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="xl" className="border-charcoal/30 text-charcoal hover:bg-charcoal/10" asChild>
              <a href="https://wa.me/2348035644916" target="_blank" rel="noopener noreferrer">
                WhatsApp Us
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="border-t border-white/10">
        <div className="section-container py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center border-2 border-white/20 shadow-md">
                  <img src={logo} alt="Nas Autos Logo" className="w-11 h-11 object-contain" />
                </div>
                <div>
                  <span className="font-display font-bold text-2xl block">Nas Autos</span>
                  <span className="text-xs text-white/60 tracking-wider">KARU, ABUJA</span>
                </div>
              </div>
              <p className="text-white/70 mb-6">
                Your trusted partner for premium new and pre-owned vehicles in Abuja. 
                Transparent pricing, verified listings, and exceptional service.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-charcoal transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-charcoal transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-charcoal transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-white/70 hover:text-accent transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Car Categories */}
            <div>
              <h4 className="font-display text-lg font-semibold mb-6">Browse Cars</h4>
              <ul className="space-y-3">
                {carCategories.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-white/70 hover:text-accent transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-display text-lg font-semibold mb-6">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                  <span className="text-white/70">Karu, Abuja, Nigeria</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-accent shrink-0" />
                  <a href="tel:+2348035644916" className="text-white/70 hover:text-accent transition-colors">
                    +234 803 564 4916
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-accent shrink-0" />
                  <a href="mailto:talk2nasreal6324@gmail.com" className="text-white/70 hover:text-accent transition-colors">
                    talk2nasreal6324@gmail.com
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                  <div className="text-white/70">
                    <p>Mon - Sat: 9:00 AM - 6:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="section-container py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm text-center md:text-left">
            © {currentYear} Nas Autos. All rights reserved. Prices and availability subject to change.
          </p>
          <div className="flex gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-white/50 text-sm hover:text-accent transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
