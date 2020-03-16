import React, { Component } from "react";
import "./App.css";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import Control from "./components/TaskControl";
import { connect } from 'react-redux'
import * as actions from './actions/index'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      sortBy: 'name',
      sortValue: 1
    }
  }

  /*  componentDidMount() {
     if (localStorage && localStorage.getItem('tasks')) {
       var tasks = JSON.parse(localStorage.getItem('tasks'));
       this.setState({
         tasks: tasks
       })
     }
   } */

  onGenerateData = () => {
    var tasks = [
      {
        id: this.generateID(),
        name: 'Hoc lap trinh',
        status: true
      },
      {
        id: this.generateID(),
        name: 'Choi game',
        status: false
      },
      {
        id: this.generateID(),
        name: 'Sleep',
        status: true
      }
    ]
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  generateID() {
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4()
      + this.s4() + this.s4();
  }

  onToggleForm = () => {
    var {itemEditing} =this.props;
    if(itemEditing && itemEditing.id !== ''){
      this.props.onOpenForm();
    }
    else
    {
      this.props.onToggleForm();
    }
    this.props.onClearTask({
      id:'',
      name:'',
      status:false
    });
  }

  onShowForm = () => {
    this.setState({
      isDisplayForm: true
    })
  }
 
  onSearch = (keyword) => {
    this.setState({
      keyword: keyword
    })
  }

  onSort = (sortBy, sortValue) => {
    //console.log(sortBy, sortValue)
    this.setState({
      sortBy: sortBy,
      sortValue: sortValue
    })//,()=>{console.log(this.state.sortBy,this.state.sortValue)})

  }

  findIndex = (id) => {
    var { tasks } = this.state;
    var result = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        result = index;
      }
    });
    return result;
  }

  render() {
    var { filter, keyword, sortBy, sortValue } = this.state; // var tasks =this.state.tasks

    var { isDisplayForm } = this.props;

    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className={isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>
            <TaskForm />
          </div>
          <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
            <button type="button" className="btn btn-primary" onClick={this.onToggleForm}>
              <span className="fa fa-plus mr-5" />
              Thêm Công Việc
            </button>
            <button type="button" className="btn btn-danger ml-5"
              onClick={this.onGenerateData}>
              Generate data
            </button>
            <Control onSearch={this.onSearch} onSort={this.onSort} sortBy={this.state.sortBy} sortValue={this.state.sortValue} />
            <TaskList    />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isDisplayForm: state.isDisplayForm,
    itemEditing: state.itemEditing
  };
}

const mapDispathToProps = (dispatch, props) => {
  return {
    onToggleForm: () => {
      dispatch(actions.toggleForm())
    },
    onOpenForm: () => {
      dispatch(actions.openForm())
    },
    onClearTask:(task)=>{
      dispatch(actions.editTask(task))
    }
  };
}
export default connect(mapStateToProps, mapDispathToProps)(App)