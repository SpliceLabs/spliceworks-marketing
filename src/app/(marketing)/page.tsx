import type { Metadata } from "next";
import { HomeHero } from "@/components/HomeHero";
import { WhoThisIsFor } from "@/components/WhoThisIsFor";
import { TwoStepPath } from "@/components/TwoStepPath";
import { ArtifactSection } from "@/components/ArtifactSection";
import { CapabilitiesSection } from "@/components/CapabilitiesSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { OperatingModelSection } from "@/components/OperatingModelSection";
import { HomeCta } from "@/components/HomeCta";
import { FadeInOnScroll } from "@/providers/ParallaxProvider";

export const metadata: Metadata = {
  title: "Splice Works - AI that works, people who answer for it",
  description:
    "Everything your company knows feeds one shared Brain your people use every day. From there, Station puts it to work through governed agents — yours to run, never locked in.",
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <FadeInOnScroll delay={100}>
        <WhoThisIsFor />
      </FadeInOnScroll>
      <FadeInOnScroll delay={50}>
        <TwoStepPath />
      </FadeInOnScroll>
      <FadeInOnScroll delay={50}>
        <CapabilitiesSection />
      </FadeInOnScroll>
      <FadeInOnScroll delay={50}>
        <HowItWorksSection />
      </FadeInOnScroll>
      <FadeInOnScroll delay={50}>
        <ArtifactSection />
      </FadeInOnScroll>
      <FadeInOnScroll delay={50}>
        <OperatingModelSection />
      </FadeInOnScroll>
      <HomeCta />
    </>
  );
}
