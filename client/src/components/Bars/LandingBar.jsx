import React from 'react';
import { withStyles } from '@material-ui/core/styles';
//app components
import BigSquareButton from '../Buttons/BigSquareButton';
//styles
import landingBarStyle from '../../styles/components/Bars/landingBarStyle';

const LandingButton = (props) => {
    const { classes } = props;
    return(
        <div className={classes.container} 
            style={{
                background: `url(${props.imageUrl})`,
                backgroundAttachment: `fixed`,
                backgroundPosition: `center`,
                backgroundRepeat: `no-repeat`,
                backgroundSize: `cover`,
            }}
            >   
            <div className={classes.colorOverlay}></div>
            <div className={classes.itemDummy}/>
            <div className={classes.itemTitle}>
                <h3 className={classes.textTitle}>{props.pageInfoTitle}</h3>
            </div>
            <div className={classes.itemButtonContainer}> 
                <div className={classes.itemButtonDummy}/>
                <div className={classes.itemButtonDummy}/>
                <div className={classes.itemButton}>
                    <BigSquareButton pushTo={props.pushTo}/>
                </div>
            </div>
        </div>
    )
}

export default withStyles(landingBarStyle)(LandingButton);