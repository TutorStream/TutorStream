import React from 'react';
import { Link } from 'react-router-dom'


class Sidebar extends React.Component {
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
  }
}


export default Sidebar;