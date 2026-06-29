/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { useAuth } from './hooks/useAuth.ts';
import { BaseLayout } from './layouts/BaseLayout.tsx';
import { 
  Database, 
  ShieldCheck, 
  KeyRound, 
  Layers, 
  Activity, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  ArrowLeft,
  LayoutDashboard,
  ShieldAlert
} from 'lucide-react';

// Import our new Phase 4 World-Class Landing Page Components
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { Trust } from './components/Trust.tsx';
import { About } from './components/About.tsx';
import { WhyChooseUs } from './components/WhyChooseUs.tsx';
import { HowItWorks } from './components/HowItWorks.tsx';
import { VipPreview } from './components/VipPreview.tsx';
import { Stats } from './components/Stats.tsx';
import { Security } from './components/Security.tsx';
import { Faq } from './components/Faq.tsx';
import { Contact } from './components/Contact.tsx';
import { Footer } from './components/Footer.tsx';
import { AuthModal } from './components/AuthModal.tsx';
import { UserDashboard } from './components/Dashboard/index.tsx';
import { EnterpriseAdminDashboard } from './components/Admin/index.tsx';


/**
 * ORIGINAL CORE DASHBOARD VIEW (Preserved exactly as requested)
 */
function DashboardContent({ onBackToLanding }: { onBackToLanding: () => void }) {
  const { user, login, loading, error } = useAuth();
  const [email, setEmail] = useState('');

  const handleManualSync = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      login(email.trim());
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-4">
      {/* Back Header shortcut */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <button
          onClick={onBackToLanding}
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-gray-500 hover:text-blue-600 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Premium Public Page</span>
        </button>
        <span className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider">
          Enterprise Node Admin View
        </span>
      </div>

      {/* Title / Typography Pairing */}
      <div className="text-center md:text-left space-y-3">
        <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-100 rounded-full px-3 py-1 text-xs text-emerald-700 font-medium font-mono">
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-emerald-500" />
          <span>FinTech Core Architecture Successfully Bound</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-extrabold text-gray-950 tracking-tight leading-none">
          Enterprise CeFi Platform Foundation
        </h2>
        <p className="text-gray-500 max-w-2xl text-sm leading-relaxed">
          A production-grade, highly scalable full-stack architecture. Powered by an Express.js backend, 
          a Vite-React frontend, standard JWT authentication middleware, and a PostgreSQL database mapped via Drizzle ORM.
        </p>
      </div>

      {/* Main Grid: Info Bento Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: Postgres Database */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="font-display font-semibold text-gray-900 mb-2">
              PostgreSQL & Drizzle ORM
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Connection pooling configured securely. Schema is verified, optimized, and pushed to 
              Cloud SQL. Re-use safe prepared statements and index strategies.
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-50 flex items-center space-x-2 text-[10px] font-mono text-gray-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Schema: users table active</span>
          </div>
        </div>

        {/* Card 2: Security Middleware */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200">
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-display font-semibold text-gray-900 mb-2">
              Zero-Trust Security
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Pre-loaded with modular security middlewares for Helmet headers, CORS policy enforcement, 
              global rate limiting, and robust JWT verification structures.
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-50 flex items-center space-x-2 text-[10px] font-mono text-gray-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
            <span>Rate Limiting & Helmet: Active</span>
          </div>
        </div>

      </div>

      {/* Auth Synchronization Demonstration Card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-hidden relative">
        <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none hidden md:block">
          <Layers className="w-40 h-40 text-gray-950" />
        </div>

        <div className="max-w-xl space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-600">
              <KeyRound className="w-4 h-4" />
            </div>
            <h3 className="font-display font-semibold text-lg text-gray-950">
              Identity Synchronization Engine
            </h3>
          </div>

          <p className="text-gray-500 text-xs leading-relaxed">
            Test the live backend sync. Enter your email to issue a secure simulated JWT token and trigger 
            the server's profile synchronizer. The PostgreSQL database will upsert your user record and return 
            your verified platform identity.
          </p>

          {error && (
            <div className="p-3 bg-red-50 border border-red-100 text-red-700 text-xs rounded-xl font-mono">
              Authentication Sync Failed: {error}
            </div>
          )}

          {loading ? (
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <div className="w-4 h-4 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
              <span>Verifying secure connection details...</span>
            </div>
          ) : user ? (
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-3 font-mono text-left">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-gray-200/50">
                <span className="text-gray-400">Database Connection Status</span>
                <span className="text-emerald-500 font-bold flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mr-1" />
                  Synced
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-gray-400">Database Row ID: </span>
                  <span className="text-gray-900 font-bold">{user.id}</span>
                </div>
                <div>
                  <span className="text-gray-400">Platform Email: </span>
                  <span className="text-gray-700 font-medium">{user.email}</span>
                </div>
                <div>
                  <span className="text-gray-400">Authorization UID: </span>
                  <span className="text-gray-700 select-all">{user.uid}</span>
                </div>
                <div>
                  <span className="text-gray-400">Platform Role: </span>
                  <span className="text-emerald-600 font-bold">{user.role}</span>
                </div>
                <div>
                  <span className="text-gray-400">Created At: </span>
                  <span className="text-gray-500">{new Date(user.createdAt).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-400">Updated At: </span>
                  <span className="text-gray-500">{new Date(user.updatedAt).toLocaleString()}</span>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleManualSync} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="developer@cefi.platform"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-950 bg-white max-w-sm flex-grow"
                required
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-gray-900 text-white hover:bg-gray-800 rounded-xl text-xs font-semibold active:scale-95 transition-all duration-150 shadow-sm border border-gray-950 cursor-pointer"
              >
                <span>Trigger Secure Login & Database Sync</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Directory Diagnostics Summary */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
        <div className="flex items-center space-x-2 text-gray-950">
          <Activity className="w-4 h-4 text-emerald-500" />
          <h4 className="font-display font-semibold text-sm">Monorepo Directory Integrity Diagnostics</h4>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono text-left">
          <div className="p-3 bg-gray-50 border border-gray-100 rounded-xl">
            <span className="text-gray-400 block text-[10px] uppercase">Client Directory</span>
            <span className="text-gray-800 font-semibold">/client [OK]</span>
          </div>
          <div className="p-3 bg-gray-50 border border-gray-100 rounded-xl">
            <span className="text-gray-400 block text-[10px] uppercase">Server Directory</span>
            <span className="text-gray-800 font-semibold">/server [OK]</span>
          </div>
          <div className="p-3 bg-gray-50 border border-gray-100 rounded-xl">
            <span className="text-gray-400 block text-[10px] uppercase">Shared Directory</span>
            <span className="text-gray-800 font-semibold">/shared [OK]</span>
          </div>
          <div className="p-3 bg-gray-50 border border-gray-100 rounded-xl">
            <span className="text-gray-400 block text-[10px] uppercase">Database Schema</span>
            <span className="text-gray-800 font-semibold">Drizzle [OK]</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * MAIN APP CONTAINER WITH EMBEDDED PHASE 4 WEBSITE
 */
function MainAppContent() {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard' | 'admin'>('landing');
  const [activeSection, setActiveSection] = useState('hero');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  // Automatically navigate to the dashboard once successfully authenticated
  useEffect(() => {
    if (user && currentView === 'landing') {
      setCurrentView('dashboard');
    }
  }, [user, currentView]);

  // Section Tracking for Navbar Highlighter
  useEffect(() => {
    if (currentView !== 'landing') return;

    const sections = ['hero', 'about', 'benefits', 'how-it-works', 'vip-preview', 'security', 'faq', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160; // Offset for sticky navbar height
      
      for (const sId of sections) {
        const el = document.getElementById(`${sId}-section`) || document.getElementById(sId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const handleOpenAuth = (mode: 'login' | 'register') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleNavigateToSection = (sectionId: string) => {
    if (sectionId === 'dashboard-dev') {
      setCurrentView('dashboard');
      return;
    }

    setCurrentView('landing');
    setTimeout(() => {
      const el = document.getElementById(`${sectionId}-section`) || document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveSection(sectionId);
      }
    }, 50);
  };

  // Switch between public high-end landing page, user dashboard, and enterprise admin dashboard
  if (currentView === 'admin') {
    return (
      <EnterpriseAdminDashboard onBackToLanding={() => setCurrentView('landing')} />
    );
  }

  if (currentView === 'dashboard') {
    return (
      <UserDashboard onBackToLanding={() => setCurrentView('landing')} />
    );
  }


  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900 font-sans flex flex-col antialiased">
      
      {/* 1. Header (Navbar component) */}
      <Navbar 
        onOpenAuth={handleOpenAuth} 
        onNavigateToSection={handleNavigateToSection} 
        activeSection={activeSection}
      />

      {/* 2. Main content pages */}
      <main className="flex-grow">
        
        {/* Hero Section */}
        <div id="hero">
          <Hero 
            onOpenAuth={handleOpenAuth} 
            onNavigateToSection={handleNavigateToSection} 
          />
        </div>

        {/* Trust Section */}
        <div id="trust">
          <Trust />
        </div>

        {/* About Company Section */}
        <div id="about">
          <About />
        </div>

        {/* Why Choose Us Section */}
        <div id="benefits">
          <WhyChooseUs />
        </div>

        {/* How It Works Section */}
        <div id="how-it-works">
          <HowItWorks />
        </div>

        {/* VIP Preview Tiers Section */}
        <div id="vip-preview">
          <VipPreview onOpenAuth={handleOpenAuth} />
        </div>

        {/* Platform Statistics Section */}
        <div id="stats">
          <Stats />
        </div>

        {/* Security Highlights Section */}
        <div id="security">
          <Security />
        </div>

        {/* FAQs Section */}
        <div id="faq">
          <Faq />
        </div>

        {/* Contact Desk Section */}
        <div id="contact">
          <Contact />
        </div>

      </main>

      {/* 3. Footer */}
      <Footer onNavigateToSection={handleNavigateToSection} />

      {/* 4. Auth Modal Portal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialMode={authModalMode} 
      />

      {/* 5. Floating Quick-Link to original sync dashboard when authenticated */}
      {user && (
        <div className="fixed bottom-6 right-6 z-30 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setCurrentView('admin')}
            className="flex items-center space-x-2 px-5 py-3.5 bg-blue-600 text-white rounded-full text-xs font-bold hover:bg-blue-700 shadow-xl border border-blue-500 transition-all cursor-pointer transform hover:scale-105 active:scale-95"
            title="Open Enterprise Operations Console"
            id="floating-admin-shortcut"
          >
            <ShieldAlert className="w-4 h-4 text-white" />
            <span>Enterprise Operations Console</span>
          </button>

          <button
            onClick={() => setCurrentView('dashboard')}
            className="flex items-center space-x-2 px-5 py-3.5 bg-gray-950 text-white rounded-full text-xs font-bold hover:bg-gray-800 shadow-xl border border-gray-800 transition-all cursor-pointer transform hover:scale-105 active:scale-95"
            title="Open Developer Ledger Dashboard"
            id="floating-dashboard-shortcut"
          >
            <LayoutDashboard className="w-4 h-4 text-blue-400" />
            <span>Developer Core Dashboard</span>
          </button>
        </div>
      )}

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
}
