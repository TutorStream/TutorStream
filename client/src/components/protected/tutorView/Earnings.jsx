import React from 'react';
import axios from 'axios';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Checkbox,
  Radio,
  FieldGroup,
  Button
} from 'react-bootstrap';
import * as d3 from 'd3';
import { BarChart } from 'react-d3-components';
import { ClipLoader } from 'react-spinners';
import moment from 'moment';


class Earnings extends React.Component {
    constructor(props){
        super(props);
        this.state = {
         earnings : [],
         loading: true,
         name: 'Tutor' ,
         week: this.lastWeek(),
         lastSeven$: []
        }
     this.getEarnings = this.getEarnings.bind(this)
     this.spreadData = this.spreadData.bind(this)
      }

    componentDidMount () {
        this.getUserInfo(this.props.id)
        
    }
//this.spreadData(data.data)
    getEarnings(id){
        console.log('id:', id)
        axios.get(`/earnings/${id}`)
            .then((data)=>{
                this.setState({
                    earnings : data.data,
                    values : this.spreadData(data.data),
                    weekly : this.spreadData(data.data).map(a=>a.y).reduce((a, b) => a + b, 0)
                })
            })
            .then(()=>{

                console.log('earnings : ', this.state)
                var currentMoment = moment();
                var sessionMoment = moment(this.state.earnings[this.state.earnings.length-1].date);
                var weekdays = moment().subtract(7,"days").format("DD-MM")
                console.log('sessionMoment : ',sessionMoment)
                var daysBetween = currentMoment.diff(sessionMoment, 'days');
                console.log('daysBetween :', daysBetween)
                console.log('days of the week', this.state.week)
                this.checkForEarnings();
            })
    }

  spreadData = data => {
    var results = [];
    data.forEach(singleDay => {
      results.push({
        x: singleDay.date.slice(5, 10),
        y: singleDay.day_earnings
      });
    });

        return results.slice(-7);
    }

    checkForEarnings = ()=> {
        var results = []

        for( var i = 0; i < 7; i++){
            var day = this.state.week[i] // ["07-11", "07-10", "07-09", "07-08", "07-07", "07-06", "07-05"]
            console.log('day is : ', day)
            for(var j = 0; j < this.state.earnings.length;j++){
                var workday = this.state.earnings[j].date.slice(5,10)
                var workdays = this.state.earnings.map(a=>a.date.slice(5,10))

                
                var idx = workdays.indexOf(day)
               console.log('idx is >>> ',idx) 
                if(idx > -1){
                    results.push({'x': day,'y': this.state.earnings[idx].day_earnings})
                    break;
                }else {
                    
                    results.push({'x': day,'y': 0})
                    break;
                }
            }
        }
        
        console.log('results : ', results)
        this.setState({
            ready: true,
            values : results.reverse(),
            weekly : results.map(a=>a.y).reduce((a, b) => a + b, 0)
        })

    }


    lastWeek = () => {
        var week = []
        for(var i = 0; i < 7; i++){
            week.push(moment().subtract(i,"days").format("MM-DD"))
        }
        return week;
    }





    getUserInfo = (id) => {
        var info;
        axios.get(`/users/info/${id}`)
        .then(({data}) => {
            info = data[0]
            console.log('data recieved in settings: ', info)
            this.setState({
                name: info.Name.split(' ')
            })
        })
        .then(()=>this.getEarnings(this.props.id))
    }

    
  
    render() {
        var x = this.state.values
        


        console.log('x : ', x)
        
        var data = [{
            label: 'somethingA',
            values: this.state.values
        }];

        var conditionalDisplay = this.state.ready ? 
        <div>
        <br/>
        <br/>
        <h3>This week's earnings</h3>
        <h2>${this.state.weekly}</h2>
        <hr/>
        <BarChart
        data={data}
        width={700}
        height={400}
        margin={{top: 10, bottom: 50, left: 50, right: 10}}/></div> : <ClipLoader
        color={'#FFF'} 
        loading={this.state.loading} 
        />

        return (
            <div className='earnings'>
               <h1>Hello {this.state.name[0]},</h1>
               <h2>Here are your most recent earnings: </h2>
               {conditionalDisplay}
               
            </div> 
        )
    }
}

export default Earnings;
