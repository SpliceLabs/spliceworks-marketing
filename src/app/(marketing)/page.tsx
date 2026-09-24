import type { Metadata } from "next";
import { HomeHero } from "@/components/HomeHero";
import { ArtifactSection } from "@/components/ArtifactSection";
import { CapabilitiesSection } from "@/components/CapabilitiesSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { OperatingModelSection } from "@/components/OperatingModelSection";
import { HomeCta } from "@/components/HomeCta";
import { FadeInOnScroll } from "@/providers/ParallaxProvider";

export const metadata: Metadata = {
  title: "Splice Works - Turn your company AI-native",
  description:
    "We turn your company AI-native, then leave you Hestia to run it yourself — built on Splice Station, the governed infrastructure underneath.",
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <FadeInOnScroll delay={100}>
        <ArtifactSection />
      </FadeInOnScroll>
      <FadeInOnScroll delay={50}>
        <CapabilitiesSection />
      </FadeInOnScroll>
      <FadeInOnScroll delay={50}>
        <HowItWorksSection />
      </FadeInOnScroll>
      <FadeInOnScroll delay={50}>
        <OperatingModelSection />
      </FadeInOnScroll>
      <HomeCta />
    </>
  );
}
