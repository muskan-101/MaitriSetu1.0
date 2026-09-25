'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { HealthJourneyVisualizer } from '../components/HealthJourneyVisualizer';
import { SchemeNavigator } from '../components/SchemeNavigator';
import { ConsentMatrix } from '../components/ConsentMatrix';
import { WhatsAppSimulatorDrawer } from '../components/WhatsAppSimulatorDrawer';
import { CaregiverDashboard } from '../components/CaregiverDashboard';
import { DoctorDashboard } from '../components/DoctorDashboard';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Building2, 
  ShieldCheck, 
  Sparkles, 
  Heart, 
  PhoneCall, 
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const { role, language, triggerEmergencySos } = useApp();
  const [activeTab, setActiveTab] = useState<'timeline' | 'schemes' | 'records'>('timeline');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/60">
      
      {/* Sticky Header with logo and role switcher */}
      <Header />

      {/* Main Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        <motion.div
          key={role}
          initial={mounted ? { opacity: 0, y: 10 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Role: Patient View */}
          {role === 'patient' && (
            <>
              {/* Landing Page Hero Box - Styled with a slightly Pinkish Theme */}
              <div className="bg-gradient-to-br from-pink-950 via-rose-900 to-pink-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-pink-800/40">
                
                {/* Soft Pink Ambient Glows */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Left details */}
                  <div className="lg:col-span-8 space-y-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-pink-200 border border-white/10 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-pink-300" />
                        {language === 'en' ? 'Personalized Journey' : 'व्यक्तिगत स्वास्थ्य कार्ड'}
                      </span>
                      <span className="bg-pink-500/20 text-pink-200 px-3 py-1 rounded-full text-xs font-bold border border-pink-400/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {language === 'en' ? 'Low Risk Status (Hb: 11.4 g/dL)' : 'कम जोखिम स्थिति'}
                      </span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                      {language === 'en' ? 'Namaste Sunita Devi' : 'नमस्ते सुनीता देवी'}
                    </h1>

                    <p className="text-sm sm:text-base text-pink-100 font-medium max-w-2xl leading-relaxed">
                      {language === 'en' 
                        ? 'You are at Week 20 of Trimester 2. Your baby is growing healthy! Upcoming consultation: Level II Anomaly Ultrasound Scan & TT-2 vaccine.' 
                        : 'आप दूसरी तिमाही के 20वें सप्ताह में हैं। आपका शिशु स्वस्थ रूप से बढ़ रहा है! आगामी परामर्श: एनोमली स्कैन और टीटी टीका।'}
                    </p>

                    {/* Progress Bar */}
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 space-y-2 max-w-xl">
                      <div className="flex justify-between text-xs font-bold text-pink-100">
                        <span>{language === 'en' ? 'Pregnancy Progress (Trimester 2)' : 'गर्भावस्था प्रगति (दूसरी तिमाही)'}</span>
                        <span>50% (Week 20 of 40)</span>
                      </div>
                      <div className="w-full bg-pink-950/80 rounded-full h-3 p-0.5 border border-pink-700/50">
                        <div className="bg-gradient-to-r from-pink-400 to-rose-400 h-2 rounded-full w-1/2 transition-all duration-500 shadow-xs" />
                      </div>
                    </div>

                    {/* Quick CTAs */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        onClick={() => setActiveTab('timeline')}
                        className="px-5 py-2.5 rounded-xl bg-white text-rose-950 font-extrabold text-xs shadow-md hover:bg-rose-50 transition flex items-center gap-1.5"
                      >
                        <Activity className="w-4 h-4 text-rose-600" />
                        <span>{language === 'en' ? 'View Health Timeline' : 'स्वास्थ्य टाइमलाइन देखें'}</span>
                      </button>

                      <button
                        onClick={() => setActiveTab('schemes')}
                        className="px-5 py-2.5 rounded-xl bg-pink-900/80 hover:bg-pink-900 text-white font-bold text-xs border border-pink-700/60 transition flex items-center gap-1.5"
                      >
                        <Building2 className="w-4 h-4 text-pink-300" />
                        <span>{language === 'en' ? 'Check Eligible Schemes' : 'सरकारी योजनाएं देखें'}</span>
                      </button>

                      <button
                        onClick={triggerEmergencySos}
                        className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md border border-rose-500 transition flex items-center gap-1.5"
                      >
                        <AlertTriangle className="w-4 h-4" />
                        <span>{language === 'en' ? 'Emergency 108 SOS' : 'आपातकालीन एसओएस'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Right Realistic Photography Asset */}
                  <div className="lg:col-span-4 flex justify-center">
                    <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl">
                      <Image 
                        src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80"
                        alt="Indian Mother and Healthcare Navigation"
                        fill
                        priority
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-pink-950/80 via-transparent to-transparent flex items-end p-4">
                        <div className="text-white text-xs">
                          <p className="font-bold flex items-center gap-1">
                            <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
                            <span>{language === 'en' ? 'Mother & Child Protection (MCP)' : 'मां-बच्चा सुरक्षा'}</span>
                          </p>
                          <p className="text-[10px] text-pink-200">Ayushman Bharat Digital Health (ABHA) Linked</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Navigation Tabs for Patient Modules */}
              <div className="flex items-center justify-center sm:justify-start gap-2 border-b border-slate-200 pb-1">
                <button
                  onClick={() => setActiveTab('timeline')}
                  className={`px-5 py-3 text-xs sm:text-sm font-bold rounded-2xl transition flex items-center gap-2 ${
                    activeTab === 'timeline' 
                      ? 'bg-teal-700 text-white shadow-md' 
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Activity className="w-4 h-4" />
                  <span>{language === 'en' ? 'Health Journey Visualizer' : 'स्वास्थ्य यात्रा टाइमलाइन'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('schemes')}
                  className={`px-5 py-3 text-xs sm:text-sm font-bold rounded-2xl transition flex items-center gap-2 ${
                    activeTab === 'schemes' 
                      ? 'bg-teal-700 text-white shadow-md' 
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>{language === 'en' ? 'Government Scheme Navigator' : 'सरकारी योजना पोर्टल'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('records')}
                  className={`px-5 py-3 text-xs sm:text-sm font-bold rounded-2xl transition flex items-center gap-2 ${
                    activeTab === 'records' 
                      ? 'bg-teal-700 text-white shadow-md' 
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{language === 'en' ? 'Consent Matrix & Records' : 'मेडिकल रिकॉर्ड सहमति तिजोरी'}</span>
                </button>
              </div>

              {/* Render Active Tab Component */}
              <div>
                {activeTab === 'timeline' && <HealthJourneyVisualizer />}
                {activeTab === 'schemes' && <SchemeNavigator />}
                {activeTab === 'records' && <ConsentMatrix />}
              </div>
            </>
          )}

          {/* Role: Caregiver View */}
          {role === 'caregiver' && <CaregiverDashboard />}

          {/* Role: Doctor View */}
          {role === 'doctor' && <DoctorDashboard />}

        </motion.div>

      </main>

      {/* WhatsApp Simulator Drawer */}
      <WhatsAppSimulatorDrawer />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 relative">
              <Image src="/logo.png" alt="MatriSetu" fill className="object-contain" />
            </div>
            <div>
              <p className="font-bold text-slate-800">MatriSetu Healthcare Navigation Platform</p>
              <p className="text-[11px]">Empowering Maternal & Child Health across Rural and Urban India.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 font-semibold">
            <span className="flex items-center gap-1 text-rose-600">
              <PhoneCall className="w-3.5 h-3.5" />
              108 Emergency Ambulance
            </span>
            <span>•</span>
            <span className="text-teal-700">102 Janani Express</span>
            <span>•</span>
            <span className="text-teal-800">104 Health Helpline</span>
          </div>

        </div>
      </footer>

    </div>
  );
}
