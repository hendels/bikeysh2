import React from 'react';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

class Logo extends React.Component {
    render (){
    console.log(`color Logo: ${this.props.color}`);
    return(
        <Button 
            component={Link} to="/bestoffers" 
            mini={true} 
            variant={`text`} 
            style={{ fontFamily: 'Lobster, cursive', fontSize: `30px`, textTransform: "lowercase", color: this.props.color}}
        >
            {this.props.name}
        </Button>)
    }
}

export default Logo;