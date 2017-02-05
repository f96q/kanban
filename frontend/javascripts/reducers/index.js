import { combineReducers } from 'redux'
import board from './board'
import point from './point'

export default combineReducers({
  board,
  point
})

export function getDragStartColumnId(state) {
  return state.board.dragStartColumnId
}

export function getDragStartId(state) {
  return state.board.dragStartId
}

export function getTaskModal(state) {
  return state.board.taskModal
}

export function getBoard(state) {
  return state.board.board
}

export function getBoards(state) {
  return state.board.boards
}

export function getOpenDropDownNavi(state) {
  return state.board.openDropDownNavi
}

export function getCounter(state) {
  return state.point.counter
}
