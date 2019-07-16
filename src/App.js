import React, { Component } from 'react';
import './App.css';
import RestAPI from './rest.api';
import FormContainer from './FormContainer';
import ListContainer from './ListContainer'
class App extends Component {

componentDidMount() {
    const restAPI = new RestAPI();
    restAPI.login('admin', 'admin').then(res => {        
  }); 
}  

render() {
  return (
      <div className="App">
        <FormContainer/>
        <ListContainer/>
      </div>
    );
  }
}

export default App;
//"proxy": "http://sos.axelor.com:8081"
