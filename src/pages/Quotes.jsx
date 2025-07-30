import { Card, CardContent, Typography, Button, Grid } from '@mui/material';

const Quotes = () => {
  const quoteData = [
    {
      id: 1,
      provider: 'Sanlam',
      monthlyPremium: 'R430',
      coverType: 'Comprehensive'
    },
    {
      id: 2,
      provider: 'Santam',
      monthlyPremium: 'R470',
      coverType: 'Third-Party, Fire & Theft'
    },
    {
      id: 3,
      provider: 'OUTsurance',
      monthlyPremium: 'R390',
      coverType: 'Third-Party Only'
    }
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h6" gutterBottom>
        Available Quotes
      </Typography>

      <Grid container spacing={3}>
        {quoteData.map((quote) => (
          <Grid item xs={12} md={4} key={quote.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{quote.provider}</Typography>
                <Typography>Premium: {quote.monthlyPremium}</Typography>
                <Typography>Cover: {quote.coverType}</Typography>
                <Button variant="outlined" style={{ marginTop: '10px' }}>
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Quotes;
