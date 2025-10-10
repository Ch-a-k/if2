import HeroSection from '@/components/sections/HeroSection';
import MarqueeSection from '@/components/sections/MarqueeSection';
import AboutBriefSection from '@/components/sections/AboutBriefSection';
import ClutchAwardsSection from '@/components/sections/ClutchAwardsSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ValuesSection from '@/components/sections/ValuesSection';
import ApproachSection from '@/components/sections/ApproachSection';
import WorksSection from '@/components/sections/WorksSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import PartnersSection from '@/components/PartnersSection';
import CTASection from '@/components/sections/CTASection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <AboutBriefSection />
      <ClutchAwardsSection />
      <ServicesSection />
      <ValuesSection />
      <ApproachSection />
      <WorksSection />
      <TestimonialsSection />
      <PartnersSection />
      <CTASection />
    </>
  );
}
