import { READ, SET_CHATS } from "../actions";

const initialState = {
  chats: [],
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHATS:
      return {
        ...state,
        chats: action.payload
      };
    case READ:
      state.chats.find(chat => chat.otherPartyId === action.payload.otherPartyId).read = true;

      return {
        ...state,
        chats: state.chats.slice()
      };
    default:
      return state;
  }
}

export default dataReducer;