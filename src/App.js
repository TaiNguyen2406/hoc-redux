import React, { Component } from "react";
import "./App.css";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import Control from "./components/TaskControl";
import _ from 'lodash';
import { connect } from 'react-redux'
import * as actions from './actions/index'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // tasks: [], // id unique, name, status
      // isDisplayForm: false,
      taskEditing: null,
      filter: {
        name: '',
        status: -1
      },
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
    this.props.onToggleForm();
  }

  onShowForm = () => {
    this.setState({
      isDisplayForm: true
    })
  }
 

  onUpdate = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    var taskEditing = tasks[index];
    //console.log(taskEditing);
    this.setState({
      taskEditing: taskEditing
    })//,()=>{console.log(this.state.taskEditing)})
    this.onShowForm();
  }

  onFilter = (filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus, 10);
    //console.log(filterStatus);
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterStatus
      }
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
    var { //tasks,
      // isDisplayForm,
      taskEditing, filter, keyword, sortBy, sortValue } = this.state; // var tasks =this.state.tasks

    var { isDisplayForm } = this.props;

    var elmTaskForm = isDisplayForm ? <TaskForm
      task={taskEditing}
    /> : '';


    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className={isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>
            {elmTaskForm}
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
            <TaskList //tasks={tasks}  
              onUpdate={this.onUpdate}
              onFilter={this.onFilter} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isDisplayForm: state.isDisplayForm
  };
}

const mapDispathToProps = (dispatch, props) => {
  return {
    onToggleForm: () => {
      dispatch(actions.toggleForm())
    }
  };
}
export default connect(mapStateToProps, mapDispathToProps)(App)