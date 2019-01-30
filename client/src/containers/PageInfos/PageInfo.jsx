import React from 'react';
import { withStyles } from '@material-ui/core/styles';
// import pageInfoStyle from '../../styles/components/pageInfoStyle';
//icons
import {FavoriteBorder, LibraryAdd} from '@material-ui/icons/';

const pageInfoStyle = theme => ({
    container: {
      color: `#fff`,
      height: "45vh",
      width: `100%`,
      display: `flex`,
      justifyContent: `center`,
      alignItems: `center`,
      position: `relative`,
      filter: `grayscale(50%)`,
    },
    colorOverlay: {
      width: `100%`,
      height: `100%`,
      opacity: `.7`,
      position: `absolute`,
      background: `linear-gradient(to bottom, #133160 0%,#c96567 100%)`
    },
    list: {
      zIndex: 1,
      listStyleType: `none`,
    },
    title: {
      fontFamily: `'Permanent Marker', cursive`,
      color: `#fff`,
      /* font-family: 'Pacifico', cursive; */
      fontSize: `45px`,
      zIndex: 1,
    },
    iconFavorite: {
      fontSize: `38px`,
      color: "#c96567"
    },
    iconTags: {
      fontSize: `38px`,
      color: "#000",
      opacity: `.45`,
    }
});


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
            backgroundSize: `cover`,
            backgroundAttachment: `fixed`,
            backgroundRepeat: `no-repeat`,
        }}
    >
        <h3 className={classes.title}>{extraString}{extraSpace}{props.pageInfoTitle}</h3>
        <div className={classes.colorOverlay}></div>
    </div>
    )
}

export default withStyles(pageInfoStyle)(PageInfo);