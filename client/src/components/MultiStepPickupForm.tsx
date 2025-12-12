import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Check, ChevronRight, Recycle, Wrench, FileText, Box, Smartphone, Lightbulb } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { cn } from "@/lib/utils";

interface ScrapType {
  id: string;
  name: string;
  rate: number;
  icon: React.ReactNode;
}

const scrapTypes: ScrapType[] = [
  { id: "plastic", name: "Plastic", rate: 20, icon: <Recycle className="h-6 w-6 stroke-primary" /> },
  { id: "metal", name: "Metal", rate: 40, icon: <Wrench className="h-6 w-6 stroke-primary" /> },
  { id: "paper", name: "Paper", rate: 12, icon: <FileText className="h-6 w-6 stroke-primary" /> },
  { id: "cardboard", name: "Cardboard", rate: 15, icon: <Box className="h-6 w-6 stroke-primary" /> },
  { id: "electronics", name: "Electronics", rate: 35, icon: <Smartphone className="h-6 w-6 stroke-primary" /> },
  { id: "glass", name: "Glass", rate: 8, icon: <Lightbulb className="h-6 w-6 stroke-primary" /> },
];

export default function MultiStepPickupForm() {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedScrapTypes, setSelectedScrapTypes] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    estimatedQuantity: "",
    address: "",
    additionalNotes: "",
  });
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
    address: false,
  });

  // Validation functions
  const validateName = (name: string) => {
    return name.trim().length >= 2;
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validateAddress = (address: string) => {
    return address.trim().length >= 10;
  };

  // Handle field blur validation
  const handleFieldBlur = (field: string, value: string) => {
    let isValid = true;
    
    switch (field) {
      case 'name':
        isValid = validateName(value);
        break;
      case 'email':
        isValid = validateEmail(value);
        break;
      case 'phone':
        isValid = validatePhone(value);
        break;
      case 'address':
        isValid = validateAddress(value);
        break;
    }
    
    setErrors(prev => ({ ...prev, [field]: !isValid }));
  };

  const submitMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/pickup-requests", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Request Submitted!",
        description: "We'll contact you within 24 hours to schedule your pickup.",
      });
      // Reset form
      setCurrentStep(1);
      setSelectedScrapTypes([]);
      setFormData({
        name: "",
        email: "",
        phone: "",
        estimatedQuantity: "",
        address: "",
        additionalNotes: "",
      });
      setErrors({
        name: false,
        email: false,
        phone: false,
        address: false,
      });
    },
    onError: () => {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    },
  });

  const toggleScrapType = (typeId: string) => {
    setSelectedScrapTypes((prev) =>
      prev.includes(typeId)
        ? prev.filter((id) => id !== typeId)
        : [...prev, typeId]
    );
  };

  const getSelectedScrapNames = () => {
    return scrapTypes
      .filter((type) => selectedScrapTypes.includes(type.id))
      .map((type) => type.name)
      .join(", ");
  };

  const canProceedToStep2 = () => selectedScrapTypes.length > 0;
  const canProceedToStep3 = () => {
    return validateName(formData.name) && 
           validateEmail(formData.email) && 
           validatePhone(formData.phone);
  };
  const canProceedToStep4 = () => validateAddress(formData.address);

  const handleSubmit = () => {
    const scrapTypeNames = scrapTypes
      .filter((type) => selectedScrapTypes.includes(type.id))
      .map((type) => type.name);

    submitMutation.mutate({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || null,
      address: formData.address,
      scrapTypes: scrapTypeNames,
      estimatedQuantity: formData.estimatedQuantity || null,
      additionalNotes: formData.additionalNotes || null,
    });
  };

  const steps = [
    { number: 1, title: "Select Scrap Types" },
    { number: 2, title: "Your Details" },
    { number: 3, title: "Pickup Address" },
    { number: 4, title: "Review & Submit" },
  ];

  return (
    <section id="request-pickup" className="py-20 bg-white dark:bg-slate-950 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Floating particles */}
        <div className="absolute top-8 right-8 w-2 h-2 bg-green-400/30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-12 left-6 w-1 h-1 bg-blue-400/40 rounded-full animate-ping"></div>
        <div className="absolute top-20 left-12 w-1.5 h-1.5 bg-green-300/20 rounded-full animate-bounce"></div>
        
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold  mb-4">
            Request a Pickup 🚛
          </h2>
          <p className="text-xl text-muted-foreground">
            Complete the form in simple steps and we'll collect your scrap within 24 hours
          </p>
          <div className="w-20 h-1 bg-slate-200 rounded-full mx-auto mt-4"></div>
        </div>

        {/* Step Indicator */}
        <div className="mb-16">
          <div className="flex items-center justify-between max-w-4xl mx-auto relative">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                {/* Step Circle */}
                <div className="flex flex-col items-center relative z-20">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 shadow-lg",
                      currentStep > step.number
                        ? "bg-primary/10  text-primary scale-110"
                        : currentStep === step.number
                        ? "bg-primary/20 animate-pulse duration-700 text-primary  p-2   ring-2 ring-primary dark:ring-green-800 te"
                        : "bg-white dark:bg-slate-800 text-slate-400 border-2 border-slate-300 dark:border-slate-600"
                    )}
                    data-testid={`step-indicator-${step.number}`}
                  >
                    {currentStep > step.number ? <Check className="w-6 h-6" /> : step.number}
                  </div>
                  <div className="mt-4 text-center max-w-32">
                    <div
                      className={cn(
                        "font-semibold text-sm mb-1 transition-colors duration-300",
                        currentStep >= step.number ? "text-green-600 dark:text-green-400" : "text-muted-foreground"
                      )}
                    >
                      {step.title}
                    </div>
                    {/* <div className="text-xs text-muted-foreground leading-tight hidden sm:block">{step.description}</div> */}
                  </div>
                </div>
                
                {/* Connecting Line (only if not the last step) */}
                {index < steps.length - 1 && (
                  <div className="flex-1 mx-4 relative">
                    <div className="h-1 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                    <div 
                      className={cn(
                        "absolute top-0 left-0 h-1 rounded-full transition-all duration-500",
                        currentStep > step.number 
                          ? "bg-gradient-to-r from-green-600 to-blue-600 w-full" 
                          : "bg-transparent w-0"
                      )}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Form Card with Glassmorphism */}
        <div className="relative group">
          {/* Animated background with glassmorphism */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100/80 via-blue-50/60 to-green-50/40 dark:from-slate-800/80 dark:via-blue-950/60 dark:to-green-950/40 rounded-2xl backdrop-blur-sm"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
          
          <Card className="relative z-10 p-10 shadow-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-0 rounded-2xl overflow-hidden">
          {/* Step 1: Select Scrap Types */}
          {currentStep === 1 && (
            <div className="space-y-8">
              {/* Step Header */}
              <div className="text-center">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-3">
                  Select Scrap Types ♻️
                </h3>
                <p className="text-muted-foreground">Choose the materials you want to sell</p>
                <div className="w-16 h-1  bg-slate-200  rounded-full mx-auto mt-3"></div>
              </div>

              {/* Scrap Types Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {scrapTypes.map((type) => (
                <div
                  key={type.id}
                  className={cn(
                    "group/card relative p-6 cursor-pointer transition-all duration-300 rounded-xl border-2 hover:shadow-lg hover:shadow-green-100/50 dark:hover:shadow-green-900/20",
                    selectedScrapTypes.includes(type.id)
                      ? "border-green-200/50 bg-gradient-to-r from-green-50 to-blue-50/30 dark:from-green-950/30 dark:to-blue-950/30 shadow-md"
                      : "border-slate-200 dark:border-green-800 bg-white/50 dark:bg-slate-800/50 hover:border-green-400 dark:hover:border-green-600"
                  )}
                  onClick={() => toggleScrapType(type.id)}
                  data-testid={`scrap-type-${type.id}`}
                >
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-100 to-blue-100/50 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r  from-transparent via-white/70 to-transparent -translate-x-full group-hover/card:translate-x-full transition-transform duration-700"></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className={cn(
                        "p-3 rounded-lg transition-colors duration-300",
                        selectedScrapTypes.includes(type.id) 
                          ? "bg-green-500/20 text-green-600 dark:text-green-400" 
                          : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 group-hover/card:bg-green-100 dark:group-hover/card:bg-green-900/30"
                      )}>
                        {type.icon}
                      </div>
                      {selectedScrapTypes.includes(type.id) && (
                        <div className="bg-green-500 rounded-full p-1.5 animate-scale-in">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                    <h4 className="font-semibold text-lg mb-2 text-slate-800 dark:text-slate-200">{type.name}</h4>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      ₹{type.rate}<span className="text-sm text-muted-foreground font-normal">/kg</span>
                    </p>
                  </div>
                </div>
                ))}
              </div>
              <div className="flex justify-end ">
                <Button
                  size="lg"
                  onClick={() => setCurrentStep(2)}
                  disabled={!canProceedToStep2()}
                  data-testid="button-next-step-1"
                className="flex items-center gap-3 h-12 px-8 bg-primary text-white rounded-xl shadow-lg hover:shadow-2xl hover:shadow-blue-200/50 dark:hover:shadow-blue-900/50 transform hover:scale-[1.02] transition-all duration-300 group/btn relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center gap-2 ">
                    Continue
                    <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </span>
                  {/* Button shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Your Details */}
          {currentStep === 2 && (
            <div className="space-y-8">
              {/* Step Header */}
              <div className="text-center">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-3">
                  Your Details 👤
                </h3>
                <p className="text-muted-foreground mb-4">
                  Tell us about yourself and your pickup requirements
                </p>
                <div className="flex flex-wrap justify-center gap-2 mb-3">
                  <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                    ♻️ {getSelectedScrapNames()}
                  </Badge>
                </div>
                <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mx-auto mt-3"></div>
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                {/* Name Field */}
                <div className="group/field">
                  <div className="relative">
                    <Input
                      id="name"
                      placeholder="Your Full Name *"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      data-testid="input-name"
                      className={cn(
                        "w-full h-14 px-4 py-4 border-2 rounded-xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm transition-all duration-300",
                        "focus:border-green-500 focus:ring-4 focus:ring-green-100 dark:focus:ring-green-900/30 focus:shadow-lg focus:shadow-green-100/50 focus:bg-white dark:focus:bg-slate-800",
                        "hover:border-slate-400 hover:shadow-md hover:bg-white/90 dark:hover:bg-slate-800/90",
                        "placeholder:text-slate-400 text-slate-700 dark:text-slate-200 text-base",
                        errors.name 
                          ? "border-red-400 ring-red-100 shadow-red-100/50" 
                          : "border-slate-300 dark:border-slate-600"
                      )}
                      onBlur={(e) => handleFieldBlur('name', e.target.value)}
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/10 to-blue-500/10 opacity-0 group-hover/field:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  {/* Error message */}
                  {errors.name && (
                    <div className="mt-2 bg-red-500 text-white text-sm px-4 py-2 rounded-lg shadow-lg animate-slide-down">
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Please enter your full name (minimum 2 characters)
                      </span>
                    </div>
                  )}
                </div>

                {/* Email Field */}
                <div className="group/field">
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email Address *"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      data-testid="input-email"
                      className={cn(
                        "w-full h-14 px-4 py-4 border-2 rounded-xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm transition-all duration-300",
                        "focus:border-green-500 focus:ring-4 focus:ring-green-100 dark:focus:ring-green-900/30 focus:shadow-lg focus:shadow-green-100/50 focus:bg-white dark:focus:bg-slate-800",
                        "hover:border-slate-400 hover:shadow-md hover:bg-white/90 dark:hover:bg-slate-800/90",
                        "placeholder:text-slate-400 text-slate-700 dark:text-slate-200 text-base",
                        errors.email 
                          ? "border-red-400 ring-red-100 shadow-red-100/50" 
                          : "border-slate-300 dark:border-slate-600"
                      )}
                      onBlur={(e) => handleFieldBlur('email', e.target.value)}
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/10 to-blue-500/10 opacity-0 group-hover/field:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  {/* Error message */}
                  {errors.email && (
                    <div className="mt-2 bg-red-500 text-white text-sm px-4 py-2 rounded-lg shadow-lg animate-slide-down">
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Please enter a valid email address
                      </span>
                    </div>
                  )}
                </div>

                {/* Phone and Quantity Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Phone Field */}
                  <div className="group/field">
                    <div className="relative">
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Phone Number *"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        data-testid="input-phone"
                        className={cn(
                          "w-full h-14 px-4 py-4 border-2 rounded-xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm transition-all duration-300",
                          "focus:border-green-500 focus:ring-4 focus:ring-green-100 dark:focus:ring-green-900/30 focus:shadow-lg focus:shadow-green-100/50 focus:bg-white dark:focus:bg-slate-800",
                          "hover:border-slate-400 hover:shadow-md hover:bg-white/90 dark:hover:bg-slate-800/90",
                          "placeholder:text-slate-400 text-slate-700 dark:text-slate-200 text-base",
                          errors.phone 
                            ? "border-red-400 ring-red-100 shadow-red-100/50" 
                            : "border-slate-300 dark:border-slate-600"
                        )}
                        onBlur={(e) => handleFieldBlur('phone', e.target.value)}
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/10 to-blue-500/10 opacity-0 group-hover/field:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                    {/* Error message */}
                    {errors.phone && (
                      <div className="mt-2 bg-red-500 text-white text-sm px-4 py-2 rounded-lg shadow-lg animate-slide-down">
                        <span className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          Please enter a valid phone number (minimum 10 digits)
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Quantity Field */}
                  <div className="group/field">
                    <div className="relative">
                      <Input
                        id="quantity"
                        placeholder="Estimated Quantity (e.g., 50 kg)"
                        value={formData.estimatedQuantity}
                        onChange={(e) => setFormData({ ...formData, estimatedQuantity: e.target.value })}
                        data-testid="input-quantity"
                        className="w-full h-14 px-4 py-4 border-2 border-slate-300 dark:border-slate-600 rounded-xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm transition-all duration-300 
                          focus:border-green-500 focus:ring-4 focus:ring-green-100 dark:focus:ring-green-900/30 focus:shadow-lg focus:shadow-green-100/50 focus:bg-white dark:focus:bg-slate-800
                          hover:border-slate-400 hover:shadow-md hover:bg-white/90 dark:hover:bg-slate-800/90
                          placeholder:text-slate-400 text-slate-700 dark:text-slate-200 text-base"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/10 to-blue-500/10 opacity-0 group-hover/field:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Navigation Buttons */}
              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(1)}
                  data-testid="button-back-step-2"
                  className="flex items-center gap-2 h-12 px-6 border-2 border-slate-300 dark:border-slate-600 rounded-xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm transition-all duration-300 
                    hover:border-slate-400 hover:shadow-md hover:bg-white/90 dark:hover:bg-slate-800/90 text-slate-700 dark:text-slate-200"
                >
                  <ChevronRight className="w-5 h-5 rotate-180" />
                  Back
                </Button>
                <Button
                  size="lg"
                  onClick={() => setCurrentStep(3)}
                  disabled={!canProceedToStep3()}
                  data-testid="button-next-step-2"
                  className="flex items-center gap-3 h-12 px-8 bg-primary text-white rounded-xl shadow-lg hover:shadow-2xl hover:shadow-blue-200/50 dark:hover:shadow-blue-900/50 transform hover:scale-[1.02] transition-all duration-300 group/btn relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center gap-2 ">
                    Continue
                    <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </span>
                  {/* Button shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Pickup Address */}
          {currentStep === 3 && (
            <div className="space-y-8">
              {/* Step Header */}
              <div className="text-center">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-3">
                  Pickup Address 📍
                </h3>
                <p className="text-muted-foreground mb-4">
                  Tell us where to collect your scrap materials
                </p>
                <div className="flex flex-wrap justify-center gap-2 mb-3">
                  <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                    👤 {formData.name}
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                    ♻️ {getSelectedScrapNames()}
                  </Badge>
                </div>
                <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mx-auto mt-3"></div>
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                {/* Address Field */}
                <div className="group/field">
                  <div className="relative">
                    <Textarea
                      id="address"
                      rows={5}
                      placeholder="Complete Pickup Address * - Include street, area, city, pincode... 🏠"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      data-testid="input-address"
                      className={cn(
                        "w-full px-4 py-4 border-2 rounded-xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm transition-all duration-300",
                        "focus:border-green-500 focus:ring-4 focus:ring-green-100 dark:focus:ring-green-900/30 focus:shadow-lg focus:shadow-green-100/50 focus:bg-white dark:focus:bg-slate-800",
                        "hover:border-slate-400 hover:shadow-md hover:bg-white/90 dark:hover:bg-slate-800/90",
                        "placeholder:text-slate-400 text-slate-700 dark:text-slate-200 text-base resize-none min-h-[140px]",
                        errors.address 
                          ? "border-red-400 ring-red-100 shadow-red-100/50" 
                          : "border-slate-300 dark:border-slate-600"
                      )}
                      onBlur={(e) => handleFieldBlur('address', e.target.value)}
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/10 to-blue-500/10 opacity-0 group-hover/field:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  {/* Error message */}
                  {errors.address && (
                    <div className="mt-2 bg-red-500 text-white text-sm px-4 py-2 rounded-lg shadow-lg animate-slide-down">
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Please enter a complete address (minimum 10 characters)
                      </span>
                    </div>
                  )}
                </div>

                {/* Additional Notes Field */}
                <div className="group/field">
                  <div className="relative">
                    <Textarea
                      id="notes"
                      rows={4}
                      placeholder="Additional Notes (Optional) - Preferred time, gate code, special instructions... 💡"
                      value={formData.additionalNotes}
                      onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                      data-testid="input-notes"
                      className="w-full px-4 py-4 border-2 border-slate-300 dark:border-slate-600 rounded-xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm transition-all duration-300 
                        focus:border-green-500 focus:ring-4 focus:ring-green-100 dark:focus:ring-green-900/30 focus:shadow-lg focus:shadow-green-100/50 focus:bg-white dark:focus:bg-slate-800
                        hover:border-slate-400 hover:shadow-md hover:bg-white/90 dark:hover:bg-slate-800/90
                        placeholder:text-slate-400 text-slate-700 dark:text-slate-200 text-base resize-none min-h-[120px]"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/10 to-blue-500/10 opacity-0 group-hover/field:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(2)}
                  data-testid="button-back-step-3"
                  className="flex items-center gap-2 h-12 px-6 border-2 border-slate-300 dark:border-slate-600 rounded-xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm transition-all duration-300 
                    hover:border-slate-400 hover:shadow-md hover:bg-white/90 dark:hover:bg-slate-800/90 text-slate-700 dark:text-slate-200"
                >
                  <ChevronRight className="w-5 h-5 rotate-180" />
                  Back
                </Button>
                <Button
                  size="lg"
                  onClick={() => setCurrentStep(4)}
                  disabled={!canProceedToStep4()}
                  data-testid="button-next-step-3"
                className="flex items-center gap-3 h-12 px-8 bg-primary text-white rounded-xl shadow-lg hover:shadow-2xl hover:shadow-blue-200/50 dark:hover:shadow-blue-900/50 transform hover:scale-[1.02] transition-all duration-300 group/btn relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center gap-2 ">
                    Continue
                    <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </span>
                  {/* Button shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Review & Submit */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Review Your Request</h3>
                <p className="text-muted-foreground">Please verify all details before submitting</p>
              </div>
              <Card className="p-6 bg-muted/30">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Scrap Types</p>
                    <div className="flex flex-wrap gap-2">
                      {scrapTypes
                        .filter((type) => selectedScrapTypes.includes(type.id))
                        .map((type) => (
                          <Badge key={type.id} className="text-sm">
                            {type.name} - ₹{type.rate}/kg
                          </Badge>
                        ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Name</p>
                      <p className="font-medium" data-testid="review-name">{formData.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Email</p>
                      <p className="font-medium" data-testid="review-email">{formData.email}</p>
                    </div>
                    {formData.phone && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Phone</p>
                        <p className="font-medium">{formData.phone}</p>
                      </div>
                    )}
                    {formData.estimatedQuantity && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Estimated Quantity</p>
                        <p className="font-medium">{formData.estimatedQuantity}</p>
                      </div>
                    )}
                  </div>
                  <div className="pt-2">
                    <p className="text-sm text-muted-foreground mb-1">Pickup Address</p>
                    <p className="font-medium" data-testid="review-address">{formData.address}</p>
                  </div>
                  {formData.additionalNotes && (
                    <div className="pt-2">
                      <p className="text-sm text-muted-foreground mb-1">Additional Notes</p>
                      <p className="font-medium">{formData.additionalNotes}</p>
                    </div>
                  )}
                </div>
              </Card>
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(3)}
                  data-testid="button-back-step-4"
                >
                  Back
                </Button>
                <Button
                  size="lg"
                  onClick={handleSubmit}
                  disabled={submitMutation.isPending}
                  data-testid="button-submit-pickup"
                >
                  {submitMutation.isPending ? (
                    <>Submitting...</>
                  ) : (
                    <>
                      <Check className="mr-2 h-5 w-5" />
                      Submit Request
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
          </Card>
        </div>
      </div>
    </section>
  );
}
