import React, { Component } from "react";
import { connect } from 'react-redux'
import * as actions from './../actions/index'

class TaskForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      status: false
    }
  }

  componentDidMount() {
    if (this.props.itemEditing && this.props.itemEditing.id!== null) {
      this.setState({
        id: this.props.itemEditing.id,
        name: this.props.itemEditing.name,
        status: this.props.itemEditing.status
      })//,()=>{console.log(this.state)})
      //console.log(this.state)
    }
    else{
      this.onClear();
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    //console.log(nextProps)
    if (nextProps && nextProps.itemEditing) {
      this.setState({
        id: nextProps.itemEditing.id,
        name: nextProps.itemEditing.name,
        status: nextProps.itemEditing.status
      })//,()=>{console.log(this.state)})
    }
    else if (!nextProps.task) {
      this.setState({
        id: '',
        name: '',
        status: false
      })
    }
  }
  
  onCloseForm = () => {
    this.props.onCloseForm();
  }

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.name === 'status' ? target.value === "true" ? true : false : target.value;
    this.setState({
      [name]: value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    // this.props.onSubmit(this.state);
    //this.props.onAddTask(this.state);
    this.props.onSaveTask(this.state);
    this.onClear();
    this.onCloseForm();
  }

  onClear = () => {
    this.setState({
      name: '',
      status: false
    })
  }

  render() {
    
    var { id } = this.state;
    if(!this.props.isDisplayForm) return ''
    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">{id !== '' ? 'Cập nhật công việc' : 'Thêm công việc'}
            <span className="fa fa-times-circle text-right"
              onClick={this.onCloseForm}
            ></span>
          </h3>
        </div>
        <div className="panel-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Tên :</label>
              <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.onChange} />
            </div>
            <label>Trạng Thái :</label>
            <select className="form-control" required="required"
              name="status" value={this.state.status} onChange={this.onChange}>
              <option value={true}>Kích Hoạt</option>
              <option value={false}>Ẩn</option>
            </select>
            <br />
            <div className="text-center">
              <button type="submit" className="btn btn-warning">{id !== '' ? 'Cập nhật' : 'Thêm'}</button>&nbsp;
                <button type="button" className="btn btn-danger" onClick={this.onClear}>Hủy Bỏ</button>
            </div>
          </form>
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
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onAddTask: (task) => {
      dispatch(actions.addTask(task))
    },
    onSaveTask: (task) => {
      dispatch(actions.saveTask(task))
    },
    onOpenForm: () => {
      dispatch(actions.openForm())
    },
    onCloseForm: () => {
      dispatch(actions.closeForm())
    },
    onToggleForm: () => {
      dispatch(actions.toggleForm())
    }
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(TaskForm)