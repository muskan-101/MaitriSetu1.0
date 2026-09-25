'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MedicalRecord } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Lock, 
  Unlock, 
  FileText, 
  Building2, 
  User, 
  Stethoscope, 
  Eye, 
  Clock
} from 'lucide-react';
import Image from 'next/image';

export const ConsentMatrix: React.FC = () => {
  const { 
    language, 
    medicalRecords, 
    toggleCaregiverConsent, 
    toggleDoctorConsent 
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedRecordPreview, setSelectedRecordPreview] = useState<MedicalRecord | null>(null);

  const categories = [
    { id: 'all', labelEn: 'All Records', labelHi: 'सभी रिकॉर्ड' },
    { id: 'mcp', labelEn: 'MCP Card', labelHi: 'एमसीपी कार्ड' },
    { id: 'ultrasound', labelEn: 'Ultrasound Scans', labelHi: 'अल्ट्रासाउंड स्कैन' },
    { id: 'lab', labelEn: 'Lab Reports', labelHi: 'लैब रिपोर्ट' },
    { id: 'vaccine', labelEn: 'Vaccinations', labelHi: 'टीकाकरण' },
    { id: 'prescription', labelEn: 'Prescriptions', labelHi: 'दवा पर्चा' },
  ];

  const filteredRecords = medicalRecords.filter(r => 
    activeCategory === 'all' ? true : r.category === activeCategory
  );

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-teal-50 text-teal-700">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {language === 'en' ? 'Consent Matrix & Medical Records Vault' : 'मेडिकल रिकॉर्ड तिजोरी और सहमति मैट्रिक्स'}
            </h2>
          </div>
          <p className="text-sm text-slate-500 font-medium">
            {language === 'en'
              ? 'Patient-controlled time-stamped records. Toggle granular access for Caregivers and Doctors in real-time.'
              : 'समय-अंकित मेडिकल रिकॉर्ड। परिवार और डॉक्टरों के लिए लाइव पहुंच नियंत्रित करें।'}
          </p>
        </div>

        {/* Security Audit Badge */}
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl text-xs font-semibold text-emerald-800 self-start sm:self-auto">
          <Lock className="w-3.5 h-3.5 text-emerald-600" />
          <span>{language === 'en' ? '256-Bit Encrypted Audit Trail' : '256-बिट सुरक्षित ऑडिट ट्रेल'}</span>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition flex-shrink-0 ${
                isActive 
                  ? 'bg-teal-700 text-white shadow-xs' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {language === 'en' ? cat.labelEn : cat.labelHi}
            </button>
          );
        })}
      </div>

      {/* Records Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRecords.map((record) => (
          <motion.div
            key={record.id}
            whileHover={{ y: -4, boxShadow: '0px 10px 20px rgba(0,0,0,0.05)' }}
            className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between shadow-xs transition-all duration-200"
          >
            <div>
              {/* Record Top Info */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 border border-teal-100 flex-shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {language === 'en' ? record.titleEn : record.titleHi}
                    </h3>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {record.timestamp}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedRecordPreview(record)}
                  className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
                  title="Preview document"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Facility & Doctor info */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 mb-4 space-y-1 text-xs">
                <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                  <Building2 className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                  <span>{language === 'en' ? record.facilityEn : record.facilityHi}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                  <Stethoscope className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span>{record.doctorName}</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 font-medium line-clamp-2 mb-4">
                {language === 'en' ? record.summaryEn : record.summaryHi}
              </p>
            </div>

            {/* Granular Consent Controls Box */}
            <div className="pt-4 border-t border-slate-100 bg-slate-50/70 p-3.5 rounded-xl">
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-2.5 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                <span>{language === 'en' ? 'Granular Sharing Consent Controls:' : 'शेयरिंग अनुमति नियंत्रण:'}</span>
              </span>

              <div className="grid grid-cols-2 gap-3">
                
                {/* Caregiver Consent Toggle */}
                <button
                  onClick={() => toggleCaregiverConsent(record.id)}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition flex items-center justify-between gap-2 ${
                    record.sharedWithCaregiver
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <User className={`w-3.5 h-3.5 ${record.sharedWithCaregiver ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span>{language === 'en' ? 'Caregiver' : 'देखभालकर्ता'}</span>
                  </div>
                  {record.sharedWithCaregiver ? (
                    <span className="flex items-center gap-0.5 text-[10px] bg-emerald-600 text-white px-1.5 py-0.5 rounded-full font-extrabold">
                      <Unlock className="w-2.5 h-2.5" />
                      {language === 'en' ? 'ON' : 'चालू'}
                    </span>
                  ) : (
                    <span className="flex items-center gap-0.5 text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded-full font-extrabold">
                      <Lock className="w-2.5 h-2.5" />
                      {language === 'en' ? 'OFF' : 'बंद'}
                    </span>
                  )}
                </button>

                {/* Doctor Consent Toggle */}
                <button
                  onClick={() => toggleDoctorConsent(record.id)}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition flex items-center justify-between gap-2 ${
                    record.sharedWithDoctor
                      ? 'bg-teal-50 border-teal-300 text-teal-900 shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Stethoscope className={`w-3.5 h-3.5 ${record.sharedWithDoctor ? 'text-teal-600' : 'text-slate-400'}`} />
                    <span>{language === 'en' ? 'Doctor' : 'डॉक्टर'}</span>
                  </div>
                  {record.sharedWithDoctor ? (
                    <span className="flex items-center gap-0.5 text-[10px] bg-teal-600 text-white px-1.5 py-0.5 rounded-full font-extrabold">
                      <Unlock className="w-2.5 h-2.5" />
                      {language === 'en' ? 'ON' : 'चालू'}
                    </span>
                  ) : (
                    <span className="flex items-center gap-0.5 text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded-full font-extrabold">
                      <Lock className="w-2.5 h-2.5" />
                      {language === 'en' ? 'OFF' : 'बंद'}
                    </span>
                  )}
                </button>

              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Record Document Modal Preview */}
      <AnimatePresence>
        {selectedRecordPreview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-100 relative"
            >
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-teal-600" />
                  <h3 className="text-base font-bold text-slate-900">
                    {language === 'en' ? selectedRecordPreview.titleEn : selectedRecordPreview.titleHi}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedRecordPreview(null)}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800"
                >
                  ✕
                </button>
              </div>

              {/* Simulated Record Document View */}
              <div className="space-y-4">
                {selectedRecordPreview.previewImage && (
                  <div className="relative h-48 w-full rounded-xl overflow-hidden border border-slate-200">
                    <Image 
                      src={selectedRecordPreview.previewImage} 
                      alt="Document preview" 
                      fill 
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-[1px] flex items-center justify-center">
                      <span className="bg-white/90 text-slate-900 px-3 py-1.5 rounded-lg text-xs font-bold shadow-md flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-teal-600" />
                        {language === 'en' ? 'Verified Clinical Document' : 'सत्यापित क्लिनिकल रिपोर्ट'}
                      </span>
                    </div>
                  </div>
                )}

                <div className="bg-slate-50 p-4 rounded-xl space-y-2 text-xs">
                  <p className="font-bold text-slate-800">{selectedRecordPreview.facilityEn}</p>
                  <p className="text-slate-600">{selectedRecordPreview.summaryEn}</p>
                  <p className="text-slate-500 font-mono">Timestamp: {selectedRecordPreview.timestamp}</p>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedRecordPreview(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl"
                >
                  {language === 'en' ? 'Close Preview' : 'बंद करें'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
