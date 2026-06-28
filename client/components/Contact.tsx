/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Clock, MapPin, Phone, Send, ShieldCheck } from 'lucide-react';
import { contactDetails } from '../utils/landingData.ts';
import { Input, Textarea, Button, SuccessState, Card } from './ui/index.ts';

export const Contact: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim() && message.trim()) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setName('');
        setEmail('');
        setMessage('');
      }, 3000);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-gradient-to-b from-gray-50/50 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Corporate Directory Details */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="space-y-3">
              <span className="text-[10px] font-mono text-blue-600 uppercase font-bold tracking-widest block">
                Corporate Communications
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-gray-950 tracking-tight leading-none">
                Establish Connection
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-sans">
                Our global institutional desks are active 24/7. Reach out directly to receive priority onboarding files, 
                OTC custom rates, or technical ledger integrations.
              </p>
            </div>

            {/* List Details Card */}
            <Card hoverEffect={false} id="contact-details-card" className="space-y-6">
              
              {/* Working Hours */}
              <div className="flex items-start space-x-4">
                <div className="p-2.5 rounded-2xl bg-white border border-gray-100/80 text-blue-600 shadow-xs">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-gray-400 font-bold uppercase block">Support Desk Hours</span>
                  <p className="text-xs font-bold text-gray-950 leading-tight">
                    {contactDetails.workingHours}
                  </p>
                </div>
              </div>

              {/* Support Email */}
              <div className="flex items-start space-x-4">
                <div className="p-2.5 rounded-2xl bg-white border border-gray-100/80 text-blue-600 shadow-xs">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-gray-400 font-bold uppercase block">General & Technical Support</span>
                  <a href={`mailto:${contactDetails.supportEmail}`} className="text-xs font-bold text-blue-600 hover:underline leading-tight block">
                    {contactDetails.supportEmail}
                  </a>
                </div>
              </div>

              {/* Business Mail */}
              <div className="flex items-start space-x-4">
                <div className="p-2.5 rounded-2xl bg-white border border-gray-100/80 text-blue-600 shadow-xs">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-gray-400 font-bold uppercase block">Institutional Partnerships</span>
                  <a href={`mailto:${contactDetails.businessEmail}`} className="text-xs font-bold text-blue-600 hover:underline leading-tight block">
                    {contactDetails.businessEmail}
                  </a>
                </div>
              </div>

              {/* Telephone */}
              <div className="flex items-start space-x-4">
                <div className="p-2.5 rounded-2xl bg-white border border-gray-100/80 text-blue-600 shadow-xs">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-gray-400 font-bold uppercase block">Secure Hotline Desk</span>
                  <p className="text-xs font-bold text-gray-950 leading-tight">
                    {contactDetails.phonePlaceholder}
                  </p>
                </div>
              </div>

              {/* Physical Office Placeholder */}
              <div className="flex items-start space-x-4">
                <div className="p-2.5 rounded-2xl bg-white border border-gray-100/80 text-blue-600 shadow-xs">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-gray-400 font-bold uppercase block">Future Corporate office Locations</span>
                  <p className="text-xs font-bold text-gray-950 leading-tight font-sans">
                    {contactDetails.officeLocationPlaceholder}
                  </p>
                </div>
              </div>

            </Card>
          </div>

          {/* Right Column: Visual Enquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-[32px] p-8 border border-gray-100/80 shadow-[0_24px_60px_rgba(0,0,0,0.03)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.05)] transition-all duration-300 text-left w-full">
            <h3 className="font-display font-bold text-gray-950 text-lg mb-2">Corporate Inquiry Portal</h3>
            <p className="text-xs text-gray-500 mb-6 font-sans">
              Submit your specific investment constraints or referral questions below to initiate secure communications.
            </p>

            {formSubmitted ? (
              <SuccessState
                title="Inquiry Transmitted Successfully"
                description="We have successfully registered your ticket under a secure hashing envelope. A priority partner manager will email you shortly."
              />
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4" id="contact-form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                  
                  <Input
                    label="Corporate Representative Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alexander Mercer"
                    id="contact-name"
                    required
                  />

                  <Input
                    label="Corporate Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="mercer@capstone-funds.com"
                    id="contact-email"
                    required
                  />
                  
                </div>

                <Textarea
                  label="Specific Inquiry Details"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Provide details on target investment scale, regional licensing requirements, or partnership team plans..."
                  id="contact-message"
                  required
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  rightIcon={<Send className="w-4 h-4" />}
                >
                  Transmit Encrypted Inquiry
                </Button>

                {/* Guarantee badge */}
                <div className="flex items-center justify-center space-x-1.5 text-[10px] font-mono text-gray-400 font-semibold pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                  <span>Your communications are fully encrypted and confidential. No marketing solicitation is sent.</span>
                </div>
              </form>
            )}

          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
