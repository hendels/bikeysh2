import React from 'react';

import {withStyles} from '@material-ui/core/styles';
//custom components
import Aux from '../../../hoc/Ax/Ax';
import OfferBMCustom from './OfferBMCustom.jsx';
//styles


const styles = theme => ({
    root: {
    //   display: 'flex',
    //   flexWrap: 'nowrap',
    //   justifyContent: 'space-around',
    //   position: 'relative',
        width: 1000,
        height: 200,
    },
    gridElement: {
      width: 1000,
      height: 200,
      position: "relative"
      
    },
    gridElementDownbar: {
        position: 'relative',
        // zIndex: 1,
        minWidth: 1000,
        minHeight: 50,
        background: "#000",
        opacity: "0.5",
        color: "#fff"
    },
    gridElementInfo: {
        width: 250,
        height: 200,
        background: "#2c338d"
    },
    actionItem: {
        margin: "auto",
        width: "50%"
    },
    avatar: {
        backgroundColor: `#C96567`,
        fontSize: `20px`,
        fontFamily: `Lobster`,
        textShadow: `1px 1px #314455`,
    },
  });


class offerBikeMarkt extends React.Component{

state = {scoringData: {trueName: '', price: 0, currency: "currency", median: 0, countTotal: 0, scores: 0},}
render(){
const {classes} = this.props;
var listElements = this.props.offers.map(offer => {
    let piclink = <a>No image at all.</a>;
    if(offer.pictures !== null || offer.pictures !== undefined){
        for (var x in offer.pictures){
            piclink = offer.pictures[x]
            break;
        }
    };
    return(
        <OfferBMCustom offer={offer} piclink={piclink} fetchUrl={this.state.fetchUrl} tagUrl={this.props.tagUrl} model={this.props.model}/>
    )
}) ;
return (
    <Aux>
        {listElements}
    </Aux>
)};
}
export default withStyles(styles)(offerBikeMarkt);