import React from 'react';
import { withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import {Card, Button, Grid} from '@material-ui/core';
// #styles
import categoryInfoStyle from '../../styles/UI/categoryInfoCardStyle';
import {themeButton} from '../../styles/UI/categoryInfoCardStyle';

let categoryTitle = '';

class CategoryInfo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
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
    }
    handleClickOpenFavoritesFilter = async () => {
        await this.props.showFavorites(true);
        this.props.history.push(`/category/${this.props.model}`);
        window.scrollTo(0, 0);
    };
    handleClickOpenWithoutTagFilter = async () => {
        await this.props.showWithoutTags(true);
        this.props.history.push(`/category/${this.props.model}`);
        window.scrollTo(0, 0);
    }
    handleCloseDialog = () => {
        this.setState({ 
            openMissedDealsDialog: false,
            openStatisticsDialog: false,
        });
    };

    render(){
        const { classes } = this.props;
        switch(this.props.category.toLowerCase()){
            case 'dhframes':
                categoryTitle = 'Downhill Frames';
                break;
            case 'enduroframes':
                categoryTitle = 'Enduro Frames';
                break;
            case 'cranks':
                categoryTitle = 'Cranks';
                break;
            case 'hubs':
                categoryTitle = 'Hubs';
                break;
            default: 
                categoryTitle = 'Wheels';
                break;
        };
        return(
            <Card className={classes.card} square='true'>
                <Grid container direction="row" justify="space-between" alignItems="center" className={classes.root}>
                    <Grid item sm={12} md={12} lg={12} className={classes.cardContent}>
                        <span className={classes.cardTitle}>{categoryTitle}</span>
                    </Grid>
                    <Grid item sm={0} md={12} lg={12}/>
                    <Grid item sm={0} md={12} lg={12}/>
                    <Grid item sm={0} md={12} lg={12}/>
                    <Grid item sm={12} md={12} lg={12}>
                        <MuiThemeProvider theme={themeButton}>
                            <Button  size="small" fullWidth="true" 
                                onClick={this.handleClickOpenFavoritesFilter} 
                            >
                                Favorites
                            </Button>
                        
                            <Button size="small" fullWidth="true" 
                                onClick={this.handleClickOpenWithoutTagFilter} 
                            >
                                Without tag
                            </Button>
                        </MuiThemeProvider>
                    </Grid>
                </Grid>
            </Card>
        )
    }
}

CategoryInfo.propTypes = {
    classes: PropTypes.object.isRequired,
  };


export default withStyles(categoryInfoStyle)(withRouter(CategoryInfo));