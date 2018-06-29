import React from 'react';
import moment from 'moment';
import  DateTime  from 'react-datetime';

// import 'react-datepicker/dist/react-datepicker.css';
// import 'react-daypicker/lib/style.css'
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class BookSession extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      date: '',
      time: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    var sliced = String(date).slice(4,21)
    var newTime = sliced.slice(12) + ':00'
    var mm;
    
      if(sliced.slice(0,3) === 'Jan'){
        mm ='01'
      }else if(sliced.slice(0,3) === 'Feb'){
        mm = '02'
      }else if(sliced.slice(0,3) === 'Mar'){
        mm = '03'
      }else if(sliced.slice(0,3) === 'Apr'){
        mm = '04'
      }else if(sliced.slice(0,3) === 'May'){
        mm = '05'
      }else if(sliced.slice(0,3) === 'Jun'){
        mm = '06'
      }else if(sliced.slice(0,3) === 'Jul'){
        mm = '07'
      }else if(sliced.slice(0,3) === 'Aug'){
        mm = '08'
      }else if(sliced.slice(0,3) === 'Sep'){
        mm = '09'
      }else if(sliced.slice(0,3) === 'Oct'){
        mm = '10'
      }else if(sliced.slice(0,3) === 'Nov'){
        mm = '11'
      }else if(sliced.slice(0,3) === 'Dec'){
        mm = '12'
      }

      var dd = sliced.slice(4,6);
      var yyyy = sliced.slice(7,11)
      var newDate = yyyy + '-' + mm + '-' + dd
      console.log('New date: ',newDate)
      console.log('New Time : ',newTime)

      
          this.setState({
            date: newDate,
            time: newTime
          });
        }


    






  render() {

    return( 
    
    <div>
      <DateTime onChange={this.handleChange} inputProps={{ placeholder: "Click to select session's date and time"}}/>
    
    
    </div>
    )
  }
}

export default BookSession;
