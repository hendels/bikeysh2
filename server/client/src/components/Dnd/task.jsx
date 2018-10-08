import React from 'react';
import styled from 'styled-components';
import {Draggable} from 'react-beautiful-dnd';
//app components
import TagChip from '../Chips/TagChip.jsx';
import Aux from '../../hoc/Ax/Ax';

const Container = styled.div`
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 1px;
    margin-bottom: 1px;
    background-color: ${props => (props.isDragging ? 'lightgreen': 'white')};

    display:flex;
    
`;
const Handle = styled.div`
    width: 40px;
    height: 20px;
    background-color: orange;
    border-radius: 4px;
    margin-right: 8px;
`;
export default class Task extends React.Component {
    render() {
        //console.log(this.props);
        return (

            <Draggable draggableId={this.props.task.id} index={this.props.index}>
            {(provided, snapshot)=>(
                <Container
                    {...provided.draggableProps}
                    innerRef={provided.innerRef}
                    isDragging={snapshot.isDragging}
                    {...provided.dragHandleProps}
                > 
                {/* <Handle {...provided.dragHandleProps}/> */}
                    <TagChip 
                    
                    offerId={this.props.offerId} 
                    word={this.props.task.content} 
                    tagUrl={this.props.tagUrl} 
                    offerOrigin="bikemarkt"
                    existingTags={this.props.existingTags}
                    />
                </Container> 
            )}

            </Draggable>
        );
    }
}