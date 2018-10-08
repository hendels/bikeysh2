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
        console.log(this.props.category);
        // await axios.post(this.props.fetchUrl + 'fav', {
        await axios.post(`/api/bm/offer/fav`, {
            userId: 'przemy',
            id: this.props.dataKey,
            markAs: !this.props.favorite,
            model: this.props.model
          })
          .then(response  => response.data)
          .then(result => {
                this.setState({markedAs: result}, () => {});
          })
    }
    render(){
        return(
        <IconButton style={{color: "#9E5A63"}} onClick={this.handleAddToFavorite}>
            {this.state.markedAs ? <Favorite/> : <FavoriteBorder />}
        </IconButton>
        )
    }

}


    


export default FavoriteButtonBikeMarkt;