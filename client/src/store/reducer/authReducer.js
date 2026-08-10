import { SET_ACCESS_TOKEN, SET_IS_LOGGED_IN, SET_SOCKET } from "../actions";

const initialState = {
  accessToken: null,
  isLoggedIn: false,
  socket: null
};

const jsonAccessToken = localStorage.getItem('accessToken');
if (jsonAccessToken) {
  const accessToken = JSON.parse(jsonAccessToken);
  if (accessToken) {
    initialState.accessToken = accessToken;
    initialState.isLoggedIn = true;
  }
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.payload
      };
    case SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.payload
      };
    case SET_SOCKET:
      return {
        ...state,
        socket: action.payload
      };
    default:
      return state;
  }
}

export default authReducer;