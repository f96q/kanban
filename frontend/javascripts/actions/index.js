import * as types from '../constants/ActionTypes'

export function getBoard() {
  return { type: types.API_GET_BOARD }
}

export function openNewTaskModal(columnId) {
  return {
    type: types.OPEN_NEW_TASK_MODAL,
    columnId: columnId
  }
}

export function openEditTaskModal(columnId, id) {
  return {
    type: types.OPEN_EDIT_TASK_MODAL,
    columnId: columnId,
    id: id
  }
}

export function closeTaskModal() {
  return { type: types.CLOSE_TASK_MODAL }
}

export function updateTaskModal(key, value) {
  return {
    type: types.UPDATE_TASK_MODAL,
    key: key,
    value: value
  }
}

export function createTask(columnId, task) {
  return {
    type: types.API_CREATE_TASK,
    columnId: columnId,
    task: task
  }
}

export function updateTask(columnId, id, task) {
  return {
    type: types.API_UPDATE_TASK,
    columnId: columnId,
    id: id,
    task: task
  }
}

export function destroyTask(columnId, id) {
  return {
    type: types.API_DESTROY_TASK,
    columnId: columnId,
    id: id
  }
}

export function dragStartTask(columnId, id) {
  return {
    type: types.DRAG_START_TASK,
    columnId: columnId,
    id: id
  }
}

export function dragEndTask() {
  return { type: types.DRAG_END_TASK }
}

export function dropTask(dragStartColumnId, id, columnId, index) {
  return {
    type: types.API_DROP_TASK,
    dragStartColumnId: dragStartColumnId,
    id: id,
    columnId: columnId,
    index: index
  }
}

export function toggleDropDownNavi() {
  return { type: types.TOGGLE_DROP_DOWN_NAVI }
}

export function incrementPoint() {
  return { type: types.INCREMENT_POINT }
}

export function resetPoint() {
  return { type: types.RESET_POINT }
}
