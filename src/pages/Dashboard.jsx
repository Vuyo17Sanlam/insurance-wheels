import { Typography, Box } from '@mui/material';
import VehicleChart from '../components/VehicleChart';

const Dashboard = () => {
  const vehicles = [
    {
      id: 1,
      make: 'Toyota',
      model: 'Camry',
      year: 2020,
      license: 'ABC-1234',
      image: 'https://cdn.imagin.studio/getimage?customer=scs&make=Toyota&modelFamily=Camry&zoomType=fullscreen'
    },
    {
      id: 2,
      make: 'Honda',
      model: 'Civic',
      year: 2019,
      license: 'XYZ-5678',
      image: 'https://cdn.imagin.studio/getimage?customer=scs&make=Honda&modelFamily=Civic&zoomType=fullscreen'
    },
    {
      id: 3,
      make: 'Toyota',
      model: 'Rav4',
      year: 2021,
      license: 'GHI-9012',
      image: 'https://cdn.imagin.studio/getimage?customer=scs&make=Toyota&modelFamily=Rav4&zoomType=fullscreen'
    }
  ];

  return (
    <Box sx={{
      p: { xs: 2, md: 3 },
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: 3
    }}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Insurance Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Vehicle Statistics Overview
        </Typography>
      </Box>

      <Box sx={{
        flex: 1,
        minHeight: '600px',
        display: 'flex',
        flexDirection: 'column',
        gap: 3
      }}>
        <VehicleChart vehicles={vehicles} />
      </Box>
    </Box>
  );
};

export default Dashboard;
