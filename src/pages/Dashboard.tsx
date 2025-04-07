import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { format } from 'date-fns';
import type { ABTest } from '../types/abtest';

// Mock data for development
const mockTests: ABTest[] = [
  {
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
  },
  // Add more mock tests here
];

export const Dashboard: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const getStatusColor = (test: ABTest) => {
    const now = new Date();
    if (now < test.startDate) return theme.palette.info.main;
    if (now > test.endDate) return theme.palette.success.main;
    return theme.palette.warning.main;
  };

  const getStatusText = (test: ABTest) => {
    const now = new Date();
    if (now < test.startDate) return 'Scheduled';
    if (now > test.endDate) return 'Completed';
    return 'Running';
  };

  const getWinnerText = (test: ABTest) => {
    if (!test.results?.winner) return 'No winner yet';
    if (test.results.winner === 'tie') return 'Tie';
    return `Variant ${test.results.winner} won`;
  };

  const handleViewTest = (testId: string) => {
    navigate(`/test/${testId}`);
  };

  const handleViewReport = (testId: string) => {
    navigate(`/report/${testId}`);
  };

  const handleDuplicateTest = (test: ABTest) => {
    // TODO: Implement duplicate functionality
    console.log('Duplicating test:', test);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        A/B Test Dashboard
      </Typography>
      <Grid container spacing={3}>
        {mockTests.map((test) => (
          <Grid item xs={12} sm={6} md={4} key={test.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[4],
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {test.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {test.description}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    Test Period:
                  </Typography>
                  <Typography variant="body2">
                    {format(test.startDate, 'MMM d, yyyy')} - {format(test.endDate, 'MMM d, yyyy')}
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    Target Audience:
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    {test.targetAudience.map((audience) => (
                      <Chip
                        key={audience}
                        label={audience}
                        size="small"
                        sx={{ mr: 1, mb: 1 }}
                      />
                    ))}
                  </Box>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Traffic Split:
                  </Typography>
                  <Typography variant="body2">
                    {test.trafficSplit.variantA}% A / {test.trafficSplit.variantB}% B
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  startIcon={<VisibilityIcon />}
                  onClick={() => handleViewReport(test.id)}
                >
                  View Report
                </Button>
                <Button
                  size="small"
                  startIcon={<ContentCopyIcon />}
                  onClick={() => handleDuplicateTest(test)}
                >
                  Duplicate
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}; 