import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { ABTest } from '../types/abtest';
import { format } from 'date-fns';

interface ABTestReportProps {
  test: ABTest;
}

export const ABTestReport: React.FC<ABTestReportProps> = ({ test }) => {
  const {
    name,
    description,
    startDate,
    endDate,
    variants,
    results,
    report,
  } = test;

  const formatPercentage = (value: number) => `${(value * 100).toFixed(2)}%`;
  const formatCurrency = (value: number) => `$${value.toFixed(2)}`;

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          A/B Test Report: {name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Test Period: {format(startDate, 'MMM d, yyyy')} - {format(endDate, 'MMM d, yyyy')}
        </Typography>
      </Paper>

      {/* Executive Summary */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Executive Summary
        </Typography>
        <Typography paragraph>{report.executiveSummary}</Typography>
      </Paper>

      {/* Key Metrics */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Key Metrics
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Metric</TableCell>
                <TableCell align="right">Variant A</TableCell>
                <TableCell align="right">Variant B</TableCell>
                <TableCell align="right">Change</TableCell>
                <TableCell align="right">Confidence</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Conversion Rate</TableCell>
                <TableCell align="right">{formatPercentage(results.variantA.conversionRate)}</TableCell>
                <TableCell align="right">{formatPercentage(results.variantB.conversionRate)}</TableCell>
                <TableCell align="right">{formatPercentage(results.variantB.conversionRate - results.variantA.conversionRate)}</TableCell>
                <TableCell align="right">{formatPercentage(results.overall.confidenceLevel)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Revenue per User</TableCell>
                <TableCell align="right">{formatCurrency(results.variantA.revenuePerUser)}</TableCell>
                <TableCell align="right">{formatCurrency(results.variantB.revenuePerUser)}</TableCell>
                <TableCell align="right">{formatCurrency(results.variantB.revenuePerUser - results.variantA.revenuePerUser)}</TableCell>
                <TableCell align="right">{formatPercentage(results.overall.confidenceLevel)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Statistical Analysis */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Statistical Analysis
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Variant A</Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Sample Size"
                  secondary={results.variantA.sampleSize.toLocaleString()}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Confidence Interval"
                  secondary={`${formatPercentage(results.variantA.confidenceInterval.lower)} - ${formatPercentage(results.variantA.confidenceInterval.upper)}`}
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Variant B</Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Sample Size"
                  secondary={results.variantB.sampleSize.toLocaleString()}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Confidence Interval"
                  secondary={`${formatPercentage(results.variantB.confidenceInterval.lower)} - ${formatPercentage(results.variantB.confidenceInterval.upper)}`}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>

      {/* Recommendations */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Recommendations
        </Typography>
        <List>
          {report.recommendations.map((recommendation, index) => (
            <ListItem key={index}>
              <ListItemText primary={recommendation} />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Next Steps */}
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Next Steps
        </Typography>
        <List>
          {report.nextSteps.map((step, index) => (
            <ListItem key={index}>
              <ListItemText primary={step} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}; 