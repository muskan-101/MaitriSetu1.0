'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  HeartHandshake, 
  ShieldCheck, 
  Utensils, 
  Bell, 
  FileText, 
  CheckCircle2, 
  Stethoscope
} from 'lucide-react';

export const CaregiverDashboard: React.FC = () => {
  const { language, medicalRecords, setWhatsappDrawerOpen, setActiveWhatsappScenario } = useApp();

  const sharedRecords = medicalRecords.filter(r => r.sharedWithCaregiver);

  return (
    <div className="space-y-6">
      
      {/* Caregiver Welcome Banner */}
      <div className="bg-gradient-to-r from-teal-800 via-teal-700 to-rose-700 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-white/20 backdrop-blur-xs text-white">
              <HeartHandshake className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-100">
              {language === 'en' ? 'Caregiver & Family Portal' : 'देखभालकर्ता और परिवार पोर्टल'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            {language === 'en' ? 'Supporting Sunita Devi’s Pregnancy' : 'सुनीता देवी की स्वास्थ्य यात्रा में सहयोग'}
          </h1>
          <p className="text-xs sm:text-sm text-teal-100 font-medium leading-relaxed">
            {language === 'en'
              ? 'Stay updated with verified clinical appointments, consent-shared medical records, and daily nutritional support checklists.'
              : 'क्लिनिकल परामर्श, शेयर की गई मेडिकल रिपोर्ट और दैनिक पोषण सहायता की जानकारी रखें।'}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => {
                setActiveWhatsappScenario('reminder');
                setWhatsappDrawerOpen(true);
              }}
              className="px-4 py-2 text-xs font-bold text-teal-900 bg-white hover:bg-teal-50 rounded-xl transition shadow-sm flex items-center gap-1.5"
            >
              <Bell className="w-4 h-4 text-teal-700" />
              <span>{language === 'en' ? 'Send WhatsApp Care Reminder' : 'व्हाट्सएप केयर रिमाइंड भेजें'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Shared Medical Records & Nutrition Checklist */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Consent Shared Medical Records */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-teal-600" />
                <h3 className="text-base font-bold text-slate-900">
                  {language === 'en' ? 'Consent-Granted Records Vault' : 'सहमति प्राप्त मेडिकल रिकॉर्ड'}
                </h3>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                {sharedRecords.length} {language === 'en' ? 'Shared with you' : 'रिपोर्ट उपलब्ध'}
              </span>
            </div>

            <div className="space-y-3">
              {sharedRecords.map((record) => (
                <div key={record.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-white border border-slate-200 text-teal-600">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        {language === 'en' ? record.titleEn : record.titleHi}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                        {language === 'en' ? record.facilityEn : record.facilityHi} • {record.timestamp}
                      </p>
                      <p className="text-xs text-slate-600 font-medium mt-1">
                        {language === 'en' ? record.summaryEn : record.summaryHi}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-1 rounded-md flex-shrink-0">
                    {language === 'en' ? 'Accessible' : 'उपलब्ध'}
                  </span>
                </div>
              ))}

              {sharedRecords.length === 0 && (
                <div className="text-center py-8 text-xs text-slate-500">
                  {language === 'en' ? 'No records shared by patient yet.' : 'मरीज द्वारा अभी कोई रिकॉर्ड साझा नहीं किया गया है।'}
                </div>
              )}
            </div>
          </div>

          {/* Daily Caregiver Checklist */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Utensils className="w-5 h-5 text-rose-600" />
              <span>{language === 'en' ? 'Daily Family Nutrition & Care Checklist' : 'दैनिक पारिवारिक देखभाल और पोषण जांच'}</span>
            </h3>

            <div className="space-y-2.5">
              {[
                { en: 'Ensure Autrin (Iron + Folic Acid) tablet taken after dinner', hi: 'रात के खाने के बाद आयरन फोलिक एसिड गोली सुनिश्चित करें' },
                { en: 'Ensure Calcium tablet taken after breakfast (2 hr gap from Iron)', hi: 'नाश्ते के बाद कैल्शियम गोली सुनिश्चित करें' },
                { en: 'Maintain 3 Liters water intake', hi: '3 लीटर पानी का सेवन सुनिश्चित करें' },
                { en: 'Track fetal movement kick counts in evening', hi: 'शाम को शिशु की हलचल गिनें' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                  <span>{language === 'en' ? item.en : item.hi}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Key Contacts */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-teal-600" />
              <span>{language === 'en' ? 'Primary Health Contacts' : 'प्रमुख स्वास्थ्य संपर्क'}</span>
            </h3>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs space-y-1">
              <p className="font-bold text-slate-900">Dr. Ananya Sharma (Obstetrician)</p>
              <p className="text-slate-500">District Women Hospital, Block B</p>
              <p className="text-teal-700 font-mono font-semibold">+91 98765 43210</p>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs space-y-1">
              <p className="font-bold text-slate-900">Sister Rekha Devi (ASHA Worker)</p>
              <p className="text-slate-500">Urban PHC Ward 14</p>
              <p className="text-teal-700 font-mono font-semibold">+91 91234 56789</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
