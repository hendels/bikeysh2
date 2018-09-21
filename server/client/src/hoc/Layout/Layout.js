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
        const fetchUrls = {
            hubs: '/api/bm/category/hubs/',
            wheels: '/api/bm/category/wheels/',
            dhFrames: '/api/bm/category/dhframes/',
            enduroFrames: 'api/bm/category/enduroframes/',
            cranks: '/api/bm/category/cranks/',
            tags: '/api/tags/'
        }
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
                <Route exact path="/home" render={(props) => 
                    <div>
                        <p>  &nbsp;</p>
                        <p>  &nbsp;</p>
                        <p>  &nbsp;</p>
                        <p>  &nbsp;</p>
                        <p>  &nbsp;</p>
                        <HomePage fetchUrls={fetchUrls}/>
                    </div>
                }
                />
                <Route exact path="/category/cranks" render={(props) => 
                    <OffersList 
                        pageLimit={10} 
                        fetchUrl={fetchUrls.cranks}         
                    />}
                />
                <Route exact path="/category/hubs" render={(props) => 
                    <OffersList 
                        pageLimit={10} 
                        fetchUrl={fetchUrls.hubs}         
                    />}
                />
                <Route exact path="/category/wheels" render={(props) => 
                    <OffersList 
                        pageLimit={10} 
                        fetchUrl={fetchUrls.wheels}         
                    />}
                />
                <Route exact path="/category/dhframes" render={(props) => 
                    <OffersList 
                        pageLimit={10} 
                        fetchUrl={fetchUrls.dhFrames}         
                    />}
                />
                <Route exact path="/category/enduroframes" render={(props) => 
                    <OffersList 
                        pageLimit={10} 
                        fetchUrl={fetchUrls.enduroFrames}         
                    />}
                />
                
            </Aux>
        )
    }
}
const Home = (urls) => {

    return (
        <div>
            <p>  &nbsp;</p>
            <p>  &nbsp;</p>
            <p>  &nbsp;</p>
            <p>  &nbsp;</p>
            <p>  &nbsp;</p>
            <HomePage fetchUrls={urls}/>
        </div>
    )
}
const OffersListCranks = (urls) => {
    return (
        <OffersList 
        pageLimit={10} 
        fetchUrl={'/api/bm/category/cranks/'}         
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