import React, {Component} from 'react';
import Aux from '../Ax/Ax';
import { Route } from 'react-router-dom';
// pages
import HomePage from '../../pages/HomePage.jsx';
// components
import OffersList from '../../containers/OffersList/OffersList';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

import Header from '../../components/Header/Header.jsx';
import HeaderLinks from '../../components/Header/HeaderLinks.jsx';
//
import Background from '../../components/Paper/Paper.jsx';
//core MUI
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const dashboardRoutes = [];

class Layout extends Component {

    render () {
        const { classes, ...rest } = this.props;

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
                <Route exact path="/home" render={Home}/>
                <Route exact path="/category/cranks" render={OffersListCranks}/>
                <Route exact path="/category/hubs" render={OffersListHubs}/>
                <Route exact path="/category/wheels" render={OffersListWheels}/>
                <Route exact path="/category/dhframes" render={OffersListDhFrames}/>
                <Route exact path="/category/enduroframes" render={OffersListEnduroFrames}/>
                
            </Aux>
        )
    }
}
const Home = () => {

    return (
        <div>
            <p>  &nbsp;</p>
            <p>  &nbsp;</p>
            <p>  &nbsp;</p>
            <p>  &nbsp;</p>
            <p>  &nbsp;</p>
            <HomePage/>
        </div>
    )
}
const OffersListCranks = () => {
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