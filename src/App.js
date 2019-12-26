import React from 'react';
import config from './config';
import Loader from './Components/Loader';
import Employee from './Components/Employee';
import './App.css';
import Axios from 'axios';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      loading: true,
      bosses : [],
      error: false,
    }
  }
  getTopLevelEmployees(){
    Axios.get(config.apiURI, {
      params: {
        manager: 0,
      }
    }).then((res) =>{
      this.setState({
        loading: false,
        bosses: res.data
      })
    })
    .catch((error)=>{
      this.setState({
        loading: false,
        error: true,
      })
    })
  }
  componentDidMount(){
    this.getTopLevelEmployees()
  }
  render(){
    const { loading, bosses } = this.state;
    return (
      <React.Fragment>
      <h1> Company OrgChart </h1>
      <ul className="orgchart">
        <li className="root">
        { loading && <Loader/> }
        { !loading && 
          bosses.map((boss)=>{
            return <Employee employee={boss} key={boss.id}/>
          })
         }
         </li>
      </ul>
      </React.Fragment>
    )
  }
};

export default App;
