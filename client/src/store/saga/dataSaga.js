import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { FETCH_CHATS, LOGOUT, READ, SEARCH, SEND, SET_CHATS, } from "../actions";

function* dataWorker(action) {

  const state = yield select();
  const accessToken = state.auth.accessToken;

  switch (action.type) {
    case FETCH_CHATS:
      try {
        const res = yield call(axios.get, 'http://localhost:3000/chats', {headers: {Authorization: `Bearer ${accessToken}`}});
        
        yield put({ type: SET_CHATS, payload: res.data });
        
      } catch (error) {
        alert('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại');

        yield put({ type: LOGOUT });
      }
      break;
    case SEND:
      try {
        yield call(axios.post, 'http://localhost:3000/send', action.payload, {headers: {Authorization: `Bearer ${accessToken}`}});

        yield put({ type: FETCH_CHATS });
      } catch (error) {
        alert('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại');

        yield put({ type: LOGOUT });
      }
      break;
    case SEARCH:
      try {
        const res = yield call(axios.post, 'http://localhost:3000/search', action.payload, {headers: {Authorization: `Bearer ${accessToken}`}});

        const otherPartyId = res.data?.otherPartyId;

        yield put({
          type: SET_CHATS,
          payload: [
            {
              messages: [],
              otherPartyUsername: action.payload.otherPartyUsername,
              otherPartyId,
              read: true
            },
            ...state.data.chats
          ]
        });
      } catch (error) {
        alert(error.response?.data.message);
      }
      break;
    case READ:
      axios.post('http://localhost:3000/read', action.payload, {headers: {Authorization: `Bearer ${accessToken}`}});
      break;
    
  }
}

export function* watchDataAction() {
  yield takeLatest(FETCH_CHATS, dataWorker);
  yield takeLatest(SEND, dataWorker);
  yield takeLatest(SEARCH, dataWorker);
  yield takeLatest(READ, dataWorker);
}