import { useState } from 'react';
import { TextField, Select, MenuItem, Button, Typography } from '@mui/material';
import Vehicle_Card from '../components/Vehicle_Card';

const Dashboard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [yearFilter, setYearFilter] = useState('');

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
    }
  ];

  const [vehicleList, setVehicleList] = useState(vehicles);

  const filteredVehicles = vehicleList.filter((v) => {
    const matchSearch = v.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      v.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchYear = yearFilter ? v.year.toString() === yearFilter : true;
    return matchSearch && matchYear;
  });


  return (
    <div style={{ padding: '20px' }}>
       <Typography variant="h5" style={{ marginBottom: '20px' }}>
Vehicle Dashboard  </Typography>

<div style={{ marginBottom: '20px' }}>
        <TextField
          label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginRight: '10px' }}
          size="small"
        />
        <Select
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          displayEmpty
          size="small"
          style={{ marginRight: '10px', width: '120px' }}
        >
          <MenuItem value="">All Years</MenuItem>
          <MenuItem value="2021">2021</MenuItem>
          <MenuItem value="2020">2020</MenuItem>
          <MenuItem value="2019">2019</MenuItem>
        </Select>
      </div>

      {filteredVehicles.map((v) => (
        <Vehicle_Card key={v.id} vehicle={v} />
      ))}
    </div>
  );
};

export default Dashboard;
