import React from 'react';

import {withStyles} from '@material-ui/core/styles';
//custom components
import Aux from '../../../hoc/Ax/Ax';
import OfferBMCustom from './OfferBMCustom.jsx';
//styles


const styles = theme => ({

});

var listElements = null;
class OfferBikeMarkt extends React.Component{

state = {
        scoringData: {
            trueName: '', 
            price: 0, 
            currency: "currency", 
            median: 0, 
            countTotal: 0, 
            scores: 0
        },
        loading: true,
        }
async componentWillReceiveProps(nextProps){
    const {classes, offers, models, fullSearch} = nextProps;
    let fullSearchModel = ``;
    let fullSearchCategory = ``;
    
    listElements = await offers.map(offer => {
        let piclink = <a>No image at all.</a>;
        if(offer.pictures !== null || offer.pictures !== undefined){
            for (var x in offer.pictures){
                const picUrl = offer.pictures[x];
                if (picUrl !== null){
                    picUrl.length > 0? piclink = picUrl.replace(`large`, `medium`) : null;
                }
                break;
            }
        };

        if(fullSearch){
            switch (offer.category){
                case "DHFrames":
                    fullSearchModel = models.dhframes
                    break;
                case "Cranks":
                    fullSearchModel = models.cranks
                    break;
                case "Hubs":
                    fullSearchModel = models.hubs
                    break;
                case "EnduroFrames":
                    fullSearchModel = models.enduroframes
                    break;
                case "Wheels":
                    fullSearchModel = models.wheels
                    break;
                default:
                    break;
            }
            fullSearchCategory = offer.category;
        }
        return(
            <OfferBMCustom 
                offer={offer} 
                piclink={piclink} 
                tagUrl={this.props.tagUrl} 
                model={this.props.fullSearch ? fullSearchModel : this.props.model}
                rerender={this.props.rerender}
                category={this.props.fullSearch ? fullSearchCategory: this.props.category}
                fullSearch={this.props.fullSearch}
            />
        )
    }) ;
    await Promise.all(listElements).then(()=>{
        if (offers.length !== 0)
            this.setState({loading: false}, ()=>{
                console.log(listElements);
                console.log(this.state.loading);
                this.forceUpdate();
            })
    })
}
render(){
    return (
        <Aux>
            {!this.state.loading ? listElements : (
            <div>
                <br/>
                <br/>
                <span>Loading...</span>
                <span>Loading...</span>
                <span>Loading...</span>
                <span>Loading...</span>
                <span>Loading...</span>
                <span>Loading...</span>
                <span>Loading...</span>
                <span>Loading...</span>
                <span>Loading...</span>
                <span>Loading...</span>
                <span>Loading...</span>
                <span>Loading...</span>
                <span>Loading...</span>
                <span>Loading...</span>
                <br/>
                <br/>
            </div>)
             }
        </Aux>)
    };
}
export default withStyles(styles)(OfferBikeMarkt);