import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
type formType = {
    name: string,
    email: string,
    phone: string,
    position: string,
    coverLetter: string,
    botField?: string,
}
export default function CareerSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<formType>({
    name: "",
    email: "",
    phone: "",
    position: "",
    coverLetter: "",
    botField: "",
  });
  const [fileName, setFileName] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
    position: false,
    file: false,
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
      setFileName(file.name);
      setErrors(prev => ({ ...prev, file: false }));
      console.log("File selected:", file.name);
    } else {
      setResumeFile(null);
      setErrors(prev => ({ ...prev, file: true }));
    }
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
      case 'position':
        isValid = value.trim() !== '';
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
        position: formData.position,
        coverLetter: formData.coverLetter || null,
        cvFileName: fileName || null,
        botField: formData.botField,
      };
      // Build multipart form so the file actually uploads
      const form = new FormData();
      form.append('name', formData.name);
      form.append('email', formData.email);
      form.append('phone', formData.phone);
      form.append('position', formData.position);
      form.append('coverLetter', formData.coverLetter);
      form.append('cvFileName', fileName || 'resume');
      form.append('botField', formData.botField || '');
      if (resumeFile) {
        form.append('resume', resumeFile, resumeFile.name);
      }

      const res = await fetch('/api/career-applications', {
        method: 'POST',
        body: form,
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Failed to submit application');
      }
      toast({
        title: 'Application Submitted!',
        description: "We'll review your application and get back to you soon.",
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        position: '',
        coverLetter: '',
      });
      setFileName('');
      setErrors({
        name: false,
        email: false,
        phone: false,
        position: false,
        file: false,
      });
    } catch (err: any) {
      toast({
        title: 'Submission Failed',
        description: err?.message || 'Please try again later',
        variant: 'destructive',
      });
    }
  };

  return (
    <section className="py-20 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mobile-form-container">
        <div className="text-center mb-12">
          <h2 className=" text-4xl md:text-5xl mb-4">Join Our Green Mission</h2>
          <p className="text-xl text-muted-foreground">
            Be part of a team that's making a difference for the environment
          </p>
        </div>
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-2">
            <motion.div className="space-y-6" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}>
              <h3 className="text-2xl font-semibold text-foreground mb-6">Why Join Us?</h3>
                <motion.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.8 }} transition={{ duration: 0.6, ease: "easeOut" }}>
                  <Card className="p-6 group relative hover:bg-gradient-to-r hover:from-green-50  transform transition-all duration-700 bg-white border-2  border-slate-200 border-l-primary   hover:border-green-200/50  overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/70 to-transparent transition-transform duration-700 pointer-events-none"></div>
                  
                  <div className="flex gap-3">
                    <div className="border border-green-300 dark:border-green-600 bg-kabadi-light dark:bg-green-900/30 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className=" text-green-600 dark:text-green-400 font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Make a Real Impact</h4>
                      <p className="text-sm text-muted-foreground">Contribute to environmental sustainability</p>
                    </div>
                  </div>
                </Card>
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.8 }} transition={{ duration: 0.6, ease: "easeOut" }}>
                <Card className="p-6 group relative hover:bg-gradient-to-r hover:from-green-50  transform transition-all duration-700 bg-white border-2  border-slate-200 border-l-primary   hover:border-green-200/50  overflow-hidden">
                              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/70 to-transparent transition-transform duration-700 pointer-events-none"></div>
                              
                  <div className="flex gap-3">
                    <div className="border border-green-300 dark:border-green-600 bg-kabadi-light dark:bg-green-900/30 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Competitive Benefits</h4>
                      <p className="text-sm text-muted-foreground">Great compensation and growth opportunities</p>
                    </div>
                  </div>
                </Card>
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.8 }} transition={{ duration: 0.6, ease: "easeOut" }}>
                <Card className="p-6 group relative hover:bg-gradient-to-r hover:from-green-50  transform transition-all duration-700 bg-white border-2  border-slate-200 border-l-primary   hover:border-green-200/50  overflow-hidden">
                              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/70 to-transparent transition-transform duration-700 pointer-events-none"></div>
                              
                  <div className="flex gap-3">
                    <div className="border border-green-300 dark:border-green-600 bg-kabadi-light dark:bg-green-900/30 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Growing Team</h4>
                      <p className="text-sm text-muted-foreground">Join a passionate and dedicated community</p>
                    </div>
                  </div>
                </Card>
                </motion.div>
            </motion.div>
          </div>
          <div className="lg:col-span-3">
            <div className="relative group p-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl border-green-200/50 border">
              {/* Animated background with glassmorphism */}
              <div className= "hidden min-[500px]:block absolute inset-0 bg-gradient-to-br from-slate-100/80 via-blue-50/60 to-green-50/40 dark:from-slate-800/80 dark:via-blue-950/60 dark:to-green-950/40 rounded-2xl backdrop-blur-sm"></div>
              <div className= "hidden min-[500px]:block absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
              
              {/* Floating particles */}
              <div className="absolute top-8 right-8 w-2 h-2 bg-green-400/30 rounded-full animate-pulse"></div>
              <div className="absolute bottom-12 left-6 w-1 h-1 bg-blue-400/40 rounded-full animate-ping"></div>
              <div className="absolute top-20 left-12 w-1.5 h-1.5 bg-green-300/20 rounded-full animate-bounce"></div>
              
              <Card className="relative z-10 bg-transparent shadown min-[500px]:p-10 min-[500px]:shadow-lg min-[500px]:bg-white/95 dark:min-[500px]:bg-slate-900/95 min-[500px]:backdrop-blur-md border-0 rounded-2xl overflow-hidden">
                {/* Header with animated gradient */}
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-3">
                    Join Our Mission 
                    <span className="text-white">
                      🌱
                      </span>
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">Transform your career while transforming the world</p>
                  <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mx-auto mt-3"></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 mobile-contact-grid" noValidate>
                  {/* Honey-pot field to catch bots */}
                  <input type="text" name="botField" autoComplete="off" tabIndex={-1} value={formData.botField} onChange={(e)=>setFormData({...formData, botField: e.target.value})} className="hidden" aria-hidden="true" />
                  {/* Name Field */}
                  <div className="group/field">
                    <div className="relative">
                      <Input
                        id="career-name"
                        placeholder="Full Name *"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        data-testid="input-career-name"
                        className={cn(
                          "w-full h-14 px-4 py-4 border-2 rounded-xl bg-white dark:bg-slate-800/70 backdrop-blur-sm transition-all duration-300",
                          "focus:border-green-500 focus:ring-4 focus:ring-green-100 dark:focus:ring-green-900/30 focus:shadow-lg focus:shadow-green-100 focus:bg-white dark:focus:bg-slate-800",
                          "hover:border-slate-400 hover:shadow-md hover:bg-white/90 dark:hover:bg-slate-800/90",
                          "placeholder:text-slate-400 text-slate-700 dark:text-slate-200 text-base",
                          errors.name 
                            ? "border-red-400 ring-red-100 shadow-red-100/50" 
                            : "border-slate-300 dark:border-slate-600"
                        )}
                        onBlur={(e) => handleFieldBlur('name', e.target.value)}
                      />
                      {/* Hover glow effect */}
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
                        id="career-email"
                        type="email"
                        placeholder="Email Address *"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        data-testid="input-career-email"
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

                  {/* Phone Field */}
                  <div className="group/field">
                    <div className="relative">
                      <Input
                        id="career-phone"
                        type="tel"
                        placeholder="Phone Number *"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        data-testid="input-career-phone"
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

                  {/* Position Select */}
                  <div className="group/field">
                    <div className="relative">
                      <Select
                        value={formData.position}
                        onValueChange={(value) => {
                          setFormData({ ...formData, position: value });
                          handleFieldBlur('position', value);
                        }}
                        required
                      >
                        <SelectTrigger 
                          id="career-position" 
                          data-testid="select-position"
                          className={cn(
                            "h-14 px-4 py-4 border-2 rounded-xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm transition-all duration-300",
                            "focus:border-green-500 focus:ring-4 focus:ring-green-100 dark:focus:ring-green-900/30 focus:shadow-lg focus:shadow-green-100/50 focus:bg-white dark:focus:bg-slate-800",
                            "hover:border-slate-400 hover:shadow-md hover:bg-white/90 dark:hover:bg-slate-800/90 text-base",
                            errors.position 
                              ? "border-red-400 ring-red-100 shadow-red-100/50" 
                              : "border-slate-300 dark:border-slate-600"
                          )}
                        >
                          <SelectValue placeholder="Position Applying For *" className="text-slate-400" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-0 shadow-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
                          <SelectItem value="collection-agent" className="text-base py-3 hover:bg-green-50 dark:hover:bg-green-900/20">🚛 Collection Agent</SelectItem>
                          <SelectItem value="driver" className="text-base py-3 hover:bg-green-50 dark:hover:bg-green-900/20">🚗 Driver</SelectItem>
                          <SelectItem value="sorting-staff" className="text-base py-3 hover:bg-green-50 dark:hover:bg-green-900/20">♻️ Sorting Staff</SelectItem>
                          <SelectItem value="supervisor" className="text-base py-3 hover:bg-green-50 dark:hover:bg-green-900/20">👔 Supervisor</SelectItem>
                          <SelectItem value="operations-manager" className="text-base py-3 hover:bg-green-50 dark:hover:bg-green-900/20">📊 Operations Manager</SelectItem>
                          <SelectItem value="other" className="text-base py-3 hover:bg-green-50 dark:hover:bg-green-900/20">💼 Other Position</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/10 to-blue-500/10 opacity-0 group-hover/field:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                    {/* Error message */}
                    {errors.position && (
                      <div className="mt-2 bg-red-500 text-white text-sm px-4 py-2 rounded-lg shadow-lg animate-slide-down">
                        <span className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          Please select a position you're applying for
                        </span>
                      </div>
                    )}
                  </div>

                  {/* File Upload */}
                  <div className="group/field">
                    <div className="relative">
                      <label
                        htmlFor="career-cv"
                        className={cn(
                          "flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-xl cursor-pointer",
                          "hover:border-green-400 hover:bg-green-50/50 dark:hover:bg-green-900/20",
                          "focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-100 dark:focus-within:ring-green-900/30",
                          "transition-all duration-300 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm group-hover/field:shadow-lg",
                          errors.file 
                            ? "border-red-400 bg-red-50/50 dark:bg-red-900/20" 
                            : "border-slate-300 dark:border-slate-600"
                        )}
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="h-12 w-12 text-green-500 mb-3 group-hover/field:animate-bounce" />
                          <p className="text-base font-medium text-slate-700 dark:text-slate-200 mb-1">
                            {fileName || "Upload CV/Resume *"}
                          </p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            PDF, DOC, DOCX (MAX. 5MB)
                          </p>
                        </div>
                        <input
                          id="career-cv"
                          type="file"
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          required
                          data-testid="input-career-cv"
                        />
                      </label>
                    </div>
                    {/* Error message */}
                    {errors.file && (
                      <div className="mt-2 bg-red-500 text-white text-sm px-4 py-2 rounded-lg shadow-lg animate-slide-down">
                        <span className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          Please upload your CV/Resume
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Cover Letter */}
                  <div className="relative group/field">
                    <Textarea
                      id="career-cover"
                      rows={5}
                      placeholder="Cover Letter (Optional) - Tell us why you'd be perfect for our green mission... 🌱"
                      value={formData.coverLetter}
                      onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                      data-testid="input-career-cover"
                      className="w-full px-4 py-4 border-2 border-slate-300 dark:border-slate-600 rounded-xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm transition-all duration-300 
                        focus:border-green-500 focus:ring-4 focus:ring-green-100 dark:focus:ring-green-900/30 focus:shadow-lg focus:shadow-green-100/50 focus:bg-white dark:focus:bg-slate-800
                        hover:border-slate-400 hover:shadow-md hover:bg-white/90 dark:hover:bg-slate-800/90
                        placeholder:text-slate-400 text-slate-700 dark:text-slate-200 text-base resize-none min-h-[120px]"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/10 to-blue-500/10 opacity-0 group-hover/field:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    data-testid="button-submit-career"
                    className="w-max px-8 flex mx-auto h-14 bg-primary text-white text-lg border-none rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-blue-200/50 dark:hover:shadow-blue-900/50 transform hover:scale-[1.02] transition-all duration-300 group/btn relative overflow-hidden"

                    >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      Apply Now ✨
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
