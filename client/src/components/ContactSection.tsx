import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { apiRequest } from "@/lib/queryClient";

export default function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
    subject: false,
    message: false,
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

  const validateMessage = (message: string) => {
    return message.trim().length >= 10;
  };

  const validateSubject = (subject: string) => {
    return subject.trim().length >= 3;
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
      case 'subject':
        isValid = validateSubject(value);
        break;
      case 'message':
        isValid = validateMessage(value);
        break;
    }
    
    setErrors(prev => ({ ...prev, [field]: !isValid }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      };
      const res = await apiRequest('POST', '/api/contact-messages', payload);
      await res.json();
      toast({
        title: 'Message Sent!',
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      setErrors({
        name: false,
        email: false,
        phone: false,
        subject: false,
        message: false,
      });
    } catch (err: any) {
      toast({
        title: 'Failed to send message',
        description: err?.message || 'Please try again later',
        variant: 'destructive',
      });
    }
  };

  return (
    <section className="py-20 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xl text-muted-foreground">
            Ready to make an impact? Whether you need our services or want to partner with us, we'd love to hear from you.
          </p>
        </div>
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground mb-6">Reach Out to Us</h3>
              <Card className="p-6 group relative hover:bg-gradient-to-r hover:from-green-50/80 hover:to-blue-50/80 transform transition-all duration-700 bg-white border-2  border-slate-200 border-l-primary   hover:border-green-200/50  overflow-hidden">
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/70 to-transparent transition-transform duration-700 pointer-events-none"></div>
                
                <div className="flex gap-4 items-start">
                  <div className="bg-kabadi-light w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-kabadi-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Email Us</h4>
                    <p className="text-muted-foreground">contact@thekabadi.com</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6 group relative hover:bg-gradient-to-r hover:from-green-50/80 hover:to-blue-50/80 transform transition-all duration-700 bg-white border-2  border-slate-200 border-l-primary   hover:border-green-200/50  overflow-hidden">
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/70 to-transparent transition-transform duration-700 pointer-events-none"></div>
                
                <div className="flex gap-4 items-start">
                  <div className="bg-kabadi-light w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-kabadi-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Call Us</h4>
                    <p className="text-muted-foreground">+91 98765 43210</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6 group relative hover:bg-gradient-to-r hover:from-green-50/80 hover:to-blue-50/80 transform transition-all duration-700 bg-white border-2  border-slate-200 border-l-primary   hover:border-green-200/50  overflow-hidden">
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/70 to-transparent transition-transform duration-700 pointer-events-none"></div>
                
                <div className="flex gap-4 items-start">
                  <div className="bg-kabadi-light w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-kabadi-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Visit Us</h4>
                    <p className="text-muted-foreground">1234 Green Street, Recycling Hub, Mumbai, India - 100001</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          <div className="lg:col-span-3 bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-3xl border-green-200/50 border">
            <div className="relative group">
              {/* Animated background with glassmorphism */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-100/80 via-blue-50/60 to-green-50/40 dark:from-slate-800/80 dark:via-blue-950/60 dark:to-green-950/40 rounded-2xl backdrop-blur-sm"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
              
              {/* Floating particles */}
              <div className="absolute top-6 right-12 w-2 h-2 bg-green-400/30 rounded-full animate-pulse"></div>
              <div className="absolute bottom-16 left-8 w-1 h-1 bg-blue-400/40 rounded-full animate-ping"></div>
              <div className="absolute top-24 left-16 w-1.5 h-1.5 bg-green-300/20 rounded-full animate-bounce"></div>
              
              <Card className="relative z-10 p-10 shadow-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-0 rounded-2xl overflow-hidden">
                {/* Header with animated gradient */}
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-3">
                    Let's Connect! 
                
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">Share your thoughts and we'll get back to you soon</p>
                  <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mx-auto mt-3"></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  {/* Name Field */}
                  <div className="group/field">
                    <div className="relative">
                      <Input
                        id="contact-name"
                        placeholder="Your Name *"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        data-testid="input-contact-name"
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
                          Please enter your name (minimum 2 characters)
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div className="group/field">
                    <div className="relative">
                      <Input
                        id="contact-phone"
                        type="tel"
                        placeholder="Mobile Number *"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        data-testid="input-contact-phone"
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

                  {/* Email Field */}
                  <div className="group/field">
                    <div className="relative">
                      <Input
                        id="contact-email"
                        type="email"
                        placeholder="Email Address *"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        data-testid="input-contact-email"
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

                  {/* Subject Field */}
                  <div className="group/field">
                    <div className="relative">
                      <Input
                        id="contact-subject"
                        placeholder="Subject *"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        data-testid="input-contact-subject"
                        className={cn(
                          "w-full h-14 px-4 py-4 border-2 rounded-xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm transition-all duration-300",
                          "focus:border-green-500 focus:ring-4 focus:ring-green-100 dark:focus:ring-green-900/30 focus:shadow-lg focus:shadow-green-100/50 focus:bg-white dark:focus:bg-slate-800",
                          "hover:border-slate-400 hover:shadow-md hover:bg-white/90 dark:hover:bg-slate-800/90",
                          "placeholder:text-slate-400 text-slate-700 dark:text-slate-200 text-base",
                          errors.subject 
                            ? "border-red-400 ring-red-100 shadow-red-100/50" 
                            : "border-slate-300 dark:border-slate-600"
                        )}
                        onBlur={(e) => handleFieldBlur('subject', e.target.value)}
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/10 to-blue-500/10 opacity-0 group-hover/field:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                    {errors.subject && (
                      <div className="mt-2 bg-red-500 text-white text-sm px-4 py-2 rounded-lg shadow-lg animate-slide-down">
                        <span className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          Please enter a subject (minimum 3 characters)
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Message Field */}
                  <div className="group/field">
                    <div className="relative">
                      <Textarea
                        id="contact-message"
                        placeholder="Your Message * - Tell us how we can help you with your scrap collection needs... 🌱"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        data-testid="input-contact-message"
                        className={cn(
                          "w-full px-4 py-4 border-2 rounded-xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm transition-all duration-300",
                          "focus:border-green-500 focus:ring-4 focus:ring-green-100 dark:focus:ring-green-900/30 focus:shadow-lg focus:shadow-green-100/50 focus:bg-white dark:focus:bg-slate-800",
                          "hover:border-slate-400 hover:shadow-md hover:bg-white/90 dark:hover:bg-slate-800/90",
                          "placeholder:text-slate-400 text-slate-700 dark:text-slate-200 text-base resize-none min-h-[140px]",
                          errors.message 
                            ? "border-red-400 ring-red-100 shadow-red-100/50" 
                            : "border-slate-300 dark:border-slate-600"
                        )}
                        onBlur={(e) => handleFieldBlur('message', e.target.value)}
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/10 to-blue-500/10 opacity-0 group-hover/field:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                    {/* Error message */}
                    {errors.message && (
                      <div className="mt-2 bg-red-500 text-white text-sm px-4 py-2 rounded-lg shadow-lg animate-slide-down">
                        <span className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          Please enter your message (minimum 10 characters)
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    data-testid="button-submit-contact"
                    className="w-max px-6 flex mx-auto h-14 bg-primary text-white text-lg border-none rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-blue-200/50 dark:hover:shadow-blue-900/50 transform hover:scale-[1.02] transition-all duration-300 group/btn relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      Send Message ✨
                      <div className="group-hover/btn:translate-x-1 transition-transform duration-200">
                        →
                      </div>
                    </span>
                    {/* Button shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
