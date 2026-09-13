import Hero from "./home-sections/Hero";
import Services from "./home-sections/Services";
import HowItWorks from "./home-sections/HowItWorks";
import WhyChooshUs from "./home-sections/WhyChooshUs";
import RatesRolodex from "./home-sections/RatesRolodex";
import BeforeAfter from "./home-sections/BeforeAfter";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Services />
      <HowItWorks />
      <WhyChooshUs />
      <RatesRolodex />
      <BeforeAfter />
    </main>
  );
}
