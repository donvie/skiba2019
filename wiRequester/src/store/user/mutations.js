export function userStatus (state, user) {
  if (user) {
    state.currentUser = user
  } else {
    state.currentUser = null
  }
}

export function service (state, service) {
  state.service = service
}

export function wiSkiller (state, service) {
  state.wiSkiller = service
}
