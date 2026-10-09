import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Poll from "@/components/Poll";
import Problem from "@/components/Problem";
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

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Poll />
        <Problem />
        <HowItWorks />
        <Regions />
        <QuizTeaser />
        <Studio />
        <Origin />
        <Privacy />
        <Pricing />
        <Faq />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
