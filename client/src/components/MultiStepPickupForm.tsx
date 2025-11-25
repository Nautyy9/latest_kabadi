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

interface ScrapType {
  id: string;
  name: string;
  rate: number;
  icon: React.ReactNode;
}

const scrapTypes: ScrapType[] = [
  { id: "plastic", name: "Plastic", rate: 20, icon: <Recycle className="h-6 w-6" /> },
  { id: "metal", name: "Metal", rate: 40, icon: <Wrench className="h-6 w-6" /> },
  { id: "paper", name: "Paper", rate: 12, icon: <FileText className="h-6 w-6" /> },
  { id: "cardboard", name: "Cardboard", rate: 15, icon: <Box className="h-6 w-6" /> },
  { id: "electronics", name: "Electronics", rate: 35, icon: <Smartphone className="h-6 w-6" /> },
  { id: "glass", name: "Glass", rate: 8, icon: <Lightbulb className="h-6 w-6" /> },
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
  const canProceedToStep3 = () => formData.name && formData.email;
  const canProceedToStep4 = () => formData.address;

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
    <section id="request-pickup" className="py-20 bg-white dark:bg-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mb-4">Request a Pickup</h2>
          <p className="text-xl text-muted-foreground">
            Complete the form in simple steps and we'll collect your scrap within 24 hours
          </p>
        </div>

        {/* Step Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                      currentStep > step.number
                        ? "bg-primary text-primary-foreground"
                        : currentStep === step.number
                        ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                        : "bg-muted text-muted-foreground"
                    }`}
                    data-testid={`step-indicator-${step.number}`}
                  >
                    {currentStep > step.number ? <Check className="h-6 w-6" /> : step.number}
                  </div>
                  <p className={`mt-2 text-sm font-medium hidden sm:block ${
                    currentStep >= step.number ? "text-foreground" : "text-muted-foreground"
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-2 transition-all ${
                      currentStep > step.number ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card className="p-8">
          {/* Step 1: Select Scrap Types */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Select Scrap Types</h3>
                <p className="text-muted-foreground">Choose the materials you want to sell</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-2.5 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {scrapTypes.map((type) => (
                  <Card
                    key={type.id}
                    className={`p-6 cursor-pointer transition-all hover-elevate ${
                      selectedScrapTypes.includes(type.id)
                        ? "border-2 border-primary bg-primary/5"
                        : ""
                    }`}
                    onClick={() => toggleScrapType(type.id)}
                    data-testid={`scrap-type-${type.id}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        {type.icon}
                      </div>
                      {selectedScrapTypes.includes(type.id) && (
                        <div className="bg-primary rounded-full p-1">
                          <Check className="h-4 w-4 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                    <h4 className="font-semibold text-lg mb-1">{type.name}</h4>
                    <p className="text-2xl font-bold" style={{ color: "#15803D" }}>
                      ₹{type.rate}<span className="text-sm text-muted-foreground">/kg</span>
                    </p>
                  </Card>
                ))}
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  size="lg"
                  onClick={() => setCurrentStep(2)}
                  disabled={!canProceedToStep2()}
                  data-testid="button-next-step-1"
                >
                  Continue
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Your Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Your Details</h3>
                <p className="text-muted-foreground">
                  Selected: <span className="text-foreground font-medium">{getSelectedScrapNames()}</span>
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    data-testid="input-name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    data-testid="input-email"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      data-testid="input-phone"
                    />
                  </div>
                  <div>
                    <Label htmlFor="quantity">Estimated Quantity</Label>
                    <Input
                      id="quantity"
                      value={formData.estimatedQuantity}
                      onChange={(e) => setFormData({ ...formData, estimatedQuantity: e.target.value })}
                      placeholder="e.g., 50 kg"
                      data-testid="input-quantity"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(1)}
                  data-testid="button-back-step-2"
                >
                  Back
                </Button>
                <Button
                  size="lg"
                  onClick={() => setCurrentStep(3)}
                  disabled={!canProceedToStep3()}
                  data-testid="button-next-step-2"
                >
                  Continue
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Address */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Pickup Address</h3>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge variant="secondary">
                    {formData.name}
                  </Badge>
                  <Badge variant="secondary">
                    {getSelectedScrapNames()}
                  </Badge>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="address">Complete Address *</Label>
                  <Textarea
                    id="address"
                    rows={4}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Enter your complete pickup address including street, city, pincode"
                    data-testid="input-address"
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    rows={3}
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                    placeholder="Any specific instructions or details (e.g., preferred time, gate code)"
                    data-testid="input-notes"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(2)}
                  data-testid="button-back-step-3"
                >
                  Back
                </Button>
                <Button
                  size="lg"
                  onClick={() => setCurrentStep(4)}
                  disabled={!canProceedToStep4()}
                  data-testid="button-next-step-3"
                >
                  Review Details
                  <ChevronRight className="ml-2 h-5 w-5" />
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
    </section>
  );
}
