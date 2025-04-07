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
      },
      B: {
        name: 'New Design',
        description: 'Hero section with centered CTA',
      },
    },
    results: {
      variantA: {
        variantId: 'A',
        sampleSize: 5000,
        metrics: [
          { name: 'Conversion Rate', value: 2.5, unit: '%' },
        ],
      },
      variantB: {
        variantId: 'B',
        sampleSize: 5000,
        metrics: [
          { name: 'Conversion Rate', value: 3.2, unit: '%' },
        ],
      },
      winner: 'B',
      confidenceLevel: 95,
    },
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-15'),
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

  const handleDuplicateTest = (test: ABTest) => {
    // In a real app, this would create a new test with the same settings
    console.log('Duplicating test:', test.id);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        A/B Test Dashboard
      </Typography>
      <Grid container spacing={3}>
        {mockTests.map((test) => (
          <Grid item xs={12} sm={6} md={4} key={test.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
                    {test.name}
                  </Typography>
                  <Chip
                    label={getStatusText(test)}
                    size="small"
                    sx={{
                      backgroundColor: getStatusColor(test),
                      color: 'white',
                      ml: 1,
                    }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {test.description}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    {format(test.startDate, 'MMM d, yyyy')} - {format(test.endDate, 'MMM d, yyyy')}
                  </Typography>
                  {test.results && (
                    <Typography variant="body2" sx={{ mt: 1, color: theme.palette.primary.main }}>
                      {getWinnerText(test)}
                      {test.results.confidenceLevel && ` (${test.results.confidenceLevel}% confidence)`}
                    </Typography>
                  )}
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  startIcon={<VisibilityIcon />}
                  onClick={() => handleViewTest(test.id)}
                >
                  View
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