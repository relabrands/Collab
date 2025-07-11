
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorks } from "@/components/HowItWorks";
import { ForRestaurants } from "@/components/ForRestaurants";
import { ForCreators } from "@/components/ForCreators";
import { Stats } from "@/components/Stats";
import { CallToAction } from "@/components/CallToAction";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <HowItWorks />
      <ForRestaurants />
      <ForCreators />
      <Stats />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
