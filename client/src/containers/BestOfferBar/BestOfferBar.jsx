import React from 'react';
import axios from 'axios';
import BestOffer from '../../components/Offers/BestOffer/BestOfferCustom.jsx';
import Grid from '@material-ui/core/Grid';
import Aux from '../../hoc/Ax/Ax.js';
import { withStyles } from '@material-ui/core/styles';
//config
import config from '../../config/config';
//app components
import CategoryInfo from '../../components/UI/CategoryInfoCard.jsx';
import Dummies from '../../components/UI/SpinnerOffers';
import LoadNext from '../../components/UI/LoadButtonNext.jsx';
// # styles

// # icons
// let pageLimit = 0;
// let windowWidth = 0;
// let windowHeight = 0;
const {prod} = config;

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


const styles = () => ({
    containerBackground: {
        marginRight: "auto",
        marginLeft: "auto",
        width: "100%",
        "@media (min-width: 576px)": {
          maxWidth: "540px"
        },
        "@media (min-width: 768px)": {
          maxWidth: "720px"
        },
        "@media (min-width: 992px)": {
          maxWidth: "960px"
        },
        "@media (min-width: 1200px)": {
          maxWidth: "1600px" //1600
        },
        // opacity: "0.9",
        background: "#314455",
        // flexBasis: 20,
    }
})

class BestOfferBar extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            offers: [],
            page: null,
            loading: false,
            reload: false,
            skipRange: 0,
            totalResult: 0,
            barTail: 0,
            pageLimit: this.getPageMeasures(window.outerWidth, window.outerHeight).pageLimit,
            categoryGridLen: this.getPageMeasures(window.outerWidth, window.outerHeight).categoryGridLen,
            arrowGridLen: this.getPageMeasures(window.outerWidth, window.outerHeight).arrowGridLen,
            bestOfferGridLen: this.getPageMeasures(window.outerWidth, window.outerHeight).bestOfferGridLen,
            mobileView: this.getPageMeasures(window.outerWidth, window.outerHeight).mobileView,
        }
    }
    getPageMeasures = (width, height) => {
        let currentWidth = 0;
        let currentHeight = 0;
        let resizeObj = {};
        
        currentWidth = width;
        currentHeight = height;
        if (currentWidth <= 425){
            resizeObj = {
                pageLimit: prod ? 1 : 1,
                categoryGridLen: 12,
                arrowGridLen: 6,
                bestOfferGridLen: 12,
                mobileView: true,
            }
        } 
        if (currentWidth <= 1560 && currentWidth > 425){
            resizeObj = {
                pageLimit: prod ? 3 : 1,
                categoryGridLen: 1,
                arrowGridLen: 1,
                bestOfferGridLen: 2,
                mobileView: false,
            }
        };
        if (currentWidth <= 1920 && currentWidth > 1560){
            resizeObj = {
                pageLimit: prod ? 4 : 1,
                categoryGridLen: 1,
                arrowGridLen: 1,
                bestOfferGridLen: 2,
                mobileView: false,
            }
        } 
        if (currentWidth > 1920){
            resizeObj = {
                pageLimit: prod ? 4 : 1,
                categoryGridLen: 1,
                arrowGridLen: 1,
                bestOfferGridLen: 2,
                mobileView: false,
            }
        }
        return resizeObj;
    }
    onResize = (e) => {
        const resizeObj = this.getPageMeasures(e.target.outerWidth, e.target.outerHeight);
        if (this.state.pageLimit !== resizeObj.pageLimit){
            this.setState({
                pageLimit: resizeObj.pageLimit,
                categoryGridLen: resizeObj.categoryGridLen,
                arrowGridLen: resizeObj.arrowGridLen,
                bestOfferGridLen: resizeObj.bestOfferGridLen,
                mobileView: resizeObj.mobileView,
            }, ()=> {
                // console.log(`W: ${e.target.outerWidth} H: ${e.target.outerHeight} PageLimit: ${resizeObj.pageLimit} CatGL: ${this.state.categoryGridLen} ArrowGL: ${this.state.arrowGridLen} BestGL: ${this.state.bestOfferGridLen}`);
                this.fetchData(this.props.bestUrl, this.state.skipRange, this.state.pageLimit, this.props.model);
            });
        }
    }
    fetchData = async (fetchUrl, skipRange, pageLimit, model) => {
        this.setState({loading: true});

        const urlTotalResult = `/scoring/category/${model}`;
        const url = `${fetchUrl}${model}/${skipRange}/${pageLimit}`;
        // console.log(url);
        await axios.get(urlTotalResult).then(response => response.data).then(async totalResult => {
            await axios.get(url).then(
                response => response.data
            ).then(result => {
                const countTail = (Math.ceil(totalResult.length / pageLimit) * pageLimit) - totalResult.length;
                this.onSetResult(result, model, totalResult.length)
                this.setState({loading: false, barTail: countTail});})
        })
    }
    handleReload = (objOffer) => {
        if (!this.props.searchPending){
            this.setState({reload: !this.state.reload}, () => {
                this.fetchData(this.props.bestUrl, this.state.skipRange, this.state.pageLimit, this.props.model);
                this.props.showSnack(objOffer);
                this.forceUpdate();
            });
        }
    }
    handleShowNextOffers = () => {
        if (this.state.skipRange + this.state.pageLimit >= this.state.totalResult) return;
        this.setState({skipRange: this.state.skipRange + this.state.pageLimit}, () => {
            this.fetchData(this.props.bestUrl, this.state.skipRange, this.state.pageLimit, this.props.model);
            this.forceUpdate();
        });
    }
    handleShowPreviousOffers = () => {
        if (this.state.skipRange - this.state.pageLimit < 0) return;
        this.setState({skipRange: this.state.skipRange - this.state.pageLimit}, () => {
            this.fetchData(this.props.bestUrl, this.state.skipRange, this.state.pageLimit, this.props.model);
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
        if(this.props.reloadBar) this.fetchData(this.props.bestUrl, this.state.skipRange, this.state.pageLimit, this.props.model);
    }
     
    componentWillMount(){
        window.addEventListener("resize", this.onResize);
        this.fetchData(this.props.bestUrl, this.state.skipRange, this.state.pageLimit, this.props.model);
    }
    componentWillUnmount(){
        window.removeEventListener("resize", this.onResize);
    }
    shouldComponentUpdate(){
        return !this.props.searchPending;
    }
    render(){
        const { classes } = this.props;
        const categoryInfo = (
            <Grid item xs={this.state.categoryGridLen}>
                <CategoryInfo 
                    category={this.props.category} 
                    showFavorites={this.props.showFavorites} 
                    showWithoutTags={this.props.showWithoutTags}
                    model={this.props.model}
                />
            </Grid>
        )
        const previousButton = (
            <Grid item xs={this.state.arrowGridLen}>
                <LoadNext onClick={this.handleShowPreviousOffers} mobileView={this.state.mobileView} caseHorizontal='left'/>
            </Grid>
        )
        const nextButton = (
            <Grid item xs={this.state.arrowGridLen}>
                <LoadNext onClick={this.handleShowNextOffers} mobileView={this.state.mobileView} caseHorizontal='right'/>
            </Grid>
        )
        // # add dummy placeholders to end of searching results
        const offersArray = this.state.offers;
        if (this.state.barTail !== 0 && this.state.offers.length !== this.state.pageLimit){
            for(let iTail = 0; iTail < this.state.barTail; iTail++){
                offersArray.push({_id: `dummy`, title:`dummy`});
            }
        }
        const offers = (
            offersArray.map(offer => {  
                return(
                    <Grid key={offer._id} item xs={this.state.bestOfferGridLen}>   
                        <BestOffer 
                            offer={offer} 
                            fetchUrl={this.props.fetchUrl} 
                            tagUrl={this.props.tagUrl} 
                            category={this.props.category} 
                            model={this.props.model}
                            reload={this.handleReload}
                            searchPending={this.props.searchPending}
                            mobileView={this.state.mobileView}
                        />
                    </Grid>
                )
            })
        );
        return(
            <Aux>
                <Grid container className={classes.containerBackground} justify="space-between" alignItems="center" alignContent="center" >
                    {categoryInfo}
                    {this.state.mobileView ? null : previousButton}
                    {this.state.loading ? <Dummies pageLimit={this.state.pageLimit}/> : (<Aux>{offers}</Aux>)}
                    {this.state.mobileView ? previousButton : null}
                    {nextButton}
                <br/>
                </Grid>
            </Aux>
        )
    }
}

export default withStyles(styles)(BestOfferBar);