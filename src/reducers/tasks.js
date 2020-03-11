import * as types from '../constants/ActionTypes';
import _ from 'lodash';
import { act } from 'react-dom/test-utils';

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
    switch (action.type) {
        case types.LIST_ALL:
            return state;
        case types.ADD_TASK:
            var newTask = {
                id: generateID(),
                name: action.task.name,
                status: action.task.status === 'true' ? true : false
            }
            state.push(newTask);
            localStorage.setItem('tasks',JSON.stringify(state));
            //console.log(action)
        case types.UPDATE_STATUS_TASK:
            //var index=findIndex(action.id)
            //lodash
             
            var index = _.findIndex(state, (task) => {
            return task.id === action.id
            }) 
           
            if (index !== -1) {

            var newTask = {
                id: state[index].id,
                name: state[index].name,
                status: !state[index].status
            }
            /* //c1: su dung clone task xoa roi push lai
            var cloneTask={...state[index]};
            console.log(cloneTask);
            cloneTask.status=!cloneTask.status;
            state[index] = cloneTask; */
            //c2 
            state[index]={
                ...state[index],
                status: !state[index].status
            };
            localStorage.setItem('tasks', JSON.stringify(state))
            }
            return [...state];
        default: return state;
    }
};
export default myReducer;