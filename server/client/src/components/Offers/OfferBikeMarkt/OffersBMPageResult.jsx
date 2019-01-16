import React from 'react';
import ReactDOM from 'react-dom';

import {withStyles} from '@material-ui/core/styles';
//custom components
import Aux from '../../../hoc/Ax/Ax';
import OfferBMCustom from './OfferBMCustom.jsx';
//styles


const styles = theme => ({

});

var listElements = null;
var dummyElements = null;
class OfferBikeMarkt extends React.Component{
constructor(props) {
    super(props);

    this.state = {
        scoringData: {
            trueName: '', 
            price: 0, 
            currency: "currency", 
            median: 0, 
            countTotal: 0, 
            scores: 0
        },
        loading: true,
        fullSearchResults: [],
        rerender: false,
    }
    const dummyOffer = {
        dealer: "Nein",
        title: "Loading...",
        _id: "dummyId",
    };
    const dummyArray = [`d0`,`d1`,`d2`,`d3`,`d4`,`d5`,`d6`,`d7`,`d8`,`d9`];
    dummyElements = dummyArray.map((dummyItem, index) => {
        return <OfferBMCustom
                    key={dummyItem}
                    dummy
                    offer={dummyOffer}
                />
    });
}
rerender = () => {
    // console.log(`[2] RERENDERING`);
    this.setState({rerender: !this.state.rerender}, ()=> {})
}
async componentWillReceiveProps(nextProps){
    // console.log(`receiving offer BM [2] search pending  = ${nextProps.searchPending}`);
    // if(!nextProps.searchPending && nextProps.fullSearch)
    //     this.setState({fullSearchResults: nextProps.fullSearchResults})
    if(!nextProps.searchPending || nextProps.searchPending === undefined){
        const {classes, model, offers, fullSearch} = nextProps;
        // let offers = [];
        // if (fullSearch)
        
        // console.log(`[2]OFFERS:`);
        // console.log(offers);
        let fullSearchModel = ``;
        let fullSearchCategory = ``;
        
        listElements = await offers.map(offer => {
            // this.setState({loading: true}, ()=>{});
            // console.log(offer);
            let piclink = "";
            if(offer.pictures !== null || offer.pictures !== undefined){
                for (var x in offer.pictures){
                    const picUrl = offer.pictures[x];
                    if (picUrl !== null){
                        picUrl.length > 0? piclink = picUrl.replace(`large`, `medium`) : null;
                    }
                    break;
                }
            };
    
            if(fullSearch){
                switch (offer.category){
                    case "DHFrames":
                        fullSearchModel = model.dhframes
                        break;
                    case "Cranks":
                        fullSearchModel = model.cranks
                        break;
                    case "Hubs":
                        fullSearchModel = model.hubs
                        break;
                    case "EnduroFrames":
                        fullSearchModel = model.enduroframes
                        break;
                    case "Wheels":
                        fullSearchModel = model.wheels
                        break;
                    default:
                        break;
                }
                fullSearchCategory = offer.category;
            }
            return(
                <OfferBMCustom 
                    key={offer._id}
                    dummy={false}
                    offer={offer} 
                    piclink={piclink} 
                    tagUrl={this.props.tagUrl} 
                    model={this.props.fullSearch ? fullSearchModel : this.props.model}
                    rerender={this.props.rerender}
                    category={this.props.fullSearch ? fullSearchCategory: this.props.category}
                    fullSearch={this.props.fullSearch}
                    searchPending={this.props.searchPending}
                    rerender={this.rerender}
                />
            )
        }) ;
        await Promise.all(listElements).then(()=>{
            if (offers.length !== 0)
                this.setState({loading: false}, ()=>{})
        })
    }
}
shouldComponentUpdate(){
    if(!this.props.searchPending){
        return true;
    } else 
        return false;
}
render(){
    console.log('rerender');
    return (
        <Aux>
            {this.state.loading ? dummyElements : listElements}
        </Aux>)
    };
}
export default withStyles(styles)(OfferBikeMarkt);