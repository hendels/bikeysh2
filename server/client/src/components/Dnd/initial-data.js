const initialData = {
    tasks: {
        // taskzero: {id: 'taskzero', content: 'initial task'},
    },
    columns: {
        column1: {
            id: 'column1',
            title: 'Unsettled',
            taskIds: [],
        },
        column2: {
            id: 'column2',
            title: 'Manufacturer',
            taskIds: [],
        },
        column3: {
            id: 'column3',
            title: 'Model',
            taskIds: [],
        },
        column4: {
            id: 'column4',
            title: 'Group',
            taskIds: [],
        },
        column5: {
            id: 'column5',
            title: 'Helpers',
            taskIds: [],
        },
    },
    columnOrder: ['column1', 'column2', 'column3', 'column4', 'column5'],
};

export default initialData;