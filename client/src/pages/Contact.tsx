import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import WhyChooseKabadi from "@/components/WhyChooseKabadi";

export default function Contact() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="relative py-16 lg:py-20  overflow-visible">
          <div className="absolute inset-x-0 -top-12 bottom-0 bg-gradient-to-b from-green-50 via-green-50/60 -z-10 pointer-events-none"></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">Contact Us</h1>
            <div className="w-4/5 mx-auto text-pretty">

            <p className="text-xl text-muted-foreground">
              We're here to help. Reach out to us for any questions or inquiries
            </p>
            <p className="pt-2 text-xl text-muted-foreground">
              Ready to make an impact? Whether you need our services or want to partner with us, we'd love to hear from you.
          </p>
            </div>
          </div>
        </section>
        
        <ContactSection />
        
        {/* Why Choose Section */}
        <section className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <WhyChooseKabadi />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
