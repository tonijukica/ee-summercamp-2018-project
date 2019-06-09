import { API_URL } from '../../config';

export const authActionTypes = {
  SET_AUTH_STATE_FROM_LOCAL_STORAGE: 'SET_AUTH_STATE_FROM_LOCAL_STORAGE',
  SAVE_USER: 'SAVE_USER'
};

export function setAuthStateFromLocalStorage(persistedState) {
  return dispatch => dispatch({ type: authActionTypes.SET_AUTH_STATE_FROM_LOCAL_STORAGE, payload: persistedState });
}

export function fetchUser() {
  return fetch(`${API_URL}/user`, { credentials: 'include' })
    .then(response => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .catch(error => {
      console.error(error);
      return null;
    });
}

export function saveUser(user) {
  return dispatch => dispatch({ type: authActionTypes.SAVE_USER, payload: user });
}
