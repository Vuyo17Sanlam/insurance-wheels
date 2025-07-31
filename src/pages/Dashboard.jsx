import { Typography, Box, CircularProgress, Alert } from '@mui/material';
import { useEffect, useState } from 'react';
import VehicleChart from '../components/VehicleChart';
import { getVehicles } from '../api/Vehicle_Data';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SpeedIcon from '@mui/icons-material/Speed';

const Dashboard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await getVehicles();
        setVehicles(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch vehicles');
        console.error('Error fetching vehicles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  if (loading) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  const vehiclesWithValue = vehicles.filter(v => typeof v.value === 'number');
  const vehiclesWithMileage = vehicles.filter(v => typeof v.mileage === 'number');

  const totalValue = vehiclesWithValue.reduce((sum, v) => sum + v.value, 0);
  const totalMileage = vehiclesWithMileage.reduce((sum, v) => sum + v.mileage, 0);

  const avgValue = vehiclesWithValue.length > 0 ? Math.round(totalValue / vehiclesWithValue.length) : 0;
  const avgMileage = vehiclesWithMileage.length > 0 ? Math.round(totalMileage / vehiclesWithMileage.length) : 0;

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <Typography variant="h6">
          Please try refreshing the page or check your connection
        </Typography>
      </Box>
    );
  }

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
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
        gap: 3,
        mb: 4
      }}>
        <StatCard
          title="Total Vehicles"
          value={vehicles.length}
          icon={<DirectionsCarIcon fontSize="large" color="primary" />}
        />
        <StatCard
          title="Active Vehicles"
          value={vehicles.filter(v => v.status === 'Active').length}
          icon={<CheckCircleIcon fontSize="large" color="success" />}
        />
        <StatCard
          title="Average Value"
          value={`R${avgValue.toLocaleString()}`}
          icon={<AttachMoneyIcon fontSize="large" color="secondary" />}
        />
        <StatCard
          title="Avg. Mileage"
          value={`${avgMileage.toLocaleString()} km`}
          icon={<SpeedIcon fontSize="large" color="action" />}
        />
      </Box>

      <Box sx={{
        flex: 1,
        minHeight: '500px',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        mt: 2
      }}>
        <VehicleChart vehicles={vehicles} />
      </Box>
    </Box>
  );
};

const StatCard = ({ title, value, icon }) => (
  <Box sx={{
    p: 3,
    borderRadius: 2,
    bgcolor: 'background.paper',
    boxShadow: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: 3
    }
  }}>
    <Box sx={{ mb: 1.5 }}>
      {icon}
    </Box>
    <Typography variant="h4" component="div" sx={{ fontWeight: 600, mb: 0.5 }}>
      {value}
    </Typography>
    <Typography variant="subtitle2" color="text.secondary">
      {title}
    </Typography>
  </Box>
);

export default Dashboard;
