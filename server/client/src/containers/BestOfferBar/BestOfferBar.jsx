import React from 'react';
import axios from 'axios';
import BestOffer from '../../components/Offers/BestOffer/BestOffer.jsx';
import Grid from '@material-ui/core/Grid';
import Aux from '../../hoc/Ax/Ax.js';
import Button from '@material-ui/core/Button';

//app components
import CategoryInfo from '../../components/UI/CategoryInfoCard.jsx';
import Spinner from '../../components/UI/SpinnerOffers';
// # icons
import Arrow from '@material-ui/icons/KeyboardArrowRight';
const setResult = 6;
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
        crankHits: [],
        dhFramesHits: [],
        wheelsHits: [],
        hubsHits: [],
        enduroFramesHits: [],
        offers: [],
        page: null,
        loading: false,
        reload: false,
    }
    fetchData = async (fetchUrl, pageLimit, model) => {
        this.setState({loading: true});
        const url = `${fetchUrl}${model}/${pageLimit}`;
        console.log(url);
        await axios.get(url).then(
            response => response.data
        ).then(result => {
            this.onSetResult(result, model)
            this.setState({loading: false});})
    }
    handleReload = () => {
        this.setState({reload: !this.state.reload}, () => {
            this.fetchData(this.props.bestUrl, setResult, this.props.model);
            this.forceUpdate();
        });
        
    }
    onSetResult = async (result, offerType) => {
        switch(offerType){
            case 'cranks':   
                if (result.length !== 0) await this.setState(applyCrankResult(result), () => {this.setState({offers: result})});
                break;
            case 'dhframes':
                if (result.length !== 0) await this.setState(applyDhFramesResult(result), () => {this.setState({offers: result})});
                break;
            case 'wheels':
                if (result.length !== 0) await this.setState(applyWheelsResult(result), () => {this.setState({offers: result})});
                break;
            case 'enduroframes':
                if (result.length !== 0) await this.setState(applyEnduroFramesResult(result), () => {this.setState({offers: result})});
                break;
            case 'hubs':
                if (result.length !== 0) await this.setState(applyHubsResult(result), () => {this.setState({offers: result})});
                break;
            default:
                break;
        }
    }
    componentWillMount(){
        
        this.fetchData(this.props.bestUrl, setResult, this.props.model);
    }
    render(){
        const categoryInfo = (
            <Grid key={'categoryInfo'} item>       
                <CategoryInfo category={this.props.category}/>
            </Grid>
        )
        const offers = (
            this.state.offers.map(offer => {  
                var index = this.state.offers.indexOf(offer);  
                console.log(`index : ${index} len : ${this.state.offers.length}`);
                return(
                <Aux>
                {index === 0 ? (
                null
                ): null}
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
                
                {index + 1 === this.state.offers.length ? (
                <Grid key={`lastButton`} item>   
                    <Button variant="fab" ><Arrow/></Button>
                </Grid>
                ) : null}
                </Aux>
                )
            })
        )
        return(
            this.state.loading ? <Spinner/> : (
                <Aux>
                    {categoryInfo}
                    {offers}

                </Aux>
            )

        )
    }
}

export default BestOfferBar;