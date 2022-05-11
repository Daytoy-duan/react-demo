// 完成中间件的创立，以及store的创建
import { createStore, applyMiddleware } from 'redux'
import  rootReducer  from './reducers/rootReducer'
import createSagaMiddleware from '@redux-saga/core'
import todo_saga from './saga/todo.saga'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(todo_saga)

export default store