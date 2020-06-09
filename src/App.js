import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

// import data from './data'


class App extends React.Component{

  state = {
    toys: [],
    display: false
  }

  componentDidMount() {
    const toysURL = 'http://localhost:5000/toys'
    fetch(toysURL)
      .then(resp => resp.json())
      .then(toys => {
        this.setState({
          toys: toys
        })
      })
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  addNewToy = (newToy) => {
    const toysURL = 'http://localhost:5000/toys'
    
    const configObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify(newToy)
    }

    fetch(toysURL, configObj)
      .then(resp => resp.json())
      .then(toy => {
        this.setState({
          toys: [...this.state.toys, toy]
        })
      })
  }

  onDeleteToyClick = (toyId) => {
    let updatedToysArr = this.state.toys.filter(toy => toy.id !== toyId)
    const toyURL = `http://localhost:5000/toys/${toyId}`

    const configObj = {
      method: 'DELETE'
    }

    fetch(toyURL, configObj)
      .then(resp => resp.json())
      .then(toy => {
        this.setState({
          toys: updatedToysArr
        })
      })
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm addNewToy={this.addNewToy} />
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} onDeleteToyClick={this.onDeleteToyClick} />
      </>
    );
  }

}

export default App;
