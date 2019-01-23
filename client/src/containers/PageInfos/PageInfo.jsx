import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import pageInfoStyle from '../../styles/components/pageInfoStyle';
//icons
import {FavoriteBorder, LibraryAdd} from '@material-ui/icons/';
class Info extends React.Component {
    render (){
    const { classes } = this.props;
    let extraString = null;
    let extraSpace = null;
    if (this.props.loadFavorites){
        extraString = <FavoriteBorder className={classes.iconFavorite}/>;
        extraSpace = ` `;
    } 
    if (this.props.loadWithoutTags){
        extraString = <LibraryAdd className={classes.iconTags}/>;
        extraSpace = ` `;
    } 
    return(
    <div 
        className={classes.container} 
        style={{
            background: `#000 url(${this.props.imageUrl})`,
            backgroundPosition: `${this.props.tweak}`,
            backgroundAttachment: `fixed`,
        }}
    >
        <li className={classes.list}>
            <h3 className={classes.title}>{extraString}{extraSpace}{this.props.pageInfoTitle}</h3>
        </li>
        <div className={classes.colorOverlay}></div>
    </div>
    )}
}

export default withStyles(pageInfoStyle)(Info);