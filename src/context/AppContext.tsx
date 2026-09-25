'use client';

import React, { createContext, useContext, useState } from 'react';
import { UserRole, Language, MedicalRecord, WhatsAppScenario } from '../types';
import { INITIAL_MEDICAL_RECORDS, WHATSAPP_SCENARIOS } from '../data/mockData';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  whatsappDrawerOpen: boolean;
  setWhatsappDrawerOpen: (open: boolean) => void;
  activeWhatsappScenario: 'reminder' | 'emergency' | 'scheme';
  setActiveWhatsappScenario: (scenario: 'reminder' | 'emergency' | 'scheme') => void;
  medicalRecords: MedicalRecord[];
  toggleCaregiverConsent: (recordId: string) => void;
  toggleDoctorConsent: (recordId: string) => void;
  triggerEmergencySos: () => void;
  whatsappChatHistory: WhatsAppScenario[];
  sendWhatsappReply: (scenarioId: string, replyTextEn: string, replyTextHi: string) => void;
  activeSchemeFilter: {
    location: string;
    stage: string;
    income: string;
  };
  setActiveSchemeFilter: React.Dispatch<React.SetStateAction<{
    location: string;
    stage: string;
    income: string;
  }>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('patient');
  const [language, setLanguage] = useState<Language>('en');
  const [whatsappDrawerOpen, setWhatsappDrawerOpen] = useState<boolean>(false);
  const [activeWhatsappScenario, setActiveWhatsappScenario] = useState<'reminder' | 'emergency' | 'scheme'>('reminder');
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>(INITIAL_MEDICAL_RECORDS);
  const [whatsappChatHistory, setWhatsappChatHistory] = useState<WhatsAppScenario[]>(WHATSAPP_SCENARIOS);
  const [activeSchemeFilter, setActiveSchemeFilter] = useState({
    location: 'all',
    stage: 'all',
    income: 'all',
  });

  const toggleCaregiverConsent = (recordId: string) => {
    setMedicalRecords(prev =>
      prev.map(rec => (rec.id === recordId ? { ...rec, sharedWithCaregiver: !rec.sharedWithCaregiver } : rec))
    );
  };

  const toggleDoctorConsent = (recordId: string) => {
    setMedicalRecords(prev =>
      prev.map(rec => (rec.id === recordId ? { ...rec, sharedWithDoctor: !rec.sharedWithDoctor } : rec))
    );
  };

  const triggerEmergencySos = () => {
    setActiveWhatsappScenario('emergency');
    setWhatsappDrawerOpen(true);
  };

  const sendWhatsappReply = (scenarioId: string, replyTextEn: string, replyTextHi: string) => {
    const newMsg = {
      id: `w-reply-${Date.now()}`,
      sender: 'patient' as const,
      textEn: replyTextEn,
      textHi: replyTextHi,
      time: 'Just now',
    };

    const confirmBotMsg = {
      id: `w-bot-${Date.now()}`,
      sender: 'bot' as const,
      textEn: '👍 Response logged in your MatriSetu Health Record. A confirmation notification has been dispatched.',
      textHi: '👍 आपकी प्रतिक्रिया मातृसेतु स्वास्थ्य रिकॉर्ड में दर्ज की गई है। पुष्टि सूचना भेज दी गई है।',
      time: 'Just now',
    };

    setWhatsappChatHistory(prev =>
      prev.map(sc => {
        if (sc.id === scenarioId) {
          return {
            ...sc,
            messages: [...sc.messages, newMsg, confirmBotMsg],
          };
        }
        return sc;
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        language,
        setLanguage,
        whatsappDrawerOpen,
        setWhatsappDrawerOpen,
        activeWhatsappScenario,
        setActiveWhatsappScenario,
        medicalRecords,
        toggleCaregiverConsent,
        toggleDoctorConsent,
        triggerEmergencySos,
        whatsappChatHistory,
        sendWhatsappReply,
        activeSchemeFilter,
        setActiveSchemeFilter,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
