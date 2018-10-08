import React from 'react';
import axios from 'axios';



import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
//app components
import BestOfferBar from '../containers/BestOfferBar/BestOfferBar.jsx';
import Spinner from '../components/UI/SpinnerOffers';
import BestOfferInfo from '../containers/PageInfos/PageInfo.jsx';
import CategoryBar from '../components/UI/CategoryBar';
const styles = theme => ({
    root: {
      flexGrow: 1,
      background: '#344054',
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing.unit * 2,
    },
  });
//   const applyCrankResult = (result) => (prevState) => ({
//     crankHits: result,
//     page: result.page,
//   });
//   const applyDhFramesResult = (result) => (prevState) => ({
//     dhFramesHits: result,
//     page: result.page,
//   });
//   const applyHubsResult = (result) => (prevState) => ({
//     hubsHits: result,
//     page: result.page,
//   });
//   const applyWheelsResult = (result) => (prevState) => ({
//     wheelsHits: result,
//     page: result.page,
//   });
//   const applyEnduroFramesResult = (result) => (prevState) => ({
//     enduroFramesHits: result,
//     page: result.page,
//   });
class HomePage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            crankHits: [],
            dhFramesHits: [],
            wheelsHits: [],
            hubsHits: [],
            enduroFramesHits: [],
            page: null,
            loading: false,
            reload: false,
        }
    }
    componentWillMount(){
        const setResult = 6;
        // this.fetchData(this.props.fetchUrls.bestoffer, setResult, 'cranks');
        // this.fetchData(this.props.fetchUrls.bestoffer, setResult, 'hubs');
        // this.fetchData(this.props.fetchUrls.bestoffer, setResult, 'dhframes');
    }
    // fetchData = async (fetchUrl, pageLimit, type) => {
    //     this.setState({loading: true});
    //     const url = `${fetchUrl}${type}/${pageLimit}`;
    //     console.log(url);
    //     await axios.get(url).then(
    //         response => response.data
    //     ).then(result => {
    //         this.onSetResult(result, type)
    //         this.setState({loading: false});})
    // }
    // onSetResult = async (result, offerType) => {
    //     switch(offerType){
    //         case 'cranks':   
    //             if (result.length !== 0) await this.setState(applyCrankResult(result));
    //             break;
    //         case 'dhframes':
    //             if (result.length !== 0) await this.setState(applyDhFramesResult(result));
    //             break;
    //         case 'wheels':
    //             if (result.length !== 0) await this.setState(applyWheelsResult(result));
    //             break;
    //         case 'enduroframes':
    //             if (result.length !== 0) await this.setState(applyEnduroFramesResult(result));
    //             break;
    //         case 'hubs':
    //             if (result.length !== 0) await this.setState(applyHubsResult(result));
    //             break;
    //         default:
    //             break;
    //     }
    // }
    
    render(){
        const { classes } = this.props;
        const spacing = 8;
        var cranks = this.state.crankHits;
        var dhframes = this.state.dhFramesHits;
        var hubs = this.state.hubsHits;

        return(
            <div>
            <BestOfferInfo imageUrl={this.props.imageUrls.defaultImage} pageInfoTitle={`best offers this week so far ...`}/>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                <Paper className={classes.root} elevation={10}>
                    {/* <Typography variant="headline" component="h2">
                    Some Chart?
                    </Typography> */}
                    {/* loading section => best offer section*/}
                    {this.state.loading ? <Spinner/> : (
                        <div>
                        <Grid container direction="column" justify="center" alignItems="stretch">
                            <CategoryBar category="Cranks"/>
                        </Grid>
                        <Grid container direction="row" className={classes.root} justify="space-evenly" alignItems="flex-start" spacing={Number(spacing)}>
                            <br/>
                            <BestOfferBar 
                                category="Cranks" 
                                bestUrl={this.props.fetchUrls.bestoffer}
                                //offerCount={cranks} 
                                fetchUrl={this.props.fetchUrls.cranks} 
                                tagUrl={this.props.fetchUrls.tags}
                                model={this.props.models.cranks}
                            />
                        </Grid>
                        <br/>
                        <Grid container direction="row" className={classes.root} justify="space-evenly" alignItems="center" spacing={Number(spacing)}>
                            <Grid container direction="column" justify="center" alignItems="stretch">
                                <CategoryBar category="Downhill Frames"/>
                            </Grid>
                            <br/>
                            <BestOfferBar 
                                category="Downhill Frames" 
                                //offerCount={dhframes} 
                                bestUrl={this.props.fetchUrls.bestoffer}
                                fetchUrl={this.props.fetchUrls.dhFrames} 
                                tagUrl={this.props.fetchUrls.tags}
                                model={this.props.models.dhframes}
                            />
                        </Grid>
                        <br/>
                        <Grid container direction="row" className={classes.root} justify="space-evenly" alignItems="center" spacing={Number(spacing)}>
                            <Grid container direction="column" justify="center" alignItems="stretch">
                                <CategoryBar category="Hubs"/>
                            </Grid>
                            <br/>
                            <BestOfferBar 
                                category="Hubs" 
                                //offerCount={hubs} 
                                bestUrl={this.props.fetchUrls.bestoffer}
                                fetchUrl={this.props.fetchUrls.hubs} 
                                tagUrl={this.props.fetchUrls.tags}
                                model={this.props.models.hubs}/>
                        </Grid>
                        </div>
                    )}
                    <p>&nbsp;</p>
                </Paper>
                </div>
            </div>
            </div>
        )
    }
}
HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePage);