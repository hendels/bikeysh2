import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
// #app components
import MissedDealsDialog from '../Dialogs/StatisticsDialog';
import FavoritesDialog from '../Dialogs/StatisticsDialog';
import StatisticsDialog from '../Dialogs/StatisticsDialog';
// #hoc components
// #style
import categoryInfoStyle from '../../styles/components/categoryInfoStyle.jsx';

class CategoryInfo extends React.Component {

    state = {
        offerCount: this.props.offerCount,
        expanded: false,
        openMissedDealsDialog: false,
        openFavoritesDialog: false,
        openStatisticsDialog: false,
        scoringData: {
            trueName: '', price: 0, currency: "...", median: 0, 
            countTotal: 0, scores: 0, itemState: "not defined",
            yearTitle: 0, yearDescription: 0
        },

    }
    handleClickOpenMissedDealsDialog = () => {
        this.setState({openMissedDealsDialog: true});
    };
    handleClickOpenFavoritesFilter = async () => {
        await this.props.showFavorites(true);
    };
    handleClickOpenStatisticsDialog = () => {
        this.setState({openStatisticsDialog: true});
    };
    handleClickOpenWithoutTagFilter = async () => {
        await this.props.showWithoutTags(true);
    }
    handleCloseDialog = () => {
        this.setState({ 
            openMissedDealsDialog: false,
            //openFavoritesDialog: false,
            openStatisticsDialog: false,
        });
    };
    render(){
        const { classes } = this.props;
        return(
            <Card className={classes.card} square='true'>
            <Grid container direction="column" justify="space-between" alignItems="center" className={classes.root}>
                <Grid item className={classes.cardContent}>
                    {this.props.category}
                </Grid>
                <Grid item>
                    <Button className={classes.cardButton} color="primary" size="small" fullWidth="true" onClick={this.handleClickOpenMissedDealsDialog}>
                        Missed deals
                    </Button>
                    <Button className={classes.cardButton} color="primary" size="small" fullWidth="true" 
                        onClick={this.handleClickOpenFavoritesFilter} component={Link} 
                        to={`/category/${this.props.model}`}
                    >
                        Favorites
                    </Button>
                    <Button className={classes.cardButton} color="primary" size="small" fullWidth="true" 
                        onClick={this.handleClickOpenStatisticsDialog}  >
                        Statistics
                    </Button>
                    <Button className={classes.cardButton} color="primary" size="small" fullWidth="true" 
                        component={Link} to={`/category/${this.props.model}`}
                        onClick={this.handleClickOpenWithoutTagFilter} 
                    >
                        Without tag
                    </Button>
                </Grid>
                <MissedDealsDialog
                    open={this.state.openMissedDealsDialog}
                    onClose={this.handleCloseDialog}
                />
                <FavoritesDialog
                    open={this.state.openFavoritesDialog}
                    onClose={this.handleCloseDialog}
                />
                <StatisticsDialog
                    open={this.state.openStatisticsDialog}
                    onClose={this.handleCloseDialog}
                    category={this.props.category}
                />
            </Grid>
            </Card>
        )
    }
}

CategoryInfo.propTypes = {
    classes: PropTypes.object.isRequired,
  };


export default withStyles(categoryInfoStyle)(CategoryInfo);