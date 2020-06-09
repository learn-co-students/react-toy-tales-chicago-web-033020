import React, { Component } from 'react';

class ToyForm extends Component {

  constructor() {
    super()

    this.state = {
      name: '',
      image: '',
      likes: 0
    }
  }

  onNewToyInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onNewToySubmit = (event) => {
    event.preventDefault()
    let newToy = this.state
    this.props.addNewToy(newToy)

    this.setState({
      name: '',
      image: ''
    })
  }

  render() {
    console.log(this.state)
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={this.onNewToySubmit}>
          <h3>Create a toy!</h3>
          <input onChange={this.onNewToyInputChange} value={this.state.name} type="text" name="name" placeholder="Enter a toy's name..." className="input-text"/>
          <br/>
          <input onChange={this.onNewToyInputChange} value={this.state.image} type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text"/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
