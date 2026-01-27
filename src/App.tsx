import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

import Index from "./pages/Index";
import Inventory from "./pages/Inventory";
import CarDetails from "./pages/CarDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Financing from "./pages/Financing";
import SellSwapCars from "./pages/SellSwapCars";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Compare from "./pages/Compare";
import Testimonials from "./pages/Testimonials";
import Services from "./pages/Services";

import AdminDashboard from "./pages/admin/Dashboard";
import AdminInventory from "./pages/admin/Inventory";
import AdminLeads from "./pages/admin/Leads";
import AdminTestimonials from "./pages/admin/Testimonials";
import AdminBlog from "./pages/admin/Blog";
import AdminSettings from "./pages/admin/Settings";
import AdminUsers from "./pages/admin/Users";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/cars/:slug" element={<CarDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/financing" element={<Financing />} />
            <Route path="/sell-swap-cars" element={<SellSwapCars />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/services" element={<Services />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute requireStaff><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/inventory" element={<ProtectedRoute requireStaff><AdminInventory /></ProtectedRoute>} />
            <Route path="/admin/leads" element={<ProtectedRoute requireStaff><AdminLeads /></ProtectedRoute>} />
            <Route path="/admin/testimonials" element={<ProtectedRoute requireStaff><AdminTestimonials /></ProtectedRoute>} />
            <Route path="/admin/blog" element={<ProtectedRoute requireStaff><AdminBlog /></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute requireAdmin><AdminSettings /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute requireAdmin><AdminUsers /></ProtectedRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
