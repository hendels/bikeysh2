import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FavoriteButton from './FavoriteButton';
import IconButton from './FavoriteButton';
configure({adapter: new Adapter()});

describe('<FavoriteButton />', () =>{
    it('should render two versions of Favorite Button state', () => {
        const wrapper = shallow(<FavoriteButton/>);
        expect(wrapper.find(IconButton)).toHaveLength(1);
    })
});