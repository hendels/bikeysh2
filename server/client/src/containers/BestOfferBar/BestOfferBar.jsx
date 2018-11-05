import React from 'react';
import axios from 'axios';
import BestOffer from '../../components/Offers/BestOffer/BestOfferCustom.jsx';
import Grid from '@material-ui/core/Grid';
import Aux from '../../hoc/Ax/Ax.js';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
//app components
import CategoryInfo from '../../components/UI/CategoryInfoCard.jsx';
import Spinner from '../../components/UI/SpinnerOffers';
import LoadNext from '../../components/UI/LoadButtonNext.jsx';
// # styles
import containerStyle from '../../styles/components/generalPageStyle.jsx';

// # icons
const pageLimit = 5;
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

class BestOfferBar extends React.Component {
    state = {
        //erase?
        crankHits: [],
        dhFramesHits: [],
        wheelsHits: [],
        hubsHits: [],
        enduroFramesHits: [],
        //valid
        offers: [],
        page: null,
        loading: false,
        reload: false,
        skipRange: 0,
        totalResult: 0,
        barTail: 0
    }
    fetchData = async (fetchUrl, skipRange, pageLimit, model) => {
        this.setState({loading: true});

        const urlTotalResult = `/scoring/category/${model}`;
        const url = `${fetchUrl}${model}/${skipRange}/${pageLimit}`;

        await axios.get(urlTotalResult).then(response => response.data).then(async totalResult => {
            // console.log(`total for category ${model} = ${totalResult.length}`);
            await axios.get(url).then(
                response => response.data
            ).then(result => {

                const countTail = (Math.ceil(totalResult.length / pageLimit) * pageLimit) - totalResult.length;
                // console.log(`${model} === count tail: ${countTail}`);
                this.onSetResult(result, model, totalResult.length)
                this.setState({loading: false, barTail: countTail});})
        })
    }
    handleReload = (objOffer) => {
        this.setState({reload: !this.state.reload}, () => {
            this.fetchData(this.props.bestUrl, this.state.skipRange, pageLimit, this.props.model);
            this.props.showSnack(objOffer);
            this.forceUpdate();
            // console.log(`total result on bar = ${this.state.totalResult}`)
        });
        
    }
    handleShowNextOffers = () => {
        if (this.state.skipRange + pageLimit >= this.state.totalResult) return;
        this.setState({skipRange: this.state.skipRange + pageLimit}, () => {
            this.fetchData(this.props.bestUrl, this.state.skipRange, pageLimit, this.props.model);
            this.forceUpdate();
        });
    }
    handleShowPreviousOffers = () => {
        if (this.state.skipRange - pageLimit < 0) return;
        this.setState({skipRange: this.state.skipRange - pageLimit}, () => {
            this.fetchData(this.props.bestUrl, this.state.skipRange, pageLimit, this.props.model);
            this.forceUpdate();
        });
    }
    onSetResult = async (result, offerType, totalResult) => {
        switch(offerType){
            case 'cranks':   
                if (result.length !== 0) await this.setState(applyCrankResult(result), () => {this.setState({offers: result, totalResult: totalResult})});
                break;
            case 'dhframes':
                if (result.length !== 0) await this.setState(applyDhFramesResult(result), () => {this.setState({offers: result, totalResult: totalResult})});
                break;
            case 'wheels':
                if (result.length !== 0) await this.setState(applyWheelsResult(result), () => {this.setState({offers: result, totalResult: totalResult})});
                break;
            case 'enduroframes':
                if (result.length !== 0) await this.setState(applyEnduroFramesResult(result), () => {this.setState({offers: result, totalResult: totalResult})});
                break;
            case 'hubs':
                if (result.length !== 0) await this.setState(applyHubsResult(result), () => {this.setState({offers: result, totalResult: totalResult})});
                break;
            default:
                break;
        }
    }
    componentWillReceiveProps(){
        console.log(`received props for ${this.props.model}! ${this.props.reloadBar}`);
        if(this.props.reloadBar) this.fetchData(this.props.bestUrl, this.state.skipRange, pageLimit, this.props.model);

    }
    componentWillMount(){
        this.fetchData(this.props.bestUrl, this.state.skipRange, pageLimit, this.props.model);
    }
    render(){
        const { classes } = this.props;
        const categoryInfo = (
            <CategoryInfo category={this.props.category}/>
        )
        const previousButton = (
            <LoadNext onClick={this.handleShowPreviousOffers} caseHorizontal='left'/>
        )
        const nextButton = (
            <LoadNext onClick={this.handleShowNextOffers} caseHorizontal='right'/>
        )
        // # add dummy placeholders to end of searching results
        const offersArray = this.state.offers;
        if (this.state.barTail !== 0 && this.state.offers.length !== pageLimit){
            for(let iTail = 0; iTail < this.state.barTail; iTail++){
                offersArray.push({_id: `dummy`, title:`dummy`});
                console.log(`bar tail: ${this.state.barTail } i = ${iTail}`)
            }
        }
        // console.log(`offers ===`);
        // console.log(offersArray);

        const offers = (
            offersArray.map(offer => {  
                return(
                    <Grid key={offer._id} item>   
                        <BestOffer 
                            offer={offer} 
                            fetchUrl={this.props.fetchUrl} 
                            tagUrl={this.props.tagUrl} 
                            category={this.props.category} 
                            model={this.props.model}
                            reload={this.handleReload}
                        />
                    </Grid>
                )
            })
        )
        return(
            <Aux>
                <Grid container className={classes.containerBackground} direction="row" alignItems="center" justify="space-between">
                    {categoryInfo}
                    {previousButton}
                    {this.state.loading ? <Spinner pageLimit={pageLimit}/> : (<Aux>{offers}</Aux>)}
                    {nextButton}
                <br/>
                </Grid>
            </Aux>
        )
    }
}

export default withStyles(containerStyle)(BestOfferBar);