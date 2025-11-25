import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CareerSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    coverLetter: "",
  });
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      console.log("File selected:", file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Career application submitted:", formData, fileName);
    toast({
      title: "Application Submitted!",
      description: "We'll review your application and get back to you soon.",
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      position: "",
      coverLetter: "",
    });
    setFileName("");
  };

  return (
    <section className="py-20 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mb-4">Join Our Green Mission</h2>
          <p className="text-xl text-muted-foreground">
            Be part of a team that's making a difference for the environment
          </p>
        </div>
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground mb-6">Why Join Us?</h3>
              <Card className="p-6 hover-elevate">
                <div className="flex gap-3">
                  <div className="bg-green-100 dark:bg-green-900/30 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Make a Real Impact</h4>
                    <p className="text-sm text-muted-foreground">Contribute to environmental sustainability</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6 hover-elevate">
                <div className="flex gap-3">
                  <div className="bg-green-100 dark:bg-green-900/30 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Competitive Benefits</h4>
                    <p className="text-sm text-muted-foreground">Great compensation and growth opportunities</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6 hover-elevate">
                <div className="flex gap-3">
                  <div className="bg-green-100 dark:bg-green-900/30 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Growing Team</h4>
                    <p className="text-sm text-muted-foreground">Join a passionate and dedicated community</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          <div className="lg:col-span-3">
            <Card className="p-8 bg-white dark:bg-slate-900">
              <h3 className="text-2xl font-semibold text-foreground mb-6">Apply Now</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="career-name" className="text-foreground">Full Name *</Label>
                  <Input
                    id="career-name"
                    placeholder="Your Name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    data-testid="input-career-name"
                  />
                </div>

                <div>
                  <Label htmlFor="career-email" className="text-foreground">Email *</Label>
                  <Input
                    id="career-email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    data-testid="input-career-email"
                  />
                </div>

                <div>
                  <Label htmlFor="career-phone" className="text-foreground">Phone Number *</Label>
                  <Input
                    id="career-phone"
                    type="tel"
                    placeholder="Phone number"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    data-testid="input-career-phone"
                  />
                </div>

                <div>
                  <Label htmlFor="career-position" className="text-foreground">Position Applying For *</Label>
                  <Select
                    value={formData.position}
                    onValueChange={(value) => setFormData({ ...formData, position: value })}
                    required
                  >
                    <SelectTrigger id="career-position" data-testid="select-position">
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="collection-agent">Collection Agent</SelectItem>
                      <SelectItem value="driver">Driver</SelectItem>
                      <SelectItem value="sorting-staff">Sorting Staff</SelectItem>
                      <SelectItem value="supervisor">Supervisor</SelectItem>
                      <SelectItem value="operations-manager">Operations Manager</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="career-cv" className="text-foreground">Upload CV/Resume *</Label>
                  <div className="mt-2">
                    <label
                      htmlFor="career-cv"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-green-300 dark:border-green-700 rounded-lg cursor-pointer hover:bg-green-50 dark:hover:bg-green-950/20 transition"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="h-10 w-10 text-green-600 dark:text-green-400 mb-2" />
                        <p className="text-sm text-foreground">
                          {fileName || "Click to upload or drag and drop"}
                        </p>
                        <p className="text-xs text-muted-foreground">PDF, DOC, DOCX (MAX. 5MB)</p>
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
                </div>

                <div>
                  <Label htmlFor="career-cover" className="text-foreground">Cover Letter (Optional)</Label>
                  <Textarea
                    id="career-cover"
                    rows={5}
                    placeholder="Tell us why you'd be a great fit..."
                    value={formData.coverLetter}
                    onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                    data-testid="input-career-cover"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white" data-testid="button-submit-career">
                  Apply Now
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
