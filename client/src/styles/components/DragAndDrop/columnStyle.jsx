
import styled from 'styled-components';

export const Container = styled.div`
    margin: 2px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    width: 220px;

    display: flex;
    flex-direction: column;
`;
export const Title = styled.h3`
    padding: 8px;
    background-color: #5a6671;
    color: #f4f6f8;
`;
export const TaskList = styled.div`
    padding: 8px;
    transition: background-color 0.05 ease;
    background-color: ${props => (props.isDraggingOver ? '#C96567' : '#eaeef1')};
    flex-grow: 1;
    min-height: 100px;
    min-width: 100px;
`;