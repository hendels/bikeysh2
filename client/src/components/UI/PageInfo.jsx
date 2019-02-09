import React from 'react';
//@mui
import { withStyles } from '@material-ui/core/styles';
import {FavoriteBorder, LibraryAdd} from '@material-ui/icons/';
//styles
import pageInfoStyle from '../../styles/UI/pageInfoStyle';

const PageInfo = (props) => {
    const { classes } = props;
    let extraString = null;
    let extraSpace = null;
    if (props.loadFavorites){
        extraString = <FavoriteBorder className={classes.iconFavorite}/>;
        extraSpace = ` `;
    } 
    if (props.loadWithoutTags){
        extraString = <LibraryAdd className={classes.iconTags}/>;
        extraSpace = ` `;
    } 
    return(
    <div 
        className={classes.container} 
        style={{
            background: `#000 url(${props.imageUrl})`,
            backgroundPosition: `center`,
            backgroundSize: `auto`,
            backgroundRepeat: `no-repeat`,
        }}
    >
        <h3 className={classes.title}>{extraString}{extraSpace}{props.pageInfoTitle}</h3>
        <div className={classes.colorOverlay}></div>
    </div>
    )
}

export default withStyles(pageInfoStyle)(PageInfo);