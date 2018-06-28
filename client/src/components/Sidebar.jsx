import React from 'react';


class Sidebar extends React.Component {
  constructor(props){
      super(props);
      this.state = {
      }
  }
  render() {
    return (
      <div>
        <h1>Sidebar</h1>
        <br/>

        <div className='student-options'>
                {this.props.options.map((option,i)=>{
                    return(
                        <button key={i} onClick={this.props.handleSwitchView} name={option.func} className='student-option'>{option.name}</button>
                    )
                })}
        </div>
      </div>
    )
  }
}


export default Sidebar;

//                        <button onClick={this.props.handleSwitchView} className='student-option' name='becomeTutor'>Become A Tutor</button>
