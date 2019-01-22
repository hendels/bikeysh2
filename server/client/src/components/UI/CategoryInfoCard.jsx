import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
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
//<<variables
let categoryTitle = '';
//>>
const themeButton = createMuiTheme({
    overrides: {
        MuiButton: {
            root:{
                outline: "none",
                color: `#97AABD`,
            },
        },
        
    }
})
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
            <Grid container direction="column" justify="space-between" alignItems="center" className={classes.root}>
                <Grid item className={classes.cardContent}>
                    <span className={classes.cardTitle}>{categoryTitle}</span>
                </Grid>
                <Grid item>
                    <MuiThemeProvider theme={themeButton}>
                        <Button  size="small" fullWidth="true" 
                            onClick={this.handleClickOpenFavoritesFilter} 
                        >
                            Favorites
                        </Button>
                    </MuiThemeProvider>
                    <Button className={classes.cardButton} color="primary" size="small" fullWidth="true" 
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


export default withStyles(categoryInfoStyle)(withRouter(CategoryInfo));