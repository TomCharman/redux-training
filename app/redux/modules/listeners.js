// Constant
const ADD_LISTENER = 'ADD_LISTENER'

// Action creator
export function addListener (listenerId) {
  return {
    type: ADD_LISTENER,
    listenerId,
  }
}

// Reducers
export default function listeners (state = {}, action) {
  switch (action.type) {
    case ADD_LISTENER :
      return {
        ...state,
        [action.listenerId]: true,
      }
    default :
      return state
  }
}
