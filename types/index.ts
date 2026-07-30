export type SeverityLevel = 'low' | 'moderate' | 'high' | 'critical';

export interface UserContext {
  age?: number;
  gender?: string;
  medicalHistory?: string[];
  currentMedications?: string[];
}

export interface PossibleCondition {
  name: string;
  probability: 'Low' | 'Moderate' | 'High';
  explanation: string;
  recommendedSpecialist: string;
}

export interface AnalysisResponse {
  severity: SeverityLevel;
  urgencySummary: string;
  isEmergency: boolean;
  emergencyReason?: string;
  possibleConditions: PossibleCondition[];
  recommendedActions: string[];
  whenToSeeDoctor: string[];
  disclaimer: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}