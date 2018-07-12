import React, {Component} from 'react';
import Aux from '../Aux/Aux';
import OffersList from '../../containers/OffersList/OffersList';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';


class Layout extends Component {

    render () {
        return (
            <Aux>
                <Toolbar/>
                <OffersList/>
            </Aux>
        )
    }
}

export default Layout;