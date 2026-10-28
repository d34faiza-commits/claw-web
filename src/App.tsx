import { MotionConfig } from "motion/react";
import { Agents } from "@/components/sections/Agents";
import { CTA } from "@/components/sections/CTA";
import { DeskScene } from "@/components/sections/DeskScene";
import { Features } from "@/components/sections/Features";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Navbar } from "@/components/sections/Navbar";
import { Pricing } from "@/components/sections/Pricing";
import { Showcase } from "@/components/sections/Showcase";
import { TrustedBy } from "@/components/sections/TrustedBy";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <Showcase />
        <Agents />
        <DeskScene />
        <Features />
        <HowItWorks />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </MotionConfig>
  );
}
