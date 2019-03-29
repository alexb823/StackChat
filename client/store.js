import { createStore, applyMiddleware } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import axios from 'axios';
import socket from "./socket";

const initialState = {
  messages: [],
  newMessage: '',
  authorName: ''
};

const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const WRITE_MESSAGE = 'WRITE_MESSAGE';
const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER';
const CHANGE_AUTHOR_NAME = 'CHANGE_AUTHOR_NAME';

export const changeAuthorName = authorName => {
  return {
    type: CHANGE_AUTHOR_NAME,
    authorName,
  }
}

export const gotMessagesFromServer = messages => {
  return {
    type: GOT_MESSAGES_FROM_SERVER,
    messages,
  };
};

export const writeMessage = (newMessage) => {
  return {
    type: WRITE_MESSAGE,
    newMessage,
  }
}

export const gotNewMessageFromServer = (message) => {
  return {
    type: GOT_NEW_MESSAGE_FROM_SERVER,
    message,
  }
}

export const fetchMessages = () => {
  return dispatch => {
    return axios
      .get('/api/messages')
      .then(response => response.data)
      .then(messages => gotMessagesFromServer(messages))
      .then(action => dispatch(action))
      .catch(e => console.log(e));
  };
};

export const postNewMessage = (message) => {
  return dispatch => {
    let emitMessage = {};
    return axios
      .post('/api/messages', message)
      .then(response => response.data)
      .then(newMessage => {
        emitMessage = newMessage;
        return gotNewMessageFromServer(newMessage)
      })
      .then(action => dispatch(action))
      .then(() => socket.emit("new-message", emitMessage))
      .catch(e => console.log(e));
  }
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return { ...state, messages: action.messages };
    case GOT_NEW_MESSAGE_FROM_SERVER:
      return {...state, messages: [...state.messages, action.message]}
    case WRITE_MESSAGE:
      return {...state, newMessage: action.newMessage}
    case CHANGE_AUTHOR_NAME:
      return {...state, authorName: action.authorName}
    default:
      return state;
  }
};

export default createStore(reducer, applyMiddleware(thunkMiddleWare));
