import React from 'react';
import axios from 'axios';

import IconButton from '@material-ui/core/IconButton';
import {FavoriteBorder, Favorite} from '@material-ui/icons';


const FavoriteButton = (props) => {

    const handleAddToFavorite = async (event) => {
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