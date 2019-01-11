import React from 'react';

import {withStyles} from '@material-ui/core/styles';
//custom components
import Aux from '../../../hoc/Ax/Ax';
import OfferBMCustom from './OfferBMCustom.jsx';
//styles


const styles = theme => ({

});


class OfferBikeMarkt extends React.Component{

state = {scoringData: {trueName: '', price: 0, currency: "currency", median: 0, countTotal: 0, scores: 0},}
render(){
    const {classes} = this.props;
    let fullSearchModel = ``;
    let fullSearchCategory = ``;
    var listElements = this.props.offers.map(offer => {
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

        if(this.props.fullSearch){
            switch (offer.category){
                case "DHFrames":
                    fullSearchModel = this.props.models.dhframes
                    break;
                case "Cranks":
                    fullSearchModel = this.props.models.cranks
                    break;
                case "Hubs":
                    fullSearchModel = this.props.models.hubs
                    break;
                case "EnduroFrames":
                    fullSearchModel = this.props.models.enduroframes
                    break;
                case "Wheels":
                    fullSearchModel = this.props.models.wheels
                    break;
                default:
                    break;
            }
            fullSearchCategory = offer.category;
        }
        return(
            <OfferBMCustom 
                offer={offer} 
                piclink={piclink} 
                fetchUrl={this.state.fetchUrl} 
                tagUrl={this.props.tagUrl} 
                model={this.props.fullSearch ? fullSearchModel : this.props.model}
                rerender={this.props.rerender}
                category={this.props.fullSearch ? fullSearchCategory: this.props.category}
                fullSearch={this.props.fullSearch}
                // unmount={this.props.unmount}
            />
        )
    }) ;
    return (
        <Aux>
            {listElements}
        </Aux>)
    };
}
export default withStyles(styles)(OfferBikeMarkt);