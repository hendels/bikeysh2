import React, {Component} from 'react';
import Aux from '../Aux/Aux';
import OffersList from '../../containers/OffersList/OffersList';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import { Route } from 'react-router-dom';
// components
import Header from '../../components/Header/Header.jsx';
import HeaderLinks from '../../components/Header/HeaderLinks.jsx';
//
import Background from '../../components/Paper/Paper.jsx';

const dashboardRoutes = [];

class Layout extends Component {

    render () {
        const { classes, ...rest } = this.props;
        const styles = theme => ({
            root: {
                ...theme.mixins.gutters(),
                paddingTop: theme.spacing.unit * 2,
                paddingBottom: theme.spacing.unit * 2,
            },
        });
        return (
            <Aux>
                {/* <Toolbar/> */}
                <Header
                    color="white"
                    routes={dashboardRoutes}
                    brand="Bikeysh"
                    rightLinks={<HeaderLinks />}
                    fixed
                    changeColorOnScroll={{
                        height: 400,
                        color: "gray"
                    }}
                    {...rest}
                />
                <Route path="/category/cranks" render={OffersListCranks}/>
                <Route path="/category/hubs" render={OffersListHubs}/>
                <Route path="/category/wheels" render={OffersListWheels}/>
                <Route path="/category/dhframes" render={OffersListDhFrames}/>
                <Route path="/category/enduroframes" render={OffersListEnduroFrames}/>
                
            </Aux>
        )
    }
}

const OffersListCranks = () => {
    const classes  = this.props;
    return (
               
        <OffersList 
        pageLimit={10} 
        fetchUrl={"/api/bm/category/cranks/"}         
        />

    );
}
const OffersListWheels = () => {
    return (
    <OffersList 
    pageLimit={10} 
    fetchUrl={"/api/bm/category/wheels/"}         
    />
    );
}
const OffersListDhFrames = () => {
    return (
    <OffersList 
    pageLimit={10} 
    fetchUrl={"/api/bm/category/dhframes/"}         
    />
    );
}
const OffersListEnduroFrames = () => {
    return (
    <OffersList 
    pageLimit={10} 
    fetchUrl={"/api/bm/category/enduroframes/"}         
    />
    );
}
const OffersListHubs = () => {
    return (
    <OffersList 
    pageLimit={10} 
    fetchUrl={"/api/bm/category/hubs/"}         
    />
    );
}
export default Layout;