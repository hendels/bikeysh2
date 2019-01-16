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
    }
    const dummyOffer = {
        dealer: "Nein",
        title: "Loading..."
    };
    const dummyArray = [0,1,2,3,4,5,6,7,8,9];
    dummyElements = dummyArray.map((dummy, index) => {
        return <OfferBMCustom
                    key={index}
                    dummy
                    offer={dummyOffer}
                />
    });
}
async componentWillReceiveProps(nextProps){
    const {classes, offers, models, fullSearch} = nextProps;
    let fullSearchModel = ``;
    let fullSearchCategory = ``;
    
    listElements = await offers.map(offer => {
        let piclink = <a>No image at all.</a>;
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
                    fullSearchModel = models.dhframes
                    break;
                case "Cranks":
                    fullSearchModel = models.cranks
                    break;
                case "Hubs":
                    fullSearchModel = models.hubs
                    break;
                case "EnduroFrames":
                    fullSearchModel = models.enduroframes
                    break;
                case "Wheels":
                    fullSearchModel = models.wheels
                    break;
                default:
                    break;
            }
            fullSearchCategory = offer.category;
        }
        return(
            <OfferBMCustom 
                key={offer._id}
                offer={offer} 
                piclink={piclink} 
                tagUrl={this.props.tagUrl} 
                model={this.props.fullSearch ? fullSearchModel : this.props.model}
                rerender={this.props.rerender}
                category={this.props.fullSearch ? fullSearchCategory: this.props.category}
                fullSearch={this.props.fullSearch}
                searchPending={this.props.searchPending}
            />
        )
    }) ;
    await Promise.all(listElements).then(()=>{
        if (offers.length !== 0)
            this.setState({loading: false}, ()=>{})
    })
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
            {!this.state.loading ? listElements : dummyElements}
        </Aux>)
    };
}
export default withStyles(styles)(OfferBikeMarkt);