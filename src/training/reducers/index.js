import status from './status' //reducer status
import sort from './sort' //reducer sort
import { combineReducers } from 'redux'

const myReducer = combineReducers({
    status, //status: status,
    sort //sort:sort
})
/* var initialState = {
    status: false,
    sort: {
        by: 'id',
        value: 1
    }
}

var myReducer = (state = initialState, action) => {
    if (action.type === 'TOGGLE_STATUS') {
        state.status = !state.status;
        return state;
    }

    if (action.type === 'SORT') {
        var { by, value } = action.sort;// by=action.by
        var { status } = state; // status = state.status
        return {
            status: status,
            sort: {
                by: by,
                value: value
            }
        }

    }
    return state;
}*/

export default myReducer 