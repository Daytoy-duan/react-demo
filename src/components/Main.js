import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import * as todoActions from '../store/actions/todo.action'
import { getIn } from 'immutable'

class Main extends Component {

  // 调用具体的指令函数，触发数据获取操作 
  componentDidMount(){
    this.props.load_todo()
  }

  removeTask(id) {
    if(window.confirm('是否确认删除')){
      this.props.remove_todo(id)
    }
  }

  modify_name(id, ev) {
    // 1 切换状态 
    this.props.modify_todo_edit({ id: id, isEditing: false })
    // 2 修改数据
    this.props.modify_todo_name({ id: id, taskName: ev.target.value })
  }

  render() {
    console.log(this.props)
    return (
      <section className="main">
        <input className="toggle-all" type="checkbox" />
        <ul className="todo-list">
          {
            this.props.todos.map(item => {
              let classes = []
              if(item.isCompleted) {classes.push('completed')}
              if(item.isEditing) {classes.push('editing')}
              return (
                <li key={item.id} className={classes.join(" ")}>
                  <div className="view">
                    <input className="toggle" type="checkbox" defaultChecked = {item.isCompleted} onChange = {(e)=>{ this.props.modify_todo({ id: item.id, isCompleted: e.target.checked }) }} />
                    <label onDoubleClick={() => {this.props.modify_todo_edit({ id: item.id, isEditing: true}) }}>{item.taskName}</label>
                    <button className="destroy" onClick={this.removeTask.bind(this,item.id)}></button>
                  </div>
                  <input defaultValue={item.taskName} className="edit" onBlur={this.modify_name.bind(this, item.id)} />
                </li>
              )
            })
          }
        </ul>
      </section>
    )
  }
}

// 获取数据
const mapStateToProp = state => ({
  todos: filterTodos(getIn(state.todoReducer,['todos']), getIn(state.todoReducer,['filter']))
})

// 处理dispatch
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(todoActions,dispatch)
})

// 定义方法依据 filter 筛选出需要展示的数据
function filterTodos(todos, filter) {
  switch (filter) {
    case 'all':
      return todos
    case 'active':
      return todos.filter(todo => !todo.isCompleted)
    case 'completed':
      return todos.filter(todo => todo.isCompleted)
    default:
      break;
  }
}

export default connect(mapStateToProp,mapDispatchToProps)(Main)

