import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
// #app components
// import MissedDealsDialog from '../Dialogs/StatisticsDialog';
// import FavoritesDialog from '../Dialogs/StatisticsDialog';
// import StatisticsDialog from '../Dialogs/StatisticsDialog';
// #hoc components
// #style
//import categoryInfoStyle from '../../styles/components/categoryInfoStyle.jsx';
//<<variables
let categoryTitle = '';
//>>

const categoryInfoStyle = theme => ({
    root:{
      width: 180,
      height: 350,

      padding: '1.5em 0 1.5em 0',

      "@media (max-width: 425px)": {
        height: "10vh",
        width: "100vw",
        padding: '0 0 0 0',

      }
    },
    card: {
      width: 180,
      height: 350,

      background: `linear-gradient(180deg, #000 0%, #041424 1%)`,

      "@media (max-width: 425px)": {
        height: "10vh",
        width: "100vw",
        padding: '0 0 0 0',
      }
    },
    cardContent: {
      textAlign: `center`,
    },
    cardTitle:{
      fontFamily: "Pacifico, cursive",
      fontSize: "25px",
      color: `rgba(255,255,255,0.5)`,

      textShadow: `1px 1px #C96567`,
      // background: "purple", //[dev]
      "@media (max-width: 425px)": {
        paddingLeft: '20px',
      },
      "@media (max-width: 375px)": {
        paddingLeft: '20px',
        fontSize: "20px",
    },
    },
});
const themeButton = createMuiTheme({
    overrides: {
        MuiButton: {
            root:{
                outline: "none",
                color: `#97AABD`,
                // background: "green", //[dev]
                borderRadius: 0,
                "@media (max-width: 425px)": {
                    border: '1px solid rgba(151, 170, 189, 0.2)',
                },

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