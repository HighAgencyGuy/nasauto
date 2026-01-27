import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Inventory", href: "/inventory" },
  { name: "Compare", href: "/compare" },
  { name: "Services", href: "/services" },
  { name: "Financing", href: "/financing" },
  { name: "Sell/Swap Cars", href: "/sell-swap-cars" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-lg shadow-md py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="section-container">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="w-[72px] h-[72px] rounded-full bg-white flex items-center justify-center border-2 border-white/20 shadow-md">
              <img src={logo} alt="Nas Autos Logo" className="w-[60px] h-[60px] object-contain" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors link-underline",
                  isActive(link.href)
                    ? "text-accent"
                    : isScrolled
                    ? "text-foreground hover:text-accent"
                    : "text-white/90 hover:text-white"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+2348035644916" className="flex items-center gap-2">
              <Phone className={cn(
                "h-4 w-4 transition-colors",
                isScrolled ? "text-muted-foreground" : "text-white/70"
              )} />
              <span className={cn(
                "text-sm font-medium transition-colors",
                isScrolled ? "text-foreground" : "text-white"
              )}>
                +234 803 564 4916
              </span>
            </a>
            <Button variant="gold" size="sm" asChild>
              <Link to="/inventory">View Inventory</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "lg:hidden p-2 rounded-lg transition-colors",
              isScrolled ? "text-foreground" : "text-white"
            )}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-charcoal border-t border-white/10 shadow-xl animate-fade-in-down">
            <div className="section-container py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "py-3 px-4 rounded-lg text-base font-medium transition-colors",
                    isActive(link.href)
                      ? "bg-accent/20 text-accent"
                      : "text-white hover:bg-white/10"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                <a
                  href="tel:+2348035644916"
                  className="flex items-center gap-3 py-3 px-4 rounded-lg bg-white/10 text-white"
                >
                  <Phone className="h-5 w-5 text-accent" />
                  <span className="font-medium">+234 803 564 4916</span>
                </a>
                <Button variant="gold" size="lg" className="w-full" asChild>
                  <Link to="/inventory">View Inventory</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
