'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_MILESTONES } from '../data/mockData';
import { Milestone } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  Clock, 
  Calendar, 
  ChevronDown, 
  FileText, 
  Sparkles, 
  Utensils, 
  Activity, 
  Stethoscope, 
  Share2,
  Lock,
  MessageSquare
} from 'lucide-react';
import Image from 'next/image';

export const HealthJourneyVisualizer: React.FC = () => {
  const { language, medicalRecords, setWhatsappDrawerOpen, setActiveWhatsappScenario } = useApp();
  const [expandedId, setExpandedId] = useState<string>('m2');

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? '' : id));
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
      
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-teal-50 text-teal-700">
              <Activity className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {language === 'en' ? 'Personalized Health Journey Visualizer' : 'व्यक्तिगत स्वास्थ्य यात्रा चित्रलेख'}
            </h2>
          </div>
          <p className="text-sm text-slate-500 font-medium">
            {language === 'en' 
              ? 'Real-time maternal timeline mapping current stage, upcoming clinical follow-ups, and past verified reports.' 
              : 'वर्तमान चरण, आगामी क्लिनिकल परामर्श और पिछले सत्यापित रिपोर्टों का लाइव मानचित्रण।'}
          </p>
        </div>

        {/* Current Stage Quick Pill */}
        <div className="flex items-center gap-3 bg-teal-50/80 border border-teal-200/80 px-4 py-2.5 rounded-2xl shadow-xs self-start sm:self-auto">
          <div className="w-3 h-3 rounded-full bg-teal-500 animate-ping" />
          <div>
            <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider block">
              {language === 'en' ? 'Active Stage' : 'वर्तमान चरण'}
            </span>
            <span className="text-sm font-bold text-teal-950">
              {language === 'en' ? 'Trimester 2 (Week 20)' : 'दूसरी तिमाही (सप्ताह 20)'}
            </span>
          </div>
        </div>
      </div>

      {/* Stepper Timeline Container */}
      <div className="relative pl-4 sm:pl-8 border-l-2 border-slate-200 space-y-6">
        {INITIAL_MILESTONES.map((item: Milestone) => {
          const isExpanded = expandedId === item.id;
          const isCompleted = item.status === 'completed';
          const isCurrent = item.status === 'current';

          return (
            <motion.div
              key={item.id}
              layout
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              className="relative"
            >
              {/* Timeline Indicator Badge */}
              <div 
                className={`absolute -left-[25px] sm:-left-[41px] top-1.5 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-4 border-white shadow-md transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-teal-600 text-white' 
                    : isCurrent 
                    ? 'bg-rose-500 text-white ring-4 ring-rose-100' 
                    : 'bg-slate-100 text-slate-400 border-slate-200'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : isCurrent ? (
                  <Sparkles className="w-5 h-5 animate-pulse" />
                ) : (
                  <Clock className="w-4 h-4" />
                )}
              </div>

              {/* Card Container */}
              <motion.div
                whileHover={{ y: -4, boxShadow: '0px 10px 20px rgba(0,0,0,0.05)' }}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isCurrent 
                    ? 'bg-gradient-to-br from-teal-50/50 via-white to-rose-50/30 border-teal-300 shadow-md ring-1 ring-teal-200' 
                    : 'bg-white border-slate-200/90 shadow-xs'
                }`}
              >
                {/* Collapsible Card Header */}
                <button
                  onClick={() => toggleExpand(item.id)}
                  className="w-full text-left p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 focus:outline-none"
                >
                  <div className="flex items-start gap-4">
                    {/* Stage Thumbnail */}
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-inner flex-shrink-0 hidden sm:block border border-slate-100">
                      <Image 
                        src={item.image} 
                        alt={item.titleEn} 
                        fill 
                        className="object-cover"
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                          isCompleted ? 'bg-teal-100 text-teal-800' : isCurrent ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {language === 'en' ? item.periodEn : item.periodHi}
                        </span>
                        <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {item.date}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                        {language === 'en' ? item.titleEn : item.titleHi}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        {language === 'en' ? item.subtitleEn : item.subtitleHi}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    {isCurrent && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-rose-500 text-white shadow-xs animate-bounce">
                        {language === 'en' ? 'Active Now' : 'वर्तमान'}
                      </span>
                    )}
                    <div className={`p-2 rounded-xl transition-transform duration-300 ${isExpanded ? 'bg-teal-100 text-teal-800 rotate-180' : 'bg-slate-100 text-slate-600'}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </button>

                {/* Expanded Details Body */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-slate-100 px-5 py-6 bg-slate-50/50 space-y-6"
                    >
                      {/* Summary Description */}
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                        {language === 'en' ? item.descriptionEn : item.descriptionHi}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        {/* Required Clinical Tests */}
                        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
                          <div className="flex items-center gap-2 text-teal-700 font-bold text-xs sm:text-sm mb-3">
                            <Stethoscope className="w-4 h-4" />
                            <span>{language === 'en' ? 'Required Clinical Tests & Vaccines' : 'आवश्यक क्लिनिकल टेस्ट और टीके'}</span>
                          </div>
                          <ul className="space-y-2">
                            {(language === 'en' ? item.requiredTestsEn : item.requiredTestsHi).map((test, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5" />
                                <span>{test}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Nutrition & Care Guidelines */}
                        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
                          <div className="flex items-center gap-2 text-rose-700 font-bold text-xs sm:text-sm mb-3">
                            <Utensils className="w-4 h-4" />
                            <span>{language === 'en' ? 'Nutrition & Dietary Guidelines' : 'पोषण और आहार संबंधी मार्गदर्शन'}</span>
                          </div>
                          <ul className="space-y-2">
                            {(language === 'en' ? item.nutritionAdviceEn : item.nutritionAdviceHi).map((nut, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5" />
                                <span>{nut}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Doctor Notes (if present) */}
                      {item.doctorNotesEn && (
                        <div className="bg-amber-50/80 border border-amber-200 p-4 rounded-xl flex items-start gap-3">
                          <Stethoscope className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="text-xs font-bold text-amber-900 block mb-0.5">
                              {language === 'en' ? 'Doctor Notes' : 'डॉक्टर की सलाह'}
                            </span>
                            <p className="text-xs text-amber-800 font-medium">
                              {language === 'en' ? item.doctorNotesEn : item.doctorNotesHi}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Verified Reports Linked */}
                      {item.linkedRecordIds && item.linkedRecordIds.length > 0 && (
                        <div className="pt-2">
                          <span className="text-xs font-bold text-slate-700 block mb-2">
                            {language === 'en' ? 'Verified Linked Medical Records:' : 'सत्यापित संलग्न मेडिकल रिकॉर्ड:'}
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {item.linkedRecordIds.map((recId) => {
                              const rec = medicalRecords.find(r => r.id === recId);
                              if (!rec) return null;
                              return (
                                <div key={recId} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-teal-200 text-xs font-medium text-slate-800 shadow-xs">
                                  <FileText className="w-3.5 h-3.5 text-teal-600" />
                                  <span>{language === 'en' ? rec.titleEn : rec.titleHi}</span>
                                  {rec.sharedWithDoctor ? (
                                    <span className="text-[10px] bg-teal-100 text-teal-800 px-1.5 py-0.5 rounded font-semibold flex items-center gap-0.5">
                                      <Share2 className="w-2.5 h-2.5" />
                                      {language === 'en' ? 'Shared' : 'साझा'}
                                    </span>
                                  ) : (
                                    <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-semibold flex items-center gap-0.5">
                                      <Lock className="w-2.5 h-2.5" />
                                      {language === 'en' ? 'Private' : 'निजी'}
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Action CTA */}
                      <div className="flex items-center justify-end gap-3 pt-2">
                        <button
                          onClick={() => {
                            setActiveWhatsappScenario('reminder');
                            setWhatsappDrawerOpen(true);
                          }}
                          className="px-4 py-2 text-xs font-semibold text-teal-700 bg-teal-50 border border-teal-200 hover:bg-teal-100 rounded-xl transition flex items-center gap-1.5"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>{language === 'en' ? 'Set WhatsApp Reminder' : 'व्हाट्सएप रिमाइंड सेट करें'}</span>
                        </button>
                      </div>

                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
