import React from 'react';
import axios from 'axios';

import {withStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';


import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';



class FavoriteButtonBikeMarkt extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            markedAs: this.props.favorite
        }
        this.handleAddToFavorite = this.handleAddToFavorite.bind(this);
    }
    handleAddToFavorite = async (event) => {
        console.log(this.props.dataKey);
        console.log(this.props.fetchUrl);
        // const selectedIndex = event.target.options.selectedIndex;
        // console.log(event.target.options[selectedIndex].getAttribute('data-key'));
        const favorite = await axios.post(this.props.fetchUrl + 'fav', {
            userId: 'przemy',
            id: this.props.dataKey,
            markAs: !this.props.favorite
          }) 
        // this.forceUpdate();
        this.setState({
            markedAs: false
        }, () => {});
        
    }
    handle
    render(){
        return(
        <IconButton style={{color: "#E31B23"}} onClick={this.handleAddToFavorite}>
            {this.state.markedAs ? <Favorite/> : <FavoriteBorder />}
        </IconButton>
        )
    }

}


    


export default FavoriteButtonBikeMarkt;