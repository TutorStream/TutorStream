import React from 'react';
import axios from 'axios';
import {FormGroup , ControlLabel, FormControl, Checkbox, Radio, FieldGroup, Button} from 'react-bootstrap';
import * as d3 from "d3";
import {BarChart} from 'react-d3-components';
import { ClipLoader } from 'react-spinners';


class Earnings extends React.Component {
    constructor(props){
        super(props);
        this.state = {
         earnings : [],
         loading: true,
        }
     this.getEarnings = this.getEarnings.bind(this)
     this.spreadData = this.spreadData.bind(this)
      }

    componentDidMount(){
        this.getEarnings(this.props.id)
    }

    getEarnings(id){
        console.log('id:', id)
        axios.get(`/earnings/${id}`)
            .then((data)=>{
                this.setState({
                    earnings : data.data,
                    values : this.spreadData(data.data)
                })
            })
            .then(()=>console.log('earnings : ', this.state))
    }

    spreadData(data){
        var results = []
        data.forEach((singleDay)=>{
            results.push({'x': singleDay.date.slice(5,10),'y': singleDay.day_earnings})
        })

        return results;
    }

    
  
    render() {
        var x = this.state.values

        console.log('x : ', x)
        var data = [{
            label: 'somethingA',
            values: this.state.values
        }];

        var conditionalDisplay = this.state.values ? <BarChart
        data={data}
        width={800}
        height={400}
        margin={{top: 10, bottom: 50, left: 50, right: 10}}/> : <ClipLoader
        color={'#FFF'} 
        loading={this.state.loading} 
        />

        return (
            <div className='earnings'>
               <h1>Earnings</h1>
               {conditionalDisplay}
               
            </div> 
        )
    }
}

export default Earnings;