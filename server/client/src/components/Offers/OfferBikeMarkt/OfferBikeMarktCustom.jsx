import React from 'react';
import axios from 'axios';

import classes from './OfferBikeMarkt.css';
import {withStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
//icons
import InfoIcon from '@material-ui/icons/Info';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import DesiredAdd from '@material-ui/icons/PlaylistAdd';
import AddComment from '@material-ui/icons/NoteAdd';
//custom components
import Aux from '../../../hoc/Ax/Ax';
import FavoriteButton from '../../FavButton/FavButtonBikeMarkt';
import TagButton from '../../Buttons/TagButton';

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 1000,
      height: 200,
      
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    actionIcon: {
      color: '#EED251',
    },
  });


class offerBikeMarkt extends React.Component{

state = {scoringData: {trueName: '', price: 0, currency: "currency", median: 0, countTotal: 0, scores: 0},}
componentDidMount(){
    // console.log(this.props);
}
getScoringData = async () => {
    await axios.get('/api/scoring/' + this.props.offers._id).then(response  => response.data).then(result => {
        var scoringData = {
            trueName: result.scoring[0].fullName,
            price: result.scoring[0].price,
            currency: result.scoring[0].currency,
            median: result.scoring[0].median,
            countTotal: result.scoring[0].countTotal,
            scores: result.scoring[0].scores
        }
        this.setState({scoringData: scoringData}, () => {});
  });
}
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
        <Aux>
        <div className={classes.gridList} style={{
            background: `#000 url(${piclink})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
        }}>
            {/* <span
                className={classes.imageSrc}
            /> */}
            {offer.title}
            date / price / trending - views / scores / tradesman / true name / stats for true name / href / fav / tags /used - new
            transated description - first 100 sign?
            hide from list 
            check for availability url - mark as unavailable / available
            3 top parameters per category : wheel size / 142 / frame size
            //description on below image bar - on hoover show 255 signs? train animation//
            //functions on the right side icons and actions//
        </div>
        </Aux>
    )
}) ;
return (
<div>
    {listElements}
</div>
)}   ;
// )
    }
export default withStyles(styles)(offerBikeMarkt);