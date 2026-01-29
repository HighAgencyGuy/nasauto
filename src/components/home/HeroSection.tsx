import { Link } from "react-router-dom";
import { ArrowRight, Shield, CheckCircle, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center hero-gradient overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_hsl(38_92%_50%_/_0.3),_transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_hsl(38_92%_50%_/_0.2),_transparent_50%)]" />
      </div>

      {/* Content */}
      <div className="section-container relative z-10 py-32 md:py-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white drop-shadow-lg">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-medium mb-6 animate-fade-in backdrop-blur-sm">
              <Award className="h-4 w-4" />
              Trusted Auto Dealer in Abuja
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in-up [text-shadow:_0_2px_10px_rgb(0_0_0_/_40%)]">
              <span className="text-gradient-gold">Nas Autos</span> – Your Trusted
              <span className="block">Auto Partner</span>
              in Karu, Abuja
            </h1>
            
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-xl animate-fade-in-up delay-100 [text-shadow:_0_1px_4px_rgb(0_0_0_/_30%)]">
              Premium new and pre-owned vehicles with transparent pricing, 
              verified listings, and complete paperwork support. 
              Drive away with confidence.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in-up delay-200">
              <Button variant="hero" size="xl" asChild>
                <Link to="/inventory">
                  Browse Inventory
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <Link to="/sell-swap-cars">
                  Sell Your Car
                </Link>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-6 animate-fade-in-up delay-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">Verified</p>
                  <p className="text-xs text-white/60">Listings</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">Transparent</p>
                  <p className="text-xs text-white/60">Pricing</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Award className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">Premium</p>
                  <p className="text-xs text-white/60">Quality</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Featured Car Image */}
          <div className="relative hidden lg:block animate-fade-in-right delay-200">
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-accent/30 to-accent/10 rounded-3xl blur-2xl" />
              
              {/* Car Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80"
                  alt="Premium car at Nas Autos"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-5 shadow-xl animate-float">
                <p className="text-sm text-muted-foreground">Available Now</p>
                <p className="font-display text-2xl font-bold text-foreground">50+ Cars</p>
                <p className="text-xs text-accent font-medium">Ready for delivery</p>
              </div>

              {/* Price Tag */}
              <div className="absolute -top-4 -right-4 bg-accent rounded-xl px-5 py-3 shadow-gold animate-float" style={{ animationDelay: "1s" }}>
                <p className="text-xs text-charcoal/80">Starting from</p>
                <p className="font-display text-xl font-bold text-charcoal">₦5.5M</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
