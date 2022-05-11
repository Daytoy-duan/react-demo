// 触发load_todo指令,获取数据
import axios from 'axios'
import { takeEvery, put } from 'redux-saga/effects'
import { clear_todo_completed_success, load_todo, load_todo_success, modify_todo, modify_todo_edit, modify_todo_success } from '../actions/todo.action'
import {add_todo, add_todo_success, modify_todo_edit_success, modify_todo_name_success } from '../actions/todo.action'
import {remove_todo, remove_todo_success, clear_todo_completed, modify_todo_name } from '../actions/todo.action'

// 异步获取数据
function* load_todo_data(){
  const todo_data =  yield axios.get('http://localhost:3005/api/todos').then(res => res.data)
  yield put(load_todo_success(todo_data))
  // console.log(todo_data)
}

// 获取添加任务
function* add_todo_data(action){
  let taskInfo = yield axios.post('http://localhost:3005/api/todos',{taskName: action.payload}).then(res => res.data)
  console.log(taskInfo)
  yield put(add_todo_success(taskInfo.task))
}
// 删除任务
function* remove_todo_data(action){
  let res = yield axios.delete('http://localhost:3005/api/todos',{
    params:{
      id: action.payload
    }
  }).then(res => res.data)
  yield put(remove_todo_success(res.tasks.id))
}

// 修改任务状态
function* modify_todo_data(action){
  let params = action.payload
  let {task} = yield axios.put('http://localhost:3005/api/todos/isCompleted',params).then(res => res.data)
  yield put(modify_todo_success(task))
}

// 筛选已完成任务
function* clear_todo_data() {
  yield axios.delete('http://localhost:3005/api/todos/clearCompleted').then(res => res.data)
  yield put(clear_todo_completed_success())
}

// 实现 modify_todo_edit_data 
function* modify_todo_edit_data(action) {
  let { task } = yield axios.put("http://localhost:3005/api/todos/isEditing", action.payload).then(res => res.data)
  yield put(modify_todo_edit_success(task))
}

function* modify_todo_name_data(action) {
  let { task } = yield axios.put("http://localhost:3005/api/todos/", action.payload).then(res => res.data)
  yield put(modify_todo_name_success(task))
}

export default function* todo_saga(){
    yield takeEvery(load_todo,load_todo_data)
    yield takeEvery(add_todo, add_todo_data)
    yield takeEvery(remove_todo,remove_todo_data)
    yield takeEvery(modify_todo,modify_todo_data)
    yield takeEvery(clear_todo_completed, clear_todo_data)
    yield takeEvery(modify_todo_edit, modify_todo_edit_data)
    yield takeEvery(modify_todo_name,modify_todo_name_data)
}