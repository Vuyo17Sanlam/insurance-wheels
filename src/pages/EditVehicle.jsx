import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Container,
  CircularProgress,
} from '@mui/material';
import { getVehicles, updateVehicle } from '../api/Vehicle_Data';

const EditVehicle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vehicleList, setVehicleList] = useState([]);
  const [vehicle, setVehicle] = useState({
    make: '',
    model: '',
    year: '',
    license: '',
    image: '',
    mileage: '',
    status: '',
    lastService: '',
    value: '',
    fuelType: ''
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getVehicles();
        setVehicleList(data);

        const existing = data.find((v) => v.id === (id));
        if (existing) {
          setVehicle(existing);
        } else {
          console.warn(`Vehicle with ID ${id} not found.`);
        }
      } catch (error) {
        console.error('Failed to fetch vehicles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setVehicle((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const updatedData = { ...vehicle };
    delete updatedData.id;

    await updateVehicle(id, updatedData);
    console.log('Vehicle updated successfully');
    navigate('/dashboard');
  } catch (error) {
    console.error('Update failed:', error);
  }
};

  if (loading) {
    return (
      <Container maxWidth="xl" style={{ padding: '80px', textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
          Loading vehicle data...
        </Typography>
      </Container>
    );
  }

  return (
    <Card sx={{ maxWidth: 500, m: '30px auto', p: 2 }}>
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
<TextField
  label="Mileage"
  name="mileage"
  type="number"
  value={vehicle.mileage}
  onChange={handleChange}
  fullWidth
  margin="normal"
/>
<TextField
  label="Status"
  name="status"
  value={vehicle.status}
  onChange={handleChange}
  fullWidth
  margin="normal"
/>
<TextField
  label="Last Service Date"
  name="lastService"
  type="date"
  value={vehicle.lastService}
  onChange={handleChange}
  fullWidth
  margin="normal"
  InputLabelProps={{ shrink: true }}
/>
<TextField
  label="Value"
  name="value"
  type="number"
  value={vehicle.value}
  onChange={handleChange}
  fullWidth
  margin="normal"
/>
<TextField
  label="Fuel Type"
  name="fuelType"
  value={vehicle.fuelType}
  onChange={handleChange}
  fullWidth
  margin="normal"
/>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Save Changes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditVehicle;
