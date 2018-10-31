import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
//icons
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Bookmark from '@material-ui/icons/Bookmark';
// #app components

// #hoc components
// #style
import categoryInfoStyle from '../../styles/components/categoryInfoStyle.jsx';

class CategoryInfo extends React.Component {

    state = {
        offerCount: this.props.offerCount,
        expanded: false,
        grade: 'S',
        openTagDialog: false,
        scoringData: {
            trueName: '', price: 0, currency: "...", median: 0, 
            countTotal: 0, scores: 0, itemState: "not defined",
            yearTitle: 0, yearDescription: 0
        }
    }
    render(){
        const { classes } = this.props;
        return(
            <Card className={classes.card} square='true'>
            <Grid container direction="column" justify="space-between" alignItems="center" className={classes.root}>
                <Grid item className={classes.cardContent}>
                    {this.props.category}
                </Grid>
                <Grid item>
                    <Button className={classes.cardButton} color="primary" size="small" fullWidth="true" >
                        Missed deals
                    </Button>
                    <Button className={classes.cardButton} color="primary" size="small" fullWidth="true">
                        Favorites
                    </Button>
                    <Button className={classes.cardButton} color="primary" size="small" fullWidth="true" >
                        Statistics
                    </Button>
                </Grid>
            </Grid>
            </Card>
        )
    }
}

CategoryInfo.propTypes = {
    classes: PropTypes.object.isRequired,
  };


export default withStyles(categoryInfoStyle)(CategoryInfo);