export type UserRole = 'patient' | 'caregiver' | 'doctor';
export type Language = 'en' | 'hi';

export interface Milestone {
  id: string;
  stageNumber: number;
  titleEn: string;
  titleHi: string;
  subtitleEn: string;
  subtitleHi: string;
  periodEn: string;
  periodHi: string;
  status: 'completed' | 'current' | 'upcoming';
  date: string;
  descriptionEn: string;
  descriptionHi: string;
  requiredTestsEn: string[];
  requiredTestsHi: string[];
  nutritionAdviceEn: string[];
  nutritionAdviceHi: string[];
  doctorNotesEn?: string;
  doctorNotesHi?: string;
  linkedRecordIds?: string[];
  image: string;
}

export interface GovernmentScheme {
  id: string;
  nameEn: string;
  nameHi: string;
  shortName: string;
  ministryEn: string;
  ministryHi: string;
  category: 'maternal' | 'child' | 'nutrition' | 'financial';
  financialBenefitEn: string;
  financialBenefitHi: string;
  targetAudienceEn: string;
  targetAudienceHi: string;
  pregnancyStage: 'trimester1' | 'trimester2' | 'trimester3' | 'postnatal' | 'childhood' | 'all';
  locationScope: string[]; // e.g. ['all', 'Maharashtra', 'Uttar Pradesh', 'Rajasthan', 'Bihar']
  incomeCategory: 'all' | 'bpl' | 'low';
  summaryEn: string;
  summaryHi: string;
  documentsEn: string[];
  documentsHi: string[];
  applicationStepsEn: string[];
  applicationStepsHi: string[];
  officialUrl?: string;
  badgeTag: string;
}

export interface MedicalRecord {
  id: string;
  titleEn: string;
  titleHi: string;
  category: 'ultrasound' | 'lab' | 'vaccine' | 'prescription' | 'mcp';
  timestamp: string;
  facilityEn: string;
  facilityHi: string;
  doctorName: string;
  summaryEn: string;
  summaryHi: string;
  fileSize: string;
  sharedWithCaregiver: boolean;
  sharedWithDoctor: boolean;
  sensitive: boolean;
  downloadUrl?: string;
  previewImage?: string;
}

export interface WhatsAppScenario {
  id: 'reminder' | 'emergency' | 'scheme';
  titleEn: string;
  titleHi: string;
  messages: {
    id: string;
    sender: 'bot' | 'patient' | 'doctor' | 'system';
    textEn: string;
    textHi: string;
    time: string;
    quickReplies?: {
      labelEn: string;
      labelHi: string;
      action: string;
    }[];
  }[];
}
