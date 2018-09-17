import React from 'react';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

class Logo extends React.Component {
    constructor(props) {
        super(props);
    }
    render (){

    return(<Button component={Link} to="/home">{this.props.name}</Button>)
    }
}

export default Logo;