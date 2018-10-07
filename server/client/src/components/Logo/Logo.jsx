import React from 'react';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

class Logo extends React.Component {
    render (){
    return(<Button component={Link} to="/home" mini={true }variant={`text`} style={{ fontFamily: 'Lobster, cursive', fontSize: `30px`, textTransform: "lowercase"}}>{this.props.name}</Button>)
    }
}

export default Logo;