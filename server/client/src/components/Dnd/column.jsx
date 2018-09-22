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
`;
const TaskList = styled.div`
    padding: 8px;
    transition: background-color 0.05 ease;
    background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
    flex-grow: 1;
    min-height: 100px;
    min-width: 100px;
`;


export default class Column extends React.Component{
    
    render(){
        // console.log(this.props.tasks);
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
                                
                                <Task key={task.id} task={task} index={index}/>)}
                            {provided.placeholder}
                            </TaskList>
                            )}
                </Droppable>
            </Container>
        );
    }
}