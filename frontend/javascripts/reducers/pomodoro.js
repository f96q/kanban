import * as types from '../constants/ActionTypes'

const initialState = {
  counter: 0
}

export default function pomodoro(state = initialState, action) {
  switch (action.type) {
    case types.INCREMENT_POMODORO:
      return Object.assign({}, state, { counter: state.counter + 1 })

    case types.RESET_POMODORO:
      return Object.assign({}, state, { counter: 0 })
  }
  return state
}
