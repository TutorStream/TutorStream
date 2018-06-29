import React from 'react';
import EditableLabel from "react-inline-editing";
import axios from 'axios'

var bordered = {
    border : '1px dotted black'
}

class Settings extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            bio: '',
            editing: '',
            tutorBio: '',
            price: ''

        }
        this.handleFocus = this.handleFocus.bind(this);
        this.handleFocusOut = this.handleFocusOut.bind(this);
      }
      componentDidMount(){
          const {user_id: id} = this.props
          axios.get(`/users/info/${id}`)
            .then(({data}) => {
                let info = data[0]
                this.setState({
                    name: info.Name,
                    bio: info.Bio
                })
            })
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
          } else {
            this.setState({[this.state.editing] : text},()=>console.log('message -> ', this.state.editing, ' to ', this.state[this.state.editing] ))

          }
      }
    render() {
        return (
            <div>
                
                <h1>Settings</h1>
                <br/>
                <h2>User settings </h2>
                <h3>Name: {this.state.name} </h3>
                <div style = {bordered}>
                <EditableLabel 
                    name = 'name'
                    text={'Edit'}
                    onFocus={()=>this.handleFocus('name')}
                    onFocusOut={this.handleFocusOut}
                />
                </div>

                <h3>Bio : {this.state.bio}</h3>
                <div style = {bordered}>
                <EditableLabel 
                    name = 'bio'
                    text={'Edit'}
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
