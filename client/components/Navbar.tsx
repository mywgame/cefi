/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth.ts';
import { Shield, Menu, X, ArrowUpRight, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from './ui/index.ts';
import MetaFirmLogo from './Dashboard/MetaFirmLogo.tsx';

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
            className="flex items-center text-left focus:outline-none group cursor-pointer"
            id="navbar-brand-logo"
          >
            <MetaFirmLogo size="lg" />
          </button>

          {/* Desktop Navigation list */}
          <div className="hidden lg:flex items-center space-x-1" id="navbar-desktop-menu">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                aria-current={activeSection === link.id ? 'page' : undefined}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${
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
                  <p className="text-[10px] font-mono text-gray-400 font-bold leading-none uppercase font-sans">Synced Account</p>
                  <p className="text-xs font-semibold text-gray-900 truncate max-w-[140px]">{user.email}</p>
                </div>

                {/* Dashboard Shortcut link */}
                <Button
                  onClick={() => handleLinkClick('dashboard-dev')}
                  variant="secondary"
                  size="sm"
                  leftIcon={<LayoutDashboard className="w-3.5 h-3.5 text-blue-600" />}
                >
                  Dashboard
                </Button>

                {/* Logout Button */}
                <Button
                  onClick={logout}
                  variant="ghost"
                  size="icon"
                  className="text-gray-500 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100"
                  title="Sign Out Session"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <>
                <Button
                  onClick={() => onOpenAuth('login')}
                  variant="ghost"
                  size="md"
                  id="navbar-login-btn"
                >
                  Sign In
                </Button>
                
                <Button
                  onClick={() => onOpenAuth('register')}
                  variant="primary"
                  size="md"
                  rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
                  id="navbar-register-btn"
                >
                  Start Investing
                </Button>
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
                
                <Button
                  onClick={() => handleLinkClick('dashboard-dev')}
                  variant="secondary"
                  className="w-full justify-center"
                  leftIcon={<LayoutDashboard className="w-4 h-4 text-blue-600" />}
                >
                  Go to Core Dashboard
                </Button>

                <Button
                  onClick={logout}
                  variant="danger"
                  className="w-full justify-center"
                  leftIcon={<LogOut className="w-4 h-4" />}
                >
                  Terminate Session
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 px-2">
                <Button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAuth('login');
                  }}
                  variant="secondary"
                  size="md"
                >
                  Sign In
                </Button>

                <Button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAuth('register');
                  }}
                  variant="primary"
                  size="md"
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
