'use client';

import React from 'react';
import Image from 'next/image';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { 
  User, 
  HeartHandshake, 
  Stethoscope, 
  Globe, 
  MessageSquare, 
  AlertTriangle,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'framer-motion';

export const Header: React.FC = () => {
  const { 
    role, 
    setRole, 
    language, 
    setLanguage, 
    setWhatsappDrawerOpen,
    triggerEmergencySos
  } = useApp();

  const roles: { id: UserRole; labelEn: string; labelHi: string; icon: React.ReactNode }[] = [
    { id: 'patient', labelEn: 'Patient', labelHi: 'मरीज (मां)', icon: <User className="w-4 h-4" /> },
    { id: 'caregiver', labelEn: 'Caregiver', labelHi: 'देखभालकर्ता (परिवार)', icon: <HeartHandshake className="w-4 h-4" /> },
    { id: 'doctor', labelEn: 'Doctor', labelHi: 'डॉक्टर (चिकित्सक)', icon: <Stethoscope className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 glass-header shadow-xs transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Left: Logo & Title with Pink to Blue gradient */}
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-2xl overflow-hidden shadow-sm bg-white p-1 border border-teal-100 flex items-center justify-center">
            <Image 
              src="/logo.png" 
              alt="MatriSetu Logo" 
              width={44} 
              height={44} 
              priority
              className="object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-blue-600 bg-clip-text text-transparent tracking-tight">
                MatriSetu
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-50 text-teal-700 border border-teal-200">
                <ShieldCheck className="w-3 h-3 mr-1 text-teal-600" />
                Bharat Care
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              {language === 'en' ? 'Maternal & Child Healthcare Navigator' : 'मातृ एवं शिशु स्वास्थ्य मार्गदर्शन सेतु'}
            </p>
          </div>
        </div>

        {/* Center: Role Switcher Pill */}
        <div className="hidden md:flex items-center bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80 shadow-inner">
          {roles.map((r) => {
            const isActive = role === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setRole(r.id)}
                className={`relative px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-2 transition-all duration-200 ${
                  isActive 
                    ? 'text-teal-950 font-extrabold' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeRoleBg"
                    className="absolute inset-0 bg-white rounded-xl shadow-xs border border-teal-200/60"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <span className={isActive ? 'text-teal-600' : 'text-slate-400'}>{r.icon}</span>
                  {language === 'en' ? r.labelEn : r.labelHi}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Controls: Language, WhatsApp Drawer, Emergency SOS */}
        <div className="flex items-center gap-2.5">
          {/* Mobile Role Dropdown */}
          <div className="md:hidden">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="bg-slate-100 text-xs font-semibold text-slate-700 px-2 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="patient">Patient</option>
              <option value="caregiver">Caregiver</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>

          {/* Multilingual Toggle */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition shadow-2xs"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-teal-600" />
            <span>{language === 'en' ? 'हिंदी' : 'English'}</span>
          </button>

          {/* WhatsApp Simulator Drawer Button */}
          <button
            onClick={() => setWhatsappDrawerOpen(true)}
            className="relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition shadow-xs"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {language === 'en' ? 'WhatsApp Alerts' : 'व्हाट्सएप अलर्ट'}
            </span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-300"></span>
            </span>
          </button>

          {/* Emergency SOS Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={triggerEmergencySos}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition shadow-md border border-rose-500 animate-pulse-subtle"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-white" />
            <span>{language === 'en' ? 'SOS' : 'आपातकाल'}</span>
          </motion.button>
        </div>

      </div>
    </header>
  );
};
