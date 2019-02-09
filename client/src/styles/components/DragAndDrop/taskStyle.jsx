import styled from 'styled-components';


export const Container = styled.div`
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 1px;
    margin-bottom: 1px;
    background-color: ${props => (props.isDragging ? '#97AABD': 'white')};

    display:flex;

`;