import React from "react";
import { connect } from "react-redux";
import store, { changeAuthorName } from "../store";

const mapDispatchToProps = (dispatch) => {
  return {
    update: (name) => dispatch(changeAuthorName(name)),
  }
}

const NameEntry = (props) => {
  const onChange = ({target}) => {
    props.update(target.value)
  }
  return (
    <form className="form-inline">
      <label htmlFor="name">Your Name:</label>
      <input
        type="text"
        name="name"
        placeholder="Enter your name"
        className="form-control"
        style={{marginLeft: '10px'}}
        onChange={onChange}
      />
    </form>
  )
}

export default connect(null, mapDispatchToProps)(NameEntry);
