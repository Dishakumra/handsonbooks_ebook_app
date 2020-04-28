import React from 'react';



import {Router,Link} from 'react-router';
import { createBrowserHistory as history } from 'history';
import { withRouter } from 'react-router';
import axios from 'axios';
import Navigation from './Navigation';
import '../App.css';


//import axios from 'axios';
import StarRatings from 'react-star-ratings';

class Foo extends React.Component {
    changeRating( newRating, name ) {
      this.setState({
        rating: newRating

      });
    }

    render() {
      // rating = 2;
      return (
        <StarRatings
          rating={this.state.rating}
          starRatedColor="blue"
          changeRating={this.changeRating}
          numberOfStars={5}
          name='rating'
        />
      );
    }
}
class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      pdf:'',
      cover:'',
      title:'',
      rating:'',
      length:'',
      user:[],
      change:false,
      login:false,
      show:false
    };

     this.callApi=this.callApi.bind(this);
     this.handledivclick=this.handledivclick.bind(this);
     this.addtoshelf=this.addtoshelf.bind(this);


  }


  componentDidMount() {

    this.callApi()
      .then(res => this.setState({
        length:res.length,
         user:JSON.parse(JSON.stringify(res)),



      })

    )
      .catch(err => console.log(err));




  }

  callApi = async () => {
    const response = await fetch('/allbooks');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log(body);
    return body;
  };

  handledivclick=(event) =>{


    this.props.pcallback(`${event.pdf}`);
    this.props.history.push('/openpdf')

  }
  addtoshelf(event)
  {
    axios.post(`http://localhost:3000/addtoshelf`,{
      userid:this.props.id,
      bookid:event._id


    })
    .then(res=>{
      console.log(res.data);







    })
    .catch((err) => {
      console.log(err);

    });
  }

  render(){


    return(
      <div className="App ">
      <Navigation/>

      <div className="innerone">


      {this.state.user.map((user,index)=>(

      <div className="container" key={index}>
      <img src={user.cover}  alt="Avatar" className="image"></img>
      <div className="overlay">
        <div className="text">{user.title}
         <StarRatings
        rating={parseFloat(user.rating)}
        starDimension="14px"
        starSpacing="2px"
        starRatedColor='rgb(203, 211, 227)'
        starEmptyColor="rgb(109, 122, 130)"
      />
      <button onClick={() =>this.addtoshelf(user)}>Add</button>
      <button onClick={() =>this.handledivclick(user)}>open</button>
      </div>
      </div>
      </div>
    ))}


  </div>
      </div>
    )
  }
}

export default withRouter(App);
