import {
    BarChart, Bar,
    XAxis, YAxis,
    CartesianGrid, Tooltip,
    Legend, ResponsiveContainer,
    PieChart, Pie, Cell
  } from 'recharts';
  import { Grid, Typography, Paper, Box, useTheme } from '@mui/material';

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF', '#FF6B8B'];

  const VehicleChart = ({ vehicles }) => {
    const theme = useTheme();

    if (!vehicles || vehicles.length === 0) {
      return (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography>No vehicle data available</Typography>
        </Box>
      );
    }

    const brandData = processChartData(vehicles, 'make');
    const yearData = processChartData(vehicles, 'year');

    return (
      <Grid container spacing={3} sx={{ mt: 0 }}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{
            p: 3,
            height: 450,
            display: 'flex',
            flexDirection: 'column',
            width: 800
          }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              Vehicles by Brand
            </Typography>
            <Box sx={{ flex: 1 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={brandData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={100}
                    tick={{ fontSize: theme.typography.body2.fontSize }}
                  />
                  <Tooltip />
                  <Bar
                    dataKey="count"
                    fill={theme.palette.primary.main}
                    name="Number of Vehicles"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} sx={{
            p: 3,
            height: 450,
            display: 'flex',
            flexDirection: 'column',
            width: 800
          }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              Vehicles by Year
            </Typography>
            <Box sx={{ flex: 1 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={yearData}
                    dataKey="count"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    innerRadius={60}
                    paddingAngle={2}
                    label={({ name, percent }) => `${name}\n${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {yearData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value} vehicles`, 'Count']}
                  />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    wrapperStyle={{ paddingTop: 20 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    );
  };

  function processChartData(vehicles, key) {
    const dataMap = vehicles.reduce((acc, vehicle) => {
      const keyValue = vehicle[key];
      acc[keyValue] = (acc[keyValue] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(dataMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }

  export default VehicleChart;
