/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth.ts';
import { Shield, Menu, X, ArrowUpRight, LogOut, LayoutDashboard } from 'lucide-react';

interface NavbarProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
  onNavigateToSection: (sectionId: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth, onNavigateToSection, activeSection }) => {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Benefits', id: 'benefits' },
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'VIP Preview', id: 'vip-preview' },
    { label: 'Security', id: 'security' },
    { label: 'FAQ', id: 'faq' },
    { label: 'Support', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigateToSection(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-350 ease-in-out ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-md shadow-gray-100/40 border-b border-gray-100/80 py-3'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand Identity */}
          <button
            onClick={() => handleLinkClick('hero')}
            className="flex items-center space-x-2.5 text-left focus:outline-none group cursor-pointer"
            id="navbar-brand-logo"
          >
            <div className="bg-blue-600 text-white p-2 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <Shield className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <span className="font-display font-bold text-lg tracking-tight text-gray-950 block">
                CeFi Platform
              </span>
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block font-bold leading-none">
                Enterprise Capital
              </span>
            </div>
          </button>

          {/* Desktop Navigation list */}
          <div className="hidden lg:flex items-center space-x-1" id="navbar-desktop-menu">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                  activeSection === link.id
                    ? 'text-blue-600 bg-blue-50/50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Authentication Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3.5" id="navbar-auth-actions">
            {user ? (
              <div className="flex items-center space-x-3">
                {/* Logged in state info */}
                <div className="text-right">
                  <p className="text-[10px] font-mono text-gray-400 font-bold leading-none uppercase">Synced Account</p>
                  <p className="text-xs font-semibold text-gray-900 truncate max-w-[140px]">{user.email}</p>
                </div>

                {/* Dashboard Shortcut link */}
                <button
                  onClick={() => handleLinkClick('dashboard-dev')}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-900 text-xs font-semibold rounded-xl border border-gray-200 shadow-sm transition-all duration-150 cursor-pointer"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-blue-600" />
                  <span>Dashboard</span>
                </button>

                {/* Logout Button */}
                <button
                  onClick={logout}
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-150 cursor-pointer border border-transparent hover:border-red-100"
                  title="Sign Out Session"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-4 py-2 text-xs font-bold text-gray-700 hover:text-gray-900 cursor-pointer hover:bg-gray-50 rounded-xl transition-colors duration-150"
                  id="navbar-login-btn"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onOpenAuth('register')}
                  className="inline-flex items-center space-x-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 active:scale-95 transition-all duration-150 shadow-md shadow-blue-500/10 cursor-pointer"
                  id="navbar-register-btn"
                >
                  <span>Start Investing</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
              id="navbar-mobile-toggle-btn"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Slide */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden bg-white/95 backdrop-blur-lg border-b border-gray-100 px-4 pt-2 pb-6 space-y-2 absolute top-full left-0 right-0 shadow-lg"
          id="navbar-mobile-menu"
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all ${
                activeSection === link.id
                  ? 'text-blue-600 bg-blue-50/50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {link.label}
            </button>
          ))}

          {/* Mobile auth buttons */}
          <div className="pt-4 border-t border-gray-100 flex flex-col space-y-2.5">
            {user ? (
              <div className="space-y-3 px-4">
                <div className="text-left py-1">
                  <p className="text-[10px] font-mono text-gray-400 uppercase font-bold">Synced Session</p>
                  <p className="text-xs font-semibold text-gray-800 break-all">{user.email}</p>
                </div>
                <button
                  onClick={() => handleLinkClick('dashboard-dev')}
                  className="w-full inline-flex items-center justify-center space-x-2 px-4 py-3 bg-gray-50 hover:bg-gray-100 text-gray-900 text-xs font-bold rounded-xl border border-gray-200 transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4 text-blue-600" />
                  <span>Go to Core Dashboard</span>
                </button>
                <button
                  onClick={logout}
                  className="w-full inline-flex items-center justify-center space-x-2 px-4 py-3 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold rounded-xl border border-red-100 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Terminate Session</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 px-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAuth('login');
                  }}
                  className="py-3 text-center text-xs font-bold text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAuth('register');
                  }}
                  className="py-3 text-center text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-all"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
