import { call, put, select, takeLatest } from "redux-saga/effects";
import { FETCH_CHATS, LOGIN, LOGOUT, REGISTER, SET_ACCESS_TOKEN, SET_CHATS, SET_IS_LOGGED_IN, SET_SOCKET } from "../actions";
import axios from "axios";
import { io } from "socket.io-client";
import store from "../store";

function* authWorker(action) {

  const state = yield select();

  switch (action.type) {
    case REGISTER:
      try {
        const res = yield call(axios.post, 'http://localhost:3000/register', action.payload);
        alert(res.data.message);

      } catch (error) {
        alert(error.response?.data.message);
      }
      break;
    case LOGIN:
      try {
        const res = yield call(axios.post, 'http://localhost:3000/login', action.payload);

        const accessToken = res.data.accessToken;

        const socket = io('http://localhost:80/events'); // gửi yêu cầu kết nối

        // sau khi server nhận dc kết nối, sẽ gửi lại phản hồi connection
        // khi bên này nhận được connection sẽ gửi token để bên kia gán user id cho socket
        socket.on('connection', data => socket.emit('auth', { accessToken }));

        // khi có thông báo => cập nhật thông tin mới
        socket.on('events', data => {
          store.dispatch({ type: FETCH_CHATS });
        });

        localStorage.setItem('accessToken', JSON.stringify(accessToken));
        yield put({ type: SET_IS_LOGGED_IN, payload: true });
        yield put({ type: SET_ACCESS_TOKEN, payload: accessToken });
        yield put({ type: SET_SOCKET, payload: socket });

      } catch (error) {
        alert(error.response?.data.message);
      }
      break;
    case LOGOUT:

      state.auth.socket?.disconnect();

      localStorage.setItem('accessToken', JSON.stringify(null));
      yield put({ type: SET_IS_LOGGED_IN, payload: false });
      yield put({ type: SET_ACCESS_TOKEN, payload: null});
      yield put({ type: SET_CHATS, payload: [] });
      yield put({ type: SET_SOCKET, payload: null });
      break;
  }
}

export function* watchAuthAction() {
  yield takeLatest(REGISTER, authWorker);
  yield takeLatest(LOGIN, authWorker);
  yield takeLatest(LOGOUT, authWorker);
}