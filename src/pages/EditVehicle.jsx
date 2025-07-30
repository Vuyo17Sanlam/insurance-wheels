import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
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

const EditVehicle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState({
    make: '',
    model: '',
    year: '',
    license: '',
    image: '',
  });

  useEffect(() => {
    const existing = mockVehicles.find((v) => v.id === Number(id));
    if (existing) {
      setVehicle(existing);
    }
  }, [id]);

  const handleChange = (e) => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Vehicle:', vehicle);
    navigate('/dashboard');
  };

  return (
    <Card style={{ maxWidth: 500, margin: '30px auto', padding: '20px' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Edit Vehicle Details
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Make"
            name="make"
            value={vehicle.make}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Model"
            name="model"
            value={vehicle.model}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Year"
            name="year"
            type="number"
            value={vehicle.year}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="License Plate"
            name="license"
            value={vehicle.license}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Image URL"
            name="image"
            value={vehicle.image}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: '20px' }}
          >
             Save Changes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditVehicle;
