import { useNavigate } from 'react-router';

import { Card, CardContent, Typography, Button, CardMedia } from '@mui/material';

const Vehicle_Card = ({ vehicle, onDelete }) => {
    const navigate = useNavigate();

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



      <div style={{ marginTop: '10px' }}>
        <Button
          size="small"
          variant="outlined"
          onClick={() => navigate(`/vehicles/${vehicle.id}/edit`)}
          style={{ marginRight: '5px' }}
        >
          Edit
        </Button>
        <Button
          size="small"
          variant="outlined"
          onClick={() => navigate(`/quotes/${vehicle.id}`)}
          style={{ marginRight: '5px' }}
        >
          Quotes
        </Button>
        <Button
          size="small"
          variant="outlined"
          color="error"
          onClick={() => onDelete(vehicle.id)}
        >
          Delete
        </Button>
      </div>
    </Card>
  );
};

export default Vehicle_Card;
