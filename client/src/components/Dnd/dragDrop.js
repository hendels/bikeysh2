import React from 'react';
import axios from 'axios';

import initialData from './initial-data';
import styled from 'styled-components';
import Column from './column';
import {DragDropContext} from 'react-beautiful-dnd';
//
import '@atlaskit/css-reset';
//app components
//import Spinner from '../UI/SpinnerTags';

const Container = styled.div`
    display:flex;
    flex-direction: row;
`;
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export default class DragDrop extends React.Component{
    constructor(props){
        super(props);
        this.state = ({
            mainData: initialData,
            tagData: {
                manufacturerTag: ``,
                groupTag: ``,
                modelTag: ``,
                ignoreTag: ``,
                helperTag: ``,
            },
            existingTags: [],
            tagArray: [],
            loading: false,
            rerenderChip: false,
            showIgnored: this.props.showIgnored,
            reloadDialogDnd: this.props.reloadDialogDnd,
        });
        
        this.loadDndData();
        // this.loadDndData();
    }
    handleAddToTagSet = async (tagName, targetColumnName) => {
        console.log(`MODEL: ${this.props.model} CATEGORY ${this.props.category}`);

        await axios.post(this.props.tagUrl + `update/${targetColumnName}`, {
            id: this.props.offerId,
            tagName: tagName,
            offerId: this.props.offerId,
            offerOrigin: this.props.offerOrigin,
            active: true,
            category: this.props.category ,
            //category: this.props.category !== undefined ? this.props.category.toLowerCase() : null,
            price: this.props.offer.price,
            model: this.props.model
          }).then(response => response.data).then(async result => {
              if (result){

                //   console.log("dude - it's time after post.");
                //   console.log(`this is result : ${result}`);
                  let newObj = {[result]: true};
                  let existingTags = this.state.existingTags;
                  let foundIndex = this.getByValue(existingTags, tagName, -1);
                  if (foundIndex !== null){
                    existingTags[foundIndex] = true;
                  } else 
                        existingTags.push(newObj);

                  this.setState({existingTags: existingTags}, ()=>{});
                  //await sleep(1000);
                //   console.log(this.state.existingTags);
                  this.setState({rerenderChip: !this.state.rerenderChip}, ()=>{});
              }
          }); 
    }

    
    handleSearchTag = async (tagName) => {
        
        // console.log(`==============================[search]=================================`); 
        // console.log(`getting tag...${tagName} offerId... ${this.props.offerId}`); 
        await axios.get(this.props.tagUrl + 'findTag/' + tagName + `/` + this.props.offerId) 
          .then(response  => response.data)
          .then(result => {
            // console.log(`offer: ${result._id} tag: ${result.tagName} manufacturer: ${result.manufacturerTag} group:${result.groupTag} model:${result.modelTag}
            // ignore: ${result.ignoreTag} helper ${result.helperTag}`); 
            if (result){
                let newObj = {[result.tagName]: result.tagName === tagName ? true : false};
                let existingTags = this.state.existingTags;
                existingTags.push(newObj);
                this.setState({existingTags: existingTags}, () => {});

                //console.log(this.state.existingTags);
            }
            this.setState({tagData: {
                manufacturerTag: result.manufacturerTag,
                groupTag: result.groupTag,
                modelTag: result.modelTag,
                ignoreTag: result.ignoreTag,
                // helperTag: result.helperTag,
            }});
            
          });
    }
    
    loadDndData = async () => {
        // this.setState({existingTags: []});
        var blankObject = JSON.parse(JSON.stringify(initialData));

        this.setState({loading: true})
        for (var i = 0; i < this.props.tagArray.length; i++){
            var key = "task" + i;
            let newObj = {[key]:{id: key, content: this.props.tagArray[i]}};
            let foundIndex = null;
            if (blankObject.tasks !== undefined){
                foundIndex = this.getByValue(blankObject.tasks, this.props.tagArray[i], i + 1);
            }
            if (foundIndex === null) {
                await this.handleSearchTag(this.props.tagArray[i]);
                Object.assign(blankObject.tasks, newObj);
                switch(true){
                    case this.state.tagData.manufacturerTag !== "" && this.state.tagData.manufacturerTag !== undefined:
                        blankObject.columns.column2.taskIds.push([key]);
                        break;
                    case this.state.tagData.modelTag !== "" && this.state.tagData.modelTag !== undefined:
                        blankObject.columns.column3.taskIds.push([key]);
                        break;
                    case this.state.tagData.groupTag !== "" && this.state.tagData.groupTag !== undefined:
                        blankObject.columns.column4.taskIds.push([key]);
                        break;
                    case this.state.tagData.ignoreTag !== "" && this.state.tagData.ignoreTag !== undefined:
                        blankObject.columns.column5.taskIds.push([key]);
                        break;
                    // case this.state.tagData.helperTag !== "" && this.state.tagData.helperTag !== undefined:
                    //     blankObject.columns.column6.taskIds.push([key]);
                    //     break;
                    default:
                        blankObject.columns.column1.taskIds.push([key]);
                        break;
                }
                // console.log(`state for tag: ${this.props.tagArray[i]}`);
                // console.log(this.state.tagData);
            } 
        }
        this.setState({mainData: blankObject});
        this.setState({loading: false})
    }
    getByValue = (obj, value, i) => {
        var Break = {};
        let found = null;
        try {
        Object.keys(obj).forEach(
            (e, index) => {
                if(i > -1){
                    //console.log(`iteration::: ${i} content::: ${obj[e].content} e:::${e} checking value::: ${value}`);
                    if (obj[e].content === value) {
                        found = index;
                        throw Break;
                    } 
                } 
                if(i === -1){
                    if (obj[e].content === value) {
                        found = index;
                        throw Break;
                    } 
                }
            }
        );
        } catch (e) {
            if (e !== Break) throw e;
        }
        return found;
    }
    onDragStart = () => {
        //document.body.style.color = 'grey';
        //document.body.style.transition = 'background-color 0.2s ease';
    };
    onDragUpdate = update => {
        const {destination} =  update;
        const opacity = destination
        ? destination.index / Object.keys(this.state.mainData.tasks).length
        : 0;
        document.body.style.backgroundColor = `rgba(201, 101, 103, ${opacity})`;
    };
    onDragEnd = result => {
        //document.body.style.color = 'inherit';
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
            
            const start = this.state.mainData.columns[source.droppableId];
            const startTasks = this.state.mainData.tasks;
            const finish = this.state.mainData.columns[destination.droppableId];
            if (start === finish){
                const newTaskIds = Array.from(start.taskIds);
                
                newTaskIds.splice(source.index, 1);
                newTaskIds.splice(destination.index, 0, draggableId);
                
                const newColumn = {
                    ...start,
                    taskIds: newTaskIds,
                };
                
                const newState = {
                    ...this.state.mainData,
                    columns: {
                        ...this.state.mainData.columns,
                        [newColumn.id]: newColumn,
                    },
                };
                //console.log(`same column:  ${newColumn.title}`);
                this.setState({mainData: newState});
                return;
            };
            
            // moving from one list to another
            const startTaskIds = Array.from(start.taskIds);
            //console.log(`old guy id: ${start.taskIds[source.index]}`);
            //console.log(`task name is: ${startTasks[start.taskIds[source.index]].content}`);
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
                ...this.state.mainData,
                columns: {
                    ...this.state.mainData.columns,
                    [newStart.id]: newStart,
                    [newFinish.id]: newFinish,
                },
            };
            const targetColumnName = newFinish.title;
            this.handleAddToTagSet(taskName, targetColumnName);
            this.setState({mainData: newState});
        }
        // componentWillMount() {
        //     // this.setState({existingTags: []});
        //     // this.loadDndData();
        // }
        componentWillReceiveProps() {
            // console.log(this.props.tagArray);
            this.setState({tagArray: this.props.tagArray}, ()=>{
                this.setState({reloadDialogDnd: this.props.reloadDialogDnd}, () => {
                    let newArray = [];
                    // console.log(`dnd received props INNER DND: ${this.props.reloadDialogDnd}`);
                    // console.log(`existing tags : INNER DND`);
                    // console.log(`${this.props.tagArray}`);
                    // console.log(`${this.state.existingTags}`);
                    for (let i = 0; i < this.props.tagArray.length; i++){
                        // console.log(this.state.existingTags[i]);
                        newArray.push(this.props.tagArray[i]);

                    }
                    // console.log(`newArray`);
                    // console.log(newArray);
                    // console.log(`this.state.existingTags`);
                    console.log(this.state.existingTags);
                    if (!this.arraysEqual(this.props.tagArray, this.state.tagArray) && this.props.tagArray.length > 0 && this.state.tagArray.length > 0)
                    {
                        // this.setState({tagArray: this.props.tagArray}, () => {
                        //     // console.log(newArray);
                            this.loadDndData();
                            // this.forceUpdate();
                        // })
                        // console.log('NOT EQUAL');
                    } else
                        if (!this.props.tagArray.length > 0 && !this.state.tagArray.length > 0)
                            console.log(`there is nothing new to add!`);
                
                // this.forceUpdate();
            
            });
                
            })

        }
        arraysEqual = (arr1, arr2) => {
            if(arr1.length !== arr2.length)
                return false;
            for(var i = arr1.length; i--;) {
                if(arr1[i] !== arr2[i])
                    return false;
            }
        
            return true;
        }
        render(){
            // console.log(`RERENDER DND showIgnored = ${this.props.showIgnored}`);
            const {offerId, tagUrl, offerOrigin} = this.props;
            return (
                <div>
            {this.state.loading ? <div/> :(
                <DragDropContext
                onDragStart={this.onDragStart}
                OnDragUpdate={this.OnDragUpdate}
                onDragEnd={this.onDragEnd}
                >
                <Container >
                {this.state.mainData.columnOrder.map((columnId) => {
                    const column = this.state.mainData.columns[columnId];
                    // console.log(column.id);
                    if(column.id === 'column5' && !this.props.showIgnored){
                        return null;
                    } else {
                        const tasks = column.taskIds.map(taskId => this.state.mainData.tasks[taskId]);
                        // console.log(tasks);
                        return <Column 
                            key={column.id} 
                            column={column} 
                            tasks={tasks} 
                            offerId={offerId} 
                            tagUrl={tagUrl} 
                            offerOrigin={offerOrigin}
                            existingTags={this.state.existingTags}
                            reloadDialogDnd={this.props.reloadDialogDnd}
                            deleteTag={this.props.deleteTag}
                        />;
                    }
                })}
                </Container>
            
            </DragDropContext>
            )}
            </div>
        );
    }
}