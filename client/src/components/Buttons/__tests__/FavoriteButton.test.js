import React from 'react';
//@enzyme
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {mount, shallow} from 'enzyme';
import renderer from 'react-test-renderer';

//app components
import FavoriteButton from '../FavoriteButton';
//@mui
import {FavoriteBorder, Favorite} from '@material-ui/icons';

configure({adapter: new Adapter()});

expect.extend({
    toBeBoolean(received) {
        return typeof received === 'boolean' ? {
            message: () => `expected ${received} to be boolean`,
            pass: true
        } : {
            message: () => `expected ${received} to be boolean`,
            pass: false
        }
    }
})
describe('Favorite Button', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<FavoriteButton/>);
    })
    it('matches the snapshot', () => {
        const tree = renderer.create(<FavoriteButton />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('should be boolean', () => {
        const wrapper = mount(
            <FavoriteButton 
                favorite={false || true}
            />
        );
        const clickFavButton = wrapper.find('IconButton');
        clickFavButton.simulate('click');
        
        const favoriteProps = wrapper.props().favorite;
        expect(favoriteProps).toBeBoolean();
    });
    it('should render one empty <FavoriteButton/> item', ()=> {
        expect(wrapper.find(FavoriteBorder)).toHaveLength(1);
    })
    it('should render filled <FavoriteButton/> item', ()=> {
        wrapper.setProps({favorite: true});
        expect(wrapper.find(Favorite)).toHaveLength(1);
    });
    it('should render filled <FavoriteButton/> item', ()=> {
        wrapper.setProps({favorite: true});
        expect(wrapper.contains(<Favorite />)).toEqual(true);
    })
})