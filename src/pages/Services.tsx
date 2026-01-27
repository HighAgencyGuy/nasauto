import { Link } from "react-router-dom";
import { 
  Car, 
  Shield, 
  FileText, 
  Truck, 
  Wrench, 
  CreditCard, 
  RefreshCw, 
  Search, 
  ArrowRight,
  Check
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import heroAbout from "@/assets/hero-about.jpg";

const services = [
  {
    icon: Car,
    title: "Premium Vehicle Sales",
    description: "Browse our curated selection of brand new and pre-owned vehicles from top manufacturers. Every car is thoroughly inspected and verified.",
    features: ["Brand new imports", "Foreign used vehicles", "Nigerian used options", "Certified quality checks"],
    link: "/inventory"
  },
  {
    icon: RefreshCw,
    title: "Sell or Swap Your Car",
    description: "Sell your car for cash or upgrade by swapping it for a new one. Get a fair market value assessment and apply it towards your next purchase.",
    features: ["Free vehicle appraisal", "Fair market pricing", "Quick turnaround", "Hassle-free process"],
    link: "/sell-swap-cars"
  },
  {
    icon: CreditCard,
    title: "Flexible Financing",
    description: "Access competitive financing options tailored to your budget. We work with trusted financial partners to offer you the best rates.",
    features: ["Competitive interest rates", "Flexible payment terms", "Quick approval process", "Various tenure options"],
    link: "/financing"
  },
  {
    icon: Search,
    title: "Vehicle Sourcing",
    description: "Can't find what you're looking for? Let us source your dream car for you. We have access to exclusive networks and auctions worldwide.",
    features: ["Custom vehicle search", "International sourcing", "Auction access", "Special requests welcome"],
    link: "/contact"
  },
  {
    icon: FileText,
    title: "Documentation Assistance",
    description: "We handle all the paperwork for you, from registration to licensing. Our team ensures a smooth and stress-free ownership transfer.",
    features: ["Vehicle registration", "License plate processing", "Insurance coordination", "Title transfer"],
    link: "/contact"
  },
  {
    icon: Truck,
    title: "Nationwide Delivery",
    description: "Can't make it to our showroom? No problem. We deliver vehicles to any location across Nigeria safely and securely.",
    features: ["Door-to-door delivery", "Insured transport", "Real-time tracking", "Nigeria-wide coverage"],
    link: "/contact"
  },
  {
    icon: Shield,
    title: "Vehicle Inspection",
    description: "All our vehicles undergo comprehensive multi-point inspection by certified technicians to ensure quality and reliability.",
    features: ["Engine diagnostics", "Body inspection", "Road test", "History verification"],
    link: "/contact"
  },
  {
    icon: Wrench,
    title: "After-Sales Support",
    description: "Our relationship doesn't end at the sale. We provide ongoing support and can connect you with trusted service partners.",
    features: ["Maintenance advice", "Service partner network", "Warranty support", "Technical consultation"],
    link: "/contact"
  }
];

export default function Services() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative text-white py-24 pt-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroAbout})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/70 to-charcoal/50" />
        <div className="section-container relative z-10">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up [text-shadow:_0_2px_10px_rgb(0_0_0_/_40%)]">
            Our Services
          </h1>
          <p className="text-xl text-white/80 max-w-2xl animate-fade-in-up delay-100 [text-shadow:_0_1px_4px_rgb(0_0_0_/_30%)]">
            From vehicle sales to after-sales support, we provide comprehensive automotive services tailored to your needs.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-background">
        <div className="section-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-card rounded-xl border border-border p-6 hover:shadow-lg hover:border-accent/30 transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <service.icon className="h-7 w-7 text-accent" />
                </div>
                
                <h3 className="font-display text-xl font-semibold mb-3">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-accent shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button variant="outline" size="sm" className="group-hover:border-accent group-hover:text-accent" asChild>
                  <Link to={service.link}>
                    Learn More
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-muted">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Why Choose Nas Autos?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing exceptional service and building lasting relationships with our customers.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { number: "10+", label: "Years Experience" },
              { number: "500+", label: "Cars Sold" },
              { number: "98%", label: "Customer Satisfaction" },
              { number: "24/7", label: "Customer Support" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-6 bg-background rounded-xl border border-border">
                <div className="font-display text-4xl font-bold text-accent mb-2">
                  {stat.number}
                </div>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-charcoal text-white">
        <div className="section-container text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Whether you're buying, selling, or trading in, we're here to help you every step of the way.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="gold" size="lg" asChild>
              <Link to="/inventory">
                Browse Inventory
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white/30 text-white bg-white/10 hover:bg-white/20" asChild>
              <Link to="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
