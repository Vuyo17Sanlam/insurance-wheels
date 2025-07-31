import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import CircularProgress from '@mui/material/CircularProgress';


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
  Snackbar,
  Alert,

} from '@mui/material';
import { Search, FilterAlt, Add } from '@mui/icons-material';
import Vehicle_Card from '../components/Vehicle_Card';
import { getVehicles, deleteVehicle } from '../api/Vehicle_Data';


const Vehicles = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });



  const [vehicleList, setVehicleList] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getVehicles();
        setVehicleList(data);
        console.log('Actual IDs:', data.map(v => v.id));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);




  const handleDelete = async (id) => {
    try {
      await deleteVehicle(id);
      setVehicleList((prev) => prev.filter((v) => v.id !== id));
      setSnackbar({ open: true, message: 'Vehicle deleted', severity: 'success' });
    } catch (error) {
      console.error('Delete failed:', error);
      setSnackbar({ open: true, message: 'Delete failed', severity: 'error' });
    }
  };

  const handleAddVehicle = () => {
    navigate('/vehicles/new');
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

  if (loading) {
    return (
      <Container maxWidth="xl" style={{ padding: '80px', textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" color="textSecondary" style={{ marginTop: '20px' }}>
          Loading vehicles...
        </Typography>
      </Container>
    );
  }


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

<Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Vehicles;
