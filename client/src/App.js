import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
//import { DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import logo from './logo.svg';
import book1 from './book1.png';
import book2 from './book2.jpeg';
import book3 from './book3.png';
import book4 from './ll.jpg';


import Bookshelf from './Components/Bookshelf'
import Openpdf from './Components/Openpdf'
import Yourbookshelf from './Components/Yourbookshelf'
import Favquotes from './Components/Favquotes'
import Dictionary from './Components/Dictionary'
import Login from './Components/Login';


import { createBrowserHistory as history} from 'history';
import './App.css';

class App extends React.Component {
  constructor(props)
  {
    super(props);
  this.state = {
    response: '',
    login:false,
    show:false,
    id:''



  };
  this.callbackFunction=this.callbackFunction.bind(this);
  this.showModal=this.showModal.bind(this);
}
componentDidMount(){
  if(this.state.login===false)
  {
    this.setState({show:!this.state.show});
  }
  document.body.style.overflow = "hidden"
}

showModal(e){
  this.setState({show:!this.state.show});
  this.setState({login:!this.state.login});
  this.setState({id:e});
  console.log(this.state.id);
  


}
  callbackFunction(childData) {
        this.setState({response: childData})
  }

render() {
    return (
      <Router history={history}>
      <div className="App ">




        <Login onClose={this.showModal}  show={this.state.show}/>
        <switch>

        <Route exact path="/" component={() => <Bookshelf id={this.state.id} pcallback={this.callbackFunction} />}/>
        <Route exact path="/openpdf" component={() =><Openpdf pdflink={this.state.response}/>}/>
        <Route exact path="/bookshelf" component={()=><Yourbookshelf id={this.state.id} pcallback={this.callbackFunction}/>}/>
        <Route exact path="/favquotes" component={()=><Favquotes id={this.state.id}/>}/>
        <Route exact path="/Dictionary" component={Dictionary}/>


        </switch>






      </div>
      </Router>
    );
  }
}

export default App;
