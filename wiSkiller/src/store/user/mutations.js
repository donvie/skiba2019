export function userStatus (state, user) {
  if (user) {
    state.currentUser = user
  } else {
    state.currentUser = null
  }
}
