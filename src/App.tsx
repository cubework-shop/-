import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileStickyCTA } from './components/layout/MobileStickyCTA';
import { ToastContainer } from './components/common/ToastContainer';
import { Hero } from './components/home/Hero';
import { BrandStory } from './components/home/BrandStory';
import { ServicesSection } from './components/home/ServicesSection';
import { PortfolioSection } from './components/home/PortfolioSection';
import { ProcessSection } from './components/home/ProcessSection';
import { TechAndEquipment } from './components/home/TechAndEquipment';
import { FaqSection } from './components/home/FaqSection';
import { ContactSection } from './components/home/ContactSection';
import { UploadPage } from './components/upload/UploadPage';
import { AdminCMS } from './components/admin/AdminCMS';

const MainAppContent: React.FC = () => {
  const { activeView, siteSettings } = useApp();

  // Sync document title and meta with dynamic settings
  useEffect(() => {
    if (siteSettings?.seo?.metaTitle) {
      document.title = siteSettings.seo.metaTitle;
    }
  }, [siteSettings]);

  if (activeView === 'admin') {
    return (
      <div className="min-h-screen bg-neutral-100 flex flex-col">
        <ToastContainer />
        <AdminCMS />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white pb-14 sm:pb-0">
      <ToastContainer />
      <Navbar />

      <main className="flex-1">
        {activeView === 'upload' ? (
          <UploadPage />
        ) : (
          <>
            <Hero />
            <BrandStory />
            <ServicesSection />
            <PortfolioSection />
            <ProcessSection />
            <TechAndEquipment />
            <FaqSection />
            <ContactSection />
          </>
        )}
      </main>

      <Footer />
      <MobileStickyCTA />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
