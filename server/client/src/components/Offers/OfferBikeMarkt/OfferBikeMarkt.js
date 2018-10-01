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
import FavoriteButton from '../../FavButton/FavButtonBikeMarkt.jsx';
import TagButton from '../../Buttons/TagButton.jsx';

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
componentDidMount(){
    console.log(this.props);
}
    render(){
// const offerBikeMarkt = (props) => (
    var listElements = this.props.offers.map(offer => {
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
                        <li>czescczescczescczescczescczescczescczescczescczescczescczescczescczescczescczescczescczesc</li>
                        <li>dwa</li>
                        <li>3</li>
                    </div>
                    <b>{offer.title}</b> a tu?
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