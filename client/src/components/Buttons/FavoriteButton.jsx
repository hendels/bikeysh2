import React from 'react';
import axios from 'axios';

import {withStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';


import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';




const FavoriteButton = (props) => {

    const handleAddToFavorite = async (event) => {
        console.log(props.category);
        if (!props.dummy)
            await axios.post(`/api/bm/offer/fav`, {
                userId: 'sa',
                id: props.dataKey,
                markAs: !props.favorite,
                model: props.model
            })
            .then(response  => response.data)
            .then(result => {
                props.setFavorite(result);
            })
    }
    
    return(
        <IconButton style={{color: "#c4273b"}} onClick={handleAddToFavorite}>
            {props.favorite ? <Favorite/> : <FavoriteBorder />}
        </IconButton>
    )
}

export default FavoriteButton;