import { createAction } from 'redux-actions'

// 加载数据
export const load_todo = createAction('load_todo')
// 加载数据成功后触发指令
export const load_todo_success = createAction('load_todo_success')

// 添加任务
export const add_todo = createAction('add_todo')
export const add_todo_success = createAction('add_todo_success')

//删除任务
export const remove_todo = createAction('remove_todo')
export const remove_todo_success = createAction('remove_todo_success')

//修改任务状态
export const modify_todo = createAction('modify_todo')
export const modify_todo_success = createAction('modify_todo_success')

// 筛选指令
export const modify_todo_filter = createAction('modify_todo_filter')

// 删除已完成指令
export const clear_todo_completed = createAction('clear_todo_completed')
export const clear_todo_completed_success = createAction('clear_todo_completed_success')

// 任务名称修改指令
export const modify_todo_edit = createAction('modify_todo_edit')
export const modify_todo_edit_success = createAction('modify_todo_edit_success')

// 修改名称确定
export const modify_todo_name = createAction('modify_todo_name')
export const modify_todo_name_success = createAction('modify_todo_name_success')
