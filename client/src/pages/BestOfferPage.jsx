import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import {Paper, Grid} from '@material-ui/core';
//app components
import BestOfferBar from '../containers/BestOfferBar';
import BestOfferInfo from '../components/UI/PageInfo';
import SnackbarHideOffer from '../components/Snackbars/Snackbar';
//styles
import bestOfferPageStyle from '../styles/pages/bestOfferPageStyle';

class BestOfferPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            page: null,
            loading: false,
            reloadBars: false,
            //snack
            showSnackHideOffer: false,
            objOffer: {id: 0, trueName: ''}
        }
    }
    handleSnack = (objOffer) => {
        if (!this.props.searchPending)
            this.setState({showSnackHideOffer: true, objOffer: objOffer}, () => {
            });
    }
    handleReload = () => {
        this.setState({reloadBars: !this.state.reload});
        this.forceUpdate();
    }
    shouldComponentUpdate(){
        return true;
    }
    render(){
        const { classes } = this.props;
        const spacing = 8;

        return(
            <div>
            <SnackbarHideOffer 
                open={this.state.showSnackHideOffer} 
                objOffer={this.state.objOffer} 
                reload={this.handleReload}
                searchPending={this.props.searchPending}
            />
            <BestOfferInfo imageUrl={this.props.imageUrls.bestOfferImage.url} pageInfoTitle={`best offers this week so far ...`}/>
                <Paper className={classes.root} elevation={10}>
                    <div>
                    <Grid 
                        className={classes.root} 
                        container 
                        direction="row" 
                        justify="space-evenly" 
                        alignItems="flex-start" 
                        spacing={Number(spacing)}
                    >
                        <BestOfferBar 
                            category="Cranks" 
                            bestUrl={this.props.fetchUrls.bestoffer}
                            tagUrl={this.props.fetchUrls.tags}
                            model={this.props.models.cranks}
                            showSnack={this.handleSnack}
                            reloadBar={this.state.reloadBars}
                            showFavorites={this.props.showFavorites}
                            showWithoutTags={this.props.showWithoutTags}
                            searchPending={this.props.searchPending}
                        />
                        <br/>
                    </Grid>
                    <Grid 
                        className={classes.root} 
                        container 
                        direction="row" 
                        justify="space-evenly" 
                        alignItems="center" 
                        spacing={Number(spacing)}
                    >
                        <BestOfferBar 
                            category="DHFrames" 
                            bestUrl={this.props.fetchUrls.bestoffer}
                            tagUrl={this.props.fetchUrls.tags}
                            model={this.props.models.dhframes}
                            showSnack={this.handleSnack}
                            reloadBar={this.state.reloadBars}
                            showFavorites={this.props.showFavorites}
                            showWithoutTags={this.props.showWithoutTags}
                            searchPending={this.props.searchPending}
                        />
                        <br/>
                    </Grid>
                    <Grid container direction="row" className={classes.root} justify="space-evenly" alignItems="center" spacing={Number(spacing)}>
                        <BestOfferBar 
                            category="Hubs" 
                            bestUrl={this.props.fetchUrls.bestoffer}
                            tagUrl={this.props.fetchUrls.tags}
                            model={this.props.models.hubs}
                            showSnack={this.handleSnack}
                            reloadBar={this.state.reloadBars}
                            showFavorites={this.props.showFavorites}
                            showWithoutTags={this.props.showWithoutTags}
                            searchPending={this.props.searchPending}
                        />
                        <br/>
                    </Grid>
                    <Grid container direction="row" className={classes.root} justify="space-evenly" alignItems="center" spacing={Number(spacing)}>
                        <BestOfferBar 
                            category="Wheels" 
                            bestUrl={this.props.fetchUrls.bestoffer}
                            tagUrl={this.props.fetchUrls.tags}
                            model={this.props.models.wheels}
                            showSnack={this.handleSnack}
                            reloadBar={this.state.reloadBars}
                            showFavorites={this.props.showFavorites}
                            showWithoutTags={this.props.showWithoutTags}
                            searchPending={this.props.searchPending}
                        />
                        <br/>
                    </Grid>
                    <Grid 
                        className={classes.root} 
                        container 
                        direction="row" 
                        justify="space-evenly" 
                        alignItems="center" 
                        spacing={Number(spacing)}
                    >
                        <BestOfferBar 
                            category="EnduroFrames" 
                            bestUrl={this.props.fetchUrls.bestoffer}
                            tagUrl={this.props.fetchUrls.tags}
                            model={this.props.models.enduroframes}
                            showSnack={this.handleSnack}
                            reloadBar={this.state.reloadBars}
                            showFavorites={this.props.showFavorites}
                            showWithoutTags={this.props.showWithoutTags}
                            searchPending={this.props.searchPending}
                        />
                        <br/>
                    </Grid>
                    
                    </div>
                    <br/>
                    <br/>
                    <br/>
                </Paper>
            </div>
        )
    }
}
// BestOfferPage.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(bestOfferPageStyle)(BestOfferPage);