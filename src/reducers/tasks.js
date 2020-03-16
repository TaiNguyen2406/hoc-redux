import * as types from '../constants/ActionTypes';
import _ from 'lodash';


var s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

var generateID = () => {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4()
        + s4() + s4();
}

var findIndex = (id) => {
    var { tasks } = this.state;
    var result = -1;
    tasks.forEach((task, index) => {
        if (task.id === id) {
            result = index;
        }
    });
    return result;
}
var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = data ? data : [];

var myReducer = (state = initialState, action) => {
    var index = -1;
    switch (action.type) {
        case types.LIST_ALL:
            return state;
        case types.ADD_TASK://not used anymore
            var newTask = {
                id: generateID(),
                name: action.task.name,
                status: action.task.status === 'true' ? true : false
            }
            state.push(newTask);
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        //console.log(action)
        case types.SAVE_TASK:
 
            var cloneTask = {
                id: action.task.id,
                name: action.task.name,
                status: typeof(action.task.status) !== 'boolean' ? 
                            action.task.status === 'true' ? true : false : action.task.status
            }
            if (!cloneTask.id) {
                cloneTask.id = generateID();
                state.push(cloneTask);
            }
            else {
                index = _.findIndex(state, (task) => {
                    return task.id === cloneTask.id
                });
 
                state[index] = cloneTask;
            }
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        //console.log(action)    
        case types.UPDATE_STATUS_TASK:
            //var index=findIndex(action.id)
            //lodash

            index = _.findIndex(state, (task) => {
                return task.id === action.id
            });

            if (index !== -1) {
                /* //c1: su dung clone task xoa roi push lai
                var cloneTask={...state[index]};
                console.log(cloneTask);
                cloneTask.status=!cloneTask.status;
                state[index] = cloneTask; */
                //c2 
                state[index] = {
                    ...state[index],
                    status: !state[index].status
                };
                localStorage.setItem('tasks', JSON.stringify(state));
            };
            return [...state];
        case types.DELETE_TASK:
            index = _.findIndex(state, (task) => {
                return task.id === action.id
            });
            state.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];

        default: return state;
    }
};
export default myReducer;