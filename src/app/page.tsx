import HeroSection from "../components/HeroSection";
import LiveActivityFeed from "../components/LiveActivityFeed";
import HowItWorks from "../components/HowItWorks";
import Partners from "../components/Partners";
import FeaturesGrid from "../components/FeaturesGrid";
import WhyWeb3Security from "../components/WhyWeb3Security";
import FAQ from "../components/FAQ";

export default function Home() {
  return (
    <>
      <HeroSection />
      <LiveActivityFeed />
      <HowItWorks />
      <Partners />
      <FeaturesGrid />
      <WhyWeb3Security />
      <FAQ />
    </>
  );
}
