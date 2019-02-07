import React from 'react';
import styled from 'styled-components';
import {Draggable} from 'react-beautiful-dnd';
//app components
import TagChip from '../Chips/TagChip.jsx';
import Aux from '../../hoc/Ax/Ax';
import Button from '@material-ui/core/Button';

const Container = styled.div`
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 1px;
    margin-bottom: 1px;
    background-color: ${props => (props.isDragging ? '#97AABD': 'white')};

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
    state ={
        reloadDialogDnd: this.props.reloadDialogDnd,
    }
    componentWillReceiveProps() {
        this.setState({reloadDialogDnd: this.props.reloadDialogDnd}, () => {
            this.forceUpdate();
        })
    }
    render() {
        return (
            <Draggable draggableId={this.props.task.id} index={this.props.index}>
            {(provided, snapshot)=>(
                <Container
                    {...provided.draggableProps}
                    innerRef={provided.innerRef}
                    isDragging={snapshot.isDragging}
                    {...provided.dragHandleProps}
                > 
                    <TagChip 
                        offerId={this.props.offerId} 
                        word={this.props.task.content} 
                        tagUrl={this.props.tagUrl} 
                        offerOrigin="bikemarkt"
                        existingTags={this.props.existingTags}
                        reloadDialogDnd={this.props.reloadDialogDnd}
                        deleteTag={this.props.deleteTag}
                    />
                </Container> 
            )}

            </Draggable>
        );
    }
}