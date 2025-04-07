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

export type ABTest = {
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
    A: Variant;
    B: Variant;
  };
  results?: {
    variantA: VariantResult;
    variantB: VariantResult;
    winner?: 'A' | 'B' | 'tie';
    confidenceLevel?: number;
  };
  createdAt: Date;
  updatedAt: Date;
}; 