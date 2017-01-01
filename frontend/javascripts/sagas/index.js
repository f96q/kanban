import { call, put, select, takeEvery } from 'redux-saga/effects'
import * as types from '../constants/ActionTypes'
import * as api from '../api'

const getBoardId = state => state.board.board.id
const getCsrfToken = state => state.board.csrfToken

function* getBoard(action) {
  const id = yield select(getBoardId)
  const json = yield call(api.getBoard, id)
  yield put({ type: types.SET_BOARD, board: json })
}

function* createTask(action) {
  const csrfToken = yield select(getCsrfToken)
  const json = yield call(api.createTask, csrfToken, action.columnId, action.task)
  yield put({ type: types.CREATE_TASK, columnId: action.columnId, id: json.id, task: action.task })
}

function* updateTask(action) {
  const csrfToken = yield select(getCsrfToken)
  yield call(api.updateTask, csrfToken, action.columnId, action.id, action.task)
  yield put({ type: types.UPDATE_TASK, columnId: action.columnId, id: action.id, task: action.task })
}

function* destroyTask(action) {
  const csrfToken = yield select(getCsrfToken)
  yield call(api.destroyTask, csrfToken, action.id)
  yield put({ type: types.DESTROY_TASK, columnId: action.columnId, id: action.id })
  yield put({ type: types.CLOSE_TASK_MODAL })
}

function* dropTask(action) {
  const csrfToken = yield select(getCsrfToken)
  yield call(api.dropTask, csrfToken, action.id, action.columnId, action.index + 1)
  yield put({ type: types.DROP_TASK, dragStartColumnId: action.dragStartColumnId, id: action.id, columnId: action.columnId, index: action.index })
}

export default function* rootSaga() {
  yield takeEvery(types.API_GET_BOARD, getBoard)
  yield takeEvery(types.API_CREATE_TASK, createTask)
  yield takeEvery(types.API_UPDATE_TASK, updateTask)
  yield takeEvery(types.API_DESTROY_TASK, destroyTask)
  yield takeEvery(types.API_DROP_TASK, dropTask)
}
