import noExist from '../images/noimage.png';

/*eslint-disable */
export const getOfferAttributes = (category, offer) => {
    let attributes = [];
    switch(category.toLowerCase()){
        case 'cranks':{
            
            offer.chainringMountType !== '' ? 
                attributes.push({label: 'Mount type:', value: offer.chainringMountType}) : null;
            offer.crankStandard !== '' ? 
                attributes.push({label: 'Standard:', value: offer.crankStandard}) : null;
            offer.crankArmLength !== '' ? 
                attributes.push({label: 'Arm length:', value: offer.crankArmLength}) : null;
            offer.crankWidth !== '' ? 
                attributes.push({label: 'Width:', value: offer.crankWidth}) : null;
            break;  
        };
        case 'dhframes':{
            offer.frameSize !== '' ? 
                attributes.push({label: 'Frame size:', value: offer.frameSize}) : null;
            offer.wheelSize !== '' ? 
                attributes.push({label: 'Wheel size:', value: offer.wheelSize}) : null;
            offer.material !== '' ? 
                attributes.push({label: 'Material:', value: offer.material}) : null;
            offer.rearTravel !== '' ? 
                attributes.push({label: 'Travel:', value: offer.rearTravel}) : null;
            break; 
        };
        case 'enduroframes': {
            offer.frameSize !== '' ? 
                attributes.push({label: 'Frame size:', value: offer.frameSize}) : null;
            offer.wheelSize !== '' ? 
                attributes.push({label: 'Wheel size:', value: offer.wheelSize}) : null;
            offer.material !== '' ? 
                attributes.push({label: 'Material:', value: offer.material}) : null;
            offer.rearTravel !== '' ? 
                attributes.push({label: 'Travel:', value: offer.rearTravel}) : null;
            break; 
        };
        case 'hubs': {
            offer.frontSpokesNo !== '' ? 
                attributes.push({label: 'Front spokes:', value: offer.frontSpokesNo}) : null;
            offer.rearSpokesNo !== '' ? 
                attributes.push({label: 'Rear spokes:', value: offer.rearSpokesNo}) : null;
            offer.frontAxle !== '' ? 
                attributes.push({label: 'Front axle:', value: offer.frontAxle}) : null;
            offer.rearAxle !== '' ? 
                attributes.push({label: 'Rear axle:', value: offer.rearAxle}) : null;
            break; 
        };
        case 'wheels': {
            offer.rimWidth !== '' ? 
                attributes.push({label: 'Width:', value: offer.rimWidth}) : null;
            offer.axleDiameterFrontWheel !== '' ? 
                attributes.push({label: 'Front axle:', value: offer.axleDiameterFrontWheel}) : null;
            offer.axleDiameterRearWheel !== '' ? 
                attributes.push({label: 'Rear axle:', value: offer.axleDiameterRearWheel}) : null;
            offer.axleType !== '' ? 
                attributes.push({label: 'Axle type:', value: offer.axleType}) : null;
            break; 
        };
        default:
        break;
    }
    return attributes;
}
/*eslint-enable */
export const getDayDifferencesFromToday = (date) => {
    //* date variables
    const dateRegex = /((0[1-9]|[12]\d|3[01]).(0[1-9]|1[0-2]).[12]\d{3})/g;
    const regexDate = dateRegex.exec(date);
    let objDateDiff = {};
    if (regexDate !== null && regexDate[0] !== undefined){
        var todayDate = new Date();
        var dd = todayDate.getDate();
        var mm = todayDate.getMonth() + 1;
        var yyyy = todayDate.getFullYear();
        var today = `${mm}.${dd}.${yyyy}`;
        var date2 = new Date(today);

        dd = regexDate[0].slice(0,2);
        mm = regexDate[0].slice(3,5);
        yyyy = regexDate[0].slice(6,10);

        var convertedDate = `${mm}.${dd}.${yyyy}`;
        var date1 = new Date(convertedDate);
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        objDateDiff = {date: convertedDate, diffDays: diffDays}
        return objDateDiff;
    } else {
        objDateDiff = {date: date, diffDays: null}
        return objDateDiff;
    }

}

export const getPictureArray = (offer) => {
      let picArray = [];
      let fullscreenPicArray = [];
      let countBlank = 0;
      let objPictures = {};

      if (offer._id === `dummy` || offer._id === `dummyId`)
        return null;
    
      try{
        Object.keys(offer.pictures).forEach((key, index) => {
          if (offer.pictures[Object.keys(offer.pictures)[index]] !== null){
            let pictureObj = {imgPath: offer.pictures[Object.keys(offer.pictures)[index]], label: 'Bikeysh!'};
            let fullscreenPictureObj = {src: offer.pictures[Object.keys(offer.pictures)[index]]};
  
            picArray.push(pictureObj);
            fullscreenPicArray.push(fullscreenPictureObj);
          } else
            countBlank += 1;
        })
        if (countBlank === 6){
          let pictureObj = {imgPath: noExist, label: 'Bikeysh!'};
          let fullscreenPictureObj = {src: noExist};
          picArray.push(pictureObj);
          fullscreenPicArray.push(fullscreenPictureObj);
        }
        objPictures = {picArray: picArray, fullscreenPicArray: fullscreenPicArray}
        return objPictures;
      }
      catch(err){
        alert(`something wrong with record [props.offer.pictures] - getPictureArray`);
      }
}

export const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}