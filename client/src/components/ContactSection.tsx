import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <section className="py-20 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mb-4">Contact Us</h2>
          <p className="text-xl text-muted-foreground">
            Ready to make an impact? Whether you need our services or want to partner with us, we'd love to hear from you.
          </p>
        </div>
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground mb-6">Reach Out to Us</h3>
              <Card className="p-6 hover-elevate">
                <div className="flex gap-4 items-start">
                  <div className="bg-green-100 dark:bg-green-900/30 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Email Us</h4>
                    <p className="text-muted-foreground">contact@thekabadi.com</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6 hover-elevate">
                <div className="flex gap-4 items-start">
                  <div className="bg-green-100 dark:bg-green-900/30 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Call Us</h4>
                    <p className="text-muted-foreground">+91 98765 43210</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6 hover-elevate">
                <div className="flex gap-4 items-start">
                  <div className="bg-green-100 dark:bg-green-900/30 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Visit Us</h4>
                    <p className="text-muted-foreground">1234 Green Street, Recycling Hub, Mumbai, India - 100001</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          <div className="lg:col-span-3">
            <Card className="p-8 bg-white dark:bg-slate-900">
              <h3 className="text-2xl font-semibold text-foreground mb-6">You have a message</h3>
              <p className="text-muted-foreground mb-6">Fill out the form below, and we'll connect with you soon.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="contact-name" className="text-foreground">Name</Label>
                  <Input
                    id="contact-name"
                    placeholder="Your Name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    data-testid="input-contact-name"
                  />
                </div>
                <div>
                  <Label htmlFor="contact-phone" className="text-foreground">Mobile number</Label>
                  <Input
                    id="contact-phone"
                    type="tel"
                    placeholder="Mobile number"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    data-testid="input-contact-phone"
                  />
                </div>
                <div>
                  <Label htmlFor="contact-email" className="text-foreground">Email ID</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="Email ID"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    data-testid="input-contact-email"
                  />
                </div>
                <div>
                  <Label htmlFor="contact-message" className="text-foreground">Message</Label>
                  <Textarea
                    id="contact-message"
                    placeholder="Your Message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    data-testid="input-contact-message"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white" data-testid="button-submit-contact">
                  Send
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
