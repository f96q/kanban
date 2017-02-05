import * as types from '../constants/ActionTypes'

const initialState = {
  counter: 0
}

export default function point(state = initialState, action) {
  switch (action.type) {
    case types.INCREMENT_POINT:
      return Object.assign({}, state, { counter: state.counter + 1 })

    case types.RESET_POINT:
      return Object.assign({}, state, { counter: 0 })
  }
  return state
}
