import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MultiStepPickupForm from "@/components/MultiStepPickupForm";
import WhyChooseKabadi from "@/components/WhyChooseKabadi";

import PageTransition from "@/components/PageTransition";
import SectionInView from "@/components/SectionInView";

export default function RequestPickup() {
  return (
    <PageTransition className="min-h-screen">
      <Header />
      <main>
        <section id="pickup-form-top" className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MultiStepPickupForm />
          </div>
        </section>
         <SectionInView/>

        <SectionInView>
        <section className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <WhyChooseKabadi />
          </div>
        </section>
        </SectionInView>
      </main>
      <Footer />
    </PageTransition>
  );
}
