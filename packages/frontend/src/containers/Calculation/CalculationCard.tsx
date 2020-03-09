import React from 'react';
import { CssBaseline, Typography, Box, Container, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const CalculationCard: React.FC = () => {
  const classes = useStyles();
  const time = new Date().getFullYear();

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Calculating app
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          This API calculates the net salary from the given gross salary and visualizes this data in
          a meaningful way (Per month and yearly basis) by table and pie chart.
        </Typography>
      </Container>
      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Box mt={5}>
          <Typography variant="body2" color="textSecondary" align="center">
            <Link color="inherit" href="https://www.linkedin.com/in/nikita-osaulenko-1b0927178/">
              {`My LinkedIn link `}
            </Link>
            <div>{time}</div>
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default CalculationCard;
