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
        };
        const imageUrls = {
            defaultImage: {
                url: `https://testy.bikeboard.pl/images/biblioteka/slider-d8683q_sender_testing_nice_canyon_greber_3nvv.jpg)`,
                tweak: `0px -70px`
            },
            dhframesImage: {
                url: `https://static.canyon.com/_img/bg/gravity/gravity-technology-sender.jpg`,
                tweak: `0px -250px`
            },
            cranksImage: {
                url: `https://cdn.dirtmountainbike.com/featured_image/5acb91737dbc8.jpeg`,
                tweak: `0px -450px`
            },
            hubsImage: {
                url: `https://cdn.dirtmountainbike.com/embedded_full/5abb00a13121c.jpg`,
                tweak: `0px -200px`
            },
            enduroframesImage: {
                url: `https://brink.uk/assets/images/products/Bikes/Santa-Cruz-Nomad-4-CC-Frame-2018-3.jpg`,
                tweak: `0px -400px`
            },
            wheelsImage: {
                url: `https://kolawarszawa.pl/wp-content/uploads/2018/03/TRACE_29.jpg`,
                tweak: `-500px -1900px`
            }
        }
        return (
            <Aux>
                <div style={{background: this.state.backgroundColor}}>
                {/* <Toolbar/> */}
                <Header
                    color="bikeysh3"
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
                <Route exact path="/home" render={(props) => 
                    <div>
                        <p>  &nbsp;</p>
                        <p>  &nbsp;</p>
                        <HomePage fetchUrls={fetchUrls} imageUrls={imageUrls}/>
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
                    />}
                />
                <Route exact path="/category/hubs" render={(props) => 
                    <OffersList 
                        pageLimit={10} 
                        fetchUrl={fetchUrls.hubs}   
                        tagUrl={fetchUrls.tags}    
                        category={`HUBS`}     
                        imageUrls={imageUrls}  
                    />}
                />
                <Route exact path="/category/wheels" render={(props) => 
                    <OffersList 
                        pageLimit={10} 
                        fetchUrl={fetchUrls.wheels}     
                        tagUrl={fetchUrls.tags}    
                        category={`WHEELS`}   
                        imageUrls={imageUrls}  
                    />}
                />
                <Route exact path="/category/dhframes" render={(props) => 
                    <OffersList 
                        pageLimit={10} 
                        fetchUrl={fetchUrls.dhFrames}    
                        tagUrl={fetchUrls.tags}    
                        category={`DHFRAMES`} 
                        imageUrls={imageUrls}     
                    />}
                />
                <Route exact path="/category/enduroframes" render={(props) => 
                    <OffersList 
                        pageLimit={10} 
                        fetchUrl={fetchUrls.enduroFrames}      
                        tagUrl={fetchUrls.tags}    
                        category={`ENDUROFRAMES`} 
                        imageUrls={imageUrls}   
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