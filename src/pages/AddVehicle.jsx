import { useState } from 'react';
import { useTheme } from '@mui/material/styles';

import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  MenuItem,
  Grid,
  Box,
  InputAdornment,
  Fade,
  Zoom,
  Divider
} from '@mui/material';
import { addVehicle} from '../api/Vehicle_Data';

import {
  DirectionsCar,
  CalendarToday,
  AttachMoney,
  Speed,
  LocalGasStation,
  Image as ImageIcon,
  CheckCircle
} from '@mui/icons-material';

export default function AddVehicle() {
  const theme = useTheme();

  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const [vehicle, setVehicle] = useState({
    make: '',
    model: '',
    year: '',
    license: '',
    image: '',
    mileage: '',
    status: 'Active',
    lastService: '',
    value: '',
    fuelType: 'Petrol',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicle(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addVehicle(vehicle);
      setSuccess(true);
      setTimeout(() => navigate('/vehicles'), 1500);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const formFields = [
    {
      label: 'Make',
      name: 'make',
      icon: <DirectionsCar color="action" />,
      xs: 12, sm: 6
    },
    {
      label: 'Model',
      name: 'model',
      xs: 12, sm: 6
    },
    {
      label: 'Year',
      name: 'year',
      type: 'number',
      inputProps: { min: 1900, max: new Date().getFullYear() },
      xs: 6, sm: 3
    },
    {
      label: 'License Plate',
      name: 'license',
      xs: 6, sm: 3
    },
    {
      label: 'Image URL',
      name: 'image',
      icon: <ImageIcon color="action" />,
      xs: 12
    },
    {
      label: 'Mileage (km)',
      name: 'mileage',
      type: 'number',
      icon: <Speed color="action" />,
      inputProps: { min: 0 },
      xs: 6, sm: 3
    },
    {
      label: 'Last Service',
      name: 'lastService',
      type: 'date',
      icon: <CalendarToday color="action" />,
      InputLabelProps: { shrink: true },
      xs: 6, sm: 3
    },
    {
      label: 'Value (R)',
      name: 'value',
      type: 'number',
      icon: <AttachMoney color="action" />,
      inputProps: { min: 0 },
      xs: 6, sm: 3
    },
  ];

  return (
    <Fade in={true} timeout={500}>
      <Card sx={{
        maxWidth: 800,
        margin: '2rem auto',
        p: 3,
        boxShadow: 3,
        borderRadius: 4,
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(to bottom right, #1e1e1e, #2d2d2d)'
          : 'linear-gradient(to bottom right, #f9f9f9, #ffffff)'
      }}>
        <CardContent>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 3,
            gap: 2
          }}>
            <DirectionsCar fontSize="large" color="primary" />
            <Typography variant="h4" component="h1" sx={{
              fontWeight: 700,
              background: theme.palette.mode === 'dark'
              ? 'linear-gradient(to right, #90caf9, #bbdefb)'
              : 'linear-gradient(to right, #1976d2, #4dabf5)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Add New Vehicle
            </Typography>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {success ? (
            <Zoom in={success}>
              <Box sx={{
                textAlign: 'center',
                py: 8,
                color: 'success.main'
              }}>
                <CheckCircle sx={{ fontSize: 80, mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  Vehicle Added Successfully!
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Redirecting to vehicle list...
                </Typography>
              </Box>
            </Zoom>
          ) : (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {formFields.map((field) => (
                  <Grid item xs={field.xs} sm={field.sm} key={field.name}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label={field.label}
                      name={field.name}
                      type={field.type || 'text'}
                      value={vehicle[field.name]}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: field.icon && (
                          <InputAdornment position="start">
                            {field.icon}
                          </InputAdornment>
                        ),
                        ...field.inputProps
                      }}
                      InputLabelProps={field.InputLabelProps || {}}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          '&:hover fieldset': {
                            borderColor: 'primary.main',
                          },
                        }
                      }}
                    />
                  </Grid>
                ))}

                <Grid item xs={6} sm={3}>
                  <TextField
                    select
                    fullWidth
                    label="Status"
                    name="status"
                    value={vehicle.status}
                    onChange={handleChange}
                    sx={{ borderRadius: 2 }}
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="In Maintenance">In Maintenance</MenuItem>
                    <MenuItem value="Out of Service">Out of Service</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={6} sm={3}>
                  <TextField
                    select
                    fullWidth
                    label="Fuel Type"
                    name="fuelType"
                    value={vehicle.fuelType}
                    onChange={handleChange}
                    sx={{ borderRadius: 2 }}
                  >
                    <MenuItem value="Petrol">Petrol</MenuItem>
                    <MenuItem value="Diesel">Diesel</MenuItem>
                    <MenuItem value="Electric">Electric</MenuItem>
                    <MenuItem value="Hybrid">Hybrid</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12} sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    size="large"
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      fontSize: '1rem',
                      fontWeight: 600,
                      boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                      '&:hover': {
                        boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)',
                        transform: 'translateY(-1px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Add Vehicle
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </CardContent>
      </Card>
    </Fade>
  );
}
