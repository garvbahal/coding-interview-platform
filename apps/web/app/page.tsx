import { CTASection } from "../components/Homepage/CTASection";
import { FeaturesSection } from "../components/Homepage/FeaturesSection";
import { Footer } from "../components/Homepage/Footer";
import { HeroSection } from "../components/Homepage/HeroSection";
import { HomepageNavbar } from "../components/Homepage/Navbar";

export const metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <div className="bg-white text-gray-900 antialiased selection:bg-gray-900 selection:text-white">
      <HomepageNavbar />
      <HeroSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </div>
  );
}
