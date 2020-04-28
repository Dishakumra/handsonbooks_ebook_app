import React from 'react';
import '../App.css';
import Navigation from './Navigation';
class App extends  React.Component {
  constructor(props)
  {
    super(props);
    this.state={
      word:"",
      datag:""
    };
    this.handlesubmit=this.handlesubmit.bind(this);
    this.handleChange=this.handleChange.bind(this);

  };
  handleChange(e){
    this.setState({word:e.target.value});
  }
   handlesubmit(event){
       event.preventDefault();
       const proxyurl = "https://cors-anywhere.herokuapp.com/";

    const url=`https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/${this.state.word}?fields=definitions&strictMatch=false`
    fetch(proxyurl+url,{
      method:"GET",
      headers:{
        "Accept": "application/json",
        'app_id':'9fd145e2',
        'app_key':'11f475e99444a6cdcc6f7cc95b6a7a35'
      }
    })
    .then(resp => resp.json())
   .then((data)=>
     this.setState({datag:data.results[0].lexicalEntries[0].entries[0].senses[0].definitions}))
   .catch(function(error) {
     console.log(error);
   });
  }

  render(){
      return (
        <div className="App">
          <Navigation/>
          <div className="innerone">
          <div className="dictionary">English Dictionary</div>
          <br/>
          <br/>
           <form onSubmit={this.handlesubmit}>
           <input type="text" placeholder="search"  onChange={this.handleChange}/>
           <br/>

           <button>Submit</button>
           </form>
           <div>
            meaning://{this.state.datag}

           </div>

          </div>
        </div>
);
  }
}
export default App;
