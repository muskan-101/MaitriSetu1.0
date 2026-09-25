'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SCHEMES_DATA } from '../data/mockData';
import { GovernmentScheme } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  IndianRupee, 
  FileCheck2, 
  ExternalLink, 
  CheckCircle2, 
  Filter, 
  Sparkles,
  Info,
  ChevronRight,
  X
} from 'lucide-react';

export const SchemeNavigator: React.FC = () => {
  const { language, activeSchemeFilter, setActiveSchemeFilter, setWhatsappDrawerOpen, setActiveWhatsappScenario } = useApp();
  const [selectedSchemeModal, setSelectedSchemeModal] = useState<GovernmentScheme | null>(null);

  const filteredSchemes = SCHEMES_DATA.filter((scheme) => {
    if (activeSchemeFilter.location !== 'all') {
      if (!scheme.locationScope.includes('all') && !scheme.locationScope.includes(activeSchemeFilter.location)) {
        return false;
      }
    }
    if (activeSchemeFilter.stage !== 'all') {
      if (scheme.pregnancyStage !== 'all' && scheme.pregnancyStage !== activeSchemeFilter.stage) {
        return false;
      }
    }
    if (activeSchemeFilter.income !== 'all') {
      if (scheme.incomeCategory !== 'all' && scheme.incomeCategory !== activeSchemeFilter.income) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-rose-50 text-rose-600">
              <Building2 className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {language === 'en' ? 'Government Scheme Navigator' : 'सरकारी योजना खोजक और पात्रता पोर्टल'}
            </h2>
          </div>
          <p className="text-sm text-slate-500 font-medium">
            {language === 'en'
              ? 'Find eligible central and state maternal financial benefits, free hospital care, and nutrition schemes.'
              : 'पात्र केंद्रीय और राज्य मातृत्व वित्तीय लाभ, मुफ्त अस्पताल देखभाल और पोषण योजनाओं की खोज करें।'}
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>{filteredSchemes.length} {language === 'en' ? 'Matching Schemes' : 'उपलब्ध योजनाएं'}</span>
        </div>
      </div>

      {/* Interactive Filter Bar */}
      <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/80 mb-8">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-3 uppercase tracking-wider">
          <Filter className="w-4 h-4 text-teal-600" />
          <span>{language === 'en' ? 'Filter Eligibility Criteria' : 'पात्रता मानदंड फ़िल्टर'}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Location Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-teal-600" />
              {language === 'en' ? 'Location / State' : 'राज्य / स्थान'}
            </label>
            <select
              value={activeSchemeFilter.location}
              onChange={(e) => setActiveSchemeFilter(prev => ({ ...prev, location: e.target.value }))}
              className="w-full bg-white text-xs font-semibold text-slate-800 p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">{language === 'en' ? 'All India (Central + State)' : 'सभी राज्य (केंद्र + राज्य)'}</option>
              <option value="Uttar Pradesh">Uttar Pradesh (उत्तर प्रदेश)</option>
              <option value="Maharashtra">Maharashtra (महाराष्ट्र)</option>
              <option value="Rajasthan">Rajasthan (राजस्थान)</option>
              <option value="Bihar">Bihar (बिहार)</option>
              <option value="Madhya Pradesh">Madhya Pradesh (मध्य प्रदेश)</option>
            </select>
          </div>

          {/* Pregnancy Stage Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-teal-600" />
              {language === 'en' ? 'Pregnancy / Child Stage' : 'गर्भावस्था / शिशु चरण'}
            </label>
            <select
              value={activeSchemeFilter.stage}
              onChange={(e) => setActiveSchemeFilter(prev => ({ ...prev, stage: e.target.value }))}
              className="w-full bg-white text-xs font-semibold text-slate-800 p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">{language === 'en' ? 'All Stages (Trimester 1 to Childhood)' : 'सभी चरण (पहली तिमाही से बाल्यकाल)'}</option>
              <option value="trimester1">{language === 'en' ? '1st Trimester (Registration)' : 'पहली तिमाही (पंजीकरण)'}</option>
              <option value="trimester2">{language === 'en' ? '2nd Trimester (Scans & Vaccines)' : 'दूसरी तिमाही'}</option>
              <option value="trimester3">{language === 'en' ? '3rd Trimester (Delivery Plan)' : 'तीसरी तिमाही (प्रसव)'}</option>
              <option value="childhood">{language === 'en' ? 'Infant Immunization (0-2 Yrs)' : 'बाल टीकाकरण (0-2 वर्ष)'}</option>
            </select>
          </div>

          {/* Income Level Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1 flex items-center gap-1">
              <IndianRupee className="w-3.5 h-3.5 text-teal-600" />
              {language === 'en' ? 'Income / Economic Category' : 'आय श्रेणी'}
            </label>
            <select
              value={activeSchemeFilter.income}
              onChange={(e) => setActiveSchemeFilter(prev => ({ ...prev, income: e.target.value }))}
              className="w-full bg-white text-xs font-semibold text-slate-800 p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">{language === 'en' ? 'All Income Groups' : 'सभी आय वर्ग'}</option>
              <option value="bpl">{language === 'en' ? 'BPL / EWS / SC / ST' : 'बीपीएल / ईडब्ल्यूएस / एससी / एसटी'}</option>
              <option value="low">{language === 'en' ? 'Low / Middle Income (< INR 5 Lakh)' : 'निम्न आय वर्ग'}</option>
            </select>
          </div>

        </div>
      </div>

      {/* Matching Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSchemes.map((scheme) => (
          <motion.div
            key={scheme.id}
            whileHover={{ y: -4, boxShadow: '0px 10px 20px rgba(0,0,0,0.05)' }}
            className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs transition-all duration-200 relative overflow-hidden"
          >
            {/* Top Badge */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-md bg-teal-100 text-teal-900 tracking-wider">
                {scheme.shortName}
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-100">
                {scheme.badgeTag}
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 leading-snug mb-1">
                {language === 'en' ? scheme.nameEn : scheme.nameHi}
              </h3>
              <p className="text-xs text-slate-500 font-medium mb-4">
                {language === 'en' ? scheme.ministryEn : scheme.ministryHi}
              </p>

              {/* Financial Benefit Box */}
              <div className="bg-emerald-50/80 border border-emerald-200 p-3 rounded-xl mb-4">
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mb-0.5">
                  {language === 'en' ? 'Financial & Service Benefit:' : 'वित्तीय एवं सेवा लाभ:'}
                </span>
                <p className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                  <IndianRupee className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{language === 'en' ? scheme.financialBenefitEn : scheme.financialBenefitHi}</span>
                </p>
              </div>

              <p className="text-xs text-slate-600 font-medium line-clamp-2 mb-4">
                {language === 'en' ? scheme.summaryEn : scheme.summaryHi}
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedSchemeModal(scheme)}
                className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1 hover:underline"
              >
                <Info className="w-4 h-4" />
                <span>{language === 'en' ? 'View Docs & Application Guide' : 'दस्तावेज और आवेदन प्रक्रिया देखें'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  setActiveWhatsappScenario('scheme');
                  setWhatsappDrawerOpen(true);
                }}
                className="px-3 py-1.5 text-[11px] font-semibold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition"
              >
                {language === 'en' ? 'Simulate Payout Alert' : 'भुगतान अलर्ट सिम्युलेट करें'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredSchemes.length === 0 && (
        <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
          <Info className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <h4 className="text-sm font-bold text-slate-700">
            {language === 'en' ? 'No schemes matching selected filters' : 'चयनित फ़िल्टर के साथ कोई योजना नहीं मिली'}
          </h4>
          <p className="text-xs text-slate-500 mt-1">
            {language === 'en' ? 'Try resetting location or stage filters.' : 'कृपया फ़िल्टर बदलें।'}
          </p>
          <button
            onClick={() => setActiveSchemeFilter({ location: 'all', stage: 'all', income: 'all' })}
            className="mt-3 text-xs font-bold text-teal-600 underline"
          >
            {language === 'en' ? 'Reset Filters' : 'फ़िल्टर रीसेट करें'}
          </button>
        </div>
      )}

      {/* Scheme Detail Modal */}
      <AnimatePresence>
        {selectedSchemeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-100 relative"
            >
              <button
                onClick={() => setSelectedSchemeModal(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="pr-8">
                <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md uppercase tracking-wider inline-block mb-2">
                  {selectedSchemeModal.shortName}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mb-1">
                  {language === 'en' ? selectedSchemeModal.nameEn : selectedSchemeModal.nameHi}
                </h3>
                <p className="text-xs text-slate-500 font-medium mb-6">
                  {language === 'en' ? selectedSchemeModal.ministryEn : selectedSchemeModal.ministryHi}
                </p>

                {/* Financial Benefit Box */}
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl mb-6">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                    {language === 'en' ? 'Benefit Structure' : 'लाभ विवरण'}
                  </span>
                  <p className="text-sm font-bold text-emerald-950">
                    {language === 'en' ? selectedSchemeModal.financialBenefitEn : selectedSchemeModal.financialBenefitHi}
                  </p>
                </div>

                {/* Required Documents */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 mb-3">
                    <FileCheck2 className="w-4 h-4 text-teal-600" />
                    <span>{language === 'en' ? 'Required Documents Checklist' : 'आवश्यक दस्तावेज चेकलिस्ट'}</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {(language === 'en' ? selectedSchemeModal.documentsEn : selectedSchemeModal.documentsHi).map((doc, i) => (
                      <div key={i} className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                        <span>{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step-by-Step Application */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 mb-3">
                    <Building2 className="w-4 h-4 text-rose-600" />
                    <span>{language === 'en' ? 'Step-by-Step Application Process' : 'चरण-दर-चरण आवेदन प्रक्रिया'}</span>
                  </h4>
                  <ol className="space-y-2.5">
                    {(language === 'en' ? selectedSchemeModal.applicationStepsEn : selectedSchemeModal.applicationStepsHi).map((step, i) => (
                      <li key={i} className="flex items-start gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-xs text-xs font-medium text-slate-800">
                        <span className="w-5 h-5 rounded-full bg-teal-700 text-white font-bold flex items-center justify-center text-[10px] flex-shrink-0">
                          {i + 1}
                        </span>
                        <span className="mt-0.5">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Footer buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  {selectedSchemeModal.officialUrl && (
                    <a
                      href={selectedSchemeModal.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition flex items-center gap-1.5 shadow-sm"
                    >
                      <span>{language === 'en' ? 'Official Portal' : 'आधिकारिक पोर्टल'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedSchemeModal(null)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
                  >
                    {language === 'en' ? 'Close' : 'बंद करें'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
