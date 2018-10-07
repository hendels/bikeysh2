import React from 'react';
import classes from './BestOfferInfo.css';
class Info extends React.Component {
    render (){
    // return(<Button component={Link} to="/home">{this.props.name}</Button>)
    return(
    <div className={classes.container}>
        <li>
            {/* <h1>Your best offer for today</h1> */}
            <h3>best offers this week so far...</h3>
        </li>
        <div className={classes.colorOverlay}></div>
    </div>
    )}
}

export default Info;