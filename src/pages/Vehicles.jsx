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
      model: 'Corolla',
      year: 2021,
      license: 'CA 123-456',
      image: 'https://cdn.imagin.studio/getimage?customer=img&make=Toyota&modelFamily=Corolla&zoomType=fullscreen',
      mileage: 18000,
      status: 'Active',
      lastService: '2024-06-10',
      value: 320000,
      fuelType: 'Petrol'
    },
    {
      id: 2,
      make: 'Volkswagen',
      model: 'Polo',
      year: 2020,
      license: 'GP 987-654',
      image: 'https://cdn.imagin.studio/getimage?customer=img&make=Volkswagen&modelFamily=Polo&zoomType=fullscreen',
      mileage: 29500,
      status: 'Active',
      lastService: '2024-05-22',
      value: 280000,
      fuelType: 'Petrol'
    },
    {
      id: 3,
      make: 'Ford',
      model: 'Ranger',
      year: 2022,
      license: 'ZN 456-789',
      image: 'https://cdn.imagin.studio/getimage?customer=img&make=Ford&modelFamily=Ranger&zoomType=fullscreen',
      mileage: 12500,
      status: 'Active',
      lastService: '2024-04-05',
      value: 510000,
      fuelType: 'Diesel'
    },
    {
      id: 4,
      make: 'BMW',
      model: 'X5',
      year: 2021,
      license: 'L 234-321',
      image: 'https://cdn.imagin.studio/getimage?customer=img&make=BMW&modelFamily=X5&zoomType=fullscreen',
      mileage: 23000,
      status: 'In Maintenance',
      lastService: '2024-03-18',
      value: 850000,
      fuelType: 'Diesel'
    },
    {
      id: 5,
      make: 'Mercedes-Benz',
      model: 'C-Class',
      year: 2019,
      license: 'FS 111-999',
      image: 'https://cdn.imagin.studio/getimage?customer=img&make=Mercedes-Benz&modelFamily=C-Class&zoomType=fullscreen',
      mileage: 40000,
      status: 'Active',
      lastService: '2024-06-01',
      value: 620000,
      fuelType: 'Petrol'
    },
    {
      id: 6,
      make: 'Nissan',
      model: 'Navara',
      year: 2020,
      license: 'EC 765-432',
      image: 'https://cdn.imagin.studio/getimage?customer=img&make=Nissan&modelFamily=Navara&zoomType=fullscreen',
      mileage: 38000,
      status: 'Active',
      lastService: '2024-01-10',
      value: 450000,
      fuelType: 'Diesel'
    },
    {
      id: 7,
      make: 'Hyundai',
      model: 'Tucson',
      year: 2021,
      license: 'NW 222-888',
      image: 'https://cdn.imagin.studio/getimage?customer=img&make=Hyundai&modelFamily=Tucson&zoomType=fullscreen',
      mileage: 21000,
      status: 'Active',
      lastService: '2024-05-10',
      value: 390000,
      fuelType: 'Petrol'
    },
    {
      id: 8,
      make: 'Kia',
      model: 'Sportage',
      year: 2020,
      license: 'MP 333-777',
      image: 'https://cdn.imagin.studio/getimage?customer=img&make=Kia&modelFamily=Sportage&zoomType=fullscreen',
      mileage: 31000,
      status: 'Active',
      lastService: '2024-04-20',
      value: 410000,
      fuelType: 'Petrol'
    },
    {
      id: 9,
      make: 'Suzuki',
      model: 'Swift',
      year: 2022,
      license: 'WC 555-444',
      image: 'https://cdn.imagin.studio/getimage?customer=img&make=Suzuki&modelFamily=Swift&zoomType=fullscreen',
      mileage: 15000,
      status: 'Active',
      lastService: '2024-06-15',
      value: 230000,
      fuelType: 'Petrol'
    },
    {
      id: 10,
      make: 'Audi',
      model: 'A3',
      year: 2021,
      license: 'KZN 666-333',
      image: 'https://cdn.imagin.studio/getimage?customer=img&make=Audi&modelFamily=A3&zoomType=fullscreen',
      mileage: 17000,
      status: 'Active',
      lastService: '2024-05-30',
      value: 540000,
      fuelType: 'Petrol'
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
