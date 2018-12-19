import React from 'react';
import styled from 'styled-components';
import Task from './task';
import {Droppable} from 'react-beautiful-dnd';


const Container = styled.div`
    margin: 2px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    width: 220px;

    display: flex;
    flex-direction: column;
`;
const Title = styled.h3`
    padding: 8px;
    background-color: #5a6671;
    color: #f4f6f8;
`;
const TaskList = styled.div`
    padding: 8px;
    transition: background-color 0.05 ease;
    background-color: ${props => (props.isDraggingOver ? '#C96567' : '#eaeef1')};
    flex-grow: 1;
    min-height: 100px;
    min-width: 100px;
`;
//*#f4f6f8
//*#eaeef1
//*#97AABD
//*#697684
//*#5a6671
//*
//*
//*
//*

export default class Column extends React.Component{
    state ={
        reloadDialogDnd: this.props.reloadDialogDnd,
    }
    componentWillReceiveProps() {
        this.setState({reloadDialogDnd: this.props.reloadDialogDnd}, () => {
            // console.log(`dnd received props INNER COLUMN: ${this.props.reloadDialogDnd}`);
            // this.forceUpdate();
            // console.log(this.props.existingTags);
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