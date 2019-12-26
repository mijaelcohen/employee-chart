import React from 'react';
import minionsByManager from '../service';
import Loader from './Loader';
import NoMInions from './NoMinions';

class Employee extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            loading : false,
            minions : [],
            error: false,
            noMinions: false
        }
    }
    getMinions(){
        const manager = this.props.employee.id
        this.setState({loading: true});
        minionsByManager(manager).then((res)=>{
            this.setState({ 
                minions: res.data,
                loading: false,
                noMinions : res.data.length === 0,
            });
        }).catch((err)=>{
            this.setState({
                loading: false,
                error: true,
            })
        })
    }
    render(){
        const employee = this.props.employee;
        const { minions, loading, noMinions } = this.state;

        return(<React.Fragment>
            
                <div 
                    onClick={(ev)=>{ this.getMinions() }} 
                    className="nodecontent">
                        {employee.first} {employee.last}
                </div>
                
                {loading && <Loader/>}
                {noMinions && <NoMInions/>}
                <ul>
                    { minions.length > 0 && 
                        minions.map((minion)=>{
                            return <li key={minion.id} className={noMinions ? 'no-minions': ''}>
                                <Employee employee={minion}/>
                                </li>
                        })
                    }
                </ul>
            
            
        </React.Fragment>)
    }
}

export default Employee;