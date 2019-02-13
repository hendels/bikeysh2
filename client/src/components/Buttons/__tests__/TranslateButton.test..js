import React from 'react';
//@enzyme
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {mount, shallow} from 'enzyme';
//app components
import {TranslateButton} from '../TranslateButton';
import {MenuItem} from '@material-ui/core';

configure({adapter: new Adapter()});

describe('<TranslateButton/>', ()=> {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<TranslateButton/>);
    })
    it('matches the snapshot', () => {
        
        const wrap = mount(<TranslateButton />)
        expect(wrap).toMatchSnapshot()
    });
    it('should pass click', ()=>{
        wrapper = mount(<TranslateButton />);

        const clickFavButton = wrapper.find('Button');
        clickFavButton.simulate('click');
        expect(wrapper.find(MenuItem)).not.toHaveLength(0);
    });
    it('should not render <MenuItem/> item', ()=> {
        expect(wrapper.contains(<MenuItem />)).toEqual(false);
    });
})