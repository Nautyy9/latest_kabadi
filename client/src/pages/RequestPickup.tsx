import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MultiStepPickupForm from "@/components/MultiStepPickupForm";
import WhyChooseKabadi from "@/components/WhyChooseKabadi";

export default function RequestPickup() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MultiStepPickupForm />
          </div>
        </section>

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
