import React, { Component } from 'react';

class ToyForm extends Component {

  state = {
    name: '',
    image: ''
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.props.handleSubmit(this.state)
    this.setState({
      name: '',
      image: ''
    })
  }

  render() {
    return (
      <div className="container">
        <form className="add-toy-form">
          <h3>Create a toy!</h3>
          <input type="text" name="name" placeholder="Enter a toy's name..." className="input-text" value={this.state.name} onChange={this.handleChange}/>
          <br/>
          <input type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text" value={this.state.image} onChange={this.handleChange}/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit" onClick={this.onSubmit}/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
