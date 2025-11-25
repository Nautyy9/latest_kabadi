import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function PickupRequestForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    scrapTypes: [] as string[],
    estimatedQuantity: "",
    additionalNotes: "",
  });

  const scrapTypes = [
    "Plastic",
    "Metal",
    "Paper",
    "Cardboard",
    "Electronics",
    "Glass",
  ];

  const handleCheckboxChange = (type: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      scrapTypes: checked
        ? [...prev.scrapTypes, type]
        : prev.scrapTypes.filter((t) => t !== type),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Pickup request submitted:", formData);
    toast({
      title: "Request Submitted!",
      description: "We'll contact you within 24 hours to schedule your pickup.",
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      scrapTypes: [],
      estimatedQuantity: "",
      additionalNotes: "",
    });
  };

  return (
    <section id="request-pickup" className="py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mb-4">Request a Pickup</h2>
          <p className="text-xl text-muted-foreground">
            Fill out the form below and we'll collect your scrap within 24 hours
          </p>
        </div>
        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  data-testid="input-name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  data-testid="input-email"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  data-testid="input-phone"
                />
              </div>
              <div>
                <Label htmlFor="quantity">Estimated Quantity</Label>
                <Input
                  id="quantity"
                  placeholder="e.g., 50 kg"
                  value={formData.estimatedQuantity}
                  onChange={(e) => setFormData({ ...formData, estimatedQuantity: e.target.value })}
                  data-testid="input-quantity"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Pickup Address *</Label>
              <Textarea
                id="address"
                required
                rows={3}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                data-testid="input-address"
              />
            </div>

            <div>
              <Label className="mb-3 block">Scrap Type(s) *</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {scrapTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={type}
                      checked={formData.scrapTypes.includes(type)}
                      onCheckedChange={(checked) => handleCheckboxChange(type, checked as boolean)}
                      data-testid={`checkbox-${type.toLowerCase()}`}
                    />
                    <Label htmlFor={type} className="cursor-pointer">
                      {type}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                rows={4}
                placeholder="Any specific instructions or details..."
                value={formData.additionalNotes}
                onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                data-testid="input-notes"
              />
            </div>

            <Button type="submit" size="lg" className="w-full" data-testid="button-submit-pickup">
              Schedule Pickup
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
}
