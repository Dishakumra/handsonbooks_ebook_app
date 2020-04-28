import React from 'react';
import '../App.css';
import logo from '../logo.svg';
import book1 from '../book1.png';
import book2 from '../book2.jpeg';
import book3 from '../book3.png';
import book4 from '../ll.jpg';
import {Router} from 'react-router';
import { withRouter } from 'react-router';



class App extends  React.Component {
  constructor(props)
  {
    super(props);
    this.change=this.change.bind(this);
  };
  change(e){
    e.target.style.background=" #555"

  }
render(){
    return (
      <div>
      <span className="App-header">

        <p>
          handsonBooks
        </p>


      </span>
      <div className="navigator">
      <ul>
        <li><a onClick={() => this.props.history.push('/') } className="tooltip"><img src={book1} className="iconn"/><span className="tooltiptext">Library</span></a></li>
        <li><a onClick={() => this.props.history.push('/bookshelf') } className="tooltip"><img src={book2} className="iconn"/><span className="tooltiptext">Bookshelf</span></a></li>
        <li><a onClick={() => this.props.history.push('/favquotes') } className="tooltip"><img src={book3} className="iconn"/><span className="tooltiptext">Fav Quotes</span></a></li>
        <li><a onClick={() => this.props.history.push('/Dictionary') } className="tooltip"><img src={book4} className="iconn"/><span className="tooltiptext">Dictionary</span></a></li>
    </ul>
      </div>
      </div>

    );
  }
}
export default withRouter(App);
