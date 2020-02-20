import { createStore } from 'redux'
import { status, sort } from "./actions/index"
import myReducer from './reducers/index'

const store = createStore(myReducer);
console.log('Default : ', store.getState());
// thuc hien tay doi status
//var action = { type: 'TOGGLE_STATUS' };
store.dispatch(status());
console.log('TOGGLE_STATUS : ', store.getState());
// thuc hien sap xep name Z-A
//var sortAction = {
//type: 'SORT',
 //   sort: {
 //   by: 'age',
 //       value: 1
//}
//}
store.dispatch(sort({by:'name', value:-1}));
console.log('SORT : ', store.getState());
