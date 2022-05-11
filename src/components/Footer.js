import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as todoActions from '../store/actions/todo.action'
import { getIn} from 'immutable'

class Footer extends Component {
  clear_todo =()=> {
    if(window.confirm('是否删除已完成任务')){
      this.props.clear_todo_completed()
    }
  }
  render() {
    let taskLen = this.props.todos.filter(todo => !todo.isCompleted).length
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{taskLen}</strong> item left
				</span>
        <ul className="filters">
          <li>
            <span onClick={() => {this.props.modify_todo_filter('all')}}>All</span>
          </li>
          <li>
            <span onClick={() => {this.props.modify_todo_filter('active')}}>Active</span>
          </li>
          <li>
            <span onClick={() => {this.props.modify_todo_filter('completed')}}>Completed</span>
          </li>
        </ul>
        <button className="clear-completed" onClick={this.clear_todo}>Clear completed</button>
      </footer>
    )
  }
}

// 获取store当中的数据
const mapStoreToProps = (state) => ({
  todos: getIn(state.todoReducer,['todos']) 
})

// 处理dispatch函数
const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(todoActions, dispatch)
})

export default connect(mapStoreToProps, mapDispatchToProps)(Footer)
