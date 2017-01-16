import { combineReducers } from 'redux'
import board from './board'

export default combineReducers({
  board
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
