import { useNavigate } from 'react-router';
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
  Chip,
  CardActions,
  Divider,
  Stack,
  Tooltip,
  Box

} from '@mui/material';
import {
  Edit,
  Receipt,
  Delete,
  Speed,
  LocalGasStation,
  CalendarToday,
  AttachMoney
} from '@mui/icons-material';

const Vehicle_Card = ({ vehicle, onDelete }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return 'success';
      case 'In Maintenance': return 'warning';
      case 'Out of Service': return 'error';
      default: return 'default';
    }
  };

  return (
    <Card sx={{
      maxWidth: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: 4
      }
    }}>
      <CardMedia
        component="img"
        height="180"
        image={vehicle.image || 'https://via.placeholder.com/300x150?text=No+Image'}
        alt={vehicle.make + ' ' + vehicle.model}
        sx={{ objectFit: 'cover' }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
          <Typography variant="h6" fontWeight="bold">
            {vehicle.make} {vehicle.model}
          </Typography>
          <Chip
            label={vehicle.status}
            color={getStatusColor(vehicle.status)}
            size="small"
          />
        </Box>

        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {vehicle.year} • {vehicle.license}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Stack spacing={1}>
          <Box display="flex" alignItems="center">
            <Speed color="action" sx={{ mr: 1 }} />
            <Typography variant="body2">
              {vehicle.mileage.toLocaleString()} km
            </Typography>
          </Box>

          <Box display="flex" alignItems="center">
            <LocalGasStation color="action" sx={{ mr: 1 }} />
            <Typography variant="body2">
              {vehicle.fuelType}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center">
            <CalendarToday color="action" sx={{ mr: 1 }} />
            <Typography variant="body2">
              Last service: {vehicle.lastService}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center">
            <AttachMoney color="action" sx={{ mr: 1 }} />
            <Typography variant="body2">
              Estimated value: R{vehicle.value}
            </Typography>
          </Box>
        </Stack>
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
        <Tooltip title="Edit vehicle details">
          <Button
            size="small"
            variant="outlined"
            startIcon={<Edit />}
            onClick={() => navigate(`/vehicles/${vehicle.id}/edit`)}
          >
            Edit
          </Button>
        </Tooltip>

        <Tooltip title="View quotes">
          <Button
            size="small"
            variant="outlined"
            startIcon={<Receipt />}
            onClick={() => navigate(`/quotes/${vehicle.id}`)}
          >
            Quotes
          </Button>
        </Tooltip>

        <Tooltip title="Delete vehicle">
          <Button
            size="small"
            variant="outlined"
            color="error"
            startIcon={<Delete />}
            onClick={() => onDelete(vehicle.id)}
          >
            Delete
          </Button>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default Vehicle_Card;
