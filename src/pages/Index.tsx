
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import FeaturedProfessionalsSection from "@/components/home/FeaturedProfessionalsSection";
import TrustAndSafetySection from "@/components/home/TrustAndSafetySection";
import ProfessionalCTA from "@/components/home/ProfessionalCTA";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <HeroSection />
        <ServicesSection />
        <HowItWorksSection />
        <FeaturedProfessionalsSection />
        <TrustAndSafetySection />
        <ProfessionalCTA />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
