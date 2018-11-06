import React, {Component} from 'react';
import Aux from '../Ax/Ax';
import { Route } from 'react-router-dom';
// pages
import HomePage from '../../pages/HomePage.jsx';
// app components
import OffersList from '../../containers/OffersList/OffersList';
import Header from '../../components/Header/Header.jsx';
import HeaderLinks from '../../components/Header/HeaderLinks.jsx';
//
import PageInfo from '../../containers/PageInfos/PageInfo.jsx';
import LandingPage from '../../pages/LandingPage';
import LandingButton from '../../components/Buttons/LandingButton.jsx';

const fetchUrls = {
    hubs: '/api/bm/category/hubs/',
    wheels: '/api/bm/category/wheels/',
    dhFrames: '/api/bm/category/dhframes/',
    enduroFrames: 'api/bm/category/enduroframes/',
    cranks: '/api/bm/category/cranks/',
    bestoffer: '/api/bm/bestoffer/',
    tags: '/api/tags/'
};
const imageUrls = {
    defaultImage: {url: `https://testy.bikeboard.pl/images/biblioteka/slider-d8683q_sender_testing_nice_canyon_greber_3nvv.jpg)`, tweak: `0px -70px`},
    dhframesImage: {url: `https://static.canyon.com/_img/bg/gravity/gravity-technology-sender.jpg`, tweak: `0px -250px`},
    cranksImage: {url: `https://cdn.dirtmountainbike.com/featured_image/5acb91737dbc8.jpeg`, tweak: `0px -450px`},
    hubsImage: {url: `https://cdn.bikemagic.com/featured_image/5ab936e5d5833.jpg`, tweak: `0px -200px`},
    enduroframesImage: {url: `https://brink.uk/assets/images/products/Bikes/Santa-Cruz-Nomad-4-CC-Frame-2018-3.jpg`, tweak: `0px -400px`},
    wheelsImage: {url: `https://cdn.dirtmountainbike.com/featured_image/5ab923c674716.jpg`, tweak: `0px 0px`}
}
const dbModels = {
    cranks: `cranks`, dhframes: `dhframes`, enduroframes: `enduroframes`, hubs: `hubs`, wheels: `wheels` 
}
const dashboardRoutes = [];
var backgroundColor = '#344054';
class Layout extends Component {
    state = {
        backgroundColor: backgroundColor,
        changeHeader: false,
        changeColorHeader: "bikeysh3"
    }
    render () {
        const { classes, ...rest } = this.props;
        

        return (
            <Aux>
                <div style={{background: this.state.backgroundColor}}>
                {/* <Toolbar/> */}
                <Header
                    color={this.state.changeColorHeader}
                    routes={dashboardRoutes}
                    brand="bikeysh"
                    rightLinks={<HeaderLinks />}
                    fixed
                    changeColorOnScroll={{
                        height: 400,
                        color: "bikeysh3_1"
                    }}
                    {...rest}
                />
                <Route exact path="/" render={(props) => 
                    <div>
                        <br/>
                        <br/>
                        <LandingPage imageUrls={imageUrls}/>
                        
                    </div>
                }
                />
                <Route exact path="/home" render={(props) => 
                    <div>
                        <p>  &nbsp;</p>
                        <p>  &nbsp;</p>
                        <HomePage fetchUrls={fetchUrls} imageUrls={imageUrls} models={dbModels}/>
                    </div>
                }
                />
                <Route exact path="/category/cranks" render={(props) => 
                    <OffersList 
                        pageLimit={10} 
                        fetchUrl={fetchUrls.cranks}    
                        tagUrl={fetchUrls.tags}    
                        category={`CRANKS`}  
                        imageUrls={imageUrls}
                        model={dbModels.cranks}
                    />}
                />
                <Route exact path="/category/hubs" render={(props) => 
                    <OffersList 
                        pageLimit={10} 
                        fetchUrl={fetchUrls.hubs}   
                        tagUrl={fetchUrls.tags}    
                        category={`HUBS`}     
                        imageUrls={imageUrls}  
                        model={dbModels.hubs}
                    />}
                />
                <Route exact path="/category/wheels" render={(props) => 
                    <OffersList 
                        pageLimit={10} 
                        fetchUrl={fetchUrls.wheels}     
                        tagUrl={fetchUrls.tags}    
                        category={`WHEELS`}   
                        imageUrls={imageUrls}  
                        model={dbModels.wheels}
                    />}
                />
                <Route exact path="/category/dhframes" render={(props) => 
                    <OffersList 
                        pageLimit={10} 
                        fetchUrl={fetchUrls.dhFrames}    
                        tagUrl={fetchUrls.tags}    
                        category={`DHFRAMES`} 
                        imageUrls={imageUrls}    
                        model={dbModels.dhframes} 
                    />}
                />
                <Route exact path="/category/enduroframes" render={(props) => 
                    <OffersList 
                        pageLimit={10} 
                        fetchUrl={fetchUrls.enduroFrames}      
                        tagUrl={fetchUrls.tags}    
                        category={`ENDUROFRAMES`} 
                        imageUrls={imageUrls}   
                        model={dbModels.enduroframes}
                    />}
                />
                </div>
            </Aux>
        )
    }
}
// const Home = (urls) => {

//     return (
//         <div>
//             <p>  &nbsp;</p>
//             <HomePage fetchUrls={urls}/>
//         </div>
//     )
// }
export default Layout;