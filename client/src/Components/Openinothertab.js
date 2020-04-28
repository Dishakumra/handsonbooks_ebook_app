import React, { Component } from 'react';
import Pdf from '../Documents/Document.pdf';

class Download extends Component {
  constructor(props)
  {
    super(props);
  };
  render() {

    return (
      <div className = "App">
        <a href = {this.props.pdflink} target = "_blank">Download Pdf</a>
      </div>
    );
  }
}

export default Download;
