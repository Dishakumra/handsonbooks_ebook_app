import React from 'react';
import '../App.css';
import addbook from '../addbook.png';
import Navigation from './Navigation';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import ContextMenu from 'react-context-menu';
import { createBrowserHistory as history } from 'history';
import { withRouter } from 'react-router';

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
class App extends  React.Component {
  constructor(props)
  {
    super(props);
    this.state={
      shelfbooks:[],
      user:[],

    };
this.handledivclick=this.handledivclick.bind(this);
this.removefromshelf=this.removefromshelf.bind(this);
this.addmore=this.addmore.bind(this);


  };
  handledivclick=(event) =>{


    this.props.pcallback(`${event.pdf}`);
    this.props.history.push('/openpdf')

  }
  removefromshelf(event)
  {
    axios.post(`http://localhost:3000/removefromshelf`,{
      userid:this.props.id,
      bookid:event._id


    })
    .then(res=>{
      console.log(res.data);

      axios.post(`http://localhost:3000/shelf`,{
        id:this.props.id
      })
      .then(res=>{
        console.log(res.data);


        this.setState({shelfbooks:res.data});
        console.log(this.state.shelfbooks);
        const data={
          sbooks:this.state.shelfbooks
        }
         axios.post(`http://localhost:3000/shelfb`,data)
            .then(res=>{
              console.log(res.data);

              this.setState({user:res.data});



            })
            .catch((err) => {
              console.log(err);

            });


      })
      .catch((err) => {
        console.log(err);

      });





    })
    .catch((err) => {
      console.log(err);

    });
  }
   componentDidMount(){

    axios.post(`http://localhost:3000/shelf`,{
      id:this.props.id
    })
    .then(res=>{
      console.log(res.data);


      this.setState({shelfbooks:res.data});
      console.log(this.state.shelfbooks);
      const data={
        sbooks:this.state.shelfbooks
      }
       axios.post(`http://localhost:3000/shelfb`,data)
          .then(res=>{
            console.log(res.data);

            this.setState({user:res.data});



          })
          .catch((err) => {
            console.log(err);

          });


    })
    .catch((err) => {
      console.log(err);

    });


   // .then(res => res.json())



  }
  addmore()
  {
    this.props.history.push('/')
  }


  render(){
      return (
        <div className="App">
          <Navigation/>
          <div className="innerone">
          {this.state.user.map((user,index)=>(

          <div className="container" key={index}  >
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
          <button onClick={()=>this.removefromshelf(user)}>Remove</button>
          <button onClick={() =>this.handledivclick(user)}>Open</button>
          </div>
          </div>
          </div>
        ))}
          <div className="container" onClick={this.addmore}>
    <img src={addbook} alt="Avatar" className="image"></img>



    </div>
    </div>
        </div>
);
  }
}
export default withRouter(App);
