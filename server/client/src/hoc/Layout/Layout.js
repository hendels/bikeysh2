import React, {Component} from 'react';
import Aux from '../Ax/Ax';
import { Route } from 'react-router-dom';
// pages
import HomePage from '../../pages/HomePage.jsx';
// app components
import OffersList from '../../containers/OffersList/OffersList';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Dnd from '../../components/Dnd/dragDrop';
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
var backgroundColor = '#344054';
class Layout extends Component {
    state = {backgroundColor: backgroundColor}
    render () {
        const { classes, ...rest } = this.props;
        const fetchUrls = {
            hubs: '/api/bm/category/hubs/',
            wheels: '/api/bm/category/wheels/',
            dhFrames: '/api/bm/category/dhframes/',
            enduroFrames: 'api/bm/category/enduroframes/',
            cranks: '/api/bm/category/cranks/',
            bestoffer: '/api/bm/bestoffer/',
            tags: '/api/tags/'
        }
        return (
            <Aux>
                <div style={{background: this.state.backgroundColor}}>
                {/* <Toolbar/> */}
                <Header
                    color="rose"
                    routes={dashboardRoutes}
                    brand="Bikeysh"
                    rightLinks={<HeaderLinks />}
                    fixed
                    // changeColorOnScroll={{
                    //     height: 400,
                    //     color: "gray"
                    // }}
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
                        tagUrl={fetchUrls.tags}    
                        category={`CRANKS`} 
                    />}
                />
                <Route exact path="/category/hubs" render={(props) => 
                    <OffersList 
                        pageLimit={10} 
                        fetchUrl={fetchUrls.hubs}   
                        tagUrl={fetchUrls.tags}    
                        category={`HUBS`}       
                    />}
                />
                <Route exact path="/category/wheels" render={(props) => 
                    <OffersList 
                        pageLimit={10} 
                        fetchUrl={fetchUrls.wheels}     
                        tagUrl={fetchUrls.tags}    
                        category={`WHEELS`}     
                    />}
                />
                <Route exact path="/category/dhframes" render={(props) => 
                    <OffersList 
                        pageLimit={10} 
                        fetchUrl={fetchUrls.dhFrames}    
                        tagUrl={fetchUrls.tags}    
                        category={`DHFRAMES`}      
                    />}
                />
                <Route exact path="/category/enduroframes" render={(props) => 
                    <OffersList 
                        pageLimit={10} 
                        fetchUrl={fetchUrls.enduroFrames}      
                        tagUrl={fetchUrls.tags}    
                        category={`ENDUROFRAMES`}    
                    />}
                />
                </div>
            </Aux>
        )
    }
}
const Home = (urls) => {

    return (
        <div>
            <p>  &nbsp;</p>
            <HomePage fetchUrls={urls}/>
        </div>
    )
}
export default Layout;