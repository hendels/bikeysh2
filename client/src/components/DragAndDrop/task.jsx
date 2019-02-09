import React from 'react';

import {Draggable} from 'react-beautiful-dnd';
//app components
import TagChip from '../Chips/TagChip.jsx';
import {Container} from '../../styles/components/DragAndDrop/taskStyle';

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