import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default function ValidationError(props) {
    if(props.message) {
      return (
        <div className="error">{this.props.message}</div>
      );
    }
    return <></>
}

ValidationError.propTypes = {
  message: PropTypes.string
}