import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import PollRow from "@/components/PollRow";
import HowItWorks from "@/components/HowItWorks";
import Regions from "@/components/Regions";
import QuizTeaser from "@/components/QuizTeaser";
import Studio from "@/components/Studio";
import Origin from "@/components/Origin";
import Privacy from "@/components/Privacy";
import Pricing from "@/components/Pricing";
import Faq from "@/components/Faq";
import Waitlist from "@/components/Waitlist";
import Footer from "@/components/Footer";
import Band, { BandGap } from "@/components/Band";

// Rhythm: dark hero → light → dark (purple quiz panel) → light → dark close.
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Band>
          <PollRow />
          <HowItWorks />
          <Regions />
        </Band>
        <BandGap />
        <QuizTeaser />
        <Studio />
        <Origin />
        <Privacy />
        <Band>
          <Pricing />
          <Faq />
        </Band>
        <BandGap />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
