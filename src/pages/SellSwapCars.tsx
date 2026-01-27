import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  CheckCircle, 
  Car, 
  DollarSign, 
  RefreshCw, 
  Send, 
  Upload, 
  Shield, 
  Clock, 
  X,
  Image
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import heroSwap from "@/assets/hero-swap.jpg";

const sellBenefits = [
  {
    icon: DollarSign,
    title: "Best Market Price",
    description: "Competitive prices based on current market conditions.",
  },
  {
    icon: Clock,
    title: "Quick Sale",
    description: "Get an offer within 24 hours. No waiting for buyers.",
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "Verified transactions with proper documentation.",
  },
  {
    icon: CheckCircle,
    title: "No Hidden Fees",
    description: "Transparent process with no surprise deductions.",
  },
];

const swapBenefits = [
  "Get fair market value for your current vehicle",
  "Reduce your out-of-pocket cost on a new purchase",
  "Seamless one-stop experience",
  "No need to deal with private buyers",
  "Instant valuation and offer",
];

export default function SellSwapCars() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<"sell" | "swap">("sell");
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    make: "",
    model: "",
    year: "",
    mileage: "",
    condition: "",
    transmission: "",
    fuelType: "",
    color: "",
    askingPrice: "",
    interestedVehicle: "",
    message: "",
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files).slice(0, 4 - uploadedImages.length);
    
    if (uploadedImages.length + newFiles.length > 4) {
      toast({
        title: "Maximum 4 images",
        description: "You can only upload up to 4 images.",
        variant: "destructive",
      });
      return;
    }

    const updatedFiles = [...uploadedImages, ...newFiles];
    setUploadedImages(updatedFiles);

    // Create preview URLs
    const newPreviewUrls = newFiles.map(file => URL.createObjectURL(file));
    setImagePreviewUrls([...imagePreviewUrls, ...newPreviewUrls]);
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(imagePreviewUrls[index]);
    setUploadedImages(uploadedImages.filter((_, i) => i !== index));
    setImagePreviewUrls(imagePreviewUrls.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Upload images to storage if any
      const imageUrls: string[] = [];
      
      for (const file of uploadedImages) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `leads/${fileName}`;

        const { error: uploadError, data } = await supabase.storage
          .from('car-images')
          .upload(filePath, file);

        if (uploadError) {
          console.error('Upload error:', uploadError);
        } else if (data) {
          const { data: urlData } = supabase.storage
            .from('car-images')
            .getPublicUrl(filePath);
          imageUrls.push(urlData.publicUrl);
        }
      }

      const leadType = activeTab === "sell" ? "sell_car" : "trade_in";
      
      let message = `Vehicle: ${formData.year} ${formData.make} ${formData.model}
Mileage: ${formData.mileage} km
Condition: ${formData.condition}
Transmission: ${formData.transmission}
Fuel Type: ${formData.fuelType}
Color: ${formData.color}`;

      if (activeTab === "sell" && formData.askingPrice) {
        message += `\nAsking Price: ₦${formData.askingPrice}`;
      }

      if (activeTab === "swap" && formData.interestedVehicle) {
        message += `\nInterested In: ${formData.interestedVehicle}`;
      }

      if (formData.message) {
        message += `\n\n${formData.message}`;
      }

      if (imageUrls.length > 0) {
        message += `\n\nUploaded Images:\n${imageUrls.join('\n')}`;
      }

      const { error } = await supabase.from("leads").insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        lead_type: leadType as "sell_car" | "trade_in",
        message,
      });

      if (error) throw error;

      // Send email notification
      await supabase.functions.invoke("send-lead-notification", {
        body: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          leadType,
          message,
        },
      });

      toast({
        title: "Request Submitted!",
        description: activeTab === "sell" 
          ? "We'll review your vehicle and contact you with an offer."
          : "We'll evaluate your car and contact you shortly.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        make: "",
        model: "",
        year: "",
        mileage: "",
        condition: "",
        transmission: "",
        fuelType: "",
        color: "",
        askingPrice: "",
        interestedVehicle: "",
        message: "",
      });
      setUploadedImages([]);
      imagePreviewUrls.forEach(url => URL.revokeObjectURL(url));
      setImagePreviewUrls([]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative text-white py-24 pt-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroSwap})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/70 to-charcoal/50" />
        <div className="section-container relative z-10">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up [text-shadow:_0_2px_10px_rgb(0_0_0_/_40%)]">
            Sell or Swap Your Car
          </h1>
          <p className="text-xl text-white/80 max-w-2xl animate-fade-in-up delay-100 [text-shadow:_0_1px_4px_rgb(0_0_0_/_30%)]">
            Get a fair price for your vehicle or upgrade to a newer car. 
            Simple, transparent, hassle-free.
          </p>
        </div>
      </section>

      {/* Tabs Selection */}
      <section className="py-12 bg-muted">
        <div className="section-container">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "sell" | "swap")} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 h-14">
              <TabsTrigger value="sell" className="text-base font-semibold">
                <DollarSign className="h-5 w-5 mr-2" />
                Sell Your Car
              </TabsTrigger>
              <TabsTrigger value="swap" className="text-base font-semibold">
                <RefreshCw className="h-5 w-5 mr-2" />
                Swap Your Car
              </TabsTrigger>
            </TabsList>

            <TabsContent value="sell" className="mt-8">
              {/* Sell Benefits */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {sellBenefits.map((benefit) => (
                  <div
                    key={benefit.title}
                    className="bg-card rounded-xl border border-border p-6 text-center hover:shadow-lg transition-shadow"
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="font-display text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="swap" className="mt-8">
              {/* Swap Info */}
              <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
                <div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
                    How Car Swap Works
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Swapping your vehicle is the easiest way to upgrade. We handle 
                    everything – you simply drive away in your new car.
                  </p>
                  <div className="space-y-4">
                    {[
                      { step: "1", title: "Submit Your Car Details", desc: "Tell us about your current vehicle" },
                      { step: "2", title: "Get a Valuation", desc: "We'll assess your car and make an offer" },
                      { step: "3", title: "Choose Your New Car", desc: "Browse our inventory for your upgrade" },
                      { step: "4", title: "Complete the Swap", desc: "Your car's value is deducted from the price" },
                    ].map((item) => (
                      <div key={item.step} className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-accent text-charcoal flex items-center justify-center font-bold shrink-0 text-sm">
                          {item.step}
                        </div>
                        <div>
                          <h3 className="font-semibold">{item.title}</h3>
                          <p className="text-muted-foreground text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-display text-xl font-semibold mb-4">Benefits of Swapping</h3>
                  <ul className="space-y-3">
                    {swapBenefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="gold" className="mt-6 w-full" asChild>
                    <Link to="/inventory">
                      Browse Available Cars
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* How It Works - For Sell */}
      {activeTab === "sell" && (
        <section className="py-16">
          <div className="section-container">
            <div className="text-center mb-10">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                How It Works
              </h2>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: "1", title: "Submit Details", desc: "Fill out the form with your car information" },
                { step: "2", title: "We Evaluate", desc: "Our team reviews and values your vehicle" },
                { step: "3", title: "Receive Offer", desc: "Get a fair price offer within 24 hours" },
                { step: "4", title: "Get Paid", desc: "Accept and receive payment promptly" },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-10 h-10 rounded-full bg-accent text-charcoal flex items-center justify-center font-display font-bold text-lg mx-auto mb-3">
                    {item.step}
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Form */}
      <section className="py-16 bg-muted">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
                {activeTab === "sell" ? "Tell Us About Your Car" : "Get Your Swap Value"}
              </h2>
              <p className="text-muted-foreground">
                {activeTab === "sell" 
                  ? "Provide accurate details for the best valuation."
                  : "Tell us about your current vehicle and we'll provide a fair valuation."}
              </p>
            </div>

            <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Info */}
                <div>
                  <h3 className="font-semibold mb-4">Your Contact Information</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Vehicle Info */}
                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold mb-4">
                    {activeTab === "sell" ? "Vehicle Details" : "Your Current Vehicle"}
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="make">Make *</Label>
                      <Input
                        id="make"
                        required
                        placeholder="e.g., Toyota"
                        value={formData.make}
                        onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="model">Model *</Label>
                      <Input
                        id="model"
                        required
                        placeholder="e.g., Camry"
                        value={formData.model}
                        onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="year">Year *</Label>
                      <Input
                        id="year"
                        required
                        placeholder="e.g., 2020"
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="mileage">Mileage (km)</Label>
                      <Input
                        id="mileage"
                        placeholder="e.g., 45000"
                        value={formData.mileage}
                        onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="transmission">Transmission</Label>
                      <Select
                        value={formData.transmission}
                        onValueChange={(value) => setFormData({ ...formData, transmission: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="automatic">Automatic</SelectItem>
                          <SelectItem value="manual">Manual</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fuelType">Fuel Type</Label>
                      <Select
                        value={formData.fuelType}
                        onValueChange={(value) => setFormData({ ...formData, fuelType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="petrol">Petrol</SelectItem>
                          <SelectItem value="diesel">Diesel</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                          <SelectItem value="electric">Electric</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="condition">Condition</Label>
                      <Select
                        value={formData.condition}
                        onValueChange={(value) => setFormData({ ...formData, condition: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                          <SelectItem value="poor">Poor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="color">Exterior Color</Label>
                      <Input
                        id="color"
                        placeholder="e.g., White"
                        value={formData.color}
                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      />
                    </div>
                    {activeTab === "sell" ? (
                      <div className="space-y-2">
                        <Label htmlFor="askingPrice">Asking Price (₦)</Label>
                        <Input
                          id="askingPrice"
                          placeholder="e.g., 15000000"
                          value={formData.askingPrice}
                          onChange={(e) => setFormData({ ...formData, askingPrice: e.target.value })}
                        />
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Label htmlFor="interestedVehicle">Interested Vehicle</Label>
                        <Input
                          id="interestedVehicle"
                          placeholder="e.g., 2023 Toyota Land Cruiser"
                          value={formData.interestedVehicle}
                          onChange={(e) => setFormData({ ...formData, interestedVehicle: e.target.value })}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Photo Upload */}
                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold mb-4">Upload Photos (up to 4)</h3>
                  <div className="space-y-4">
                    {/* Image Previews */}
                    {imagePreviewUrls.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {imagePreviewUrls.map((url, index) => (
                          <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-border">
                            <img
                              src={url}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-2 right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center hover:bg-destructive/90 transition-colors"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Upload Button */}
                    {uploadedImages.length < 4 && (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-accent/50 hover:bg-accent/5 transition-colors"
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                            <Image className="h-6 w-6 text-accent" />
                          </div>
                          <p className="font-medium">Click to upload photos</p>
                          <p className="text-sm text-muted-foreground">
                            {4 - uploadedImages.length} photo(s) remaining • JPG, PNG up to 10MB
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="space-y-2">
                  <Label htmlFor="message">Additional Notes</Label>
                  <Textarea
                    id="message"
                    rows={3}
                    placeholder="Describe your vehicle's condition, any modifications, known issues, service history, etc."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <Button type="submit" variant="gold" size="lg" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? "Submitting..." : activeTab === "sell" ? "Submit for Valuation" : "Get Swap Value"}
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
