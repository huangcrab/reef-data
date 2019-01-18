import React from "react";
import PropTypes from "prop-types";

const Message = props => {
  const { message, messageType } = props;

  return (
    <div
      className={`alert ${
        messageType === "success" ? "alert-success" : "alert-danger"
      }`}
    >
      {message}
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.string.isRequired,
  messageType: PropTypes.string.isRequired
};

export default Message;
