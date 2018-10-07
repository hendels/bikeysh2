import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import pageInfoStyle from '../../styles/components/pageInfoStyle';

class Info extends React.Component {
    render (){
    const { classes } = this.props;
    return(
    <div 
        className={classes.container} 
        style={{
            background: `#000 url(${this.props.imageUrl})`,
            backgroundPosition: `${this.props.tweak}`,
            backgroundAttachment: `fixed`,
            // filter: `grayscale(100%)`,
        }}
    >
        <li className={classes.list}>
            <h3 className={classes.title}>{this.props.pageInfoTitle}</h3>
        </li>
        <div className={classes.colorOverlay}></div>
    </div>
    )}
}

export default withStyles(pageInfoStyle)(Info);