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

    getEarnings(id){
        
        axios.get(`/earnings/${id}`)
            .then((data)=>{
                this.setState({
                    earnings : data.data,
                    values : this.spreadData(data.data),
                    weekly : this.spreadData(data.data).map(a=>a.y).reduce((a, b) => a + b, 0)
                })
            })
            .then(()=>{
                var currentMoment = moment();
                var sessionMoment = moment(this.state.earnings[this.state.earnings.length-1].date);
                var weekdays = moment().subtract(7,"days").format("DD-MM");
                var daysBetween = currentMoment.diff(sessionMoment, 'days');
                this.checkForEarnings();
            })
            .catch((err) => {
                console.error(err);
            });
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
            var day = this.state.week[i];
            for(var j = 0; j < this.state.earnings.length;j++) {
                var workday = this.state.earnings[j].date.slice(5,10);
                var workdays = this.state.earnings.map(a=>a.date.slice(5,10));
                var idx = workdays.indexOf(day);
                if(idx > -1){
                    results.push({'x': day,'y': this.state.earnings[idx].day_earnings});
                    break;
                }else {
                    results.push({'x': day,'y': 0});
                    break;
                }
            }
        }
        this.setState({
            ready: true,
            values : results.reverse(),
            weekly : results.map(a=>a.y).reduce((a, b) => a + b, 0)
        });

    };


    lastWeek = () => {
        var week = [];
        for(var i = 0; i < 7; i++){
            week.push(moment().subtract(i,"days").format("MM-DD"))
        }
        return week;
    };





    getUserInfo = (id) => {
        var info;
        axios.get(`/users/info/${id}`)
        .then(({data}) => {
            info = data[0]
            this.setState({
                name: info.Name.split(' ')
            });
        })
        .then(()=>this.getEarnings(this.props.id))
    };

    

    render() {
        var x = this.state.values;
        var data = [{
            label: 'somethingA',
            values: this.state.values
        }];
        var conditionalDisplay = this.state.ready ? 
        <div>
        <br/>
        <br/>
        <div className="week-earnings">
        <h3>This week's earnings</h3>
        </div>
        <div className="week-numbers">
        <h2>${this.state.weekly}</h2>
        </div>
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
                <div className="row-background" />
                <div className="earnings-greeting">
               <h1>Hello {this.state.name[0]},</h1>
               </div>
               {conditionalDisplay}
               
            </div> 
        )
    }
}

export default Earnings;
