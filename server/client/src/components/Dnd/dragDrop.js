import React from 'react';
import axios from 'axios';

import initialData from './initial-data';
import styled from 'styled-components';
import Column from './column';
import {DragDropContext} from 'react-beautiful-dnd';
//
import '@atlaskit/css-reset';


const Container = styled.div`
    display:flex;
    flex-direction: row;
`;

export default class DragDrop extends React.Component{
    constructor(props){
        super(props);
        this.state = initialData;
        this.handleAddToManufacturer = this.handleAddToManufacturer.bind(this);
    }
    handleAddToManufacturer = async (tagName) => {
        const addToManufacturer = await axios.post(this.props.tagUrl + 'update/manufacturer', {
            id: this.props.offerId,
            tagName: tagName
          }) 
    }
    handleAddToGroup = async (tagName) => {
        const addToGroup = await axios.post(this.props.tagUrl + 'update/group', {
            id: this.props.offerId,
            tagName: tagName
          }) 
    }
    handleAddToModel = async (tagName) => {
        const addToModel = await axios.post(this.props.tagUrl + 'update/model', {
            id: this.props.offerId,
            tagName: tagName
          }) 
    }
    handleSearchTag = async (tagName) => {
        console.log(`getting tag...${tagName} offerId... ${this.props.offerId}`); 
        const tagInfo = await axios.get(this.props.tagUrl + 'findTag/' + tagName + `/` + this.props.offerId) 
          .then(response  => response.data)
          .then(result => {
            console.log(`offer: ${result._id} tag: ${result.name} manufacturer: ${result.manufacturerTag} group:${result.groupTag} model:${result.modelTag}`); 
            // return new Promise((resolve, reject) => {resolve(result)});
            
          });
      }
    getByValue = (obj, value, i) => {
        var Break = {};
        let found = null;
        try {
        Object.keys(obj).forEach(
            (e, index) => {
                //console.log(`iteration::: ${i} content::: ${obj[e].content} e:::${e} checking value::: ${value}`);
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
        var blankObject = JSON.parse(JSON.stringify(initialData));
        console.log(blankObject);
        
        for (var i = 0; i < this.props.titleWords.length; i++){
            var key = "task" + i;
            let newObj = {[key]:{id: key, content: this.props.titleWords[i]}};
            let foundIndex = null;
            if (blankObject.tasks !== undefined){
                foundIndex = this.getByValue(blankObject.tasks, this.props.titleWords[i], i + 1);
            }
            if (foundIndex === null) {
                this.handleSearchTag(this.props.titleWords[i]);
                Object.assign(blankObject.tasks, newObj);
                blankObject.columns.column1.taskIds.push([key]);
            } 
        }
        this.setState(blankObject);
    }
    componentWillMount() {
        this.loadDndData();
    }
    onDragStart = () => {
        document.body.style.color = 'grey';
        document.body.style.transition = 'background-color 0.2s ease';
    };
    onDragUpdate = update => {
        const {destination} =  update;
        console.log(destination.index);
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
        const startTasks = this.state.tasks;
        const finish = this.state.columns[destination.droppableId];
        // console.log( start);
        // console.log( finish);
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
            console.log(`same column:  ${newColumn.title}`);
            this.setState(newState);
            return;
        };

        // moving from one list to another
        const startTaskIds = Array.from(start.taskIds);
        console.log(`old guy id: ${start.taskIds[source.index]}`);
        console.log(`task name is: ${startTasks[start.taskIds[source.index]].content}`);
        const taskName = startTasks[start.taskIds[source.index]].content;

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
        // console.log(newState);
        // console.log(newState.columns);
        switch (newFinish.title) {
            case `Manufacturer`:
                this.handleAddToManufacturer(taskName);
                break;
            case `Group`:
                this.handleAddToGroup(taskName);
                break;
            case `Model`:
                this.handleAddToModel(taskName);
                break;
            default:
                break;
        }
        console.log(`new column:  ${newFinish.title} for tag:${source.index} and offer: ${this.props.offerId}`);
        this.setState(newState);
    }

    render(){
        const {offerId, tagUrl, offerOrigin} = this.props;
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
        
                    return <Column 
                        key={column.id} 
                        column={column} 
                        tasks={tasks} 
                        offerId={offerId} 
                        tagUrl={tagUrl} 
                        offerOrigin={offerOrigin}
                    />;
                })}
            </Container>
            </DragDropContext>
        );
    }
}
