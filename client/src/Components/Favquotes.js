import React from 'react';
import '../App.css';
import Navigation from './Navigation';
import axios from 'axios';
class App extends  React.Component {
  constructor(props)
  {
    super(props);
    this.state={
      quotes:[],
      newtext:""
    }
    this.handlesubmit=this.handlesubmit.bind(this);
    this.handleinput=this.handleinput.bind(this);

  };
  componentDidMount()
  {
    axios.post(`http://localhost:3000/quotes`,{
      id:this.props.id
    })
    .then(res=>{
      console.log(res.data);


      this.setState({quotes:res.data});
      console.log(this.state.quotes);




    })
    .catch((err) => {
      console.log(err);

    });
  }
  handleinput(e)
  {
    this.setState({newtext:e.target.value})
  }
    handlesubmit(e){
      e.preventDefault();
      axios.post(`http://localhost:3000/pushquote`,{
        id:this.props.id,
        newtext:this.state.newtext
      })
      .then(res=>{
        console.log(res.data);
        axios.post(`http://localhost:3000/quotes`,{
          id:this.props.id
        })
        .then(res=>{
          console.log(res.data);


          this.setState({quotes:res.data});
          console.log(this.state.quotes);




        })
        .catch((err) => {
          console.log(err);

        });
        })
      .catch((err) => {
        console.log(err);

      });
      this.setState({
     newtext: ''
   });


    }
  render(){
      return (
        <div>
          <Navigation/>
          <div className="innerone">
            <form onSubmit={this.handlesubmit}>
          <button className="button1"><span>Add </span></button>

          <input type="text"  value={this.state.newtext} placeholder="Type.." className="input2" onChange={this.handleinput}/>
          </form>


          {this.state.quotes.map((user,index)=>(

          <div className="box" key={index} >
            <p >{user}</p>

          </div>
        ))}
          </div>
        </div>
);
  }
}
export default App;
