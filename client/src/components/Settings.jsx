import React from 'react';
import Sidebar from './Sidebar.jsx';

import EditableLabel from "react-inline-editing";

var bordered = {
    border : '1px dotted black'
}

class Settings extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            options : [
                {name :'Sessions', func : 'tutor'},
                {name :'Inbox', func : 'tutor'},
                {name :'Classroom', func : 'tutor'},
                {name :'Become a Tutor', func : 'tutor'}
            ],
            name: 'Koichi Smith',
            bio: 'Born in Tokyo, Japan but spent most of my life in Westchester, NY. ',
            editing: '',
            tutorBio: ' I teach too',
            price: '$$$'

        }
        this.handleFocus = this.handleFocus.bind(this);
        this.handleFocusOut = this.handleFocusOut.bind(this);
      }
  
      handleFocus(toBeEdited) {
          console.log('Focused with text: ' + toBeEdited);
          this.setState({
              editing : toBeEdited
          })
      }
  
      handleFocusOut(text) {
          console.log('Left editor with text: ' + text)
          var editing = this.state.editing
          if(editing === 'price'){
            this.setState({[this.state.editing] : Number(text)},()=>console.log('message -> ', this.state.editing, ' to ', this.state[this.state.editing] ))
          }else {
            this.setState({[this.state.editing] : text},()=>console.log('message -> ', this.state.editing, ' to ', this.state[this.state.editing] ))

          }
      }



    



    render() {
        return (
            <div >
                
                <h1>Settings</h1>
                <br/>

                <div className = 'flex-parent'>
                <Sidebar  options = {this.state.options} handleSwitchView={this.props.handleSwitchView}/>
                </div>

                <h2>User settings </h2>
                <h3>Name : </h3>
                <div style = {bordered}>
                <EditableLabel 
                name = 'name'
                
                text={this.state.name}
                onFocus={()=>this.handleFocus('name')}
                onFocusOut={this.handleFocusOut}
                />
                </div>

                <h3>Bio : </h3>
                <div style = {bordered}>
                <EditableLabel 
                name = 'bio'
                text={this.state.bio}
                onFocus={()=>this.handleFocus('bio')}
                onFocusOut={this.handleFocusOut}
                />
                </div>

                <h1>_____________</h1>
                <br />
                <h2>Tutor settings </h2>

                <h3>Tutor Bio : </h3>
                <div style = {bordered}>
                <EditableLabel 
                name = 'tutorBio'
                text={this.state.tutorBio}
                onFocus={()=>this.handleFocus('tutorBio')}
                onFocusOut={this.handleFocusOut}
                />
                </div>

                <h3>Price : </h3>
                <div style = {bordered}>
                <EditableLabel 
                name = 'price'
                text={this.state.price}
                onFocus={()=>this.handleFocus('price')}
                onFocusOut={this.handleFocusOut}
                />
                </div>


                
                

            </div>
            
        )
    }
}


export default Settings;
