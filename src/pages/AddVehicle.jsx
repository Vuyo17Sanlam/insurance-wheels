import { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
} from '@mui/material';

const mockVehicles = [
  {
    id: 1,
    make: 'Toyota',
    model: 'Camry',
    year: 2020,
    license: 'ABC-1234',
    image:
      'https://cdn.imagin.studio/getimage?customer=scs&make=Toyota&modelFamily=Camry&zoomType=fullscreen',
  },
  {
    id: 2,
    make: 'Honda',
    model: 'Civic',
    year: 2019,
    license: 'XYZ-5678',
    image:
      'https://cdn.imagin.studio/getimage?customer=scs&make=Honda&modelFamily=Civic&zoomType=fullscreen',
  },
];

const AddVehicle = () => {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    license: '',
    image: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newVehicle = {
      id: mockVehicles.length + 1,
      ...formData,
      year: parseInt(formData.year),
    };
    mockVehicles.push(newVehicle);
    console.log('Vehicle Added:', newVehicle);
    alert('Vehicle added successfully!');
    setFormData({
      make: '',
      model: '',
      year: '',
      license: '',
      image: '',
    });
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, mt: 5, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom textAlign="center">
          Add a New Vehicle
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="Make"
            name="make"
            value={formData.make}
            onChange={handleChange}
            required
          />
          <TextField
            label="Model"
            name="model"
            value={formData.model}
            onChange={handleChange}
            required
          />
          <TextField
            label="Year"
            name="year"
            type="number"
            value={formData.year}
            onChange={handleChange}
            required
          />
          <TextField
            label="License Plate"
            name="license"
            value={formData.license}
            onChange={handleChange}
            required
          />
          <TextField
            label="Image URL"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/car.jpg"
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Add Vehicle
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddVehicle;
