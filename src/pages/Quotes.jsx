import  { useState } from 'react';

import { Card, CardContent, Typography, Button, Grid, List, ListItem } from '@mui/material';

const Quotes = () => {

    const [selectedQuote, setSelectedQuote] = useState(null);

  const quoteData = [
    {
      id: 1,
      provider: 'Sanlam',
      monthlyPremium: 'R430',
      coverType: 'Comprehensive',
      excess: 'R2500',
      coverType: 'Comprehensive',
      benefits: ['Roadside Assistance', 'Windscreen Cover'],

    },
    {
      id: 2,
      provider: 'Santam',
      monthlyPremium: 'R470',
      coverType: 'Third-Party, Fire & Theft',
      excess: 'R2500',
      coverType: 'Comprehensive',
      benefits: ['Roadside Assistance', 'Windscreen Cover'],

    },
    {
      id: 3,
      provider: 'OUTsurance',
      monthlyPremium: 'R390',
      coverType: 'Third-Party Only',
      excess: 'R2500',
      coverType: 'Comprehensive',
      benefits: ['Roadside Assistance', 'Windscreen Cover'],

    }
  ];
  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h6" gutterBottom>
        Select a Quote
      </Typography>

      <Grid container spacing={3}>
        {quoteData.map((quote) => (
          <Grid item xs={12} md={4} key={quote.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{quote.provider}</Typography>
                <Typography>Premium: {quote.monthlyPremium}</Typography>
                <Typography>Cover: {quote.coverType}</Typography>

                {selectedQuote === quote.id && (
                  <div style={{ marginTop: '10px' }}>
                    <Typography>Excess: {quote.excess}</Typography>
                    <Typography>Benefits:</Typography>
                    <List dense>
                      {quote.benefits.map((b, i) => (
                        <ListItem key={i}>{b}</ListItem>
                      ))}
                    </List>
                  </div>
                )}
                 <Button
                  variant="contained"
                  onClick={() => setSelectedQuote(quote.id)}
                  style={{ marginTop: '10px' }}
                >
                  {selectedQuote === quote.id ? 'Selected' : 'Select'}
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
