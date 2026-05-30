import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import TrustedCompanies from '../components/TrustedCompanies';
import Features from '../components/Features';
import DashboardPreview from '../components/DashboardPreview';
import AutomationSection from '../components/AutomationSection';
import MessagingPlatforms from '../components/MessagingPlatforms';
import InventoryFinanceSection from '../components/InventoryFinanceSection';
import AnalyticsSection from '../components/AnalyticsSection';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      {/* Top Navbar */}
      {/* <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#050816]/80 backdrop-blur-md border-b border-white/10">
        <span className="font-bold text-xl text-white">MessagePro</span>
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="px-5 py-2 rounded-xl text-sm font-medium text-gray-300 hover:text-white transition"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="px-5 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-400 to-violet-500 text-black hover:scale-[1.03] transition-all duration-300"
          >
            Get Started
          </Link>
        </div>
      </nav> */}

      {/* Add pt-16 so content isn't hidden behind the fixed navbar */}
      <div className="pt-16">
        <Hero />
        <TrustedCompanies />
        <Features />
        <DashboardPreview />
        <AutomationSection />
        <MessagingPlatforms />
        <InventoryFinanceSection />
        <AnalyticsSection />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTASection />
        <Footer />
      </div>
    </>
  );
}