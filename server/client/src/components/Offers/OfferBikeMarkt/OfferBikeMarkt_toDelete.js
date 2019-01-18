import React from 'react';
import axios from 'axios';

import classes from './OfferBikeMarkt.css';
import {withStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
//icons
import InfoIcon from '@material-ui/icons/Info';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import DesiredAdd from '@material-ui/icons/PlaylistAdd';
import AddComment from '@material-ui/icons/NoteAdd';
//custom components
import Aux from '../../../hoc/Ax/Ax';
import FavoriteButton from '../../Buttons/FavoriteButton';
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
      width: 500,
      height: 400,
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
        // console.log(`scoring name: ${result[Object.keys(this.state.trueName)[0]]} for offer id: ${this.props.offer._id}`);
        // console.log(result[Object.keys(this.state.trueName)[0]]);
        // console.log(`scoring - name: ${result.scoring[0].fullName} price: ${result.scoring[0].price}`);
  });
}
render(){
// const offerBikeMarkt = (props) => (
var listElements = this.props.offers.map(offer => {
    //this.getScoringData();
    let piclink = <a>No image at all.</a>;
    if(offer.pictures !== null || offer.pictures !== undefined){
        for (var x in offer.pictures){
            piclink = <img src={offer.pictures[x]} alt={"No Image for: " + offer._id}/>
            break;
        }
    };
    
    return(
        <Aux>
        {/* <div className={classes.root}> */}
            <GridList cellHeight={200} className={classes.gridList} cols={2}>
            <GridListTile key="Subheader" cols={1} style={{ height: 'auto' }}>
                <ListSubheader component="div">
                <div>
                    <li>True Name: {this.state.trueName}</li>
                    <li>Scores: {this.state.scores}</li>
                </div>
                <b>{offer.title}</b>
                </ListSubheader>
            </GridListTile>
            <GridListTile key={offer._id}>
            {piclink}
            <GridListTileBar
                title={offer.title}
                subtitle={<div>
                            <span style={{color: "#FD8505"}}>{offer.price} </span>
                            <span>{offer.publishDate}</span>
                            </div>}
                titlePosition='bottom'
                actionIcon={
                <Aux>
                {/* info open dialog with detailed item information + photos */}
                <IconButton href={offer.productUrl} className={classes.icon} >
                    <InfoIcon />
                </IconButton>
                <TagButton onClick={this.handleClickOpenTagDialog} category={this.props.category} offer={offer} tagUrl={this.props.tagUrl}/>        
                <FavoriteButton dataKey={offer._id} favorite={offer.favorite} fetchUrl={this.props.fetchUrl}/>
                {/* add to desired list -  */}
                {/* add to search tags  - offers would be searched by tags and future offers would be analyzed by this tags and marked*/}

                {/* add comment */}
                </Aux>
                }
            />
            </GridListTile>
            </GridList>
        {/* </div> */}
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