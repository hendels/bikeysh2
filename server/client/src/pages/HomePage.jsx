import React from 'react';
import axios from 'axios';



import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';

//app components
import BestOfferBar from '../containers/BestOfferBar/BestOfferBar.jsx';
import Spinner from '../components/UI/Spinner.jsx';

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
  const applyCrankResult = (result) => (prevState) => ({
    crankHits: result,
    page: result.page,
  });
  const applyDhFramesResult = (result) => (prevState) => ({
    dhFramesHits: result,
    page: result.page,
  });
  const applyHubsResult = (result) => (prevState) => ({
    hubsHits: result,
    page: result.page,
  });
  const applyWheelsResult = (result) => (prevState) => ({
    wheelsHits: result,
    page: result.page,
  });
  const applyEnduroFramesResult = (result) => (prevState) => ({
    enduroFramesHits: result,
    page: result.page,
  });
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
            loading: false
        }
    }
    componentWillMount(){
        this.fetchData(this.props.fetchUrls.bestoffer, 8, 'cranks');
        this.fetchData(this.props.fetchUrls.bestoffer, 8, 'hubs');
        this.fetchData(this.props.fetchUrls.bestoffer, 8, 'dhframes');
    }
    fetchData = async (fetchUrl, pageLimit, type) => {
        this.setState({loading: true});
        const url = `${fetchUrl}${type}/${pageLimit}`;
        console.log(url);
        const elo = await axios.get(url).then(
            response => response.data
        ).then(result => {
            this.onSetResult(result, type)
            this.setState({loading: false});})
    }
    onSetResult = async (result, offerType) => {
        switch(offerType){
            case 'cranks':   
                if (result.length !== 0) await this.setState(applyCrankResult(result));
                break;
            case 'dhframes':
                if (result.length !== 0) await this.setState(applyDhFramesResult(result));
                break;
            case 'wheels':
                if (result.length !== 0) await this.setState(applyWheelsResult(result));
                break;
            case 'enduroframes':
                if (result.length !== 0) await this.setState(applyEnduroFramesResult(result));
                break;
            case 'hubs':
                if (result.length !== 0) await this.setState(applyHubsResult(result));
                break;
            default:
                break;
        }
    }
    
    render(){
        const { classes } = this.props;
        const spacing = 8;
        var cranks = this.state.crankHits;
        var dhframes = this.state.dhFramesHits;
        var hubs = this.state.hubsHits;

        // let bestOfferCranks = this.state.crankHits;
        // if(this.state.loading) {
        //     bestOfferCranks = <Spinner/>;
        // }
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
                    Your best offers for today:
                    </Typography>
                    <p>  &nbsp;</p>
                    {/* <Typography component="p">
                    Paper can be used to build surface or other elements for your application.
                    </Typography>
                    <p>  &nbsp;</p> */}
                    {/* best offer section */}
                    {this.state.loading ? <Spinner/> : 
                    (<Grid container className={classes.root} justify="center" spacing={Number(spacing)}>
                        <BestOfferBar offerCount={cranks} category="CRANKS" fetchUrl={this.props.fetchUrls.cranks} tagUrl={this.props.fetchUrls.tags}/>
                    </Grid>)}
                    {/* <Grid container className={classes.root} justify="center" spacing={Number(spacing)}>
                        <BestOfferBar offerCount={cranks} category="CRANKS" fetchUrl={this.props.fetchUrls.cranks} tagUrl={this.props.fetchUrls.tags}/>
                    </Grid> */}
                    {/* <Spinner/> */}
                    <p>&nbsp;</p>
                    <Grid container className={classes.root} justify="center" spacing={Number(spacing)}>
                        <BestOfferBar offerCount={dhframes} category="DHFRAMES" fetchUrl={this.props.fetchUrls.dhFrames} tagUrl={this.props.fetchUrls.tags}/>
                    </Grid>
                    <p>&nbsp;</p>
                    <Grid container className={classes.root} justify="center" spacing={Number(spacing)}>                        
                        <BestOfferBar offerCount={hubs} category="HUBS" fetchUrl={this.props.fetchUrls.hubs} tagUrl={this.props.fetchUrls.tags}/>
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