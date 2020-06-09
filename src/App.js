import React from "react";
import "./App.css";

import Header from "./components/Header";
import ToyForm from "./components/ToyForm";
import ToyContainer from "./components/ToyContainer";

import data from "./data";

class App extends React.Component {
  state = {
    display: false,
    toys: [],
  };

  handleClick = () => {
    let newBoolean = !this.state.display;
    this.setState({
      display: newBoolean,
    });
  };

  componentDidMount() {
    fetch("http://localhost:3000/toys")
      .then((resp) => resp.json())
      .then((json) => {
        this.setState({
          toys: json,
        });
      });
  }

  handleSubmit = (input) => {
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ ...input, likes: 0 }),
    })
      .then((resp) => resp.json())
      .then((json) => {
        const updatedToys = [...this.state.toys, json];
        this.setState({
          toys: updatedToys,
        });
      });
  };

  deleteToy = (toyObj) => {
    fetch(`http://localhost:3000/toys/${toyObj.id}`, { method: "DELETE" });

    const newToys = this.state.toys.filter((toy) => toy.id !== toyObj.id);
    this.setState({
      toys: newToys,
    });
  };

  handleLike = (toyObj) => {
    const newLikes = parseInt(toyObj.likes) + 1
    
    fetch(`http://localhost:3000/toys/${toyObj.id}`, {
      method: "PATCH",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        likes: newLikes
      })
    })
    .then(resp => resp.json())
    .then(json => {
      const likedToys = this.state.toys.map(toy => toy.id === json.id ? json : toy)
      this.setState({
        toys: likedToys
      })
    })
  }

  render() {
    return (
      <>
        <Header />
        {this.state.display ? (
          <ToyForm handleSubmit={this.handleSubmit} />
        ) : null}
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} deleteToy={this.deleteToy} handleLike={this.handleLike}/>
      </>
    );
  }
}

export default App;
