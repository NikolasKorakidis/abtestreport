export type Variant = {
  name: string;
  description: string;
  imageUrl?: string;
};

export type Metric = {
  name: string;
  value: number;
  unit: string;
};

export type VariantResult = {
  variantId: 'A' | 'B';
  sampleSize: number;
  metrics: Metric[];
};

export interface TestMetric {
  name: string;
  value: number;
  unit: string;
  change: number;
  confidence: number;
  pValue: number;
  statisticalSignificance: boolean;
}

export interface TestResults {
  variantId: string;
  sampleSize: number;
  conversionRate: number;
  revenuePerUser: number;
  totalRevenue: number;
  metrics: TestMetric[];
  confidenceInterval: {
    lower: number;
    upper: number;
  };
  statisticalPower: number;
  minimumDetectableEffect: number;
}

export interface ABTest {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  testUrl: string;
  dataSource: 'manual' | 'integration';
  targetAudience: string[];
  trafficSplit: {
    variantA: number;
    variantB: number;
  };
  variants: {
    A: {
      name: string;
      description: string;
      sampleSize: number;
    };
    B: {
      name: string;
      description: string;
      sampleSize: number;
    };
  };
  results: {
    variantA: TestResults;
    variantB: TestResults;
    overall: {
      statisticalSignificance: boolean;
      confidenceLevel: number;
      recommendedAction: 'implement' | 'keep_original' | 'continue_testing';
      estimatedRevenueImpact: number;
      riskAssessment: 'low' | 'medium' | 'high';
    };
  };
  report: {
    executiveSummary: string;
    keyFindings: string[];
    recommendations: string[];
    limitations: string[];
    nextSteps: string[];
  };
  createdAt: Date;
  updatedAt: Date;
} 