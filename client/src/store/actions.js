export const REGISTER = 'REGISTER';

export const LOGIN = 'LOGIN';

export const LOGOUT = 'LOGOUT';

export const SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN';

export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';

export const SET_CHATS = 'SET_CHATS';

export const FETCH_CHATS = 'FETCH_CHATS';

export const SEND = 'SEND';

export const SET_SOCKET = 'SET_SOCKET';

export const SEARCH = 'SEARCH';

export const READ = 'READ';

export const register = (username, password) => ({
  type: REGISTER,
  payload: {
    username,
    password
  }
});

export const login = (username, password) => ({
  type: LOGIN,
  payload: {
    username,
    password
  }
});

export const logout = () => ({ type: LOGOUT});

export const fetchChats = () => ({ type: FETCH_CHATS });

export const send = (otherPartyId, content) => ({
  type: SEND,
  payload: {
    otherPartyId,
    content
  }
});

export const search = username => ({
  type: SEARCH,
  payload: {
    otherPartyUsername: username
  }
});

export const read = otherPartyId => ({
  type: READ,
  payload: {
    otherPartyId
  }
});