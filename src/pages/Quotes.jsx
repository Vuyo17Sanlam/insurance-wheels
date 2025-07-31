import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Box,
  Avatar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';

const quotes = [
  {
    id: 1,
    provider: 'Sanlam',
    logo: 'data:image/png;base64,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',
    price: 'R430/month',
    excess: 'R2500 excess',
    cover: 'Comprehensive',
    benefits: ['Roadside assistance', 'Windscreen cover', '24/7 claims']
  },
  {
    id: 2,
    provider: 'Santam',
    logo: 'data:image/jpeg;base64,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',
    price: 'R470/month',
    excess: 'R3000 excess',
    cover: 'Third-Party + Theft',
    benefits: ['Emergency towing', 'Theft protection', 'Online claims']
  },
  {
    id: 3,
    provider: 'OUTsurance',
    logo: 'data:image/jpeg;base64,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',
    price: 'R390/month',
    excess: 'R2000 excess',
    cover: 'Third-Party',
    benefits: ['Basic cover', 'Accident support', 'Legal assistance']
  }
];

export default function InsuranceQuotes() {
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (quote) => {
    setSelectedQuote(quote);
    setOpenConfirm(true);
  };

  const handleConfirm = () => {
    setOpenConfirm(false);
    setShowSuccess(true);
    setTimeout(() => navigate('/dashboard'), 1500);
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto' }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Your insurance options
      </Typography>

      <Grid container spacing={3}>
        {quotes.map((quote) => (
          <Grid item xs={12} md={4} key={quote.id}>
            <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 1 }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    src={quote.logo}
                    alt={quote.provider}
                    sx={{ width: 50, height: 50, mr: 2 }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {quote.provider}
                  </Typography>
                </Box>

                <Typography variant="h5" sx={{ mb: 1, fontWeight: 700 }}>
                  {quote.price}
                </Typography>

                <Typography color="text.secondary" sx={{ mb: 1 }}>
                  {quote.excess} • {quote.cover}
                </Typography>

                <Box sx={{ my: 2 }}>
                  {quote.benefits.map((item, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <CheckIcon color="primary" sx={{ fontSize: 18, mr: 1 }} />
                      <Typography variant="body2">{item}</Typography>
                    </Box>
                  ))}
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => handleSelect(quote)}
                  sx={{ mt: 2 }}
                >
                  Choose this plan
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Confirm your selection</DialogTitle>
        <DialogContent>
          {selectedQuote && (
            <>
              <Typography sx={{ mb: 2 }}>
                You're about to choose <strong>{selectedQuote.provider}</strong> at {selectedQuote.price}.
              </Typography>
              <Typography>
                Your cover will start immediately after confirmation.
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Cancel</Button>
          <Button onClick={handleConfirm} variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={showSuccess}
        autoHideDuration={1500}
        onClose={() => setShowSuccess(false)}
      >
        <Alert severity="success">
          Your insurance is now active!
        </Alert>
      </Snackbar>
    </Box>
  );
}
