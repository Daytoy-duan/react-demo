import { handleActions as createReducer } from 'redux-actions'
import {add_todo_success, clear_todo_completed_success, load_todo_success, modify_todo_filter, modify_todo_success, remove_todo_success, modify_todo_edit_success, modify_todo_name_success}  from '../actions/todo.action'
import { fromJS, setIn, mergeDeep, removeIn, getIn, updateIn} from 'immutable'

const initState = fromJS({
  todos: [],
  filter: 'all'
})

export default createReducer({
    [load_todo_success]: (state, action)=>{
      return setIn(state,['todos'],action.payload)
    },
    [add_todo_success]: (state,action) => {
      // mergeDeep 合并数据,1. 合并的数据 2. 要合并的属性以及被合并的值
      return mergeDeep(state,{todos: [action.payload]})
    },
    [remove_todo_success]: (state, action)=>{
      let index = getIn(state, ['todos']).findIndex(todo => todo.id === action.payload)
      return removeIn(state, ['todos', index])
    },
    [modify_todo_success]: (state,action)=>{
      let index = getIn(state,['todos']).findIndex(todo => todo.id === action.payload.id)
      return updateIn(state,['todos', index], ()=>action.payload)
    },
    [modify_todo_filter]: (state, action) => {
      return setIn(state, ['filter'], action.payload)
    },
    [clear_todo_completed_success]: (state,action) => {
      let todos = getIn(state, ['todos']).filter(todo => !todo.isCompleted)
      return setIn(state, ['todos'], todos)
    },
    [modify_todo_edit_success]: (state, action) => {
      // 利用id 找到需要被操作的任务项，然后设置 isEditing 状态，显示具体的样式
      let index = getIn(state, ['todos']).findIndex(todo => todo.id === action.payload.id)
      return updateIn(state,['todos', index], ()=> action.payload.isEditing)
    },
    [modify_todo_name_success]: (state, action) => {
      console.log(action)
      let index = getIn(state, ['todos']).findIndex(todo => todo.id === action.payload.id)
      return updateIn(state,['todos',index],()=>action.payload.taskName)
    }
},initState)

