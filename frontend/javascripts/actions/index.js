import * as types from '../constants/ActionTypes'
import humps from 'humps'
import 'whatwg-fetch'

export default class ActionDispatcher {
  constructor(state, dispatch) {
    this.state = state
    this.dispatch = dispatch
  }

  openNewTaskModal(columnId) {
    this.dispatch({
      type: types.OPEN_NEW_TASK_MODAL,
      columnId: columnId
    })
  }

  openEditTaskModal(columnId, id) {
    this.dispatch({
      type: types.OPEN_EDIT_TASK_MODAL,
      columnId: columnId,
      id: id
    })
  }

  closeTaskModal() {
    this.dispatch({ type: types.CLOSE_TASK_MODAL })
  }

  updateTaskModal(key, value) {
    this.dispatch({
      type: types.UPDATE_TASK_MODAL,
      key: key,
      value: value
    })
  }

  async getBoard() {
    const id = this.state.board.id
    await fetch(`/api/boards/${id}`, { credentials: 'same-origin' })
      .then(response => response.json())
      .then(json => ::this.dispatch({ type: types.SET_BOARD, board: json.board, boards: json.boards }))
  }

  async createTask(columnId, task) {
    const data = new FormData()
    data.append('column_id', columnId)
    const decamelizeTask = humps.decamelizeKeys(task)
    for (let key in decamelizeTask) {
      data.append(`task[${key}]`, decamelizeTask[key])
    }
    const init = {
      headers: { 'X-CSRF-Token': this.state.csrfToken },
      credentials: 'same-origin',
      method: 'POST',
      body: data
    }
    await fetch('/api/tasks', init)
      .then(response => response.json())
      .then(json => ::this.dispatch({ type: types.CREATE_TASK, columnId: columnId, id: json.id, task: task }))
  }

  async updateTask(columnId, id, task) {
    const data = new FormData()
    const decamelizeTask = humps.decamelizeKeys(task)
    for (let key in decamelizeTask) {
      data.append(`task[${key}]`, decamelizeTask[key])
    }
    const init = {
      headers: { 'X-CSRF-Token': this.state.csrfToken },
      credentials: 'same-origin',
      method: 'PUT',
      body: data
    }
    await fetch(`/api/tasks/${id}`, init)
      .then(() => ::this.dispatch({ type: types.UPDATE_TASK, columnId: columnId, id: id, task: task }))
  }

  async destroyTask(columnId, id) {
    const init = {
      headers: { 'X-CSRF-Token': this.state.csrfToken },
      credentials: 'same-origin',
      method: 'DELETE'
    }
    await fetch(`/api/tasks/${id}`, init)
      .then(() => {
        ::this.dispatch({ type: types.DESTROY_TASK, columnId: columnId, id: id })
        ::this.dispatch({ type: types.CLOSE_TASK_MODAL })
      })
  }

  dragStartTask(columnId, id) {
    this.dispatch({
      type: types.DRAG_START_TASK,
      columnId: columnId,
      id: id
    })
  }

  dragEndTask() {
    this.dispatch({ type: types.DRAG_END_TASK })
  }

  async dropTask(dragStartColumnId, id, columnId, index) {
    const data = new FormData()
    data.append('id', id)
    data.append('column_id', columnId)
    data.append('position', index)
    const init = {
      headers: { 'X-CSRF-Token': this.state.csrfToken },
      credentials: 'same-origin',
      method: 'PUT',
      body: data
    }
    await fetch(`/api/tasks/${id}/position`, init)
      .then(() => ::this.dispatch({ type: types.DROP_TASK, dragStartColumnId: dragStartColumnId, id: id, columnId: columnId, index: index }))
  }

  toggleDropDownNavi() {
    this.dispatch({ type: types.TOGGLE_DROP_DOWN_NAVI })
  }

  incrementPoint() {
    this.dispatch({ type: types.INCREMENT_POINT })
  }

  resetPoint() {
    this.dispatch({ type: types.RESET_POINT })
  }
}
