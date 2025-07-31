import { useState } from 'react';
import { useNavigate } from 'react-router';

import {
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  Grid,
  Container,
  Paper,
  Box,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Search, FilterAlt, Add } from '@mui/icons-material';
import Vehicle_Card from '../components/Vehicle_Card';

const Vehicles = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const vehicles = [
    {
      id: 1,
      make: 'Toyota',
      model: 'Camry',
      year: 2020,
      license: 'ABC-1234',
      image: 'https://cdn.imagin.studio/getimage?customer=scs&make=Toyota&modelFamily=Camry&zoomType=fullscreen',
      mileage: 24500,
      status: 'Active',
      lastService: '2023-05-15',
      value: 24500,
      fuelType: 'Gasoline'
    },
    {
      id: 2,
      make: 'Honda',
      model: 'Civic',
      year: 2019,
      license: 'XYZ-5678',
      image: 'https://cdn.imagin.studio/getimage?customer=scs&make=Honda&modelFamily=Civic&zoomType=fullscreen',
      mileage: 38200,
      status: 'Active',
      lastService: '2023-06-20',
      value: 19800,
      fuelType: 'Hybrid'
    },
    {
      id: 3,
      make: 'Ford',
      model: 'F-150',
      year: 2021,
      license: 'DEF-9012',
      image: 'https://cdn.imagin.studio/getimage?customer=scs&make=Ford&modelFamily=F-150&zoomType=fullscreen',
      mileage: 12500,
      status: 'In Maintenance',
      lastService: '2023-07-10',
      value: 35200,
      fuelType: 'Diesel'
    }
  ];

  const [vehicleList, setVehicleList] = useState(vehicles);

  const handleDelete = (id) => {
    const updated = vehicleList.filter((v) => v.id !== id);
    setVehicleList(updated);
  };

  const handleAddVehicle = () => {
    navigate('/vehicles/new');
  };

  const handleRefresh = () => {
    setSearchTerm('');
    setYearFilter('');
    setStatusFilter('');
  };

  const filteredVehicles = vehicleList.filter((v) => {
    const matchSearch = v.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      v.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      v.license.toLowerCase().includes(searchTerm.toLowerCase());
    const matchYear = yearFilter ? v.year.toString() === yearFilter : true;
    const matchStatus = statusFilter ? v.status === statusFilter : true;
    return matchSearch && matchYear && matchStatus;
  });

  const years = [...new Set(vehicleList.map(v => v.year))].sort((a, b) => b - a);
  const statuses = [...new Set(vehicleList.map(v => v.status))];

  return (
    <Container maxWidth="xl" style={{ padding: '20px' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          Vehicle Fleet Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleAddVehicle}
        >
          Add Vehicle
        </Button>
      </Box>

      <Paper elevation={3} style={{ padding: '20px', marginBottom: '30px' }}>
        <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
          <TextField
            label="Search Vehicles"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            style={{ minWidth: '250px' }}
          />

          <Select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            displayEmpty
            size="small"
            style={{ minWidth: '150px' }}
            startAdornment={
              <InputAdornment position="start">
                <FilterAlt fontSize="small" />
              </InputAdornment>
            }
          >
            <MenuItem value="">All Years</MenuItem>
            {years.map(year => (
              <MenuItem key={year} value={year}>{year}</MenuItem>
            ))}
          </Select>

          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            displayEmpty
            size="small"
            style={{ minWidth: '180px' }}
          >
            <MenuItem value="">All Statuses</MenuItem>
            {statuses.map(status => (
              <MenuItem key={status} value={status}>{status}</MenuItem>
            ))}
          </Select>

          <IconButton onClick={handleRefresh} color="primary" title="Reset filters">
          </IconButton>
        </Box>
      </Paper>

      {filteredVehicles.length > 0 ? (
        <Grid container spacing={3}>
          {filteredVehicles.map((v) => (
            <Grid item key={v.id} xs={12} sm={6} md={4} lg={3}>
              <Vehicle_Card vehicle={v} onDelete={handleDelete} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper elevation={3} style={{ padding: '40px', textAlign: 'center' }}>
          <Typography variant="h6" color="textSecondary">
            No vehicles found matching your criteria
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleRefresh}
            style={{ marginTop: '20px' }}
          >
            Clear Filters
          </Button>
        </Paper>
      )}
    </Container>
  );
};

export default Vehicles;
