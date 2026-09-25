'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Stethoscope, 
  ShieldCheck, 
  FileText, 
  Plus, 
  Send, 
  CheckCircle2
} from 'lucide-react';

export const DoctorDashboard: React.FC = () => {
  const { language, medicalRecords, setWhatsappDrawerOpen, setActiveWhatsappScenario } = useApp();
  const [newNote, setNewNote] = useState<string>('');
  const [notesList, setNotesList] = useState<string[]>([
    'Patient instructed to continue IFA supplements daily.',
    'Anomaly scan shows clear fetal anatomy. FHR 142 bpm.'
  ]);

  const doctorSharedRecords = medicalRecords.filter(r => r.sharedWithDoctor);

  const addNote = () => {
    if (newNote.trim()) {
      setNotesList(prev => [newNote.trim(), ...prev]);
      setNewNote('');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Doctor Header Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30">
                <Stethoscope className="w-5 h-5" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
                {language === 'en' ? 'Physician Clinical Portal' : 'चिकित्सक क्लिनिकल पोर्टल'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Dr. Ananya Sharma, MD (Obstetrics & Gynecology)
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
              District Women Hospital • Reg No: MCI-2018-94821
            </p>
          </div>

          <div className="bg-teal-950/60 border border-teal-700/60 px-4 py-3 rounded-2xl flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-teal-400" />
            <div>
              <span className="text-[11px] font-semibold text-slate-300 block">
                {language === 'en' ? 'Consent Status' : 'सहमति स्थिति'}
              </span>
              <span className="text-xs font-bold text-teal-300">
                {language === 'en' ? 'ABDM Verified Vault Active' : 'एबीडीएम सत्यापित तिजोरी सक्रिय'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Patient Profile Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-800 font-extrabold text-xl">
              SD
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">Sunita Devi</h2>
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                  {language === 'en' ? 'Low Risk' : 'कम जोखिम'}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                28 Yrs • Primigravida • LMP: 20 Oct 2025 • EDD: 27 Jul 2026
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Hemoglobin</span>
              <span className="font-bold text-slate-900 text-sm">11.4 g/dL</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Blood Pressure</span>
              <span className="font-bold text-slate-900 text-sm">120 / 80 mmHg</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-slate-500 block text-[10px] uppercase font-bold">FHR (Ultrasonic)</span>
              <span className="font-bold text-teal-700 text-sm">142 bpm</span>
            </div>
          </div>
        </div>

        {/* Doctor View of Consent-Granted Records */}
        <div className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-teal-600" />
              <span>{language === 'en' ? 'Patient Consent-Shared Records Vault' : 'मरीज द्वारा शेयर की गई मेडिकल फाइलें'}</span>
            </h3>

            <span className="text-xs text-slate-500 font-medium">
              {doctorSharedRecords.length} {language === 'en' ? 'records unlocked by patient' : 'फाइलें अनलॉक्ड'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {doctorSharedRecords.map((record) => (
              <div key={record.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex flex-col justify-between space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white border border-slate-200 text-teal-700">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                      {language === 'en' ? record.titleEn : record.titleHi}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {record.timestamp} • {record.facilityEn}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-700 font-medium">
                  {language === 'en' ? record.summaryEn : record.summaryHi}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-[11px]">
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {language === 'en' ? 'Verified Signature' : 'सत्यापित डिजिटल हस्ताक्षर'}
                  </span>
                  <span className="text-slate-500 font-mono">{record.fileSize}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Clinical Notes & Quick WhatsApp Advisory Dispatcher */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Clinical Note Logger */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-teal-600" />
            <span>{language === 'en' ? 'Add Clinical Consultation Note' : 'क्लिनिकल परामर्श नोट जोड़ें'}</span>
          </h3>

          <div className="flex gap-2">
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder={language === 'en' ? 'Enter clinical advice or observation...' : 'चिकित्सकीय सलाह दर्ज करें...'}
              className="flex-1 bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              onClick={addNote}
              className="px-4 py-2.5 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              <span>{language === 'en' ? 'Add Note' : 'जोड़ें'}</span>
            </button>
          </div>

          <div className="space-y-2 pt-2">
            {notesList.map((note, idx) => (
              <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-1.5 flex-shrink-0" />
                <span>{note}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Direct WhatsApp Advisory Dispatcher */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Send className="w-5 h-5 text-emerald-600" />
            <span>{language === 'en' ? 'Dispatch WhatsApp Patient Advisory' : 'व्हाट्सएप रोगी परामर्श भेजें'}</span>
          </h3>

          <p className="text-xs text-slate-500">
            {language === 'en' 
              ? 'Send instant clinical advisories or prescription reminders to patient via MatriSetu WhatsApp gateway.'
              : 'मातृसेतु व्हाट्सएप के माध्यम से रोगी को तत्काल सलाह भेजें।'}
          </p>

          <div className="space-y-2">
            <button
              onClick={() => {
                setActiveWhatsappScenario('reminder');
                setWhatsappDrawerOpen(true);
              }}
              className="w-full text-left p-3 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 transition text-xs font-bold text-emerald-900 flex items-center justify-between"
            >
              <span>{language === 'en' ? 'Dispatch Level II Anomaly Scan Reminder' : 'लेवल II स्कैन रिमाइंड भेजें'}</span>
              <Send className="w-4 h-4 text-emerald-600" />
            </button>

            <button
              onClick={() => {
                setActiveWhatsappScenario('emergency');
                setWhatsappDrawerOpen(true);
              }}
              className="w-full text-left p-3 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 transition text-xs font-bold text-rose-900 flex items-center justify-between"
            >
              <span>{language === 'en' ? 'Initiate Emergency Clinical Protocol' : 'आपातकालीन प्रोटोकॉल भेजें'}</span>
              <Send className="w-4 h-4 text-rose-600" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
