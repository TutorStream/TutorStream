import React from 'react';
import { Link } from 'react-router-dom'

class Sidebar extends React.Component {
<<<<<<< HEAD
  constructor(props){
    super(props);
    this.state = {
=======
    render() {
        return (
            <div>
                <h1>Sidebar</h1>
                <br/>
                <div className='student-options'>
                        {this.props.options.map((option,i)=>{
                            return(
                                <Link key={i} to={`${option.name}`} className='student-option'>{option.name}</Link>
                            )
                        })}
                </div>
            </div>
            
        )
>>>>>>> 31620c1c7941a140cdbfdd1ada6ebcdf02908b46
    }
  }
  render() {
    return (
      <div>
        <h1>Sidebar</h1>
        <br/>
        <div className='student-options'>
          {this.props.options.map((option,i)=>{
            return (
              <button key={i} onClick={this.props.handleSwitchView} name={option.func} className='student-option'>{option.name}</button>
            )
          })}
        </div>
      </div>
    )
  }
}


<<<<<<< HEAD
export default Sidebar;

//  <button onClick={this.props.handleSwitchView} className='student-option' name='becomeTutor'>Become A Tutor</button>
=======
export default Sidebar;
>>>>>>> 31620c1c7941a140cdbfdd1ada6ebcdf02908b46
