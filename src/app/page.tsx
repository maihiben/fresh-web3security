import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import LiveActivityFeed from "../components/LiveActivityFeed";
import HowItWorks from "../components/HowItWorks";
import Partners from "../components/Partners";
import FeaturesGrid from "../components/FeaturesGrid";
import WhyWeb3Security from "../components/WhyWeb3Security";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white font-sans flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col gap-0">
        <HeroSection />
        <LiveActivityFeed />
        <HowItWorks />
        <Partners />
        <FeaturesGrid />
        <WhyWeb3Security />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
