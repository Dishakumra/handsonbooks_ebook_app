import React from 'react';
import '../App.css';

import PDFViewer from 'pdf-viewer-reactjs';

class App extends  React.Component {
  constructor(props)
  {
    super(props);
  };
render(){
    return (
      <div className="App">

        <PDFViewer
            document={{
                url: `https://cors-anywhere.herokuapp.com/${this.props.pdflink}`,
            }}
        />
        <a href = {this.props.pdflink} target = "_blank">Download Pdf</a>
        </div>
    );
  }
}

export default App;
