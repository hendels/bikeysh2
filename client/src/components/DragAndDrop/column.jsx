import React from 'react';

import {Droppable} from 'react-beautiful-dnd';
//app components
import Task from './task';
//styles
import {TaskList, Title, Container} from '../../styles/components/DragAndDrop/columnStyle';


export default class Column extends React.Component{
    state ={
        reloadDialogDnd: this.props.reloadDialogDnd,
    }
    componentWillReceiveProps() {
        this.setState({reloadDialogDnd: this.props.reloadDialogDnd}, () => {
        })
    }
    render(){
        const {offerId, tagUrl, offerOrigin} = this.props;

        return (
            <Container>
                <Title>{this.props.column.title}</Title>
                <Droppable droppableId={this.props.column.id}>
                    {(provided, snapshot)=>(
                        <TaskList 
                            innerRef={provided.innerRef}
                            {...provided.droppableProps}
                            isDraggingOver={snapshot.isDraggingOver}
                        >
                            {this.props.tasks.map((task, index) =>                                 
                                <Task 
                                    key={task.id} 
                                    task={task} 
                                    index={index}
                                    offerId={offerId} 
                                    tagUrl={tagUrl} 
                                    offerOrigin={offerOrigin}
                                    existingTags={this.props.existingTags}
                                    reloadDialogDnd={this.props.reloadDialogDnd}
                                    deleteTag={this.props.deleteTag}
                                />)}

                            {provided.placeholder}
                        </TaskList>
                    )}
                </Droppable>
            </Container>
        );
    }
}