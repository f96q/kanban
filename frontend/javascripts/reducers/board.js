import * as types from '../constants/ActionTypes'

function findIndex(objects, id) {
  let index = null
  objects.forEach((object, i) => {
    if (object.id == id) {
      index = i
      return
    }
  })
  return index
}

const initialState = {
  dragStartColumnId: null,
  dragStartId: null,
  csrfToken: null,
  board: {
    id: null,
    title: '',
    columns: []
  },
  taskModal: {
    isOpen: false,
    columnId: null,
    task: {
      id: null,
      title: '',
      description: ''
    }
  }
}

export default function board(state = initialState, action) {
  switch (action.type) {
    case types.SET_CSRF_TOKEN: {
      return Object.assign({}, state, { csrfToken: action.csrfToken })
    }
    case types.SET_BOARD_ID: {
      let board = Object.assign({}, state.board)
      board.id = action.id
      return Object.assign({}, state, { board: board })
    }
    case types.SET_BOARD: {
      return Object.assign({}, state, { board: action.board })
    }
    case types.OPEN_NEW_TASK_MODAL: {
      const taskModal = {
        isOpen: true,
        columnId: action.columnId,
        task: {
          id: null,
          title: '',
          description: ''
        }
      }
      return Object.assign({}, state, { taskModal: taskModal })
    }
    case types.CLOSE_TASK_MODAL: {
      return Object.assign({}, state, { taskModal: initialState.taskModal })
    }
    case types.UPDATE_TASK_MODAL: {
      let taskModal = Object.assign({}, state.taskModal)
      taskModal.task[action.key] = action.value
      return Object.assign({}, state, { taskModal: taskModal })
    }
    case types.OPEN_EDIT_TASK_MODAL: {
      const columns = Object.assign([], state.board.columns)
      const columnIndex = findIndex(columns, action.columnId)
      const index = findIndex(columns[columnIndex].tasks, action.id)
      const task = columns[columnIndex].tasks[index]
      const taskModal = {
        isOpen: true,
        columnId: action.columnId,
        task: Object.assign({}, task)
      }
      return Object.assign({}, state, { taskModal: taskModal })
    }
    case types.CREATE_TASK: {
      const board = Object.assign({}, state.board)
      const columns = board.columns
      const index = findIndex(columns, action.columnId)
      const task = Object.assign({}, action.task, { id: action.id })
      columns[index].tasks.push(task)
      return Object.assign({}, state, { board: board })
    }
    case types.UPDATE_TASK: {
      const board = Object.assign({}, state.board)
      const columns = board.columns
      const index = findIndex(columns, action.columnId)
      const tasks = columns[index].tasks
      const taskIndex = findIndex(tasks, action.id)
      for (let key in action.task) {
        tasks[taskIndex][key] = action.task[key]
      }
      return Object.assign({}, state, { board: board } )
    }
    case types.DESTROY_TASK: {
      const board = Object.assign({}, state.board)
      const columns = board.columns
      const index = findIndex(columns, action.columnId)
      const tasks = columns[index].tasks
      const taskIndex = findIndex(tasks, action.id)
      tasks.splice(taskIndex, 1)
      return Object.assign({}, state, { board: board })
    }
    case types.DRAG_START_TASK: {
      return Object.assign({}, state, { dragStartColumnId: action.columnId, dragStartId: action.id })
    }
    case types.DRAG_END_TASK: {
      return Object.assign({}, state, { dragStartColumnId: null, dragStartId: null })
    }
    case types.DROP_TASK: {
      const board = Object.assign({}, state.board)
      const columns = board.columns
      const index = findIndex(columns, action.dragStartColumnId)
      const tasks = columns[index].tasks
      const taskIndex = findIndex(tasks, action.id)
      const task = Object.assign({}, tasks[taskIndex])
      const dropIndex = findIndex(columns, action.columnId)
      const dropTasks = columns[dropIndex].tasks
      tasks.splice(taskIndex, 1)
      dropTasks.splice(action.index, 0, task)
      return Object.assign({}, state, { board: board })
    }
  }
  return state
}