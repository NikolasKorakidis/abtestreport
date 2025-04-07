import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack,
  Slider,
  FormHelperText,
  useTheme,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useNavigate } from 'react-router-dom';
import type { ABTest, Variant } from '../types/abtest';

const initialVariant: Variant = {
  name: '',
  description: '',
};

const targetAudienceOptions = [
  'Desktop Users',
  'Mobile Users',
  'New Visitors',
  'Returning Visitors',
  'US Traffic',
  'EU Traffic',
];

export const NewTest: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<ABTest>>({
    name: '',
    description: '',
    testUrl: '',
    dataSource: 'manual',
    targetAudience: [],
    trafficSplit: {
      variantA: 50,
      variantB: 50,
    },
    variants: {
      A: { ...initialVariant, name: 'Control' },
      B: { ...initialVariant, name: 'Variation' },
    },
  });

  const handleInputChange = (field: keyof ABTest, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleVariantChange = (variantId: 'A' | 'B', field: keyof Variant, value: string) => {
    setFormData((prev) => ({
      ...prev,
      variants: {
        ...prev.variants,
        [variantId]: {
          ...prev.variants?.[variantId],
          [field]: value,
        },
      },
    }));
  };

  const handleTrafficSplitChange = (_event: Event, value: number | number[]) => {
    const splitValue = Array.isArray(value) ? value[0] : value;
    setFormData((prev) => ({
      ...prev,
      trafficSplit: {
        variantA: splitValue,
        variantB: 100 - splitValue,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save the test to a backend
    console.log('Submitting test:', formData);
    navigate('/');
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h4" gutterBottom>
        Create New A/B Test
      </Typography>

      {/* Test Metadata Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Test Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Test Name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Test URL"
                value={formData.testUrl}
                onChange={(e) => handleInputChange('testUrl', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Start Date"
                  onChange={(date) => handleInputChange('startDate', date)}
                  sx={{ width: '100%' }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="End Date"
                  onChange={(date) => handleInputChange('endDate', date)}
                  sx={{ width: '100%' }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Data Source</InputLabel>
                <Select
                  value={formData.dataSource}
                  label="Data Source"
                  onChange={(e) => handleInputChange('dataSource', e.target.value)}
                >
                  <MenuItem value="manual">Manual Input</MenuItem>
                  <MenuItem value="integration">Integration</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Variants Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Variants
          </Typography>
          <Grid container spacing={3}>
            {(['A', 'B'] as const).map((variantId) => (
              <Grid item xs={12} md={6} key={variantId}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      Variant {variantId}
                    </Typography>
                    <Stack spacing={2}>
                      <TextField
                        required
                        label="Name"
                        value={formData.variants?.[variantId]?.name}
                        onChange={(e) => handleVariantChange(variantId, 'name', e.target.value)}
                      />
                      <TextField
                        multiline
                        rows={2}
                        label="Description"
                        value={formData.variants?.[variantId]?.description}
                        onChange={(e) => handleVariantChange(variantId, 'description', e.target.value)}
                      />
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Targeting & Traffic Split Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Targeting & Traffic Split
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Target Audience</InputLabel>
                <Select
                  multiple
                  value={formData.targetAudience}
                  label="Target Audience"
                  onChange={(e) => {
                    const value = e.target.value as string[];
                    handleInputChange('targetAudience', value);
                  }}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {targetAudienceOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom>Traffic Split</Typography>
              <Slider
                value={formData.trafficSplit?.variantA}
                onChange={handleTrafficSplitChange}
                valueLabelDisplay="on"
                valueLabelFormat={(value) => `${value}%`}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Variant A: {formData.trafficSplit?.variantA}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Variant B: {formData.trafficSplit?.variantB}%
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          onClick={() => navigate('/')}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
          Create Test
        </Button>
      </Box>
    </Box>
  );
}; 