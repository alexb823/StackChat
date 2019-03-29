import React, { Component } from 'react';
import { connect } from "react-redux";
import { writeMessage, postNewMessage } from "../store";

const mapStateToProps = (state) => {
  return {
    newMessage: state.newMessage,
  }
}

const mapDistpatchToProps = (dispatch) => {
  return {
    write: (newMessage) => dispatch(writeMessage(newMessage)),
    post: (newMessage) => dispatch(postNewMessage(newMessage)),
  }
}

class NewMessageEntry extends Component {
  constructor(){
    super();
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange({target}){
    this.props.write(target.value)
  }
  onSubmit(event){
    event.preventDefault();
    const content = this.props.newMessage;
    const channelId = this.props.channelId;
    const name = this.props.authorName;
    this.props.post({ content, channelId, name });
  }
  render () {
    return (
      <form id="new-message-form" onSubmit={this.onSubmit}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            placeholder="Say something nice..."
            onChange={this.onChange}
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Chat!</button>
          </span>
        </div>
      </form>
    );
  }
}

export default connect(mapStateToProps, mapDistpatchToProps)(NewMessageEntry);
