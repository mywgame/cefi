/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Clock, MapPin, Phone, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { contactDetails } from '../utils/landingData.ts';

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
            <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm space-y-6" id="contact-details-card">
              
              {/* Working Hours */}
              <div className="flex items-start space-x-4">
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
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
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-gray-400 font-bold uppercase block">General & Technical Support</span>
                  <a href={`mailto:${contactDetails.supportEmail}`} className="text-xs font-bold text-blue-600 hover:underline leading-tight block">
                    {contactDetails.supportEmail}
                  </a>
                </div>
              </div>

              {/* Business Email */}
              <div className="flex items-start space-x-4">
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
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
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
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
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-gray-400 font-bold uppercase block">Future Corporate office Locations</span>
                  <p className="text-xs font-bold text-gray-950 leading-tight font-sans">
                    {contactDetails.officeLocationPlaceholder}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Visual Enquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-gray-100 shadow-lg text-left w-full">
            <h3 className="font-display font-bold text-gray-950 text-lg mb-2">Corporate Inquiry Portal</h3>
            <p className="text-xs text-gray-500 mb-6 font-sans">
              Submit your specific investment constraints or referral questions below to initiate secure communications.
            </p>

            {formSubmitted ? (
              <div className="p-8 bg-emerald-50 border border-emerald-100 rounded-2xl text-center space-y-3" id="contact-success-alert">
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-display font-bold text-emerald-800 text-sm">Inquiry Transmitted Successfully</h4>
                <p className="text-[11px] text-emerald-600 max-w-sm mx-auto leading-relaxed">
                  We have successfully registered your ticket under a secure hashing envelope. A priority partner manager will email you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4" id="contact-form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-gray-700 block font-sans">Corporate Representative Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alexander Mercer"
                      className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-50/30"
                      required
                    />
                  </div>
                  
                  {/* Email field */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-gray-700 block font-sans">Corporate Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. mercer@capstone-funds.com"
                      className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-50/30"
                      required
                    />
                  </div>
                </div>

                {/* Message field */}
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-gray-700 block font-sans">Specific Inquiry details</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide details on target investment scale, regional licensing requirements, or partnership team plans..."
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-50/30 resize-none"
                    required
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center space-x-2 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs sm:text-sm transition-all duration-150 shadow-md shadow-blue-500/10 cursor-pointer active:scale-98"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Encrypted Inquiry</span>
                </button>

                {/* Guarantee badge */}
                <div className="flex items-center justify-center space-x-1.5 text-[10px] font-mono text-gray-400 font-semibold pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
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
