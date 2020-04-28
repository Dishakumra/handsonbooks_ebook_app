import React from 'react';
import Modal from 'react-modal';
import validator from 'validator';
import '../App.css';
import axios from 'axios';
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      email: '',
      password: '',

    }


    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onClose=this.onClose.bind(this);
    this.handlelogin=this.handlelogin.bind(this);
    this.handlesignup=this.handlesignup.bind(this);

  }


  onSubmit(e) {


  }
  onEmailChange(e) {

    this.setState ({ email:e.target.value });
  }
  onPasswordChange(e) {

    this.setState({ password: e.target.value });
  }
  onClose(e){
    this.props.onClose && this.props.onClose(e);
  };
  handlelogin(e){
    e.preventDefault();
    console.log(this.state.email)
    if (validator.isEmail(this.state.email)) {


    axios.post(`http://localhost:3000/login`,{
      Email:this.state.email,
     Password:this.state.password
    })
   // .then(res => res.json())
    .then(res=>{
      console.log(res.data);
      this.onClose(res.data);

    })
    .catch((err) => {
      console.log(err);

    });
  }
  }
  handlesignup(e){
    e.preventDefault();
    console.log(this.state.email)
    if (validator.isEmail(this.state.email)) {


    axios.post(`http://localhost:3000/signup`,{
      Email:this.state.email,
     Password:this.state.password
    })
   // .then(res => res.json())
    .then(res=>{
      console.log(res.data);
      this.onClose(res.data);

    })
    .catch((err) => {
      console.log(err);

    });
  }
  }
  render() {
    if(!this.props.show){
        return null;
    }
    return (
      <div className="main">
          <div className="modal-content1">
            <div className="modal-header1">Hi, Please Login Here.</div>
            <div className="modal-body1">
            <form>
              <input required type="email" onChange={this.onEmailChange} id="email" value={this.state.email} placeholder=" email@email.com" />
              <br/>
              <br/>
              <input required type="password" onChange={this.onPasswordChange} id="password" value={this.state.password} placeholder='please keep your passwords safe' />
              <br/>
              <br/>

              <button onClick={this.handlelogin}>Login</button>
              <button onClick={this.handlesignup}>signup</button>

              <br/>
              <br/>



            </form>
              </div>
          </div>



      </div>
    )
  }
}
export default HomePage;
