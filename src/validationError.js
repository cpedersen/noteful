import React, { Component } from 'react'

export default function ValidationError(props) {
    console.log("We are validating the UI input");
    if(props.message) {
      return (
        <div className="error">{props.message}</div>
      );
    }
  
    return <></>
  }