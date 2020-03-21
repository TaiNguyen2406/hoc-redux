import * as types from '../constants/ActionTypes';

var initialState = {
    by: '',
    value: 1 // 1 tang -1 giam
};

var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SORT:
            //console.log(action.filter)
            return {
                by: action.sort.by,
                value: parseInt(action.sort.value,10)
            };
        default: return state;
    }
};
export default myReducer;