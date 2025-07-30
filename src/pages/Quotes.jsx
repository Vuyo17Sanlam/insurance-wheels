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
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const quoteData = [
  {
    id: 1,
    provider: 'Sanlam',
    monthlyPremium: 'R430',
    excess: 'R2500',
    coverType: 'Comprehensive',
    benefits: ['Roadside Assistance', 'Windscreen Cover'],
  },
  {
    id: 2,
    provider: 'Santam',
    monthlyPremium: 'R470',
    excess: 'R3000',
    coverType: 'Third-Party, Fire & Theft',
    benefits: ['Emergency Towing', 'Theft Protection'],
  },
  {
    id: 3,
    provider: 'OUTsurance',
    monthlyPremium: 'R390',
    excess: 'R2000',
    coverType: 'Third-Party Only',
    benefits: ['Basic Cover', 'Road Accident Fund Support'],
  },
];

const Quotes = () => {
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleConfirm = (quote) => {
    setSelectedQuote(quote);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleFinalConfirm = () => {
    setOpenDialog(false);
    setShowSnackbar(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div style={{ padding: '2rem' }}>

      <Typography variant="subtitle1" gutterBottom>
         Confirm one quote and view a summary
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {quoteData.map((quote) => (
          <Grid item xs={12} md={4} key={quote.id}>
            <Card sx={{ borderRadius: '16px', backgroundColor: '#f5f5f5' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>{quote.provider}</Typography>
                <Typography variant="body1"> Premium: {quote.monthlyPremium}</Typography>
                <Typography variant="body2"> Cover: {quote.coverType}</Typography>
                <Typography variant="body2"> Excess: {quote.excess}</Typography>
                <Typography variant="body2"> Benefits:</Typography>
                <ul>
                  {quote.benefits.map((b, index) => (
                    <li key={index}>
                      <Typography variant="body2">{b}</Typography>
                    </li>
                  ))}
                </ul>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleConfirm(quote)}
                >
                  Confirm Quote
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm This Quote?</DialogTitle>
        <DialogContent>
          <Typography>
            You are about to confirm insurance with <strong>{selectedQuote?.provider}</strong> at <strong>{selectedQuote?.monthlyPremium}</strong>.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" color="success" onClick={handleFinalConfirm}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={2000}
        onClose={() => setShowSnackbar(false)}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Quote confirmed! Redirecting to dashboard...
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Quotes;
