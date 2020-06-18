import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

import data from './data'


class App extends React.Component{

  state = {
    display: false,
    toys: []
  }

  componentDidMount = () => {
    fetch('http://localhost:3000/toys')
    .then((res) => res.json())
    .then((toyJSON) => {
      this.setState({
        toys: toyJSON
      })
    })
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  handleSubmit = (inputData) => {
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({...inputData, likes: 0})
    })
    .then((res) => res.json())
    .then((dataJSON) => {
      const updatedToys = [...this.state.toys, dataJSON]
      this.setState({
        toys: updatedToys
      })
    })
  }

  handleDelete = (selectedToy) => {
    fetch('http://localhost:3000/toys/' + selectedToy.id, {method: 'DELETE'})
    const newToys = this.state.toys.filter(toy => toy.id !== selectedToy.id)
    this.setState({
      toys: newToys
    })
  }

  handleLike = (selectedToy) => {
    const toyLikes = parseInt(selectedToy.likes) + 1
    fetch('http://localhost:3000/toys/' + selectedToy.id, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        likes: toyLikes
      })
    })
    .then((res) => res.json())
    .then((toyData) => {
      const likedToy = this.state.toys.map(toy => toy.id === toyData.id ? toyData : toy)
      this.setState({
        toys: likedToy
      })
    })
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm handleSubmit={this.handleSubmit}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} handleDelete={this.handleDelete} handleLike={this.handleLike}/>
      </>
    );
  }

}

export default App;
