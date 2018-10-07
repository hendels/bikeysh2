import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
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
            trueName: '', price: 0, currency: "...Loading", median: 0, 
            countTotal: 0, scores: 0, itemState: "not defined",
            yearTitle: 0, yearDescription: 0
        }
    }
    render(){
        const { classes } = this.props;
        return(
            <Card className={classes.card}>
                <CardHeader
                avatar={
                    <Bookmark/>
                }
                action={
                    <IconButton>
                    <MoreVertIcon />
                    </IconButton>
                }
                />
                <CardContent className={classes.cardContent}>
                    {this.props.category}
                </CardContent>
            </Card>
        )
    }
}

CategoryInfo.propTypes = {
    classes: PropTypes.object.isRequired,
  };


export default withStyles(categoryInfoStyle)(CategoryInfo);