import React from 'react';
import axios from 'axios';

import Column from './column';
import {DragDropContext} from 'react-beautiful-dnd';
//
import '@atlaskit/css-reset';
//@mui
import {CircularProgress, Grid} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles"
//app components
import initialData from './initial-data';
import {Container} from '../../styles/components/DragAndDrop/dragDropStyle';
import dragDropStyle from '../../styles/components/DragAndDrop/dragDropStyle';

class DragDrop extends React.Component{
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
    }
    handleAddToTagSet = async (tagName, targetColumnName) => {

        await axios.post(this.props.tagUrl + `update/${targetColumnName}`, {
            id: this.props.offerId,
            tagName: tagName,
            offerId: this.props.offerId,
            offerOrigin: this.props.offerOrigin,
            active: true,
            category: this.props.category ,
            price: this.props.offer.price,
            model: this.props.model
          }).then(response => response.data).then(async result => {
              if (result){

                  let newObj = {[result]: true};
                  let existingTags = this.state.existingTags;
                  let foundIndex = this.getByValue(existingTags, tagName, -1);
                  if (foundIndex !== null){
                    existingTags[foundIndex] = true;
                  } else 
                        existingTags.push(newObj);

                  this.setState({existingTags: existingTags}, ()=>{});
                  this.setState({rerenderChip: !this.state.rerenderChip}, ()=>{});
              }
          }); 
    }
    handleSearchTag = async (tagName) => {
        
        await axios.get(this.props.tagUrl + 'findTag/' + tagName + `/` + this.props.offerId) 
          .then(response  => response.data)
          .then(result => {
            if (result){
                let newObj = {[result.tagName]: result.tagName === tagName ? true : false};
                let existingTags = this.state.existingTags;
                existingTags.push(newObj);
                this.setState({existingTags: existingTags}, () => {});
            }
            this.setState({tagData: {
                manufacturerTag: result.manufacturerTag,
                groupTag: result.groupTag,
                modelTag: result.modelTag,
                ignoreTag: result.ignoreTag,
            }});
            
          });
    }
    loadDndData = async () => {
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
                    default:
                        blankObject.columns.column1.taskIds.push([key]);
                        break;
                }
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
            this.setState({mainData: newState});
            return;
        };
        
        // moving from one list to another
        const startTaskIds = Array.from(start.taskIds);
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
    componentWillReceiveProps() {
        this.setState({tagArray: this.props.tagArray}, ()=>{
            this.setState({reloadDialogDnd: this.props.reloadDialogDnd}, () => {
                let newArray = [];
                for (let i = 0; i < this.props.tagArray.length; i++){
                    newArray.push(this.props.tagArray[i]);

                }
                if (!this.arraysEqual(this.props.tagArray, this.state.tagArray) && this.props.tagArray.length > 0 && this.state.tagArray.length > 0)
                {
                    this.loadDndData();
                } 
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
        const {offerId, tagUrl, offerOrigin, classes} = this.props;

        return (
            <div>
                {this.state.loading ? 
                <Grid container justify="space-between" alignItems="center">
                    <Grid item xs={4}/>
                    <Grid item xs={4} className={classes.spinner}>
                        <CircularProgress color="secondary"/> 
                    </Grid>
                    <Grid item xs={4}/>
                </Grid>
                
                :(
                    <DragDropContext
                        onDragStart={this.onDragStart}
                        OnDragUpdate={this.OnDragUpdate}
                        onDragEnd={this.onDragEnd}
                    >
                    <Container >
                    {this.state.mainData.columnOrder.map((columnId) => {
                        const column = this.state.mainData.columns[columnId];
                        if(column.id === 'column5' && !this.props.showIgnored){
                            return null;
                        } else {
                            const tasks = column.taskIds.map(taskId => this.state.mainData.tasks[taskId]);
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
export default withStyles(dragDropStyle)(DragDrop);