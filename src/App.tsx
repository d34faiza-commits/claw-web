import { MotionConfig } from "motion/react";
import { Agents } from "@/components/sections/Agents";
import { CTA } from "@/components/sections/CTA";
import { Features } from "@/components/sections/Features";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Navbar } from "@/components/sections/Navbar";
import { Pricing } from "@/components/sections/Pricing";
import { TrustedBy } from "@/components/sections/TrustedBy";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <Agents />
        <Features />
        <HowItWorks />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </MotionConfig>
  );
}
