import {createStore, applyMiddleware} from "redux";
import thunkMiddleWare from "redux-thunk";
import axios from "axios";

const initialState = {
  messages: []
}

const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const FETCH_MESSAGES = 'FETCH_MESSAGES';


export const gotMessagesFromServer = messages => {
  return {
    type: GOT_MESSAGES_FROM_SERVER,
    messages
  }
}

export const fetchMessages = () => {
  return dispatch => {
    return axios.get('/api/messages')
         .then(response => response.data)
         .then(messages => gotMessagesFromServer(messages))
         .then((action) => dispatch(action))
         .catch(e => console.log(e));
  }
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case GOT_MESSAGES_FROM_SERVER:
      return {...state, messages: action.messages}
    case FETCH_MESSAGES:
      return {...state}
    default:
      return state;
  }
}

export default createStore(reducer, applyMiddleware(thunkMiddleWare));
