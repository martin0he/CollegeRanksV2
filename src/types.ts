export type University = {
  id?: string;
  countryCode: string;
  name: string;
  website: string;
  overallAverage: number;
  avgAcademics: number;
  avgHousing: number;
  avgLocation: number;
  avgClubs: number;
  avgFood: number;
  avgSocial: number;
  avgOpportunities: number;
  avgSafety: number;
};

export type Review = {
  id?: string;
  createdAt: Date;
  universityId: string;
  academics: number;
  housing: number;
  location: number;
  clubs: number;
  food: number;
  social: number;
  opportunities: number;
  safety: number;
  overall: number;
};
