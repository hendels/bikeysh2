import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';

//app components
import BestOfferBar from '../containers/BestOfferBar/BestOfferBar.jsx';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing.unit * 2,
    },
  });

class HomePage extends React.Component {
    // constructor(props){
    //     super(props);
    // }

    render(){
        const { classes } = this.props;
        const spacing = 8;
        var cranks = [1,2,3,4]
        var dhframes = [1,2,3,4]
        var hubs = [1,2,3,4]
        return(
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                <Paper className={classes.root} elevation={1}>
                    <p>  &nbsp;</p>
                    <Typography variant="headline" component="h2">
                    Some Chart?
                    </Typography>
                    <p>  &nbsp;</p>
                    <p>  &nbsp;</p>
                    <Typography variant="headline" component="h3">
                    This is a sheet of paper.
                    </Typography>
                    <p>  &nbsp;</p>
                    <Typography component="p">
                    Paper can be used to build surface or other elements for your application.
                    </Typography>
                    <p>  &nbsp;</p>
                    <Grid container className={classes.root} justify="center" spacing={Number(spacing)}>
                        <BestOfferBar offerCount={cranks} category="CRANKS"/>
                    </Grid>
                    <p>&nbsp;</p>
                    <Grid container className={classes.root} justify="center" spacing={Number(spacing)}>
                        <BestOfferBar offerCount={dhframes} category="DHFRAMES"/>
                    </Grid>
                    <p>&nbsp;</p>
                    <Grid container className={classes.root} justify="center" spacing={Number(spacing)}>
                        <BestOfferBar offerCount={hubs} category="HUBS"/>
                    </Grid>
                        
                    <p>&nbsp;</p>
                </Paper>
                </div>
            </div>
        )
    }
}
HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePage);