import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Paper,
  Typography,
  Grid,
  TextField,
  MenuItem,
  IconButton,
  Tooltip,
} from '@mui/material';
import { ABTestReport } from '../components/ABTestReport';
import { ABTest } from '../types/abtest';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import PrintIcon from '@mui/icons-material/Print';

// Mock data for development
const mockTest: ABTest = {
  id: '1',
  name: 'Homepage Hero Section Test',
  description: 'Testing new hero section design with improved CTA placement',
  startDate: new Date('2024-02-01'),
  endDate: new Date('2024-02-15'),
  testUrl: 'https://example.com',
  dataSource: 'manual',
  targetAudience: ['Desktop Users', 'New Visitors'],
  trafficSplit: {
    variantA: 50,
    variantB: 50,
  },
  variants: {
    A: {
      name: 'Original',
      description: 'Current hero section design',
      sampleSize: 5000,
    },
    B: {
      name: 'New Design',
      description: 'Hero section with centered CTA',
      sampleSize: 5000,
    },
  },
  results: {
    variantA: {
      variantId: 'A',
      sampleSize: 5000,
      conversionRate: 0.025,
      revenuePerUser: 10.50,
      totalRevenue: 52500,
      metrics: [
        {
          name: 'Conversion Rate',
          value: 0.025,
          unit: '%',
          change: 0,
          confidence: 0.95,
          pValue: 0.03,
          statisticalSignificance: true,
        },
      ],
      confidenceInterval: {
        lower: 0.023,
        upper: 0.027,
      },
      statisticalPower: 0.8,
      minimumDetectableEffect: 0.01,
    },
    variantB: {
      variantId: 'B',
      sampleSize: 5000,
      conversionRate: 0.035,
      revenuePerUser: 12.75,
      totalRevenue: 63750,
      metrics: [
        {
          name: 'Conversion Rate',
          value: 0.035,
          unit: '%',
          change: 0.01,
          confidence: 0.95,
          pValue: 0.03,
          statisticalSignificance: true,
        },
      ],
      confidenceInterval: {
        lower: 0.033,
        upper: 0.037,
      },
      statisticalPower: 0.8,
      minimumDetectableEffect: 0.01,
    },
    overall: {
      statisticalSignificance: true,
      confidenceLevel: 0.95,
      recommendedAction: 'implement',
      estimatedRevenueImpact: 11250,
      riskAssessment: 'low',
    },
  },
  report: {
    executiveSummary: 'The new hero section design showed a statistically significant improvement in conversion rates, with a 40% increase compared to the original design. The change is expected to generate an additional $11,250 in revenue.',
    keyFindings: [
      '40% increase in conversion rate',
      'Statistically significant results (p < 0.05)',
      'High confidence level (95%)',
      'Positive revenue impact',
    ],
    recommendations: [
      'Implement the new hero section design',
      'Monitor performance for at least 2 weeks',
      'Consider A/B testing other page elements',
    ],
    limitations: [
      'Test was conducted during a specific time period',
      'Sample size was limited to 10,000 users',
      'Only desktop users were included',
    ],
    nextSteps: [
      'Schedule implementation of the winning variant',
      'Set up monitoring for key metrics',
      'Plan follow-up tests for optimization',
    ],
  },
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const ReportView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [test, setTest] = useState<ABTest>(mockTest);
  const [reportFormat, setReportFormat] = useState('detailed');

  const handleDownload = () => {
    // TODO: Implement PDF download
    console.log('Downloading report...');
  };

  const handleShare = () => {
    // TODO: Implement sharing functionality
    console.log('Sharing report...');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4">A/B Test Report</Typography>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <TextField
              select
              label="Report Format"
              value={reportFormat}
              onChange={(e) => setReportFormat(e.target.value)}
              size="small"
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="detailed">Detailed</MenuItem>
              <MenuItem value="summary">Summary</MenuItem>
              <MenuItem value="executive">Executive</MenuItem>
            </TextField>
            <Tooltip title="Download PDF">
              <IconButton onClick={handleDownload}>
                <DownloadIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Share Report">
              <IconButton onClick={handleShare}>
                <ShareIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Print Report">
              <IconButton onClick={handlePrint}>
                <PrintIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Paper>

      <ABTestReport test={test} />

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button variant="outlined" onClick={() => navigate('/')}>
          Back to Dashboard
        </Button>
        <Button variant="contained" color="primary" onClick={handleDownload}>
          Download Report
        </Button>
      </Box>
    </Box>
  );
}; 