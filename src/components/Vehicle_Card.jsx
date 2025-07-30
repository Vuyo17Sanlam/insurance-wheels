import { Card, CardContent, Typography, CardMedia } from '@mui/material';

const Vehicle_Card = ({ vehicle }) => {
  return (
    <Card style={{ maxWidth: 300, margin: '10px auto' }}>
      <CardMedia
        component="img"
        height="150"
        image={vehicle.image || 'https://via.placeholder.com/300x150?text=No+Image'}
        alt={vehicle.make + ' ' + vehicle.model}
      />
      <CardContent>
        <Typography variant="h6">
          {vehicle.make} {vehicle.model}
        </Typography>
        <Typography variant="body2">
          Year: {vehicle.year}
        </Typography>
        <Typography variant="body2">
          License: {vehicle.license}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Vehicle_Card;
