var initialState = {
    by: 'id',
    value: 1
}

var myReducer = (state = initialState, action) => {
    
    if (action.type === 'SORT') {
        var { by, value } = action.sort;// by=action.by

        return {
            by: by,
            value: value
        }

    }
    return state;
}

export default myReducer