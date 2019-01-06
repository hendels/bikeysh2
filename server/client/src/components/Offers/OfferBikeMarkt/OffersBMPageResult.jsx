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
        return(
            <OfferBMCustom 
                offer={offer} 
                piclink={piclink} 
                fetchUrl={this.state.fetchUrl} 
                tagUrl={this.props.tagUrl} 
                model={this.props.model}
                rerender={this.props.rerender}
                category={this.props.category}
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