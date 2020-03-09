import React, { useCallback } from 'react';
import { Avatar, Button, Paper, Grid, Typography } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/collection/168902)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(3),
    backgroundColor: theme.palette.primary.main,
  },
  description: {
    margin: theme.spacing(4),
    textAlign: 'center',
  },
  button: {
    margin: theme.spacing(7),
  },
}));

const HomePage: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();

  const handleClick = useCallback(() => {
    history.push('/calculation');
  }, []);

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            {`Hi there, you are in 'Calculation salary app'`}
          </Typography>
        </div>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <ArrowDownwardIcon />
          </Avatar>
          <Typography component="h2" variant="h5" className={classes.description}>
            Just click below to calculate your gross salary and get net salary with all caclulated
            taxes
          </Typography>
          <Avatar className={classes.avatar}>
            <ArrowDownwardIcon />
          </Avatar>
          <Button
            size="large"
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleClick}>
            Calculate
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default HomePage;
