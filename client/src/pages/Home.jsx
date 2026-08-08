import Navbar from "../components/layout/Navbar";
import Hero from "../components/hero/Hero";
import HowItWorks from "../components/howitworks/HowItWorks";
import CampaignSection from "../components/campaigns/CampaignSection";
import TrustSection from "../components/trust/TrustSection";
import ImpactSection from "../components/impact/ImpactSection";
import TestimonialSection from "../components/testimonials/TestimonialSection";
import CTASection from "../components/cta/CTASection";
import Footer from "../components/layout/Footer";
import AIRecommendations from "../components/AIRecommendations";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <AIRecommendations />
      <HowItWorks />
      <CampaignSection />
      <TrustSection />
      <ImpactSection />
      <TestimonialSection />
      <CTASection />
      <Footer />
    </>
  );
}