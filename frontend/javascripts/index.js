import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { compose, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from "redux-saga"
import persistState from 'redux-localstorage'
import reducer from './reducers'
import rootSaga from './sagas'
import App from './containers/App'
import { SET_CSRF_TOKEN, SET_BOARD_ID } from './constants/ActionTypes'

const csrfToken = document.getElementsByName('csrf-token').item(0).content
const board = document.getElementsByClassName('js-board')[0]
const id = board.getAttribute('data-id')

const enhancer = compose(persistState('pomodoro'))

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware),
  enhancer
)

sagaMiddleware.run(rootSaga)

store.dispatch({ type: SET_CSRF_TOKEN, csrfToken: csrfToken })
store.dispatch({ type: SET_BOARD_ID, id: id })

render((
  <Provider store={store}>
    <App />
  </Provider>
), board)

