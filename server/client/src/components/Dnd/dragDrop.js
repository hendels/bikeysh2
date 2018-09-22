import React from 'react';
import initialData from './initial-data';
import styled from 'styled-components';
import Column from './column';
import {DragDropContext} from 'react-beautiful-dnd';
//
import '@atlaskit/css-reset';
//app components
import TagChip from '../Chips/TagChip.jsx';

const Container = styled.div`
    display:flex;
`;
const cloneOfInitialData = JSON.parse(JSON.stringify(initialData));

export default class DragDrop extends React.Component{
    constructor(props){
        super(props);
        //let modifiedData = initialData;
        
        // // console.log(modifiedData);
        // //     <TagChip offerId={this.props.offer._id} word={word} tagUrl={this.props.tagUrl} offerOrigin="bikemarkt"/>
        // for (var i = 0; i < this.props.titleWords.length; i++){
        //     var key = "task" + i;
        //     let newObj = {[key]:{id: key, content: this.props.titleWords[i]}};
        //     Object.assign(modifiedData.tasks, newObj);
        //     modifiedData.columns.column1.taskIds.push([key]);
        //     // console.log(this.props.titleWords[i]);
        //     // console.log(modifiedData);
        // }
        // console.log(cloneOfInitialData);
        this.state = initialData;
        //console.log(this.baseState);
        //console.log('constructor!')
    }
    //state = initialData;
    createBlankObject = () => {
        
        // return blankObject;
    }
    getByValue = (obj, value, i) => {
        var Break = {};
        let found = null;
        try {
        Object.keys(obj).forEach(
            (e, index) => {
                console.log(`iteration::: ${i} content::: ${obj[e].content} e:::${e} checking value::: ${value}`);
                if (obj[e].content === value) {
                    found = index;
                    throw Break;
                } 
            }
        );
        } catch (e) {
            if (e !== Break) throw e;
        }
        return found;
      }
    loadDndData = async () => {
        console.log("blankObject :");
        var blankObject = JSON.parse(JSON.stringify(initialData));
        console.log(blankObject);
        
        //modifiedData.columns.column1.taskIds.length = 0;
        for (var i = 0; i < this.props.titleWords.length; i++){
            var key = "task" + i;
            let newObj = {[key]:{id: key, content: this.props.titleWords[i]}};
            let foundIndex = null;
            if (blankObject.tasks !== undefined){
                foundIndex = this.getByValue(blankObject.tasks, this.props.titleWords[i], i + 1);
            }
            if (foundIndex === null) {
                Object.assign(blankObject.tasks, newObj);

                blankObject.columns.column1.taskIds.push([key]);
            } 
            // else {
            //     modifiedData.columns.column1.taskIds.splice(foundIndex);
            // }
            
        }
        var modifiedData = Object.assign({}, blankObject);
        console.log("modifiedData:");
        console.log(modifiedData);
        console.log("state:");
        this.state = blankObject;
        console.log(this.state);
    }
    componentWillMount() {
        this.loadDndData();
    }
    componentDidMount() {
    }
    componentDidUpdate() {
        //console.log('updated');
    }
    componentWillUnmount(){
        // console.log(`unmounted`);
        // console.log(`initial data:`);
        // console.log(cloneOfInitialData);
    }
    onDragStart = () => {
        document.body.style.color = 'grey';
        document.body.style.transition = 'background-color 0.2s ease';
    };
    onDragUpdate = update => {
        console.log(destination.index);
        const {destination} =  update;
        const opacity = destination
        ? destination.index / Object.keys(this.state.tasks).length
        : 0;
        document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
    };
    onDragEnd = result => {
        document.body.style.color = 'inherit';
        const {destination, source,  draggableId} = result;
        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const start = this.state.columns[source.droppableId];
        const finish = this.state.columns[destination.droppableId];
        console.log( start);
        console.log( finish);
        if (start === finish){
            const newTaskIds = Array.from(start.taskIds);

            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);
    
            const newColumn = {
                ...start,
                taskIds: newTaskIds,
            };
    
            const newState = {
                ...this.state,
                columns: {
                    ...this.state.columns,
                    [newColumn.id]: newColumn,
                },
            };
            this.setState(newState);
            return;
        };

        // moving from one list to another
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds,            
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds,
        };
        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        };
        this.setState(newState);
    }

    render(){
        return (
            <DragDropContext
                onDragStart={this.onDragStart}
                OnDragUpdate={this.OnDragUpdate}
                onDragEnd={this.onDragEnd}
            >
            <Container>
                {this.state.columnOrder.map((columnId) => {
                    const column = this.state.columns[columnId];
                    const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);
        
                    return <Column key={column.id} column={column} tasks={tasks} />;
                })}
            </Container>
            </DragDropContext>
        );
    }
}
